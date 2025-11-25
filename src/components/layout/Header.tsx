'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useWix } from '@/lib/wix-context';

export function Header() {
  const { isAuthenticated, isLoading, member, login, logout } = useWix();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Groups', href: '/groups' },
    { name: 'Stories', href: '/stories' },
    { name: 'About', href: '/about' },
  ];

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <nav className="container-app">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="font-heading font-bold text-xl hidden sm:block">
              Share A Cool Story
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Auth / Profile */}
          <div className="hidden md:flex items-center space-x-3">
            {isLoading ? (
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
            ) : isAuthenticated && member ? (
              <div className="relative">
                <button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-50 transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center overflow-hidden">
                    {member.profile?.photo?.url ? (
                      <Image
                        src={member.profile.photo.url}
                        alt="Profile"
                        width={36}
                        height={36}
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-white font-medium">
                        {member.profile?.nickname?.charAt(0) || member.loginEmail?.charAt(0) || 'U'}
                      </span>
                    )}
                  </div>
                  <svg
                    className={`w-4 h-4 text-gray-500 transition-transform ${profileMenuOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                      onClick={() => setProfileMenuOpen(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      href="/my-stories"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                      onClick={() => setProfileMenuOpen(false)}
                    >
                      My Stories
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                      onClick={() => setProfileMenuOpen(false)}
                    >
                      Settings
                    </Link>
                    <hr className="my-1" />
                    <button
                      onClick={() => {
                        setProfileMenuOpen(false);
                        logout();
                      }}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button onClick={login} className="btn-ghost text-sm">
                  Sign In
                </button>
                <button onClick={login} className="btn-primary text-sm">
                  Get Started
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-50"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <hr className="my-2" />
              {isAuthenticated ? (
                <>
                  <Link
                    href="/profile"
                    className="px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                    }}
                    className="px-4 py-3 text-left text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    login();
                  }}
                  className="mx-4 btn-primary"
                >
                  Sign In / Get Started
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
