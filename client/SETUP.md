# 🚀 SETUP GUIDE - Meme Gallery Application

## Quick Start (5 minutes)

### Step 1: MongoDB Setup

You have two options:

#### Option A: MongoDB Atlas (Cloud - Recommended)
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up (free account)
3. Create a new project and cluster
4. Get connection string from "Connect" button
5. Update `.env.local` with your connection string:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/walla_db?retryWrites=true&w=majority
   ```

#### Option B: Docker (Local)
1. Install Docker from https://www.docker.com/products/docker-desktop
2. Run: `docker run -d -p 27017:27017 --name mongodb mongo:latest`
3. Use in `.env.local`:
   ```
   MONGODB_URI=mongodb://localhost:27017/walla_db
   ```

### Step 2: Install & Run

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:3000`

**First load:** ~30 seconds (fetching and storing 150+ memes from imgflip)

---

## Full Features Overview

### ✅ What's Implemented

- **Meme Gallery Page** (`/`) - Main page with infinite scrolling list
- **Infinite Scroll** - Automatically loads 10 memes at a time
- **Edit Modal** - Click "✏️ Edit" to open modal and rename memes
- **Responsive Grid** - Works on desktop, tablet, and mobile
- **CSS Modules Only** - Clean styling with no external CSS libraries
- **TypeScript** - Full type safety throughout
- **MongoDB Integration** - Persistent data storage
- **Auto-initialize** - Fetches data from imgflip API on first run

### 🎨 User Interface

```
┌─────────────────────────────────┐
│     MEME GALLERY                │
│  Browse and edit memes          │
├─────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐   │
│  │  Image   │  │  Image   │   │
│  │          │  │          │   │
│  │ Name     │  │ Name     │   │
│  │ ✏️ Edit  │  │ ✏️ Edit  │   │
│  └──────────┘  └──────────┘   │
│  ... (scroll for more)          │
└─────────────────────────────────┘
```

### 📋 Edit Modal

```
┌─────────────────────────────────┐
│ Edit Meme Name                  │
├─────────────────────────────────┤
│ Meme Name                       │
│ ┌─────────────────────────────┐ │
│ │ Drake with sunglasses       │ │
│ └─────────────────────────────┘ │
├─────────────────────────────────┤
│           [Cancel] [Save]        │
└─────────────────────────────────┘
```

---

## 📁 Project Files

### Core Application Files

**Frontend (Client-side):**
- `app/page.tsx` - Main gallery component
- `app/page.module.css` - All styling
- `app/layout.tsx` - Root layout
- `app/globals.css` - Global styles

**API Endpoints:**
- `app/api/memes/route.ts` - GET endpoint (list with pagination)
- `app/api/memes/[id]/route.ts` - PUT endpoint (update meme)

**Database:**
- `lib/mongodb.ts` - Connection handler
- `lib/memeSchema.ts` - Mongoose schema
- `lib/initializeData.ts` - Data initialization

**Configuration:**
- `next.config.ts` - Next.js config
- `tsconfig.json` - TypeScript config
- `package.json` - Dependencies
- `.env.local` - Environment variables

---

## 🔧 Development

### Available Scripts

```bash
# Development server (with hot reload)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### Environment Variables

Create/update `.env.local`:
```env
# MongoDB connection string
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/meme-gallery?retryWrites=true&w=majority
```

---

## 📊 API Documentation

### GET /api/memes

**Fetch paginated memes**

```bash
curl "http://localhost:3000/api/memes?page=1&limit=10"
```

**Query Parameters:**
- `page` (number): Which page (1-based)
- `limit` (number): Items per page (default 10)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "mongo-id",
      "id": "imgflip-id",
      "name": "Drake Meme",
      "url": "https://imgflip.com/s/meme/Drake.jpg"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 147,
    "pages": 15
  }
}
```

### PUT /api/memes/[id]

**Update meme name**

```bash
curl -X PUT "http://localhost:3000/api/memes/507f1f77bcf86cd799439011" \
  -H "Content-Type: application/json" \
  -d '{"name": "New Name"}'
```

**Request Body:**
```json
{
  "name": "Your New Meme Name"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "id": "imgflip-id",
    "name": "Your New Meme Name",
    "url": "https://imgflip.com/s/meme/Drake.jpg"
  }
}
```

---

## 🎯 User Workflows

### 1. Browse Memes
1. Open http://localhost:3000
2. Memes load immediately
3. Scroll down to load more (infinite scroll)
4. Continues until all memes are loaded

### 2. Edit a Meme
1. Find the meme you want to edit
2. Click "✏️ Edit" button
3. Modal opens with current name
4. Type new name
5. Click "Save" to update
6. List updates immediately
7. Close modal (click Cancel or outside)

### 3. Troubleshooting

**MongoDB Connection Error:**
- Check `.env.local` has correct connection string
- If using Atlas, check IP whitelist
- If using Docker, ensure MongoDB container is running

**Images Not Loading:**
- Check internet connection
- Images come from imgflip.com
- If source is down, fallback image shows

**Modal Not Opening:**
- Make sure JavaScript is enabled
- Check browser console (F12) for errors
- Try refreshing the page

---

## 📦 Deployment to Production

### Deploy to Vercel (Easiest)

1. Push to GitHub:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. Go to https://vercel.com
3. Import your GitHub repository
4. Add environment variable:
   - Name: `MONGODB_URI`
   - Value: Your MongoDB Atlas connection string
5. Click Deploy

### Deploy to Other Services

Supports any Node.js hosting:
- Heroku
- Railway
- AWS
- Azure
- DigitalOcean
- Render

Just provide `MONGODB_URI` environment variable.

---

## 🐛 Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| "Cannot find mongodb" | Check `.env.local` has MONGODB_URI |
| "Connection timeout" | Ensure IP is whitelisted in MongoDB Atlas |
| "Invalid credentials" | Double-check username and password |
| "Images not loading" | Temporary imgflip.com issue, wait and retry |
| "Modal doesn't open" | Clear browser cache (Ctrl+Shift+Delete) |
| "Changes not saving" | Check browser console for errors |

---

## 📚 Learn More

- **Next.js**: https://nextjs.org/docs
- **MongoDB**: https://docs.mongodb.com
- **Mongoose**: https://mongoosejs.com
- **React**: https://react.dev

---

## ✨ What Makes This Special

✅ **Pure CSS Modules** - No external CSS libraries  
✅ **TypeScript Throughout** - Full type safety  
✅ **Infinite Scroll** - Smooth UX for large datasets  
✅ **Modal Dialog** - Elegant edit interface  
✅ **Auto-initialize** - Smart data loading  
✅ **Responsive Design** - Works everywhere  
✅ **Production Ready** - Can deploy immediately  

---

**🎉 You're all set! Start with `npm run dev` and enjoy your meme gallery!**
