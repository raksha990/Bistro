import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, CheckCircle2, Utensils, ChefHat, Bell, Download, ArrowLeft, Receipt, Star } from 'lucide-react';
import { cn, formatPrice } from '../lib/utils';
import { jsPDF } from 'jspdf';

export default function OrderTrackingPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!orderId) return;
    const unsub = onSnapshot(doc(db, "orders", orderId), (doc) => {
      setOrder({ id: doc.id, ...doc.data() });
    });
    return () => unsub();
  }, [orderId]);

  const downloadBill = () => {
    if (!order) return;
    const doc = new jsPDF();
    
    doc.setFontSize(22);
    doc.text("BISTRO GASTRONOMY", 105, 20, { align: 'center' });
    doc.setFontSize(10);
    doc.text("The Zenith of Dining Experience", 105, 28, { align: 'center' });
    
    doc.line(20, 35, 190, 35);
    
    doc.text(`Order ID: #${order.id.toUpperCase()}`, 20, 45);
    doc.text(`Table: ${order.tableId}`, 20, 52);
    doc.text(`Date: ${new Date().toLocaleString()}`, 20, 59);
    
    doc.line(20, 65, 190, 65);
    doc.text("Item", 20, 75);
    doc.text("Qty", 140, 75);
    doc.text("Price", 170, 75);
    doc.line(20, 78, 190, 78);
    
    let y = 85;
    order.items.forEach((item: any) => {
      doc.text(item.name, 20, y);
      doc.text(item.quantity.toString(), 140, y);
      doc.text(`INR ${item.price * item.quantity}`, 170, y);
      y += 10;
    });
    
    doc.line(20, y, 190, y);
    y += 10;
    doc.setFontSize(12);
    doc.text(`Total Paid: INR ${order.total.toFixed(2)}`, 170, y, { align: 'right' });
    
    doc.setFontSize(10);
    doc.text("Thank you for dining with us.", 105, y + 20, { align: 'center' });
    
    doc.save(`bill-${orderId}.pdf`);
  };

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-brand-cream/30">
        <div className="h-16 w-16 border-4 border-brand-gold border-t-transparent rounded-full animate-spin mb-4" />
        <p className="font-serif italic text-brand-coffee">Tracing your gastronomy journey...</p>
      </div>
    );
  }

  const steps = [
    { id: 'pending', label: 'Order Placed', icon: Clock, desc: 'Your selections are being reviewed.' },
    { id: 'preparing', label: 'In Kitchen', icon: ChefHat, desc: 'Our chefs are crafting your meal 🍳' },
    { id: 'ready', label: 'Ready to Serve', icon: Bell, desc: 'Your masterpiece is ready ✅' },
    { id: 'delivered', label: 'Delivered', icon: Utensils, desc: 'Enjoy your culinary treat ❤️' }
  ];

  const currentStepIndex = steps.findIndex(s => s.id === order.status);

  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <div className="flex items-center justify-between mb-16">
        <button onClick={() => navigate('/menu')} className="flex items-center gap-2 text-brand-brown/40 hover:text-brand-coffee transition-colors font-black uppercase tracking-widest text-[10px]">
           <ArrowLeft className="h-4 w-4" /> Back to Menu
        </button>
        <div className="px-4 py-2 rounded-full bg-brand-gold/10 text-brand-gold text-[10px] font-black uppercase tracking-widest">Live Tracking</div>
      </div>

      <div className="text-center mb-20">
         <h1 className="text-6xl font-serif font-black italic text-brand-coffee mb-6 italic">The Progress</h1>
         <p className="text-brand-brown/50 font-medium">Your order <span className="text-brand-gold">#{orderId?.slice(-6).toUpperCase()}</span> is currently in transit.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-20">
         {steps.map((step, idx) => (
           <div key={step.id} className="relative flex flex-col items-center text-center">
              <div className={cn(
                "h-20 w-20 rounded-[2rem] flex items-center justify-center mb-6 transition-all duration-700 relative z-10 shadow-2xl",
                idx <= currentStepIndex ? "bg-brand-coffee text-brand-gold scale-110 shadow-brand-coffee/20" : "bg-white text-brand-beige border border-brand-beige"
              )}>
                 <step.icon className="h-8 w-8" />
                 {idx < currentStepIndex && (
                   <div className="absolute -top-2 -right-2 h-6 w-6 bg-emerald-500 rounded-full flex items-center justify-center text-white border-2 border-white">
                      <CheckCircle2 className="h-3 w-3" />
                   </div>
                 )}
              </div>
              <h3 className={cn("text-xs font-black uppercase tracking-widest mb-2", idx <= currentStepIndex ? "text-brand-coffee" : "text-brand-brown/30")}>
                {step.label}
              </h3>
              <p className="text-[10px] text-brand-brown/40 font-medium max-w-[120px]">{step.desc}</p>
              
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-full h-[2px] bg-brand-beige -z-0">
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: idx < currentStepIndex ? '100%' : '50%' }}
                     className="h-full bg-brand-gold"
                   />
                </div>
              )}
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
         {/* Order Details Card */}
         <div className="bg-white rounded-[3rem] p-10 shadow-3xl border border-brand-beige/20">
            <div className="flex items-center gap-3 mb-10">
               <Receipt className="h-5 w-5 text-brand-gold" />
               <h3 className="font-serif text-xl font-bold italic text-brand-coffee">Order Manifest</h3>
            </div>
            
            <div className="space-y-6 mb-10">
               {order.items?.map((item: any, idx: number) => (
                 <div key={idx} className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                       <span className="h-6 w-6 rounded-lg bg-brand-cream text-brand-gold flex items-center justify-center text-[10px] font-black">{item.quantity}</span>
                       <span className="text-sm font-bold text-brand-coffee">{item.name}</span>
                    </div>
                    <span className="text-brand-brown/40 font-medium">₹{item.price * item.quantity}</span>
                 </div>
               ))}
            </div>

            <div className="pt-6 border-t border-brand-beige flex justify-between items-center mb-10">
               <span className="font-serif italic font-bold">Total Settled</span>
               <span className="text-2xl font-black text-brand-gold">{formatPrice(order.total)}</span>
            </div>

            <button
               onClick={downloadBill}
               className="w-full flex items-center justify-center gap-3 rounded-2xl bg-brand-cream py-5 text-[10px] font-black uppercase tracking-widest text-brand-gold hover:bg-brand-gold hover:text-white transition-all border border-brand-gold/20"
            >
               <Download className="h-4 w-4" /> Download Official Receipt
            </button>
         </div>

         {/* Experience Card */}
         <div className="bg-brand-coffee p-10 rounded-[3rem] text-brand-nude shadow-3xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 h-48 w-48 rounded-full bg-brand-gold/10 blur-3xl" />
            <div>
               <h3 className="text-2xl font-serif font-black italic mb-6">Enjoy the Experience</h3>
               <p className="text-brand-nude/50 mb-10 leading-relaxed font-medium">Sit back and relax. Our stewards are ensuring every detail of your meal meets the Bistro standard.</p>
               
               <div className="flex gap-4 mb-4 text-brand-gold">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} className="h-4 w-4 fill-current" />)}
               </div>
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-gold">5 Star Gastronomy</p>
            </div>

            <button 
              onClick={() => navigate('/feedback')}
              className="mt-12 w-full py-5 rounded-2xl border border-brand-nude/20 text-brand-nude hover:bg-brand-nude hover:text-brand-coffee transition-all text-[10px] font-black uppercase tracking-widest"
            >
              Share Your Experience
            </button>
         </div>
      </div>
    </div>
  );
}
