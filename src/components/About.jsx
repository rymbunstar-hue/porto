import React from 'react';
import { motion } from 'framer-motion';
import useStore from '../store/useStore';

const About = () => {
  const { profile } = useStore();

  return (
    <section id="about" className="py-24 bg-bg-main overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1, ease: "easeOut" }}
           viewport={{ once: true }}
           className="bg-cream-soft text-bg-main p-8 sm:p-12 md:p-20 rounded-[2rem] sm:rounded-[3.5rem] shadow-premium relative overflow-hidden"
        >
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-modern/5 rounded-full blur-[80px] -mr-32 -mt-32"></div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6 }}
             >
                <span className="text-[10px] font-black tracking-[0.4em] uppercase text-emerald-modern mb-6 block">
                   Cerita Saya
                </span>
                <h2 className="text-4xl md:text-6xl font-black mb-10 leading-[1.1] tracking-tighter uppercase">
                   MERANCANG <span className="text-emerald-modern text-glow">KODE</span>,<br />MEMBENTUK <span className="italic font-serif">IDENTITAS.</span>
                </h2>
             </motion.div>
             
             <div className="space-y-6 text-lg md:text-xl font-medium tracking-tight leading-relaxed opacity-80 max-w-3xl mx-auto">
                <p>
                   {profile.description}
                </p>
             </div>
             
             <div className="mt-16 flex flex-wrap justify-center gap-12 md:gap-24 border-t border-bg-main/5 pt-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center"
                >
                   <div className="text-5xl font-black text-emerald-modern tracking-tighter">05+</div>
                   <div className="text-[10px] font-bold tracking-widest opacity-40 uppercase mt-2">Tahun Pengalaman</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-center"
                >
                   <div className="text-5xl font-black text-emerald-modern tracking-tighter">50+</div>
                   <div className="text-[10px] font-bold tracking-widest opacity-40 uppercase mt-2">Klien Puas</div>
                </motion.div>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
