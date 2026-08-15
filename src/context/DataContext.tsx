'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  AgendaItem,
  ComplaintItem,
  GalleryItem,
  NewsItem,
  PotentialItem,
  ServiceItem,
  StatItem,
  VillageProfile,
  initialAgenda,
  initialComplaints,
  initialGallery,
  initialNews,
  initialPotentials,
  initialProfile,
  initialServices,
  initialStats,
} from '@/lib/data';

interface DataContextType {
  stats: StatItem[];
  services: ServiceItem[];
  potentials: PotentialItem[];
  news: NewsItem[];
  agenda: AgendaItem[];
  gallery: GalleryItem[];
  complaints: ComplaintItem[];
  profile: VillageProfile;
  isAuthenticated: boolean;
  login: (pass: string) => boolean;
  logout: () => void;
  // CRUD actions
  updateStats: (newStats: StatItem[]) => void;
  addNews: (item: Omit<NewsItem, 'id'>) => void;
  updateNews: (id: string, item: Partial<NewsItem>) => void;
  deleteNews: (id: string) => void;
  addAgenda: (item: Omit<AgendaItem, 'id'>) => void;
  updateAgenda: (id: string, item: Partial<AgendaItem>) => void;
  deleteAgenda: (id: string) => void;
  addPotential: (item: Omit<PotentialItem, 'id'>) => void;
  updatePotential: (id: string, item: Partial<PotentialItem>) => void;
  deletePotential: (id: string) => void;
  addGallery: (item: Omit<GalleryItem, 'id'>) => void;
  deleteGallery: (id: string) => void;
  addService: (item: Omit<ServiceItem, 'id'>) => void;
  updateService: (id: string, item: Partial<ServiceItem>) => void;
  deleteService: (id: string) => void;
  addComplaint: (item: Omit<ComplaintItem, 'id' | 'date' | 'status'>) => void;
  updateComplaintStatus: (id: string, status: 'Menunggu' | 'Diproses' | 'Selesai', response?: string) => void;
  deleteComplaint: (id: string) => void;
  updateProfile: (profile: VillageProfile) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stats, setStats] = useState<StatItem[]>(initialStats);
  const [services, setServices] = useState<ServiceItem[]>(initialServices);
  const [potentials, setPotentials] = useState<PotentialItem[]>(initialPotentials);
  const [news, setNews] = useState<NewsItem[]>(initialNews);
  const [agenda, setAgenda] = useState<AgendaItem[]>(initialAgenda);
  const [gallery, setGallery] = useState<GalleryItem[]>(initialGallery);
  const [complaints, setComplaints] = useState<ComplaintItem[]>(initialComplaints);
  const [profile, setProfile] = useState<VillageProfile>(initialProfile);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const savedStats = localStorage.getItem('kriwen_stats');
      if (savedStats) setStats(JSON.parse(savedStats));

      const savedServices = localStorage.getItem('kriwen_services');
      if (savedServices) setServices(JSON.parse(savedServices));

      const savedPotentials = localStorage.getItem('kriwen_potentials');
      if (savedPotentials) setPotentials(JSON.parse(savedPotentials));

      const savedNews = localStorage.getItem('kriwen_news');
      if (savedNews) setNews(JSON.parse(savedNews));

      const savedAgenda = localStorage.getItem('kriwen_agenda');
      if (savedAgenda) setAgenda(JSON.parse(savedAgenda));

      const savedGallery = localStorage.getItem('kriwen_gallery');
      if (savedGallery) setGallery(JSON.parse(savedGallery));

      const savedComplaints = localStorage.getItem('kriwen_complaints');
      if (savedComplaints) setComplaints(JSON.parse(savedComplaints));

      const savedProfile = localStorage.getItem('kriwen_profile');
      if (savedProfile) setProfile(JSON.parse(savedProfile));

      const savedAuth = localStorage.getItem('kriwen_auth');
      if (savedAuth === 'true') setIsAuthenticated(true);
    } catch (e) {
      console.error('Failed loading data from localStorage:', e);
    }
  }, []);

  // Save changes helper
  const save = (key: string, val: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      console.error('Error saving data:', e);
    }
  };

  const login = (pass: string) => {
    if (pass === 'admin123' || pass === 'admin') {
      setIsAuthenticated(true);
      localStorage.setItem('kriwen_auth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('kriwen_auth');
  };

  const updateStats = (newStats: StatItem[]) => {
    setStats(newStats);
    save('kriwen_stats', newStats);
  };

  const addNews = (item: Omit<NewsItem, 'id'>) => {
    const newItem = { ...item, id: Date.now().toString() };
    const updated = [newItem, ...news];
    setNews(updated);
    save('kriwen_news', updated);
  };

  const updateNews = (id: string, item: Partial<NewsItem>) => {
    const updated = news.map((n) => (n.id === id ? { ...n, ...item } : n));
    setNews(updated);
    save('kriwen_news', updated);
  };

  const deleteNews = (id: string) => {
    const updated = news.filter((n) => n.id !== id);
    setNews(updated);
    save('kriwen_news', updated);
  };

  const addAgenda = (item: Omit<AgendaItem, 'id'>) => {
    const newItem = { ...item, id: Date.now().toString() };
    const updated = [newItem, ...agenda];
    setAgenda(updated);
    save('kriwen_agenda', updated);
  };

  const updateAgenda = (id: string, item: Partial<AgendaItem>) => {
    const updated = agenda.map((a) => (a.id === id ? { ...a, ...item } : a));
    setAgenda(updated);
    save('kriwen_agenda', updated);
  };

  const deleteAgenda = (id: string) => {
    const updated = agenda.filter((a) => a.id !== id);
    setAgenda(updated);
    save('kriwen_agenda', updated);
  };

  const addPotential = (item: Omit<PotentialItem, 'id'>) => {
    const newItem = { ...item, id: Date.now().toString() };
    const updated = [newItem, ...potentials];
    setPotentials(updated);
    save('kriwen_potentials', updated);
  };

  const updatePotential = (id: string, item: Partial<PotentialItem>) => {
    const updated = potentials.map((p) => (p.id === id ? { ...p, ...item } : p));
    setPotentials(updated);
    save('kriwen_potentials', updated);
  };

  const deletePotential = (id: string) => {
    const updated = potentials.filter((p) => p.id !== id);
    setPotentials(updated);
    save('kriwen_potentials', updated);
  };

  const addGallery = (item: Omit<GalleryItem, 'id'>) => {
    const newItem = { ...item, id: Date.now().toString() };
    const updated = [newItem, ...gallery];
    setGallery(updated);
    save('kriwen_gallery', updated);
  };

  const deleteGallery = (id: string) => {
    const updated = gallery.filter((g) => g.id !== id);
    setGallery(updated);
    save('kriwen_gallery', updated);
  };

  const addService = (item: Omit<ServiceItem, 'id'>) => {
    const newItem = { ...item, id: Date.now().toString() };
    const updated = [...services, newItem];
    setServices(updated);
    save('kriwen_services', updated);
  };

  const updateService = (id: string, item: Partial<ServiceItem>) => {
    const updated = services.map((s) => (s.id === id ? { ...s, ...item } : s));
    setServices(updated);
    save('kriwen_services', updated);
  };

  const deleteService = (id: string) => {
    const updated = services.filter((s) => s.id !== id);
    setServices(updated);
    save('kriwen_services', updated);
  };

  const addComplaint = (item: Omit<ComplaintItem, 'id' | 'date' | 'status'>) => {
    const today = new Date().toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
    const newItem: ComplaintItem = {
      ...item,
      id: Date.now().toString(),
      date: today,
      status: 'Menunggu',
    };
    const updated = [newItem, ...complaints];
    setComplaints(updated);
    save('kriwen_complaints', updated);
  };

  const updateComplaintStatus = (id: string, status: 'Menunggu' | 'Diproses' | 'Selesai', response?: string) => {
    const updated = complaints.map((c) =>
      c.id === id ? { ...c, status, ...(response !== undefined ? { response } : {}) } : c
    );
    setComplaints(updated);
    save('kriwen_complaints', updated);
  };

  const deleteComplaint = (id: string) => {
    const updated = complaints.filter((c) => c.id !== id);
    setComplaints(updated);
    save('kriwen_complaints', updated);
  };

  const updateProfile = (newProfile: VillageProfile) => {
    setProfile(newProfile);
    save('kriwen_profile', newProfile);
  };

  return (
    <DataContext.Provider
      value={{
        stats,
        services,
        potentials,
        news,
        agenda,
        gallery,
        complaints,
        profile,
        isAuthenticated,
        login,
        logout,
        updateStats,
        addNews,
        updateNews,
        deleteNews,
        addAgenda,
        updateAgenda,
        deleteAgenda,
        addPotential,
        updatePotential,
        deletePotential,
        addGallery,
        deleteGallery,
        addService,
        updateService,
        deleteService,
        addComplaint,
        updateComplaintStatus,
        deleteComplaint,
        updateProfile,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
