import React from 'react';
import { motion } from 'framer-motion';
import useStore from '../store/useStore';
import fotoProfil from '../assets/foto.png';

const Hero = () => {
  const { profile } = useStore();

  const nameVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
  };

  const name = profile.name.toUpperCase().split(" ");

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-emerald-modern/10 rounded-full blur-[140px] animate-pulse-slow pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-emerald-hover/5 rounded-full blur-[120px] animate-pulse-slow pointer-events-none" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-[20%] left-[10%] w-2 h-2 bg-emerald-modern rounded-full animate-ping opacity-20"></div>
      <div className="absolute bottom-[30%] right-[15%] w-3 h-3 bg-emerald-hover rounded-full animate-ping opacity-10" style={{ animationDelay: '1.5s' }}></div>

      <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="order-2 md:order-1"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="w-8 h-[1px] bg-emerald-modern/50"></span>
            <span className="text-emerald-modern text-[10px] font-bold tracking-[0.3em] uppercase">
              TERSEDIA UNTUK PROYEK BARU
            </span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-[4rem] lg:text-[5rem] font-black mb-6 leading-none tracking-tighter uppercase">
            {name.map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={nameVariants}
                initial="hidden"
                animate="visible"
                className={`inline-block mr-4 ${i === 0 ? 'text-white' : 'text-emerald-modern'}`}
              >
                {word}
              </motion.span>
            ))}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-emerald-modern"
            >
              .
            </motion.span>
          </h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-xl md:text-2xl text-cream-soft/60 font-medium mb-8 flex items-center gap-4"
          >
            {profile.title}
            <span className="h-1 w-1 bg-emerald-modern rounded-full"></span>
            <span className="text-cream-soft/30 text-base italic font-light">{profile.location}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-base md:text-lg text-cream-soft/80 max-w-lg mb-12 leading-relaxed font-light"
          >
            {profile.description}
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <motion.a
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(45, 106, 79, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              href="#projects"
              className="px-10 py-5 bg-emerald-modern text-white rounded-full font-bold shadow-2xl transition-all duration-300 text-xs tracking-widest text-center relative overflow-hidden group"
            >
              <span className="relative z-10">LIHAT KARYA SAYA</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05, backgroundColor: "rgba(245, 230, 211, 1)", color: "#111111" }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="px-10 py-5 border border-cream-soft/20 text-cream-soft rounded-full font-bold transition-all duration-300 text-xs tracking-widest backdrop-blur-sm text-center"
            >
              HUBUNGI SAYA
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex justify-center order-1 md:order-2"
        >
          <div className="relative group max-w-[320px] w-full aspect-square animate-float">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-modern via-emerald-hover to-emerald-modern rounded-[60%_40%_30%_70%/60%_30%_70%_40%] animate-[spin_10s_linear_infinite] opacity-50 blur-sm group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute inset-[-20px] bg-emerald-modern/20 blur-[60px] rounded-full scale-110 opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative h-full w-full rounded-[60%_40%_30%_70%/60%_30%_70%_40%] overflow-hidden border-2 border-white/10 shadow-premium bg-bg-alt backdrop-blur-sm p-1">
              <div className="relative w-full h-full rounded-[inherit] overflow-hidden">
                <img
                  src={profile.profileImage || fotoProfil}
                  alt={profile.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-main/60 via-transparent to-transparent opacity-60"></div>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 bg-emerald-modern text-white text-[8px] font-black px-4 py-2 rounded-full shadow-xl shadow-emerald-modern/30 tracking-widest"
            >
              LEVEL UP
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-4 -left-4 bg-bg-alt/80 border border-white/10 backdrop-blur-md text-emerald-modern text-[8px] font-black px-4 py-2 rounded-full shadow-xl tracking-widest"
            >
              CREATIVE MIND
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
