# 📚 Teaching Platform - Full-Stack Education Management System

A comprehensive educational platform built with **Next.js** (web dashboard) and **React Native/Expo** (mobile app) for teachers and students. Features course management, video hosting via Bunny.net, document sharing, promotional carousels, and real-time stats.

---

## 🎯 Overview

This platform enables teachers to:
- Manage courses, videos, and documents
- Upload content (videos to Bunny.net CDN, documents to Supabase Storage)
- Create promotional slides (reklam) with images or videos
- Track student enrollment and engagement
- Customize their profile with avatars and cover images

Students get:
- Full-screen promotional carousel on dashboard
- Access to courses and video content
- Document downloads
- Real-time progress tracking

---

## 🏗️ Tech Stack

### Web Dashboard (Admin/Teacher)
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **UI**: React, Tailwind CSS, Shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage (images/documents)
- **Video CDN**: Bunny.net
- **Auth**: Supabase Auth

### Mobile App (Student)
- **Framework**: React Native (Expo)
- **Language**: TypeScript
- **Navigation**: Expo Router
- **UI**: React Native Paper, Expo Linear Gradient
- **Video**: expo-video, react-native-webview
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth

---

## 📁 Project Structure

```
project-root/
├── web/                          # Next.js dashboard
│   ├── app/
│   │   ├── (protected)/          # Teacher routes
│   │   │   ├── courses/          # Course management
│   │   │   ├── videos/           # Video library
│   │   │   ├── documents/        # Document management
│   │   │   ├── reklam/           # Promotional slides
│   │   │   └── profile/          # Teacher profile
│   │   └── (auth)/               # Login/signup
│   ├── components/
│   │   ├── courses/
│   │   ├── videos/
│   │   ├── documents/
│   │   └── reklam/
│   └── lib/
│       └── supabase/             # Supabase client
│
└── mobile/                       # Expo mobile app
    ├── app/
    │   ├── (student)/            # Student routes
    │   │   ├── courses/          # Browse courses
    │   │   └── profile/          # Student profile
    │   ├── (auth)/               # Login/signup
    │   └── video/[id].tsx        # Video player
    ├── components/
    │   ├── content/
    │   │   ├── ReklamCarousel/   # Full-screen promo carousel
    │   │   └── VideoPlayer/
    │   └── ui/
    └── lib/
        └── supabase.ts           # Supabase client
```

---

## 🚀 Features

### 📊 Dashboard (Web - Teachers)

#### Courses
- Create/edit/delete courses
- Set title, description, thumbnail
- Assign videos to courses
- Toggle free/premium access
- Search and pagination

#### Videos
- Upload videos to Bunny.net CDN
- Auto-generate thumbnails
- HLS streaming support
- Link videos to courses
- Bulk management

#### Documents
- Upload PDF, Word, Excel, PowerPoint, ZIP files
- Store in Supabase Storage
- Link documents to courses
- Direct download links
- File size tracking

#### Reklam (Promotional Slides)
- Create full-screen promotional slides
- **Media**: Upload images OR videos
- **Video**: Auto-uploaded to Bunny.net, plays to end then advances
- **Image**: Auto-advances after 5 seconds
- **Link Types**:
  - Course → Navigate to course detail
  - Video → Open video player
  - Document → Direct download
  - External → Open URL in browser
  - None → Info-only slide
- Display order control
- Active/inactive toggle
- Real-time preview

#### Profile
- Upload avatar (circular crop preview)
- Upload cover image
- Update bio and contact info
- Manage account settings

### 📱 Mobile App (Students)

#### Home Dashboard
- **Full-screen reklam carousel**:
  - Autoplay videos (advance on completion)
  - Auto-advance images (5 sec)
  - Dot indicators at bottom
  - Bottom gradient (33%) for text visibility
  - Tap to navigate (course/video/document/external)
- Teacher stats (students, courses, videos)
- Quick access to courses

#### Courses
- Browse all courses
- Filter by free/premium
- View course details
- Access enrolled courses
- See video count per course

#### Videos
- Video player with WebView (Bunny.net iframe)
- Fullscreen support
- Auto-play when slide is active
- Progress tracking

#### Documents
- Browse documents
- Direct download from Supabase Storage
- Filter by course
- File type icons

---

## 🔧 Setup & Installation

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account
- Bunny.net account (for video hosting)
- Expo CLI (for mobile development)

### 1. Clone Repository
```bash
git clone <your-repo-url>
cd project-root
```

### 2. Web Dashboard Setup
```bash
cd web
npm install
```

Create `.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_BUNNY_LIBRARY_ID=600296
NEXT_PUBLIC_BUNNY_API_KEY=your-bunny-api-key
NEXT_PUBLIC_BUNNY_CDN_HOSTNAME=vz-22b16194-b1d.b-cdn.net
```

Run development server:
```bash
npm run dev
# Open http://localhost:3000
```

### 3. Mobile App Setup
```bash
cd mobile
npm install
```

Create `.env`:
```bash
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Run on device/simulator:
```bash
npx expo start
# Scan QR code with Expo Go app
# Or press 'i' for iOS simulator, 'a' for Android emulator
```

---

## 🗄️ Database Schema

### Core Tables

#### `teachers`
```sql
- id (uuid, pk)
- email (text)
- full_name (text)
- bio (text)
- avatar_url (text)      -- Full Supabase Storage URL
- cover_img (text)       -- Full Supabase Storage URL
- created_at (timestamptz)
```

#### `students`
```sql
- id (uuid, pk)
- teacher_id (uuid, fk → teachers)
- email (text)
- full_name (text)
- created_at (timestamptz)
```

#### `courses`
```sql
- id (uuid, pk)
- teacher_id (uuid, fk → teachers)
- title (text)
- description (text)
- thumbnail (text)       -- Supabase Storage URL
- free (boolean)
- created_at (timestamptz)
```

#### `videos`
```sql
- id (uuid, pk)
- course_id (uuid, fk → courses)
- title (text)
- link (text)            -- Bunny.net HLS URL
- thumbnail (text)       -- Supabase Storage URL
- free (boolean)
- created_at (timestamptz)
```

#### `documents`
```sql
- id (uuid, pk)
- teacher_id (uuid, fk → teachers)
- course_id (uuid, fk → courses, nullable)
- title (text)
- file_url (text)        -- Full Supabase Storage public URL
- file_path (text)       -- Storage path (for deletion)
- file_name (text)       -- Original filename
- file_size (integer)    -- Size in bytes
- file_type (text)       -- MIME type
- created_at (timestamptz)
```

#### `reklam`
```sql
- id (uuid, pk)
- teacher_id (uuid, fk → teachers)
- title (text)
- description (text)
- image_url (text)       -- Supabase Storage URL (if image slide)
- video_url (text)       -- Bunny.net iframe URL (fallback/reference)
- video_hls_url (text)   -- Bunny.net HLS URL (for expo-video)
- link_type (text)       -- 'course' | 'video' | 'document' | 'external' | 'none'
- link_target (text)     -- UUID or full URL
- display_order (integer)
- is_active (boolean)
- created_at (timestamptz)
```

### Storage Buckets

| Bucket | Purpose | Public |
|--------|---------|--------|
| `video_thumbnails` | Video thumbnail images | ✅ |
| `reklam_images` | Reklam slide images | ✅ |
| `documents` | Student documents (PDF, Word, etc) | ✅ |
| `avatars` | Teacher avatars | ✅ |
| `cover_images` | Teacher cover images | ✅ |

---

## 🎨 Design System

### Colors
- **Primary**: Purple (`#6200ee`)
- **Success**: Green
- **Warning**: Orange
- **Error**: Red
- **Muted**: Gray variants

### Typography
- **Kurdish/Arabic**: Goran, NRT-Bold (RTL)
- **English**: System default

### Components
- Reusable small components (table-header, pagination, modals)
- Form components (file upload, dropdowns, toggles)
- Layout components (sidebar, navbar)

---

## 🔐 Authentication & Authorization

### Supabase Auth
- Email/password authentication
- Role-based access control
- Row Level Security (RLS) policies

### RLS Policies

**Teachers:**
- Can manage their own content (courses, videos, documents, reklam)
- Can view their students

**Students:**
- Can view their teacher's active content
- Can view courses they're enrolled in
- Can download documents

---

## 📹 Video Workflow (Bunny.net)

### Upload Process
1. Teacher uploads video file in dashboard
2. Web app creates video entry via Bunny API
3. Uploads file binary to Bunny CDN
4. Returns HLS URL: `https://vz-{CDN_HOSTNAME}.b-cdn.net/{video_id}/playlist.m3u8`
5. Stores HLS URL in database

### Playback
- **Web**: iframe embed or direct HLS
- **Mobile**: WebView (iframe) or expo-video (HLS)
- **Reklam**: WebView for compatibility

### Important: CDN Hostname
Find your actual CDN hostname in Bunny dashboard:
- **NOT** `vz-{LIBRARY_ID}.b-cdn.net` (this is a guess)
- **USE** your actual hostname (e.g., `vz-22b16194-b1d.b-cdn.net`)
- Set in `NEXT_PUBLIC_BUNNY_CDN_HOSTNAME`

---

## 📝 Environment Variables

### Web Dashboard
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Bunny.net
NEXT_PUBLIC_BUNNY_LIBRARY_ID=
NEXT_PUBLIC_BUNNY_API_KEY=
NEXT_PUBLIC_BUNNY_CDN_HOSTNAME=     # CRITICAL: Your actual CDN hostname
```

### Mobile App
```bash
# Supabase
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
```

---

## 🐛 Common Issues & Solutions

### "Domain suspended or not configured" (Bunny.net)
**Problem**: Using wrong CDN hostname
**Solution**: Find your actual CDN hostname in Bunny dashboard → Update `NEXT_PUBLIC_BUNNY_CDN_HOSTNAME`

### Videos not playing on mobile
**Problem**: Using HLS URL with wrong hostname
**Solution**: Use iframe URL (`video_url`) for WebView or fix CDN hostname for expo-video

### Images not loading
**Problem**: Storing file paths instead of full URLs
**Solution**: Use `getPublicUrl()` and store the full URL in database

### ESLint exhaustive-deps warnings
**Solution**: Add `// eslint-disable-next-line react-hooks/exhaustive-deps` or wrap function in `useCallback`

---

## 🚢 Deployment

### Web Dashboard
```bash
cd web
npm run build
npm run start
# Deploy to Vercel, Netlify, or your preferred host
```

### Mobile App
```bash
cd mobile
# iOS
eas build --platform ios

# Android
eas build --platform android

# Or build APK locally
npx expo build:android
```

---

## 📄 License

[Your License Here]

---

## 👥 Contributing

[Contributing guidelines if open source]

---

## 📧 Support

For issues or questions:
- Email: [your-email]
- GitHub Issues: [repo-link]

---

## 🙏 Acknowledgments

- **Supabase** - Database, Auth, Storage
- **Bunny.net** - Video CDN
- **Expo** - Mobile development framework
- **Next.js** - Web framework
- **Vercel** - Hosting

---

**Built with ❤️ for educators and students**
