import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../store';
import { 
  ArrowLeft,
  Building2,
  MapPin,
  Clock,
  CheckCircle2,
  Send,
  MessageCircle,
  Copy,
  Sparkles,
  Phone,
  Mail,
  Calendar
} from 'lucide-react';
import { aiClient } from '../services/aiClient';

export const BuyerDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { buyers, products, updateBuyerStatus, addActivity } = useApp();
  const navigate = useNavigate();
  
  const [showCatalogModal, setShowCatalogModal] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  
  const buyer = buyers.find(b => b.id === id);

  const [aiExplanation, setAiExplanation] = useState<string>("Loading explanation...");
  const [outreachMessage, setOutreachMessage] = useState<string>("Loading message...");

  useEffect(() => {
    if (buyer) {
      // We don't have a specific product selected, but we use the first product as context or pass undefined.
      // Usually, the artisan would select a product, but for the detail page, we just pass general info.
      const product = products[0] || { name: 'handcrafted goods' };
      
      aiClient.buyerExplanation(product, buyer).then(res => {
        if (res.data?.aiExplanation) {
          setAiExplanation(res.data.aiExplanation);
        }
      });
      
      aiClient.generateOutreach({ name: 'Meera', location: 'Madhya Pradesh' }, product, buyer).then(res => {
        if (res.data?.email) {
          setOutreachMessage(res.data.email);
        }
      });
    }
  }, [buyer]);

  if (!buyer) return <div className="p-8 text-center">Buyer not found.</div>;

  const handleSendCatalog = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setSendSuccess(true);
      updateBuyerStatus(buyer.id, 'Catalog Sent');
      addActivity({
        id: Date.now().toString(),
        title: `Catalog sent to ${buyer.name}`,
        timestamp: 'Just now',
        type: 'catalog'
      });
    }, 1500);
  };
  
  const finishSuccess = () => {
    setShowCatalogModal(false);
    setSendSuccess(false);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'New Lead': return 'bg-blue-100 text-blue-700';
      case 'Catalog Sent': return 'bg-purple-100 text-purple-700';
      case 'Negotiating': return 'bg-orange-100 text-orange-700';
      case 'Ordered': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate(-1)} className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-charcoal">Buyer Details</h1>
        </div>
        <span className={`px-4 py-1.5 text-sm font-bold rounded-full border border-current/20 ${getStatusColor(buyer.status)}`}>
          {buyer.status}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-8 border border-sand shadow-sm relative overflow-hidden">
            {buyer.status === 'New Lead' && (
              <div className="absolute top-0 right-0 bg-green-50 px-6 py-2 rounded-bl-2xl font-bold text-forest text-sm border-b border-l border-green-100">
                New Opportunity
              </div>
            )}
            <div className="flex items-start mb-6 pt-2">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mr-5 border border-blue-100 shadow-inner">
                <Building2 size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-charcoal mb-2">{buyer.name}</h1>
                <div className="flex flex-wrap gap-4 text-gray-500 font-medium text-sm">
                  <span className="flex items-center"><Building2 size={16} className="mr-1.5" /> {buyer.type}</span>
                  <span className="flex items-center"><MapPin size={16} className="mr-1.5" /> {buyer.location}</span>
                  <span className="flex items-center"><Clock size={16} className="mr-1.5" /> Active {buyer.lastActivity}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Requirements</h4>
                <p className="text-charcoal font-medium">{buyer.requirements}</p>
              </div>
              <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Budget Range</h4>
                <p className="text-charcoal font-medium">{buyer.budget}</p>
              </div>
            </div>
            
            <div className="mt-8 flex gap-4">
              <button 
                onClick={() => setShowCatalogModal(true)}
                className="flex-1 px-6 py-4 bg-terracotta text-white font-bold rounded-2xl shadow-md hover:bg-orange-700 transition-colors flex items-center justify-center text-lg"
              >
                <Send size={20} className="mr-3" /> Send Custom Catalog
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-3xl p-8 border border-sand shadow-sm">
            <h3 className="font-bold text-lg mb-6 flex items-center">
              <MessageCircle size={20} className="mr-2 text-forest" /> AI Generate Outreach Message
            </h3>
            
            <div className="bg-cream rounded-2xl p-6 border border-sand mb-4 relative group">
              <div className="absolute top-4 right-4 text-gray-400 hover:text-forest cursor-pointer bg-white p-2 rounded-xl shadow-sm border border-gray-100 transition-colors" title="Copy Message">
                <Copy size={16} />
              </div>
              <p className="text-gray-700 leading-relaxed font-medium whitespace-pre-wrap">
                {outreachMessage}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500 font-medium">AI generated based on buyer requirements.</p>
              <div className="flex gap-3">
                 <button className="px-4 py-2 bg-white border border-sand rounded-xl font-medium text-charcoal hover:bg-gray-50 transition-colors">Edit</button>
                 <button className="px-4 py-2 bg-forest text-white rounded-xl font-medium hover:bg-forest-dark transition-colors flex items-center">
                    <CheckCircle2 size={16} className="mr-2" /> Mark Contacted
                 </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div className="bg-gradient-to-b from-green-50 to-white rounded-3xl p-6 border border-green-100 shadow-sm text-center relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4">
                <Sparkles className="text-green-300 opacity-50 w-16 h-16" />
             </div>
             <h3 className="text-sm font-bold text-green-700 uppercase tracking-wider mb-2 relative z-10">AI Match Score</h3>
             <div className="text-6xl font-black text-forest my-4 relative z-10">{buyer.matchScore}%</div>
             
             <div className="space-y-3 mt-6 text-left relative z-10">
                <div className="flex justify-between text-sm">
                   <span className="text-gray-600 font-medium">Craft Compatibility</span>
                   <span className="font-bold text-forest">96%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5"><div className="bg-forest h-1.5 rounded-full" style={{width: '96%'}}></div></div>

                <div className="flex justify-between text-sm mt-3">
                   <span className="text-gray-600 font-medium">Price Compatibility</span>
                   <span className="font-bold text-forest">91%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5"><div className="bg-forest h-1.5 rounded-full" style={{width: '91%'}}></div></div>

                <div className="flex justify-between text-sm mt-3">
                   <span className="text-gray-600 font-medium">Quantity Fit</span>
                   <span className="font-bold text-forest">94%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5"><div className="bg-forest h-1.5 rounded-full" style={{width: '94%'}}></div></div>

                <div className="flex justify-between text-sm mt-3">
                   <span className="text-gray-600 font-medium">Location & Logistics</span>
                   <span className="font-bold text-forest">88%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5"><div className="bg-forest h-1.5 rounded-full" style={{width: '88%'}}></div></div>
             </div>
             
             <div className="bg-white p-4 rounded-xl mt-6 border border-green-100 shadow-sm text-left text-sm text-gray-700">
                <p className="font-medium">
                  <strong className="text-forest">AI Analysis:</strong> {aiExplanation}
                </p>
             </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-sand shadow-sm">
             <h3 className="font-bold text-lg mb-4 text-charcoal">Buyer Contact Details</h3>
             <div className="space-y-4">
                <div className="flex items-center p-3 bg-gray-50 rounded-xl">
                   <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3 shadow-sm text-forest"><Phone size={18} /></div>
                   <div>
                     <p className="text-xs text-gray-500 font-bold uppercase">Phone</p>
                     <p className="font-medium text-charcoal">+91 98765 XXXXX <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded ml-2">Available after contact</span></p>
                   </div>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-xl">
                   <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3 shadow-sm text-forest"><Mail size={18} /></div>
                   <div>
                     <p className="text-xs text-gray-500 font-bold uppercase">Email</p>
                     <p className="font-medium text-charcoal">procurement@{buyer.name.toLowerCase().replace(/\s/g, '')}.com</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Catalog Modal */}
      {showCatalogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-0 shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="text-xl font-bold text-charcoal">Send Catalog to {buyer.name}</h3>
              <button onClick={() => !isSending && !sendSuccess && setShowCatalogModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              {!sendSuccess ? (
                <>
                  <div className="mb-6">
                    <h4 className="font-bold text-charcoal mb-3 text-sm">Select Products to Include</h4>
                    <div className="space-y-3">
                      {products.map(p => (
                        <label key={p.id} className="flex items-center p-3 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="w-5 h-5 text-forest rounded border-gray-300 focus:ring-forest mr-4"
                            checked={selectedProducts.includes(p.id)}
                            onChange={(e) => {
                              if (e.target.checked) setSelectedProducts([...selectedProducts, p.id]);
                              else setSelectedProducts(selectedProducts.filter(id => id !== p.id));
                            }}
                          />
                          <img src={p.imageUrl} alt={p.name} className="w-12 h-12 rounded-lg object-cover mr-4" />
                          <div>
                            <p className="font-medium text-charcoal">{p.name}</p>
                            <p className="text-xs text-gray-500">₹{p.price.toLocaleString()}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-charcoal mb-3 text-sm">Message Attached</h4>
                    <textarea 
                      className="w-full p-4 border border-gray-200 rounded-xl text-sm text-gray-700 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-forest/20 outline-none transition-colors"
                      rows={4}
                      defaultValue={`Hello, we are Meera Tribal Crafts from Madhya Pradesh. We specialize in handcrafted Gond and tribal artworks. Attached is a custom catalog featuring pieces that match your requirement for traditional Indian wall art.`}
                    />
                  </div>
                </>
              ) : (
                <div className="py-12 text-center animate-in zoom-in-95 duration-300">
                  <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={48} className="text-green-500" />
                  </div>
                  <h3 className="text-3xl font-bold text-charcoal mb-4">Catalog Sent Successfully!</h3>
                  <p className="text-gray-500 mb-8 max-w-md mx-auto">
                    {buyer.name} will receive your custom catalog. We've updated the status of this lead.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-center justify-center max-w-sm mx-auto mb-8">
                    <Calendar className="text-blue-500 mr-3" size={20} />
                    <span className="text-blue-700 font-medium text-sm">AI follow-up scheduled in 3 days</span>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 mt-auto">
              {!sendSuccess ? (
                <>
                  <button 
                    onClick={() => setShowCatalogModal(false)}
                    disabled={isSending}
                    className="px-6 py-2.5 bg-white border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSendCatalog}
                    disabled={isSending || selectedProducts.length === 0}
                    className="px-6 py-2.5 bg-forest text-white rounded-xl font-bold hover:bg-forest-dark transition-colors disabled:opacity-50 flex items-center min-w-[140px] justify-center"
                  >
                    {isSending ? <span className="animate-pulse">Sending...</span> : 'Send Catalog'}
                  </button>
                </>
              ) : (
                <button 
                  onClick={finishSuccess}
                  className="px-8 py-3 bg-forest text-white rounded-xl font-bold hover:bg-forest-dark transition-colors w-full"
                >
                  Done
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
