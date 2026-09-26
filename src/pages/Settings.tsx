import React, { useState } from 'react';
import { useApp } from '../store';
import { 
  User, 
  Bell, 
  Lock, 
  Globe, 
  Database, 
  Sparkles,
  Save,
  Trash2,
  Settings as SettingsIcon,
  Activity,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { aiClient } from '../services/aiClient';

export const Settings: React.FC = () => {
  const { loadDemoData, logout, simpleMode, setSimpleMode, aiMode, setAiMode } = useApp();
  const [activeTab, setActiveTab] = useState('account');
  const [testResult, setTestResult] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState(false);
  
  const handleLoadDemo = () => {
    if (window.confirm("This will overwrite current data with demo data. Continue?")) {
      loadDemoData();
      alert("Demo data loaded successfully!");
    }
  };

  const handleClearData = () => {
    if (window.confirm("Are you sure you want to clear all data and logout?")) {
      localStorage.clear();
      logout();
    }
  };

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);
    try {
      const res = await aiClient.testConnection();
      if (res.success) {
        setTestResult(`Success! Backend connected. Mode: ${res.mode}. Gemini Configured: ${res.geminiConfigured}`);
      } else {
        setTestResult(`Failed: ${res.message}`);
      }
    } catch (e) {
      setTestResult("Error connecting to server.");
    }
    setIsTesting(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-forest-dark">Settings</h1>
        <p className="text-gray-600">Manage your account and application preferences.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-sand overflow-hidden">
            <button 
              onClick={() => setActiveTab('account')}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'account' ? 'bg-forest/5 text-forest border-l-4 border-forest' : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'}`}
            >
              <User size={18} className="mr-3" /> Account
            </button>
            <button 
              onClick={() => setActiveTab('notifications')}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'notifications' ? 'bg-forest/5 text-forest border-l-4 border-forest' : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'}`}
            >
              <Bell size={18} className="mr-3" /> Notifications
            </button>
            <button 
              onClick={() => setActiveTab('privacy')}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'privacy' ? 'bg-forest/5 text-forest border-l-4 border-forest' : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'}`}
            >
              <Lock size={18} className="mr-3" /> Privacy & Security
            </button>
            <button 
              onClick={() => setActiveTab('language')}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'language' ? 'bg-forest/5 text-forest border-l-4 border-forest' : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'}`}
            >
              <Globe size={18} className="mr-3" /> Language
            </button>
            <button 
              onClick={() => setActiveTab('simpleMode')}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'simpleMode' ? 'bg-forest/5 text-forest border-l-4 border-forest' : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'}`}
            >
              <User size={18} className="mr-3" /> Simple Mode
            </button>
            <button 
              onClick={() => setActiveTab('ai')}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'ai' ? 'bg-forest/5 text-forest border-l-4 border-forest' : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'}`}
            >
              <Sparkles size={18} className="mr-3" /> AI Preferences
            </button>
            <button 
              onClick={() => setActiveTab('data')}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'data' ? 'bg-forest/5 text-forest border-l-4 border-forest' : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'}`}
            >
              <Database size={18} className="mr-3" /> Data Management
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 bg-white rounded-3xl shadow-sm border border-sand p-6 md:p-8">
          {activeTab === 'account' && (
            <div className="space-y-6 animate-in fade-in">
              <h2 className="text-xl font-bold text-charcoal mb-4">Account Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input type="text" value="+91 98765 43210" disabled className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input type="email" value="meera@example.com" disabled className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-500" />
                </div>
              </div>
              <div className="pt-4 mt-6 border-t border-gray-100 flex justify-end">
                <button onClick={() => alert('Changes saved successfully.')} className="px-6 py-2 bg-forest text-white rounded-xl font-medium flex items-center">
                  <Save size={16} className="mr-2" /> Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="space-y-6 animate-in fade-in">
              <h2 className="text-xl font-bold text-charcoal mb-4 flex items-center">
                <Sparkles size={20} className="mr-2 text-gold" /> AI Preferences
              </h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <h4 className="font-medium text-charcoal mb-2">AI Mode</h4>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input type="radio" checked={aiMode === 'auto'} onChange={() => setAiMode('auto')} className="text-forest focus:ring-forest" />
                      <span className="text-gray-700"><strong>Automatic</strong> (Uses Gemini if configured, else Demo)</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input type="radio" checked={aiMode === 'gemini'} onChange={() => setAiMode('gemini')} className="text-forest focus:ring-forest" />
                      <span className="text-gray-700"><strong>Gemini AI</strong> (Force real AI requests)</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input type="radio" checked={aiMode === 'mock'} onChange={() => setAiMode('mock')} className="text-forest focus:ring-forest" />
                      <span className="text-gray-700"><strong>Demo AI</strong> (No Gemini requests, robust presentation)</span>
                    </label>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <h4 className="font-medium text-charcoal mb-2">AI Connection Test</h4>
                  <button onClick={handleTestConnection} disabled={isTesting} className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 disabled:opacity-50 flex items-center">
                    <Activity size={16} className="mr-2" /> {isTesting ? 'Testing...' : 'Test AI Connection'}
                  </button>
                  {testResult && (
                    <div className={`mt-3 p-3 rounded-lg text-sm flex items-center ${testResult.includes('Success') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                      {testResult.includes('Success') ? <CheckCircle2 size={16} className="mr-2" /> : <XCircle size={16} className="mr-2" />}
                      {testResult}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div>
                    <h4 className="font-medium text-charcoal">Auto-generate Product Tags</h4>
                    <p className="text-sm text-gray-500">Allow AI to automatically tag your uploaded products.</p>
                  </div>
                  <div className="w-11 h-6 bg-forest rounded-full relative cursor-pointer">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div>
                    <h4 className="font-medium text-charcoal">Smart Pricing Suggestions</h4>
                    <p className="text-sm text-gray-500">Get AI recommendations for pricing based on market trends.</p>
                  </div>
                  <div className="w-11 h-6 bg-forest rounded-full relative cursor-pointer">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div>
                    <h4 className="font-medium text-charcoal">Multilingual Auto-translation</h4>
                    <p className="text-sm text-gray-500">Translate descriptions to English & Hindi automatically.</p>
                  </div>
                  <div className="w-11 h-6 bg-forest rounded-full relative cursor-pointer">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'simpleMode' && (
            <div className="space-y-6 animate-in fade-in">
              <h2 className="text-xl font-bold text-charcoal mb-4 flex items-center">
                <User size={20} className="mr-2 text-forest" /> Simple Mode
              </h2>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div>
                  <h4 className="font-medium text-charcoal">Enable Simple Mode</h4>
                  <p className="text-sm text-gray-500">Simplify terminology and prioritize mobile-friendly artisan workflows.</p>
                </div>
                <div 
                  onClick={() => setSimpleMode(!simpleMode)}
                  className={`w-11 h-6 rounded-full relative cursor-pointer transition-colors ${simpleMode ? 'bg-forest' : 'bg-gray-300'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${simpleMode ? 'right-1' : 'left-1'}`}></div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'data' && (
            <div className="space-y-6 animate-in fade-in">
              <h2 className="text-xl font-bold text-charcoal mb-4">Data Management (Demo Tools)</h2>
              
              <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 mb-6">
                <h4 className="font-bold text-blue-900 mb-2">SIH Demo Actions</h4>
                <p className="text-sm text-blue-700 mb-4">Use these actions to reset the application state during the presentation.</p>
                <div className="flex gap-4">
                  <button 
                    onClick={handleLoadDemo}
                    className="px-4 py-2 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
                  >
                    Reset Demo Data
                  </button>
                  <button 
                    onClick={handleClearData}
                    className="px-4 py-2 bg-white text-red-600 border border-red-200 font-medium rounded-xl hover:bg-red-50 transition-colors flex items-center"
                  >
                    <Trash2 size={16} className="mr-2" /> Clear All Data
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {['notifications', 'privacy', 'language'].includes(activeTab) && (
            <div className="space-y-6 animate-in fade-in text-center py-12">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                <SettingsIcon size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-400 mb-1">Standard Settings</h3>
              <p className="text-gray-500 text-sm">UI placeholder for generic settings.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
