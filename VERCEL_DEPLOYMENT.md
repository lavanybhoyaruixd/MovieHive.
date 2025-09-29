# Deploy Movie App to Vercel

## 🚀 Complete Deployment Guide

### Prerequisites
- ✅ Your app is working locally
- ✅ You have a GitHub account
- ✅ You have a Vercel account (free)

---

## Step 1: Prepare Your Project for Deployment

### 1.1 Create Production Build
First, let's make sure your project builds correctly:

```bash
npm run build
```

### 1.2 Test Production Build Locally
```bash
npm run preview
```

This should open your app at `http://localhost:4173/` - test it to make sure everything works.

---

## Step 2: Setup Git Repository

### 2.1 Initialize Git (if not already done)
```bash
git init
git add .
git commit -m "Initial commit - Movie App ready for deployment"
```

### 2.2 Create GitHub Repository
1. Go to [GitHub.com](https://github.com)
2. Click **"New Repository"**
3. Repository name: `movie-app` (or your preferred name)
4. Make it **Public** or **Private**
5. **Don't** initialize with README (since you already have code)
6. Click **"Create Repository"**

### 2.3 Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/movie-app.git
git branch -M main
git push -u origin main
```

---

## Step 3: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Go to [Vercel.com](https://vercel.com)**
2. **Sign up/Login** with your GitHub account
3. **Click "New Project"**
4. **Import your GitHub repository**
5. **Configure project settings**:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

---

## Step 4: Configure Environment Variables

Your app uses environment variables that need to be set in Vercel:

### 4.1 Add Environment Variables in Vercel
1. **Go to your Vercel project dashboard**
2. **Click "Settings" tab**
3. **Click "Environment Variables"**
4. **Add these variables**:

```env
VITE_TMDB_API_KEY=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwODk2NmJmYmI3ZGUxN2E4MWRlMzhiMWJlN2ViMDIzZSIsIm5iZiI6MTc1NTUxODI4Ni4zMTIsInN1YiI6IjY4YTMxNTRlMjMyNzI1MGVmZmU5NGZjOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yPVmXZTF_JnetDnxgxebGjB55LP7AxwGSMPvAKnlc8A

VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1

VITE_APPWRITE_PROJECT_ID=68a37c77001a4d04ad0f

VITE_APPWRITE_DATABASE_ID=68a37e7a00266a118f6d

VITE_APPWRITE_COLLECTION_ID=68a37f1d0034d8bc85b8

VITE_APPWRITE_FAVORITES_COLLECTION_ID=68da2d05003293deddfd
```

### 4.2 Set Environment for All Environments
- **Production**: ✅ Check
- **Preview**: ✅ Check  
- **Development**: ✅ Check

---

## Step 5: Update Authentication URLs

Since your domain will change, update the authentication callback URLs:

### 5.1 Update AuthContext.jsx
Update the verification URL in your signup function:

```javascript
// In src/AuthContext.jsx, line 46
await account.createVerification('https://your-app-name.vercel.app/verify');
```

### 5.2 Update Appwrite Settings
1. Go to your Appwrite Console
2. Navigate to **Auth** → **Settings**
3. Add your Vercel domain to **Allowed Origins**:
   - `https://your-app-name.vercel.app`
   - `https://your-app-name-git-main-yourusername.vercel.app`

---

## Step 6: Optimize for Production

### 6.1 Create vercel.json (Optional but recommended)
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

### 6.2 Update package.json Scripts
Make sure your build scripts are optimized:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  }
}
```

---

## Step 7: Test and Deploy

### 7.1 Redeploy After Changes
If you made changes:
```bash
git add .
git commit -m "Update for production deployment"
git push
```

Vercel will automatically redeploy when you push to main branch.

### 7.2 Test Production App
1. **Visit your Vercel URL**
2. **Test key features**:
   - ✅ Movie browsing
   - ✅ Search functionality  
   - ✅ User authentication
   - ✅ Add to favorites
   - ✅ Profile page favorites
   - ✅ Movie details

---

## 🎯 Expected Vercel URLs

Your app will be available at:
- **Production**: `https://your-app-name.vercel.app`
- **Git Branch**: `https://your-app-name-git-main-yourusername.vercel.app`
- **Preview**: `https://your-app-name-xxxxx.vercel.app` (for pull requests)

---

## 🔧 Troubleshooting

### Build Errors
If build fails:
1. Check the **Vercel build logs**
2. Make sure `npm run build` works locally
3. Verify all dependencies are in `package.json`

### Environment Variables Not Working
1. Double-check variable names (must start with `VITE_`)
2. Make sure they're set in Vercel dashboard
3. Redeploy after adding variables

### Authentication Issues
1. Update Appwrite allowed origins
2. Update callback URLs to use your Vercel domain
3. Check CORS settings in Appwrite

### Routing Issues (404 errors)
- Make sure `vercel.json` has the rewrite rule for SPA routing

---

## 🎉 Success!

Once deployed, your movie app will be:
- ✅ **Globally accessible** via Vercel CDN
- ✅ **HTTPS enabled** by default
- ✅ **Auto-deployed** on git pushes
- ✅ **Scalable** and fast

Your app will be live at: `https://YOUR_APP_NAME.vercel.app`

Share the link and enjoy your deployed movie application! 🎬🚀