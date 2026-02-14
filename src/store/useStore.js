import { create } from 'zustand';
import { supabase } from '../lib/supabase';

const useStore = create((set, get) => ({
  profile: {
    name: "Rymbun Anarliansyah",
    title: "Fullstack / Laravel Developer",
    location: "Based in Indonesia",
    email: "rymbunanr@gmail.com",
    profileImage: null,
    description: "Membangun pengalaman digital kelas atas dengan arsitektur modern dan kode yang bersih.",
    stats: [],
    socials: {}
  },
  projects: [],
  techStack: [],
  isAuthenticated: false,
  isLoading: false,

  // Fetch all data from Supabase
  fetchData: async () => {
    set({ isLoading: true });
    try {
      const { data: profileData } = await supabase.from('profile').select('*').single();
      if (profileData) set({ profile: profileData });

      const { data: projectsData } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      if (projectsData) set({ projects: projectsData });

      const { data: techData } = await supabase.from('tech_stack').select('*').order('order_index');
      if (techData) set({ techStack: techData });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  login: (username, password) => {
    const adminUser = import.meta.env.VITE_ADMIN_USERNAME || 'admin';
    const adminPass = import.meta.env.VITE_ADMIN_PASSWORD || 'password123';

    if (username === adminUser && password === adminPass) {
      set({ isAuthenticated: true });
      return true;
    }
    return false;
  },

  logout: () => set({ isAuthenticated: false }),

  updateProfile: async (newProfile) => {
    const { error } = await supabase.from('profile').update(newProfile).eq('id', 1);
    if (!error) set({ profile: newProfile });
    return { error };
  },

  addProject: async (project) => {
    const { data, error } = await supabase.from('projects').insert([project]).select();
    if (!error && data) {
      set((state) => ({ projects: [data[0], ...state.projects] }));
    }
    return { error };
  },

  updateProject: async (id, updatedProject) => {
    const { error } = await supabase.from('projects').update(updatedProject).eq('id', id);
    if (!error) {
      set((state) => ({
        projects: state.projects.map((p) => (p.id === id ? { ...p, ...updatedProject } : p))
      }));
    }
    return { error };
  },

  deleteProject: async (id) => {
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (!error) {
      set((state) => ({
        projects: state.projects.filter((p) => p.id !== id)
      }));
    }
    return { error };
  },

  addTech: async (tech) => {
    const { data, error } = await supabase.from('tech_stack').insert([tech]).select();
    if (!error && data) {
      set((state) => ({ techStack: [...state.techStack, data[0]] }));
    }
    return { error };
  },

  updateTech: async (id, updatedTech) => {
    const { error } = await supabase.from('tech_stack').update(updatedTech).eq('id', id);
    if (!error) {
      set((state) => ({
        techStack: state.techStack.map((t) => (t.id === id ? { ...t, ...updatedTech } : t))
      }));
    }
    return { error };
  },

  deleteTech: async (id) => {
    const { error } = await supabase.from('tech_stack').delete().eq('id', id);
    if (!error) {
      set((state) => ({
        techStack: state.techStack.filter((t) => t.id !== id)
      }));
    }
    return { error };
  }
}));

export default useStore;
