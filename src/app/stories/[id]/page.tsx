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

// Mock data
const mockStory = {
  _id: '1',
  title: 'How I Built My First App and What I Learned Along the Way',
  content: `
    <p>It all started on a rainy Sunday afternoon. I was sitting in my small apartment, scrolling through endless tutorials, wondering if I could actually build something meaningful. Little did I know, that day would change everything.</p>

    <h2>The Beginning</h2>
    <p>I had always been fascinated by technology, but coding seemed like a foreign language. The syntax, the logic, the debugging – it all felt overwhelming. But I had an idea that wouldn't let me go: a simple app to help people track their daily habits.</p>

    <p>Armed with nothing but determination and a free online course, I started learning JavaScript. The first few weeks were brutal. I spent hours staring at error messages, trying to understand why my code wouldn't work.</p>

    <h2>The Breakthrough</h2>
    <p>After three months of consistent learning, something clicked. I finally understood how to think like a programmer. The logical flow, the problem-solving approach – it all started making sense.</p>

    <p>I remember the exact moment I got my first feature working. It was a simple button that added a new habit to a list. But when I clicked it and saw the habit appear on the screen, I felt like I had just climbed Mount Everest.</p>

    <h2>Lessons Learned</h2>
    <p>Looking back, here's what I wish someone had told me:</p>

    <ul>
      <li><strong>Start small.</strong> Don't try to build the next Facebook. Start with something manageable.</li>
      <li><strong>Embrace the struggle.</strong> Every error message is a learning opportunity.</li>
      <li><strong>Build in public.</strong> Share your progress. The support you'll receive is invaluable.</li>
      <li><strong>Ship it.</strong> Done is better than perfect. You can always improve later.</li>
    </ul>

    <h2>The Launch</h2>
    <p>Six months after that rainy Sunday, I launched my app. It wasn't perfect – far from it. But people were using it. Real people, solving real problems with something I built.</p>

    <p>That feeling of creating value for others? It's addictive. And it all started with a single step.</p>

    <p>If you're thinking about learning to code, or building something of your own, this is your sign. Start today. The journey is challenging, but the destination is worth every struggle along the way.</p>
  `,
  excerpt: 'A journey through the ups and downs of creating something from scratch.',
  coverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=600&fit=crop',
  author: {
    _id: 'a1',
    nickname: 'Alex Chen',
    photo: '',
    bio: 'Software developer and lifelong learner. Building cool things one line of code at a time.',
  },
  groupName: 'Tech Tales',
  groupSlug: 'tech-tales',
  createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  likesCount: 42,
  commentsCount: 12,
  readTime: 5,
};

const mockComments: Comment[] = [
  {
    _id: 'c1',
    content: 'This is so inspiring! I\'m currently learning to code and this gives me hope. Thank you for sharing your journey.',
    author: { _id: 'u1', nickname: 'Sarah M.', photo: '' },
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    likesCount: 8,
  },
  {
    _id: 'c2',
    content: 'The "ship it" advice is so true. I spent way too long trying to make my first project perfect and never launched it.',
    author: { _id: 'u2', nickname: 'Mike T.', photo: '' },
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    likesCount: 5,
  },
];

export default function StoryDetailPage({ params }: StoryDetailPageProps) {
  const { client, isAuthenticated, member, login } = useWix();
  const [story, setStory] = useState(mockStory);
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [isLoading, setIsLoading] = useState(false);
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
        const result = await client.items.get({
          dataCollectionId: 'Stories',
          dataItemId: params.id,
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
