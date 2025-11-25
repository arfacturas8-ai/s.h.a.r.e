'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useWix } from '@/lib/wix-context';

interface Group {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  coverImage?: string;
  memberCount: number;
  postCount?: number;
}


function GroupCard({ group }: { group: Group }) {
  return (
    <Link href={`/groups/${group.slug}`} className="card group block">
      <div className="relative h-40 overflow-hidden">
        {group.coverImage ? (
          <Image
            src={group.coverImage}
            alt={group.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-400 to-secondary-400" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <h3 className="text-xl font-bold text-white">{group.name}</h3>
        </div>
      </div>
      <div className="p-5">
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {group.description}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {group.memberCount} members
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              {group.postCount} stories
            </span>
          </div>
          <span className="text-primary-600 font-medium group-hover:underline">
            View Group
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function GroupsPage() {
  const { client, isLoading: isClientLoading } = useWix();
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchGroups() {
      if (!client || isClientLoading) return;

      setIsLoading(true);
      try {
        const result = await client.groups.queryGroups().find();
        if (result.items.length > 0) {
          setGroups(
            result.items.map((g: any) => ({
              _id: g._id,
              name: g.name,
              slug: g.slug,
              description: g.description,
              coverImage: g.coverImage?.url,
              memberCount: g.membersCount || 0,
              postCount: g.postsCount || 0,
            }))
          );
        }
      } catch (error) {
        console.error('Error fetching groups:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchGroups();
  }, [client, isClientLoading]);

  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="container-app py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Communities
          </h1>
          <p className="text-gray-600 max-w-2xl mb-8">
            Join communities that match your interests. Share stories, connect with like-minded people, and be inspired by diverse perspectives.
          </p>

          {/* Search */}
          <div className="relative max-w-md">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search communities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-12"
            />
          </div>
        </div>
      </div>

      {/* Groups Grid */}
      <div className="container-app py-8 md:py-12">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="h-40 bg-gray-200" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-1/2" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredGroups.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No communities found</h3>
            <p className="text-gray-500">Try a different search term</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGroups.map((group) => (
              <GroupCard key={group._id} group={group} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
