import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Projects from '../components/Projects'
import TechStack from '../components/TechStack'
import Contact from '../components/Contact'

function MainHome() {
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
