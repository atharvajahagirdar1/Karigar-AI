import React from 'react';
import { useApp } from '../store';
import { 
  MapPin, 
  Briefcase, 
  Languages, 
  Phone, 
  Mail, 
  Edit3,
  Award
} from 'lucide-react';

export const Profile: React.FC = () => {
  const { artisan } = useApp();

  if (!artisan) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500 pb-12">
      <div className="bg-white rounded-3xl shadow-sm border border-sand overflow-hidden relative">
        <div className="h-48 bg-gradient-to-r from-forest to-forest-dark relative">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <button onClick={() => alert('Cover image upload simulated for demo.')} className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur rounded-full text-white hover:bg-white/30 transition-colors">
            <Edit3 size={18} />
          </button>
        </div>
        
        <div className="px-8 pb-8 relative">
          <div className="flex justify-between items-end mb-6">
            <div className="w-32 h-32 rounded-2xl bg-white shadow-lg flex items-center justify-center text-terracotta text-5xl font-bold border-4 border-white absolute -top-16">
              {artisan.name.charAt(0)}
            </div>
            <div className="ml-36 pt-4">
              <h1 className="text-3xl font-bold text-charcoal">{artisan.name}</h1>
              <p className="text-lg text-gray-500 font-medium">{artisan.businessName}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg text-charcoal mb-4">About</h3>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <MapPin size={18} className="mr-3 text-forest" />
                    <span>{artisan.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Briefcase size={18} className="mr-3 text-forest" />
                    <span>{artisan.experience} years experience</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Languages size={18} className="mr-3 text-forest" />
                    <span>{artisan.languages.join(', ')}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-lg text-charcoal mb-4">Contact</h3>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Phone size={18} className="mr-3 text-forest" />
                    <span>{artisan.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Mail size={18} className="mr-3 text-forest" />
                    <span>{artisan.email}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg text-charcoal mb-4">Craft Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {artisan.craftCategories.map((craft, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-cream text-charcoal font-medium text-sm rounded-lg border border-sand">
                      {craft}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-lg text-charcoal mb-3 flex items-center">
                  My Story
                  <button onClick={() => alert('Story edit dialog opened.')} className="ml-2 text-gray-400 hover:text-forest"><Edit3 size={14} /></button>
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm p-4 bg-gray-50 rounded-2xl">
                  {artisan.story}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-6 border border-orange-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-start">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4 shrink-0 shadow-sm">
            <Award size={24} className="text-terracotta" />
          </div>
          <div>
            <h3 className="font-bold text-charcoal flex items-center">
              Profile Completeness: {artisan.profileCompleteness}%
            </h3>
            <p className="text-sm text-gray-600 mt-1">Complete your profile to get 2x more buyer matches.</p>
            <div className="w-full bg-white rounded-full h-2 mt-3 shadow-inner">
              <div className="bg-gradient-to-r from-terracotta to-gold h-2 rounded-full" style={{ width: `${artisan.profileCompleteness}%` }}></div>
            </div>
          </div>
        </div>
        <div className="shrink-0 w-full md:w-auto space-y-2">
          <button onClick={() => alert('Redirecting to settings to add GST details...')} className="w-full text-left px-4 py-2 bg-white rounded-xl text-sm font-medium text-charcoal shadow-sm hover:bg-cream border border-sand flex items-center">
            <div className="w-2 h-2 rounded-full bg-terracotta mr-2"></div> Add GST Details (+10%)
          </button>
          <button onClick={() => alert('Workshop photo upload simulated.')} className="w-full text-left px-4 py-2 bg-white rounded-xl text-sm font-medium text-charcoal shadow-sm hover:bg-cream border border-sand flex items-center">
            <div className="w-2 h-2 rounded-full bg-terracotta mr-2"></div> Add Workshop Photos (+8%)
          </button>
        </div>
      </div>
    </div>
  );
};
