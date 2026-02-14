import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'Beranda', id: 'home' },
    { name: 'Tentang', id: 'about' },
    { name: 'Proyek', id: 'projects' },
    { name: 'Keahlian', id: 'skills' },
    { name: 'Kontak', id: 'contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled || isOpen ? 'bg-bg-main/95 backdrop-blur-xl py-4 border-b border-white/5' : 'bg-transparent py-6'
      }`}
    >
      {/* Scroll Progress Bar */}
      <motion.div 
        className="absolute bottom-0 left-0 h-[2px] bg-emerald-modern z-50"
        style={{ width: `${scrollProgress}%` }}
      />
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="text-xl md:text-2xl font-black tracking-tighter">
          DEV<span className="text-emerald-modern">.</span>
        </a>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-12">
          {menuItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="text-[13px] uppercase tracking-widest font-semibold hover:text-emerald-modern transition-colors duration-300"
            >
              {item.name}
            </a>
          ))}
          <a
            href="#contact"
            className="px-6 py-2 border border-emerald-modern text-emerald-modern rounded-full text-[13px] font-bold hover:bg-emerald-modern hover:text-white transition-all duration-300"
          >
            HUBUNGI SAYA
          </a>
        </div>

        {/* Hamburger Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-cream-soft p-2"
        >
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        className="md:hidden overflow-hidden bg-bg-main/98 backdrop-blur-2xl"
      >
        <div className="flex flex-col p-8 space-y-6">
          {menuItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setIsOpen(false)}
              className="text-2xl font-black uppercase tracking-tighter text-cream-soft hover:text-emerald-modern transition-colors"
            >
              {item.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="w-full py-4 bg-emerald-modern text-white rounded-2xl font-black tracking-[0.2em] text-[10px] uppercase text-center shadow-2xl shadow-emerald-modern/30"
          >
            HUBUNGI SAYA
          </a>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
