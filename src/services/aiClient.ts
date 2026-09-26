import { mockAnalyzeProduct, mockGenerateContent, mockFindBuyers, mockChat } from './mockAI';
import type { Product, Buyer } from '../types';

const API_URL = 'http://localhost:3001/api/ai';

interface AIResponse<T> {
  success: boolean;
  mode: "gemini" | "mock";
  data?: T;
  error?: string;
}

const callApi = async <T>(endpoint: string, body: any): Promise<AIResponse<T>> => {
  const aiMode = localStorage.getItem('Karigar AI_aiMode') || 'auto';
  
  if (aiMode === 'mock') {
    return { success: false, mode: 'mock', error: 'Mock mode forced' };
  }
  
  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-AI-Mode': aiMode
      },
      body: JSON.stringify(body)
    });
    
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    
    return await res.json();
  } catch (error) {
    console.error(`AI Client Error (${endpoint}):`, error);
    return { success: false, mode: 'mock', error: error instanceof Error ? error.message : String(error) };
  }
};

export const aiClient = {
  // Image analysis
  analyzeProductImage: async (imageBase64: string, useDemo: boolean): Promise<{data: Partial<Product>, mode: string}> => {
    const response = await callApi<any>('/analyze-image', { image: imageBase64 });
    
    if (response.success && response.data) {
      return {
        mode: response.mode,
        data: {
          name: response.data.productName,
          category: response.data.category,
          craft: response.data.craft,
          material: response.data.material,
          tags: response.data.tags,
          imageUrl: useDemo ? '/images/gond_wall_panel.jpg' : imageBase64
        }
      };
    }
    
    // Fallback
    const mockData = await mockAnalyzeProduct(null, useDemo);
    return { data: mockData, mode: 'mock' };
  },

  // Voice/Text analysis
  analyzeProductText: async (transcript: string): Promise<{data: any, mode: string}> => {
    const response = await callApi<any>('/analyze-product', { transcript });
    
    if (response.success && response.data) {
      return { mode: response.mode, data: response.data };
    }
    
    // Fallback
    return { 
      mode: 'mock', 
      data: {
        productName: "Handcrafted Product",
        material: "Natural Materials",
        craft: "Traditional Craft",
        productionTime: "2 days",
      }
    };
  },

  // Listing Generation
  generateListing: async (productInfo: any): Promise<{data: any, mode: string}> => {
    const response = await callApi<any>('/generate-listing', { productInfo });
    
    if (response.success && response.data) {
      return { mode: response.mode, data: response.data };
    }
    
    // Fallback
    const mockContent = await mockGenerateContent(productInfo);
    return {
      mode: 'mock',
      data: {
        en: {
          title: productInfo.name || "Product",
          longDescription: mockContent.aiDescription,
          seoDescription: mockContent.marketplaceListing
        },
        hi: {
          title: "उत्पाद",
          longDescription: mockContent.hindiTranslation,
          seoDescription: mockContent.hindiTranslation
        }
      }
    };
  },

  // Pricing Explanation
  pricingExplanation: async (pricingData: any): Promise<{data: any, mode: string}> => {
    const response = await callApi<any>('/pricing-explanation', { pricingData });
    
    if (response.success && response.data) {
      return { mode: response.mode, data: response.data };
    }
    
    // Fallback
    return {
      mode: 'mock',
      data: {
        totalCost: 800,
        marketRange: { min: 1299, max: 1499 },
        suggestedPrice: 1399,
        reasoning: "Based on local market data, this is the optimal price point."
      }
    };
  },

  // Buyer Matching (Find Buyers)
  findBuyers: async (query: string): Promise<{data: Buyer[], mode: string}> => {
    // Determine buyers based on query using mock logic, but if we had a backend logic we'd call API.
    // Since buyer DB is in frontend/mock data, we do deterministic matching here, then call explanation if needed.
    // For prototype, we just return mockFindBuyers for the list, then we use AI for the explanation part.
    const buyers = await mockFindBuyers(query);
    return { mode: 'mock', data: buyers };
  },

  buyerExplanation: async (product: any, buyer: Buyer): Promise<{data: any, mode: string}> => {
    const response = await callApi<any>('/buyer-explanation', { product, buyer });
    if (response.success && response.data) {
      return { mode: response.mode, data: response.data };
    }
    return { mode: 'mock', data: { aiExplanation: "This buyer looks for products exactly like yours based on their profile." } };
  },

  // Outreach Message
  generateOutreach: async (artisan: any, product: any, buyer: Buyer): Promise<{data: any, mode: string}> => {
    const response = await callApi<any>('/outreach', { artisan, product, buyer });
    if (response.success && response.data) {
      return { mode: response.mode, data: response.data };
    }
    return {
      mode: 'mock',
      data: {
        whatsapp: "Hi, I have a product for you.",
        email: "Hello, please see my catalog attached.",
        shortIntro: "We have what you need."
      }
    };
  },

  // Assistant Chat
  chatAssistant: async (query: string, context: any): Promise<{data: any, mode: string}> => {
    const response = await callApi<any>('/assistant', { query, context });
    if (response.success && response.data) {
      return { mode: response.mode, data: response.data };
    }
    
    // Fallback
    const fallbackStr = await mockChat(query);
    return { mode: 'mock', data: { response: fallbackStr, suggestedAction: null } };
  },

  testConnection: async (): Promise<{success: boolean, message: string, mode: string, geminiConfigured: boolean}> => {
    const aiMode = localStorage.getItem('Karigar AI_aiMode') || 'auto';
    try {
      const res = await fetch(`${API_URL}/test`, {
        headers: {
          'X-AI-Mode': aiMode
        }
      });
      return await res.json();
    } catch (e) {
      return {
        success: false,
        message: 'Could not connect to backend',
        mode: 'none',
        geminiConfigured: false
      };
    }
  }
};
