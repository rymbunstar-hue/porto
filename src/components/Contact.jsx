import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useStore from '../store/useStore';

const Contact = () => {
   const { profile } = useStore();
   const formRef = useRef();
   const [isSending, setIsSending] = useState(false);

   const sendEmail = (e) => {
      e.preventDefault();
      setIsSending(true);

      emailjs
         .sendForm(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            formRef.current,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
         )
         .then(
            (result) => {
               console.log('SUCCESS!', result.text);
               toast.success('Pesan terkirim dengan sukses!');
               formRef.current.reset();
               setIsSending(false);
            },
            (error) => {
               console.error('FAILED...', error);
               toast.error(`Gagal: ${error.text || 'Cek koneksi/konfigurasi'} ❌`);
               setIsSending(false);
            }
         );
   };

   return (
      <section id="contact" className="py-24 bg-bg-alt relative overflow-hidden">
         <ToastContainer theme="dark" />
         <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto bg-bg-main border border-white/5 rounded-[3rem] sm:rounded-[5rem] p-8 sm:p-12 md:p-20 shadow-premium relative overflow-hidden group">
               {/* Ambient Background Glows */}
               <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-emerald-modern/10 rounded-full blur-[120px] pointer-events-none group-hover:bg-emerald-modern/20 transition-colors duration-1000"></div>
               <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-emerald-modern/5 rounded-full blur-[100px] pointer-events-none"></div>

               <div className="relative z-10">
                  <div className="grid lg:grid-cols-2 gap-20 items-center">
                     <div>
                        <motion.div
                           initial={{ opacity: 0, y: 20 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           transition={{ duration: 0.8 }}
                           viewport={{ once: true }}
                        >
                           <span className="text-[10px] font-black tracking-[0.4em] uppercase text-emerald-modern block mb-8 flex items-center gap-4">
                              <span className="w-12 h-[1px] bg-emerald-modern/30"></span>
                              Tersedia untuk Kerjasama
                           </span>
                           <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-12 uppercase">
                              MARI KITA <br />
                              <span className="text-emerald-modern text-glow">BANGUN</span> <br />
                              HAL BESAR<span className="text-emerald-modern">.</span>
                           </h2>
                           <p className="text-lg text-cream-soft/50 font-light mb-12 leading-relaxed max-w-md">
                              Saya sedang mencari peluang kerja sama baru. Jika Anda memiliki pertanyaan atau sekadar ingin menyapa, saya akan berusaha membalas secepat mungkin!
                           </p>

                           <div className="space-y-6">
                              <a href={`mailto:${profile.email}`} className="group/mail block w-fit">
                                 <span className="text-[10px] font-bold text-emerald-modern/50 uppercase tracking-widest block mb-2">Email Langsung</span>
                                 <span className="text-2xl md:text-3xl font-black tracking-tighter border-b-2 border-emerald-modern/10 pb-2 group-hover/mail:border-emerald-modern group-hover/mail:text-emerald-modern transition-all duration-500 block">
                                    {profile.email}
                                 </span>
                              </a>
                           </div>
                        </motion.div>
                     </div>

                     <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="bg-bg-alt/40 backdrop-blur-xl p-8 sm:p-12 rounded-[3rem] border border-white/10 shadow-2xl"
                     >
                        <form ref={formRef} onSubmit={sendEmail} className="space-y-8">
                           <div className="space-y-3 group/field">
                              <label className="text-[10px] font-black uppercase tracking-widest text-emerald-modern/40 group-focus-within/field:text-emerald-modern transition-colors ml-2">Nama Lengkap</label>
                              <input
                                 name="from_name"
                                 type="text"
                                 required
                                 className="w-full bg-bg-main/30 border border-white/5 rounded-2xl px-6 py-5 focus:outline-none focus:border-emerald-modern/50 focus:bg-bg-main/60 transition-all placeholder:text-white/5 text-cream-soft"
                                 placeholder="John Doe"
                              />
                           </div>
                           <div className="space-y-3 group/field">
                              <label className="text-[10px] font-black uppercase tracking-widest text-emerald-modern/40 group-focus-within/field:text-emerald-modern transition-colors ml-2">Alamat Email</label>
                              <input
                                 name="reply_to"
                                 type="email"
                                 required
                                 className="w-full bg-bg-main/30 border border-white/5 rounded-2xl px-6 py-5 focus:outline-none focus:border-emerald-modern/50 focus:bg-bg-main/60 transition-all placeholder:text-white/5 text-cream-soft"
                                 placeholder="john@example.com"
                              />
                           </div>
                           <div className="space-y-3 group/field">
                              <label className="text-[10px] font-black uppercase tracking-widest text-emerald-modern/40 group-focus-within/field:text-emerald-modern transition-colors ml-2">Detail Proyek</label>
                              <textarea
                                 name="message"
                                 rows="4"
                                 required
                                 className="w-full bg-bg-main/30 border border-white/5 rounded-2xl px-6 py-5 focus:outline-none focus:border-emerald-modern/50 focus:bg-bg-main/60 transition-all placeholder:text-white/5 text-cream-soft resize-none"
                                 placeholder="Ceritakan tentang visi Anda..."
                              ></textarea>
                           </div>
                           <motion.button
                              type="submit"
                              disabled={isSending}
                              whileHover={{ scale: 1.02, backgroundColor: "#40916C" }}
                              whileTap={{ scale: 0.98 }}
                              className={`w-full py-6 bg-emerald-modern text-white rounded-2xl font-black tracking-[0.2em] text-[10px] uppercase transition-all shadow-2xl shadow-emerald-modern/30 mt-4 relative overflow-hidden group/btn ${isSending ? 'opacity-50 cursor-not-allowed' : ''}`}
                           >
                              <span className="relative z-10">{isSending ? 'MENGIRIM...' : 'KIRIM PESAN SEKARANG'}</span>
                              <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover/btn:translate-x-0 transition-transform duration-500"></div>
                           </motion.button>
                        </form>
                     </motion.div>
                  </div>

                  <div className="mt-24 pt-12 border-t border-white/5 flex flex-wrap justify-between items-center gap-10">
                     <div className="flex gap-10">
                        {Object.entries(profile.socials).map(([social, link], i) => (
                           <motion.a
                              key={social}
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              initial={{ opacity: 0.3 }}
                              whileHover={{ opacity: 1, y: -2, color: "#2D6A4F" }}
                              className="text-[10px] font-black tracking-widest uppercase transition-all"
                           >
                              {social}
                           </motion.a>
                        ))}
                     </div>
                     <div className="text-[10px] font-bold text-cream-soft/20 uppercase tracking-[0.4em] flex items-center gap-4">
                        <span className="w-8 h-[1px] bg-white/5"></span>
                        © 2026 RYMBUN ANARLIANSYAH — BUILD WITH PRIDE
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default Contact;
