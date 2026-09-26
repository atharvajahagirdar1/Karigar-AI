import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../store';
import { aiClient } from '../services/aiClient';
import { 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight, 
  Loader2,
  Copy,
  Mic,
  Square,
  Check,
  Search
} from 'lucide-react';
import type { Product } from '../types';

const UNDERSTANDING_STAGES = [
  "Identifying product...",
  "Detecting material...",
  "Identifying craft...",
  "Understanding production time...",
  "Identifying category...",
  "Identifying region...",
  "Understanding handmade characteristics..."
];

export const AddProduct: React.FC = () => {
  const navigate = useNavigate();
  const { addProduct, addActivity, simpleMode } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isUnderstanding, setIsUnderstanding] = useState(false);
  const [understandingStage, setUnderstandingStage] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [enhanced, setEnhanced] = useState(false);
  
  const [voiceText, setVoiceText] = useState("");
  
  const [productData, setProductData] = useState<Partial<Product>>({
    name: '',
    aiDescription: '',
    category: '',
    price: 0,
    tags: []
  });

  const [pricingData, setPricingData] = useState({
    material: 300,
    labor: 400,
    other: 100,
  });

  const totalCost = pricingData.material + pricingData.labor + pricingData.other;
  const suggestedRange = [1299, 1499];

  // Recording Timer
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  // AI Understanding Progress
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isUnderstanding) {
      setUnderstandingStage(0);
      interval = setInterval(() => {
        setUnderstandingStage(prev => {
          if (prev < UNDERSTANDING_STAGES.length - 1) return prev + 1;
          clearInterval(interval);
          return prev;
        });
      }, 300); // Fast mock
    }
    return () => clearInterval(interval);
  }, [isUnderstanding]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setEnhanced(false);
    }
  };

  const handleDemoProduct = () => {
    setPreviewUrl('/images/gond_wall_panel.jpg');
    setEnhanced(false);
  };

  const simulateEnhancement = () => {
    setIsEnhancing(true);
    setTimeout(() => {
      setIsEnhancing(false);
      setEnhanced(true);
    }, 2000);
  };

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setVoiceText("यह हाथ से बनी हुई गोंड कला की दीवार पेंटिंग है। इसे बनाने में लगभग दो दिन लगते हैं। इसमें प्राकृतिक रंगों का इस्तेमाल किया गया है। यह मध्य प्रदेश के कारीगरों द्वारा बनाई गई है।");
  };

  const loadDemoVoice = () => {
    setVoiceText("यह हाथ से बनी हुई गोंड कला की दीवार पेंटिंग है। इसे बनाने में लगभग दो दिन लगते हैं। इसमें प्राकृतिक रंगों का इस्तेमाल किया गया है। यह मध्य प्रदेश के कारीगरों द्वारा बनाई गई है।");
  };

  const handleProcessVoice = async () => {
    setStep(3);
    setIsUnderstanding(true);
    
    // API call for product details (first analyze image if any, then text, but we'll combine here for demo)
    const result = await aiClient.analyzeProductImage(previewUrl || '', true);
    // Actually the mock returns the structured data directly.
    const productInfo = result.data;
    
    // Now generate bilingual listing
    const listing = await aiClient.generateListing(productInfo);
    
    // Now get pricing
    const pricing = await aiClient.pricingExplanation({
      category: productInfo.category,
      materialCost: pricingData.material,
      laborCost: pricingData.labor,
      otherCost: pricingData.other
    });
    
    setIsUnderstanding(false);
    
    setProductData({
      ...productInfo,
      name: listing.data?.en?.title || productInfo.name,
      aiDescription: listing.data?.en?.longDescription || productInfo.aiDescription,
      category: productInfo.category || 'Wall Art',
      tags: listing.data?.en?.tags || productInfo.tags || [],
      price: pricing.data?.suggestedPrice || 1399
    });
  };

  const handlePublish = () => {
    const newProduct: Product = {
      id: `p_${Date.now()}`,
      name: productData.name || 'Untitled',
      aiDescription: productData.aiDescription || '',
      category: productData.category || 'Other',
      price: productData.price || 0,
      imageUrl: previewUrl || '',
      tags: productData.tags || [],
      craft: 'Gond Art',
      material: 'Canvas & Natural Colors',
      dimensions: 'Standard',
      productionTime: '2 Days',
      views: 0,
      inquiries: 0,
      orders: 0,
      status: 'Published',
      instagramCaption: `Enhance your space with this stunning ${productData.name}. Made with love by Meera Tribal Crafts in Madhya Pradesh. ✨\n\n${productData.tags?.join(' ')}`
    };
    addProduct(newProduct);
    
    addActivity({
      id: Date.now().toString(),
      title: `${newProduct.name} published`,
      timestamp: 'Just now',
      type: 'product'
    });
    
    navigate('/catalog');
  };

  // --- RENDERING HELPERS ---

  const renderStepIndicator = () => {
    const labels = ["Photo", "Tell", "Understand", "Price", "Ready"];
    return (
      <div className="flex items-center justify-between mb-8 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 -z-10 rounded-full"></div>
        <div className={`absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-forest -z-10 rounded-full transition-all duration-500`} style={{ width: `${((step - 1) / 4) * 100}%` }}></div>
        
        {[1, 2, 3, 4, 5].map((s) => (
          <div key={s} className="flex flex-col items-center">
            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-xs md:text-sm transition-colors border-4 border-cream shadow-sm ${
              step >= s ? 'bg-forest text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {step > s ? <Check size={16} /> : s}
            </div>
            <span className={`text-[10px] md:text-xs mt-1 font-medium ${step >= s ? 'text-forest' : 'text-gray-400'}`}>
              {labels[s-1]}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto pb-12 animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-forest-dark mb-2">
          {simpleMode ? 'Take Product Photo' : 'Add Product'}
        </h1>
        <p className="text-gray-600">Take a photo. Tell us about it. We'll do the rest.</p>
      </div>

      {renderStepIndicator()}

      {/* STEP 1: PHOTO */}
      {step === 1 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-sand shadow-sm text-center">
          <div className="max-w-2xl mx-auto">
            {!previewUrl ? (
              <>
                <h2 className="text-xl md:text-2xl font-bold text-charcoal mb-8">Upload a photo of your craft</h2>
                <div className="border-2 border-dashed border-forest/30 rounded-3xl p-8 md:p-12 bg-cream/50 hover:bg-cream transition-colors cursor-pointer group relative" onClick={() => fileInputRef.current?.click()}>
                  <input type="file" className="hidden" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" />
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform">
                    <Upload size={28} className="text-forest" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-charcoal mb-2">Tap to upload product photo</h3>
                  <p className="text-gray-500 mb-6 text-sm">Or choose from gallery</p>
                  <button className="px-6 py-3 bg-forest text-white font-bold rounded-xl shadow-md hover:bg-forest-dark transition-colors text-sm">
                    Choose File
                  </button>
                </div>

                <div className="mt-8">
                  <button onClick={handleDemoProduct} className="px-6 py-2.5 bg-white text-terracotta border-2 border-terracotta/20 font-bold rounded-xl hover:bg-orange-50 transition-colors inline-flex items-center text-sm">
                    <Sparkles size={18} className="mr-2" /> Try Demo Product
                  </button>
                </div>
              </>
            ) : !enhanced ? (
              <div className="animate-in fade-in">
                <h2 className="text-xl md:text-2xl font-bold text-charcoal mb-6">AI Product Photo Studio</h2>
                <p className="text-gray-600 mb-8">We'll make your product photo ready for online selling.</p>
                
                <img src={previewUrl} alt="Original" className="w-48 h-48 md:w-64 md:h-64 object-cover mx-auto rounded-2xl shadow-md mb-8" />
                
                {isEnhancing ? (
                  <div className="space-y-4 max-w-sm mx-auto bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <div className="flex items-center text-forest">
                      <Loader2 size={20} className="animate-spin mr-3 shrink-0" />
                      <span className="font-medium text-sm">Analyzing photo...</span>
                    </div>
                    <div className="flex items-center text-gray-600 pl-8">
                      <CheckCircle2 size={16} className="text-forest mr-2" /> <span className="text-xs">Removing background</span>
                    </div>
                    <div className="flex items-center text-gray-600 pl-8">
                      <CheckCircle2 size={16} className="text-forest mr-2" /> <span className="text-xs">Improving lighting</span>
                    </div>
                    <div className="flex items-center text-gray-600 pl-8">
                      <CheckCircle2 size={16} className="text-forest mr-2" /> <span className="text-xs">Centering product</span>
                    </div>
                  </div>
                ) : (
                  <button onClick={simulateEnhancement} className="px-6 py-3 bg-forest text-white font-bold rounded-xl shadow-md hover:bg-forest-dark transition-colors inline-flex items-center">
                    <Sparkles size={18} className="mr-2" /> Improve My Photo
                  </button>
                )}
              </div>
            ) : (
              <div className="animate-in fade-in">
                <h2 className="text-xl md:text-2xl font-bold text-charcoal mb-6">Photo Quality Check</h2>
                
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-2 font-medium">BEFORE</p>
                    <img src={previewUrl} alt="Original" className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-xl shadow-sm opacity-80 blur-[1px]" />
                  </div>
                  <ChevronRight className="text-gray-300 hidden md:block" size={32} />
                  <div className="text-center">
                    <p className="text-xs text-forest mb-2 font-bold">AFTER (AI-enhanced preview)</p>
                    <div className="bg-white p-2 rounded-xl shadow-lg border-2 border-forest">
                      <img src={previewUrl} alt="Enhanced" className="w-40 h-40 md:w-48 md:h-48 object-contain rounded-lg" style={{ filter: 'contrast(1.1) brightness(1.05)' }} />
                    </div>
                  </div>
                </div>

                <div className="max-w-sm mx-auto bg-green-50 p-4 rounded-xl border border-green-100 mb-8 text-left space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-700">Background</span>
                    <span className="text-forest font-medium flex items-center"><CheckCircle2 size={14} className="mr-1"/> Good</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-700">Lighting</span>
                    <span className="text-forest font-medium flex items-center"><CheckCircle2 size={14} className="mr-1"/> Improved</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-700">Product Position</span>
                    <span className="text-forest font-medium flex items-center"><CheckCircle2 size={14} className="mr-1"/> Centered</span>
                  </div>
                </div>

                <div className="flex gap-4 justify-center">
                  <button onClick={() => setEnhanced(false)} className="px-6 py-3 bg-white text-gray-600 border border-gray-300 font-bold rounded-xl hover:bg-gray-50 transition-colors">
                    Try Again
                  </button>
                  <button onClick={() => setStep(2)} className="px-8 py-3 bg-forest text-white font-bold rounded-xl shadow-md hover:bg-forest-dark transition-colors">
                    Use This Photo
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* STEP 2: VOICE TELL */}
      {step === 2 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-sand shadow-sm text-center">
          <div className="max-w-xl mx-auto">
            <h2 className="text-xl md:text-2xl font-bold text-charcoal mb-2">Tell us about your product</h2>
            <p className="text-gray-600 mb-8 text-sm">Speak naturally. You can speak in Hindi, English, or another supported language.</p>

            {voiceText ? (
              <div className="animate-in fade-in">
                <div className="w-16 h-16 bg-green-100 text-forest rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mic size={32} />
                </div>
                <h3 className="text-forest font-bold mb-4">🎙 Voice understood</h3>
                
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 text-left mb-6 relative group">
                  <p className="text-gray-800 leading-relaxed font-medium">"{voiceText}"</p>
                  <button onClick={() => alert('Edit dialog opened')} className="absolute top-2 right-2 p-2 bg-white rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <Copy size={14} className="text-gray-500" />
                  </button>
                </div>

                <div className="flex flex-wrap justify-center gap-4 text-xs font-medium text-gray-600 mb-8">
                  <span className="flex items-center"><CheckCircle2 size={14} className="text-forest mr-1"/> Speech converted</span>
                  <span className="flex items-center"><CheckCircle2 size={14} className="text-forest mr-1"/> Language detected: Hindi</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button onClick={() => setVoiceText('')} className="px-6 py-3 bg-white text-gray-600 border border-gray-300 font-bold rounded-xl hover:bg-gray-50 transition-colors">
                    Record Again
                  </button>
                  <button onClick={handleProcessVoice} className="px-8 py-3 bg-forest text-white font-bold rounded-xl shadow-md hover:bg-forest-dark transition-colors flex items-center justify-center">
                    Continue <ChevronRight size={18} className="ml-1" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="animate-in fade-in">
                <button 
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center mx-auto mb-8 transition-all ${
                    isRecording 
                      ? 'bg-red-500 text-white shadow-[0_0_40px_rgba(239,68,68,0.5)] animate-pulse' 
                      : 'bg-forest text-white shadow-xl hover:scale-105'
                  }`}
                >
                  {isRecording ? <Square size={40} /> : <Mic size={48} />}
                </button>
                
                {isRecording ? (
                  <div>
                    <h3 className="text-red-500 font-bold mb-2 flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-red-500 mr-2 animate-ping"></span> Recording...
                    </h3>
                    <p className="text-gray-500 font-mono">00:0{recordingTime}</p>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-xl font-bold text-charcoal mb-6">🎙 Tap to speak</h3>
                    
                    <div className="bg-cream/50 p-4 rounded-xl border border-sand text-left text-sm mb-6 max-w-sm mx-auto">
                      <p className="font-bold text-gray-700 mb-2">Speak about:</p>
                      <ul className="list-disc pl-5 space-y-1 text-gray-600">
                        <li>What is it?</li>
                        <li>What is it made from?</li>
                        <li>How long does it take to make?</li>
                        <li>What makes it special?</li>
                      </ul>
                    </div>

                    <button onClick={loadDemoVoice} className="text-sm font-bold text-terracotta hover:underline inline-flex items-center">
                      <Sparkles size={14} className="mr-1" /> Try Demo Voice
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* STEP 3: UNDERSTAND (Processing -> Catalog) */}
      {step === 3 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-sand shadow-sm">
          {isUnderstanding ? (
            <div className="text-center py-12 max-w-md mx-auto">
              <div className="relative w-24 h-24 mx-auto mb-8">
                {previewUrl && <img src={previewUrl} alt="Preview" className="w-full h-full object-cover rounded-2xl shadow-lg opacity-50 absolute inset-0" />}
                <div className="absolute inset-0 bg-green-100/80 rounded-2xl animate-ping"></div>
                <div className="relative bg-forest/90 backdrop-blur text-white w-24 h-24 rounded-2xl flex items-center justify-center shadow-lg border-2 border-white">
                  <Sparkles size={40} className="animate-pulse text-gold" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-charcoal mb-6">Understanding your product...</h2>
              <div className="space-y-3 text-left bg-gray-50 p-5 rounded-2xl border border-gray-100">
                {UNDERSTANDING_STAGES.map((stage, idx) => (
                  <div key={idx} className={`flex items-center transition-all duration-300 ${
                    idx < understandingStage ? 'text-forest' : idx === understandingStage ? 'text-charcoal' : 'text-gray-300'
                  }`}>
                    {idx < understandingStage ? <CheckCircle2 size={16} className="mr-3 shrink-0" /> : 
                     idx === understandingStage ? <Loader2 size={16} className="mr-3 shrink-0 animate-spin text-forest" /> : 
                     <div className="w-4 h-4 rounded-full border-2 border-gray-200 mr-3 shrink-0"></div>}
                    <span className="text-xs font-medium">{stage}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in">
              <div className="flex flex-col md:flex-row items-center justify-between mb-6 pb-4 border-b border-gray-100">
                <h2 className="text-xl font-bold text-charcoal flex items-center">
                  <Sparkles size={20} className="text-gold mr-2" /> Multilingual Smart Catalog
                </h2>
                <div className="flex bg-gray-100 p-1 rounded-lg mt-4 md:mt-0">
                  <button className="px-4 py-1.5 bg-white shadow-sm rounded-md text-sm font-bold text-forest">English</button>
                  <button className="px-4 py-1.5 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700">हिंदी</button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Product Title</label>
                    <input type="text" value={productData.name} onChange={(e) => setProductData({...productData, name: e.target.value})} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl font-medium text-charcoal" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 flex justify-between">
                      Description <span className="text-forest text-[10px] normal-case flex items-center"><Sparkles size={10} className="mr-1"/> AI Generated</span>
                    </label>
                    <textarea rows={5} value={productData.aiDescription} onChange={(e) => setProductData({...productData, aiDescription: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm leading-relaxed text-gray-700" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Category</label>
                      <input type="text" value={productData.category} readOnly className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Craft</label>
                      <input type="text" value="Gond Art" readOnly className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Production Time</label>
                      <input type="text" value="2 Days" readOnly className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Region</label>
                      <input type="text" value="Madhya Pradesh" readOnly className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700" />
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                    <h4 className="font-bold text-forest-dark text-xs mb-2">Online Search Tags (SEO)</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {productData.tags?.map((tag, idx) => (
                        <span key={idx} className="px-2 py-1 bg-white border border-green-200 text-forest text-[10px] font-medium rounded-full">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-gray-100">
                <button onClick={() => setStep(4)} className="px-8 py-3 bg-forest text-white font-bold rounded-xl shadow-md hover:bg-forest-dark transition-colors flex items-center">
                  Continue to Pricing <ChevronRight size={18} className="ml-1" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* STEP 4: PRICING */}
      {step === 4 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-sand shadow-sm animate-in fade-in">
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-charcoal mb-2">AI Pricing Assistant</h2>
            <p className="text-gray-600 text-sm">Understand your costs and see what similar products sell for.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <div>
              <h3 className="font-bold text-gray-700 mb-4 border-b border-gray-100 pb-2">Your Costs</h3>
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl">
                  <span className="text-sm font-medium text-gray-600">Material Cost</span>
                  <div className="flex items-center">
                    <span className="text-gray-400 mr-2">₹</span>
                    <input type="number" value={pricingData.material} onChange={(e) => setPricingData({...pricingData, material: Number(e.target.value)})} className="w-20 bg-white border border-gray-200 rounded p-1 text-right font-medium" />
                  </div>
                </div>
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl">
                  <span className="text-sm font-medium text-gray-600">Labor / Time</span>
                  <div className="flex items-center">
                    <span className="text-gray-400 mr-2">₹</span>
                    <input type="number" value={pricingData.labor} onChange={(e) => setPricingData({...pricingData, labor: Number(e.target.value)})} className="w-20 bg-white border border-gray-200 rounded p-1 text-right font-medium" />
                  </div>
                </div>
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl">
                  <span className="text-sm font-medium text-gray-600">Other Costs</span>
                  <div className="flex items-center">
                    <span className="text-gray-400 mr-2">₹</span>
                    <input type="number" value={pricingData.other} onChange={(e) => setPricingData({...pricingData, other: Number(e.target.value)})} className="w-20 bg-white border border-gray-200 rounded p-1 text-right font-medium" />
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center py-3 border-t-2 border-gray-100">
                <span className="font-bold text-charcoal">Total Cost</span>
                <span className="font-bold text-xl text-charcoal">₹{totalCost}</span>
              </div>
            </div>

            <div className="bg-cream/50 rounded-2xl p-6 border border-sand">
              <h3 className="font-bold text-gray-700 mb-4 flex items-center">
                <Sparkles size={16} className="text-gold mr-2" /> Why this price?
              </h3>
              
              <div className="space-y-3 text-sm text-gray-600 mb-6">
                <div className="flex justify-between"><span>Base Cost</span> <span>₹{totalCost}</span></div>
                <div className="flex justify-between"><span>Market Comparison</span> <span>₹{suggestedRange[0]} – ₹{suggestedRange[1]}</span></div>
                <div className="flex justify-between"><span>Market Demand</span> <span className="text-forest font-medium">High</span></div>
                <div className="flex justify-between"><span>Handmade Value</span> <span className="text-forest font-medium">+12%</span></div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-200 mb-6 text-center">
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Suggested Selling Price</p>
                <div className="text-3xl font-bold text-forest">₹{productData.price}</div>
                <p className="text-[10px] text-gray-400 mt-1">AI estimate — Review before publishing</p>
              </div>

              <div className="mb-4">
                <label className="block text-xs font-bold text-gray-500 mb-2">Adjust Your Price</label>
                <input 
                  type="range" 
                  min="800" max="2500" step="50"
                  value={productData.price}
                  onChange={(e) => setProductData({...productData, price: Number(e.target.value)})}
                  className="w-full accent-forest" 
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>₹800</span>
                  <span>₹2,500</span>
                </div>
              </div>
              
              {productData.price! > suggestedRange[1] && (
                <p className="text-xs text-terracotta bg-red-50 p-2 rounded">
                  This price is above the current estimated market range.
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end pt-8 mt-4 border-t border-gray-100">
            <button onClick={() => setStep(5)} className="px-8 py-3 bg-forest text-white font-bold rounded-xl shadow-md hover:bg-forest-dark transition-colors flex items-center">
              Save Product <ChevronRight size={18} className="ml-1" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: READY */}
      {step === 5 && (
        <div className="bg-white rounded-3xl overflow-hidden border border-sand shadow-sm animate-in fade-in">
          <div className="bg-forest p-8 text-center text-white">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur">
              <CheckCircle2 size={32} />
            </div>
            <h2 className="text-2xl font-bold mb-2">Your product is ready!</h2>
            <p className="text-forest-muted">Product Readiness Score: 94%</p>
          </div>

          <div className="p-6 md:p-10 grid md:grid-cols-2 gap-10">
            <div>
              <div className="relative rounded-2xl overflow-hidden shadow-md mb-4 aspect-square">
                <img src={previewUrl!} alt="Product" className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-forest">
                  ₹{productData.price}
                </div>
              </div>
              <h3 className="font-bold text-lg text-charcoal">{productData.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{productData.category} • Madhya Pradesh</p>
            </div>

            <div>
              <h4 className="font-bold text-charcoal mb-4">Readiness Checklist</h4>
              <div className="space-y-3 mb-8">
                <div className="flex items-center text-sm font-medium text-gray-700">
                  <CheckCircle2 size={16} className="text-forest mr-3" /> Photo optimized
                </div>
                <div className="flex items-center text-sm font-medium text-gray-700">
                  <CheckCircle2 size={16} className="text-forest mr-3" /> Product information extracted
                </div>
                <div className="flex items-center text-sm font-medium text-gray-700">
                  <CheckCircle2 size={16} className="text-forest mr-3" /> AI description generated
                </div>
                <div className="flex items-center text-sm font-medium text-gray-700">
                  <CheckCircle2 size={16} className="text-forest mr-3" /> Hindi & English listing ready
                </div>
                <div className="flex items-center text-sm font-medium text-gray-700">
                  <CheckCircle2 size={16} className="text-forest mr-3" /> Price & costs calculated
                </div>
                <div className="flex items-center text-sm font-medium text-gray-700">
                  <CheckCircle2 size={16} className="text-forest mr-3" /> Search tags (SEO) optimized
                </div>
                <div className="flex items-center text-sm font-medium text-gray-700">
                  <CheckCircle2 size={16} className="text-forest mr-3" /> Instagram caption ready
                </div>
              </div>

              <div className="space-y-3">
                <button onClick={handlePublish} className="w-full px-6 py-4 bg-forest text-white font-bold rounded-xl shadow-md hover:bg-forest-dark transition-colors flex justify-center items-center">
                  🚀 Publish Product
                </button>
                <button onClick={handlePublish} className="w-full px-6 py-3 bg-white border border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors flex justify-center items-center">
                  <Search size={18} className="mr-2" /> Publish & Find Buyers
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
