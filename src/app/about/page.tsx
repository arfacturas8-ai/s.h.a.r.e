import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-cream-50">
      {/* Hero */}
      <section className="bg-white border-b border-cream-200">
        <div className="container-app py-20 md:py-28">
          <div className="max-w-3xl">
            <h1 className="text-display text-charcoal-900 mb-8">
              Stories connect us. That&apos;s why we&apos;re here.
            </h1>
            <p className="text-xl text-charcoal-600 leading-relaxed">
              In a world of infinite noise, we created a quiet place for the stories
              that matter. The ones that make us laugh, cry, think, and feel less alone.
            </p>
          </div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="container-app py-16 md:py-24">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-wider text-terracotta-600 mb-6">
            Our Beginning
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal-900 mb-8">
            It started with a simple question
          </h2>
          <div className="space-y-6 text-charcoal-700 leading-relaxed">
            <p>
              What if there was a place on the internet that felt like sitting around
              a campfire? A place where strangers became friends through the simple act
              of sharing what they&apos;ve lived through?
            </p>
            <p>
              That question became Share a Cool Story. Not a platform obsessed with
              metrics or virality, but a community built on something older and more
              human: the belief that our stories, honestly told, have the power to
              change lives.
            </p>
            <p>
              Today, thousands of storytellers call this place home. They come from
              different backgrounds, hold different beliefs, and have lived vastly
              different lives. But they share one thing: the courage to be vulnerable,
              and the generosity to share what they&apos;ve learned.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section id="values" className="bg-white border-y border-cream-200 py-16 md:py-24">
        <div className="container-app">
          <div className="max-w-2xl mb-12">
            <p className="text-sm uppercase tracking-wider text-terracotta-600 mb-6">
              What We Believe
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal-900">
              Principles that guide everything we do
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div>
              <div className="w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl text-charcoal-900 mb-3">
                Truth over perfection
              </h3>
              <p className="text-charcoal-600 leading-relaxed">
                The best stories aren&apos;t polished performances. They&apos;re honest accounts
                of messy, complicated, beautifully human lives. We celebrate authenticity
                above all else.
              </p>
            </div>

            <div>
              <div className="w-12 h-12 rounded-full bg-terracotta-100 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-terracotta-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl text-charcoal-900 mb-3">
                Generosity of spirit
              </h3>
              <p className="text-charcoal-600 leading-relaxed">
                Sharing your story is an act of generosity. Reading someone else&apos;s
                with an open heart is too. We built this space for people who approach
                both with care.
              </p>
            </div>

            <div>
              <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl text-charcoal-900 mb-3">
                Slow and thoughtful
              </h3>
              <p className="text-charcoal-600 leading-relaxed">
                In an age of endless scrolling, we&apos;re intentionally different.
                Every story here deserves to be read slowly, savored, and carried
                with you long after you&apos;ve finished.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Guidelines */}
      <section className="container-app py-16 md:py-24">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-wider text-terracotta-600 mb-6">
            Our Expectations
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal-900 mb-8">
            How we treat each other here
          </h2>
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-cream-200 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-charcoal-500 font-medium text-sm">1</span>
              </div>
              <div>
                <h3 className="font-medium text-charcoal-900 mb-2">
                  Lead with kindness
                </h3>
                <p className="text-charcoal-600">
                  Every story here represents a real person who took a risk by sharing.
                  Honor that vulnerability with thoughtful, compassionate responses.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-cream-200 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-charcoal-500 font-medium text-sm">2</span>
              </div>
              <div>
                <h3 className="font-medium text-charcoal-900 mb-2">
                  Share what&apos;s yours to share
                </h3>
                <p className="text-charcoal-600">
                  Your story is your own. When telling it involves others, do so
                  with care and respect for their privacy and dignity.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-cream-200 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-charcoal-500 font-medium text-sm">3</span>
              </div>
              <div>
                <h3 className="font-medium text-charcoal-900 mb-2">
                  Create space for everyone
                </h3>
                <p className="text-charcoal-600">
                  This community thrives on diverse perspectives. Make room for
                  voices different from your own. Listen more than you speak.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-charcoal-900 text-cream-50 py-16 md:py-24">
        <div className="container-app">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-cream-50 mb-6">
              We&apos;d love to hear from you
            </h2>
            <p className="text-cream-300 mb-8 leading-relaxed">
              Have a question, suggestion, or just want to say hello?
              We read every message and genuinely appreciate you taking the time.
            </p>
            <a
              href="mailto:hello@shareacoolstory.com"
              className="inline-flex items-center gap-2 text-cream-100 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>hello@shareacoolstory.com</span>
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-app py-16 md:py-24">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-serif text-3xl text-charcoal-900 mb-6">
            Ready to share your story?
          </h2>
          <p className="text-charcoal-600 mb-8">
            Your experience, your lessons, your moments of clarity and confusion
            all have value. Someone out there needs to hear exactly what you have to say.
          </p>
          <Link href="/stories/new" className="btn-primary">
            Start Writing
          </Link>
        </div>
      </section>
    </main>
  );
}
