# 💕 Romantic Apology Website

A beautiful, interactive apology website built with React, TypeScript, Tailwind CSS, and Framer Motion. Double-click on the photos to spawn animated "Sorry" messages with random colors, sizes, and positions!

![Romantic Apology Website](https://your-screenshot-url-here.com)

## ✨ Features

- **Interactive Photo Frames**: Double-click on either photo to spawn animated "Sorry" messages
- **Random Message Properties**: Each message has unique:
  - Position (random x, y coordinates)
  - Color (from a romantic color palette)
  - Font size (20px - 60px)
  - Rotation (-15° to +15°)
  - Animation (fade in, float up, fade out)
- **Floating Heart Background**: Animated hearts floating in the background
- **Sorry Counter**: Tracks how many times you've said sorry
- **Music Player Button**: Ready for adding your special song
- **Mobile Responsive**: Works beautifully on phones and tablets
- **Smooth Animations**: Gentle, romantic animations using Framer Motion

## 🎨 Romantic Color Palette

- Deep Pink (`#ff1493`)
- Hot Pink (`#ff69b4`)
- Orchid (`#da70d6`)
- Coral (`#ff7f7f`)
- Magenta (`#ff00ff`)
- Violet (`#ee82ee`)
- And more...

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/romantic-apology.git
cd romantic-apology
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📸 Adding Your Photos

### Option 1: Using Image URLs (Recommended for Quick Setup)

Edit `src/App.tsx` and replace the empty strings with your image URLs:

```tsx
<PhotoFrame 
  photoId="left" 
  imageUrl="https://your-image-url.com/your-photo.jpg"
  label="Me" 
/>

<PhotoFrame 
  photoId="right" 
  imageUrl="https://your-image-url.com/her-photo.jpg"
  label="My Everything" 
/>
```

### Option 2: Using Local Images

1. Place your images in the `public/` folder:
   - `public/your-photo.jpg`
   - `public/her-photo.jpg`

2. Update the image paths in `src/App.tsx`:

```tsx
<PhotoFrame 
  photoId="left" 
  imageUrl="/your-photo.jpg"
  label="Me" 
/>

<PhotoFrame 
  photoId="right" 
  imageUrl="/her-photo.jpg"
  label="My Everything" 
/>
```

### Option 3: Using Environment Variables

1. Create a `.env` file in the root directory:

```env
VITE_YOUR_PHOTO_URL=https://your-image-url.com/your-photo.jpg
VITE_HER_PHOTO_URL=https://your-image-url.com/her-photo.jpg
VITE_HER_NAME=My Love
```

2. Update `src/App.tsx` to use environment variables:

```tsx
<PhotoFrame 
  photoId="left" 
  imageUrl={import.meta.env.VITE_YOUR_PHOTO_URL}
  label="Me" 
/>

<PhotoFrame 
  photoId="right" 
  imageUrl={import.meta.env.VITE_HER_PHOTO_URL}
  label="My Everything" 
/>
```

## 🎵 Adding Your Song

To add music functionality:

1. Place your audio file in the `public/` folder:
   - `public/our-song.mp3`

2. Uncomment the audio-related code in `src/App.tsx`:

```tsx
// Add this import
import { useRef } from 'react';

// Add this inside the App component
const audioRef = useRef<HTMLAudioElement | null>(null);

// Update the toggleMusic function
const toggleMusic = () => {
  if (audioRef.current) {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }
};

// Add this at the end of the return statement, before the closing div
<audio ref={audioRef} src="/our-song.mp3" loop />
```

## 📝 Customizing the Message

To change the main apology message, edit the heading in `src/App.tsx`:

```tsx
<h1 className="text-3xl md:text-5xl lg:text-6xl font-bold romantic-text...">
  I'm truly sorry, [Her Name] 💕
</h1>
```

You can also customize the sub-message:

```tsx
<p className="text-romantic-lavender text-lg md:text-xl mt-4...">
  Your custom message here
</p>
```

## 🚀 Deploying to Vercel

### Option 1: Using Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. For production deployment:
```bash
vercel --prod
```

### Option 2: Using GitHub + Vercel (Recommended)

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/romantic-apology.git
git push -u origin main
```

2. Go to [Vercel Dashboard](https://vercel.com/dashboard)

3. Click "Add New Project"

4. Import your GitHub repository

5. Configure build settings:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

6. Click "Deploy"

7. Your site will be live at `https://your-project.vercel.app`

### Option 3: Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Drag and drop the `dist/` folder to [Vercel Dashboard](https://vercel.com/dashboard)

## 🎨 Customization Options

### Changing Colors

Edit `tailwind.config.js` to modify the romantic color palette:

```js
colors: {
  romantic: {
    pink: '#ff69b4',
    rose: '#ff1493',
    lavender: '#da70d6',
    // Add your custom colors
  },
}
```

### Adjusting Animation Speed

Edit `src/App.tsx` to change animation durations:

```tsx
// Change the message duration (default: 3000ms)
setTimeout(() => {
  setSorryMessages(prev => prev.filter(msg => msg.id !== newMessage.id));
}, 3000); // Change this value
```

### Changing Maximum Messages

Modify the limit in the `spawnSorryMessage` function:

```tsx
// Change max messages (default: 20)
if (prev.length >= 20) {
  return prev.slice(1);
}
```

## 📱 Mobile Responsiveness

The website is fully responsive and adapts to different screen sizes:

- **Desktop**: Photos side by side with heart connector
- **Mobile**: Photos stacked vertically for better viewing
- **Touch-friendly**: Double-tap works on mobile devices

## 🛠️ Built With

- [React](https://reactjs.org/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Lucide React](https://lucide.dev/) - Icons

## 💝 Tips for a Heartfelt Apology

1. **Personalize the message**: Change the text to include her name and specific memories
2. **Choose meaningful photos**: Pick photos that remind her of happy times together
3. **Add your song**: Include a song that has special meaning for both of you
4. **Be genuine**: The website is a gesture, but your words and actions matter most

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 💌 Credits

Created with love for anyone who wants to say "I'm sorry" in a special way.

---

**Note**: This website is a gesture to accompany a genuine apology. Nothing replaces honest communication and sincere effort to make things right. 💕
# I-am-Sorry-
