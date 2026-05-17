import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, Users, DollarSign, TrendingUp, Clock, CheckCircle2, 
  ChefHat, Package, Plus, Search, Filter, MoreVertical, Edit2, 
  Trash2, Star, MessageSquare, ChevronRight, BarChart3, LayoutDashboard,
  LogOut, Settings, Bell, Utensils
} from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { MENU_ITEMS, MenuItem } from '../constants';
import { cn, formatPrice } from '../lib/utils';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

type Order = {
  id: string;
  tableId: string;
  items: any[];
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'delivered';
  createdAt: any;
  customerType?: string;
};

const stats = [
  { label: 'Total Revenue', value: '₹1,24,500', icon: DollarSign, trend: '+12.5%', color: 'bg-emerald-500' },
  { label: 'Active Orders', value: '18', icon: ShoppingBag, trend: '+4', color: 'bg-brand-gold' },
  { label: 'Customer Satisfaction', value: '4.8/5', icon: Star, trend: '+0.2', color: 'bg-blue-500' },
  { label: 'Average Time', value: '22min', icon: Clock, trend: '-2min', color: 'bg-purple-500' },
];

const chartData = [
  { name: '08:00', value: 400 },
  { name: '10:00', value: 800 },
  { name: '12:00', value: 2400 },
  { name: '14:00', value: 1800 },
  { name: '16:00', value: 1200 },
  { name: '18:00', value: 3200 },
  { name: '20:00', value: 4500 },
  { name: '22:00', value: 2100 },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'menu' | 'feedback'>('overview');
  const [orders, setOrders] = useState<Order[]>([]);
  const [feedback, setFeedback] = useState<any[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(MENU_ITEMS);
  const [isAddingItem, setIsAddingItem] = useState(false);

  useEffect(() => {
    const qO = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const unsubO = onSnapshot(qO, (snapshot) => {
      setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Order[]);
    });

    const qF = query(collection(db, "feedback"), orderBy("createdAt", "desc"));
    const unsubF = onSnapshot(qF, (snapshot) => {
      setFeedback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => { unsubO(); unsubF(); };
  }, []);

  const updateOrderStatus = async (orderId: string, status: Order['status']) => {
    try {
      await updateDoc(doc(db, "orders", orderId), { status });
    } catch (error) {
      console.error("Error updating order", error);
    }
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-brand-cream/30">
      {/* Sidebar */}
      <aside className="w-80 bg-brand-coffee text-brand-nude flex flex-col fixed h-full z-50">
        <div className="p-10 mb-8 text-center sm:text-left">
           <h1 className="font-serif text-3xl font-black italic text-brand-gold">Maitre D'</h1>
           <p className="text-[10px] uppercase tracking-widest text-brand-nude/40 font-black mt-2">Enterprise Control</p>
        </div>

        <nav className="flex-1 px-6 space-y-4">
           {[
             { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
             { id: 'orders', label: 'Order Flow', icon: ChefHat },
             { id: 'menu', label: 'Gastronomy', icon: Utensils },
             { id: 'feedback', label: 'Guest Book', icon: MessageSquare },
           ].map((item) => (
             <button
               key={item.id}
               onClick={() => setActiveTab(item.id as any)}
               className={cn(
                 "w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all",
                 activeTab === item.id 
                  ? "bg-brand-gold text-white shadow-2xl shadow-brand-gold/20" 
                  : "text-brand-nude/40 hover:text-brand-nude hover:bg-white/5"
               )}
             >
               <item.icon className="h-5 w-5" />
               {item.label}
             </button>
           ))}
        </nav>

        <div className="p-8 border-t border-white/5">
           <button className="flex items-center gap-4 px-6 py-4 text-brand-nude/40 hover:text-red-400 transition-colors">
              <LogOut className="h-5 w-5" />
              <span className="text-xs font-black uppercase tracking-widest">Sign Out</span>
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-80 p-12">
        <header className="flex justify-between items-center mb-16">
           <div>
              <h2 className="text-4xl font-serif font-black italic text-brand-coffee">
                {activeTab === 'overview' && 'Bistro Performance'}
                {activeTab === 'orders' && 'The Pass'}
                {activeTab === 'menu' && 'Menu Atelier'}
                {activeTab === 'feedback' && 'Guest Critiques'}
              </h2>
              <p className="text-brand-brown/40 font-medium">Real-time intelligence from the floor.</p>
           </div>
           
           <div className="flex items-center gap-6">
              <button className="relative h-14 w-14 rounded-2xl bg-white shadow-xl flex items-center justify-center text-brand-coffee">
                 <Bell className="h-6 w-6" />
                 <span className="absolute top-4 right-4 h-2 w-2 rounded-full bg-brand-gold" />
              </button>
              <div className="h-14 w-14 rounded-2xl overflow-hidden shadow-xl border-2 border-white">
                 <img src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&q=80&w=100" alt="Admin" />
              </div>
           </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div 
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                {stats.map((stat) => (
                  <div key={stat.label} className="bg-white p-8 rounded-[3rem] shadow-xl shadow-brand-coffee/5 border border-brand-beige/20 group hover:border-brand-gold transition-colors duration-500">
                    <div className="flex justify-between items-start mb-6">
                       <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center text-white shadow-lg", stat.color)}>
                          <stat.icon className="h-6 w-6" />
                       </div>
                       <span className="text-[10px] font-black tracking-widest text-brand-gold bg-brand-cream px-3 py-1.5 rounded-full">{stat.trend}</span>
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-brand-brown/30 mb-1">{stat.label}</p>
                    <h3 className="text-3xl font-serif font-bold italic text-brand-coffee">{stat.value}</h3>
                  </div>
                ))}
              </div>

              {/* Revenue Chart */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                 <div className="xl:col-span-2 bg-white p-10 rounded-[4rem] shadow-xl shadow-brand-coffee/5 border border-brand-beige/20">
                    <div className="flex justify-between items-center mb-10">
                       <h3 className="text-xl font-serif font-black italic text-brand-coffee">Daily Velocity</h3>
                       <div className="flex gap-2">
                          <button className="px-4 py-2 rounded-xl text-[10px] font-black bg-brand-cream text-brand-gold uppercase tracking-widest">Revenue</button>
                          <button className="px-4 py-2 rounded-xl text-[10px] font-black text-brand-brown/40 uppercase tracking-widest hover:text-brand-coffee">Covers</button>
                       </div>
                    </div>
                    <div className="h-80 w-full">
                       <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={chartData}>
                             <defs>
                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                   <stop offset="5%" stopColor="#c6a664" stopOpacity={0.3}/>
                                   <stop offset="95%" stopColor="#c6a664" stopOpacity={0}/>
                                </linearGradient>
                             </defs>
                             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0ece4" />
                             <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#8b5e3c66' }} dy={10} />
                             <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#8b5e3c66' }} />
                             <Tooltip 
                                contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 50px rgba(111,78,55,0.1)', fontWeight: 900 }}
                                cursor={{ stroke: '#c6a664', strokeWidth: 2 }}
                             />
                             <Area type="monotone" dataKey="value" stroke="#c6a664" strokeWidth={4} fillOpacity={1} fill="url(#colorValue)" />
                          </AreaChart>
                       </ResponsiveContainer>
                    </div>
                 </div>

                 <div className="bg-brand-coffee text-brand-nude p-10 rounded-[4rem] shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-brand-gold/10 blur-3xl" />
                    <h3 className="text-xl font-serif font-black italic mb-8 relative z-10">Peak Hours</h3>
                    <div className="space-y-8 relative z-10">
                       {[
                         { time: 'Lunch', duration: '12:00 - 14:00', intensity: 85 },
                         { time: 'Tea Time', duration: '16:30 - 18:00', intensity: 45 },
                         { time: 'Dinner', duration: '20:00 - 22:30', intensity: 95 },
                       ].map(slot => (
                         <div key={slot.time}>
                            <div className="flex justify-between items-end mb-3">
                               <div>
                                  <p className="text-[10px] font-black uppercase tracking-widest text-brand-nude/40">{slot.time}</p>
                                  <p className="font-serif italic font-bold">{slot.duration}</p>
                               </div>
                               <span className="text-brand-gold font-black text-xl">{slot.intensity}%</span>
                            </div>
                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                               <motion.div 
                                 initial={{ width: 0 }}
                                 animate={{ width: `${slot.intensity}%` }}
                                 className="h-full bg-brand-gold rounded-full"
                               />
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'orders' && (
            <motion.div 
              key="orders"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 gap-8"
            >
              <div className="bg-white rounded-[4rem] overflow-hidden shadow-xl shadow-brand-coffee/5 border border-brand-beige/20">
                <div className="p-10 border-b border-brand-beige flex justify-between items-center">
                  <h3 className="text-xl font-serif font-black italic text-brand-coffee">Live Pass</h3>
                  <div className="flex gap-4">
                     <div className="flex items-center gap-2 px-4 py-2 bg-brand-cream rounded-xl">
                        <div className="h-2 w-2 rounded-full bg-brand-gold animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-brand-gold">Listening</span>
                     </div>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-brand-cream/50 text-[10px] font-black uppercase tracking-[0.2em] text-brand-brown/40">
                      <tr>
                        <th className="px-10 py-6">Order ID</th>
                        <th className="px-6 py-6">Table</th>
                        <th className="px-6 py-6">Items</th>
                        <th className="px-6 py-6">Status</th>
                        <th className="px-6 py-6">Total</th>
                        <th className="px-10 py-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-beige">
                      {orders.map((order) => (
                        <tr key={order.id} className="group hover:bg-brand-cream/20 transition-colors">
                          <td className="px-10 py-6">
                            <span className="text-xs font-black text-brand-coffee">#{order.id.slice(0, 8).toUpperCase()}</span>
                          </td>
                          <td className="px-6 py-6">
                            <span className="px-3 py-1.5 rounded-xl bg-brand-coffee text-white text-[10px] font-black">T-{order.tableId}</span>
                          </td>
                          <td className="px-6 py-6 max-w-xs">
                            <p className="text-xs text-brand-brown/60 truncate italic">
                              {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                            </p>
                          </td>
                          <td className="px-6 py-6">
                            <span className={cn(
                              "px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest",
                              order.status === 'pending' ? "bg-amber-100 text-amber-700" :
                              order.status === 'preparing' ? "bg-blue-100 text-blue-700" :
                              order.status === 'ready' ? "bg-emerald-100 text-emerald-700" :
                              "bg-slate-100 text-slate-700"
                            )}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-6 font-serif italic font-bold text-brand-coffee">
                            {formatPrice(order.total)}
                          </td>
                          <td className="px-10 py-6 text-right">
                            <div className="flex justify-end gap-2">
                              {order.status === 'pending' && (
                                <button 
                                  onClick={() => updateOrderStatus(order.id, 'preparing')}
                                  className="p-3 bg-brand-gold text-white rounded-xl hover:scale-110 transition-transform shadow-lg shadow-brand-gold/20"
                                >
                                  <ChefHat className="h-4 w-4" />
                                </button>
                              )}
                              {order.status === 'preparing' && (
                                <button 
                                  onClick={() => updateOrderStatus(order.id, 'ready')}
                                  className="p-3 bg-emerald-500 text-white rounded-xl hover:scale-110 transition-transform shadow-lg shadow-emerald-500/20"
                                >
                                  <Bell className="h-4 w-4" />
                                </button>
                              )}
                              {order.status === 'ready' && (
                                <button 
                                  onClick={() => updateOrderStatus(order.id, 'delivered')}
                                  className="p-3 bg-brand-coffee text-white rounded-xl hover:scale-110 transition-transform shadow-lg shadow-brand-coffee/20"
                                >
                                  <CheckCircle2 className="h-4 w-4" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'menu' && (
            <motion.div 
              key="menu"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-12"
            >
               <div className="flex justify-between items-center bg-white p-8 rounded-[3rem] shadow-xl border border-brand-beige/20">
                  <div>
                     <h3 className="text-xl font-serif font-black italic text-brand-coffee">Menu Collection</h3>
                     <p className="text-brand-brown/40 text-xs font-medium">{menuItems.length} Signature Creations</p>
                  </div>
                  <button 
                    onClick={() => setIsAddingItem(true)}
                    className="flex items-center gap-3 px-8 py-5 bg-brand-coffee text-white rounded-3xl font-black uppercase tracking-[0.2em] text-xs hover:bg-brand-gold transition-all shadow-2xl shadow-brand-coffee/20"
                  >
                    <Plus className="h-5 w-5" />
                    New Creation
                  </button>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                  {menuItems.map(item => (
                    <div key={item.id} className="group bg-white rounded-[3rem] p-6 shadow-xl shadow-brand-coffee/5 border border-brand-beige/20 hover:border-brand-gold transition-all duration-500">
                       <div className="relative h-48 rounded-[2rem] overflow-hidden mb-6">
                          <img src={item.image} alt={item.name} className="h-full w-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700" />
                          <div className="absolute top-4 right-4 flex gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                             <button className="p-3 bg-white/90 backdrop-blur-md rounded-xl text-brand-coffee hover:text-brand-gold">
                                <Edit2 className="h-4 w-4" />
                             </button>
                             <button 
                               onClick={() => deleteMenuItem(item.id)}
                               className="p-3 bg-white/90 backdrop-blur-md rounded-xl text-red-500 hover:bg-red-50"
                             >
                                <Trash2 className="h-4 w-4" />
                             </button>
                          </div>
                          <div className="absolute bottom-4 left-4">
                             <span className="px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md text-[8px] font-black uppercase tracking-widest text-brand-coffee shadow-lg italic">
                                {item.category}
                              </span>
                          </div>
                       </div>
                       <h4 className="font-serif text-xl font-black italic text-brand-coffee mb-2 group-hover:text-brand-gold transition-colors">{item.name}</h4>
                       <div className="flex justify-between items-center">
                          <span className="font-serif italic font-bold text-brand-gold">{formatPrice(item.price)}</span>
                          <div className="flex items-center gap-1 text-[10px] font-black text-brand-brown/40">
                             <Star className="h-3 w-3 fill-brand-gold text-brand-gold" />
                             {item.rating}
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
            </motion.div>
          )}

          {activeTab === 'feedback' && (
            <motion.div 
              key="feedback"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto"
            >
               <div className="space-y-6">
                  {feedback.length > 0 ? feedback.map(f => (
                    <div key={f.id} className="bg-white p-10 rounded-[3rem] shadow-xl border border-brand-beige/20">
                       <div className="flex justify-between mb-6">
                          <div className="flex gap-4 items-center">
                             <div className="h-12 w-12 rounded-2xl bg-brand-cream flex items-center justify-center text-brand-gold font-black italic uppercase">Guest</div>
                             <div>
                                <h4 className="font-serif font-black italic text-brand-coffee">Anonymous Guest</h4>
                                <p className="text-[10px] uppercase tracking-widest text-brand-brown/30 font-black">
                                  {f.createdAt?.toDate ? new Date(f.createdAt.toDate()).toLocaleDateString() : 'Recent'}
                                </p>
                             </div>
                          </div>
                          <div className="flex gap-1 text-brand-gold">
                             {Array.from({ length: f.rating || 5 }).map((_, idx) => <Star key={idx} className="h-4 w-4 fill-current" />)}
                          </div>
                       </div>
                       <p className="text-brand-brown/60 leading-relaxed italic font-medium">
                         "{f.comment || 'No comment provided'}"
                       </p>
                    </div>
                  )) : (
                    <div className="text-center py-20">
                       <MessageSquare className="h-20 w-20 text-brand-beige mx-auto mb-6" />
                       <h3 className="font-serif text-2xl font-black italic text-brand-coffee">No Reviews Yet</h3>
                       <p className="text-brand-brown/40">Critics are still savoring the experience.</p>
                    </div>
                  )}
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

