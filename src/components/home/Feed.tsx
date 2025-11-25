'use client';

import { StoryCard } from '@/components/stories/StoryCard';
import Link from 'next/link';

interface Author {
  _id: string;
  nickname?: string;
  photo?: string;
}

interface Story {
  _id: string;
  title: string;
  excerpt?: string;
  content?: string;
  coverImage?: string;
  author?: Author;
  groupName?: string;
  groupSlug?: string;
  createdAt: string;
  likesCount?: number;
  commentsCount?: number;
  readTime?: number;
}

interface FeedProps {
  stories: Story[];
  isLoading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
}

export function Feed({ stories, isLoading, hasMore, onLoadMore }: FeedProps) {
  if (isLoading && stories.length === 0) {
    return (
      <section id="stories" className="container-app py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="card animate-pulse">
              <div className="h-48 bg-gray-200" />
              <div className="p-5 space-y-3">
                <div className="h-6 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
                <div className="flex items-center space-x-2 pt-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full" />
                  <div className="h-4 bg-gray-200 rounded w-24" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (stories.length === 0) {
    return (
      <section id="stories" className="container-app py-16 md:py-24">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No stories yet</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Be the first to share a story in this community. Your experience could inspire others!
          </p>
          <Link href="/stories/new" className="btn-primary">
            Share Your Story
          </Link>
        </div>
      </section>
    );
  }

  // Separate featured story (first one) from the rest
  const [featuredStory, ...restStories] = stories;

  return (
    <section id="stories" className="container-app py-8 md:py-12">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Latest Stories</h2>
          <p className="text-gray-500 mt-1">Discover inspiring stories from our community</p>
        </div>
        <Link
          href="/stories/new"
          className="btn-primary hidden md:flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Share Story</span>
        </Link>
      </div>

      {/* Featured Story */}
      {featuredStory && (
        <div className="mb-8">
          <StoryCard story={featuredStory} variant="featured" />
        </div>
      )}

      {/* Story Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restStories.map((story) => (
          <StoryCard key={story._id} story={story} />
        ))}
      </div>

      {/* Load More */}
      {hasMore && (
        <div className="mt-12 text-center">
          <button
            onClick={onLoadMore}
            disabled={isLoading}
            className="btn-secondary"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Loading...
              </>
            ) : (
              'Load More Stories'
            )}
          </button>
        </div>
      )}

      {/* Mobile Share CTA */}
      <div className="md:hidden fixed bottom-6 right-6 z-40">
        <Link
          href="/stories/new"
          className="w-14 h-14 bg-primary-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary-700 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
