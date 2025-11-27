// Mock data for Share A Cool Story

export interface Author {
  _id: string;
  nickname: string;
  photo?: string;
  bio?: string;
}

export interface Story {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  author: Author;
  groupName: string;
  groupSlug: string;
  createdAt: string;
  likesCount: number;
  commentsCount: number;
  readTime: number;
  featured?: boolean;
}

export interface Group {
  _id: string;
  name: string;
  slug: string;
  description: string;
  memberCount: number;
  storyCount: number;
  coverImage?: string;
}

export const authors: Author[] = [
  {
    _id: '1',
    nickname: 'Maya Chen',
    bio: 'Writer and wanderer. Finding poetry in everyday moments.',
  },
  {
    _id: '2',
    nickname: 'James Morrison',
    bio: 'Former teacher turned storyteller. Believer in the power of shared experiences.',
  },
  {
    _id: '3',
    nickname: 'Sofia Reyes',
    bio: 'Mother of three, collector of stories, keeper of memories.',
  },
  {
    _id: '4',
    nickname: 'Daniel Park',
    bio: 'Night owl, coffee enthusiast, amateur philosopher.',
  },
  {
    _id: '5',
    nickname: 'Emma Laurent',
    bio: 'Finding beauty in the mundane. Paris-based dreamer.',
  },
];

export const groups: Group[] = [
  {
    _id: '1',
    name: 'Life Lessons',
    slug: 'life-lessons',
    description: 'Wisdom gained through experience. Stories that teach, inspire, and illuminate the path forward.',
    memberCount: 2847,
    storyCount: 156,
  },
  {
    _id: '2',
    name: 'Love & Relationships',
    slug: 'love-relationships',
    description: 'The stories that shape our hearts. Tales of connection, loss, and everything in between.',
    memberCount: 3521,
    storyCount: 243,
  },
  {
    _id: '3',
    name: 'Career Journeys',
    slug: 'career-journeys',
    description: 'Professional pivots, unexpected opportunities, and the courage to pursue your calling.',
    memberCount: 1892,
    storyCount: 98,
  },
  {
    _id: '4',
    name: 'Travel Tales',
    slug: 'travel-tales',
    description: 'Adventures near and far. The places we go and the people we meet along the way.',
    memberCount: 2156,
    storyCount: 187,
  },
  {
    _id: '5',
    name: 'Family Stories',
    slug: 'family-stories',
    description: 'The ties that bind us. Generational wisdom, childhood memories, and family traditions.',
    memberCount: 1654,
    storyCount: 134,
  },
  {
    _id: '6',
    name: 'Overcoming Adversity',
    slug: 'overcoming-adversity',
    description: 'Stories of resilience, courage, and the human spirit triumphing over challenges.',
    memberCount: 2089,
    storyCount: 112,
  },
];

export const stories: Story[] = [
  {
    _id: '1',
    title: 'The Letter I Never Sent',
    excerpt: 'For twenty years, I carried words meant for someone else. This is the story of finally letting go.',
    content: `<p>The envelope sits in my desk drawer, yellowed with age, corners softened by time and too much handling. Inside are words I wrote at nineteen, full of hope and heartbreak in equal measure.</p>
    <p>I never sent it. Not because I lost my nerve, but because by the time I gathered the courage, the moment had passed. Life had moved on, as it always does, indifferent to our carefully crafted confessions.</p>
    <p>For two decades, I've carried this letter through seven apartments, two marriages, and countless moments when I almost threw it away. Each time, something stopped me. Perhaps it was the fear that destroying it would mean admitting those feelings had been real.</p>
    <p>Last week, I finally opened it again. The handwriting was barely recognizable as my own – all loops and flourishes, the penmanship of someone still young enough to believe in grand gestures. The words, though... the words were exactly as I remembered.</p>
    <p>Reading them now, I don't feel sadness. I feel gratitude. Grateful for the capacity to feel so deeply. Grateful that life had other plans. Grateful that some letters are meant to remain unsent, their purpose not in the delivery but in the writing.</p>
    <p>Tomorrow, I'll burn it. Not in anger or resignation, but in release. Some stories are complete without an ending. Some words are meant only for the wind.</p>`,
    author: authors[0],
    groupName: 'Love & Relationships',
    groupSlug: 'love-relationships',
    createdAt: '2024-01-15T10:30:00Z',
    likesCount: 847,
    commentsCount: 156,
    readTime: 4,
    featured: true,
  },
  {
    _id: '2',
    title: 'What My Father Taught Me Without Words',
    excerpt: 'He never said "I love you." He didn\'t have to. Every action spoke volumes.',
    content: `<p>My father was a man of few words. In a family of talkers, he was the quiet center – always present, rarely speaking unless he had something worth saying.</p>
    <p>I used to mistake his silence for distance. As a teenager, I craved the easy affection I saw in other families, the casual "I love you" thrown over shoulders on the way out the door.</p>
    <p>But my father loved differently. He loved in the way he woke at 4 AM to drive me to swim practice, never once complaining. He loved in the lunch he packed when he noticed I'd stopped eating the cafeteria food. He loved in the way he stayed up waiting, no matter how late I came home.</p>
    <p>When I got my first job rejection, he didn't offer platitudes. He handed me a cup of tea and sat beside me in silence. Sometimes, the greatest comfort is simply being with someone in their pain.</p>
    <p>He passed away three years ago. Going through his things, I found a box of every card, every letter, every scribbled note I'd ever given him. Some dated back to elementary school.</p>
    <p>He saved everything. Every word I ever wrote him, he kept.</p>
    <p>Now I understand. Some people don't say "I love you" because they're too busy showing it.</p>`,
    author: authors[1],
    groupName: 'Family Stories',
    groupSlug: 'family-stories',
    createdAt: '2024-01-14T15:45:00Z',
    likesCount: 1203,
    commentsCount: 287,
    readTime: 5,
  },
  {
    _id: '3',
    title: 'The Stranger on the Train',
    excerpt: 'A five-minute conversation with someone I\'ll never see again changed how I see everything.',
    content: `<p>The train was delayed. Again. I was exhausted, irritated, scrolling through my phone with the particular numbness of a long commute.</p>
    <p>She sat down across from me – an elderly woman with kind eyes and a worn cardigan. I smiled politely and returned to my screen.</p>
    <p>"You look like you're carrying something heavy," she said.</p>
    <p>I looked up, startled. "Just tired," I replied. "Long day."</p>
    <p>She nodded knowingly. "I used to have long days too. Now I have long years." She laughed at her own joke, and something in that laugh made me put my phone away.</p>
    <p>We talked for maybe five minutes before her stop came. She told me about her husband, gone now for a decade. About the garden she still tends because he planted it. About the joy of small things – morning coffee, birdsong, the weight of a good book.</p>
    <p>"Life is mostly ordinary moments," she said as she gathered her bags. "The trick is learning to love them."</p>
    <p>I never got her name. I'll never see her again. But I think about her words often, especially when I catch myself wishing away the mundane, waiting for something bigger.</p>
    <p>Maybe the something bigger is right here. Maybe it always has been.</p>`,
    author: authors[4],
    groupName: 'Life Lessons',
    groupSlug: 'life-lessons',
    createdAt: '2024-01-13T09:20:00Z',
    likesCount: 956,
    commentsCount: 178,
    readTime: 4,
  },
  {
    _id: '4',
    title: 'Quitting the Dream Job',
    excerpt: 'Everyone told me I was crazy. Turns out, crazy was staying.',
    content: `<p>On paper, I had it all. The corner office. The impressive title. The salary that made my parents proud. For seven years, I climbed the ladder, checking every box society told me mattered.</p>
    <p>Inside, I was slowly disappearing.</p>
    <p>The decision to leave came at 2 AM on a random Tuesday. I was still at the office, alone, preparing a presentation I didn't believe in for a product I didn't care about. My hands were shaking – not from coffee, but from something deeper. When was the last time I'd felt excited about anything?</p>
    <p>I couldn't remember.</p>
    <p>The next morning, I submitted my resignation. My boss thought I was having a breakdown. My parents thought I was throwing away my future. My friends thought I was brave, which felt generous – I was just tired.</p>
    <p>That was two years ago. Today, I make a third of what I used to. I live in a smaller apartment. My "career" looks nothing like what I imagined.</p>
    <p>And I wake up excited. Every single day.</p>
    <p>The dream job was never about the job. It was about dreaming – about having the space and energy to imagine, to create, to become. Sometimes you have to lose everything to find that.</p>`,
    author: authors[3],
    groupName: 'Career Journeys',
    groupSlug: 'career-journeys',
    createdAt: '2024-01-12T14:00:00Z',
    likesCount: 1567,
    commentsCount: 342,
    readTime: 5,
  },
  {
    _id: '5',
    title: 'Lost in Translation, Found in Kindness',
    excerpt: 'Stranded in a foreign city with no phone and no language, I discovered something unexpected about humanity.',
    content: `<p>My phone died somewhere over the Atlantic. By the time I landed in Tokyo, I was completely disconnected – no maps, no translator, no way to reach my hotel.</p>
    <p>I stood in Shinjuku Station, surrounded by millions of people, utterly alone. The signs were beautiful and incomprehensible. The crowds moved with purpose while I stood frozen, fighting tears.</p>
    <p>A young woman stopped. She looked at my face, at the crumpled paper in my hand, and without a word, took my arm.</p>
    <p>For the next hour, this stranger guided me through the labyrinth. We couldn't speak more than a few words to each other, but she understood. She pointed at signs, gestured directions, waited patiently when I fell behind.</p>
    <p>When we finally reached my hotel, I tried to thank her. She just smiled, waved away my gratitude, and disappeared back into the crowd.</p>
    <p>I never learned her name. I couldn't have pronounced it anyway. But in that hour, she taught me more about humanity than years of experience.</p>
    <p>Kindness doesn't need translation. It's the only universal language.</p>`,
    author: authors[2],
    groupName: 'Travel Tales',
    groupSlug: 'travel-tales',
    createdAt: '2024-01-11T11:30:00Z',
    likesCount: 723,
    commentsCount: 134,
    readTime: 4,
  },
  {
    _id: '6',
    title: 'The Year I Said Yes',
    excerpt: 'After a lifetime of playing it safe, I decided to accept every opportunity that scared me. Here\'s what happened.',
    content: `<p>I was the queen of "maybe later." Every invitation, every opportunity, every chance at something new – I had a reason to decline. Too busy. Too tired. Too risky.</p>
    <p>Then I turned forty. Nothing dramatic happened, no crisis or revelation. I just woke up one morning and realized I'd spent decades watching life from the sidelines.</p>
    <p>So I made a rule: for one year, I would say yes to everything that scared me (within reason – I wasn't about to take up base jumping).</p>
    <p>I took a pottery class and made terrible, lopsided bowls that I love. I went to a networking event alone and made a friend who is now my business partner. I signed up for a 10K despite never running more than a mile. I didn't finish, but I started.</p>
    <p>I asked for a raise. I got it.</p>
    <p>I told my childhood friend that she had hurt me, years ago, in ways I'd never addressed. We cried. We healed.</p>
    <p>I said yes to a blind date that turned into dinner, that turned into breakfast, that turned into a key to his apartment.</p>
    <p>The year ended, but the habit remained. I'm still scared – I'm just no longer willing to let fear make my decisions.</p>`,
    author: authors[2],
    groupName: 'Life Lessons',
    groupSlug: 'life-lessons',
    createdAt: '2024-01-10T16:15:00Z',
    likesCount: 2341,
    commentsCount: 456,
    readTime: 5,
  },
  {
    _id: '7',
    title: 'When My Son Became My Teacher',
    excerpt: 'He\'s only seven, but he understood something I\'d forgotten.',
    content: `<p>"Dad, why are you always looking at your phone?"</p>
    <p>The question hit me harder than any criticism from a boss or partner ever had. My seven-year-old son, looking up at me with genuine curiosity, waiting for an answer I didn't have.</p>
    <p>I mumbled something about work, about important emails. He nodded, unconvinced, and went back to his Legos.</p>
    <p>That night, I watched him build. Completely absorbed, entirely present. When was the last time I'd experienced that kind of focus? That kind of joy in the simple act of creating?</p>
    <p>I put my phone in a drawer. Sat down next to him. Asked if I could help.</p>
    <p>His face lit up in a way I'll never forget.</p>
    <p>We didn't build anything special. A crooked tower that fell three times. A spaceship missing half its parts. But for those two hours, I was fully there. Not checking notifications, not composing emails in my head. Just present.</p>
    <p>He fell asleep that night holding my hand, something he hadn't done in months.</p>
    <p>I'm trying to be better now. Trying to remember that childhood is measured in moments, not tasks completed. My son is teaching me how to live again, one Lego at a time.</p>`,
    author: authors[1],
    groupName: 'Family Stories',
    groupSlug: 'family-stories',
    createdAt: '2024-01-09T08:45:00Z',
    likesCount: 1876,
    commentsCount: 298,
    readTime: 4,
  },
  {
    _id: '8',
    title: 'The Diagnosis Changed Everything. Then It Changed Nothing.',
    excerpt: 'Six months after hearing the word \'cancer,\' I finally understood what it means to be alive.',
    content: `<p>The doctor's office was beige. I remember thinking how strange it was, that such life-altering words could be spoken in such an unremarkable room. The diagnosis floated between us like something physical, heavy.</p>
    <p>The first month was terror. Pure, consuming fear that left no room for anything else. I couldn't eat, couldn't sleep, couldn't think beyond the word that had become my entire identity.</p>
    <p>The second month was anger. At my body, at fate, at the unfairness of it all. I raged against the universe and everyone in it.</p>
    <p>The third month, something shifted. I was sitting in the garden, watching a bee navigate my grandmother's roses, when I realized I hadn't really looked at anything in years. I'd been so busy living that I'd forgotten to notice life.</p>
    <p>The treatment was hard. The recovery was harder. But somewhere in that darkness, I found a light I didn't know existed.</p>
    <p>I'm in remission now. The word "cancer" is still part of my story, but it's no longer the whole story. I'm learning to hold both – the fear and the gratitude, the loss and the gain.</p>
    <p>I wake up earlier now. Watch more sunrises. Tell people I love them without waiting for the right moment. The right moment is always now.</p>`,
    author: authors[0],
    groupName: 'Overcoming Adversity',
    groupSlug: 'overcoming-adversity',
    createdAt: '2024-01-08T13:00:00Z',
    likesCount: 3456,
    commentsCount: 567,
    readTime: 5,
  },
];

// Helper functions
export function getFeaturedStory(): Story | undefined {
  return stories.find(story => story.featured);
}

export function getStoriesByGroup(groupSlug: string): Story[] {
  return stories.filter(story => story.groupSlug === groupSlug);
}

export function getTopStories(limit: number = 5): Story[] {
  return [...stories]
    .sort((a, b) => b.likesCount - a.likesCount)
    .slice(0, limit);
}

export function getRecentStories(limit: number = 10): Story[] {
  return [...stories]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}

export function getStoryById(id: string): Story | undefined {
  return stories.find(story => story._id === id);
}

export function getGroupBySlug(slug: string): Group | undefined {
  return groups.find(group => group.slug === slug);
}
