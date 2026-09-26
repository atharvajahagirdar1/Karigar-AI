import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { aiClient } from '../services/aiClient';
import { 
  Sparkles, 
  Search,
  Building2,
  MapPin,
  ShieldCheck,
  Send,
  Loader2,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import type { Buyer } from '../types';
import { useApp } from '../store';

const SEARCH_STAGES = [
  "Understanding your products...",
  "Analyzing buyer requirements...",
  "Matching craft & category...",
  "Checking price compatibility...",
  "Checking quantity requirements...",
  "Finding best opportunities..."
];

export const FindBuyers: React.FC = () => {
  const navigate = useNavigate();
  const { addActivity } = useApp();
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<Buyer[] | null>(null);
  
  const [loadingStage, setLoadingStage] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setTimeout>;
    if (isSearching) {
      setLoadingStage(0);
      interval = setInterval(() => {
        setLoadingStage(prev => {
          if (prev < SEARCH_STAGES.length - 1) return prev + 1;
          clearInterval(interval);
          return prev;
        });
      }, 600); // Progress through stages quickly
    }
    return () => clearInterval(interval);
  }, [isSearching]);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    setResults(null);
    
    // The backend matching logic
    const found = await aiClient.findBuyers(query);
    
    setIsSearching(false);
    setResults(found.data);
    
    addActivity({
      id: Date.now().toString(),
      title: `AI matched ${found.data.length} buyers for "${query.substring(0, 20)}..."`,
      timestamp: 'Just now',
      type: 'match'
    });
  };

  const handleQuickPrompt = (prompt: string) => {
    setQuery(prompt);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">
      
      {!results && !isSearching && (
        <div className="text-center py-12 px-4">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-green-100">
            <Sparkles size={32} className="text-forest" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-forest-dark mb-4 tracking-tight">Find Me Buyers</h1>
          <p className="text-lg text-gray-600 mb-10 max-w-xl mx-auto">Tell Karigar AI what you want to sell. We'll find the businesses that need it.</p>
          
          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto group">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <Search className="text-gray-400 group-focus-within:text-forest transition-colors" size={24} />
            </div>
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-16 pr-32 py-5 bg-white border-2 border-sand rounded-3xl text-lg text-charcoal focus:outline-none focus:border-forest/50 focus:ring-4 focus:ring-forest/10 transition-all shadow-sm"
              placeholder="e.g., I have 20 Gond wall panels and want bulk buyers."
            />
            <button 
              type="submit"
              disabled={!query.trim()}
              className="absolute inset-y-2 right-2 px-6 bg-forest text-white font-bold rounded-2xl hover:bg-forest-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              Search
            </button>
          </form>

          <div className="mt-10 flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            <button onClick={() => handleQuickPrompt("Find hotels for my wall art")} className="px-5 py-2.5 bg-white border border-sand text-gray-600 text-sm font-medium rounded-full hover:bg-cream hover:border-forest/30 transition-all shadow-sm">
              "Find hotels for my wall art"
            </button>
            <button onClick={() => handleQuickPrompt("Find corporate gifting buyers")} className="px-5 py-2.5 bg-white border border-sand text-gray-600 text-sm font-medium rounded-full hover:bg-cream hover:border-forest/30 transition-all shadow-sm">
              "Find corporate gifting buyers"
            </button>
            <button onClick={() => handleQuickPrompt("Find export opportunities")} className="px-5 py-2.5 bg-white border border-sand text-gray-600 text-sm font-medium rounded-full hover:bg-cream hover:border-forest/30 transition-all shadow-sm">
              "Find export opportunities"
            </button>
            <button onClick={() => handleQuickPrompt("Find interior designers")} className="px-5 py-2.5 bg-white border border-sand text-gray-600 text-sm font-medium rounded-full hover:bg-cream hover:border-forest/30 transition-all shadow-sm">
              "Find interior designers"
            </button>
          </div>
        </div>
      )}

      {isSearching && (
        <div className="bg-white p-12 rounded-3xl border border-sand shadow-sm text-center max-w-2xl mx-auto mt-12 animate-in zoom-in-95 duration-300">
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-50"></div>
            <div className="relative bg-forest text-white w-24 h-24 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
              <Sparkles size={40} className="animate-pulse" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-charcoal mb-8">AI is searching...</h3>
          
          <div className="space-y-4 max-w-sm mx-auto text-left">
            {SEARCH_STAGES.map((stage, idx) => (
              <div 
                key={idx} 
                className={`flex items-center transition-all duration-500 ${
                  idx < loadingStage ? 'text-forest opacity-100' : 
                  idx === loadingStage ? 'text-charcoal font-medium opacity-100' : 'text-gray-300 opacity-50'
                }`}
              >
                {idx < loadingStage ? (
                  <CheckCircle2 size={20} className="mr-3 shrink-0" />
                ) : idx === loadingStage ? (
                  <Loader2 size={20} className="mr-3 shrink-0 animate-spin text-forest" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-gray-200 mr-3 shrink-0"></div>
                )}
                <span>{stage}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {results && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
             <div>
                <h2 className="text-3xl font-bold text-forest-dark">{results.length} high-potential buyers found</h2>
                <p className="text-gray-600 mt-1">Based on your query: "{query}"</p>
             </div>
             <button onClick={() => setResults(null)} className="text-forest font-medium hover:underline text-sm bg-green-50 px-4 py-2 rounded-xl">
               New Search
             </button>
          </div>

          <div className="space-y-6">
            {results.map((buyer) => (
              <div key={buyer.id} className="bg-white rounded-3xl p-6 md:p-8 border border-sand shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row gap-8 relative overflow-hidden group">
                {/* AI Match prominent badge */}
                <div className="absolute top-0 right-0 bg-gradient-to-bl from-green-100 to-white p-6 md:p-8 rounded-bl-[4rem] text-center w-32 md:w-40 border-b border-l border-green-50 group-hover:bg-green-50 transition-colors">
                   <div className="text-3xl md:text-4xl font-black text-forest">{buyer.matchScore}%</div>
                   <div className="text-xs font-bold tracking-wider text-green-700 mt-1">AI MATCH</div>
                </div>

                <div className="flex-1 md:pr-40">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mr-4 border border-blue-100">
                      <Building2 size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-charcoal flex items-center">
                        {buyer.name}
                        {buyer.verified && <span title="Verified Buyer" className="ml-2"><ShieldCheck size={20} className="text-blue-500" /></span>}
                      </h3>
                      <div className="text-sm font-medium text-gray-500 flex items-center mt-1">
                         {buyer.type} <span className="mx-2">•</span> <MapPin size={14} className="mr-1" /> {buyer.location}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 p-5 bg-gray-50 rounded-2xl border border-gray-100">
                    <div>
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Looking For</h4>
                      <p className="text-charcoal font-medium">{buyer.requirements}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Budget</h4>
                      <p className="text-charcoal font-medium">{buyer.budget}</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-sm font-bold text-charcoal mb-3 flex items-center">
                       <Sparkles size={16} className="text-gold mr-2" /> Why this is a good match:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <CheckCircle2 size={16} className="text-green-500 mr-2 shrink-0" /> Craft style matches
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <CheckCircle2 size={16} className="text-green-500 mr-2 shrink-0" /> Price fits buyer budget
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <CheckCircle2 size={16} className="text-green-500 mr-2 shrink-0" /> Bulk quantity available
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <CheckCircle2 size={16} className="text-green-500 mr-2 shrink-0" /> Current high demand
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 mt-8">
                    <button 
                      onClick={() => navigate(`/buyers/${buyer.id}`)}
                      className="px-6 py-3 bg-white text-forest border-2 border-sand font-bold rounded-xl hover:bg-cream transition-colors flex items-center justify-center shadow-sm"
                    >
                      Why This Match? <ArrowRight size={18} className="ml-2" />
                    </button>
                    <button 
                      onClick={() => navigate(`/buyers/${buyer.id}`)}
                      className="px-6 py-3 bg-terracotta text-white font-bold rounded-xl hover:bg-orange-700 transition-colors flex items-center justify-center shadow-md"
                    >
                      <Send size={18} className="mr-2" /> Send Catalog
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
