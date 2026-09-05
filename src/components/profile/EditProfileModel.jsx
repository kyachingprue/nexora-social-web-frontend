import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  X,
  User,
  AtSign,
  FileText,
  MapPin,
  Globe,
  Briefcase,
  GraduationCap,
  CalendarDays,
  Loader2,
} from "lucide-react";
import userService from "../../services/userService";

export default function EditProfileModal({
  user,
  open,
  onClose,
  onUpdated,
}) {
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      username: "",
      bio: "",
      location: "",
      website: "",
      profession: "",
      company: "",
      education: "",
      birthday: "",
      gender: "",
    },
  });

  // -----------------------------------------
  // Load existing user data into form
  // -----------------------------------------

  useEffect(() => {
    if (!user || !open) return;

    reset({
      name: user?.name || "",
      username: user?.username || "",
      bio: user?.bio || "",
      location: user?.location || "",
      website: user?.website || "",
      profession: user?.profession || "",
      company: user?.company || "",
      education: user?.education || "",
      birthday: user?.birthday
        ? user.birthday.substring(0, 10)
        : "",
      gender: user?.gender || "",
    });

    setServerError("");
  }, [user, open, reset]);

  // -----------------------------------------
  // Submit
  // -----------------------------------------

  const onSubmit = async (data) => {
    try {
      setServerError("");

      // Remove empty values if necessary
      const profileData = {
        name: data.name.trim(),
        username: data.username.trim(),
        bio: data.bio.trim(),
        location: data.location.trim(),
        website: data.website.trim(),
        profession: data.profession.trim(),
        company: data.company.trim(),
        education: data.education.trim(),
        birthday: data.birthday || null,
        gender: data.gender || null,
      };

      const response = await userService.updateProfile(profileData);

      console.log("PROFILE UPDATED:", response);

      // Different backend response structures
      const updatedUser =
        response?.data?.data ||
        response?.data?.user ||
        response?.user ||
        response?.data ||
        response
       console.log('PROFILE ERROR Update---:', response)
      onUpdated(updatedUser);

      onClose();
    } catch (error) {
      console.error("UPDATE PROFILE ERROR:", error);

      setServerError(
        error?.response?.data?.message ||
          "Profile update failed. Please try again."
      );
    }
  };

  // -----------------------------------------
  // Don't render when closed
  // -----------------------------------------

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative flex max-h-[95vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-950">
        {/* =====================================
            HEADER
        ====================================== */}

        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 dark:border-gray-800">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Edit profile
            </h2>

            <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
              Update your Nexora profile information
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 disabled:cursor-not-allowed dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* =====================================
            FORM
        ====================================== */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="overflow-y-auto"
        >
          <div className="space-y-6 p-5">
            {/* =================================
                BASIC INFORMATION
            ================================== */}

            <section>
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Basic information
                </h3>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Tell people who you are.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Name */}

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Full name
                  </label>

                  <div className="relative">
                    <User
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      {...register("name", {
                        required: "Name is required",
                        minLength: {
                          value: 2,
                          message: "Name must be at least 2 characters",
                        },
                      })}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                      placeholder="Your full name"
                    />
                  </div>

                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Username */}

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Username
                  </label>

                  <div className="relative">
                    <AtSign
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      {...register("username", {
                        required: "Username is required",
                        minLength: {
                          value: 3,
                          message:
                            "Username must be at least 3 characters",
                        },
                      })}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                      placeholder="aongkya"
                    />
                  </div>

                  {errors.username && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.username.message}
                    </p>
                  )}
                </div>

                {/* Bio */}

                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Bio
                  </label>

                  <div className="relative">
                    <FileText
                      size={17}
                      className="absolute left-3 top-3 text-gray-400"
                    />

                    <textarea
                      {...register("bio", {
                        maxLength: {
                          value: 160,
                          message:
                            "Bio cannot exceed 160 characters",
                        },
                      })}
                      rows={4}
                      maxLength={160}
                      className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                      placeholder="Tell people about yourself..."
                    />
                  </div>

                  {errors.bio && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.bio.message}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* =================================
                PERSONAL INFORMATION
            ================================== */}

            <section className="border-t border-gray-100 pt-6 dark:border-gray-800">
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Personal information
                </h3>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Add information that appears on your profile.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Location */}

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Location
                  </label>

                  <div className="relative">
                    <MapPin
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      {...register("location")}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                      placeholder="Chattogram, Bangladesh"
                    />
                  </div>
                </div>

                {/* Website */}

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Website
                  </label>

                  <div className="relative">
                    <Globe
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      {...register("website")}
                      type="url"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>

                {/* Profession */}

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Profession
                  </label>

                  <div className="relative">
                    <Briefcase
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      {...register("profession")}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                      placeholder="Frontend Developer"
                    />
                  </div>
                </div>

                {/* Company */}

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Company
                  </label>

                  <div className="relative">
                    <Briefcase
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      {...register("company")}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                      placeholder="Company name"
                    />
                  </div>
                </div>

                {/* Education */}

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Education
                  </label>

                  <div className="relative">
                    <GraduationCap
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      {...register("education")}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                      placeholder="University / College"
                    />
                  </div>
                </div>

                {/* Birthday */}

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Birthday
                  </label>

                  <div className="relative">
                    <CalendarDays
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      {...register("birthday")}
                      type="date"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* Gender */}

                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Gender
                  </label>

                  <select
                    {...register("gender")}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  >
                    <option value="">Prefer not to say</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
              </div>
            </section>

            {/* =================================
                ERROR
            ================================== */}

            {serverError && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
                {serverError}
              </div>
            )}
          </div>

          {/* ===================================
              FOOTER
          ==================================== */}

          <div className="sticky bottom-0 flex items-center justify-end gap-3 border-t border-gray-200 bg-white px-5 py-4 dark:border-gray-800 dark:bg-gray-950">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-xl px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Saving...
                </>
              ) : (
                "Save changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

