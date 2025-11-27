import Link from 'next/link';
import { groups, getStoriesByGroup } from '@/lib/mock-data';

export default function GroupsPage() {
  return (
    <main className="min-h-screen bg-cream-50">
      {/* Header */}
      <section className="bg-white border-b border-cream-200">
        <div className="container-app py-16 md:py-20">
          <div className="max-w-2xl">
            <h1 className="text-display text-charcoal-900 mb-6">
              Communities
            </h1>
            <p className="text-subhead">
              Find your tribe. Each community is a gathering of storytellers
              who share a common thread in their experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Communities Grid */}
      <section className="container-app py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {groups.map((group) => {
            const groupStories = getStoriesByGroup(group.slug);
            return (
              <Link
                key={group._id}
                href={`/groups/${group.slug}`}
                className="group block"
              >
                <article className="bg-white rounded-xl border border-cream-200 p-6 md:p-8 h-full transition-all duration-300 hover:shadow-lg hover:border-cream-300">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <h2 className="font-serif text-xl md:text-2xl text-charcoal-900 group-hover:text-terracotta-700 transition-colors">
                      {group.name}
                    </h2>
                    <svg
                      className="w-5 h-5 text-charcoal-300 group-hover:text-terracotta-500 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>

                  {/* Description */}
                  <p className="text-charcoal-600 leading-relaxed mb-6">
                    {group.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-6 text-sm text-charcoal-500">
                    <span className="flex items-center gap-1.5">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {group.memberCount.toLocaleString()} members
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      {group.storyCount} stories
                    </span>
                  </div>

                  {/* Recent Authors */}
                  {groupStories.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-cream-200">
                      <p className="text-xs text-charcoal-500 mb-3">Recent contributors</p>
                      <div className="flex -space-x-2">
                        {groupStories.slice(0, 4).map((story, index) => (
                          <div
                            key={story._id}
                            className="w-8 h-8 rounded-full bg-sage-200 border-2 border-white flex items-center justify-center"
                            style={{ zIndex: 4 - index }}
                          >
                            <span className="text-sage-700 text-xs font-medium">
                              {story.author.nickname.charAt(0)}
                            </span>
                          </div>
                        ))}
                        {group.memberCount > 4 && (
                          <div className="w-8 h-8 rounded-full bg-cream-200 border-2 border-white flex items-center justify-center">
                            <span className="text-charcoal-500 text-xs">
                              +{group.memberCount - 4}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </article>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-white rounded-xl border border-cream-200 p-8 md:p-12 max-w-xl">
            <h3 className="font-serif text-2xl text-charcoal-900 mb-4">
              Don&apos;t see your community?
            </h3>
            <p className="text-charcoal-600 mb-6">
              We&apos;re always looking to grow. If you have an idea for a new community,
              we&apos;d love to hear from you.
            </p>
            <Link href="/about#contact" className="btn-secondary">
              Suggest a Community
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
