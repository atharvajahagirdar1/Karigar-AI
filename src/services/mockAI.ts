import type { Product, Buyer } from '../types';
import { mockBuyers } from '../data/mockData';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockAnalyzeProduct = async (_imageFile: File | null, useDemo: boolean): Promise<Partial<Product>> => {
  await delay(2000); // simulate network delay

  if (useDemo) {
    return {
      name: 'Handcrafted Gond Art Wall Panel',
      category: 'Traditional Wall Art',
      craft: 'Gond Art',
      material: 'Natural colors + wood',
      price: 2700,
      dimensions: '24 × 18 inches',
      productionTime: '4–6 days',
      tags: ['#GondArt', '#Handmade', '#TribalArt', '#MadhyaPradesh', '#IndianCrafts'],
      imageUrl: '/images/gond_wall_panel.jpg',
    };
  }

  // fallback generic response for any other upload
  return {
    name: 'Artisan Crafted Item',
    category: 'Handicraft',
    craft: 'Mixed Craft',
    material: 'Natural Materials',
    price: 1500,
    dimensions: '10 x 10 inches',
    productionTime: '3-5 days',
    tags: ['#Handmade', '#Artisan', '#Craft'],
    imageUrl: '/images/bamboo_basket.jpg', // generic image
  };
};

export const mockGenerateContent = async (product: Partial<Product>) => {
  await delay(1500);

  return {
    aiDescription: `Bring the spirit of traditional craftsmanship into your space with this beautiful ${product.name || 'item'}. Handcrafted using ${product.material || 'high-quality materials'}, it showcases the rich heritage of Indian artisans. Perfect for contemporary and ethnic decor styles.`,
    instagramCaption: `Transform your living space with this authentic ${product.name}. 🌿 Handcrafted with love and dedication. #HandmadeDecor #IndianCrafts ${product.tags?.join(' ')}`,
    marketplaceListing: `Authentic ${product.name} (${product.dimensions || 'Standard size'}). Perfect for ethnic home decor and gifting. Made using traditional techniques.`,
    hindiTranslation: `इस खूबसूरत ${product.name || 'उत्पाद'} के साथ अपने स्थान में पारंपरिक शिल्प कौशल की भावना लाएं। उच्च गुणवत्ता वाली सामग्री का उपयोग करके हस्तनिर्मित, यह भारतीय कारीगरों की समृद्ध विरासत को दर्शाता है।`
  };
};

export const mockFindBuyers = async (_query: string): Promise<Buyer[]> => {
  await delay(2500);
  
  // Just return the mock buyers, ordered by some mock logic based on query
  // For the demo, we always want The Heritage Hotel to be high if they ask for Gond/bulk
  return [...mockBuyers].sort((a, b) => b.matchScore - a.matchScore);
};

export const mockChat = async (prompt: string): Promise<string> => {
  await delay(1000);
  const lowerPrompt = prompt.toLowerCase();
  
  if (lowerPrompt.includes('promote')) {
    return "Based on the last 30 days of buyer activity, your Gond Wall Panels have received the highest interest. I recommend highlighting the Tree of Life and Storytelling panels in your next catalog.";
  } else if (lowerPrompt.includes('price')) {
    return "Analyzing similar handcrafted items on the market, I suggest a price range of ₹2,400 to ₹3,000. Your current recommended price of ₹2,700 positions you well for bulk hotel orders.";
  } else if (lowerPrompt.includes('buyers')) {
    return "I found 127 potential buyers looking for traditional wall art. Should I create a personalized catalog for the top 5 matches?";
  }
  
  return "I'm your AI assistant. I can help you analyze products, generate descriptions, find buyers, or optimize your pricing. Try asking me which products you should promote!";
};
