import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  LayoutDashboard, 
  User, 
  Briefcase, 
  Cpu, 
  Save, 
  X, 
  LogOut,
  Image as ImageIcon,
  ExternalLink
} from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useStore from '../store/useStore';

const Dashboard = () => {
  const { profile, projects, techStack, updateProfile, addProject, updateProject, deleteProject } = useStore();
  const [activeTab, setActiveTab] = useState('projects');
  const [editingItem, setEditingItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tabs = [
    { id: 'profile', name: 'Profil', icon: <User size={20} /> },
    { id: 'projects', name: 'Proyek', icon: <Briefcase size={20} /> },
    { id: 'tech', name: 'Tech Stack', icon: <Cpu size={20} /> },
  ];

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    updateProfile(data);
    toast.success('Profil berhasil diperbarui!');
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    data.tags = data.tags.split(',').map(tag => tag.trim());
    
    if (editingItem !== null) {
      updateProject(editingItem, data);
      toast.info('Proyek diperbarui!');
    } else {
      addProject(data);
      toast.success('Proyek baru ditambahkan!');
    }
    closeModal();
  };

  const openModal = (index = null) => {
    setEditingItem(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingItem(null);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-bg-main text-cream-soft font-sans pb-20">
      <ToastContainer theme="dark" position="bottom-right" />
      
      {/* Sidebar Nav */}
      <nav className="fixed left-0 top-0 h-full w-20 md:w-64 bg-bg-alt border-r border-white/5 z-50 flex flex-col p-6">
        <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-emerald-modern rounded-xl flex items-center justify-center font-black">DA</div>
            <span className="hidden md:block text-xl font-black tracking-tighter uppercase">Admin Panel</span>
        </div>

        <div className="flex-1 space-y-2">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${
                        activeTab === tab.id 
                        ? 'bg-emerald-modern text-white shadow-lg shadow-emerald-modern/20' 
                        : 'hover:bg-white/5 text-cream-soft/40'
                    }`}
                >
                    {tab.icon}
                    <span className="hidden md:block font-bold text-sm uppercase tracking-widest">{tab.name}</span>
                </button>
            ))}
        </div>

        <button 
           onClick={() => window.location.href = '/'}
           className="flex items-center gap-4 p-4 hover:bg-red-500/10 text-red-400 rounded-2xl transition-all"
        >
            <LogOut size={20} />
            <span className="hidden md:block font-bold text-sm uppercase tracking-widest">Keluar</span>
        </button>
      </nav>

      {/* Main Content */}
      <main className="pl-24 md:pl-72 pr-6 pt-12">
        <header className="mb-12 flex justify-between items-end">
            <div>
                <h1 className="text-4xl font-black tracking-tighter uppercase mb-2">Kelola {tabs.find(t => t.id === activeTab).name}</h1>
                <p className="text-cream-soft/40 text-sm italic">Sesuaikan tampilan portofolio Anda secara real-time.</p>
            </div>
            {activeTab === 'projects' && (
                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openModal()}
                    className="bg-emerald-modern text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 text-xs tracking-widest"
                >
                    <Plus size={18} /> TAMBAH BARU
                </motion.button>
            )}
        </header>

        <AnimatePresence mode="wait">
            {activeTab === 'profile' && (
                <motion.div 
                    key="profile"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="max-w-3xl"
                >
                    <form onSubmit={handleSaveProfile} className="bg-bg-alt/50 backdrop-blur-xl border border-white/5 p-8 md:p-12 rounded-[3rem] space-y-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            <InputField label="Nama Lengkap" name="name" defaultValue={profile.name} />
                            <InputField label="Gelar / Spesialisasi" name="title" defaultValue={profile.title} />
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            <InputField label="Lokasi" name="location" defaultValue={profile.location} />
                            <InputField label="Alamat Email" name="email" defaultValue={profile.email} />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-widest text-emerald-modern/50 ml-2">Tentang Saya / Bio</label>
                            <textarea 
                                name="description"
                                defaultValue={profile.description}
                                rows="6" 
                                className="w-full bg-bg-main/30 border border-white/5 rounded-3xl px-6 py-4 focus:border-emerald-modern/50 transition-all outline-none text-sm leading-relaxed"
                            />
                        </div>
                        <motion.button 
                            whileHover={{ scale: 1.02 }}
                            className="w-full bg-emerald-modern py-5 rounded-3xl font-black tracking-widest uppercase flex items-center justify-center gap-3 shadow-xl shadow-emerald-modern/20"
                        >
                            <Save size={20} /> SIMPAN PERUBAHAN
                        </motion.button>
                    </form>
                </motion.div>
            )}

            {activeTab === 'projects' && (
                <motion.div 
                    key="projects"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                >
                    {projects.map((project, idx) => (
                        <div key={idx} className="bg-bg-alt/50 border border-white/5 rounded-[2.5rem] overflow-hidden flex group backdrop-blur-md">
                            <div className="w-1/3 overflow-hidden relative">
                                <img src={project.img} className="w-full h-full object-cover grayscale opacity-50 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100" />
                            </div>
                            <div className="flex-1 p-8 flex flex-col">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="font-black text-xl tracking-tight uppercase">{project.title}</h3>
                                    <div className="flex gap-2">
                                        <button onClick={() => openModal(idx)} className="p-2 hover:bg-emerald-modern rounded-full transition-colors"><Edit3 size={16} /></button>
                                        <button onClick={() => deleteProject(idx)} className="p-2 hover:bg-red-500 rounded-full transition-colors"><Trash2 size={16} /></button>
                                    </div>
                                </div>
                                <p className="text-xs text-cream-soft/40 line-clamp-2 mb-6 italic leading-relaxed font-light">{project.description}</p>
                                <div className="mt-auto flex gap-2 overflow-hidden">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="text-[8px] font-black px-3 py-1 bg-white/5 rounded-full uppercase opacity-30">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            )}

            {activeTab === 'tech' && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {techStack.map((tech, idx) => (
                        <div key={idx} className="bg-bg-alt/50 border border-white/5 p-8 rounded-[2.5rem] text-center hover:border-emerald-modern/30 transition-all">
                             <div className="w-12 h-12 bg-emerald-modern/10 rounded-2xl flex items-center justify-center text-emerald-modern mx-auto mb-4">{idx + 1}</div>
                             <h4 className="font-black tracking-tight">{tech.name}</h4>
                             <p className="text-[9px] font-bold uppercase opacity-30 tracking-widest mt-1">{tech.desc}</p>
                        </div>
                    ))}
                </div>
            )}
        </AnimatePresence>
      </main>

      {/* Modal Form */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               exit={{ opacity: 0 }}
               onClick={closeModal}
               className="absolute inset-0 bg-bg-main/90 backdrop-blur-xl" 
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-bg-alt border border-white/10 w-full max-w-2xl rounded-[3.5rem] overflow-hidden shadow-2xl"
            >
              <div className="p-10 md:p-14">
                <div className="flex justify-between items-center mb-10">
                    <h2 className="text-3xl font-black uppercase tracking-tighter">
                        {editingItem !== null ? 'Sunting Proyek' : 'Proyek Baru'}
                    </h2>
                    <button onClick={closeModal} className="p-3 bg-white/5 rounded-full"><X size={20} /></button>
                </div>

                <form onSubmit={handleAddProject} className="space-y-6">
                    <InputField label="Judul Proyek" name="title" defaultValue={editingItem !== null ? projects[editingItem].title : ''} required />
                    <InputField label="URL Gambar (Unsplash/Direct)" name="img" placeholder="https://..." defaultValue={editingItem !== null ? projects[editingItem].img : ''} required />
                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-emerald-modern/50 ml-2">Deskripsi Proyek</label>
                        <textarea 
                            name="description"
                            rows="4"
                            defaultValue={editingItem !== null ? projects[editingItem].description : ''}
                            className="w-full bg-bg-main/30 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-emerald-modern/50 transition-all text-sm"
                            required
                        />
                    </div>
                    <InputField label="Tags (Pisahkan dengan koma)" name="tags" placeholder="React, Laravel, CSS" defaultValue={editingItem !== null ? projects[editingItem].tags.join(', ') : ''} required />
                    
                    <button className="w-full bg-emerald-modern py-5 rounded-3xl font-black tracking-widest uppercase flex items-center justify-center gap-3 shadow-xl">
                        {editingItem !== null ? 'UPDATE PROYEK' : 'TAMBAHKAN PROYEK'}
                    </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const InputField = ({ label, name, type = "text", ...props }) => (
    <div className="space-y-3 group/field">
        <label className="text-[10px] font-black uppercase tracking-widest text-emerald-modern/50 group-focus-within/field:text-emerald-modern transition-colors ml-2">{label}</label>
        <input 
            type={type} 
            name={name}
            className="w-full bg-bg-main/30 border border-white/5 rounded-2xl px-6 py-4 focus:border-emerald-modern/50 transition-all outline-none text-sm"
            {...props}
        />
    </div>
);

export default Dashboard;
