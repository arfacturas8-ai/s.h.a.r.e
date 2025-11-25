'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useWix } from '@/lib/wix-context';
import { StoryCard } from '@/components/stories/StoryCard';

interface GroupDetailPageProps {
  params: { slug: string };
}

interface Group {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  coverImage?: string;
  memberCount: number;
  postCount: number;
}

interface Story {
  _id: string;
  title: string;
  excerpt?: string;
  coverImage?: string;
  author?: { _id: string; nickname?: string; photo?: string };
  groupName?: string;
  groupSlug?: string;
  createdAt: string;
  likesCount?: number;
  commentsCount?: number;
  readTime?: number;
}

export default function GroupDetailPage({ params }: GroupDetailPageProps) {
  const { client, isAuthenticated, login } = useWix();
  const [group, setGroup] = useState<Group | null>(null);
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMember, setIsMember] = useState(false);

  useEffect(() => {
    async function fetchGroupData() {
      if (!client) return;

      setIsLoading(true);
      try {
        // Fetch group details
        const groupResult = await client.groups.getGroupBySlug(params.slug);
        if (groupResult.group) {
          setGroup({
            _id: groupResult.group._id!,
            name: groupResult.group.name!,
            slug: groupResult.group.slug!,
            description: groupResult.group.description || undefined,
            coverImage: (groupResult.group as any).coverImage?.url,
            memberCount: groupResult.group.membersCount || 0,
            postCount: (groupResult.group as any).postsCount || 0,
          });
        }

        // Fetch stories for this group
        const storiesResult = await client.items
          .query({ dataCollectionId: 'Stories' })
          .eq('groupSlug', params.slug)
          .descending('_createdDate')
          .limit(20)
          .find();

        setStories(
          storiesResult.items.map((item: any) => ({
            _id: item.data._id,
            title: item.data.title,
            excerpt: item.data.excerpt,
            coverImage: item.data.coverImage,
            author: item.data.author,
            groupName: item.data.groupName,
            groupSlug: item.data.groupSlug,
            createdAt: item.data._createdDate,
            likesCount: item.data.likesCount || 0,
            commentsCount: item.data.commentsCount || 0,
            readTime: item.data.readTime,
          }))
        );
      } catch (error) {
        console.error('Error fetching group data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchGroupData();
  }, [client, params.slug]);

  const handleJoinGroup = async () => {
    if (!isAuthenticated) {
      login();
      return;
    }

    if (!group) return;

    try {
      await client?.groups.joinGroup(group._id);
      setIsMember(true);
    } catch (error) {
      console.error('Error joining group:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="h-48 md:h-64 lg:h-80 bg-gray-200 animate-pulse" />
        <div className="container-app -mt-16 relative z-10">
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4" />
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  if (!group) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Group not found</h2>
          <p className="text-gray-600">The group you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Image */}
      <div className="relative h-48 md:h-64 lg:h-80 bg-gradient-to-br from-primary-500 to-secondary-500">
        {group.coverImage && (
          <Image
            src={group.coverImage}
            alt={group.name}
            fill
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Group Info */}
      <div className="container-app -mt-16 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {group.name}
              </h1>
              <p className="text-gray-600 max-w-2xl mb-4">
                {group.description}
              </p>
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {group.memberCount} members
                </span>
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  {group.postCount} stories
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {isMember ? (
                <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium flex items-center">
                  <svg className="w-5 h-5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Member
                </span>
              ) : (
                <button onClick={handleJoinGroup} className="btn-primary">
                  Join Community
                </button>
              )}
              <Link
                href={`/stories/new?group=${group.slug}`}
                className="btn-secondary"
              >
                Share Story
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stories */}
      <div className="container-app py-8 md:py-12">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Stories in this community
        </h2>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
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
          <div className="text-center py-16 bg-white rounded-2xl">
            <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No stories yet</h3>
            <p className="text-gray-500 mb-6">Be the first to share a story in this community!</p>
            <Link href={`/stories/new?group=${group.slug}`} className="btn-primary">
              Share Your Story
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => (
              <StoryCard key={story._id} story={story} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
