import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Calendar, 
  MapPin, 
  Clock, 
  Music, 
  Camera, 
  Mail, 
  ChevronDown,
  Menu,
  X,
  Instagram,
  Facebook
} from 'lucide-react';
import { format, differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';
import { cn } from './lib/utils';

// --- Constants ---
const WEDDING_DATE = new Date('2026-06-20T14:00:00');
const COUPLE_NAMES = { groom: 'Alexander', bride: 'Sophia' };
const LOCATION = {
  ceremony: {
    name: 'St. Mary\'s Cathedral',
    address: '123 Grace Avenue, Garden City, NY',
    time: '2:00 PM',
    mapUrl: 'https://maps.google.com/maps?q=123%20Grace%20Avenue,%20Garden%20City,%20NY&t=&z=15&ie=UTF8&iwloc=&output=embed'
  },
  reception: {
    name: 'The Grand Ballroom',
    address: '456 Celebration Way, Garden City, NY',
    time: '6:00 PM',
    mapUrl: 'https://maps.google.com/maps?q=456%20Celebration%20Way,%20Garden%20City,%20NY&t=&z=15&ie=UTF8&iwloc=&output=embed'
  }
};

// --- Components ---

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      if (now >= WEDDING_DATE) {
        clearInterval(timer);
        return;
      }
      setTimeLeft({
        days: differenceInDays(WEDDING_DATE, now),
        hours: differenceInHours(WEDDING_DATE, now) % 24,
        minutes: differenceInMinutes(WEDDING_DATE, now) % 60,
        seconds: differenceInSeconds(WEDDING_DATE, now) % 60
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const items = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ];

  return (
    <div className="flex justify-center gap-4 md:gap-8">
      {items.map((item) => (
        <div key={item.label} className="text-center">
          <div className="text-3xl md:text-5xl font-serif text-gold-600 mb-1">
            {String(item.value).padStart(2, '0')}
          </div>
          <div className="text-[10px] md:text-xs uppercase tracking-widest text-stone-500">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
};

const SectionHeading = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="text-center mb-12">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex justify-center mb-4"
    >
      <Heart className="text-gold-400 w-6 h-6 fill-gold-400/20" />
    </motion.div>
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="text-4xl md:text-5xl font-serif text-stone-900 mb-4"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-stone-500 italic max-w-lg mx-auto"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

const RSVPForm = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => setStatus('success'), 1500);
  };

  if (status === 'success') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-12 bg-white rounded-3xl shadow-sm border border-gold-100"
      >
        <Heart className="w-12 h-12 text-gold-500 mx-auto mb-4 fill-gold-500/10" />
        <h3 className="text-2xl font-serif mb-2">Thank You!</h3>
        <p className="text-stone-500">Your response has been saved. We can't wait to celebrate with you!</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gold-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-stone-500 font-medium">Your Name</label>
          <input required type="text" className="w-full border-b border-stone-200 py-2 focus:border-gold-500 outline-none transition-colors" placeholder="Full Name" />
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-stone-500 font-medium">Email Address</label>
          <input required type="email" className="w-full border-b border-stone-200 py-2 focus:border-gold-500 outline-none transition-colors" placeholder="email@example.com" />
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-widest text-stone-500 font-medium">Will you attend?</label>
        <div className="flex gap-8 pt-2">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input type="radio" name="attendance" value="yes" className="accent-gold-500" required />
            <span className="text-stone-700 group-hover:text-gold-600 transition-colors">Yes, I'll be there</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer group">
            <input type="radio" name="attendance" value="no" className="accent-gold-500" />
            <span className="text-stone-700 group-hover:text-gold-600 transition-colors">Regretfully, no</span>
          </label>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs uppercase tracking-widest text-stone-500 font-medium">Number of Guests</label>
        <select className="w-full border-b border-stone-200 py-2 focus:border-gold-500 outline-none transition-colors bg-transparent">
          <option>1 Guest</option>
          <option>2 Guests</option>
          <option>3 Guests</option>
          <option>4 Guests</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-xs uppercase tracking-widest text-stone-500 font-medium">Dietary Requirements</label>
        <textarea className="w-full border-b border-stone-200 py-2 focus:border-gold-500 outline-none transition-colors resize-none" rows={2} placeholder="Any allergies or preferences?"></textarea>
      </div>

      <button 
        disabled={status === 'submitting'}
        type="submit" 
        className="w-full bg-stone-900 text-white py-4 rounded-full hover:bg-gold-700 transition-all duration-300 uppercase tracking-widest text-xs font-semibold disabled:opacity-50"
      >
        {status === 'submitting' ? 'Sending...' : 'Send RSVP'}
      </button>
    </form>
  );
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Our Story', href: '#story' },
    { label: 'Details', href: '#details' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'RSVP', href: '#rsvp' }
  ];

  return (
    <div className="min-h-screen selection:bg-gold-200 selection:text-gold-900">
      {/* Navigation */}
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4",
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-3" : "bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="#" className="text-2xl font-serif text-stone-900 tracking-tighter">
            S <span className="text-gold-500">&</span> A
          </a>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navItems.map(item => (
              <a 
                key={item.label} 
                href={item.href} 
                className="text-xs uppercase tracking-widest text-stone-600 hover:text-gold-600 transition-colors font-medium"
              >
                {item.label}
              </a>
            ))}
            <a 
              href="#rsvp" 
              className="bg-stone-900 text-white px-6 py-2.5 rounded-full text-xs uppercase tracking-widest hover:bg-gold-600 transition-all"
            >
              RSVP
            </a>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-stone-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-8 md:hidden"
          >
            <div className="flex flex-col gap-8 text-center">
              {navItems.map(item => (
                <a 
                  key={item.label} 
                  href={item.href} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-serif text-stone-800"
                >
                  {item.label}
                </a>
              ))}
              <a 
                href="#rsvp" 
                onClick={() => setMobileMenuOpen(false)}
                className="bg-stone-900 text-white py-4 rounded-full text-sm uppercase tracking-widest"
              >
                RSVP Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=2000" 
            alt="Wedding Background" 
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gold-50/50 via-transparent to-gold-50"></div>
        </div>

        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <p className="text-xs uppercase tracking-[0.4em] text-stone-500 mb-6 font-semibold">
              Save The Date
            </p>
            <h1 className="text-6xl md:text-9xl font-serif text-stone-900 mb-8 leading-tight">
              {COUPLE_NAMES.groom} <br className="md:hidden" />
              <span className="text-gold-500 italic md:mx-4">&</span> <br className="md:hidden" />
              {COUPLE_NAMES.bride}
            </h1>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 text-stone-600 mb-12">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gold-500" />
                <span className="text-sm tracking-widest uppercase">{format(WEDDING_DATE, 'MMMM dd, yyyy')}</span>
              </div>
              <div className="hidden md:block w-1 h-1 bg-gold-300 rounded-full"></div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold-500" />
                <span className="text-sm tracking-widest uppercase">Garden City, New York</span>
              </div>
            </div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="flex justify-center"
            >
              <ChevronDown className="text-gold-400 w-8 h-8" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="py-20 bg-white border-y border-gold-100">
        <div className="max-w-4xl mx-auto px-6">
          <CountdownTimer />
        </div>
      </section>

      {/* Our Story Section */}
      <section id="story" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeading 
            title="Our Story" 
            subtitle="A journey of love that began with a simple hello and grew into a lifetime of promises."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1000" 
                  alt="The Couple" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gold-200 rounded-3xl -z-10"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-3xl font-serif text-stone-900">How We Met</h3>
              <p className="text-stone-600 leading-relaxed">
                It was a rainy Tuesday in October when our paths first crossed at a small bookstore in the heart of the city. Alexander was looking for a rare edition of poetry, and Sophia happened to be reaching for the very same book.
              </p>
              <p className="text-stone-600 leading-relaxed">
                What started as a polite conversation about literature turned into a three-hour coffee date, and we both knew that afternoon that something special had begun.
              </p>
              <div className="pt-4">
                <div className="flex items-center gap-4 text-gold-600">
                  <Heart className="w-5 h-5 fill-gold-600/10" />
                  <span className="font-serif italic text-xl">"I have found the one whom my soul loves."</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section id="details" className="py-24 px-6 bg-gold-100/30">
        <div className="max-w-6xl mx-auto">
          <SectionHeading 
            title="Wedding Details" 
            subtitle="We can't wait to celebrate our special day with you. Here's everything you need to know."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Ceremony */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gold-100 text-center space-y-6 flex flex-col"
            >
              <div className="w-16 h-16 bg-gold-50 rounded-full flex items-center justify-center mx-auto">
                <Heart className="text-gold-500 w-8 h-8" />
              </div>
              <h3 className="text-3xl font-serif">The Ceremony</h3>
              <div className="space-y-2 text-stone-600 flex-grow">
                <p className="font-semibold text-stone-900">{LOCATION.ceremony.name}</p>
                <p>{LOCATION.ceremony.address}</p>
                <div className="flex items-center justify-center gap-2 pt-4">
                  <Clock className="w-4 h-4 text-gold-500" />
                  <span className="uppercase tracking-widest text-xs font-bold">{LOCATION.ceremony.time}</span>
                </div>
              </div>
              <div className="w-full h-48 md:h-64 rounded-2xl overflow-hidden mt-6">
                <iframe 
                  src={LOCATION.ceremony.mapUrl} 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </motion.div>

            {/* Reception */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gold-100 text-center space-y-6 flex flex-col"
            >
              <div className="w-16 h-16 bg-gold-50 rounded-full flex items-center justify-center mx-auto">
                <Music className="text-gold-500 w-8 h-8" />
              </div>
              <h3 className="text-3xl font-serif">The Reception</h3>
              <div className="space-y-2 text-stone-600 flex-grow">
                <p className="font-semibold text-stone-900">{LOCATION.reception.name}</p>
                <p>{LOCATION.reception.address}</p>
                <div className="flex items-center justify-center gap-2 pt-4">
                  <Clock className="w-4 h-4 text-gold-500" />
                  <span className="uppercase tracking-widest text-xs font-bold">{LOCATION.reception.time}</span>
                </div>
              </div>
              <div className="w-full h-48 md:h-64 rounded-2xl overflow-hidden mt-6">
                <iframe 
                  src={LOCATION.reception.mapUrl} 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading 
            title="Our Gallery" 
            subtitle="Capturing the moments that led us to this day."
          />

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {[
              'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800',
              'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800',
              'https://images.unsplash.com/photo-1522673607200-1648832cee98?auto=format&fit=crop&q=80&w=800',
              'https://images.unsplash.com/photo-1465495910483-0d6749ee997f?auto=format&fit=crop&q=80&w=800',
              'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800',
              'https://images.unsplash.com/photo-1510076857177-7470076d4098?auto=format&fit=crop&q=80&w=800'
            ].map((url, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative group cursor-pointer overflow-hidden rounded-2xl"
              >
                <img 
                  src={url} 
                  alt={`Gallery ${i}`} 
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gold-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera className="text-white w-8 h-8" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section id="rsvp" className="py-24 px-6 bg-gold-50">
        <div className="max-w-4xl mx-auto">
          <SectionHeading 
            title="RSVP" 
            subtitle="Please kindly respond by May 20, 2026. We look forward to celebrating with you!"
          />
          <RSVPForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 bg-stone-900 text-white text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-4xl font-serif italic">
            {COUPLE_NAMES.groom} <span className="text-gold-500">&</span> {COUPLE_NAMES.bride}
          </div>
          <div className="flex justify-center gap-6">
            <a href="#" className="hover:text-gold-400 transition-colors"><Instagram /></a>
            <a href="#" className="hover:text-gold-400 transition-colors"><Facebook /></a>
            <a href="#" className="hover:text-gold-400 transition-colors"><Mail /></a>
          </div>
          <p className="text-stone-500 text-xs uppercase tracking-widest">
            Made with love for our special day
          </p>
          <div className="pt-8 border-t border-stone-800 text-stone-600 text-[10px] uppercase tracking-[0.3em]">
            © 2026 Alexander & Sophia. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
