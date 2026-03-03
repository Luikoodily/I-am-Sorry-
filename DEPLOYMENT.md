# 🚀 Deployment Guide

## Quick Deploy to Vercel (Easiest Method)

### Step 1: Prepare Your Project

1. Make sure you have added your photos (see options below)
2. Test locally with `npm run dev`
3. Build with `npm run build` to ensure no errors

### Step 2: Add Your Photos

#### Option A: Using Image URLs (Fastest)

Edit `src/App.tsx` directly:

```tsx
<PhotoFrame 
  photoId="left" 
  imageUrl="https://i.imgur.com/your-image.jpg"
  label="Me" 
/>

<PhotoFrame 
  photoId="right" 
  imageUrl="https://i.imgur.com/her-image.jpg"
  label="My Everything" 
/>
```

#### Option B: Using Environment Variables (Recommended)

1. Create a `.env` file:

```env
VITE_YOUR_PHOTO_URL=https://i.imgur.com/your-image.jpg
VITE_HER_PHOTO_URL=https://i.imgur.com/her-image.jpg
VITE_HER_NAME=Sarah
```

2. The code already uses these variables!

#### Option C: Local Images

1. Put images in `public/` folder:
   - `public/your-photo.jpg`
   - `public/her-photo.jpg`

2. Update code:

```tsx
imageUrl="/your-photo.jpg"
```

### Step 3: Deploy to Vercel

#### Method 1: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Production deploy
vercel --prod
```

#### Method 2: GitHub + Vercel (Recommended)

1. **Create GitHub Repository**:
```bash
git init
git add .
git commit -m "Romantic apology website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/romantic-apology.git
git push -u origin main
```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with GitHub
   - Click "Add New Project"
   - Import your repository
   - Framework Preset: **Vite**
   - Click **Deploy**

3. **Your site is live!** 🎉

#### Method 3: Drag & Drop

1. Run `npm run build`
2. Go to [vercel.com](https://vercel.com)
3. Drag the `dist/` folder to the dashboard
4. Done!

## 📸 Where to Host Photos

### Free Image Hosting Options:

1. **Imgur** (Recommended)
   - Go to [imgur.com](https://imgur.com)
   - Upload your photo
   - Right-click → "Copy image address"
   - Use that URL

2. **Cloudinary**
   - Sign up at [cloudinary.com](https://cloudinary.com)
   - Upload images
   - Get direct URL

3. **GitHub**
   - Upload to your repo
   - Use raw GitHub URL

## 🎵 Adding Background Music

1. Add your MP3 to `public/` folder:
   - `public/our-song.mp3`

2. Uncomment in `src/App.tsx`:

```tsx
// Add to imports
import { useRef } from 'react';
import { VolumeX } from 'lucide-react';

// Add inside component
const audioRef = useRef<HTMLAudioElement | null>(null);

// Update toggleMusic
const toggleMusic = () => {
  if (audioRef.current) {
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  }
};

// Add before closing </div>
<audio ref={audioRef} src="/our-song.mp3" loop />
```

## 🔧 Customization Checklist

- [ ] Add your photo
- [ ] Add her photo
- [ ] Change her name in the message
- [ ] Customize the apology text
- [ ] Add your song (optional)
- [ ] Test double-click functionality
- [ ] Test on mobile
- [ ] Deploy! 🚀

## 📱 Testing on Mobile

1. Open the deployed URL on your phone
2. Test double-tap on photos
3. Verify animations are smooth
4. Check that layout looks good

## 💡 Pro Tips

1. **Use square or portrait photos** for best results
2. **Compress images** before uploading (under 1MB)
3. **Test the double-click** multiple times to ensure smooth performance
4. **Customize the message** to make it personal

## 🆘 Troubleshooting

### Photos not showing?
- Check the URL is correct
- Ensure URL ends with image extension (.jpg, .png)
- Try opening the URL directly in browser

### Animations lagging?
- Reduce max messages (default: 20)
- Use smaller images
- Test on a different device

### Music not playing?
- Check file is in `public/` folder
- Ensure file format is MP3
- Some browsers block autoplay

## 🌐 Custom Domain (Optional)

1. Buy a domain (Namecheap, GoDaddy, etc.)
2. In Vercel dashboard:
   - Go to Project Settings → Domains
   - Add your domain
   - Follow DNS instructions

Example romantic domains:
- `imsorry-[hername].com`
- `forgiveme-[hername].com`
- `ourlove-[yourname].com`

---

**Good luck! May she forgive you! 💕**
