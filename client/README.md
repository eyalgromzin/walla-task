# 🎨 Meme Gallery - Full Stack Application

A full-stack meme management application built with **Next.js** (React) frontend and **MongoDB** database. Browse, search, and edit meme collections with infinite scrolling.

## 🎯 Features

- **Infinite Scrolling**: Loads 10 memes at a time as you scroll
- **Edit Modal**: Click "Edit" on any meme to open a modal dialog for renaming
- **Real-time Updates**: Changes appear immediately in the list after server confirmation
- **Responsive Design**: Beautiful, mobile-friendly interface using CSS modules
- **Initial Data**: Automatically fetches memes from the imgflip API on first startup
- **MongoDB Integration**: Stores and manages meme data persistently

## 🛠️ Tech Stack

### Frontend
- **Next.js 16.1.1** - React framework with App Router
- **React 19.2.3** - UI library
- **CSS Modules** - Component-scoped styling (no external CSS libraries)
- **TypeScript** - Type-safe development

### Backend
- **Next.js API Routes** - Serverless backend
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (using MongoDB Atlas or Docker)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd walla
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure MongoDB

#### Option A: MongoDB Atlas (Recommended)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string (Database → Connect → Drivers)
4. Update `.env.local`:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/walla_db?retryWrites=true&w=majority
```

#### Option B: Local MongoDB with Docker
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

Then update `.env.local`:
```env
MONGODB_URI=mongodb://localhost:27017/walla_db
```

### 4. Run the Application

```bash
npm run dev
```

The application will start at `http://localhost:3000`

- First load: Fetches ~150 memes from imgflip API and stores them in MongoDB
- Subsequent loads: Uses data from MongoDB

## 📱 Usage

### Viewing Memes
1. Open `http://localhost:3000`
2. Scroll down to load more memes (10 at a time)
3. Infinite scroll continues until all memes are loaded

### Editing a Meme
1. Click the "✏️ Edit" button on any meme card
2. A modal appears with the current meme name
3. Edit the name in the text field
4. Click "Save" to update (or "Cancel" to discard changes)
5. The list updates immediately with the new name
6. Click outside the modal to close it

## 🏗️ Project Structure

```
walla/
├── app/
│   ├── api/
│   │   └── memes/
│   │       ├── route.ts          # GET /api/memes - Fetch paginated memes
│   │       └── [id]/
│   │           └── route.ts      # PUT /api/memes/[id] - Update meme name
│   ├── page.tsx                  # Main meme gallery page
│   ├── page.module.css           # Component styles
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
├── lib/
│   ├── mongodb.ts                # MongoDB connection handler
│   ├── memeSchema.ts             # Mongoose schema for memes
│   └── initializeData.ts         # Initial data loading from imgflip API
├── .env.local                    # Environment variables (MongoDB URI)
├── package.json                  # Dependencies
└── README.md                     # This file
```

## 🔌 API Endpoints

### GET /api/memes
Fetch paginated list of memes

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "id": "1234567",
      "name": "Meme Name",
      "url": "https://example.com/image.jpg"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 150,
    "pages": 15
  }
}
```

### PUT /api/memes/[id]
Update a meme's name

**Request Body:**
```json
{
  "name": "New Meme Name"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "id": "1234567",
    "name": "New Meme Name",
    "url": "https://example.com/image.jpg"
  }
}
```

## 🎨 Styling

The project uses **CSS Modules only** - no external CSS frameworks like Tailwind or Bootstrap.

All styles are in `app/page.module.css` with the following sections:
- Container and layout
- Meme cards and grid
- Loading states and animations
- Modal overlay and dialog
- Form elements and buttons

## 🔄 Data Flow

```
1. Initial Load
   └─→ Check MongoDB for data
       ├─→ If empty: Fetch from imgflip API
       │   └─→ Store all memes in MongoDB
       └─→ Fetch first 10 memes

2. Infinite Scroll
   └─→ User scrolls to bottom
       └─→ Load next 10 memes (page++)
           └─→ Fetch from MongoDB

3. Edit Meme
   └─→ Click Edit button
       └─→ Modal appears with form
           └─→ Edit name and click Save
               └─→ PUT request to /api/memes/[id]
                   └─→ Update MongoDB
                       └─→ Update UI with new name
```

## 🐛 Troubleshooting

### MongoDB Connection Error
- Verify MONGODB_URI in `.env.local`
- Check MongoDB Atlas IP whitelist
- Ensure credentials are correct

### Images Not Loading
- Images are fetched from imgflip URLs
- Fallback image is shown if URL is broken
- Check your internet connection

### Modal Not Appearing
- Ensure JavaScript is enabled
- Check browser console for errors
- Modal closes when clicking outside or Cancel button

## 📦 Build for Production

```bash
npm run build
npm start
```

The application will be optimized and ready for deployment.

## 🚀 Deployment

### Deploy to Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add `MONGODB_URI` to environment variables
4. Deploy with one click

### Deploy to Other Platforms
- Update environment variables on your hosting platform
- Ensure MongoDB Atlas whitelist includes server IPs
- Run `npm run build` then `npm start`

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Created as a full-stack JavaScript/TypeScript exercise.
```

For the Next.js server:
```bash
cd server
npm install
```

### Run Development Servers

Run the React client:
```bash
cd client
npm start
```

Run the Next.js server (in a new terminal):
```bash
cd server
npm run dev
```

## Available Scripts

### Client (React)
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

### Server (Next.js)
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server

## Technologies Used

- React 18 with TypeScript
- Next.js 16 with TypeScript
- TailwindCSS
- ESLint

## License

MIT
