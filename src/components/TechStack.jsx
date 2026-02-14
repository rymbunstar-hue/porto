import React from 'react';
import { motion } from 'framer-motion';
import useStore from '../store/useStore';
import { 
  Database, 
  Code2, 
  Palette, 
  Terminal, 
  Layout, 
  Settings, 
  Github, 
  Layers 
} from 'lucide-react';

const iconMap = {
  Database: <Database className="w-6 h-6" />,
  Code2: <Code2 className="w-6 h-6" />,
  Palette: <Palette className="w-6 h-6" />,
  Terminal: <Terminal className="w-6 h-6" />,
  Layout: <Layout className="w-6 h-6" />,
  Settings: <Settings className="w-6 h-6" />,
  Github: <Github className="w-6 h-6" />,
  Layers: <Layers className="w-6 h-6" />
};

const TechStack = () => {
  const { techStack } = useStore();

  return (
    <section id="skills" className="py-24 bg-bg-main relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(45,106,79,0.05)_0%,transparent_70%)] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
           <div className="max-w-xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-4 mb-4"
              >
                 <span className="w-10 h-[1px] bg-emerald-modern/30"></span>
                 <span className="text-[10px] font-black tracking-[0.4em] uppercase text-emerald-modern">
                    Keahlian Teknis
                 </span>
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none uppercase">
                 TEKNOLOGI <span className="text-emerald-modern text-glow">UTAMA.</span>
              </h2>
           </div>
           <p className="text-base font-light opacity-40 max-w-xs leading-relaxed italic border-l border-emerald-modern/20 pl-6">
              Memanfaatkan alat paling kuat di ekosistem web untuk membangun produk digital berperforma tinggi.
           </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
           {techStack.map((stack, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group relative"
              >
                 <div className="absolute inset-0 bg-emerald-modern/20 blur-xl rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                 <div className="relative bg-bg-alt/50 backdrop-blur-sm border border-white/5 p-8 rounded-[2.5rem] group-hover:border-emerald-modern/30 transition-all duration-500 shadow-premium h-full">
                    <div className="w-14 h-14 rounded-2xl bg-bg-main flex items-center justify-center text-emerald-modern mb-8 group-hover:bg-emerald-modern group-hover:text-white transition-all duration-500 group-hover:rotate-12">
                       {iconMap[stack.icon] || <Terminal className="w-6 h-6" />}
                    </div>
                    <h4 className="text-xl font-black tracking-tight mb-2 group-hover:text-emerald-modern transition-colors">{stack.name}</h4>
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-cream-soft opacity-30 group-hover:opacity-70 transition-opacity">
                       {stack.desc}
                    </p>
                 </div>
              </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
