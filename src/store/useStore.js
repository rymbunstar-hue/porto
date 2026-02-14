import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      profile: {
        name: "Rymbun Anarliansyah",
        title: "Fullstack / Laravel Developer",
        location: "Based in Indonesia",
        email: "rymbunanr@gmail.com",
        description: "Membangun pengalaman digital kelas atas dengan arsitektur modern dan kode yang bersih. Mengubah logika backend yang kompleks menjadi solusi elegan yang berfokus pada pengguna."
      },
      projects: [
        {
          title: "EcoSphere Dashboard",
          description: "Sistem pemantauan lingkungan real-time yang dibangun untuk tim riset global dengan visualisasi data yang kompleks.",
          tags: ["Laravel", "PHP", "MySQL", "Tailwind"],
          img: "https://images.unsplash.com/photo-1551288049-bbda38a5f452?q=80&w=800"
        },
        {
          title: "Lumina Marketplace",
          description: "Platform e-commerce modern dengan integrasi pembayaran yang kompleks, sistem vendor, dan caching tingkat lanjut.",
          tags: ["Laravel", "Blade", "MySQL", "Tailwind"],
          img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800"
        },
        {
          title: "NexGen ERP",
          description: "Solusi perencanaan sumber daya perusahaan yang komprehensif dengan alur kerja otomatis dan pelaporan real-time.",
          tags: ["Laravel", "Vue.js", "Redis", "Tailwind"],
          img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800"
        }
      ],
      techStack: [
        { name: "Laravel", icon: "Layers", desc: "Backend Utama" },
        { name: "PHP", icon: "Code2", desc: "Legacy & Modern" },
        { name: "MySQL", icon: "Database", desc: "Database Relasional" },
        { name: "Tailwind", icon: "Palette", desc: "Styling UI" },
        { name: "React", icon: "Layout", desc: "UI Interaktif" },
        { name: "Github", icon: "Github", desc: "Kontrol Versi" }
      ],
      
      updateProfile: (newProfile) => set({ profile: newProfile }),
      
      addProject: (project) => set((state) => ({ 
        projects: [...state.projects, project] 
      })),
      
      updateProject: (index, updatedProject) => set((state) => {
        const newProjects = [...state.projects];
        newProjects[index] = updatedProject;
        return { projects: newProjects };
      }),
      
      deleteProject: (index) => set((state) => ({
        projects: state.projects.filter((_, i) => i !== index)
      })),

      updateTech: (index, updatedTech) => set((state) => {
        const newTech = [...state.techStack];
        newTech[index] = updatedTech;
        return { techStack: newTech };
      })
    }),
    {
      name: 'portfolio-storage',
      version: 1, // Tambahkan versi untuk mereset storage lama agar sinkron dengan kode baru
    }
  )
);

export default useStore;
