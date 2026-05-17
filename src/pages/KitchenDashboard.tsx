import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy, doc, updateDoc, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat, Clock, CheckCircle2, Play, AlertCircle, Utensils, Flame, Bell, Trash2 } from 'lucide-react';
import { cn, formatPrice } from '../lib/utils';

export default function KitchenDashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    const q = query(
      collection(db, "orders"),
      where("status", "!=", "delivered"),
      orderBy("status"),
      orderBy("createdAt", "asc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  const updateStatus = async (orderId: string, status: string) => {
    try {
      await updateDoc(doc(db, "orders", orderId), { status });
    } catch (error) {
      console.error("Update error", error);
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending': return { label: 'Waiting', color: 'bg-red-500 text-white', icon: '⏳' };
      case 'preparing': return { label: 'In Fire', color: 'bg-brand-gold text-white', icon: '🍳' };
      case 'ready': return { label: 'At Pass', color: 'bg-emerald-500 text-white', icon: '🍽️' };
      default: return { label: status, color: 'bg-slate-200 text-slate-600', icon: '•' };
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream/30 p-8 lg:p-12">
      <div className="flex flex-col xl:flex-row items-center justify-between gap-10 mb-16">
        <div className="flex items-center gap-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-[2rem] bg-brand-coffee text-brand-gold shadow-2xl">
             <ChefHat className="h-10 w-10" />
          </div>
          <div>
            <h1 className="text-5xl font-serif font-black italic text-brand-coffee">Kitchen Pass</h1>
            <p className="text-brand-brown/40 font-black uppercase tracking-[0.2em] text-[10px]">Real-time Gastronomy Flow</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 bg-white p-2 rounded-[2rem] shadow-xl border border-brand-beige/20">
           {["all", "pending", "preparing", "ready"].map(f => (
             <button
               key={f}
               onClick={() => setActiveFilter(f)}
               className={cn(
                 "px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                 activeFilter === f ? "bg-brand-coffee text-white shadow-xl shadow-brand-coffee/20" : "text-brand-brown/40 hover:text-brand-coffee"
               )}
             >
               {f}
             </button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
        <AnimatePresence mode="popLayout">
          {orders.filter(o => activeFilter === "all" || o.status === activeFilter).map((order, idx) => {
            const config = getStatusConfig(order.status);
            return (
              <motion.div
                layout
                key={order.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", damping: 20, stiffness: 100 }}
                className="flex flex-col rounded-[3rem] bg-white shadow-2xl shadow-brand-coffee/5 overflow-hidden border border-brand-beige/20 h-fit"
              >
                {/* Header */}
                <div className="p-8 border-b border-brand-beige flex items-center justify-between bg-brand-cream/10">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl font-serif font-black italic text-brand-coffee">#{order.tableId}</span>
                    <div className="h-2 w-2 rounded-full bg-brand-gold animate-pulse" />
                  </div>
                  <div className={cn("px-4 py-2 rounded-2xl font-black uppercase tracking-widest text-[9px] flex items-center gap-2", config.color)}>
                    <span>{config.icon}</span>
                    {config.label}
                  </div>
                </div>

                {/* Items */}
                <div className="flex-1 p-8 space-y-6">
                  <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-brand-brown/30">
                     <span className="flex items-center gap-2"><Clock className="h-3 w-3" /> {order.createdAt?.toDate ? new Date(order.createdAt.toDate()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Now'}</span>
                     <span>{order.customerType || 'Table'} Service</span>
                  </div>

                  <div className="space-y-4">
                     {order.items.map((item: any, iidx: number) => (
                       <div key={iidx} className="flex flex-col gap-2 p-4 rounded-2xl bg-brand-cream/30 border border-brand-beige/20">
                         <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                               <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-coffee text-white text-[10px] font-black">{item.quantity}</span>
                               <span className="text-lg font-serif font-bold italic text-brand-coffee">{item.name}</span>
                            </div>
                         </div>
                         {item.customization && Object.keys(item.customization).length > 0 && (
                           <div className="flex flex-wrap gap-2 mt-2">
                              {Object.entries(item.customization).map(([k, v]) => (
                                v && (
                                  <span key={k} className="px-2 py-1 rounded-lg bg-white border border-brand-beige text-[8px] font-black uppercase tracking-tighter text-brand-gold">
                                    {k}: {String(v)}
                                  </span>
                                )
                              ))}
                           </div>
                         )}
                       </div>
                     ))}
                  </div>

                  {order.customNotes && (
                    <div className="mt-8 p-5 rounded-[2rem] bg-brand-nude border border-brand-gold/30 flex gap-4 items-start">
                       <AlertCircle className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
                       <p className="text-xs text-brand-coffee italic font-serif font-medium leading-relaxed">{order.customNotes}</p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="p-6 bg-brand-cream/10 border-t border-brand-beige">
                  <div className="flex gap-4">
                    {order.status === 'pending' && (
                       <button
                          onClick={() => updateStatus(order.id, 'preparing')}
                          className="flex-1 flex items-center justify-center gap-3 rounded-2xl bg-brand-coffee text-white py-5 text-[10px] font-black uppercase tracking-widest hover:bg-brand-gold transition-all shadow-xl shadow-brand-coffee/20"
                       >
                          <Flame className="h-4 w-4" /> Start Fire 🍳
                       </button>
                    )}
                    {order.status === 'preparing' && (
                       <button
                          onClick={() => updateStatus(order.id, 'ready')}
                          className="flex-1 flex items-center justify-center gap-3 rounded-2xl bg-brand-gold text-white py-5 text-[10px] font-black uppercase tracking-widest hover:bg-brand-coffee transition-all shadow-xl shadow-brand-gold/20"
                       >
                          <Bell className="h-4 w-4" /> Call Pass ✅
                       </button>
                    )}
                    {order.status === 'ready' && (
                       <button
                          onClick={() => updateStatus(order.id, 'delivered')}
                          className="flex-1 flex items-center justify-center gap-3 rounded-2xl bg-emerald-500 text-white py-5 text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20"
                       >
                          <CheckCircle2 className="h-4 w-4" /> Delivered 🍽️
                       </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

