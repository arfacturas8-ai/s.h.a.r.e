import Link from 'next/link';
import { notFound } from 'next/navigation';
import { stories, getStoryById, getTopStories } from '@/lib/mock-data';
import { StoryCard } from '@/components/stories/StoryCard';

interface StoryDetailPageProps {
  params: { id: string };
}

// Generate static pages for all stories
export function generateStaticParams() {
  return stories.map((story) => ({
    id: story._id,
  }));
}

export default function StoryDetailPage({ params }: StoryDetailPageProps) {
  const story = getStoryById(params.id);
  const relatedStories = getTopStories(3).filter(s => s._id !== params.id);

  if (!story) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <main className="min-h-screen bg-cream-50">
      {/* Article */}
      <article className="bg-white border-b border-cream-200">
        <div className="container-narrow py-12 md:py-20">
          {/* Header */}
          <header className="mb-12">
            {/* Category */}
            <div className="flex items-center gap-3 mb-6">
              <Link
                href={`/groups/${story.groupSlug}`}
                className="text-sm font-medium uppercase tracking-wider text-terracotta-600 hover:text-terracotta-700 transition-colors"
              >
                {story.groupName}
              </Link>
              <span className="w-1 h-1 rounded-full bg-charcoal-300" />
              <span className="text-sm text-charcoal-500">
                {story.readTime} min read
              </span>
            </div>

            {/* Title */}
            <h1 className="text-display text-charcoal-900 mb-8">
              {story.title}
            </h1>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-sage-200 flex items-center justify-center">
                <span className="text-sage-700 font-medium text-lg">
                  {story.author.nickname.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-medium text-charcoal-900">
                  {story.author.nickname}
                </p>
                <p className="text-sm text-charcoal-500">
                  {formatDate(story.createdAt)}
                </p>
              </div>
            </div>
          </header>

          {/* Excerpt */}
          <div className="mb-10 pb-10 border-b border-cream-200">
            <p className="text-xl text-charcoal-700 leading-relaxed italic">
              {story.excerpt}
            </p>
          </div>

          {/* Content */}
          <div
            className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-charcoal-900 prose-p:text-charcoal-700 prose-p:leading-relaxed prose-a:text-terracotta-600 prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: story.content }}
          />

          {/* Engagement */}
          <div className="mt-12 pt-8 border-t border-cream-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <button className="flex items-center gap-2 text-charcoal-600 hover:text-terracotta-600 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span className="text-sm">{story.likesCount} likes</span>
                </button>
                <button className="flex items-center gap-2 text-charcoal-600 hover:text-terracotta-600 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="text-sm">{story.commentsCount} comments</span>
                </button>
              </div>
              <button className="flex items-center gap-2 text-charcoal-600 hover:text-terracotta-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                <span className="text-sm">Share</span>
              </button>
            </div>
          </div>

          {/* Author Bio */}
          <div className="mt-12 p-6 bg-cream-100 rounded-xl">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-sage-200 flex items-center justify-center flex-shrink-0">
                <span className="text-sage-700 font-medium text-xl">
                  {story.author.nickname.charAt(0)}
                </span>
              </div>
              <div>
                <p className="text-sm text-charcoal-500 mb-1">Written by</p>
                <p className="font-serif text-xl text-charcoal-900 mb-2">
                  {story.author.nickname}
                </p>
                {story.author.bio && (
                  <p className="text-charcoal-600 text-sm leading-relaxed">
                    {story.author.bio}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Stories */}
      {relatedStories.length > 0 && (
        <section className="container-app py-12 md:py-16">
          <h2 className="sidebar-title mb-6">More Stories You Might Love</h2>
          <div className="bg-white rounded-xl border border-cream-200">
            <div className="px-6 divide-y divide-cream-100">
              {relatedStories.map((relatedStory) => (
                <StoryCard key={relatedStory._id} story={relatedStory} />
              ))}
            </div>
          </div>

          {/* Back to all stories */}
          <div className="text-center mt-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-charcoal-600 hover:text-charcoal-900 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to all stories</span>
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}
