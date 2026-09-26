import type { Artisan, Product, Buyer, Order, AnalyticsData, Activity } from '../types';

export const mockArtisan: Artisan = {
  id: 'a1',
  name: 'Meera Bai',
  businessName: 'Meera Tribal Crafts',
  location: 'Indore, Madhya Pradesh',
  experience: 12,
  craftCategories: ['Gond Art', 'Tribal Wall Art', 'Hand-painted panels', 'Wooden crafts', 'Traditional motifs'],
  languages: ['Hindi', 'English', 'Gondi'],
  phone: '+91 98765 43210',
  email: 'meera@example.com',
  story: 'I have been painting since I was 10, learning the intricate patterns of Gond art from my mother. Each painting tells a story of the forest, the animals, and our connection to nature.',
  profileCompleteness: 82
};

export const initialProducts: Product[] = [
  {
    id: 'p1',
    name: 'Handcrafted Gond Art Wall Panel',
    category: 'Traditional Wall Art',
    craft: 'Gond Art',
    material: 'Natural colors + wood',
    price: 2700,
    dimensions: '24 × 18 inches',
    productionTime: '4–6 days',
    tags: ['#GondArt', '#Handmade', '#TribalArt', '#MadhyaPradesh', '#IndianCrafts'],
    status: 'Published',
    views: 342,
    inquiries: 15,
    orders: 4,
    imageUrl: '/images/gond_wall_panel.jpg',
    aiDescription: 'Bring the spirit of Gond storytelling into your space with this handcrafted wall panel, painted using traditional-inspired motifs and natural colors.',
    instagramCaption: 'Transform your living space with this authentic Gond Wall Panel. 🌿 Handcrafted with love in Madhya Pradesh. #GondArt #HandmadeDecor',
    marketplaceListing: 'Authentic Gond Art Wooden Wall Panel (24x18 inches). Perfect for ethnic home decor and gifting. Made using natural dyes.',
    hindiTranslation: 'इस हस्तनिर्मित गोंड कला वॉल पैनल के साथ अपने स्थान में गोंड कहानी की भावना लाएं, जिसे पारंपरिक-प्रेरित रूपांकनों और प्राकृतिक रंगों का उपयोग करके चित्रित किया गया है।'
  },
  {
    id: 'p2',
    name: 'Tribal Warli Painting',
    category: 'Traditional Wall Art',
    craft: 'Warli Art',
    material: 'Canvas and acrylic',
    price: 1800,
    dimensions: '20 × 20 inches',
    productionTime: '3-4 days',
    tags: ['#Warli', '#TribalArt', '#HandPainted'],
    status: 'Published',
    views: 189,
    inquiries: 8,
    orders: 2,
    imageUrl: '/images/warli_painting.jpg'
  },
  {
    id: 'p3',
    name: 'Bamboo Decorative Basket',
    category: 'Home Decor',
    craft: 'Bamboo Weaving',
    material: 'Natural Bamboo',
    price: 950,
    dimensions: '12 × 12 × 8 inches',
    productionTime: '2 days',
    tags: ['#Bamboo', '#EcoFriendly', '#Handwoven'],
    status: 'Published',
    views: 420,
    inquiries: 22,
    orders: 7,
    imageUrl: '/images/bamboo_basket.jpg'
  },
  {
    id: 'p4',
    name: 'Handwoven Maheshwari Dupatta',
    category: 'Textiles',
    craft: 'Handloom Weaving',
    material: 'Silk and Cotton',
    price: 3200,
    dimensions: '2.5 meters',
    productionTime: '5 days',
    tags: ['#Handloom', '#Maheshwari', '#Textiles'],
    status: 'Published',
    views: 512,
    inquiries: 40,
    orders: 12,
    imageUrl: '/images/maheshwari_dupatta.jpg'
  }
];

export const mockBuyers: Buyer[] = [
  {
    id: 'b1',
    name: 'The Heritage Hotel',
    type: 'Hotel',
    location: 'Bhopal, Madhya Pradesh',
    requirements: '12–20 traditional wall art pieces for suite renovations',
    budget: '₹2,000–₹4,000 per piece',
    quantity: '12-20',
    matchScore: 94,
    matchReasons: [
      'Looking for Indian traditional wall art',
      'Budget matches your pricing',
      'Requires bulk quantity',
      'Located in Madhya Pradesh',
      'Interested in artisan-made products'
    ],
    status: 'New Lead',
    lastActivity: '2 hours ago',
    verified: true,
    preferredCategories: ['Wall Art', 'Decor'],
    pastInterests: ['Gond Art', 'Brass Decor']
  },
  {
    id: 'b2',
    name: 'Studio Arka Interiors',
    type: 'Interior Designer',
    location: 'Mumbai, Maharashtra',
    requirements: 'Handcrafted wall art for hospitality projects, rustic vibe',
    budget: '₹3,000-₹5,000 per piece',
    quantity: '5-10',
    matchScore: 91,
    matchReasons: [
      'Seeking handcrafted wall art',
      'High budget match',
      'Matches your aesthetic'
    ],
    status: 'Catalog Sent',
    lastActivity: '1 day ago',
    verified: true,
    preferredCategories: ['Wall Art', 'Furniture'],
    pastInterests: ['Tribal Art', 'Woodwork']
  },
  {
    id: 'b3',
    name: 'MP Tourism Store',
    type: 'Tourism Shop',
    location: 'Bhopal, Madhya Pradesh',
    requirements: 'Authentic Madhya Pradesh handicrafts for souvenir shop',
    budget: '₹500-₹2,000 per piece',
    quantity: 'Bulk (50+)',
    matchScore: 89,
    matchReasons: [
      'Looking for MP specific crafts',
      'Regular bulk orders',
      'Close proximity'
    ],
    status: 'New Lead',
    lastActivity: '3 days ago',
    verified: true,
    preferredCategories: ['Souvenirs', 'Small Crafts'],
    pastInterests: ['Gond Art', 'Bagh Print']
  },
  {
    id: 'b4',
    name: 'Corporate Gifts India',
    type: 'Corporate Gifting',
    location: 'New Delhi',
    requirements: 'Bulk handmade gifts for Diwali corporate packages',
    budget: '₹1,000-₹1,500 per piece',
    quantity: '100+',
    matchScore: 87,
    matchReasons: [
      'Bulk purchase potential',
      'Festive demand matches your output capacity'
    ],
    status: 'Contacted',
    lastActivity: '4 hours ago',
    verified: true,
    preferredCategories: ['Gifting', 'Decor'],
    pastInterests: ['Bamboo Crafts', 'Pottery']
  }
];

export const mockOrders: Order[] = [
  { id: '#ORD-1024', buyerName: 'The Heritage Hotel', productName: 'Gond Wall Panel', quantity: 12, amount: 32400, status: 'Confirmed', date: '2026-09-24' },
  { id: '#ORD-1025', buyerName: 'Studio Arka Interiors', productName: 'Tribal Warli Painting', quantity: 2, amount: 3600, status: 'Shipped', date: '2026-09-22' },
  { id: '#ORD-1026', buyerName: 'Individual Buyer', productName: 'Handwoven Maheshwari Dupatta', quantity: 1, amount: 3200, status: 'Delivered', date: '2026-09-18' },
];

export const generateMockAnalytics = (): AnalyticsData[] => {
  const data: AnalyticsData[] = [];
  let baseViews = 120;
  let baseInquiries = 5;
  let baseOrders = 1;
  let baseRevenue = 2000;

  for (let i = 30; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    
    // Add some random fluctuation + trend
    baseViews += Math.floor(Math.random() * 20) - 5;
    baseInquiries = Math.floor(baseViews * 0.05) + Math.floor(Math.random() * 3);
    baseOrders = Math.floor(baseInquiries * 0.2) + Math.floor(Math.random() * 2);
    baseRevenue = baseOrders * 2500 + Math.floor(Math.random() * 1000);

    data.push({
      date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      views: Math.max(10, baseViews),
      inquiries: Math.max(0, baseInquiries),
      orders: Math.max(0, baseOrders),
      revenue: Math.max(0, baseRevenue)
    });
  }
  return data;
};

export const mockActivities: Activity[] = [
  { id: 'act_1', title: 'Catalog sent to Studio Arka Interiors', timestamp: '2 hours ago', type: 'catalog' },
  { id: 'act_2', title: 'AI matched 12 new buyers for Wall Art', timestamp: '5 hours ago', type: 'match' },
  { id: 'act_3', title: 'Added Bamboo Decorative Basket', timestamp: 'Yesterday, 4:32 PM', type: 'product' },
  { id: 'act_4', title: 'Instagram caption generated for Warli Painting', timestamp: 'Yesterday, 3:50 PM', type: 'message' }
];
