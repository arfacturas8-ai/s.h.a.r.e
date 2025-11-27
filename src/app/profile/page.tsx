import Link from 'next/link';
import { stories } from '@/lib/mock-data';
import { StoryCard } from '@/components/stories/StoryCard';

export default function ProfilePage() {
  // For demo, show first 3 stories as "user's stories"
  const userStories = stories.slice(0, 3);

  return (
    <main className="min-h-screen bg-cream-50">
      {/* Profile Header */}
      <section className="bg-white border-b border-cream-200">
        <div className="container-app py-16 md:py-20">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-sage-200 flex items-center justify-center flex-shrink-0">
              <span className="text-sage-700 font-medium text-3xl">
                M
              </span>
            </div>

            {/* Info */}
            <div className="text-center md:text-left flex-1">
              <h1 className="font-serif text-3xl text-charcoal-900 mb-2">
                Maya Chen
              </h1>
              <p className="text-charcoal-600 mb-4 max-w-md">
                Writer and wanderer. Finding poetry in everyday moments.
              </p>
              <div className="flex items-center justify-center md:justify-start gap-6 text-sm text-charcoal-500">
                <span>{userStories.length} stories</span>
                <span>847 likes received</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Link href="/stories/new" className="btn-primary text-sm">
                Write a Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stories */}
      <section className="container-app py-12 md:py-16">
        <h2 className="sidebar-title mb-6">Your Stories</h2>

        {userStories.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-cream-200">
            <div className="w-16 h-16 mx-auto mb-4 bg-cream-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-charcoal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="font-serif text-xl text-charcoal-900 mb-2">No stories yet</h3>
            <p className="text-charcoal-600 mb-6">Your stories will appear here once you start writing.</p>
            <Link href="/stories/new" className="btn-primary">
              Write Your First Story
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-cream-200">
            <div className="px-6 divide-y divide-cream-100">
              {userStories.map((story) => (
                <StoryCard key={story._id} story={story} />
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
