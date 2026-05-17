import React, { createContext, useContext, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, CheckCircle, Clock, Utensils, X } from 'lucide-react';
import { collection, query, where, onSnapshot, orderBy, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from './AuthProvider';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'preparing' | 'ready';
}

interface NotificationContextType {
  addNotification: (n: Omit<Notification, 'id'>) => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    // Listen for order status changes in real-time
    // In a real app, we'd filter by the user's current session/table
    // For this demo, we'll listen for any status change in the latest order
    const q = query(
      collection(db, "orders"),
      orderBy("createdAt", "desc"),
      limit(1)
    );

    const unsub = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "modified") {
          const data = change.doc.data();
          const status = data.status;
          
          let title = "Order Update";
          let message = "";
          let type: Notification['type'] = 'info';

          if (status === 'preparing') {
            title = "Cooking Status";
            message = "Your order is being prepared 👨‍🍳";
            type = 'preparing';
          } else if (status === 'ready') {
            title = "Order Ready";
            message = "Your order is ready for serving 🔔";
            type = 'ready';
          } else if (status === 'completed') {
            title = "Order Served";
            message = "Order delivered successfully ❤️ Enjoy your meal!";
            type = 'success';
          }

          if (message) {
            const id = Math.random().toString(36).substr(2, 9);
            setNotifications(prev => [...prev, { id, title, message, type }]);
            setTimeout(() => {
              setNotifications(prev => prev.filter(n => n.id !== id));
            }, 6000);
          }
        }
      });
    });

    return () => unsub();
  }, []);

  const addNotification = (n: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications(prev => [...prev, { ...n, id }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(notification => notification.id !== id));
    }, 5000);
  };

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
      <div className="fixed top-20 right-4 z-[9999] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {notifications.map((n) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              className="pointer-events-auto flex items-center gap-4 rounded-2xl bg-white p-4 shadow-2xl border border-brand-beige min-w-[280px]"
            >
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                n.type === 'success' ? 'bg-green-100 text-green-600' :
                n.type === 'ready' ? 'bg-orange-100 text-orange-600' :
                n.type === 'preparing' ? 'bg-brand-beige text-brand-coffee' :
                'bg-slate-100 text-slate-600'
              }`}>
                {n.type === 'success' ? <CheckCircle /> : n.type === 'ready' ? <Bell /> : <Clock />}
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-brand-coffee font-serif">{n.title}</h4>
                <p className="text-xs text-slate-500">{n.message}</p>
              </div>
              <button 
                onClick={() => setNotifications(prev => prev.filter(notif => notif.id !== n.id))}
                className="text-slate-300 hover:text-slate-500"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
}

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("useNotifications must be used within NotificationProvider");
  return context;
};
