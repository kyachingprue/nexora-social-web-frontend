import { useEffect, useRef, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { createPortal } from 'react-dom'
import {
  X,
  Image as ImageIcon,
  Video,
  Smile,
  MapPin,
  UserRound,
  BarChart3,
  MessageCircle,
  CalendarDays,
  Send,
  Trash2,
  ChevronDown,
  Sparkles,
  Eye,
  AtSign
} from 'lucide-react'

const NewPost = ({ isOpen, onClose, onSubmitPost }) => {
  const imageInputRef = useRef(null)
  const videoInputRef = useRef(null)

  const [mediaPreview, setMediaPreview] = useState([])
  const [showPoll, setShowPoll] = useState(false)
  const [showFeeling, setShowFeeling] = useState(false)
  const [showLocation, setShowLocation] = useState(false)
  const [showTagPeople, setShowTagPeople] = useState(false)
  const [showSchedule, setShowSchedule] = useState(false)

  const { register, handleSubmit, reset, setValue, control, watch } = useForm({
    defaultValues: {
      text: '',
      audience: 'public',
      feeling: '',
      location: '',
      taggedPeople: [],
      allowComments: true,
      allowSharing: true,
      pollQuestion: '',
      pollOption1: '',
      pollOption2: '',
      pollOption3: '',
      pollOption4: '',
      background: 'default',
      scheduleDate: '',
      scheduleTime: ''
    }
  })

  const text = useWatch({
    control,
    name: 'text'
  })

  const audience = watch('audience')
  const background = watch('background')
  const feeling = watch('feeling')

  // ==========================================
  // Cleanup preview URLs
  // ==========================================

  useEffect(() => {
    return () => {
      mediaPreview.forEach(file => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview)
        }
      })
    }
  }, [mediaPreview])

  // ==========================================
  // Image Upload
  // ==========================================

  const handleImages = event => {
    const files = Array.from(event.target.files || [])

    const validFiles = files.filter(file => file.type.startsWith('image/'))

    const newFiles = validFiles.map(file => ({
      id: `${file.name}-${file.lastModified}-${Math.random()}`,
      file,
      type: 'image',
      preview: URL.createObjectURL(file)
    }))

    setMediaPreview(prev => [...prev, ...newFiles])

    event.target.value = ''
  }

  // ==========================================
  // Video Upload
  // ==========================================

  const handleVideo = event => {
    const file = event.target.files?.[0]

    if (!file) return

    if (!file.type.startsWith('video/')) return

    const newVideo = {
      id: `${file.name}-${file.lastModified}`,
      file,
      type: 'video',
      preview: URL.createObjectURL(file)
    }

    setMediaPreview(prev => [...prev, newVideo])

    event.target.value = ''
  }

  // ==========================================
  // Remove Media
  // ==========================================

  const removeMedia = id => {
    setMediaPreview(prev => {
      const item = prev.find(media => media.id === id)

      if (item?.preview) {
        URL.revokeObjectURL(item.preview)
      }

      return prev.filter(media => media.id !== id)
    })
  }

  // ==========================================
  // Submit
  // ==========================================

  const submitPost = data => {
    const postData = {
      ...data,
      media: mediaPreview.map(item => item.file),
      createdAt: new Date().toISOString()
    }

    console.log('🚀 NEW NEXORA POST:', postData)

    if (onSubmitPost) {
      onSubmitPost(postData)
    }

    reset()
    setMediaPreview([])
    setShowPoll(false)
    setShowFeeling(false)
    setShowLocation(false)
    setShowTagPeople(false)
    setShowSchedule(false)

    onClose()
  }

  // ==========================================
  // Background Classes
  // ==========================================

  const backgroundClasses = {
    default: 'bg-white dark:bg-slate-900',

    purple: 'bg-linear-to-br from-violet-500 via-purple-500 to-fuchsia-500',

    blue: 'bg-linear-to-br from-cyan-500 via-blue-500 to-indigo-600',

    sunset: 'bg-linear-to-br from-orange-400 via-pink-500 to-purple-600',

    ocean: 'bg-linear-to-br from-emerald-400 via-cyan-500 to-blue-600',

    dark: 'bg-linear-to-br from-slate-700 via-slate-800 to-slate-950'
  }

  if (!isOpen) return null

  return createPortal(
    <div
      onClick={event => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
      className="fixed inset-0 z-9999 flex items-start justify-center bg-slate-950/60 p-4 pt-6 backdrop-blur-md"
    >
      {/* ==========================================
          Modal
      ========================================== */}

      <div className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-950">
        {/* ========================================
            Header
        ======================================== */}

        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 to-fuchsia-500 text-white shadow-lg">
              <Sparkles size={19} />
            </div>

            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Create new post
              </h2>

              <p className="text-xs text-slate-500">
                Share something with your Nexora community
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-900 dark:bg-slate-800 dark:hover:bg-slate-700 dark:hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* ========================================
            Scrollable Content
        ======================================== */}

        <form onSubmit={handleSubmit(submitPost)} className="overflow-y-auto">
          <div className="p-5">
            {/* ====================================
                User Info
            ==================================== */}

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-linear-to-br from-cyan-400 to-indigo-500 text-sm font-bold text-white ring-2 ring-indigo-100 dark:ring-indigo-950">
                KM
              </div>

              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  Kyachingprue Marma
                </p>

                <div className="relative mt-1 inline-block">
                  <select
                    {...register('audience')}
                    className="appearance-none rounded-lg border border-slate-200 bg-slate-50 py-1 pl-2 pr-7 text-[11px] font-medium text-slate-600 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  >
                    <option value="public">Public</option>

                    <option value="friends">Friends</option>

                    <option value="only-me">Only me</option>
                  </select>

                  <ChevronDown
                    size={12}
                    className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                </div>
              </div>
            </div>

            {/* ====================================
                Post Text
            ==================================== */}

            <div
              className={`mt-5 overflow-hidden rounded-2xl transition ${backgroundClasses[background]}`}
            >
              <textarea
                {...register('text', {
                  maxLength: 5000
                })}
                placeholder="What's happening?"
                rows={background === 'default' ? 5 : 7}
                className={`w-full resize-none border-0 bg-transparent p-5 text-lg font-medium outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 ${
                  background === 'default'
                    ? 'text-slate-900 dark:text-white'
                    : 'text-white placeholder:text-white/60'
                }`}
              />

              {/* Character Count */}

              <div
                className={`px-5 pb-3 text-right text-[11px] ${
                  background === 'default' ? 'text-slate-400' : 'text-white/60'
                }`}
              >
                {text?.length || 0}/5000
              </div>
            </div>

            {/* ====================================
                Feeling
            ==================================== */}

            {showFeeling && (
              <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-semibold">How are you feeling?</p>

                  <button type="button" onClick={() => setShowFeeling(false)}>
                    <X size={16} />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                  {[
                    '😊 Happy',
                    '❤️ Loved',
                    '🔥 Excited',
                    '😎 Cool',
                    '🥳 Celebrating',
                    '😢 Sad'
                  ].map(item => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setValue('feeling', item)}
                      className={`rounded-xl border px-2 py-2 text-xs transition ${
                        feeling === item
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-600 dark:bg-indigo-950'
                          : 'border-slate-200 bg-white hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ====================================
                Location
            ==================================== */}

            {showLocation && (
              <div className="mt-3 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900">
                <MapPin size={18} className="text-rose-500" />

                <input
                  {...register('location')}
                  autoFocus
                  placeholder="Where are you?"
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
                />

                <button type="button" onClick={() => setShowLocation(false)}>
                  <X size={16} />
                </button>
              </div>
            )}

            {/* ====================================
                Tag People
            ==================================== */}

            {showTagPeople && (
              <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AtSign size={17} className="text-indigo-500" />

                    <span className="text-sm font-semibold">Tag people</span>
                  </div>

                  <button type="button" onClick={() => setShowTagPeople(false)}>
                    <X size={16} />
                  </button>
                </div>

                <input
                  placeholder="Search people to tag..."
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-indigo-400 dark:border-slate-700 dark:bg-slate-800"
                />

                <div className="mt-3 flex gap-2">
                  {['Ava', 'Marcus', 'Priya', 'Sofia'].map(name => (
                    <button
                      key={name}
                      type="button"
                      className="rounded-full bg-white px-3 py-1.5 text-xs shadow-sm ring-1 ring-slate-200 transition hover:bg-indigo-50 dark:bg-slate-800 dark:ring-slate-700"
                    >
                      @{name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ====================================
                Poll
            ==================================== */}

            {showPoll && (
              <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BarChart3 size={17} className="text-violet-500" />

                    <span className="text-sm font-semibold">Create a poll</span>
                  </div>

                  <button type="button" onClick={() => setShowPoll(false)}>
                    <X size={16} />
                  </button>
                </div>

                <input
                  {...register('pollQuestion')}
                  placeholder="Ask your community something..."
                  className="mb-3 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-400 dark:border-slate-700 dark:bg-slate-800"
                />

                <div className="space-y-2">
                  {[1, 2, 3, 4].map(number => (
                    <input
                      key={number}
                      {...register(`pollOption${number}`)}
                      placeholder={`Option ${number}`}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-indigo-400 dark:border-slate-700 dark:bg-slate-800"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* ====================================
                Media Preview
            ==================================== */}

            {mediaPreview.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-2 overflow-hidden rounded-2xl sm:grid-cols-3">
                {mediaPreview.map(media => (
                  <div
                    key={media.id}
                    className="group relative aspect-square overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800"
                  >
                    {media.type === 'image' ? (
                      <img
                        src={media.preview}
                        alt="Post preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <video
                        src={media.preview}
                        controls
                        className="h-full w-full object-cover"
                      />
                    )}

                    <button
                      type="button"
                      onClick={() => removeMedia(media.id)}
                      className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white opacity-0 backdrop-blur transition group-hover:opacity-100"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* ====================================
                Post Options
            ==================================== */}

            <div className="mt-4 rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">
                  Add to your post
                </span>

                <span className="text-[10px] text-slate-400">More options</span>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {/* Image */}

                <button
                  type="button"
                  onClick={() => imageInputRef.current?.click()}
                  className="flex items-center gap-2 rounded-xl border border-transparent px-3 py-2.5 text-left text-xs font-medium text-emerald-600 transition hover:border-emerald-100 hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
                >
                  <ImageIcon size={18} />
                  Photo
                </button>

                {/* Video */}

                <button
                  type="button"
                  onClick={() => videoInputRef.current?.click()}
                  className="flex items-center gap-2 rounded-xl border border-transparent px-3 py-2.5 text-left text-xs font-medium text-blue-600 transition hover:border-blue-100 hover:bg-blue-50 dark:hover:bg-blue-950/30"
                >
                  <Video size={18} />
                  Video
                </button>

                {/* Feeling */}

                <button
                  type="button"
                  onClick={() => setShowFeeling(prev => !prev)}
                  className="flex items-center gap-2 rounded-xl border border-transparent px-3 py-2.5 text-left text-xs font-medium text-amber-600 transition hover:border-amber-100 hover:bg-amber-50 dark:hover:bg-amber-950/30"
                >
                  <Smile size={18} />
                  Feeling
                </button>

                {/* Location */}

                <button
                  type="button"
                  onClick={() => setShowLocation(prev => !prev)}
                  className="flex items-center gap-2 rounded-xl border border-transparent px-3 py-2.5 text-left text-xs font-medium text-rose-600 transition hover:border-rose-100 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                >
                  <MapPin size={18} />
                  Location
                </button>

                {/* Tag */}

                <button
                  type="button"
                  onClick={() => setShowTagPeople(prev => !prev)}
                  className="flex items-center gap-2 rounded-xl border border-transparent px-3 py-2.5 text-left text-xs font-medium text-indigo-600 transition hover:border-indigo-100 hover:bg-indigo-50 dark:hover:bg-indigo-950/30"
                >
                  <UserRound size={18} />
                  Tag people
                </button>

                {/* Poll */}

                <button
                  type="button"
                  onClick={() => setShowPoll(prev => !prev)}
                  className="flex items-center gap-2 rounded-xl border border-transparent px-3 py-2.5 text-left text-xs font-medium text-violet-600 transition hover:border-violet-100 hover:bg-violet-50 dark:hover:bg-violet-950/30"
                >
                  <BarChart3 size={18} />
                  Poll
                </button>

                {/* Schedule */}

                <button
                  type="button"
                  onClick={() => setShowSchedule(prev => !prev)}
                  className="flex items-center gap-2 rounded-xl border border-transparent px-3 py-2.5 text-left text-xs font-medium text-cyan-600 transition hover:border-cyan-100 hover:bg-cyan-50 dark:hover:bg-cyan-950/30"
                >
                  <CalendarDays size={18} />
                  Schedule
                </button>

                {/* Background */}

                <button
                  type="button"
                  onClick={() =>
                    setValue(
                      'background',
                      background === 'default'
                        ? 'purple'
                        : background === 'purple'
                          ? 'blue'
                          : background === 'blue'
                            ? 'sunset'
                            : background === 'sunset'
                              ? 'ocean'
                              : 'default'
                    )
                  }
                  className="flex items-center gap-2 rounded-xl border border-transparent px-3 py-2.5 text-left text-xs font-medium text-fuchsia-600 transition hover:border-fuchsia-100 hover:bg-fuchsia-50 dark:hover:bg-fuchsia-950/30"
                >
                  <Sparkles size={18} />
                  Background
                </button>
              </div>
            </div>

            {/* ====================================
                Schedule
            ==================================== */}

            {showSchedule && (
              <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CalendarDays size={17} className="text-cyan-500" />

                    <span className="text-sm font-semibold">Schedule post</span>
                  </div>

                  <button type="button" onClick={() => setShowSchedule(false)}>
                    <X size={16} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="date"
                    {...register('scheduleDate')}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none dark:border-slate-700 dark:bg-slate-800"
                  />

                  <input
                    type="time"
                    {...register('scheduleTime')}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>
              </div>
            )}

            {/* ====================================
                Privacy Settings
            ==================================== */}

            <div className="mt-4 space-y-3 rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-500 dark:bg-indigo-950/40">
                    <MessageCircle size={17} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold">Allow comments</p>

                    <p className="text-[10px] text-slate-400">
                      Let people comment on your post
                    </p>
                  </div>
                </div>

                <label className="relative inline-flex cursor-pointer">
                  <input
                    type="checkbox"
                    {...register('allowComments')}
                    className="peer sr-only"
                  />

                  <div className="h-5 w-9 rounded-full bg-slate-300 after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all peer-checked:bg-indigo-500 peer-checked:after:translate-x-4 dark:bg-slate-700" />
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-50 text-cyan-500 dark:bg-cyan-950/40">
                    <Send size={17} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold">Allow sharing</p>

                    <p className="text-[10px] text-slate-400">
                      Let people share your post
                    </p>
                  </div>
                </div>

                <label className="relative inline-flex cursor-pointer">
                  <input
                    type="checkbox"
                    {...register('allowSharing')}
                    className="peer sr-only"
                  />

                  <div className="h-5 w-9 rounded-full bg-slate-300 after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all peer-checked:bg-cyan-500 peer-checked:after:translate-x-4 dark:bg-slate-700" />
                </label>
              </div>
            </div>

            {/* ====================================
                Preview Info
            ==================================== */}

            {(feeling || watch('location')) && (
              <div className="mt-4 flex flex-wrap gap-2">
                {feeling && (
                  <div className="rounded-full bg-amber-50 px-3 py-1.5 text-xs text-amber-600 dark:bg-amber-950/30">
                    {feeling}
                  </div>
                )}

                {watch('location') && (
                  <div className="flex items-center gap-1 rounded-full bg-rose-50 px-3 py-1.5 text-xs text-rose-600 dark:bg-rose-950/30">
                    <MapPin size={12} />
                    {watch('location')}
                  </div>
                )}
              </div>
            )}

            {/* ====================================
                Hidden Inputs
            ==================================== */}

            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={handleImages}
            />

            <input
              ref={videoInputRef}
              type="file"
              accept="video/*"
              hidden
              onChange={handleVideo}
            />
          </div>

          {/* ========================================
              Footer
          ======================================== */}

          <div className="sticky bottom-0 border-t border-slate-200 bg-white/95 p-4 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/95">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <Eye size={14} />

                <span>
                  {audience === 'public'
                    ? 'Anyone can see this post'
                    : audience === 'friends'
                      ? 'Only your friends can see this'
                      : 'Only you can see this post'}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl border border-slate-200 px-5 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-indigo-500 to-fuchsia-500 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  <Send size={15} />

                  {watch('scheduleDate') ? 'Schedule post' : 'Post'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>,
    document.body
  )
}

export default NewPost
