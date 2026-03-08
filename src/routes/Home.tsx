import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const pages = [
  {
    to: '/cinema',
    title: 'Cinema Night',
    description: 'Movie ticket style invite with countdown and date vibe.',
    accent: 'from-[#D4AF37] to-[#8B0000]',
  },
  {
    to: '/sorry',
    title: 'Sorry Page',
    description: 'Heartfelt apology page with romantic interactions.',
    accent: 'from-[#ff69b4] to-[#da70d6]',
  },
  {
    to: '/special-day',
    title: "Women's Day Special",
    description: 'Handcrafted love-letter experience with petals and music.',
    accent: 'from-[#C9847A] to-[#8B1A35]',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#12080C] text-[#FDF6EC] px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-6xl text-center italic"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          Choose a Page
        </motion.h1>
        <p className="mt-4 text-center text-[#F7C5D0]" style={{ fontFamily: 'Jost, sans-serif' }}>
          Pick where you want to go.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {pages.map((page, index) => (
            <motion.div
              key={page.to}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm"
            >
              <div className={`h-1.5 w-full rounded-full bg-gradient-to-r ${page.accent}`} />
              <h2 className="mt-5 text-2xl" style={{ fontFamily: 'Playfair Display, serif' }}>
                {page.title}
              </h2>
              <p className="mt-3 text-sm text-[#FDF6EC]/80 min-h-12" style={{ fontFamily: 'Jost, sans-serif' }}>
                {page.description}
              </p>
              <Link
                to={page.to}
                className="mt-6 inline-flex rounded-full border border-[#E8C97E]/45 px-4 py-2 text-sm hover:bg-[#E8C97E]/15 transition"
              >
                Open Route
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}