import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../store';
import { 
  Search, 
  Filter, 
  ShieldCheck,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const Buyers: React.FC = () => {
  const { buyers } = useApp();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All Buyers');

  const tabs = ['All Buyers', 'Hotels', 'Interior Designers', 'Corporate', 'Tourism', 'Retailers'];

  const filteredBuyers = buyers.filter(b => {
    const matchesSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase()) || b.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'All Buyers' || b.type.includes(activeTab.replace(/s$/, ''));
    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-forest-dark">Buyer Network</h1>
          <p className="text-gray-600">Organizations and people looking for your craft.</p>
        </div>
        <button 
          onClick={() => navigate('/find-buyers')}
          className="px-4 py-2 bg-forest text-white font-medium rounded-xl hover:bg-forest-dark transition-colors flex items-center shadow-md"
        >
          <Sparkles size={18} className="mr-2 text-gold" /> Find New Buyers
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-sand">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search buyers by name or location..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-cream border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-forest/20 transition-all"
            />
          </div>
          <button className="px-4 py-2 bg-cream rounded-xl text-charcoal hover:bg-sand transition-colors border border-sand flex items-center justify-center font-medium">
            <Filter size={18} className="mr-2" /> Filters
          </button>
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
          {tabs.map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab ? 'bg-forest text-white shadow-sm' : 'bg-transparent text-gray-500 hover:text-charcoal hover:bg-gray-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Buyers List */}
      <div className="bg-white rounded-3xl shadow-sm border border-sand overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500">
                <th className="p-4 font-semibold">Buyer</th>
                <th className="p-4 font-semibold">Requirements & Budget</th>
                <th className="p-4 font-semibold hidden md:table-cell">AI Match</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold hidden lg:table-cell">Last Active</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredBuyers.map(buyer => (
                <tr 
                  key={buyer.id} 
                  className="hover:bg-cream transition-colors cursor-pointer group"
                  onClick={() => navigate(`/buyers/${buyer.id}`)}
                >
                  <td className="p-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center text-forest font-bold mr-3 shrink-0">
                        {buyer.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-charcoal flex items-center">
                          {buyer.name}
                          {buyer.verified && <ShieldCheck size={14} className="ml-1 text-blue-500" />}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col gap-1 max-w-xs">
                      <span className="text-sm text-charcoal font-medium truncate" title={buyer.requirements}>{buyer.requirements}</span>
                      <span className="text-xs text-forest font-bold">{buyer.budget}</span>
                    </div>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <div className="flex items-center">
                      <div className="text-lg font-black text-forest mr-2">{buyer.matchScore}%</div>
                      <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="bg-forest h-full" style={{ width: `${buyer.matchScore}%` }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                      buyer.status === 'New Lead' ? 'bg-blue-100 text-blue-700' :
                      buyer.status === 'Catalog Sent' ? 'bg-purple-100 text-purple-700' :
                      buyer.status === 'Negotiating' ? 'bg-yellow-100 text-yellow-700' :
                      buyer.status === 'Contacted' ? 'bg-gray-100 text-gray-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {buyer.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-500 hidden lg:table-cell">
                    {buyer.lastActivity}
                  </td>
                  <td className="p-4 text-right">
                    <button className="p-2 text-gray-400 group-hover:text-forest transition-colors rounded-full hover:bg-gray-100">
                      <ChevronRight size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredBuyers.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="text-gray-300" size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-400 mb-1">No buyers found</h3>
            <p className="text-gray-500 text-sm">Try adjusting your filters or search term.</p>
          </div>
        )}
      </div>
    </div>
  );
};
