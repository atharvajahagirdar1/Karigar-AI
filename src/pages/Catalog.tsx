import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../store';
import { 
  PlusCircle,
  Search, 
  Filter, 
  Eye, 
  MessageSquare,
  QrCode,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Download
} from 'lucide-react';

export const Catalog: React.FC = () => {
  const { products } = useApp();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  // AI Catalog Builder State
  const [showBuilder, setShowBuilder] = useState(false);
  const [builderStep, setBuilderStep] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedStyle, setSelectedStyle] = useState('Premium');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setIsDone(true);
    }, 2500);
  };

  const closeBuilder = () => {
    setShowBuilder(false);
    setTimeout(() => {
      setBuilderStep(1);
      setIsGenerating(false);
      setIsDone(false);
      setSelectedProducts([]);
    }, 300);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-forest-dark">My Catalog</h1>
          <p className="text-gray-600">Manage everything you're selling.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowBuilder(true)}
            className="px-4 py-2 bg-white text-forest border border-forest font-medium rounded-xl hover:bg-forest/5 transition-colors flex items-center shadow-sm"
          >
            <Sparkles size={18} className="mr-2 text-gold" />
            AI Catalog Builder
          </button>
          <button 
            onClick={() => navigate('/catalog/new')}
            className="px-4 py-2 bg-forest text-white font-medium rounded-xl hover:bg-forest-dark transition-colors flex items-center shadow-md"
          >
            <PlusCircle size={18} className="mr-2" /> Add Product
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white p-4 rounded-2xl shadow-sm border border-sand">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-cream border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-forest/20 transition-all"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          {['All', 'Wall Art', 'Home Decor', 'Textiles', 'Jewelry'].map(filter => (
            <button key={filter} className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap ${filter === 'All' ? 'bg-forest text-white' : 'bg-cream text-charcoal hover:bg-sand transition-colors border border-sand'}`}>
              {filter}
            </button>
          ))}
          <button className="px-3 py-2 bg-cream rounded-xl text-charcoal hover:bg-sand transition-colors border border-sand">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <div 
            key={product.id} 
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-sand hover:shadow-md transition-all group cursor-pointer"
            onClick={() => navigate(`/catalog/${product.id}`)}
          >
            <div className="relative aspect-square overflow-hidden bg-gray-100">
              <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-3 left-3">
                <span className={`px-2.5 py-1 text-xs font-bold rounded-lg shadow-sm ${
                  product.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {product.status}
                </span>
              </div>
            </div>
            
            <div className="p-4">
              <div className="text-xs text-gray-500 mb-1">{product.category}</div>
              <h3 className="font-bold text-charcoal mb-2 leading-tight line-clamp-2">{product.name}</h3>
              <div className="text-lg font-bold text-forest mb-4">₹{product.price.toLocaleString()}</div>
              
              <div className="flex items-center justify-between text-sm text-gray-500 pt-3 border-t border-gray-100">
                <div className="flex items-center" title="Views"><Eye size={14} className="mr-1.5" /> {product.views}</div>
                <div className="flex items-center text-terracotta font-medium" title="Inquiries"><MessageSquare size={14} className="mr-1.5" /> {product.inquiries}</div>
                <button 
                  className="text-gray-400 hover:text-forest transition-colors" 
                  title="Generate QR"
                  onClick={(e) => { e.stopPropagation(); navigate(`/catalog/${product.id}`); }}
                >
                  <QrCode size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl border border-sand">
          <div className="w-16 h-16 bg-cream rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="text-gray-400" size={24} />
          </div>
          <h3 className="text-xl font-bold text-charcoal mb-2">No products found</h3>
          <p className="text-gray-500 mb-6">Try adjusting your search or add a new product.</p>
          <button onClick={() => navigate('/catalog/new')} className="px-6 py-2 bg-forest text-white font-medium rounded-xl">
            Add Product
          </button>
        </div>
      )}

      {/* AI Catalog Builder Modal */}
      {showBuilder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-4xl w-full p-0 shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 shrink-0">
              <h3 className="text-xl font-bold text-charcoal flex items-center">
                <Sparkles size={20} className="mr-2 text-gold" /> AI Catalog Builder
              </h3>
              <button onClick={closeBuilder} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            
            <div className="flex flex-1 overflow-hidden">
              {/* Sidebar Progress */}
              <div className="w-64 bg-cream border-r border-sand p-6 hidden md:block">
                <div className="space-y-6">
                  <div className={`flex items-center ${builderStep >= 1 ? 'text-forest' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 font-bold border-2 ${builderStep >= 1 ? 'border-forest bg-forest text-white' : 'border-gray-300'}`}>1</div>
                    <span className="font-medium">Select Products</span>
                  </div>
                  <div className={`flex items-center ${builderStep >= 2 ? 'text-forest' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 font-bold border-2 ${builderStep >= 2 ? 'border-forest bg-forest text-white' : 'border-gray-300'}`}>2</div>
                    <span className="font-medium">Language</span>
                  </div>
                  <div className={`flex items-center ${builderStep >= 3 ? 'text-forest' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 font-bold border-2 ${builderStep >= 3 ? 'border-forest bg-forest text-white' : 'border-gray-300'}`}>3</div>
                    <span className="font-medium">Style</span>
                  </div>
                  <div className={`flex items-center ${builderStep >= 4 ? 'text-forest' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 font-bold border-2 ${builderStep >= 4 ? 'border-forest bg-forest text-white' : 'border-gray-300'}`}>4</div>
                    <span className="font-medium">Preview</span>
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 overflow-y-auto p-8 relative">
                {builderStep === 1 && (
                  <div className="animate-in slide-in-from-right-8 duration-300">
                    <h2 className="text-2xl font-bold text-charcoal mb-2">Which products to include?</h2>
                    <p className="text-gray-500 mb-6">Select the products you want to feature in this catalog.</p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {products.map(p => (
                        <label key={p.id} className={`flex items-center p-3 border-2 rounded-2xl cursor-pointer transition-colors ${selectedProducts.includes(p.id) ? 'border-forest bg-green-50/50' : 'border-gray-100 hover:border-forest/30'}`}>
                          <input 
                            type="checkbox" 
                            className="hidden"
                            checked={selectedProducts.includes(p.id)}
                            onChange={(e) => {
                              if (e.target.checked) setSelectedProducts([...selectedProducts, p.id]);
                              else setSelectedProducts(selectedProducts.filter(id => id !== p.id));
                            }}
                          />
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 shrink-0 ${selectedProducts.includes(p.id) ? 'border-forest bg-forest text-white' : 'border-gray-300'}`}>
                            {selectedProducts.includes(p.id) && <CheckCircle2 size={16} />}
                          </div>
                          <img src={p.imageUrl} className="w-12 h-12 rounded-lg object-cover mr-3" />
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-charcoal truncate text-sm">{p.name}</p>
                            <p className="text-xs text-forest font-medium">₹{p.price.toLocaleString()}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {builderStep === 2 && (
                  <div className="animate-in slide-in-from-right-8 duration-300">
                    <h2 className="text-2xl font-bold text-charcoal mb-2">Choose Catalog Language</h2>
                    <p className="text-gray-500 mb-6">Karigar AI will automatically translate descriptions.</p>
                    
                    <div className="space-y-4 max-w-md">
                      {['English', 'हिंदी (Hindi)', 'English + हिंदी (Bilingual)'].map(lang => (
                        <label key={lang} className={`flex items-center p-5 border-2 rounded-2xl cursor-pointer transition-colors ${selectedLanguage === lang ? 'border-forest bg-green-50/50' : 'border-gray-100 hover:border-forest/30'}`}>
                          <input 
                            type="radio" 
                            name="language"
                            className="hidden"
                            checked={selectedLanguage === lang}
                            onChange={() => setSelectedLanguage(lang)}
                          />
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 shrink-0 ${selectedLanguage === lang ? 'border-forest bg-forest text-white' : 'border-gray-300'}`}>
                            {selectedLanguage === lang && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
                          </div>
                          <span className="font-bold text-charcoal text-lg">{lang}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {builderStep === 3 && (
                  <div className="animate-in slide-in-from-right-8 duration-300">
                    <h2 className="text-2xl font-bold text-charcoal mb-2">Choose Visual Style</h2>
                    <p className="text-gray-500 mb-6">Select a theme that matches your brand.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[
                        { id: 'Minimal', desc: 'Clean, modern, lots of whitespace' },
                        { id: 'Traditional', desc: 'Warm earthy colors, classic layouts' },
                        { id: 'Premium', desc: 'Dark accents, elegant typography' }
                      ].map(style => (
                        <label key={style.id} className={`flex flex-col p-4 border-2 rounded-2xl cursor-pointer transition-colors text-center ${selectedStyle === style.id ? 'border-forest bg-green-50/50' : 'border-gray-100 hover:border-forest/30'}`}>
                          <input 
                            type="radio" 
                            name="style"
                            className="hidden"
                            checked={selectedStyle === style.id}
                            onChange={() => setSelectedStyle(style.id)}
                          />
                          <div className="w-full h-32 bg-gray-100 rounded-xl mb-4 relative overflow-hidden">
                             {/* Mock style preview blocks */}
                             {style.id === 'Minimal' && <div className="absolute inset-0 bg-white"><div className="w-1/2 h-full bg-gray-50 absolute right-0"></div><div className="w-10 h-10 bg-gray-200 rounded-full absolute top-2 left-2"></div></div>}
                             {style.id === 'Traditional' && <div className="absolute inset-0 bg-[#F5EBDD]"><div className="w-full h-10 bg-[#C96B4B] absolute top-0"></div><div className="w-16 h-16 bg-white rounded absolute top-12 left-1/2 -translate-x-1/2"></div></div>}
                             {style.id === 'Premium' && <div className="absolute inset-0 bg-[#183C2B]"><div className="w-20 h-20 bg-gray-800 rounded absolute bottom-0 right-0"></div><div className="w-10 h-1 bg-[#D7A84B] absolute top-4 left-4"></div></div>}
                          </div>
                          <span className="font-bold text-charcoal">{style.id}</span>
                          <span className="text-xs text-gray-500 mt-1">{style.desc}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {builderStep === 4 && (
                  <div className="animate-in fade-in duration-500 h-full flex flex-col items-center justify-center text-center">
                    {!isDone ? (
                      <div className="max-w-sm w-full">
                        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner relative overflow-hidden">
                           <div className="absolute inset-0 bg-forest/10 animate-pulse"></div>
                           <Sparkles size={32} className="text-forest relative z-10 animate-spin-slow" />
                        </div>
                        <h2 className="text-2xl font-bold text-charcoal mb-4">AI is generating your catalog...</h2>
                        <div className="w-full bg-gray-100 rounded-full h-2 mb-2 overflow-hidden">
                          <div className="bg-forest h-2 rounded-full transition-all duration-[2500ms] ease-out w-full" style={{ width: isGenerating ? '100%' : '0%' }}></div>
                        </div>
                        <p className="text-sm text-gray-500">Applying {selectedStyle} theme & translating to {selectedLanguage}...</p>
                      </div>
                    ) : (
                      <div className="w-full animate-in zoom-in-95 duration-300 flex flex-col md:flex-row items-center justify-center gap-8">
                         <div className="w-64 h-80 bg-white shadow-2xl border border-gray-200 rounded-sm relative overflow-hidden transform rotate-2 hover:rotate-0 transition-transform cursor-pointer">
                            {/* Fake PDF Cover */}
                            <div className="absolute top-0 w-full h-32 bg-forest-dark"></div>
                            <div className="absolute top-8 left-8 right-8 text-left">
                               <h1 className="text-white text-xl font-serif">Meera Tribal Crafts</h1>
                               <div className="w-8 h-0.5 bg-gold mt-2"></div>
                            </div>
                            <div className="absolute top-40 left-8 right-8 space-y-2">
                               <div className="w-full h-20 bg-gray-100 flex gap-2 p-1">
                                  <div className="w-1/2 h-full bg-gray-300"></div>
                                  <div className="w-1/2 h-full bg-gray-300"></div>
                                </div>
                               <div className="w-3/4 h-2 bg-gray-200 mt-4"></div>
                               <div className="w-1/2 h-2 bg-gray-200"></div>
                            </div>
                         </div>
                         <div className="text-left max-w-sm">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                              <CheckCircle2 size={24} className="text-green-600" />
                            </div>
                            <h2 className="text-3xl font-bold text-charcoal mb-2">Catalog Ready!</h2>
                            <p className="text-gray-600 mb-6">Your beautiful, professional PDF catalog is ready to be shared with buyers via WhatsApp or Email.</p>
                            
                            <div className="flex gap-3">
                              <button className="px-6 py-3 bg-forest text-white rounded-xl font-bold hover:bg-forest-dark transition-colors flex items-center shadow-md">
                                <Download size={18} className="mr-2" /> Download PDF
                              </button>
                            </div>
                         </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Footer Navigation */}
            {builderStep < 4 && (
              <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-between shrink-0">
                <button 
                  onClick={() => builderStep > 1 ? setBuilderStep(builderStep - 1) : closeBuilder()}
                  className="px-6 py-2.5 bg-white border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-100"
                >
                  {builderStep === 1 ? 'Cancel' : 'Back'}
                </button>
                <button 
                  onClick={() => {
                    if (builderStep === 3) handleGenerate();
                    setBuilderStep(builderStep + 1);
                  }}
                  disabled={(builderStep === 1 && selectedProducts.length === 0)}
                  className="px-6 py-2.5 bg-forest text-white rounded-xl font-bold hover:bg-forest-dark transition-colors flex items-center shadow-sm disabled:opacity-50"
                >
                  {builderStep === 3 ? 'Generate Catalog' : 'Next Step'} <ChevronRight size={18} className="ml-1" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
