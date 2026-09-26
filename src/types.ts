export interface Artisan {
  id: string;
  name: string;
  businessName: string;
  location: string;
  experience: number;
  craftCategories: string[];
  languages: string[];
  phone: string;
  email: string;
  story: string;
  profileCompleteness: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  craft: string;
  material: string;
  price: number;
  dimensions: string;
  productionTime: string;
  tags: string[];
  status: 'Published' | 'Draft' | 'Needs attention';
  views: number;
  inquiries: number;
  orders: number;
  imageUrl: string;
  aiDescription?: string;
  instagramCaption?: string;
  marketplaceListing?: string;
  hindiTranslation?: string;
}

export interface Buyer {
  id: string;
  name: string;
  type: 'Hotel' | 'Interior Designer' | 'Corporate Gifting' | 'Tourism Shop' | 'Retailer' | 'Exporter' | 'Online Buyer';
  location: string;
  requirements: string;
  budget: string;
  quantity: string;
  matchScore: number;
  matchReasons: string[];
  status: 'New Lead' | 'Contacted' | 'Catalog Sent' | 'Negotiating' | 'Converted';
  lastActivity: string;
  verified: boolean;
  preferredCategories: string[];
  pastInterests: string[];
}

export interface Order {
  id: string;
  buyerName: string;
  productName: string;
  quantity: number;
  amount: number;
  status: 'New' | 'Confirmed' | 'In Production' | 'Shipped' | 'Delivered';
  date: string;
}

export interface AnalyticsData {
  date: string;
  views: number;
  inquiries: number;
  orders: number;
  revenue: number;
}

export interface Activity {
  id: string;
  title: string;
  timestamp: string;
  type: 'match' | 'product' | 'catalog' | 'message';
}
