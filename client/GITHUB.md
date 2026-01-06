# 📌 GitHub Setup Instructions

## Prerequisites
- Git installed on your computer
- GitHub account (free at https://github.com)

## Step-by-Step GitHub Setup

### Step 1: Create a GitHub Repository

1. Go to https://github.com/new
2. Name your repository: `meme-gallery` (or any name you prefer)
3. Add description: "Full-stack meme management application with Next.js and MongoDB"
4. Choose **Public** or **Private**
5. **Don't** initialize with README (we already have one)
6. Click "Create repository"

### Step 2: Push Your Code to GitHub

Open PowerShell/Terminal in your project directory and run:

```powershell
# Add all files to git
git add .

# Create initial commit
git commit -m "Initial commit: Meme Gallery application"

# Add remote repository (replace YOUR_USERNAME and YOUR_REPO)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

### Step 3: Verify on GitHub

1. Go to your repository URL: `https://github.com/YOUR_USERNAME/YOUR_REPO`
2. You should see all your files there
3. The README should display nicely

---

## 🔐 Important: Don't Commit Secrets!

⚠️ **NEVER** commit your MongoDB credentials!

Check that `.gitignore` includes:
```
.env.local
.env
```

Your `.env.local` file with passwords should NOT be pushed. It's already in `.gitignore`.

---

## 📤 Sharing Your Repository

Once pushed, you can:

### Share the Link
- Repository: `https://github.com/YOUR_USERNAME/YOUR_REPO`
- Clone URL: `https://github.com/YOUR_USERNAME/YOUR_REPO.git`

### Clone on Another Machine
```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
npm install
```

Then create `.env.local` with MongoDB connection string.

### Make It Updateable
After initial push, you can update with:
```bash
git add .
git commit -m "Your message"
git push
```

---

## 🚀 Automatic Deployment with Vercel

1. Go to https://vercel.com
2. Click "Import Project"
3. Select "From Git" and choose GitHub
4. Authorize Vercel to access your GitHub
5. Select your `meme-gallery` repository
6. Add environment variable in "Environment Variables":
   - Name: `MONGODB_URI`
   - Value: Your MongoDB Atlas connection string
7. Click "Deploy"

**That's it!** Your app is now live at a URL like:
```
https://meme-gallery-yourname.vercel.app
```

---

## 📝 Commit Best Practices

```bash
# Good commits
git commit -m "Add infinite scroll functionality"
git commit -m "Create edit modal component"
git commit -m "Configure MongoDB connection"

# Bad commits
git commit -m "stuff"
git commit -m "fixes"
git commit -m "wip"
```

---

## 🔄 Working with Others

If collaborating:

1. Person A pushes code
2. Person B pulls: `git pull`
3. Person B makes changes
4. Person B commits and pushes: `git push`
5. Person A pulls the updates: `git pull`

---

## 🆘 Troubleshooting Git

### "fatal: not a git repository"
```bash
git init
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
```

### "rejected... Your branch is behind"
```bash
git pull
```

### "fatal: 'origin' does not appear to be a 'git' repository"
Check remote: `git remote -v`
Add if missing: `git remote add origin [your-url]`

### Want to reset and start over?
```bash
rm -r .git
git init
git remote add origin [your-url]
git add .
git commit -m "Initial commit"
git push -u origin main
```

---

## ✨ Your Completed Repository

Your GitHub repository will have:

```
📦 meme-gallery
├── 📄 README.md (Project documentation)
├── 📄 SETUP.md (Setup instructions)
├── 📄 GITHUB.md (This file)
├── 📁 app/
│   ├── api/
│   ├── page.tsx
│   ├── page.module.css
│   ├── layout.tsx
│   └── globals.css
├── 📁 lib/
│   ├── mongodb.ts
│   ├── memeSchema.ts
│   └── initializeData.ts
├── 📁 public/
├── package.json
├── tsconfig.json
├── next.config.ts
├── .gitignore
└── ... other files
```

---

**Ready to push? Use the commands above! 🚀**
