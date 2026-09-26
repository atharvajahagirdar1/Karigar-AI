import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Artisan, Product, Buyer, Order, AnalyticsData, Activity } from './types';
import { mockArtisan, initialProducts, mockBuyers, mockOrders, generateMockAnalytics, mockActivities } from './data/mockData';

interface AppState {
  artisan: Artisan | null;
  products: Product[];
  buyers: Buyer[];
  orders: Order[];
  analytics: AnalyticsData[];
  activities: Activity[];
  isAuthenticated: boolean;
  simpleMode: boolean;
  aiMode: 'auto' | 'gemini' | 'mock';
  setSimpleMode: (val: boolean) => void;
  setAiMode: (val: 'auto' | 'gemini' | 'mock') => void;
  login: () => void;
  logout: () => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  updateBuyerStatus: (buyerId: string, status: Buyer['status']) => void;
  addOrder: (order: Order) => void;
  addActivity: (activity: Activity) => void;
  loadDemoData: () => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [artisan, setArtisan] = useState<Artisan | null>(() => {
    const saved = localStorage.getItem('Karigar AI_artisan');
    return saved ? JSON.parse(saved) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('Karigar AI_auth') === 'true';
  });
  const [simpleMode, setSimpleMode] = useState(() => {
    return localStorage.getItem('Karigar AI_simpleMode') === 'true';
  });
  const [aiMode, setAiMode] = useState<'auto' | 'gemini' | 'mock'>(() => {
    return (localStorage.getItem('Karigar AI_aiMode') as any) || 'auto';
  });
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('Karigar AI_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });
  const [buyers, setBuyers] = useState<Buyer[]>(() => {
    const saved = localStorage.getItem('Karigar AI_buyers');
    return saved ? JSON.parse(saved) : mockBuyers;
  });
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('Karigar AI_orders');
    return saved ? JSON.parse(saved) : mockOrders;
  });
  const [analytics] = useState<AnalyticsData[]>(() => {
    return generateMockAnalytics();
  });
  const [activities, setActivities] = useState<Activity[]>(() => {
    const saved = localStorage.getItem('Karigar AI_activities');
    return saved ? JSON.parse(saved) : mockActivities;
  });

  useEffect(() => {
    localStorage.setItem('Karigar AI_auth', String(isAuthenticated));
    if (artisan) localStorage.setItem('Karigar AI_artisan', JSON.stringify(artisan));
    localStorage.setItem('Karigar AI_products', JSON.stringify(products));
    localStorage.setItem('Karigar AI_buyers', JSON.stringify(buyers));
    localStorage.setItem('Karigar AI_orders', JSON.stringify(orders));
    localStorage.setItem('Karigar AI_activities', JSON.stringify(activities));
    localStorage.setItem('Karigar AI_simpleMode', String(simpleMode));
    localStorage.setItem('Karigar AI_aiMode', aiMode);
  }, [isAuthenticated, artisan, products, buyers, orders, activities, simpleMode, aiMode]);

  const login = () => {
    setIsAuthenticated(true);
    setArtisan(mockArtisan);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setArtisan(null);
  };

  const addProduct = (product: Product) => {
    setProducts(prev => [product, ...prev]);
  };

  const updateProduct = (product: Product) => {
    setProducts(prev => prev.map(p => p.id === product.id ? product : p));
  };

  const updateBuyerStatus = (buyerId: string, status: Buyer['status']) => {
    setBuyers(prev => prev.map(b => b.id === buyerId ? { ...b, status, lastActivity: 'Just now' } : b));
  };

  const addOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
  };

  const addActivity = (activity: Activity) => {
    setActivities(prev => [activity, ...prev]);
  };

  const loadDemoData = () => {
    setProducts(initialProducts);
    setBuyers(mockBuyers);
    setOrders(mockOrders);
    setActivities(mockActivities);
    setArtisan(mockArtisan);
    setIsAuthenticated(true);
  };

  return (
    <AppContext.Provider value={{
      artisan, products, buyers, orders, analytics, activities, isAuthenticated, simpleMode, aiMode, setSimpleMode, setAiMode,
      login, logout, addProduct, updateProduct, updateBuyerStatus, addOrder, addActivity, loadDemoData
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
