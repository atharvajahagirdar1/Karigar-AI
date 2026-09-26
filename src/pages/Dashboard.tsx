import React from 'react';
import { useApp } from '../store';
import { useNavigate } from 'react-router-dom';
import { 
  Package, 
  Users, 
  TrendingUp, 
  Sparkles,
  ArrowRight,
  ChevronRight,
  Clock,
  MessageSquare,
  FileText
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { products, buyers, analytics, activities, simpleMode } = useApp();
  const navigate = useNavigate();

  const currentStats = analytics[analytics.length - 1];
  const activeLeads = buyers.filter(b => b.status === 'Catalog Sent' || b.status === 'Negotiating').length;
  const buyerMatches = buyers.length;

  const statCards = [
    { title: 'Products', value: products.length, trend: '+2 this month', icon: Package, color: 'bg-blue-50 text-blue-600' },
    { title: 'Buyer Matches', value: buyerMatches, trend: '+12 this week', icon: Users, color: 'bg-green-50 text-green-600' },
    { title: 'Active Leads', value: activeLeads, trend: '4 pending response', icon: TrendingUp, color: 'bg-orange-50 text-orange-600' },
    { title: 'Revenue', value: `₹${currentStats?.revenue.toLocaleString() || 0}`, trend: '+15% from last month', icon: TrendingUp, color: 'bg-purple-50 text-purple-600' },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'catalog': return <FileText size={16} className="text-blue-500" />;
      case 'match': return <Users size={16} className="text-green-500" />;
      case 'product': return <Package size={16} className="text-orange-500" />;
      case 'message': return <MessageSquare size={16} className="text-purple-500" />;
      default: return <Clock size={16} className="text-gray-500" />;
    }
  };

  if (simpleMode) {
    return (
      <div className="space-y-6 animate-in fade-in pb-12">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-forest-dark">Good morning, Meera 👋</h1>
          <p className="text-gray-600">What would you like to do today?</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button onClick={() => navigate('/catalog/new')} className="bg-forest text-white p-6 rounded-3xl shadow-sm text-left hover:bg-forest-dark transition-colors border border-forest-dark">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-4 backdrop-blur">
              <Package size={24} />
            </div>
            <h2 className="text-xl font-bold mb-1">📸 Take Product Photo</h2>
            <p className="text-forest-muted text-sm leading-tight">Take a photo and let AI create everything.</p>
          </button>

          <button onClick={() => navigate('/catalog')} className="bg-white text-charcoal p-6 rounded-3xl shadow-sm border border-sand text-left hover:bg-cream transition-colors group">
            <div className="w-12 h-12 bg-green-50 text-forest rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Package size={24} />
            </div>
            <h2 className="text-xl font-bold mb-1">📦 My Products</h2>
            <p className="text-gray-500 text-sm leading-tight">See and manage your products.</p>
          </button>

          <button onClick={() => navigate('/find-buyers')} className="bg-white text-charcoal p-6 rounded-3xl shadow-sm border border-sand text-left hover:bg-cream transition-colors group">
            <div className="w-12 h-12 bg-orange-50 text-terracotta rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Users size={24} />
            </div>
            <h2 className="text-xl font-bold mb-1">🔎 Find People Who Want This</h2>
            <p className="text-gray-500 text-sm leading-tight">Find businesses looking for your craft.</p>
          </button>

          <button onClick={() => navigate('/orders')} className="bg-white text-charcoal p-6 rounded-3xl shadow-sm border border-sand text-left hover:bg-cream transition-colors group">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <TrendingUp size={24} />
            </div>
            <h2 className="text-xl font-bold mb-1">💰 My Sales</h2>
            <p className="text-gray-500 text-sm leading-tight">Track your orders and earnings.</p>
          </button>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6 shadow-sm mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
           <div>
              <h3 className="font-bold text-blue-900 flex items-center mb-1"><Sparkles size={16} className="mr-2" /> AI Tip</h3>
              <p className="text-blue-800 text-sm">Your Gond wall art is receiving strong interest from hotels this week.</p>
           </div>
           <button onClick={() => navigate('/find-buyers')} className="px-5 py-2.5 bg-blue-600 text-white font-bold rounded-xl shadow-sm hover:bg-blue-700 w-full sm:w-auto text-center shrink-0">
              Find Hotel Buyers
           </button>
        </div>
        
        {/* Impact Story */}
        <div className="bg-gradient-to-br from-cream to-sand/50 rounded-3xl p-6 border border-sand shadow-sm mt-6">
          <h3 className="font-bold text-charcoal mb-6 text-center">From Local Market to Year-Round Market</h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
            <div className="flex-1 opacity-60">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-2 text-gray-500 shadow-sm border border-gray-100"><Users size={20}/></div>
              <p className="text-xs font-bold text-gray-600">Local Market</p>
            </div>
            <ChevronRight className="text-gray-300 hidden md:block" />
            <div className="flex-1">
              <div className="w-16 h-16 bg-forest text-white rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg border-4 border-cream animate-pulse"><Sparkles size={24}/></div>
              <p className="text-sm font-bold text-forest">Karigar AI</p>
            </div>
            <ChevronRight className="text-gray-300 hidden md:block" />
            <div className="flex-1">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-2 text-terracotta shadow-sm border border-orange-100"><Package size={20}/></div>
              <p className="text-xs font-bold text-charcoal">B2B Orders</p>
            </div>
            <ChevronRight className="text-gray-300 hidden md:block" />
            <div className="flex-1">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-2 text-green-600 shadow-sm border border-green-100"><TrendingUp size={20}/></div>
              <p className="text-xs font-bold text-charcoal">Year-Round Market</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-forest-dark">Your Business at a Glance</h1>
          <p className="text-gray-600">Welcome back, Meera. Here's what's happening today.</p>
        </div>
        <button 
          onClick={() => navigate('/catalog/new')}
          className="px-5 py-2.5 bg-terracotta text-white font-medium rounded-xl hover:bg-orange-700 transition-colors shadow-sm flex items-center justify-center"
        >
          <Package size={18} className="mr-2" /> Add New Product
        </button>
      </div>
      
      {/* Demo Hint */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between shadow-sm gap-4">
        <div className="flex items-center text-blue-800">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-4 shrink-0">
            <Sparkles size={20} className="text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-bold text-blue-900">Recommended SIH Demo Flow</p>
            <p className="text-xs text-blue-700 mt-0.5">Upload a Gond artwork → Find Buyers → Send Catalog</p>
          </div>
        </div>
        <button onClick={() => navigate('/catalog/new')} className="text-sm bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-colors shrink-0">
          Start Demo
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, idx) => (
          <div key={idx} className="bg-white p-5 rounded-3xl shadow-sm border border-sand hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl ${stat.color}`}>
                <stat.icon size={24} />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">{stat.title}</p>
              <h3 className="text-2xl font-bold text-charcoal">{stat.value}</h3>
              <p className="text-xs font-medium text-gray-400 mt-2">{stat.trend}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Insights */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-6 md:p-8 border border-green-100 relative overflow-hidden shadow-sm">
            <Sparkles className="absolute -right-8 -top-8 text-green-200/50 w-48 h-48" />
            <div className="relative z-10">
              <h2 className="text-xl font-bold text-forest-dark flex items-center mb-6">
                <Sparkles size={24} className="mr-2 text-green-600" /> AI Business Insights
              </h2>
              
              <div className="space-y-4">
                <div className="bg-white/70 p-5 rounded-2xl border border-white/60 shadow-sm backdrop-blur-sm">
                  <h4 className="font-bold text-charcoal mb-2">Demand Spike Detected</h4>
                  <p className="text-gray-700 text-sm mb-4">Your "Gond Wall Panels" received 42% more inquiries this month. Hotels are currently your fastest-growing buyer segment.</p>
                  <button onClick={() => navigate('/find-buyers')} className="px-4 py-2 bg-forest text-white text-sm font-medium rounded-xl hover:bg-forest-dark transition-colors inline-flex items-center">
                    Find Hotel Buyers <ArrowRight size={16} className="ml-1" />
                  </button>
                </div>

                <div className="bg-white/70 p-5 rounded-2xl border border-white/60 shadow-sm backdrop-blur-sm">
                  <h4 className="font-bold text-charcoal mb-2">Pricing Optimization</h4>
                  <p className="text-gray-700 text-sm mb-4">Your ₹2,000–₹3,500 products receive the most buyer interest. Consider bundling smaller items to reach this price point.</p>
                  <button onClick={() => navigate('/assistant')} className="px-4 py-2 bg-white text-forest border border-sand text-sm font-medium rounded-xl hover:bg-cream transition-colors inline-flex items-center">
                    Ask AI for Pricing Strategy <ArrowRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-sand shadow-sm">
             <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-charcoal">Quick Actions</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <button onClick={() => navigate('/find-buyers')} className="p-4 bg-cream rounded-2xl border border-sand text-left hover:bg-sand/50 transition-colors group">
                 <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-terracotta mb-3 shadow-sm group-hover:scale-110 transition-transform">
                   <Users size={20} />
                 </div>
                 <h4 className="font-bold text-charcoal text-sm">Find Buyers</h4>
                 <p className="text-xs text-gray-500 mt-1">Match with businesses</p>
               </button>
               <button onClick={() => navigate('/catalog')} className="p-4 bg-cream rounded-2xl border border-sand text-left hover:bg-sand/50 transition-colors group">
                 <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-terracotta mb-3 shadow-sm group-hover:scale-110 transition-transform">
                   <Package size={20} />
                 </div>
                 <h4 className="font-bold text-charcoal text-sm">My Catalog</h4>
                 <p className="text-xs text-gray-500 mt-1">Manage listings</p>
               </button>
            </div>
          </div>
          
          {/* Impact Story (Dashboard Mode) */}
          <div className="bg-gradient-to-br from-cream to-sand/50 rounded-3xl p-6 border border-sand shadow-sm">
            <h3 className="font-bold text-charcoal mb-6 text-center">From Local Market to Year-Round Market</h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
              <div className="flex-1 opacity-60">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mx-auto mb-2 text-gray-500 shadow-sm border border-gray-100"><Users size={16}/></div>
                <p className="text-[10px] font-bold text-gray-600">Local Market</p>
              </div>
              <ChevronRight className="text-gray-300 hidden sm:block" size={16} />
              <div className="flex-1">
                <div className="w-12 h-12 bg-forest text-white rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg border-4 border-cream"><Sparkles size={20}/></div>
                <p className="text-xs font-bold text-forest">Karigar AI</p>
              </div>
              <ChevronRight className="text-gray-300 hidden sm:block" size={16} />
              <div className="flex-1">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mx-auto mb-2 text-terracotta shadow-sm border border-orange-100"><Package size={16}/></div>
                <p className="text-[10px] font-bold text-charcoal">B2B Orders</p>
              </div>
              <ChevronRight className="text-gray-300 hidden sm:block" size={16} />
              <div className="flex-1">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mx-auto mb-2 text-green-600 shadow-sm border border-green-100"><TrendingUp size={16}/></div>
                <p className="text-[10px] font-bold text-charcoal">Year-Round Market</p>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="bg-white rounded-3xl border border-sand shadow-sm flex flex-col h-[600px]">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center shrink-0">
            <h2 className="text-xl font-bold text-charcoal">Business Activity</h2>
            <button className="text-sm font-medium text-forest hover:text-forest-dark flex items-center">
              View All <ChevronRight size={16} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
            {activities.map((activity, index) => (
              <div key={activity.id} className="relative pl-6 pb-6 last:pb-0">
                {/* Timeline Line */}
                {index !== activities.length - 1 && (
                  <div className="absolute left-[11px] top-8 bottom-0 w-px bg-gray-200"></div>
                )}
                
                {/* Timeline Dot */}
                <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-cream border-2 border-white shadow-sm flex items-center justify-center z-10">
                  {getActivityIcon(activity.type)}
                </div>
                
                {/* Content */}
                <div>
                  <p className="text-sm font-medium text-charcoal">{activity.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
