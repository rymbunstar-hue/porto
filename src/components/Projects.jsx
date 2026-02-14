import React from 'react';
import { motion } from 'framer-motion';
import useStore from '../store/useStore';

const Projects = () => {
  const { projects } = useStore();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="projects" className="py-32 bg-bg-alt">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-xl">
               <motion.div 
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 className="flex items-center gap-4 mb-4"
               >
                  <span className="w-10 h-[1px] bg-emerald-modern/30"></span>
                  <span className="text-[10px] font-black tracking-[0.4em] text-emerald-modern uppercase">Portofolio Pilihan</span>
               </motion.div>
               <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-none uppercase">
                  PROYEK <span className="text-emerald-modern text-glow">TERBARU.</span>
               </h2>
            </div>
            <p className="text-sm font-light opacity-40 max-w-[280px] leading-relaxed italic">
               Menjelajahi batas antara fungsi dan estetika dalam setiap baris kode yang saya tulis.
            </p>
        </div>

        <motion.div 
           variants={containerVariants}
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, margin: "-100px" }}
           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group relative"
            >
               {/* Background Glow */}
               <div className="absolute inset-0 bg-emerald-modern/20 blur-[30px] rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
               
               <div className="relative bg-bg-main/40 backdrop-blur-md border border-white/5 rounded-[2.5rem] overflow-hidden group-hover:border-emerald-modern/40 transition-all duration-500 shadow-premium h-full flex flex-col">
                  {/* Image Container */}
                  <div className="h-64 overflow-hidden relative">
                     <img 
                       src={project.img} 
                       alt={project.title} 
                       className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-bg-main/80 via-transparent to-transparent opacity-60"></div>
                     
                     {/* Tags */}
                     <div className="absolute bottom-6 left-6 flex gap-2 flex-wrap">
                        {project.tags.slice(0, 3).map(tag => (
                           <span key={tag} className="text-[8px] font-black px-4 py-1.5 bg-bg-main/80 backdrop-blur-md rounded-full border border-white/10 text-emerald-modern uppercase tracking-widest">{tag}</span>
                        ))}
                     </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex-1 flex flex-col">
                     <h3 className="text-xl font-black mb-3 tracking-tight group-hover:text-emerald-modern transition-colors duration-300 uppercase">{project.title}</h3>
                     <p className="text-sm leading-relaxed text-cream-soft/60 font-light mb-8 line-clamp-3 group-hover:text-cream-soft transition-colors tracking-wide">
                        {project.description}
                     </p>
                     
                     <div className="mt-auto">
                        <motion.button 
                           whileHover={{ x: 5 }}
                           className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-modern group/btn"
                        >
                           DETAILS PROJECT 
                           <span className="w-8 h-[1px] bg-emerald-modern transition-all group-hover/btn:w-12"></span>
                        </motion.button>
                     </div>
                  </div>
               </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
