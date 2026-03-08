import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { VolumeX, Video, Volume } from 'lucide-react';
import nalathPhoto from '@/lib/pics/nalath.jpeg';
import perfectSong from '@/lib/audio/Ellie Goulding - Love Me Like You Do (Official Video).mp3';
import world from '@/lib/pics/world.jpeg';

const GOOGLE_MEET_LINK = 'https://meet.google.com/bzi-dnbh-hmn';
const MEET_SETTINGS_LINK = 'https://meet.google.com/settings';
const MOVIE_TITLE = 'How to Train Your Dragon The Hidden World';
const YOUR_NAME = 'Luicha';
const HER_NAME = 'Chinnu';
const DURATION = '2h 30m';
const CUSTOM_MESSAGE = "Can't wait to watch this with you, my chinnu mwoleee! 💕";
const TARGET_TIME_ISO = ''; // Optional override, e.g. '2026-03-04T20:00:00+05:30'

const pad = (n: number) => String(n).padStart(2, '0');
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

const getShowTime = () => {
  const configured = new Date(TARGET_TIME_ISO);
  if (!Number.isNaN(configured.getTime())) return configured;
  const fallback = new Date();
  fallback.setHours(2, 0, 0, 0); // Today at 8:00 PM local time
  if (fallback.getTime() < Date.now()) fallback.setDate(fallback.getDate() + 1);
  return fallback;
};

const FilmStrip = () => (
  <div className="flex w-full h-8 bg-[#111111] border-y border-[#D4AF37]/20 px-2">
    {Array.from({ length: 20 }).map((_, i) => (
      <div key={i} className="flex-1 flex items-center justify-center">
        <div className="w-3 h-5 bg-[#1C0A08] rounded-[2px] border border-[#D4AF37]/25" />
      </div>
    ))}
  </div>
);

const Barcode = () => (
  <div className="flex gap-[2px] h-14 items-end mt-3">
    {Array.from({ length: 34 }).map((_, i) => {
      const thick = i % 5 === 0 || i % 7 === 0;
      const tall = i % 3 === 0 || i % 4 === 0;
      return (
        <div
          key={i}
          className="bg-[#F5F5F5]"
          style={{ width: thick ? '3px' : '2px', height: tall ? '95%' : '70%' }}
        />
      );
    })}
  </div>
);

const CountdownDigit = ({ value }: { value: string }) => (
  <AnimatePresence mode="wait">
    <motion.span
      key={value}
      initial={{ rotateX: -90, opacity: 0 }}
      animate={{ rotateX: 0, opacity: 1 }}
      exit={{ rotateX: 90, opacity: 0 }}
      transition={{ duration: 0.25 }}
      style={{ display: 'inline-block', transformOrigin: 'center' }}
      className="inline-flex w-14 justify-center rounded-md border border-[#D4AF37]/35 bg-black/50 px-2 py-1 text-[#FFD700]"
    >
      {value}
    </motion.span>
  </AnimatePresence>
);

export default function Cinema() {
  const [showtime] = useState<Date>(() => getShowTime());
  const [now, setNow] = useState(() => Date.now());
  const [joining, setJoining] = useState(false);
  const [stage, setStage] = useState('');
  const [musicOn, setMusicOn] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [audioBlocked, setAudioBlocked] = useState(false);
  const [dimming, setDimming] = useState(false);
  const [tick, setTick] = useState(false);
  const [showSecretMessage, setShowSecretMessage] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const i = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!audioRef.current) return;
      // Chrome mobile often blocks unmuted autoplay on production deployments.
      // Start muted first, then allow user to unmute.
      audioRef.current.muted = true;
      setIsMuted(true);
      audioRef.current.play()
        .then(() => {
          setMusicOn(true);
          setAudioBlocked(false);
        })
        .catch((err) => {
          console.error('Error auto-playing audio:', err);
          setAudioBlocked(true);
        });
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!audioBlocked) return;
    const resumeOnFirstGesture = () => {
      if (!audioRef.current) return;
      audioRef.current.play()
        .then(() => {
          setMusicOn(true);
          setAudioBlocked(false);
          window.removeEventListener('pointerdown', resumeOnFirstGesture);
        })
        .catch((err) => console.error('Gesture audio start failed:', err));
    };
    window.addEventListener('pointerdown', resumeOnFirstGesture, { passive: true });
    return () => window.removeEventListener('pointerdown', resumeOnFirstGesture);
  }, [audioBlocked]);

  useEffect(() => {
    const timer = setTimeout(() => setShowSecretMessage(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  const remaining = Math.max(showtime.getTime() - now, 0);
  const hours = Math.floor(remaining / (1000 * 60 * 60));
  const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

  useEffect(() => {
    const immediateId = setTimeout(() => setTick(true), 0);
    const resetId = setTimeout(() => setTick(false), 220);
    return () => {
      clearTimeout(immediateId);
      clearTimeout(resetId);
    };
  }, [hours, minutes, seconds]);

  const showTimeLabel = useMemo(
    () =>
      showtime.toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }) + ' IST',
    [showtime],
  );

  const handleJoin = async () => {
    if (joining) return;
    if (!GOOGLE_MEET_LINK) {
      alert('Google Meet link not configured.');
      return;
    }
    setJoining(true);
    confetti({
      particleCount: 140,
      spread: 80,
      colors: ['#D4AF37', '#8B0000', '#FFD700', '#F5F5F5'],
      origin: { y: 0.6 },
    });
    setStage('Preparing the theater... 🎬');
    await wait(700);
    setStage('Getting your seat ready... 🪑');
    await wait(700);
    setStage('Starting movie... 🎞️');
    await wait(700);
    setDimming(true);
    await wait(1200);
    window.open(GOOGLE_MEET_LINK, '_blank', 'noopener,noreferrer');
    setStage('Starting our movie date! 🎉');
    await wait(700);
    setDimming(false);
    await wait(900);
    setStage('');
    setJoining(false);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const nextMuted = !isMuted;
    audioRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5] relative overflow-hidden">
      <audio ref={audioRef} src={perfectSong} loop crossOrigin="anonymous" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(139,0,0,0.22),transparent_45%),radial-gradient(circle_at_90%_20%,rgba(212,175,55,0.14),transparent_40%)]" />
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(transparent_50%,rgba(255,255,255,0.03)_51%)] bg-[length:100%_4px]" />

      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl pointer-events-none select-none"
          style={{ left: `${6 + i * 9}%`, bottom: '-50px' }}
          animate={{ y: '-110vh', opacity: [0, 1, 1, 0] }}
          transition={{ duration: 8 + (i % 4), repeat: Infinity, delay: i * 0.6, ease: 'linear' }}
        >
          🍿
        </motion.div>
      ))}

      <motion.div
        className="fixed inset-y-0 left-0 w-1/2 bg-[#8B0000] origin-left z-40"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 1.8, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
      />
      <motion.div
        className="fixed inset-y-0 right-0 w-1/2 bg-[#8B0000] origin-right z-40"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 1.8, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
      />

      <AnimatePresence>
        {dimming && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-30 pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="relative z-20 mx-auto max-w-6xl px-4 py-8 md:py-14">
        <motion.div
          initial={{ opacity: 0, y: 80, rotateX: 15 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 2 }}
          style={{ perspective: '1000px' }}
          className="flex flex-col md:flex-row"
        >
          <div className="relative flex-1 rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none border border-[#D4AF37]/40 bg-[#1C0A08] shadow-[0_0_60px_rgba(139,0,0,0.45)] overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
              <span className="font-['Bebas_Neue'] text-[8rem] text-[#D4AF37]/5 rotate-[-28deg] whitespace-nowrap">ADMIT ONE</span>
            </div>
            <FilmStrip />
            <div className="relative p-5 md:p-8">
              <div className="flex items-center justify-between font-['Bebas_Neue'] tracking-[0.08em] text-[#D4AF37] text-xl">
                <span>ADMIT ONE 🎟️</span>
                <span className="font-['Courier_Prime'] text-sm text-[#F5F5F5]/80">TICKET #001</span>
              </div>
              <div className="h-px bg-[#D4AF37]/30 my-3" />

              <p className="font-['Bebas_Neue'] text-[#D4AF37] tracking-[0.22em]">ROMANTIC PREMIERE</p>
              <h1 className="mt-2 font-['Cinzel_Decorative'] text-2xl md:text-4xl text-[#F5F5F5]">
                🎬 Movie Night with {HER_NAME} 🎬
              </h1>
              <p className="mt-1 font-['Playfair_Display'] text-[#D4AF37] text-lg">{YOUR_NAME} & {HER_NAME}'s Movie Night</p>

              <div className="mt-6 text-center">
                <p className="font-['Bebas_Neue'] tracking-[0.2em] text-[#D4AF37]">NOW SHOWING</p>
                <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-[#F5F5F5]">{MOVIE_TITLE}</h2>
              </div>

              <p className="mt-5 text-center font-['Lora'] italic text-[#F5F5F5]/90">{CUSTOM_MESSAGE}</p>

              <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-[#F5F5F5]/85">
                <span>🍿 Tonight at {showTimeLabel}</span>
                <span>Duration: {DURATION}</span>
              </div>

              <div className="mt-6 text-center">
                {remaining > 0 ? (
                  <motion.div
                    className="font-['Orbitron'] w-full flex flex-col items-center gap-2 text-lg"
                    animate={tick ? { scale: [1, 1.025, 1] } : { scale: 1 }}
                    transition={{ duration: 0.22 }}
                  >
                    <span className="text-[#D4AF37] text-center">⏰ Movie starts in:</span>
                    <div className="grid grid-cols-3 gap-2 md:gap-3">
                      <div className="flex flex-col items-center gap-1">
                        <CountdownDigit value={pad(hours)} />
                        <span className="text-[#D4AF37] text-xs md:text-sm">hours</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <CountdownDigit value={pad(minutes)} />
                        <span className="text-[#D4AF37] text-xs md:text-sm">minutes</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <CountdownDigit value={pad(seconds)} />
                        <span className="text-[#D4AF37] text-xs md:text-sm">seconds</span>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <p className="font-['Orbitron'] text-[#FFD700] text-xl">Movie Time! Join Now 🎬</p>
                )}
              </div>

              <div className="mt-7 flex flex-col items-center gap-3">
                <motion.button
                  onClick={handleJoin}
                  disabled={joining}
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(212,175,55,0.3)',
                      '0 0 50px rgba(212,175,55,0.7)',
                      '0 0 20px rgba(212,175,55,0.3)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="rounded-xl border border-[#FFD700]/70 bg-[#C0392B] px-6 py-3 font-['Bebas_Neue'] tracking-[0.08em] text-xl text-[#F5F5F5] disabled:opacity-70"
                >
                  {joining ? 'PREPARING MOVIE DATE...' : remaining <= 0 ? 'Join Now - Movie Time! 🎬' : "🎬 LET'S WATCH TOGETHER 🎬"}
                </motion.button>

                <div className="flex flex-wrap items-center justify-center gap-2">
                  <button
                    onClick={() => window.open(MEET_SETTINGS_LINK, '_blank', 'noopener,noreferrer')}
                    className="rounded-lg border border-[#D4AF37]/45 bg-black/35 px-4 py-2 text-sm text-[#D4AF37] hover:bg-black/60"
                  >
                    <span className="inline-flex items-center gap-2"><Video className="h-4 w-4" /> Test Audio/Video</span>
                  </button>
                  <button
                    onClick={toggleMute}
                    disabled={!musicOn}
                    className="rounded-lg border border-[#D4AF37]/45 bg-black/35 px-4 py-2 text-sm text-[#D4AF37] hover:bg-black/60"
                  >
                    <span className="inline-flex items-center gap-2">
                      {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume className="h-4 w-4" />}
                      {isMuted ? 'Click to play music' : 'Mute'}
                    </span>
                  </button>
                </div>
                {audioBlocked && (
                  <p className="text-xs text-[#D4AF37]/85 text-center">
                    Tap anywhere once to enable background music in Chrome.
                  </p>
                )}
                <AnimatePresence>
                  {stage && (
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-sm text-[#F5F5F5]/90"
                    >
                      {stage}
                    </motion.p>
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {showSecretMessage && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8 }}
                      className="text-center text-sm md:text-base text-[#F5F5F5]/85 font-['Lora'] italic"
                    >
                      Remember: It&apos;s not about the movie...
                      <br />
                      it&apos;s about watching it with you 💕
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <FilmStrip />
          </div>

          <div className="hidden md:flex flex-col items-center justify-center py-2">
            <div className="w-6 h-6 rounded-full bg-[#0A0A0A] -ml-3 border border-[#D4AF37]/20" />
            <div className="h-36 border-l-2 border-dashed border-[#D4AF37]/30 my-1" />
            <span className="text-[#D4AF37]/50 text-xs rotate-90">✂️</span>
            <div className="h-36 border-l-2 border-dashed border-[#D4AF37]/30 my-1" />
            <div className="w-6 h-6 rounded-full bg-[#0A0A0A] -ml-3 border border-[#D4AF37]/20" />
          </div>

          <div className="md:hidden relative h-6 border-x border-[#D4AF37]/35 bg-[#150605]">
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t-2 border-dashed border-[#D4AF37]/30" />
            <span className="absolute left-1/2 -translate-x-1/2 top-0 text-[#D4AF37]/50 text-xs">✂️</span>
            <div className="absolute -top-3 left-8 w-6 h-6 rounded-full bg-[#0A0A0A]" />
            <div className="absolute -top-3 right-8 w-6 h-6 rounded-full bg-[#0A0A0A]" />
          </div>

          <aside className="w-full md:w-56 rounded-b-3xl md:rounded-r-3xl md:rounded-bl-none border border-[#D4AF37]/40 bg-[#150605] p-4 shadow-[0_0_50px_rgba(212,175,55,0.15)]">
            <p className="font-['Bebas_Neue'] text-[#D4AF37] tracking-[0.12em] text-center">STUB</p>
            <div className="mt-3 text-center space-y-1">
              <p className="font-['Bebas_Neue'] text-[#F5F5F5]">SEAT A1</p>
              <p className="font-['Bebas_Neue'] text-[#F5F5F5]/80">ROW 1</p>
              <p className="font-['Bebas_Neue'] text-[#D4AF37] mt-2">TONIGHT</p>
              <p className="font-['Orbitron'] text-[#F5F5F5]">{showTimeLabel.replace(' IST', '')}</p>
              <p className="font-['Bebas_Neue'] text-[#F5F5F5]/80">{DURATION}</p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <img src={world} alt={YOUR_NAME} className="h-20 w-full rounded-md object-cover border border-[#D4AF37]/35" />
              <img src={nalathPhoto} alt={HER_NAME} className="h-20 w-full rounded-md object-cover border border-[#D4AF37]/35" />
            </div>

            <div className="mt-4 border-t border-[#D4AF37]/25 pt-3">
              <Barcode />
              <p className="mt-2 text-center font-['Courier_Prime'] text-xs text-[#F5F5F5]/70">LCHN-CHRL-1100PM</p>
              <p className="mt-2 text-center font-['Bebas_Neue'] text-[#D4AF37] tracking-[0.08em]">🎟️ KEEP THIS STUB</p>
            </div>
          </aside>
        </motion.div>
      </div>
    </div>
  );
}
