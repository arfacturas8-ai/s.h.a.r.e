import Link from 'next/link';
import { StoryCard } from '@/components/stories/StoryCard';
import { stories, groups, getTopStories, getFeaturedStory } from '@/lib/mock-data';

export default function HomePage() {
  const featuredStory = getFeaturedStory();
  const topStories = getTopStories(5);
  const recentStories = stories.filter(s => !s.featured);

  return (
    <main className="min-h-screen bg-cream-50">
      {/* Hero Section */}
      <section className="border-b border-cream-200 bg-white">
        <div className="container-app py-16 md:py-24">
          <div className="max-w-2xl">
            <h1 className="text-display text-charcoal-900 mb-6">
              Every story deserves to be told
            </h1>
            <p className="text-subhead mb-8">
              A warm corner of the internet where people share the moments
              that shaped them. Read, reflect, and add your voice to ours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/stories/new" className="btn-primary">
                Share Your Story
              </Link>
              <Link href="#stories" className="btn-secondary">
                Start Reading
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-app py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Feed */}
          <div className="lg:col-span-8">
            {/* Featured Story */}
            {featuredStory && (
              <div className="mb-12">
                <h2 className="sidebar-title mb-6">Featured Story</h2>
                <StoryCard story={featuredStory} variant="featured" />
              </div>
            )}

            {/* Stories Feed */}
            <div id="stories">
              <h2 className="sidebar-title mb-2">Latest Stories</h2>
              <div className="bg-white rounded-xl border border-cream-200 divide-y divide-cream-100">
                <div className="px-6">
                  {recentStories.map((story) => (
                    <StoryCard key={story._id} story={story} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sidebar">
              {/* Communities */}
              <div className="sidebar-section">
                <h3 className="sidebar-title">Communities</h3>
                <p className="text-charcoal-600 text-sm mb-4">
                  Find your people. Join a community that resonates with your story.
                </p>
                <ul className="space-y-3">
                  {groups.map((group) => (
                    <li key={group._id}>
                      <Link
                        href={`/groups/${group.slug}`}
                        className="flex items-center justify-between py-2 group"
                      >
                        <span className="text-charcoal-800 group-hover:text-terracotta-600 transition-colors">
                          {group.name}
                        </span>
                        <span className="text-xs text-charcoal-400">
                          {group.storyCount} stories
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/groups"
                  className="inline-block mt-4 text-sm text-terracotta-600 hover:text-terracotta-700 transition-colors"
                >
                  View all communities
                </Link>
              </div>

              {/* Top Stories */}
              <div className="sidebar-section">
                <h3 className="sidebar-title">Most Loved</h3>
                <p className="text-charcoal-600 text-sm mb-4">
                  Stories that touched the most hearts this week.
                </p>
                <div className="divide-y divide-cream-100">
                  {topStories.map((story, index) => (
                    <div key={story._id} className="flex gap-3 py-3 first:pt-0">
                      <span className="text-2xl font-serif text-cream-400">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className="flex-1">
                        <StoryCard story={story} variant="minimal" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call to Action */}
              <div className="sidebar-section bg-charcoal-900 text-cream-50 border-charcoal-900">
                <h3 className="text-cream-100 font-serif text-lg mb-2">
                  Your story matters
                </h3>
                <p className="text-cream-300 text-sm mb-4">
                  Every experience, every lesson, every moment of triumph
                  or tenderness is worth sharing.
                </p>
                <Link
                  href="/stories/new"
                  className="inline-block w-full text-center py-2.5 px-4 bg-cream-50 text-charcoal-900 rounded-full text-sm font-medium hover:bg-cream-100 transition-colors"
                >
                  Start Writing
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
