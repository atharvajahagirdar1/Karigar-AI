import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../store';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  PlusCircle, 
  Users, 
  UserPlus, 
  ShoppingCart, 
  BarChart2, 
  Sparkles,
  Settings,
  User,
  LogOut,
  Menu,
  X,
  Search,
  Bell,
  HelpCircle
} from 'lucide-react';

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { artisan, logout, simpleMode } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: simpleMode ? 'Home' : 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: simpleMode ? 'My Products' : 'My Catalog', path: '/catalog', icon: ShoppingBag },
    { name: simpleMode ? 'Take Product Photo' : 'Add Product', path: '/catalog/new', icon: PlusCircle, highlight: true },
    { name: simpleMode ? 'Find People Who Want This' : 'Find Buyers', path: '/find-buyers', icon: UserPlus, highlight: true },
    { name: 'Buyers', path: '/buyers', icon: Users, hideInSimple: true },
    { name: simpleMode ? 'My Sales' : 'Orders', path: '/orders', icon: ShoppingCart },
    { name: simpleMode ? 'My Business' : 'Analytics', path: '/analytics', icon: BarChart2, hideInSimple: true },
    { name: 'AI Assistant', path: '/assistant', icon: Sparkles },
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Settings', path: '/settings', icon: Settings },
  ].filter(item => !(simpleMode && item.hideInSimple));

  return (
    <div className="flex h-screen bg-cream overflow-hidden font-sans">
      {/* Mobile sidebar backdrop */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-charcoal/50 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-forest-dark text-white transform transition-transform duration-300 lg:relative lg:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-terracotta to-gold flex items-center justify-center">
                <Sparkles size={16} className="text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">Karigar AI</span>
            </div>
            <button className="lg:hidden" onClick={() => setMobileMenuOpen(false)}>
              <X size={24} />
            </button>
          </div>

          <div className="px-6 mb-4 text-xs font-semibold text-forest-muted uppercase tracking-wider">
            Menu
          </div>

          <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive 
                      ? 'bg-forest text-white shadow-md' 
                      : 'text-forest-muted hover:bg-forest/50 hover:text-white'
                  } ${item.highlight && !isActive ? 'text-gold' : ''}`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon size={20} className="mr-3" />
                <span className="font-medium">{item.name}</span>
              </NavLink>
            ))}
          </nav>

          <div className="p-4 mt-auto">
            <div className="bg-forest p-4 rounded-xl mb-4 border border-forest-muted/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-sand">AI Credits</span>
                <span className="text-xs text-gold">450 / 500</span>
              </div>
              <div className="w-full bg-forest-dark rounded-full h-1.5">
                <div className="bg-gold h-1.5 rounded-full" style={{ width: '90%' }}></div>
              </div>
            </div>

            <div className="flex items-center px-4 py-3 bg-forest rounded-xl">
              <div className="w-10 h-10 rounded-full bg-terracotta flex items-center justify-center text-white font-bold text-lg border-2 border-forest-dark">
                {artisan?.name.charAt(0)}
              </div>
              <div className="ml-3 flex-1 overflow-hidden">
                <p className="text-sm font-medium text-white truncate">{artisan?.name}</p>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
                  <p className="text-xs text-forest-muted truncate">Online</p>
                </div>
              </div>
              <button onClick={handleLogout} className="text-forest-muted hover:text-white">
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white/80 backdrop-blur-md border-b border-sand px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center">
            <button className="mr-4 lg:hidden text-charcoal" onClick={() => setMobileMenuOpen(true)}>
              <Menu size={24} />
            </button>
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search products, buyers, orders..." 
                className="pl-10 pr-4 py-2 w-80 bg-cream border-none rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-forest/20"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {location.pathname !== '/find-buyers' && (
              <button 
                onClick={() => navigate('/find-buyers')}
                className="hidden md:flex items-center px-4 py-2 bg-gradient-to-r from-terracotta to-gold text-white text-sm font-medium rounded-full hover:shadow-lg transition-all"
              >
                <Sparkles size={16} className="mr-2" />
                Find Buyers
              </button>
            )}
            
            <button className="text-gray-500 hover:text-forest transition-colors relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-terracotta border-2 border-white rounded-full text-[8px] font-bold text-white flex items-center justify-center">3</span>
            </button>
            <button className="text-gray-500 hover:text-forest transition-colors hidden sm:block">
              <HelpCircle size={20} />
            </button>
            
            <div className="w-8 h-8 rounded-full bg-terracotta flex items-center justify-center text-white font-bold cursor-pointer border-2 border-white shadow-sm" onClick={() => navigate('/profile')}>
              {artisan?.name.charAt(0)}
            </div>
          </div>
        </header>
        
        <main className={`flex-1 overflow-y-auto p-4 md:p-8 ${simpleMode ? 'pb-24 lg:pb-8' : ''}`}>
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      
      {/* Mobile Bottom Navigation (Simple Mode) */}
      {simpleMode && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-sand z-40 px-4 flex justify-between items-center shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
          <NavLink to="/dashboard" className={({isActive}) => `flex flex-col items-center py-3 px-2 ${isActive ? 'text-forest' : 'text-gray-400'}`}>
            <LayoutDashboard size={20} className="mb-1" />
            <span className="text-[10px] font-medium">Home</span>
          </NavLink>
          <NavLink to="/catalog" className={({isActive}) => `flex flex-col items-center py-3 px-2 ${isActive ? 'text-forest' : 'text-gray-400'}`}>
            <ShoppingBag size={20} className="mb-1" />
            <span className="text-[10px] font-medium">Products</span>
          </NavLink>
          <div className="relative -top-5 px-2">
            <button onClick={() => navigate('/catalog/new')} className="w-14 h-14 bg-forest text-white rounded-full flex items-center justify-center shadow-lg border-4 border-cream hover:bg-forest-dark transition-colors">
              <PlusCircle size={28} />
            </button>
          </div>
          <NavLink to="/find-buyers" className={({isActive}) => `flex flex-col items-center py-3 px-2 ${isActive ? 'text-forest' : 'text-gray-400'}`}>
            <UserPlus size={20} className="mb-1" />
            <span className="text-[10px] font-medium">Buyers</span>
          </NavLink>
          <NavLink to="/profile" className={({isActive}) => `flex flex-col items-center py-3 px-2 ${isActive ? 'text-forest' : 'text-gray-400'}`}>
            <User size={20} className="mb-1" />
            <span className="text-[10px] font-medium">Profile</span>
          </NavLink>
        </div>
      )}
    </div>
  );
};
