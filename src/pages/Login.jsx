import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Lock, User, ArrowRight } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import useStore from '../store/useStore';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const login = useStore((state) => state.login);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const success = login(username, password);
        if (success) {
            toast.success('Login Berhasil! Selamat Datang.');
            setTimeout(() => navigate('/admin'), 1500);
        } else {
            toast.error('Username atau Password salah! ❌');
        }
    };

    return (
        <div className="min-h-screen bg-bg-main flex items-center justify-center p-6 relative overflow-hidden">
            <ToastContainer theme="dark" />

            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-modern/10 rounded-full blur-[120px] -mr-64 -mt-64"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-modern/5 rounded-full blur-[100px] -ml-48 -mb-48"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="bg-bg-alt/50 backdrop-blur-2xl border border-white/5 p-12 rounded-[4rem] shadow-premium">
                    <div className="text-center mb-12">
                        <div className="w-20 h-20 bg-emerald-modern/20 rounded-3xl flex items-center justify-center text-emerald-modern mx-auto mb-6">
                            <Lock size={32} />
                        </div>
                        <h1 className="text-3xl font-black uppercase tracking-tighter">Admin Panel</h1>
                        <p className="text-xs text-cream-soft/30 uppercase tracking-[0.4em] mt-3">Identity Access Management</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-3 group/field">
                            <label className="text-[10px] font-black uppercase tracking-widest text-emerald-modern/50 ml-2">Username</label>
                            <div className="relative">
                                <User className="absolute left-6 top-1/2 -translate-y-1/2 text-cream-soft/20 group-focus-within/field:text-emerald-modern transition-colors" size={18} />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full bg-bg-main/30 border border-white/5 rounded-2xl pl-16 pr-6 py-5 focus:border-emerald-modern/50 transition-all outline-none text-sm"
                                    placeholder="Masukkan username"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-3 group/field">
                            <label className="text-[10px] font-black uppercase tracking-widest text-emerald-modern/50 ml-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-cream-soft/20 group-focus-within/field:text-emerald-modern transition-colors" size={18} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-bg-main/30 border border-white/5 rounded-2xl pl-16 pr-6 py-5 focus:border-emerald-modern/50 transition-all outline-none text-sm"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full bg-emerald-modern text-white py-6 rounded-3xl font-black tracking-widest uppercase flex items-center justify-center gap-4 shadow-xl shadow-emerald-modern/20 group/btn mt-4"
                        >
                            MASUK SEKARANG
                            <ArrowRight size={18} className="group-hover/btn:translate-x-2 transition-transform" />
                        </motion.button>
                    </form>

                    <div className="mt-12 text-center">
                        <a href="/" className="text-[10px] font-bold text-cream-soft/20 uppercase tracking-widest hover:text-white transition-colors">
                            Kembali ke Beranda
                        </a>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
