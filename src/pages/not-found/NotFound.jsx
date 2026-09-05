import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Compass,
  Home,
  Heart,
  MessageCircle,
  Search,
  Share2,
  Sparkles,
  UserPlus,
  Users,
  Zap,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  // ============================================
  // 3D Mouse Parallax Effect
  // ============================================
  useEffect(() => {
    const handleMouseMove = e => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;

      setMousePosition({
        x,
        y,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // ============================================
  // Floating Social Cards
  // ============================================
  const socialCards = [
    {
      icon: Heart,
      title: 'Someone liked your post',
      subtitle: '2 min ago',
      position:
        'left-4 top-24 lg:left-10 lg:top-32',
      animation: 'animate-[float_5s_ease-in-out_infinite]',
      rotate: '-rotate-6',
    },
    {
      icon: MessageCircle,
      title: 'New message',
      subtitle: 'Hey! Are you there? 👋',
      position:
        'right-4 top-20 lg:right-10 lg:top-28',
      animation: 'animate-[float_6s_ease-in-out_infinite]',
      rotate: 'rotate-6',
    },
    {
      icon: UserPlus,
      title: 'New connection',
      subtitle: 'Alex started following you',
      position:
        'left-10 bottom-28 lg:left-16 lg:bottom-32',
      animation: 'animate-[float_7s_ease-in-out_infinite]',
      rotate: 'rotate-3',
    },
    {
      icon: Share2,
      title: 'Post shared',
      subtitle: 'Your story is trending',
      position:
        'right-8 bottom-24 lg:right-16 lg:bottom-28',
      animation: 'animate-[float_5.5s_ease-in-out_infinite]',
      rotate: '-rotate-4',
    },
  ];

  return (
    <>
      {/* ============================================
          Custom Animation Styles
      ============================================ */}
      <style>
        {`
          @keyframes float {
            0%, 100% {
              transform: translateY(0px) rotate(0deg);
            }

            50% {
              transform: translateY(-18px) rotate(2deg);
            }
          }

          @keyframes pulse3d {
            0%, 100% {
              transform: scale(1) rotateX(0deg) rotateY(0deg);
            }

            50% {
              transform: scale(1.04) rotateX(4deg) rotateY(-4deg);
            }
          }

          @keyframes orbit {
            from {
              transform: rotate(0deg) translateX(115px) rotate(0deg);
            }

            to {
              transform: rotate(360deg) translateX(115px) rotate(-360deg);
            }
          }

          @keyframes orbitReverse {
            from {
              transform: rotate(360deg) translateX(150px) rotate(-360deg);
            }

            to {
              transform: rotate(0deg) translateX(150px) rotate(0deg);
            }
          }

          @keyframes glow {
            0%, 100% {
              opacity: .35;
              transform: scale(1);
            }

            50% {
              opacity: .65;
              transform: scale(1.15);
            }
          }

          .perspective-1000 {
            perspective: 1000px;
          }

          .preserve-3d {
            transform-style: preserve-3d;
          }

          .backface-hidden {
            backface-visibility: hidden;
          }
        `}
      </style>

      <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
        {/* ============================================
            Background Gradients
        ============================================ */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-indigo-600/25 blur-3xl" />

          <div className="absolute -bottom-40 -right-40 h-105 w-105 rounded-full bg-fuchsia-600/20 blur-3xl" />

          <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/15 blur-3xl" />
        </div>

        {/* ============================================
            Background Grid
        ============================================ */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(255,255,255,.5) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(255,255,255,.5) 1px,
                transparent 1px
              )
            `,
            backgroundSize: '45px 45px',
          }}
        />

        {/* ============================================
            Navbar / Logo
        ============================================ */}
        <header className="relative z-30 flex items-center justify-between px-6 py-6 lg:px-12">
          <button
            onClick={() => navigate('/')}
            className="group flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-500 to-fuchsia-500 shadow-lg shadow-indigo-500/20 transition duration-300 group-hover:scale-110 group-hover:rotate-6">
              <Sparkles size={21} />
            </div>

            <div className="text-left">
              <h1 className="text-lg font-bold tracking-tight">
                Nexora
              </h1>

              <p className="text-[11px] text-white/40">
                Connect. Share. Discover.
              </p>
            </div>
          </button>

          <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/60 backdrop-blur-xl sm:flex">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            Social universe online
          </div>
        </header>

        {/* ============================================
            Main Content
        ============================================ */}
        <div className="relative z-10 flex min-h-[calc(100vh-96px)] items-center justify-center px-6 pb-16">
          {/* ============================================
              Floating Social Cards
          ============================================ */}
          {socialCards.map(
            ({
              icon: Icon,
              title,
              subtitle,
              position,
              animation,
              rotate,
            }) => (
              <div
                key={title}
                className={`absolute z-20 hidden w-56 ${position} ${animation} md:block`}
              >
                <div
                  className={`rounded-2xl border border-white/10 bg-white/7 p-3 shadow-2xl shadow-black/20 backdrop-blur-xl ${rotate}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
                      <Icon size={17} />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold">
                        {title}
                      </p>

                      <p className="mt-0.5 truncate text-[10px] text-white/45">
                        {subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ),
          )}

          {/* ============================================
              3D Center Scene
          ============================================ */}
          <div
            className="relative flex w-full max-w-4xl flex-col items-center justify-center"
          >
            {/* Orbiting Icons */}
            <div className="pointer-events-none absolute left-1/2 top-[38%] hidden h-2 w-2 lg:block">
              <div
                className="absolute"
                style={{
                  animation:
                    'orbit 12s linear infinite',
                }}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/10 shadow-xl backdrop-blur-xl">
                  <Heart size={17} />
                </div>
              </div>

              <div
                className="absolute"
                style={{
                  animation:
                    'orbitReverse 16s linear infinite',
                }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 shadow-xl backdrop-blur-xl">
                  <Users size={15} />
                </div>
              </div>
            </div>

            {/* ============================================
                3D 404 Object
            ============================================ */}
            <div
              className="perspective-1000 relative"
              style={{
                transform: `
                  rotateX(${-mousePosition.y * 0.35}deg)
                  rotateY(${mousePosition.x * 0.35}deg)
                `,
                transition: 'transform 0.15s ease-out',
              }}
            >
              {/* Glow */}
              <div
                className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/25 blur-3xl"
                style={{
                  animation:
                    'glow 4s ease-in-out infinite',
                }}
              />

              {/* 404 Container */}
              <div
                className="preserve-3d relative"
                style={{
                  animation:
                    'pulse3d 5s ease-in-out infinite',
                }}
              >
                <div className="relative flex items-center justify-center">
                  {/* Number */}
                  <span
                    className="select-none bg-linear-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-[9rem] font-black leading-none tracking-[-0.08em] text-transparent drop-shadow-2xl sm:text-[12rem] lg:text-[15rem]"
                    style={{
                      textShadow:
                        '0 25px 70px rgba(99,102,241,.25)',
                    }}
                  >
                    404
                  </span>

                  {/* Floating Spark */}
                  <div className="absolute right-[15%] top-[5%] flex h-10 w-10 rotate-12 items-center justify-center rounded-xl border border-white/10 bg-white/10 shadow-xl backdrop-blur-xl">
                    <Zap
                      size={18}
                      className="text-yellow-300"
                    />
                  </div>

                  {/* Floating Search */}
                  <div className="absolute bottom-[12%] left-[7%] flex h-12 w-12 -rotate-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10 shadow-xl backdrop-blur-xl">
                    <Search size={19} />
                  </div>
                </div>

                {/* 3D Floor Shadow */}
                <div className="absolute -bottom-5 left-1/2 h-8 w-3/4 -translate-x-1/2 rounded-[50%] bg-indigo-500/20 blur-2xl" />
              </div>
            </div>

            {/* ============================================
                Content
            ============================================ */}
            <div className="relative z-10 mt-6 max-w-2xl text-center">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/60 shadow-xl backdrop-blur-xl">
                <Compass size={14} />
                Looks like you lost the connection
              </div>

              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                This page went
                <span className="mx-2 bg-linear-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                  offline.
                </span>
              </h2>

              <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/50 sm:text-base">
                The page you're looking for doesn't exist,
                has been moved, or disappeared into the
                Nexora social universe.
              </p>

              {/* ============================================
                  Action Buttons
              ============================================ */}
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <button
                  onClick={() => navigate('/')}
                  className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-indigo-500 to-violet-500 px-6 py-3.5 text-sm font-semibold shadow-xl shadow-indigo-500/20 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/30 sm:w-auto"
                >
                  <Home
                    size={17}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />

                  Back to Home
                </button>

                <button
                  onClick={() => navigate(-1)}
                  className="group flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white/80 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/10 sm:w-auto"
                >
                  <ArrowLeft
                    size={17}
                    className="transition-transform duration-300 group-hover:-translate-x-1"
                  />

                  Go Back
                </button>
              </div>

              {/* ============================================
                  Social Features
              ============================================ */}
              <div className="mt-12 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-[11px] text-white/35">
                <div className="flex items-center gap-1.5">
                  <Users size={13} />
                  Communities
                </div>

                <div className="flex items-center gap-1.5">
                  <MessageCircle size={13} />
                  Messaging
                </div>

                <div className="flex items-center gap-1.5">
                  <Heart size={13} />
                  Stories
                </div>

                <div className="flex items-center gap-1.5">
                  <Share2 size={13} />
                  Sharing
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================
            Bottom Status
        ============================================ */}
        <div className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 text-center text-[10px] text-white/25">
          <p>
            © {new Date().getFullYear()} Nexora
          </p>

          <p className="mt-1">
            Your social universe is waiting for you.
          </p>
        </div>
      </main>
    </>
  );
};

export default NotFound;
