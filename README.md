# Share A Cool Story

A modern, headless Wix-powered community platform where people share their unique and compelling stories with a global audience.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Backend:** Wix Headless (Members, Groups, CMS)
- **Authentication:** Wix OAuth

## Features

- **Feed View:** Browse stories from all communities in one place
- **Communities:** Join groups based on interests (Tech, Travel, Life, Art, etc.)
- **Story Sharing:** Write and publish your own stories
- **User Profiles:** Personal profiles with story history
- **Comments & Reactions:** Engage with stories through comments and likes
- **Search:** Find stories and communities
- **Responsive Design:** Optimized for mobile, tablet, and desktop

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Wix account with Headless setup

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd s.h.a.r.e
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file with your Wix credentials:
   ```env
   NEXT_PUBLIC_WIX_CLIENT_ID=your-client-id
   WIX_API_KEY=your-api-key
   NEXT_PUBLIC_SITE_NAME=Share A Cool Story
   NEXT_PUBLIC_SITE_URL=https://your-domain.com
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── auth/callback/     # OAuth callback handler
│   ├── groups/            # Groups listing and detail pages
│   ├── profile/           # User profile page
│   ├── stories/           # Story detail and creation pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── home/              # Home page components (Hero, Feed, GroupsBar)
│   ├── layout/            # Layout components (Header, Footer)
│   └── stories/           # Story components (StoryCard)
└── lib/                   # Utilities and context
    ├── wix-client.ts      # Wix SDK client setup
    └── wix-context.tsx    # React context for Wix
```

## Wix Setup

### Required Collections in Wix CMS

1. **Stories** - Main content collection
   - title (Text)
   - content (Rich Text)
   - excerpt (Text)
   - coverImage (Image URL)
   - author (Object: _id, nickname, photo)
   - groupSlug (Text)
   - groupName (Text)
   - likesCount (Number)
   - commentsCount (Number)
   - readTime (Number)

### Wix Apps Required

- Wix Members
- Wix Groups
- Wix Data (CMS)

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

The app can be deployed to:
- Vercel (recommended)
- Netlify
- Any Node.js hosting platform

## License

This project is private and proprietary.
