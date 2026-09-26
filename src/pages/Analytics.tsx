import React from 'react';
import { useApp } from '../store';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { Sparkles, TrendingUp, Users, Package } from 'lucide-react';

export const Analytics: React.FC = () => {
  const { analytics } = useApp();

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-forest-dark">Business Analytics</h1>
          <p className="text-gray-600">Track your performance over the last 30 days.</p>
        </div>
        <select className="px-4 py-2 bg-white border border-sand rounded-xl focus:outline-none focus:ring-2 focus:ring-forest/20 text-sm font-medium">
          <option>Last 30 Days</option>
          <option>Last 90 Days</option>
          <option>This Year</option>
        </select>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-6 border border-green-100 shadow-sm relative overflow-hidden">
        <Sparkles className="absolute -right-4 -top-4 text-green-200/50 w-32 h-32" />
        <h3 className="font-bold text-forest-dark mb-4 flex items-center">
          <Sparkles size={18} className="mr-2 text-green-600" /> AI Growth Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
          <div className="bg-white/60 p-4 rounded-xl border border-white/40">
            <div className="flex items-center text-forest mb-2">
              <Users size={16} className="mr-2" /> <span className="font-semibold text-sm">Buyer Growth</span>
            </div>
            <p className="text-sm text-gray-700">Buyer interest increased <strong>24%</strong> this month. Hotels are your fastest-growing buyer segment.</p>
          </div>
          <div className="bg-white/60 p-4 rounded-xl border border-white/40">
            <div className="flex items-center text-forest mb-2">
              <Package size={16} className="mr-2" /> <span className="font-semibold text-sm">Top Category</span>
            </div>
            <p className="text-sm text-gray-700"><strong>Gond wall art</strong> generates 41% of your inquiries. Consider adding more variations.</p>
          </div>
          <div className="bg-white/60 p-4 rounded-xl border border-white/40">
            <div className="flex items-center text-forest mb-2">
              <TrendingUp size={16} className="mr-2" /> <span className="font-semibold text-sm">Pricing Optimization</span>
            </div>
            <p className="text-sm text-gray-700">Your average order value grew by ₹1,200 after AI pricing recommendations.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-sand">
          <div className="mb-6">
            <h3 className="font-bold text-charcoal">Revenue</h3>
            <p className="text-sm text-gray-500">Total earnings over time</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C96B4B" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#C96B4B" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="date" tick={{fontSize: 12}} tickLine={false} axisLine={false} minTickGap={30} />
                <YAxis tick={{fontSize: 12}} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value/1000}k`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  formatter={(value: any) => [`₹${value.toLocaleString()}`, 'Revenue']}
                />
                <Area type="monotone" dataKey="revenue" stroke="#C96B4B" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Inquiries */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-sand">
          <div className="mb-6">
            <h3 className="font-bold text-charcoal">Buyer Inquiries</h3>
            <p className="text-sm text-gray-500">Leads generated per day</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="date" tick={{fontSize: 12}} tickLine={false} axisLine={false} minTickGap={30} />
                <YAxis tick={{fontSize: 12}} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: '#f5f5f5' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="inquiries" fill="#24543A" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Product Views */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-sand lg:col-span-2">
          <div className="mb-6">
            <h3 className="font-bold text-charcoal">Catalog Views</h3>
            <p className="text-sm text-gray-500">How many times your products were seen</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analytics} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="date" tick={{fontSize: 12}} tickLine={false} axisLine={false} minTickGap={30} />
                <YAxis tick={{fontSize: 12}} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Line type="monotone" dataKey="views" stroke="#D7A84B" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: '#D7A84B', stroke: '#fff', strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
