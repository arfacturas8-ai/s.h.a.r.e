'use client';

import { useState } from 'react';
import Link from 'next/link';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-cream-50 border-b border-cream-200 sticky top-0 z-50">
      <nav className="container-app">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="group">
            <span className="font-serif text-xl md:text-2xl text-charcoal-900 tracking-tight">
              Share a Cool Story
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-charcoal-600 hover:text-charcoal-900 transition-colors text-sm tracking-wide"
            >
              Stories
            </Link>
            <Link
              href="/groups"
              className="text-charcoal-600 hover:text-charcoal-900 transition-colors text-sm tracking-wide"
            >
              Communities
            </Link>
            <Link
              href="/about"
              className="text-charcoal-600 hover:text-charcoal-900 transition-colors text-sm tracking-wide"
            >
              About
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/stories/new"
              className="btn-primary text-sm px-5 py-2.5"
            >
              Share Your Story
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 -mr-2 text-charcoal-600 hover:text-charcoal-900"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-6 border-t border-cream-200 animate-fade-in">
            <div className="flex flex-col space-y-1">
              <Link
                href="/"
                className="px-2 py-3 text-charcoal-800 hover:text-charcoal-900 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Stories
              </Link>
              <Link
                href="/groups"
                className="px-2 py-3 text-charcoal-800 hover:text-charcoal-900 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Communities
              </Link>
              <Link
                href="/about"
                className="px-2 py-3 text-charcoal-800 hover:text-charcoal-900 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <div className="pt-4">
                <Link
                  href="/stories/new"
                  className="btn-primary w-full text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Share Your Story
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
