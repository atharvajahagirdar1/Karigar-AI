import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../store';
import { Sparkles, Image as ImageIcon, Users, BookOpen } from 'lucide-react';

export const Login: React.FC = () => {
  const { loadDemoData } = useApp();
  const navigate = useNavigate();

  const handleDemoLogin = () => {
    loadDemoData();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex font-sans bg-cream">
      {/* Left side - Branding */}
      <div className="hidden lg:flex w-1/2 bg-forest flex-col justify-between p-12 text-white relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-forest-dark rounded-full filter blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-terracotta/20 rounded-full filter blur-3xl translate-y-1/3 -translate-x-1/4" />
        
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-16">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-terracotta to-gold flex items-center justify-center shadow-lg">
              <Sparkles size={24} className="text-white" />
            </div>
            <span className="text-3xl font-bold tracking-tight">Karigar AI</span>
          </div>

          <h1 className="text-5xl font-bold leading-tight mb-6">
            Turn your craft into <br/>
            <span className="text-gold">a growing business.</span>
          </h1>
          
          <p className="text-xl text-sand/90 mb-16 max-w-md">
            AI-powered cataloging, marketing and buyer discovery for artisans. Upload once. Sell everywhere. Find the right buyers.
          </p>

          <div className="space-y-8">
            <div className="flex items-start">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mr-4 shrink-0 backdrop-blur-sm border border-white/10">
                <ImageIcon size={24} className="text-gold" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">AI Product Intelligence</h3>
                <p className="text-sand/80">Instantly generate descriptions, tags, and pricing from a single photo.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mr-4 shrink-0 backdrop-blur-sm border border-white/10">
                <BookOpen size={24} className="text-gold" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Smart Catalogs</h3>
                <p className="text-sand/80">Create beautiful, multilingual PDF catalogs with QR codes in seconds.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mr-4 shrink-0 backdrop-blur-sm border border-white/10">
                <Users size={24} className="text-gold" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">AI Buyer Matching</h3>
                <p className="text-sand/80">Connect directly with hotels, designers, and retailers looking for your craft.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="relative z-10 text-sm text-sand/60">
          © 2026 Karigar AI. Built for SIH26090.
        </div>
      </div>

      {/* Right side - Login */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 relative">
        <div className="absolute top-8 right-8 px-3 py-1 bg-forest/10 text-forest rounded-full text-xs font-semibold tracking-wider">
          DEMO MODE
        </div>

        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center space-x-3 mb-10 justify-center">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-terracotta to-gold flex items-center justify-center shadow-lg">
              <Sparkles size={24} className="text-white" />
            </div>
            <span className="text-3xl font-bold tracking-tight text-forest">Karigar AI</span>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-sand">
            <h2 className="text-2xl font-bold text-charcoal mb-2">Welcome back</h2>
            <p className="text-gray-500 mb-8">Enter your details to access your business.</p>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone or Email</label>
                <input 
                  type="text" 
                  disabled
                  placeholder="+91 98765 43210" 
                  className="w-full px-4 py-3 bg-cream border border-sand rounded-xl focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent transition-all disabled:opacity-50"
                />
              </div>

              <button 
                disabled
                className="w-full py-3 bg-charcoal text-white rounded-xl font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                Continue
              </button>
            </form>

            <div className="my-8 flex items-center">
              <div className="flex-1 border-t border-sand"></div>
              <span className="px-4 text-sm text-gray-400 uppercase tracking-wider font-medium">For SIH Demo</span>
              <div className="flex-1 border-t border-sand"></div>
            </div>

            <button 
              onClick={handleDemoLogin}
              className="w-full py-4 bg-gradient-to-r from-forest to-forest-dark text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all flex items-center justify-center group"
            >
              <Sparkles size={20} className="mr-2 group-hover:animate-pulse text-gold" />
              Enter Demo
            </button>
            
            <p className="text-center text-sm text-gray-500 mt-6">
              Built for artisans. Powered by AI.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
