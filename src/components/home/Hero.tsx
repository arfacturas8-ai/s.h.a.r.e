'use client';

import { useWix } from '@/lib/wix-context';

export function Hero() {
  const { login, isAuthenticated } = useWix();

  return (
    <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-700 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      {/* Floating Shapes */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl" />
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-secondary-400/20 rounded-full blur-2xl" />
      <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-primary-300/20 rounded-full blur-xl" />

      <div className="container-app relative py-16 md:py-24 lg:py-32">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
            Join our growing community of storytellers
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Share Your Story,
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-200 to-secondary-300">
              Inspire The World
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            A vibrant community where people from all walks of life come together to celebrate, connect, and be inspired by the diverse and captivating stories that shape our human experience.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {!isAuthenticated && (
              <button
                onClick={login}
                className="w-full sm:w-auto px-8 py-4 bg-white text-primary-700 font-semibold rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Start Sharing Today
              </button>
            )}
            <a
              href="#stories"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all"
            >
              Explore Stories
            </a>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-8 max-w-md mx-auto">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">1K+</div>
              <div className="text-sm text-white/60">Stories Shared</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">500+</div>
              <div className="text-sm text-white/60">Members</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">20+</div>
              <div className="text-sm text-white/60">Communities</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="#F9FAFB"
          />
        </svg>
      </div>
    </section>
  );
}
