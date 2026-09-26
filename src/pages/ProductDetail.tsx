import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../store';
import { 
  ArrowLeft, 
  Edit3, 
  QrCode, 
  Sparkles,
  TrendingUp,
  Eye,
  MessageSquare,
  ShoppingCart,
  Download,
  Link as LinkIcon,
  Users
} from 'lucide-react';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products } = useApp();
  const navigate = useNavigate();
  const [showQRModal, setShowQRModal] = useState(false);
  
  const product = products.find(p => p.id === id);

  if (!product) {
    return <div className="p-8 text-center">Product not found. <button onClick={() => navigate('/catalog')} className="text-forest underline ml-2">Go back</button></div>;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      <div className="flex items-center space-x-4">
        <button onClick={() => navigate('/catalog')} className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-charcoal">Product Details</h1>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-sand overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left: Image */}
          <div className="md:w-5/12 bg-gray-100 p-6 flex flex-col justify-center">
            <img src={product.imageUrl} alt={product.name} className="w-full h-auto object-cover rounded-2xl shadow-sm" />
          </div>

          {/* Right: Info */}
          <div className="md:w-7/12 p-8 flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm font-semibold text-forest uppercase tracking-wider">{product.category}</span>
              <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                product.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                {product.status}
              </span>
            </div>
            
            <h2 className="text-3xl font-bold text-charcoal mb-4">{product.name}</h2>
            <div className="text-3xl font-bold text-forest mb-6">₹{product.price.toLocaleString()}</div>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <span className="text-xs text-gray-500 uppercase tracking-wider block mb-1">Craft</span>
                <span className="font-medium text-charcoal">{product.craft}</span>
              </div>
              <div>
                <span className="text-xs text-gray-500 uppercase tracking-wider block mb-1">Material</span>
                <span className="font-medium text-charcoal">{product.material}</span>
              </div>
              <div>
                <span className="text-xs text-gray-500 uppercase tracking-wider block mb-1">Dimensions</span>
                <span className="font-medium text-charcoal">{product.dimensions}</span>
              </div>
              <div>
                <span className="text-xs text-gray-500 uppercase tracking-wider block mb-1">Production Time</span>
                <span className="font-medium text-charcoal">{product.productionTime}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {product.tags.map((tag, idx) => (
                <span key={idx} className="px-3 py-1 bg-cream text-charcoal text-sm rounded-full border border-sand">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex gap-3 mt-auto">
              <button onClick={() => alert('Edit product functionality is simulated for this demo.')} className="flex-1 flex justify-center items-center px-4 py-3 bg-white border border-sand text-charcoal rounded-xl font-medium hover:bg-cream transition-colors">
                <Edit3 size={18} className="mr-2" /> Edit
              </button>
              <button onClick={() => setShowQRModal(true)} className="flex-1 flex justify-center items-center px-4 py-3 bg-white border border-sand text-charcoal rounded-xl font-medium hover:bg-cream transition-colors">
                <QrCode size={18} className="mr-2" /> QR Code
              </button>
              <button onClick={() => navigate('/find-buyers')} className="flex-[2] flex justify-center items-center px-4 py-3 bg-forest text-white rounded-xl font-bold shadow-md hover:bg-forest-dark transition-colors">
                <Sparkles size={18} className="mr-2" /> Find Buyers
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Performance Stats */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-sand">
          <h3 className="font-bold text-lg mb-6 flex items-center">
            <TrendingUp size={20} className="mr-2 text-forest" /> Performance
          </h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500 flex items-center"><Eye size={16} className="mr-2" /> Views</span>
                <span className="font-bold text-charcoal">{product.views}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-blue-400 h-2 rounded-full" style={{ width: '70%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500 flex items-center"><MessageSquare size={16} className="mr-2" /> Inquiries</span>
                <span className="font-bold text-charcoal">{product.inquiries}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-terracotta h-2 rounded-full" style={{ width: '40%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500 flex items-center"><ShoppingCart size={16} className="mr-2" /> Orders</span>
                <span className="font-bold text-charcoal">{product.orders}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Where this can sell */}
        <div className="bg-white rounded-3xl p-6 border border-sand shadow-sm">
          <h3 className="font-bold text-lg mb-6 flex items-center">
            <Users size={20} className="mr-2 text-terracotta" /> Market Demand
          </h3>
          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border border-gray-100">
              <span className="font-medium text-gray-700">Hotels & Hospitality</span>
              <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">High Demand</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border border-gray-100">
              <span className="font-medium text-gray-700">Interior Designers</span>
              <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">High Demand</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border border-gray-100">
              <span className="font-medium text-gray-700">Corporate Gifting</span>
              <span className="px-2.5 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full">Medium Demand</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border border-gray-100">
              <span className="font-medium text-gray-700">Exporters</span>
              <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">High Demand</span>
            </div>
          </div>
          <button onClick={() => navigate('/find-buyers')} className="w-full flex justify-center items-center px-4 py-3 bg-forest text-white rounded-xl font-bold shadow-sm hover:bg-forest-dark transition-colors">
            <Sparkles size={18} className="mr-2 text-gold" /> Find buyers for this product
          </button>
        </div>

        {/* AI Content */}
        <div className="md:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-sand">
          <h3 className="font-bold text-lg mb-6 flex items-center">
            <Sparkles size={20} className="mr-2 text-gold" /> AI Marketing Content
          </h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Product Description</h4>
              <p className="text-charcoal text-sm leading-relaxed bg-cream p-4 rounded-xl border border-sand">
                {product.aiDescription || 'No description generated yet.'}
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Instagram Caption</h4>
              <p className="text-charcoal text-sm leading-relaxed bg-cream p-4 rounded-xl border border-sand whitespace-pre-line">
                {product.instagramCaption || 'No caption generated yet.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* QR Modal */}
      {showQRModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/40 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setShowQRModal(false)}>
          <div className="bg-white rounded-3xl max-w-sm w-full p-8 text-center shadow-2xl relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowQRModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">✕</button>
            
            <h3 className="text-2xl font-bold text-charcoal mb-2">Share Product</h3>
            <p className="text-gray-500 text-sm mb-6">Scan to view this product</p>
            
            <div className="bg-cream p-4 rounded-2xl inline-block mb-6 border border-sand">
              {/* Fake QR Code visualization */}
              <div className="w-48 h-48 bg-white rounded-xl p-2 flex flex-col">
                <div className="flex-1 flex gap-1 mb-1">
                  <div className="w-1/3 bg-black rounded-tl-lg rounded-br-lg"></div>
                  <div className="w-1/3 bg-black/80 rounded-sm"></div>
                  <div className="w-1/3 bg-black rounded-tr-lg rounded-bl-lg"></div>
                </div>
                <div className="flex-1 flex gap-1 mb-1">
                  <div className="w-1/3 bg-black/70 rounded-sm"></div>
                  <div className="w-1/3 flex items-center justify-center"><Sparkles size={24} className="text-gold" /></div>
                  <div className="w-1/3 bg-black/90 rounded-sm"></div>
                </div>
                <div className="flex-1 flex gap-1">
                  <div className="w-1/3 bg-black rounded-bl-lg rounded-tr-lg"></div>
                  <div className="w-1/3 bg-black/60 rounded-sm"></div>
                  <div className="w-1/3 bg-black rounded-br-lg rounded-tl-lg"></div>
                </div>
              </div>
            </div>

            <div className="font-bold text-lg text-forest mb-1">Meera Tribal Crafts</div>
            <div className="text-sm font-medium text-gray-500 mb-8">{product.name}</div>

            <div className="flex gap-3">
              <button onClick={() => alert('QR Code downloaded successfully.')} className="flex-1 flex flex-col items-center justify-center py-3 bg-cream rounded-xl text-forest font-medium hover:bg-sand transition-colors border border-sand">
                <Download size={20} className="mb-1" />
                <span className="text-xs">Download</span>
              </button>
              <button onClick={() => alert('Link copied to clipboard!')} className="flex-1 flex flex-col items-center justify-center py-3 bg-cream rounded-xl text-forest font-medium hover:bg-sand transition-colors border border-sand">
                <LinkIcon size={20} className="mb-1" />
                <span className="text-xs">Copy Link</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
