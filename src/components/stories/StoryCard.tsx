'use client';

import Link from 'next/link';
import { Story } from '@/lib/mock-data';

interface StoryCardProps {
  story: Story;
  variant?: 'default' | 'featured' | 'minimal';
}

export function StoryCard({ story, variant = 'default' }: StoryCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
    });
  };

  // Featured variant - large hero card
  if (variant === 'featured') {
    return (
      <Link href={`/stories/${story._id}`} className="group block">
        <article className="bg-white rounded-xl border border-cream-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-cream-300">
          <div className="p-6 md:p-8">
            {/* Category */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-medium uppercase tracking-wider text-terracotta-600">
                {story.groupName}
              </span>
              <span className="w-1 h-1 rounded-full bg-charcoal-300" />
              <span className="text-xs text-charcoal-500">
                {story.readTime} min read
              </span>
            </div>

            {/* Title */}
            <h2 className="font-serif text-2xl md:text-3xl text-charcoal-900 mb-4 group-hover:text-terracotta-700 transition-colors leading-tight">
              {story.title}
            </h2>

            {/* Excerpt */}
            <p className="text-charcoal-600 leading-relaxed mb-6 line-clamp-3">
              {story.excerpt}
            </p>

            {/* Author & Meta */}
            <div className="flex items-center justify-between pt-4 border-t border-cream-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-sage-200 flex items-center justify-center">
                  <span className="text-sage-700 font-medium text-sm">
                    {story.author.nickname.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-charcoal-900">
                    {story.author.nickname}
                  </p>
                  <p className="text-xs text-charcoal-500">
                    {formatDate(story.createdAt)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-charcoal-400">
                <span className="flex items-center gap-1 text-xs">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  {story.likesCount}
                </span>
                <span className="flex items-center gap-1 text-xs">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  {story.commentsCount}
                </span>
              </div>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  // Minimal variant - sidebar/compact list
  if (variant === 'minimal') {
    return (
      <Link href={`/stories/${story._id}`} className="group block py-3">
        <article>
          <h4 className="font-serif text-base text-charcoal-800 group-hover:text-terracotta-700 transition-colors leading-snug mb-1 line-clamp-2">
            {story.title}
          </h4>
          <div className="flex items-center gap-2 text-xs text-charcoal-500">
            <span>{story.author.nickname}</span>
            <span className="w-1 h-1 rounded-full bg-charcoal-300" />
            <span>{story.likesCount} likes</span>
          </div>
        </article>
      </Link>
    );
  }

  // Default variant - feed card
  return (
    <Link href={`/stories/${story._id}`} className="group block">
      <article className="py-6 border-b border-cream-200 last:border-b-0">
        {/* Category & Time */}
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs font-medium uppercase tracking-wider text-terracotta-600">
            {story.groupName}
          </span>
          <span className="w-1 h-1 rounded-full bg-charcoal-300" />
          <span className="text-xs text-charcoal-500">
            {story.readTime} min read
          </span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-xl md:text-2xl text-charcoal-900 mb-3 group-hover:text-terracotta-700 transition-colors leading-tight">
          {story.title}
        </h3>

        {/* Excerpt */}
        <p className="text-charcoal-600 text-sm leading-relaxed mb-4 line-clamp-2">
          {story.excerpt}
        </p>

        {/* Author & Meta */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-sage-200 flex items-center justify-center">
              <span className="text-sage-700 font-medium text-xs">
                {story.author.nickname.charAt(0)}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-charcoal-800">
                {story.author.nickname}
              </p>
              <p className="text-xs text-charcoal-500">
                {formatDate(story.createdAt)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-charcoal-400">
            <span className="flex items-center gap-1 text-xs">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {story.likesCount}
            </span>
            <span className="flex items-center gap-1 text-xs">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {story.commentsCount}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
