import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Projects from '../components/Projects'
import TechStack from '../components/TechStack'
import Contact from '../components/Contact'
import useStore from '../store/useStore'

function MainHome() {
  const navigate = useNavigate();
  const { isLoading, fetchData } = useStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Shortcut: Ctrl + Shift + [Key from .env]
      const shortcutKey = (import.meta.env.VITE_ADMIN_SHORTCUT_KEY || 'a').toLowerCase();
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === shortcutKey) {
        e.preventDefault();
        navigate('/admin');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg-main flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-emerald-modern border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-bg-main min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <TechStack />
      <Contact />

      {/* Footer minimal */}
      <footer className="py-10 text-center bg-bg-alt border-t border-white/5 relative group">
        <p className="text-[10px] font-bold opacity-30 uppercase tracking-[0.5em]">
          Dirancang untuk Keunggulan • 2026
        </p>
        <a
          href="/admin"
          className="absolute bottom-2 right-4 text-[8px] opacity-0 group-hover:opacity-20 hover:opacity-100 transition-opacity uppercase tracking-widest"
        >
          Admin Login
        </a>
      </footer>
    </div>
  )
}

export default MainHome
