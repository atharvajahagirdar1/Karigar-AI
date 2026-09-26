import React, { useState } from 'react';
import { useApp } from '../store';
import { 
  Search,
  Filter,
  Package,
  MoreVertical,
  ShoppingCart
} from 'lucide-react';

export const Orders: React.FC = () => {
  const { orders } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'New', 'Confirmed', 'In Production', 'Shipped', 'Delivered'];

  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          o.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          o.productName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'All' || o.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'New': return 'bg-blue-100 text-blue-700';
      case 'Confirmed': return 'bg-yellow-100 text-yellow-700';
      case 'In Production': return 'bg-orange-100 text-orange-700';
      case 'Shipped': return 'bg-purple-100 text-purple-700';
      case 'Delivered': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-forest-dark">Orders</h1>
          <p className="text-gray-600">Manage your sales and fulfillments.</p>
        </div>
        <button onClick={() => alert('Orders exported to CSV.')} className="px-4 py-2 bg-white text-forest border border-sand font-medium rounded-xl hover:bg-cream transition-colors shadow-sm">
          Export Orders
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-sand">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by order ID, buyer, or product..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-cream border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-forest/20 transition-all"
            />
          </div>
          <button onClick={() => alert('Advanced filtering options are simulated.')} className="px-4 py-2 bg-cream rounded-xl text-charcoal hover:bg-sand transition-colors border border-sand flex items-center justify-center font-medium">
            <Filter size={18} className="mr-2" /> Filter
          </button>
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
          {tabs.map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab ? 'bg-forest text-white shadow-sm' : 'bg-transparent text-gray-500 hover:text-charcoal hover:bg-gray-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-sand overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500">
                <th className="p-4 font-semibold">Order ID & Date</th>
                <th className="p-4 font-semibold">Buyer</th>
                <th className="p-4 font-semibold">Product & Qty</th>
                <th className="p-4 font-semibold text-right">Amount</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map(order => (
                <tr key={order.id} className="hover:bg-cream transition-colors cursor-pointer group">
                  <td className="p-4">
                    <div className="font-bold text-charcoal mb-1">{order.id}</div>
                    <div className="text-sm text-gray-500">{order.date}</div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-charcoal">{order.buyerName}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded bg-cream flex items-center justify-center text-forest mr-3 border border-sand">
                        <Package size={16} />
                      </div>
                      <div>
                        <div className="font-medium text-charcoal text-sm">{order.productName}</div>
                        <div className="text-xs text-gray-500">Qty: {order.quantity}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="font-bold text-forest">₹{order.amount.toLocaleString()}</div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button onClick={(e) => { e.stopPropagation(); alert('Order details dialog opened.'); }} className="p-2 text-gray-400 group-hover:text-forest transition-colors rounded-full hover:bg-gray-100">
                      <MoreVertical size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredOrders.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="text-gray-300" size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-400 mb-1">No orders found</h3>
            <p className="text-gray-500 text-sm">Try adjusting your filters or search term.</p>
          </div>
        )}
      </div>
    </div>
  );
};
