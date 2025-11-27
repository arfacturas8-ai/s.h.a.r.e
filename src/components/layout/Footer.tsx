import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal-900 text-cream-200">
      <div className="container-app py-16 md:py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand Column */}
          <div className="md:col-span-5">
            <Link href="/" className="inline-block">
              <span className="font-serif text-2xl text-cream-50">
                Share a Cool Story
              </span>
            </Link>
            <p className="mt-6 text-cream-300 leading-relaxed max-w-sm">
              A sanctuary for storytellers. Where every voice matters
              and every story finds its audience.
            </p>
            <p className="mt-4 text-cream-400 text-sm italic">
              &ldquo;We are all storytellers. We all live in a network of stories.&rdquo;
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
              {/* Explore */}
              <div>
                <h4 className="text-cream-50 font-medium mb-4 text-sm tracking-wide uppercase">
                  Explore
                </h4>
                <ul className="space-y-3">
                  <li>
                    <Link href="/" className="text-cream-400 hover:text-cream-100 transition-colors text-sm">
                      All Stories
                    </Link>
                  </li>
                  <li>
                    <Link href="/groups" className="text-cream-400 hover:text-cream-100 transition-colors text-sm">
                      Communities
                    </Link>
                  </li>
                  <li>
                    <Link href="/stories/new" className="text-cream-400 hover:text-cream-100 transition-colors text-sm">
                      Share Your Story
                    </Link>
                  </li>
                </ul>
              </div>

              {/* About */}
              <div>
                <h4 className="text-cream-50 font-medium mb-4 text-sm tracking-wide uppercase">
                  About
                </h4>
                <ul className="space-y-3">
                  <li>
                    <Link href="/about" className="text-cream-400 hover:text-cream-100 transition-colors text-sm">
                      Our Story
                    </Link>
                  </li>
                  <li>
                    <Link href="/about#values" className="text-cream-400 hover:text-cream-100 transition-colors text-sm">
                      Values
                    </Link>
                  </li>
                  <li>
                    <Link href="/about#contact" className="text-cream-400 hover:text-cream-100 transition-colors text-sm">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h4 className="text-cream-50 font-medium mb-4 text-sm tracking-wide uppercase">
                  Legal
                </h4>
                <ul className="space-y-3">
                  <li>
                    <Link href="/privacy" className="text-cream-400 hover:text-cream-100 transition-colors text-sm">
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="text-cream-400 hover:text-cream-100 transition-colors text-sm">
                      Terms
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 pt-8 border-t border-charcoal-700">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-cream-500 text-sm">
              &copy; {currentYear} Share a Cool Story
            </p>
            <p className="text-cream-600 text-sm">
              Made with care for storytellers everywhere
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
