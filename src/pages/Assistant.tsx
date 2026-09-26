import React, { useState, useRef, useEffect } from 'react';
import { aiClient } from '../services/aiClient';
import { 
  Sparkles,
  Send,
  User,
  MoreHorizontal
} from 'lucide-react';

interface Message {
  id: string;
  role: 'ai' | 'user';
  content: string;
}

export const Assistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'ai',
      content: "Hello! I'm Karigar AI AI, your personal business manager. How can I help you grow your craft business today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    "Which products should I promote?",
    "Find buyers for my Gond paintings",
    "How should I price this product?",
    "Create an Instagram post",
    "How can I get more bulk orders?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const response = await aiClient.chatAssistant(text, { context: "Meera's business context" });
    
    setIsTyping(false);
    setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'ai', content: response.data?.response || response.data }]);
  };

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-sand overflow-hidden animate-in fade-in duration-500">
      {/* Header */}
      <div className="bg-gradient-to-r from-forest to-forest-dark p-6 text-white flex items-center justify-between shadow-md z-10 relative">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="relative z-10 flex items-center">
          <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center mr-4 border border-white/30 shadow-inner">
            <Sparkles size={24} className="text-gold" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Karigar AI AI</h2>
            <p className="text-sand text-sm font-medium">Your AI business manager</p>
          </div>
        </div>
        <div className="relative z-10 flex items-center">
          <span className="flex h-3 w-3 mr-2">
            <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className="text-sm font-medium text-green-100">Online</span>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 bg-cream/30 space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1 ${
                msg.role === 'user' ? 'bg-terracotta text-white ml-3' : 'bg-forest text-white mr-3'
              }`}>
                {msg.role === 'user' ? <User size={16} /> : <Sparkles size={16} />}
              </div>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-charcoal text-white rounded-tr-none' 
                  : 'bg-white text-charcoal border border-sand rounded-tl-none'
              }`}>
                {msg.content}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex flex-row">
              <div className="shrink-0 w-8 h-8 rounded-full bg-forest text-white flex items-center justify-center mt-1 mr-3">
                <Sparkles size={16} />
              </div>
              <div className="p-4 rounded-2xl bg-white border border-sand rounded-tl-none flex items-center space-x-1 shadow-sm">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-sand">
        {messages.length < 3 && (
          <div className="flex overflow-x-auto gap-2 pb-4 hide-scrollbar">
            {suggestedPrompts.map((prompt, idx) => (
              <button 
                key={idx}
                onClick={() => handleSend(prompt)}
                className="whitespace-nowrap px-4 py-2 bg-cream text-forest font-medium rounded-full border border-sand hover:bg-sand/50 transition-colors text-xs"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}
        
        <form 
          className="flex items-center gap-3 bg-cream border border-sand rounded-2xl p-2 focus-within:ring-2 focus-within:ring-forest/20 transition-all"
          onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
        >
          <button type="button" className="p-2 text-gray-400 hover:text-forest transition-colors rounded-full hover:bg-gray-100">
            <MoreHorizontal size={20} />
          </button>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about your business..." 
            className="flex-1 bg-transparent border-none focus:ring-0 text-charcoal py-2 outline-none"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isTyping}
            className="p-3 bg-forest text-white rounded-xl shadow-md hover:bg-forest-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};
