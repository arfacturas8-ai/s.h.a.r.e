import Link from 'next/link';
import { notFound } from 'next/navigation';
import { groups, getGroupBySlug, getStoriesByGroup } from '@/lib/mock-data';
import { StoryCard } from '@/components/stories/StoryCard';

interface GroupDetailPageProps {
  params: { slug: string };
}

// Generate static pages for all groups
export function generateStaticParams() {
  return groups.map((group) => ({
    slug: group.slug,
  }));
}

export default function GroupDetailPage({ params }: GroupDetailPageProps) {
  const group = getGroupBySlug(params.slug);
  const stories = getStoriesByGroup(params.slug);

  if (!group) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-cream-50">
      {/* Header */}
      <section className="bg-white border-b border-cream-200">
        <div className="container-app py-16 md:py-20">
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-charcoal-500 mb-6">
              <Link href="/groups" className="hover:text-charcoal-700 transition-colors">
                Communities
              </Link>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-charcoal-900">{group.name}</span>
            </div>

            <h1 className="text-display text-charcoal-900 mb-6">
              {group.name}
            </h1>

            <p className="text-xl text-charcoal-600 leading-relaxed mb-8">
              {group.description}
            </p>

            {/* Stats */}
            <div className="flex items-center gap-8 text-sm">
              <div>
                <span className="font-semibold text-charcoal-900 text-lg">
                  {group.memberCount.toLocaleString()}
                </span>
                <span className="text-charcoal-500 ml-1">members</span>
              </div>
              <div>
                <span className="font-semibold text-charcoal-900 text-lg">
                  {group.storyCount}
                </span>
                <span className="text-charcoal-500 ml-1">stories</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stories */}
      <section className="container-app py-12 md:py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="sidebar-title">Stories in this community</h2>
          <Link
            href={`/stories/new?group=${group.slug}`}
            className="btn-primary text-sm px-4 py-2"
          >
            Share Your Story
          </Link>
        </div>

        {stories.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-cream-200">
            <div className="w-16 h-16 mx-auto mb-4 bg-cream-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-charcoal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="font-serif text-xl text-charcoal-900 mb-2">No stories yet</h3>
            <p className="text-charcoal-600 mb-6">Be the first to share a story in this community.</p>
            <Link href={`/stories/new?group=${group.slug}`} className="btn-primary">
              Share Your Story
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-cream-200">
            <div className="px-6 divide-y divide-cream-100">
              {stories.map((story) => (
                <StoryCard key={story._id} story={story} />
              ))}
            </div>
          </div>
        )}

        {/* Back link */}
        <div className="text-center mt-8">
          <Link
            href="/groups"
            className="inline-flex items-center gap-2 text-charcoal-600 hover:text-charcoal-900 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to all communities</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
