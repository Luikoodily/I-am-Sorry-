import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Music, Volume2, Sparkles, RotateCcw } from 'lucide-react';
import './App.css';

// Import local assets
import moshamPhoto from '@/lib/mosham.jpeg';
import nalathPhoto from '@/lib/nalath.jpeg';
import perfectSong from '@/lib/Ed Sheeran - Perfect (Official Music Video).mp3';

// Types
interface SorryMessage {
  id: string;
  text: string;
  x: number;
  y: number;
  color: string;
  fontSize: number;
  rotation: number;
  photoId: 'left' | 'right';
}

interface FloatingHeart {
  id: string;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

// Romantic color palette for sorry messages
const romanticColors = [
  '#ff1493', // deep pink
  '#ff69b4', // hot pink
  '#da70d6', // orchid
  '#ff7f7f', // coral
  '#ff00ff', // magenta
  '#ba55d3', // medium orchid
  '#ee82ee', // violet
  '#ff6347', // tomato
  '#ff4500', // orange red
  '#dc143c', // crimson
];

// Sorry message variations
const sorryTexts = [
  'Sorry',
  'I\'m Sorry',
  'Forgive Me',
  'My Bad',
  'So Sorry',
  'Truly Sorry',
  'Please Forgive Me',
  'I Apologize',
  '💕 Sorry 💕',
  '😔 Sorry',
];

// Generate random floating hearts for background
const generateFloatingHearts = (count: number): FloatingHeart[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `heart-${i}-${Date.now()}`,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 20 + 10,
    duration: Math.random() * 4 + 4,
    delay: Math.random() * 5,
  }));
};

function App() {
  // State
  const [sorryMessages, setSorryMessages] = useState<SorryMessage[]>([]);
  const [sorryCount, setSorryCount] = useState(0);
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const messageIdCounter = useRef(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Initialize floating hearts
  useEffect(() => {
    setFloatingHearts(generateFloatingHearts(15));
    const interval = setInterval(() => {
      setFloatingHearts(generateFloatingHearts(15));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Hide hint after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Generate unique ID for messages
  const generateId = () => {
    messageIdCounter.current += 1;
    return `sorry-${Date.now()}-${messageIdCounter.current}`;
  };

  // Add a new sorry message
  const spawnSorryMessage = useCallback((photoId: 'left' | 'right', rect: DOMRect) => {
    // Limit to 20 messages
    setSorryMessages(prev => {
      if (prev.length >= 20) {
        return prev.slice(1);
      }
      return prev;
    });

    const newMessage: SorryMessage = {
      id: generateId(),
      text: sorryTexts[Math.floor(Math.random() * sorryTexts.length)],
      x: Math.random() * (rect.width - 100) + 20,
      y: Math.random() * (rect.height - 60) + 20,
      color: romanticColors[Math.floor(Math.random() * romanticColors.length)],
      fontSize: Math.random() * 40 + 20, // 20px to 60px
      rotation: (Math.random() - 0.5) * 30, // -15 to 15 degrees
      photoId,
    };

    setSorryMessages(prev => [...prev, newMessage]);
    setSorryCount(prev => prev + 1);

    // Remove message after 3 seconds
    setTimeout(() => {
      setSorryMessages(prev => prev.filter(msg => msg.id !== newMessage.id));
    }, 3000);
  }, []);

  // Handle double click on photo
  const handlePhotoDoubleClick = useCallback((photoId: 'left' | 'right') => (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    spawnSorryMessage(photoId, rect);
  }, [spawnSorryMessage]);

  // Toggle music (placeholder functionality)
  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => {
          console.error('Error playing audio:', err);
          alert('Unable to play audio. Please check if the song URL is valid.');
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Reset counter
  const resetCounter = () => {
    setSorryCount(0);
    setSorryMessages([]);
  };

  // Photo frame component
  const PhotoFrame = ({ 
    photoId, 
    imageUrl, 
    label 
  }: { 
    photoId: 'left' | 'right'; 
    imageUrl: string; 
    label: string;
  }) => (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: photoId === 'left' ? 0.2 : 0.4 }}
    >
      <div className="text-center mb-4">
        <span className="text-romantic-rose font-semibold text-lg">{label}</span>
      </div>
      
      <motion.div
        className="relative w-64 h-80 md:w-72 md:h-96 lg:w-80 lg:h-[28rem] rounded-3xl overflow-hidden cursor-pointer photo-glow"
        onDoubleClick={handlePhotoDoubleClick(photoId)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {/* Photo border with gradient */}
        <div className="absolute inset-0 rounded-3xl p-1 bg-gradient-to-br from-romantic-pink via-romantic-lavender to-romantic-coral">
          <div className="w-full h-full rounded-3xl overflow-hidden bg-white">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={label}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
                <Heart className="w-16 h-16 text-romantic-pink mb-4 opacity-50" />
                <span className="text-romantic-lavender text-sm">Add your photo here</span>
              </div>
            )}
          </div>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-romantic-pink/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Double click hint */}
        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 glass px-3 py-1.5 rounded-full"
            >
              <span className="text-xs text-romantic-rose font-medium">Double-click me!</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sorry messages container */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
          <AnimatePresence>
            {sorryMessages
              .filter(msg => msg.photoId === photoId)
              .map(msg => (
                <motion.span
                  key={msg.id}
                  initial={{ opacity: 0, y: 20, scale: 0.8, rotate: 0 }}
                  animate={{ 
                    opacity: [0, 1, 1, 0], 
                    y: [20, 0, -30, -60],
                    scale: [0.8, 1, 1, 0.9],
                    rotate: msg.rotation,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 3, ease: 'easeOut' }}
                  style={{
                    position: 'absolute',
                    left: msg.x,
                    top: msg.y,
                    color: msg.color,
                    fontSize: `${msg.fontSize}px`,
                    fontWeight: 'bold',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                    fontFamily: '"Segoe UI", "Pacifico", cursive',
                  }}
                  className="whitespace-nowrap"
                >
                  {msg.text}
                </motion.span>
              ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen romantic-gradient relative overflow-hidden">
      {/* Floating Hearts Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {floatingHearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute"
            style={{
              left: `${heart.x}%`,
              top: `${heart.y}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: heart.duration,
              repeat: Infinity,
              delay: heart.delay,
              ease: 'easeInOut',
            }}
          >
            <Heart
              size={heart.size}
              className="text-romantic-pink/40 fill-romantic-pink/20"
            />
          </motion.div>
        ))}
      </div>

      {/* Sparkles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            <Sparkles size={Math.random() * 15 + 10} className="text-romantic-coral/50" />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        {/* Header Message */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-8 md:mb-12"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block"
          >
            <Heart className="w-12 h-12 md:w-16 md:h-16 text-romantic-rose mx-auto mb-4 fill-romantic-pink/30" />
          </motion.div>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold romantic-text text-transparent bg-clip-text bg-gradient-to-r from-romantic-rose via-romantic-lavender to-romantic-coral mb-2">
            I'm truly sorry, {import.meta.env.VITE_HER_NAME || 'My Love'} 💕
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-romantic-lavender text-lg md:text-xl mt-4 max-w-xl mx-auto"
          >
            Every moment without your smile feels incomplete. Please forgive me.
          </motion.p>
        </motion.div>

        {/* Photos Container */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16 mb-8">
          <PhotoFrame 
            photoId="left" 
            imageUrl={moshamPhoto}
            label="Me" 
          />
          
          {/* Heart connector */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, type: 'spring' }}
            className="hidden md:flex items-center justify-center"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart className="w-10 h-10 text-romantic-rose fill-romantic-pink" />
            </motion.div>
          </motion.div>
          
          <PhotoFrame 
            photoId="right" 
            imageUrl={nalathPhoto}
            label="My Everything" 
          />
        </div>

        {/* Counter & Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col items-center gap-4"
        >
          {/* Sorry Counter */}
          <div className="glass px-6 py-3 rounded-2xl flex items-center gap-3">
            <Heart className="w-5 h-5 text-romantic-rose fill-romantic-pink" />
            <span className="text-romantic-rose font-semibold">
              I've said sorry <span className="text-2xl font-bold">{sorryCount}</span> times
            </span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={resetCounter}
              className="ml-2 p-1.5 rounded-full hover:bg-romantic-pink/20 transition-colors"
              title="Reset counter"
            >
              <RotateCcw className="w-4 h-4 text-romantic-lavender" />
            </motion.button>
          </div>

          {/* Control Buttons */}
          <div className="flex gap-4">
            {/* Music Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleMusic}
              className="glass px-5 py-2.5 rounded-full flex items-center gap-2 text-romantic-rose hover:bg-romantic-pink/20 transition-colors"
            >
              {isPlaying ? (
                <>
                  <Volume2 className="w-4 h-4" />
                  <span className="text-sm font-medium">Pause Music</span>
                </>
              ) : (
                <>
                  <Music className="w-4 h-4" />
                  <span className="text-sm font-medium">Play Our Song</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Footer Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-8 text-center"
        >
          <p className="text-romantic-lavender/70 text-sm">
            Double-click on our photos to see how sorry I am
          </p>
        </motion.div>
      </div>

      {/* Audio element for romantic song */}
      <audio 
        ref={audioRef} 
        src={perfectSong}
        loop
        crossOrigin="anonymous"
      />
    </div>
  );
}

export default App;
