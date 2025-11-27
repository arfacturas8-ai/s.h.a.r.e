'use client';

import { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useWix } from '@/lib/wix-context';

interface Group {
  _id: string;
  name: string;
  slug: string;
}

function NewStoryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { client, isAuthenticated, isLoading: isAuthLoading, member, login } = useWix();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [selectedGroup, setSelectedGroup] = useState(searchParams.get('group') || '');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [groups, setGroups] = useState<Group[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingGroups, setIsLoadingGroups] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      login();
    }
  }, [isAuthLoading, isAuthenticated, login]);

  useEffect(() => {
    async function fetchGroups() {
      if (!client) return;

      setIsLoadingGroups(true);
      try {
        const result = await client.groups.queryGroups().find();
        setGroups(
          result.items.map((g: any) => ({
            _id: g._id,
            name: g.name,
            slug: g.slug,
          }))
        );
      } catch (error) {
        console.error('Error fetching groups:', error);
      } finally {
        setIsLoadingGroups(false);
      }
    }

    fetchGroups();
  }, [client]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Please enter a title for your story');
      return;
    }
    if (!content.trim()) {
      setError('Please write some content for your story');
      return;
    }
    if (!selectedGroup) {
      setError('Please select a community for your story');
      return;
    }

    setIsSubmitting(true);

    try {
      const selectedGroupData = groups.find((g) => g.slug === selectedGroup);

      // Save story to Wix CMS
      if (client) {
        await client.items.insert('Stories', {
          title,
          content: `<div>${content.split('\n').map((p) => `<p>${p}</p>`).join('')}</div>`,
          excerpt: excerpt || content.substring(0, 200) + '...',
          coverImage: coverImageUrl || null,
          groupSlug: selectedGroup,
          groupName: selectedGroupData?.name,
          author: {
            _id: member?._id,
            nickname: member?.profile?.nickname || 'Anonymous',
            photo: member?.profile?.photo?.url,
          },
          likesCount: 0,
          commentsCount: 0,
          readTime: Math.ceil(content.split(/\s+/).length / 200),
        });
      }

      router.push('/');
    } catch (error) {
      console.error('Error creating story:', error);
      setError('Failed to publish your story. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Sign in to share your story</h2>
          <button onClick={login} className="btn-primary">
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-app py-8 md:py-12 max-w-3xl">
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Share Your Story
          </h1>
          <p className="text-gray-600 mb-8">
            Your experience could inspire thousands. Take your time and tell your story authentically.
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Community Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Choose a Community *
              </label>
              <select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                className="input"
                required
              >
                <option value="">Select a community...</option>
                {groups.map((group) => (
                  <option key={group._id} value={group.slug}>
                    {group.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Give your story a compelling title..."
                className="input text-xl font-semibold"
                required
              />
            </div>

            {/* Cover Image URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cover Image URL (optional)
              </label>
              <input
                type="url"
                value={coverImageUrl}
                onChange={(e) => setCoverImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="input"
              />
              {coverImageUrl && (
                <div className="mt-2 relative h-40 rounded-lg overflow-hidden">
                  <img
                    src={coverImageUrl}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                    onError={() => setCoverImageUrl('')}
                  />
                </div>
              )}
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Short Description (optional)
              </label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="A brief summary that will appear in previews..."
                className="input min-h-[80px] resize-none"
                maxLength={300}
              />
              <p className="text-xs text-gray-500 mt-1">
                {excerpt.length}/300 characters
              </p>
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Story *
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start writing your story here. Be authentic, share your experiences, lessons learned, and what made this moment meaningful to you..."
                className="input min-h-[400px] resize-y leading-relaxed"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                {content.split(/\s+/).filter(Boolean).length} words · ~{Math.ceil(content.split(/\s+/).filter(Boolean).length / 200)} min read
              </p>
            </div>

            {/* Writing Tips */}
            <div className="bg-gray-50 rounded-xl p-5">
              <h3 className="font-medium text-gray-900 mb-3">Writing Tips</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Start with a hook that draws readers in
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Be specific – details make stories memorable
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Share what you learned or how you changed
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  End with a takeaway for your readers
                </li>
              </ul>
            </div>

            {/* Submit */}
            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="btn-ghost"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Publishing...
                  </>
                ) : (
                  'Publish Story'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function NewStoryPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
        </div>
      }
    >
      <NewStoryContent />
    </Suspense>
  );
}
