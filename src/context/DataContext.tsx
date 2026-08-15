'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { db, auth } from '@/lib/firebase';
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
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
  user: FirebaseUser | null;
  login: (userOrEmail: string, pass?: string) => Promise<boolean>;
  logout: () => Promise<void>;
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
  const [stats, setStats] = useState<StatItem[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [potentials, setPotentials] = useState<PotentialItem[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [agenda, setAgenda] = useState<AgendaItem[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [complaints, setComplaints] = useState<ComplaintItem[]>([]);
  const [profile, setProfile] = useState<VillageProfile>(initialProfile);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);

  // Helper local storage save
  const saveLocal = (key: string, val: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      console.error('Error saving local:', e);
    }
  };

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setIsAuthenticated(true);
        localStorage.setItem('kriwen_auth', 'true');
      } else {
        setCurrentUser(null);
        const savedAuth = localStorage.getItem('kriwen_auth');
        if (savedAuth === 'true') {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      }
    });

    return () => unsubscribeAuth();
  }, []);

  // Load state from localStorage on mount (initial fallback)
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

      const savedGallery = localStorage.getItem('kriwen_gallery');
      if (savedGallery) setGallery(JSON.parse(savedGallery));

      const savedComplaints = localStorage.getItem('kriwen_complaints');
      if (savedComplaints) setComplaints(JSON.parse(savedComplaints));

      const savedProfile = localStorage.getItem('kriwen_profile');
      if (savedProfile) setProfile(JSON.parse(savedProfile));
    } catch (e) {
      console.warn('LocalStorage initial load warning:', e);
    }
  }, []);

  // Sync state strictly from Firebase Firestore
  useEffect(() => {
    try {
      // News
      const unsubNews = onSnapshot(collection(db, 'news'), (snapshot) => {
        const list: NewsItem[] = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as NewsItem));
        setNews(list);
        saveLocal('kriwen_news', list);
      }, (err) => console.warn('Firestore News permission warning:', err));

      // Services
      const unsubServices = onSnapshot(collection(db, 'services'), (snapshot) => {
        const list: ServiceItem[] = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as ServiceItem));
        setServices(list);
        saveLocal('kriwen_services', list);
      }, (err) => console.warn('Firestore Services permission warning:', err));

      // Potentials
      const unsubPotentials = onSnapshot(collection(db, 'potentials'), (snapshot) => {
        const list: PotentialItem[] = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as PotentialItem));
        setPotentials(list);
        saveLocal('kriwen_potentials', list);
      }, (err) => console.warn('Firestore Potentials permission warning:', err));

      // Gallery
      const unsubGallery = onSnapshot(collection(db, 'gallery'), (snapshot) => {
        const list: GalleryItem[] = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as GalleryItem));
        setGallery(list);
        saveLocal('kriwen_gallery', list);
      }, (err) => console.warn('Firestore Gallery permission warning:', err));

      // Complaints
      const unsubComplaints = onSnapshot(collection(db, 'complaints'), (snapshot) => {
        const list: ComplaintItem[] = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as ComplaintItem));
        setComplaints(list);
        saveLocal('kriwen_complaints', list);
      }, (err) => console.warn('Firestore Complaints permission warning:', err));

      // Profile
      const unsubProfile = onSnapshot(doc(db, 'settings', 'profile'), (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data() as VillageProfile;
          setProfile(data);
          saveLocal('kriwen_profile', data);
        }
      }, (err) => console.warn('Firestore Profile permission warning:', err));

      // Stats
      const unsubStats = onSnapshot(doc(db, 'settings', 'stats'), (snapshot) => {
        if (snapshot.exists() && snapshot.data()?.list) {
          const list = snapshot.data().list as StatItem[];
          setStats(list);
          saveLocal('kriwen_stats', list);
        }
      }, (err) => console.warn('Firestore Stats permission warning:', err));

      return () => {
        unsubNews();
        unsubServices();
        unsubPotentials();
        unsubGallery();
        unsubComplaints();
        unsubProfile();
        unsubStats();
      };
    } catch (e) {
      console.error('Firebase snapshot setup error:', e);
    }
  }, []);

  // Firebase Authentication Login
  const login = async (userOrEmail: string, pass?: string): Promise<boolean> => {
    let email = userOrEmail.trim();
    let password = pass ? pass.trim() : '';

    if (!pass) {
      password = userOrEmail;
      email = 'admin@kriwen.desa.id';
    }

    if (!email.includes('@')) {
      email = `${email}@kriwen.desa.id`;
    }

    try {
      // 1. Try Firebase Auth Sign In
      await signInWithEmailAndPassword(auth, email, password);
      setIsAuthenticated(true);
      localStorage.setItem('kriwen_auth', 'true');
      return true;
    } catch (err: any) {
      console.warn('Firebase Auth Login attempt failed:', err.code || err.message);

      // If user doesn't exist yet on Firebase Auth, create admin user automatically
      if (
        err.code === 'auth/user-not-found' ||
        err.code === 'auth/invalid-credential' ||
        err.code === 'auth/wrong-password'
      ) {
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          setIsAuthenticated(true);
          localStorage.setItem('kriwen_auth', 'true');
          return true;
        } catch (createErr: any) {
          console.warn('Firebase Auth user creation error:', createErr.message);
        }
      }

      // Fallback for default local credentials
      if ((userOrEmail === 'admin' || email === 'admin@kriwen.desa.id') && (password === 'admin123' || password === 'admin')) {
        setIsAuthenticated(true);
        localStorage.setItem('kriwen_auth', 'true');
        return true;
      }

      return false;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.error('Error signing out from Firebase:', e);
    }
    setIsAuthenticated(false);
    localStorage.removeItem('kriwen_auth');
  };

  // CRUD Operations with Firestore & Local Fallback

  const updateStats = async (newStats: StatItem[]) => {
    setStats(newStats);
    saveLocal('kriwen_stats', newStats);
    try {
      await setDoc(doc(db, 'settings', 'stats'), { list: newStats });
    } catch (e) {
      console.error('Error updating stats on Firebase:', e);
    }
  };

  const addNews = async (item: Omit<NewsItem, 'id'>) => {
    const id = Date.now().toString();
    const newItem: NewsItem = { ...item, id };
    const updated = [newItem, ...news];
    setNews(updated);
    saveLocal('kriwen_news', updated);
    try {
      await setDoc(doc(db, 'news', id), newItem);
    } catch (e) {
      console.error('Error adding news to Firebase:', e);
    }
  };

  const updateNews = async (id: string, item: Partial<NewsItem>) => {
    const target = news.find((n) => n.id === id);
    if (!target) return;
    const updatedItem = { ...target, ...item };
    const updated = news.map((n) => (n.id === id ? updatedItem : n));
    setNews(updated);
    saveLocal('kriwen_news', updated);
    try {
      await setDoc(doc(db, 'news', id), updatedItem, { merge: true });
    } catch (e) {
      console.error('Error updating news on Firebase:', e);
    }
  };

  const deleteNews = async (id: string) => {
    const updated = news.filter((n) => n.id !== id);
    setNews(updated);
    saveLocal('kriwen_news', updated);
    try {
      await deleteDoc(doc(db, 'news', id));
    } catch (e) {
      console.error('Error deleting news on Firebase:', e);
    }
  };

  const addAgenda = async (item: Omit<AgendaItem, 'id'>) => {
    const id = Date.now().toString();
    const newItem: AgendaItem = { ...item, id };
    const updated = [newItem, ...agenda];
    setAgenda(updated);
    saveLocal('kriwen_agenda', updated);
  };

  const updateAgenda = async (id: string, item: Partial<AgendaItem>) => {
    const updated = agenda.map((a) => (a.id === id ? { ...a, ...item } : a));
    setAgenda(updated);
    saveLocal('kriwen_agenda', updated);
  };

  const deleteAgenda = async (id: string) => {
    const updated = agenda.filter((a) => a.id !== id);
    setAgenda(updated);
    saveLocal('kriwen_agenda', updated);
  };

  const addPotential = async (item: Omit<PotentialItem, 'id'>) => {
    const id = Date.now().toString();
    const newItem: PotentialItem = { ...item, id };
    const updated = [newItem, ...potentials];
    setPotentials(updated);
    saveLocal('kriwen_potentials', updated);
    try {
      await setDoc(doc(db, 'potentials', id), newItem);
    } catch (e) {
      console.error('Error adding potential to Firebase:', e);
    }
  };

  const updatePotential = async (id: string, item: Partial<PotentialItem>) => {
    const target = potentials.find((p) => p.id === id);
    if (!target) return;
    const updatedItem = { ...target, ...item };
    const updated = potentials.map((p) => (p.id === id ? updatedItem : p));
    setPotentials(updated);
    saveLocal('kriwen_potentials', updated);
    try {
      await setDoc(doc(db, 'potentials', id), updatedItem, { merge: true });
    } catch (e) {
      console.error('Error updating potential on Firebase:', e);
    }
  };

  const deletePotential = async (id: string) => {
    const updated = potentials.filter((p) => p.id !== id);
    setPotentials(updated);
    saveLocal('kriwen_potentials', updated);
    try {
      await deleteDoc(doc(db, 'potentials', id));
    } catch (e) {
      console.error('Error deleting potential on Firebase:', e);
    }
  };

  const addGallery = async (item: Omit<GalleryItem, 'id'>) => {
    const id = Date.now().toString();
    const newItem: GalleryItem = { ...item, id };
    const updated = [newItem, ...gallery];
    setGallery(updated);
    saveLocal('kriwen_gallery', updated);
    try {
      await setDoc(doc(db, 'gallery', id), newItem);
    } catch (e) {
      console.error('Error adding gallery to Firebase:', e);
    }
  };

  const deleteGallery = async (id: string) => {
    const updated = gallery.filter((g) => g.id !== id);
    setGallery(updated);
    saveLocal('kriwen_gallery', updated);
    try {
      await deleteDoc(doc(db, 'gallery', id));
    } catch (e) {
      console.error('Error deleting gallery from Firebase:', e);
    }
  };

  const addService = async (item: Omit<ServiceItem, 'id'>) => {
    const id = Date.now().toString();
    const newItem: ServiceItem = { ...item, id };
    const updated = [...services, newItem];
    setServices(updated);
    saveLocal('kriwen_services', updated);
    try {
      await setDoc(doc(db, 'services', id), newItem);
    } catch (e) {
      console.error('Error adding service to Firebase:', e);
    }
  };

  const updateService = async (id: string, item: Partial<ServiceItem>) => {
    const target = services.find((s) => s.id === id);
    if (!target) return;
    const updatedItem = { ...target, ...item };
    const updated = services.map((s) => (s.id === id ? updatedItem : s));
    setServices(updated);
    saveLocal('kriwen_services', updated);
    try {
      await setDoc(doc(db, 'services', id), updatedItem, { merge: true });
    } catch (e) {
      console.error('Error updating service on Firebase:', e);
    }
  };

  const deleteService = async (id: string) => {
    const updated = services.filter((s) => s.id !== id);
    setServices(updated);
    saveLocal('kriwen_services', updated);
    try {
      await deleteDoc(doc(db, 'services', id));
    } catch (e) {
      console.error('Error deleting service from Firebase:', e);
    }
  };

  const addComplaint = async (item: Omit<ComplaintItem, 'id' | 'date' | 'status'>) => {
    const today = new Date().toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
    const id = Date.now().toString();
    const newItem: ComplaintItem = {
      ...item,
      id,
      date: today,
      status: 'Menunggu',
    };
    const updated = [newItem, ...complaints];
    setComplaints(updated);
    saveLocal('kriwen_complaints', updated);
    try {
      await setDoc(doc(db, 'complaints', id), newItem);
    } catch (e) {
      console.error('Error adding complaint to Firebase:', e);
    }
  };

  const updateComplaintStatus = async (id: string, status: 'Menunggu' | 'Diproses' | 'Selesai', response?: string) => {
    const target = complaints.find((c) => c.id === id);
    if (!target) return;
    const updatedItem: ComplaintItem = {
      ...target,
      status,
      ...(response !== undefined ? { response } : {}),
    };
    const updated = complaints.map((c) => (c.id === id ? updatedItem : c));
    setComplaints(updated);
    saveLocal('kriwen_complaints', updated);
    try {
      await setDoc(doc(db, 'complaints', id), updatedItem, { merge: true });
    } catch (e) {
      console.error('Error updating complaint status on Firebase:', e);
    }
  };

  const deleteComplaint = async (id: string) => {
    const updated = complaints.filter((c) => c.id !== id);
    setComplaints(updated);
    saveLocal('kriwen_complaints', updated);
    try {
      await deleteDoc(doc(db, 'complaints', id));
    } catch (e) {
      console.error('Error deleting complaint from Firebase:', e);
    }
  };

  const updateProfile = async (newProfile: VillageProfile) => {
    setProfile(newProfile);
    saveLocal('kriwen_profile', newProfile);
    try {
      await setDoc(doc(db, 'settings', 'profile'), newProfile);
    } catch (e) {
      console.error('Error updating profile on Firebase:', e);
    }
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
        user: currentUser,
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
