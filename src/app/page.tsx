'use client';

import { useState, useEffect } from 'react';
import { Hero } from '@/components/home/Hero';
import { GroupsBar } from '@/components/home/GroupsBar';
import { Feed } from '@/components/home/Feed';
import { useWix } from '@/lib/wix-context';

// Mock data - will be replaced with Wix data
const mockGroups = [
  { _id: '1', name: 'Life Stories', slug: 'life-stories', icon: '🌱', memberCount: 234 },
  { _id: '2', name: 'Tech Tales', slug: 'tech-tales', icon: '💻', memberCount: 189 },
  { _id: '3', name: 'Travel Adventures', slug: 'travel-adventures', icon: '✈️', memberCount: 312 },
  { _id: '4', name: 'Creative Arts', slug: 'creative-arts', icon: '🎨', memberCount: 156 },
  { _id: '5', name: 'Music & Sound', slug: 'music-sound', icon: '🎵', memberCount: 98 },
  { _id: '6', name: 'Food & Cooking', slug: 'food-cooking', icon: '🍳', memberCount: 276 },
  { _id: '7', name: 'Books & Writing', slug: 'books-writing', icon: '📚', memberCount: 143 },
  { _id: '8', name: 'Sports & Fitness', slug: 'sports-fitness', icon: '⚽', memberCount: 201 },
];

const mockStories = [
  {
    _id: '1',
    title: 'How I Built My First App and What I Learned Along the Way',
    excerpt: 'A journey through the ups and downs of creating something from scratch, learning to code, and finally launching a product that people actually use.',
    coverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop',
    author: { _id: 'a1', nickname: 'Alex Chen', photo: '' },
    groupName: 'Tech Tales',
    groupSlug: 'tech-tales',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    likesCount: 42,
    commentsCount: 12,
    readTime: 5,
  },
  {
    _id: '2',
    title: 'Finding Peace in the Mountains of Nepal',
    excerpt: 'After years of corporate burnout, I decided to take a solo trip to Nepal. What I found there changed my perspective on life forever.',
    coverImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop',
    author: { _id: 'a2', nickname: 'Sarah Williams', photo: '' },
    groupName: 'Travel Adventures',
    groupSlug: 'travel-adventures',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    likesCount: 89,
    commentsCount: 23,
    readTime: 7,
  },
  {
    _id: '3',
    title: 'The Art of Sourdough: A Three Year Journey',
    excerpt: 'What started as a pandemic hobby turned into an obsession. Here\'s everything I learned about the ancient art of sourdough bread.',
    coverImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=600&fit=crop',
    author: { _id: 'a3', nickname: 'Marco Rossi', photo: '' },
    groupName: 'Food & Cooking',
    groupSlug: 'food-cooking',
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    likesCount: 156,
    commentsCount: 45,
    readTime: 10,
  },
  {
    _id: '4',
    title: 'Overcoming My Fear of Public Speaking',
    excerpt: 'Public speaking used to terrify me. Now I speak at conferences. This is the story of how I transformed my greatest weakness.',
    coverImage: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop',
    author: { _id: 'a4', nickname: 'James Thompson', photo: '' },
    groupName: 'Life Stories',
    groupSlug: 'life-stories',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    likesCount: 234,
    commentsCount: 67,
    readTime: 6,
  },
  {
    _id: '5',
    title: 'Learning Guitar at 40: It\'s Never Too Late',
    excerpt: 'They say you can\'t teach an old dog new tricks. I proved them wrong by picking up the guitar in my forties.',
    coverImage: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&h=600&fit=crop',
    author: { _id: 'a5', nickname: 'Linda Park', photo: '' },
    groupName: 'Music & Sound',
    groupSlug: 'music-sound',
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    likesCount: 98,
    commentsCount: 34,
    readTime: 4,
  },
  {
    _id: '6',
    title: 'From Couch Potato to Marathon Runner',
    excerpt: 'Two years ago, I couldn\'t run for 5 minutes. Last month, I completed my first marathon. Here\'s my transformation story.',
    coverImage: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&h=600&fit=crop',
    author: { _id: 'a6', nickname: 'David Kim', photo: '' },
    groupName: 'Sports & Fitness',
    groupSlug: 'sports-fitness',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    likesCount: 312,
    commentsCount: 89,
    readTime: 8,
  },
  {
    _id: '7',
    title: 'How I Wrote My First Novel While Working Full-Time',
    excerpt: 'Balancing a demanding job with creative pursuits isn\'t easy, but it\'s possible. Here\'s how I managed to write 80,000 words in one year.',
    coverImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=600&fit=crop',
    author: { _id: 'a7', nickname: 'Emma Rodriguez', photo: '' },
    groupName: 'Books & Writing',
    groupSlug: 'books-writing',
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    likesCount: 178,
    commentsCount: 56,
    readTime: 9,
  },
];

export default function HomePage() {
  const { client, isLoading: isClientLoading } = useWix();
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [stories, setStories] = useState(mockStories);
  const [groups, setGroups] = useState(mockGroups);
  const [isLoading, setIsLoading] = useState(false);

  // Filter stories by selected group
  const filteredStories = selectedGroupId
    ? stories.filter((s) => groups.find((g) => g._id === selectedGroupId)?.slug === s.groupSlug)
    : stories;

  // Fetch real data from Wix when client is ready
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
        // Keep mock data on error
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
