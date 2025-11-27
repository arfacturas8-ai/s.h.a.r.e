'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { groups } from '@/lib/mock-data';

function NewStoryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [selectedGroup, setSelectedGroup] = useState(searchParams.get('group') || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim() || !selectedGroup) {
      return;
    }

    setIsSubmitting(true);

    // Simulate submission delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <main className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-16 h-16 mx-auto mb-6 bg-sage-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="font-serif text-2xl text-charcoal-900 mb-4">
            Story submitted!
          </h2>
          <p className="text-charcoal-600 mb-8">
            Thank you for sharing your story. This is a demo, so your story wasn&apos;t actually saved,
            but in production it would appear in the feed.
          </p>
          <Link href="/" className="btn-primary">
            Back to Stories
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream-50">
      <div className="container-narrow py-12 md:py-16">
        <div className="bg-white rounded-xl border border-cream-200 p-6 md:p-10">
          {/* Header */}
          <div className="mb-10">
            <h1 className="font-serif text-3xl text-charcoal-900 mb-3">
              Share Your Story
            </h1>
            <p className="text-charcoal-600">
              Your experience could resonate with someone who needs to hear it.
              Take your time. Be authentic.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Community Selection */}
            <div>
              <label className="block text-sm font-medium text-charcoal-700 mb-2">
                Community
              </label>
              <select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                className="input"
                required
              >
                <option value="">Choose where to share your story...</option>
                {groups.map((group) => (
                  <option key={group._id} value={group.slug}>
                    {group.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-charcoal-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What's your story called?"
                className="input font-serif text-xl"
                required
              />
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-medium text-charcoal-700 mb-2">
                Brief summary
                <span className="text-charcoal-400 font-normal ml-1">(optional)</span>
              </label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="A sentence or two that captures the essence..."
                className="input min-h-[80px] resize-none"
                maxLength={200}
              />
              <p className="text-xs text-charcoal-400 mt-1">
                {excerpt.length}/200 characters
              </p>
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-charcoal-700 mb-2">
                Your Story
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Begin writing here. Let the words flow naturally..."
                className="input min-h-[350px] resize-y leading-relaxed"
                required
              />
              <p className="text-xs text-charcoal-400 mt-1">
                {content.split(/\s+/).filter(Boolean).length} words
              </p>
            </div>

            {/* Writing Tips */}
            <div className="bg-cream-100 rounded-xl p-6">
              <h3 className="font-medium text-charcoal-900 mb-4">A few thoughts on writing</h3>
              <ul className="text-sm text-charcoal-600 space-y-3">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-terracotta-400 mt-2 flex-shrink-0" />
                  <span>Start where the story starts for you, not where you think it should</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-terracotta-400 mt-2 flex-shrink-0" />
                  <span>Details matter - the specific is more universal than the general</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-terracotta-400 mt-2 flex-shrink-0" />
                  <span>Don&apos;t explain what the reader can feel. Trust them</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-terracotta-400 mt-2 flex-shrink-0" />
                  <span>The best endings aren&apos;t conclusions - they&apos;re openings</span>
                </li>
              </ul>
            </div>

            {/* Submit */}
            <div className="flex items-center justify-between pt-4 border-t border-cream-200">
              <button
                type="button"
                onClick={() => router.back()}
                className="text-charcoal-600 hover:text-charcoal-900 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !title.trim() || !content.trim() || !selectedGroup}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Publishing...
                  </span>
                ) : (
                  'Publish Story'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default function NewStoryPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-cream-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-terracotta-600" />
        </div>
      }
    >
      <NewStoryContent />
    </Suspense>
  );
}
