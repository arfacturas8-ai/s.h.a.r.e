'use client';

import Image from 'next/image';
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

interface StoryCardProps {
  story: Story;
  variant?: 'default' | 'featured' | 'compact';
}

export function StoryCard({ story, variant = 'default' }: StoryCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getReadTime = (content?: string) => {
    if (story.readTime) return story.readTime;
    if (!content) return 3;
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  if (variant === 'featured') {
    return (
      <Link href={`/stories/${story._id}`} className="card group block">
        <div className="relative h-64 md:h-80">
          {story.coverImage ? (
            <Image
              src={story.coverImage}
              alt={story.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary-400 to-secondary-400" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            {story.groupName && (
              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium mb-3">
                {story.groupName}
              </span>
            )}
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2 line-clamp-2">
              {story.title}
            </h3>
            <div className="flex items-center space-x-3 text-white/80 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-white/30 overflow-hidden">
                  {story.author?.photo ? (
                    <Image
                      src={story.author.photo}
                      alt={story.author.nickname || 'Author'}
                      width={24}
                      height={24}
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs">
                      {story.author?.nickname?.charAt(0) || 'A'}
                    </div>
                  )}
                </div>
                <span>{story.author?.nickname || 'Anonymous'}</span>
              </div>
              <span>·</span>
              <span>{formatDate(story.createdAt)}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'compact') {
    return (
      <Link href={`/stories/${story._id}`} className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors group">
        <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
          {story.coverImage ? (
            <Image
              src={story.coverImage}
              alt={story.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary-200 to-secondary-200" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {story.title}
          </h4>
          <div className="flex items-center space-x-2 mt-1 text-sm text-gray-500">
            <span>{story.author?.nickname || 'Anonymous'}</span>
            <span>·</span>
            <span>{formatDate(story.createdAt)}</span>
          </div>
        </div>
      </Link>
    );
  }

  // Default variant
  return (
    <Link href={`/stories/${story._id}`} className="card group block">
      {/* Cover Image */}
      <div className="relative h-48 overflow-hidden">
        {story.coverImage ? (
          <Image
            src={story.coverImage}
            alt={story.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-200 to-secondary-200" />
        )}
        {story.groupName && (
          <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700">
            {story.groupName}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {story.title}
        </h3>
        {story.excerpt && (
          <p className="text-gray-600 text-sm line-clamp-2 mb-4">{story.excerpt}</p>
        )}

        {/* Author & Meta */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 overflow-hidden">
              {story.author?.photo ? (
                <Image
                  src={story.author.photo}
                  alt={story.author.nickname || 'Author'}
                  width={32}
                  height={32}
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white text-sm font-medium">
                  {story.author?.nickname?.charAt(0) || 'A'}
                </div>
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                {story.author?.nickname || 'Anonymous'}
              </p>
              <p className="text-xs text-gray-500">{formatDate(story.createdAt)}</p>
            </div>
          </div>

          {/* Engagement */}
          <div className="flex items-center space-x-3 text-gray-400">
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="text-xs">{story.likesCount || 0}</span>
            </div>
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="text-xs">{story.commentsCount || 0}</span>
            </div>
            <span className="text-xs">{getReadTime(story.content)} min</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
