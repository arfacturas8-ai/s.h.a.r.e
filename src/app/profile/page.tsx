'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useWix } from '@/lib/wix-context';
import { StoryCard } from '@/components/stories/StoryCard';

interface UserStory {
  _id: string;
  title: string;
  excerpt?: string;
  coverImage?: string;
  groupName?: string;
  groupSlug?: string;
  createdAt: string;
  likesCount?: number;
  commentsCount?: number;
  readTime?: number;
}

export default function ProfilePage() {
  const { client, isAuthenticated, isLoading: isAuthLoading, member, login, logout } = useWix();
  const [stories, setStories] = useState<UserStory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'stories' | 'liked' | 'groups'>('stories');

  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      login();
    }
  }, [isAuthLoading, isAuthenticated, login]);

  useEffect(() => {
    async function fetchUserStories() {
      if (!client || !member) return;

      setIsLoading(true);
      try {
        const result = await client.items
          .query('Stories')
          .eq('author._id', member._id)
          .descending('_createdDate')
          .find();

        if (result.items.length > 0) {
          setStories(
            result.items.map((item: any) => ({
              _id: item.data._id,
              title: item.data.title,
              excerpt: item.data.excerpt,
              coverImage: item.data.coverImage,
              groupName: item.data.groupName,
              groupSlug: item.data.groupSlug,
              createdAt: item.data._createdDate,
              likesCount: item.data.likesCount || 0,
              commentsCount: item.data.commentsCount || 0,
              readTime: item.data.readTime,
            }))
          );
        }
      } catch (error) {
        console.error('Error fetching stories:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserStories();
  }, [client, member]);

  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
      </div>
    );
  }

  if (!isAuthenticated || !member) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Sign in to view your profile</h2>
          <button onClick={login} className="btn-primary">
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-primary-600 to-secondary-600 py-16">
        <div className="container-app">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
            {/* Avatar */}
            <div className="w-32 h-32 rounded-full bg-white/20 border-4 border-white overflow-hidden">
              {member.profile?.photo?.url ? (
                <Image
                  src={member.profile.photo.url}
                  alt="Profile"
                  width={128}
                  height={128}
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white text-4xl font-bold">
                  {member.profile?.nickname?.charAt(0) || member.loginEmail?.charAt(0) || 'U'}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="text-center md:text-left text-white flex-1">
              <h1 className="text-3xl font-bold mb-1">
                {member.profile?.nickname || 'User'}
              </h1>
              <p className="text-white/80 mb-4">
                {member.loginEmail}
              </p>
              <div className="flex items-center justify-center md:justify-start space-x-6 text-sm">
                <span>{stories.length} stories</span>
                <span>0 followers</span>
                <span>0 following</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3">
              <Link href="/settings" className="btn bg-white/20 text-white hover:bg-white/30">
                Edit Profile
              </Link>
              <button onClick={logout} className="btn bg-white/10 text-white hover:bg-white/20">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-100 sticky top-16 md:top-20 z-30">
        <div className="container-app">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('stories')}
              className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                activeTab === 'stories'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              My Stories
            </button>
            <button
              onClick={() => setActiveTab('liked')}
              className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                activeTab === 'liked'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Liked
            </button>
            <button
              onClick={() => setActiveTab('groups')}
              className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                activeTab === 'groups'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Groups
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-app py-8 md:py-12">
        {activeTab === 'stories' && (
          <>
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="card animate-pulse">
                    <div className="h-48 bg-gray-200" />
                    <div className="p-5 space-y-3">
                      <div className="h-6 bg-gray-200 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 rounded w-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : stories.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No stories yet</h3>
                <p className="text-gray-500 mb-6">Share your first story with the community!</p>
                <Link href="/stories/new" className="btn-primary">
                  Write Your First Story
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stories.map((story) => (
                  <StoryCard
                    key={story._id}
                    story={{
                      ...story,
                      author: {
                        _id: member._id,
                        nickname: member.profile?.nickname,
                        photo: member.profile?.photo?.url,
                      },
                    }}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === 'liked' && (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No liked stories yet</h3>
            <p className="text-gray-500 mb-6">Stories you like will appear here</p>
            <Link href="/" className="btn-primary">
              Explore Stories
            </Link>
          </div>
        )}

        {activeTab === 'groups' && (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No groups joined yet</h3>
            <p className="text-gray-500 mb-6">Join communities to connect with like-minded people</p>
            <Link href="/groups" className="btn-primary">
              Browse Communities
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
