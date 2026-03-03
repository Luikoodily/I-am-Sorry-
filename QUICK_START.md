# 💕 Romantic Apology Website - Quick Start

## 🌐 Live Demo
**Your website is live at:** https://boqpiqfjfxvnq.ok.kimi.link

---

## 📸 How to Add Your Photos (3 Easy Ways)

### Method 1: Image URLs (Fastest - 2 minutes)

1. Upload your photos to [Imgur](https://imgur.com) or any image host
2. Get the direct image URLs
3. Edit `src/App.tsx` lines 343 and 363:

```tsx
// Your photo
imageUrl="https://i.imgur.com/YOUR_PHOTO.jpg"

// Her photo  
imageUrl="https://i.imgur.com/HER_PHOTO.jpg"
```

4. Rebuild and redeploy!

### Method 2: Environment Variables (Recommended)

1. Create `.env` file in project root:

```env
VITE_YOUR_PHOTO_URL=https://i.imgur.com/your-photo.jpg
VITE_HER_PHOTO_URL=https://i.imgur.com/her-photo.jpg
VITE_HER_NAME=Sarah
```

2. The code automatically reads these!

### Method 3: Local Images

1. Put images in `public/` folder
2. Reference as `/your-photo.jpg`

---

## 🚀 Deploy to Your Own Domain

### Option A: Vercel (Free & Easy)

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel --prod
```

Your site will be at `https://your-project.vercel.app`

### Option B: GitHub + Vercel

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repo
4. Click Deploy

---

## ✨ Features Included

| Feature | Description |
|---------|-------------|
| 💕 Double-click photos | Spawns animated "Sorry" messages |
| 🎨 Random colors | Each message has unique romantic colors |
| 📱 Mobile responsive | Works perfectly on phones |
| 💖 Floating hearts | Animated background hearts |
| 🔢 Sorry counter | Tracks how many times you apologized |
| 🎵 Music button | Ready for your special song |
| ✨ Sparkle effects | Magical floating sparkles |
| 🌈 Gradient background | Soft pink/purple romantic gradient |

---

## 🎯 How It Works

1. **Double-click** on either photo
2. Watch **"Sorry" messages** appear with random:
   - Colors (pink, purple, coral, magenta...)
   - Sizes (20px - 60px)
   - Positions
   - Rotations
3. Messages **fade out** after 3 seconds
4. **Counter** increases with each click
5. Maximum **20 messages** on screen (prevents lag)

---

## 📝 Customization Ideas

### Change the Main Message

Edit line 323 in `src/App.tsx`:
```tsx
<h1>I'm truly sorry, {HER_NAME} 💕</h1>
```

### Change Subtitle

Edit line 332:
```tsx
<p>Every moment without your smile feels incomplete...</p>
```

### Add Your Song

1. Put MP3 in `public/our-song.mp3`
2. Uncomment audio code in `App.tsx`

---

## 🛠️ Project Structure

```
app/
├── src/
│   ├── App.tsx          # Main component
│   ├── App.css          # Styles
│   └── index.css        # Global styles
├── public/              # Static files (photos, music)
├── dist/                # Built files (deploy this)
├── .env.example         # Environment template
├── README.md            # Full documentation
├── DEPLOYMENT.md        # Deployment guide
└── vercel.json          # Vercel config
```

---

## 🆘 Need Help?

### Photos not showing?
- Use direct image URLs (end with .jpg or .png)
- Test URL in browser first
- Try Imgur for free hosting

### Want to customize colors?
- Edit `tailwind.config.js`
- Look for `romantic:` colors

### Music not working?
- Use MP3 format
- Place in `public/` folder
- Some browsers block autoplay

---

## 💝 Tips for Success

1. **Use meaningful photos** - Pick happy memories
2. **Personalize the message** - Include her name
3. **Add your song** - Make it extra special
4. **Test before sending** - Double-click a few times
5. **Be genuine** - The website is a gesture, your words matter most

---

## 📱 Preview on Mobile

Open the live URL on your phone to test:
- Double-tap works on mobile
- Layout adapts to screen size
- Animations are smooth

---

**Good luck! May she forgive you! 💕**

---

## 🔗 Quick Links

- **Live Site**: https://boqpiqfjfxvnq.ok.kimi.link
- **Full README**: [README.md](./README.md)
- **Deployment Guide**: [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Vercel**: https://vercel.com
- **Imgur**: https://imgur.com
