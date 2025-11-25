import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-secondary-600 py-20">
        <div className="container-app text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About Share A Cool Story
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            A vibrant online community where people from all walks of life come together to celebrate, connect, and be inspired.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="container-app py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-600 mb-6">
            Share A Cool Story empowers individuals to share their unique and compelling stories with a global audience. We believe that everyone has a story worth telling, and every story has the power to inspire, educate, and connect.
          </p>
          <p className="text-lg text-gray-600 mb-6">
            We envision a world where diverse perspectives are celebrated, where authentic storytelling brings people together, and where shared experiences create understanding across cultures and communities.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-16 md:py-24">
        <div className="container-app">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Authenticity</h3>
              <p className="text-gray-600">
                We celebrate real stories from real people. No filters, no pretense – just genuine human experiences.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-secondary-100 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Community</h3>
              <p className="text-gray-600">
                We foster meaningful connections between storytellers and readers from around the world.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Inspiration</h3>
              <p className="text-gray-600">
                Every story has the power to spark change, motivate action, and inspire others to share their own journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Guidelines */}
      <section className="container-app py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Community Guidelines</h2>
          <div className="space-y-6 text-gray-600">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Age Requirement</h3>
              <p>Users must be at least 13 years of age to use Share A Cool Story. By using our platform, you affirm that you meet this age requirement.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Content Ownership</h3>
              <p>By submitting content on our platform, you affirm that you own the rights to that content or have obtained necessary permissions to share it.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Respectful Community</h3>
              <p>We expect all members to treat each other with respect and kindness. Harassment, hate speech, and harmful content are not tolerated.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 py-16 md:py-24">
        <div className="container-app text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Share Your Story?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Join thousands of storytellers who are inspiring others every day. Your story matters.
          </p>
          <Link href="/stories/new" className="btn-primary text-lg px-8 py-4">
            Start Writing Today
          </Link>
        </div>
      </section>
    </div>
  );
}
