import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
// import moshamPhoto from '@/lib/pics/mosham.jpeg';
// import nalathPhoto from '@/lib/pics/nalath.jpeg';
import photo1 from '@/lib/pics/1.jpeg';
import photo2 from '@/lib/pics/2.jpeg';
import photo3 from '@/lib/pics/3.jpeg';
import photo4 from '@/lib/pics/4.jpeg';
import photo5 from '@/lib/pics/5.jpeg';
import photo6 from '@/lib/pics/6.jpeg';
import photo7 from '@/lib/pics/7.jpeg';
import photo8 from '@/lib/pics/8.jpeg';
import photo9 from '@/lib/pics/9.jpeg';
import photo10 from '@/lib/pics/10.jpeg';
import photo11 from '@/lib/pics/11.jpeg';
import photo12 from '@/lib/pics/12.jpeg';
import photo13 from '@/lib/pics/13.jpeg';
import photo14 from '@/lib/pics/14.jpeg';
import photo15 from '@/lib/pics/15.jpeg';
import photo18 from '@/lib/pics/18.jpeg';
import photo19 from '@/lib/pics/19.jpeg';
import photo20 from '@/lib/pics/20.jpeg';
import loveSong from '@/lib/audio/Christina Perri - A Thousand Years.mp3';

// ── Customize these ──────────────────────────────
const HER_NAME = 'Chinnu';
const YOUR_NAME = 'Luicha';
const MOVIE_TITLE = 'world';

const REASONS = [
  'Because your laugh is my favourite sound in the world',
  'Because you make ordinary days feel like adventures',
  "Because you're stronger than you know",
  "Because even when you're upset, I know how lucky I am",
  "Because you love deeply and that's rare",
  "Because you're my person, on every kind of day",
  'Because the world is genuinely better with you in it 🌹',
];

const PROMISES = [
  'I promise to always listen to you',
  'I promise to choose you every single day',
  'I promise to make you smile more than I make you sad',
  'I promise to be the person you deserve',
];

const LETTER = `My dearest ${HER_NAME},\n\nToday the world celebrates women.\nBut I want to celebrate you.\nNot just because it's Women's Day—\nbut because every day with you\nmakes my world better.\n\nI know I haven't been perfect lately.\nI'm sorry. You deserve better,\nand I promise to do better.\n\n— Always yours, ${YOUR_NAME} 💕`;
// ─────────────────────────────────────────────────

const COLORS = {
  bgPage: '#1A0A0E',
  bgCard: '#2D0F1A',
  petalPink: '#F2A7BB',
  roseGold: '#C9847A',
  gold: '#E8C97E',
  burgundy: '#8B1A35',
  cream: '#FDF6EC',
  blush: '#F7C5D0',
  leafGreen: '#2D5016',
};

const sectionReveal = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' as const },
  transition: { duration: 0.8, ease: 'easeOut' as const },
};

type PetalSpec = {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  drift: number;
};

const seededUnit = (seed: number) => {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
};

function FloatingPetals({ count = 18, className = '' }: { count?: number; className?: string }) {
  const petals = useMemo<PetalSpec[]>(
    () =>
      Array.from({ length: count }, (_, id) => ({
        id,
        x: seededUnit((id + 1) * 101 + count) * 100,
        delay: seededUnit((id + 1) * 211 + count) * 5,
        duration: 6 + seededUnit((id + 1) * 307 + count) * 5,
        size: 16 + seededUnit((id + 1) * 401 + count) * 12,
        drift: (seededUnit((id + 1) * 503 + count) - 0.5) * 70,
      })),
    [count],
  );

  return (
    <div className={`pointer-events-none fixed inset-0 overflow-hidden z-0 ${className}`}>
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute select-none"
          style={{ left: `${petal.x}%`, top: '-40px', fontSize: `${petal.size}px` }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, petal.drift, 0],
            rotate: [0, 180, 360],
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          🌸
        </motion.div>
      ))}
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 text-center overflow-hidden">
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 50% 45%, rgba(139,26,53,0.45), rgba(26,10,14,0.98) 65%)',
            'radial-gradient(circle at 50% 45%, rgba(201,132,122,0.32), rgba(26,10,14,0.98) 70%)',
            'radial-gradient(circle at 50% 45%, rgba(139,26,53,0.45), rgba(26,10,14,0.98) 65%)',
          ],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="relative z-10 max-w-3xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <p className="text-4xl sm:text-5xl" style={{ fontFamily: 'Dancing Script, cursive', color: COLORS.petalPink }}>
          Happy Women&apos;s Day
        </p>
        <h1
          className="mt-5 text-3xl sm:text-5xl italic"
          style={{ fontFamily: 'Cormorant Garamond, serif', color: COLORS.cream }}
        >
          To the strongest woman in my world
        </h1>
        <motion.h2
          className="mt-4 text-6xl sm:text-8xl"
          style={{ fontFamily: 'Playfair Display, serif', color: COLORS.roseGold }}
          animate={{
            textShadow: [
              '0 0 20px rgba(201,132,122,0.4)',
              '0 0 60px rgba(201,132,122,0.9)',
              '0 0 20px rgba(201,132,122,0.4)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {HER_NAME} 🌹
        </motion.h2>
        <p className="mt-3 text-sm sm:text-base opacity-80" style={{ color: COLORS.blush, fontFamily: 'Jost, sans-serif' }}>
          and yes, even {MOVIE_TITLE} feels better with you
        </p>
        <motion.div
          className="mt-14 text-3xl"
          style={{ color: COLORS.gold }}
          animate={{ y: [0, 10, 0], opacity: [0.55, 1, 0.55] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          ↓
        </motion.div>
      </motion.div>
    </section>
  );
}

function LetterSection() {
  const words = LETTER.split(/(\s+)/);

  return (
    <motion.section {...sectionReveal} className="relative px-6 py-20 z-10">
      <div
        className="mx-auto max-w-3xl rounded-2xl p-8 sm:p-10 rotate-[-1deg] shadow-[0_18px_60px_rgba(233,184,123,0.22)] border"
        style={{
          backgroundColor: COLORS.cream,
          color: '#4C1D13',
          borderColor: 'rgba(201,132,122,0.35)',
          backgroundImage:
            'radial-gradient(rgba(100,70,45,0.08) 0.6px, transparent 0.6px), linear-gradient(160deg, rgba(255,252,245,0.92), rgba(244,225,201,0.92))',
          backgroundSize: '4px 4px, auto',
        }}
      >
        <div className="flex items-start justify-between mb-4">
          <p className="text-4xl" style={{ fontFamily: 'Dancing Script, cursive' }}>
            My dearest {HER_NAME},
          </p>
          <span className="text-xl">🔴</span>
        </div>

        <div className="text-lg leading-8" style={{ fontFamily: 'Jost, sans-serif' }}>
          {words.map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.035, duration: 0.35 }}
              viewport={{ once: true }}
            >
              {word === '\n' ? <br /> : word}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function YouAreSection() {
  const words = [
    { text: 'beautiful', size: 'text-4xl', color: COLORS.petalPink },
    { text: 'strong', size: 'text-5xl', color: COLORS.gold },
    { text: 'my peace', size: 'text-4xl', color: COLORS.cream },
    { text: 'brilliant', size: 'text-3xl', color: COLORS.roseGold },
    { text: 'my home', size: 'text-5xl', color: COLORS.cream },
    { text: 'brave', size: 'text-3xl', color: COLORS.petalPink },
    { text: 'funny', size: 'text-3xl', color: COLORS.gold },
    { text: 'my favourite', size: 'text-4xl', color: COLORS.blush },
    { text: 'kind', size: 'text-3xl', color: COLORS.roseGold },
    { text: 'the best thing', size: 'text-5xl', color: COLORS.gold },
    { text: 'patient', size: 'text-3xl', color: COLORS.petalPink },
  ];

  return (
    <motion.section {...sectionReveal} className="relative z-10 px-6 py-24 text-center">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-6xl"
      >
        👑
      </motion.div>
      <h3 className="mt-3 text-4xl italic" style={{ color: COLORS.cream, fontFamily: 'Cormorant Garamond, serif' }}>
        You are...
      </h3>

      <div className="mx-auto mt-10 max-w-4xl flex flex-wrap justify-center gap-4 sm:gap-6">
        {words.map((word, i) => (
          <motion.span
            key={word.text}
            className={`${word.size} leading-none`}
            style={{ fontFamily: 'Playfair Display, serif', color: word.color }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.15 + i * 0.08 }}
          >
            {word.text}
          </motion.span>
        ))}
      </div>

      <div className="mt-6 text-xl" style={{ color: COLORS.gold }}>
        ✨ ✨ ✨
      </div>
    </motion.section>
  );
}

function ReasonsSection() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const revealNext = () => {
    if (flipped) return;
    setFlipped(true);
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % REASONS.length);
      setFlipped(false);
    }, 300);
  };

  return (
    <motion.section {...sectionReveal} className="relative z-10 px-6 py-20">
      <div className="mx-auto max-w-3xl text-center">
        <h3 className="text-4xl sm:text-5xl" style={{ color: COLORS.gold, fontFamily: 'Playfair Display, serif' }}>
          🌹 Reasons I Love You
        </h3>
        <div className="mt-10 [perspective:1200px]">
          <motion.button
            onClick={revealNext}
            className="mx-auto block w-full rounded-2xl border px-6 py-12 text-left shadow-2xl"
            style={{
              backgroundColor: COLORS.bgCard,
              borderColor: 'rgba(232,201,126,0.4)',
              transformStyle: 'preserve-3d',
            }}
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-2xl mb-4" style={{ color: COLORS.petalPink, fontFamily: 'Dancing Script, cursive' }}>
              {index + 1}. 
            </p>
            <p className="text-xl sm:text-2xl" style={{ color: COLORS.cream, fontFamily: 'Jost, sans-serif' }}>
              {REASONS[index]}
            </p>
            <p className="mt-6 opacity-55" style={{ color: COLORS.roseGold }}>🌹</p>
          </motion.button>
        </div>

        <p className="mt-6 text-lg" style={{ color: COLORS.blush, fontFamily: 'Jost, sans-serif' }}>
          Tap to reveal next reason →
        </p>
        <p className="mt-1" style={{ color: COLORS.gold, fontFamily: 'Jost, sans-serif' }}>
          {index + 1} of {REASONS.length} revealed
        </p>
      </div>
    </motion.section>
  );
}

function PhotoSection() {
  const items = [
    // { src: moshamPhoto, caption: 'My favourite', angle: '-rotate-2' },
    // { src: nalathPhoto, caption: 'My world', angle: 'rotate-2' },
    // { src: nalathPhoto, caption: 'My world', angle: 'rotate-2' },
    { src: photo1, caption: 'Our adventures', angle: '-rotate-1' },
    { src: photo2, caption: 'Your smile', angle: 'rotate-1' },
    { src: photo3, caption: 'Your laugh', angle: '-rotate-2' },
    { src: photo4, caption: 'Your strength', angle: 'rotate-2' },
    { src: photo5, caption: 'Our moments', angle: '-rotate-1' },
    { src: photo6, caption: 'Your kindness', angle: 'rotate-1' },
    { src: photo7, caption: 'Your beauty', angle: '-rotate-2' },
    { src: photo8, caption: 'Our love', angle: 'rotate-2' },
    { src: photo9, caption: 'You being you', angle: '-rotate-1' },
    { src: photo10, caption: 'Your heart', angle: 'rotate-1' },
    { src: photo11, caption: 'Your soul', angle: '-rotate-2' },
    { src: photo12, caption: 'Our laughs', angle: 'rotate-2' },
    { src: photo13, caption: 'Our dreams', angle: '-rotate-1' },
    { src: photo14, caption: 'Your spirit', angle: 'rotate-1' },
    { src: photo15, caption: 'Your light', angle: '-rotate-2' },
    { src: photo18, caption: 'Your soul', angle: 'rotate-1' },
    { src: photo19, caption: 'You being you', angle: '-rotate-2' },
    { src: photo20, caption: 'Our love', angle: 'rotate-2' },
  ];

  return (
    <motion.section {...sectionReveal} className="relative z-10 px-6 py-20">
      <h3 className="text-center text-4xl sm:text-5xl" style={{ color: COLORS.cream, fontFamily: 'Cormorant Garamond, serif' }}>
        📸 Our Moments 🌸
      </h3>

      <div className="mx-auto mt-10 max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-8">
        {items.map((item) => (
          <motion.figure
            key={item.caption}
            whileHover={{ y: -8, scale: 1.02 }}
            className={`mx-auto w-full max-w-xs sm:max-w-sm rounded-md bg-[#FFFDF8] p-3 shadow-[0_20px_45px_rgba(0,0,0,0.45)] ${item.angle}`}
          >
            <img src={item.src} alt={item.caption} className="h-72 w-full object-cover rounded-sm" />
            <figcaption
              className="pt-3 text-center text-3xl"
              style={{ fontFamily: 'Dancing Script, cursive', color: COLORS.burgundy }}
            >
              {item.caption}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </motion.section>
  );
}

function PromisesSection() {
  const rotations = ['rotate-[-2deg]', 'rotate-[1deg]', 'rotate-[-1deg]', 'rotate-[2deg]'];

  return (
    <motion.section {...sectionReveal} className="relative z-10 px-6 py-20">
      <h3 className="text-center text-4xl sm:text-5xl" style={{ color: COLORS.gold, fontFamily: 'Playfair Display, serif' }}>
        🏺 My Promises to You
      </h3>

      <div className="mx-auto mt-10 max-w-3xl space-y-5">
        {PROMISES.map((promise, i) => (
          <motion.div
            key={promise}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.18, duration: 0.6 }}
            className={`rounded-xl border p-5 sm:p-6 ${rotations[i % rotations.length]}`}
            style={{
              background: 'linear-gradient(140deg, rgba(253,246,236,0.96), rgba(247,197,208,0.95))',
              borderColor: 'rgba(201,132,122,0.35)',
              color: COLORS.burgundy,
            }}
          >
            <p className="text-3xl leading-tight" style={{ fontFamily: 'Dancing Script, cursive' }}>
              {['🌹', '💕', '✨', '🌸'][i % 4]} {promise}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

function ClosingSection() {
  return (
    <motion.section
      {...sectionReveal}
      className="relative min-h-screen flex items-center justify-center px-6 text-center overflow-hidden z-10"
      style={{
        background:
          'radial-gradient(circle at center, rgba(232,201,126,0.2), rgba(26,10,14,0.94) 55%, rgba(26,10,14,1) 100%)',
      }}
    >
      <FloatingPetals count={26} className="absolute inset-0" />
      <motion.div
        className="relative max-w-3xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.3 }}
      >
        <p className="text-3xl sm:text-5xl italic" style={{ color: COLORS.cream, fontFamily: 'Cormorant Garamond, serif' }}>
          You deserve the world.
          <br />
          I&apos;m trying to give it to you.
        </p>
        <p className="mt-8 text-4xl" style={{ color: COLORS.petalPink, fontFamily: 'Dancing Script, cursive' }}>
          Happy Women&apos;s Day, my love. 🌹
        </p>
        <p className="mt-6 text-2xl" style={{ color: COLORS.roseGold, fontFamily: 'Jost, sans-serif' }}>
          — Always yours, {YOUR_NAME} 💕
        </p>
      </motion.div>
    </motion.section>
  );
}

export default function SpecialDay() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = true;
    audio.volume = 0.55;
    audio.play().catch(() => {
      // Autoplay can be blocked until first gesture.
    });
  }, []);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => {
        // Some browsers still block until user interacts again.
      });
    }
    const nextMuted = !audio.muted;
    audio.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{
        backgroundColor: COLORS.bgPage,
        color: COLORS.cream,
        fontFamily: 'Jost, sans-serif',
      }}
    >
      <audio ref={audioRef} src={loveSong} loop />
      <button
        onClick={toggleMute}
        className="fixed left-4 top-4 z-[70] rounded-full border px-4 py-2 text-sm backdrop-blur-md"
        style={{
          borderColor: 'rgba(232,201,126,0.45)',
          backgroundColor: 'rgba(45,15,26,0.72)',
          color: COLORS.cream,
          fontFamily: 'Jost, sans-serif',
        }}
        aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
      >
        {isMuted ? '🔇 Unmute' : '🔊 Mute'}
      </button>
      <FloatingPetals />
      <div className="relative z-10">
        <HeroSection />
        <LetterSection />
        <YouAreSection />
        <ReasonsSection />
        <PhotoSection />
        <PromisesSection />
        <ClosingSection />
      </div>
      <div className="sr-only">Special Women&apos;s Day page for {HER_NAME} from {YOUR_NAME}.</div>
    </div>
  );
}
