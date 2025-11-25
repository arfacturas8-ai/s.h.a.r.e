'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface Group {
  _id: string;
  name: string;
  slug: string;
  icon?: string;
  memberCount?: number;
}

interface GroupsBarProps {
  groups: Group[];
  selectedGroupId?: string | null;
  onSelectGroup?: (groupId: string | null) => void;
}

export function GroupsBar({ groups, selectedGroupId, onSelectGroup }: GroupsBarProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [groups]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScroll, 300);
    }
  };

  // Default group icons by category
  const getGroupIcon = (name: string) => {
    const icons: Record<string, string> = {
      tech: '💻',
      life: '🌱',
      travel: '✈️',
      art: '🎨',
      music: '🎵',
      sports: '⚽',
      food: '🍳',
      books: '📚',
      business: '💼',
      health: '💪',
    };
    const key = Object.keys(icons).find((k) => name.toLowerCase().includes(k));
    return key ? icons[key] : '📖';
  };

  return (
    <section className="bg-white border-b border-gray-100 sticky top-16 md:top-20 z-40">
      <div className="container-app py-3 relative">
        {/* Scroll Left Button */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Groups Scroll Container */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex items-center space-x-2 overflow-x-auto scrollbar-hide px-2"
        >
          {/* All Groups Button */}
          <button
            onClick={() => onSelectGroup?.(null)}
            className={`flex-shrink-0 flex items-center space-x-2 px-4 py-2 rounded-full font-medium text-sm transition-all ${
              selectedGroupId === null
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span>🌐</span>
            <span>All</span>
          </button>

          {/* Group Buttons */}
          {groups.map((group) => (
            <button
              key={group._id}
              onClick={() => onSelectGroup?.(group._id)}
              className={`flex-shrink-0 flex items-center space-x-2 px-4 py-2 rounded-full font-medium text-sm transition-all ${
                selectedGroupId === group._id
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>{group.icon || getGroupIcon(group.name)}</span>
              <span>{group.name}</span>
              {group.memberCount !== undefined && (
                <span className={`text-xs ${selectedGroupId === group._id ? 'text-primary-200' : 'text-gray-400'}`}>
                  {group.memberCount}
                </span>
              )}
            </button>
          ))}

          {/* View All Groups Link */}
          <Link
            href="/groups"
            className="flex-shrink-0 flex items-center space-x-2 px-4 py-2 rounded-full font-medium text-sm text-primary-600 hover:bg-primary-50 transition-colors"
          >
            <span>View All</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Scroll Right Button */}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </section>
  );
}
