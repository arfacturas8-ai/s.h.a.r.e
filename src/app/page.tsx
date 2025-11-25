'use client';

import { useState, useEffect } from 'react';
import { Hero } from '@/components/home/Hero';
import { GroupsBar } from '@/components/home/GroupsBar';
import { Feed } from '@/components/home/Feed';
import { useWix } from '@/lib/wix-context';

interface Group {
  _id: string;
  name: string;
  slug: string;
  icon?: string;
  memberCount?: number;
}

interface Story {
  _id: string;
  title: string;
  excerpt?: string;
  content?: string;
  coverImage?: string;
  author?: {
    _id: string;
    nickname?: string;
    photo?: string;
  };
  groupName?: string;
  groupSlug?: string;
  createdAt: string;
  likesCount?: number;
  commentsCount?: number;
  readTime?: number;
}

export default function HomePage() {
  const { client, isLoading: isClientLoading } = useWix();
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [stories, setStories] = useState<Story[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter stories by selected group
  const filteredStories = selectedGroupId
    ? stories.filter((s) => groups.find((g) => g._id === selectedGroupId)?.slug === s.groupSlug)
    : stories;

  // Fetch data from Wix
  useEffect(() => {
    async function fetchData() {
      if (!client || isClientLoading) return;

      setIsLoading(true);
      try {
        // Fetch groups from Wix
        const groupsResult = await client.groups.queryGroups().find();
        if (groupsResult.items.length > 0) {
          setGroups(
            groupsResult.items.map((g: any) => ({
              _id: g._id,
              name: g.name,
              slug: g.slug,
              memberCount: g.membersCount,
            }))
          );
        }

        // Fetch stories from Wix CMS
        const storiesResult = await client.items
          .query({ dataCollectionId: 'Stories' })
          .descending('_createdDate')
          .limit(20)
          .find();

        if (storiesResult.items.length > 0) {
          setStories(
            storiesResult.items.map((item: any) => ({
              _id: item.data._id,
              title: item.data.title,
              excerpt: item.data.excerpt,
              content: item.data.content,
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
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [client, isClientLoading]);

  return (
    <>
      <Hero />
      <GroupsBar
        groups={groups}
        selectedGroupId={selectedGroupId}
        onSelectGroup={setSelectedGroupId}
      />
      <Feed
        stories={filteredStories}
        isLoading={isLoading}
        hasMore={false}
      />
    </>
  );
}
