'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useWix } from '@/lib/wix-context';

interface StoryDetailPageProps {
  params: { id: string };
}

interface Comment {
  _id: string;
  content: string;
  author: {
    _id: string;
    nickname?: string;
    photo?: string;
  };
  createdAt: string;
  likesCount?: number;
}

interface Story {
  _id: string;
  title: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  author?: {
    _id: string;
    nickname?: string;
    photo?: string;
    bio?: string;
  };
  groupName?: string;
  groupSlug?: string;
  createdAt: string;
  likesCount: number;
  commentsCount: number;
  readTime?: number;
}

export default function StoryDetailPage({ params }: StoryDetailPageProps) {
  const { client, isAuthenticated, member, login } = useWix();
  const [story, setStory] = useState<Story | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  useEffect(() => {
    async function fetchStory() {
      if (!client) return;

      setIsLoading(true);
      try {
        const result = await client.items.getDataItem(params.id, {
          dataCollectionId: 'Stories',
        });

        if (result.dataItem) {
          setStory({
            _id: result.dataItem.data?._id,
            title: result.dataItem.data?.title,
            content: result.dataItem.data?.content,
            excerpt: result.dataItem.data?.excerpt,
            coverImage: result.dataItem.data?.coverImage,
            author: result.dataItem.data?.author,
            groupName: result.dataItem.data?.groupName,
            groupSlug: result.dataItem.data?.groupSlug,
            createdAt: result.dataItem.data?._createdDate,
            likesCount: result.dataItem.data?.likesCount || 0,
            commentsCount: result.dataItem.data?.commentsCount || 0,
            readTime: result.dataItem.data?.readTime,
          });
        }
      } catch (error) {
        console.error('Error fetching story:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStory();
  }, [client, params.id]);

  const handleLike = async () => {
    if (!isAuthenticated) {
      login();
      return;
    }
    setIsLiked(!isLiked);
    // TODO: Implement actual like functionality with Wix
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      login();
      return;
    }
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      // Add comment to local state (would save to Wix in production)
      const comment: Comment = {
        _id: Date.now().toString(),
        content: newComment,
        author: {
          _id: member?._id || '',
          nickname: member?.profile?.nickname || 'Anonymous',
          photo: member?.profile?.photo?.url,
        },
        createdAt: new Date().toISOString(),
        likesCount: 0,
      };
      setComments([comment, ...comments]);
      setNewComment('');
    } catch (error) {
      console.error('Error posting comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container-app py-8 max-w-4xl animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />
          <div className="h-64 bg-gray-200 rounded mb-8" />
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
            <div className="h-4 bg-gray-200 rounded w-4/6" />
          </div>
        </div>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Story not found</h2>
          <p className="text-gray-600 mb-4">The story you're looking for doesn't exist.</p>
          <Link href="/" className="btn-primary">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Image */}
      {story.coverImage && (
        <div className="relative h-64 md:h-96 bg-gray-900">
          <Image
            src={story.coverImage}
            alt={story.title}
            fill
            className="object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      )}

      {/* Article */}
      <article className="container-app py-8 md:py-12 max-w-4xl">
        {/* Header */}
        <header className={`${story.coverImage ? '-mt-32 relative z-10' : ''}`}>
          <div className={`${story.coverImage ? 'bg-white rounded-2xl shadow-lg p-6 md:p-10' : ''}`}>
            {/* Group Tag */}
            {story.groupName && (
              <Link
                href={`/groups/${story.groupSlug}`}
                className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4 hover:bg-primary-200 transition-colors"
              >
                {story.groupName}
              </Link>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {story.title}
            </h1>

            {/* Author Info */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 overflow-hidden">
                  {story.author?.photo ? (
                    <Image
                      src={story.author.photo}
                      alt={story.author.nickname || 'Author'}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white font-bold text-lg">
                      {story.author?.nickname?.charAt(0) || 'A'}
                    </div>
                  )}
                </div>
                <div>
                  <Link
                    href={`/members/${story.author?._id}`}
                    className="font-semibold text-gray-900 hover:text-primary-600"
                  >
                    {story.author?.nickname || 'Anonymous'}
                  </Link>
                  <div className="flex items-center text-sm text-gray-500 space-x-2">
                    <span>{formatDate(story.createdAt)}</span>
                    <span>·</span>
                    <span>{story.readTime} min read</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleLike}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
                    isLiked
                      ? 'bg-red-100 text-red-600'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <svg
                    className="w-5 h-5"
                    fill={isLiked ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span>{story.likesCount + (isLiked ? 1 : 0)}</span>
                </button>
                <button className="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div
          className="prose prose-lg max-w-none mt-8 md:mt-12"
          dangerouslySetInnerHTML={{ __html: story.content }}
        />

        {/* Comments Section */}
        <section className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Comments ({comments.length})
          </h2>

          {/* Comment Form */}
          <form onSubmit={handleSubmitComment} className="mb-8">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={isAuthenticated ? 'Share your thoughts...' : 'Sign in to leave a comment'}
              className="input min-h-[120px] resize-none"
              disabled={!isAuthenticated}
            />
            <div className="flex justify-end mt-3">
              <button
                type="submit"
                disabled={!isAuthenticated || !newComment.trim() || isSubmitting}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Posting...' : 'Post Comment'}
              </button>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment._id} className="flex space-x-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex-shrink-0 overflow-hidden">
                  {comment.author.photo ? (
                    <Image
                      src={comment.author.photo}
                      alt={comment.author.nickname || 'User'}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white font-medium">
                      {comment.author.nickname?.charAt(0) || 'U'}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">
                        {comment.author.nickname || 'Anonymous'}
                      </span>
                      <span className="text-sm text-gray-500">
                        {formatDate(comment.createdAt)}
                      </span>
                    </div>
                    <p className="text-gray-700">{comment.content}</p>
                  </div>
                  <div className="flex items-center space-x-4 mt-2 ml-2">
                    <button className="text-sm text-gray-500 hover:text-gray-700 flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <span>{comment.likesCount || 0}</span>
                    </button>
                    <button className="text-sm text-gray-500 hover:text-gray-700">
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}
