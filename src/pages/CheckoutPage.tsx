import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../components/CartProvider';
import { CreditCard, Wallet, Smartphone, CheckCircle, ArrowLeft, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useNotifications } from '../components/NotificationProvider';
import { db } from '../lib/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { cn, formatPrice } from '../lib/utils';

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const { addNotification } = useNotifications();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [orderDetails, setOrderDetails] = useState({ hostName: '', tableNumber: '', guestCount: '' });

  const handlePlaceOrder = async () => {
    if (!orderDetails.tableNumber) {
      addNotification({ title: "Incomplete Details", message: "Please enter a table number.", type: 'error' });
      return;
    }

    setIsProcessing(true);
    try {
      // Create order in Firestore
      const orderRef = await addDoc(collection(db, "orders"), {
        items: items.map(i => ({
          id: i.id,
          name: i.name,
          quantity: i.quantity,
          price: i.price,
          customization: i.customization || {}
        })),
        total: totalPrice * 1.05 + 40,
        status: 'pending',
        createdAt: serverTimestamp(),
        tableId: orderDetails.tableNumber,
        hostName: orderDetails.hostName,
        guestCount: orderDetails.guestCount,
        paymentMethod
      });

      setIsProcessing(false);
      setIsSuccess(true);
      
      addNotification({
        title: "Order Secured",
        message: "Your culinary odyssey has begun! Transferring to tracking...",
        type: 'success'
      });

      clearCart();
      
      setTimeout(() => {
         navigate(`/tracking/${orderRef.id}`);
      }, 4000);
    } catch (error) {
      console.error("Error placing order:", error);
      setIsProcessing(false);
      addNotification({ title: "Order Failed", message: "Connectivity error. Please try again.", type: 'error' });
    }
  };

  if (isSuccess) {
    return (
       <div className="bg-brand-nude min-h-screen pt-32 flex items-center justify-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center space-y-8 p-12"
          >
             <div className="mx-auto h-32 w-32 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-500 mb-8 border-[10px] border-emerald-50 text-6xl">
                <CheckCircle className="h-16 w-16" />
             </div>
             <h2 className="text-6xl font-serif font-black italic text-brand-coffee">Order Secured</h2>
             <p className="text-brand-brown/50 font-medium italic text-lg max-w-sm mx-auto">
               Your culinary masterpieces are now being meticulously prepared. Redirecting you to track your order...
             </p>
             <div className="flex justify-center pt-8">
                <Loader2 className="h-8 w-8 animate-spin text-brand-gold" />
             </div>
          </motion.div>
       </div>
    );
  }

  const grandTotal = totalPrice * 1.05 + 40;

  return (
    <div className="bg-brand-nude min-h-screen pt-32 pb-40">
      <div className="container mx-auto px-6 max-w-5xl">
         <div className="flex flex-col gap-16">
            <div className="flex items-center justify-between">
               <Link to="/cart" className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-brand-brown/50 hover:text-brand-gold transition-colors group">
                  <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                  Back to Selection
               </Link>
               <h1 className="text-4xl font-serif font-black italic text-brand-coffee">Checkout</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
               {/* Left: Forms */}
               <div className="space-y-12">
                  <div className="space-y-8">
                     <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-gold">Delivery Details</p>
                     <div className="grid gap-6">
                        <input 
                           placeholder="Host Name" 
                           className="w-full bg-white border border-brand-beige p-6 rounded-3xl outline-none focus:ring-2 focus:ring-brand-gold/20 font-medium italic"
                           value={orderDetails.hostName}
                           onChange={(e) => setOrderDetails({ ...orderDetails, hostName: e.target.value })}
                        />
                        <div className="grid grid-cols-2 gap-6">
                           <input 
                              placeholder="Table Number" 
                              className="w-full bg-white border border-brand-beige p-6 rounded-3xl outline-none focus:ring-2 focus:ring-brand-gold/20 font-medium italic"
                              value={orderDetails.tableNumber}
                              onChange={(e) => setOrderDetails({ ...orderDetails, tableNumber: e.target.value })}
                           />
                           <input 
                              placeholder="Guest Count" 
                              className="w-full bg-white border border-brand-beige p-6 rounded-3xl outline-none focus:ring-2 focus:ring-brand-gold/20 font-medium italic"
                              value={orderDetails.guestCount}
                              onChange={(e) => setOrderDetails({ ...orderDetails, guestCount: e.target.value })}
                           />
                        </div>
                     </div>
                  </div>

                  <div className="space-y-8">
                     <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-gold">Payment Architecture</p>
                     <div className="grid gap-4">
                        {[
                          { id: "card", label: "Premium Credit Card", icon: CreditCard },
                          { id: "upi", label: "Digital UPI Gateway", icon: Smartphone },
                          { id: "wallet", label: "Bistro Digital Wallet", icon: Wallet }
                        ].map((method) => (
                           <button
                             key={method.id}
                             onClick={() => setPaymentMethod(method.id)}
                             className={cn(
                                "flex items-center justify-between p-6 rounded-[2rem] border transition-all",
                                paymentMethod === method.id ? "bg-brand-coffee border-brand-coffee text-white shadow-3xl shadow-brand-coffee/20" : "bg-white border-brand-beige text-brand-coffee hover:bg-brand-beige/20"
                             )}
                           >
                              <div className="flex items-center gap-5">
                                 <method.icon className={cn("h-6 w-6", paymentMethod === method.id ? "text-brand-gold" : "text-brand-brown/30")} />
                                 <span className="font-serif italic font-bold">{method.label}</span>
                              </div>
                              <div className={cn("h-5 w-5 rounded-full border-2", paymentMethod === method.id ? "border-brand-gold bg-brand-gold shadow-[0_0_10px_rgba(191,155,48,0.5)]" : "border-brand-beige")} />
                           </button>
                        ))}
                     </div>
                  </div>
               </div>

               {/* Right: Summary Order */}
               <div className="bg-white p-12 rounded-[4rem] border border-brand-beige shadow-3xl h-fit">
                  <h3 className="text-2xl font-serif font-black italic text-brand-coffee mb-10">Order Registry</h3>
                  <div className="space-y-6 mb-12">
                     {items.map(item => (
                        <div key={`${item.id}-${Math.random()}`} className="flex justify-between items-center group">
                           <div className="flex items-center gap-4">
                              <span className="text-[10px] font-black text-brand-gold w-6">x{item.quantity}</span>
                              <span className="font-serif italic font-bold text-brand-coffee group-hover:text-brand-gold transition-colors truncate max-w-[140px]">{item.name}</span>
                           </div>
                           <span className="text-brand-brown/40 font-bold">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                     ))}
                  </div>

                  <div className="space-y-6 pt-10 border-t border-brand-beige">
                     <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-brand-brown/40">
                        <span>Session Total</span>
                        <span className="text-brand-coffee">{formatPrice(totalPrice)}</span>
                     </div>
                     <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-brand-brown/40">
                        <span>Logistics & Art</span>
                        <span className="text-brand-coffee">{formatPrice(totalPrice * 0.05 + 40)}</span>
                     </div>
                     <div className="flex justify-between items-center pt-6 border-t border-brand-beige">
                        <span className="text-2xl font-serif font-black italic">Final Palate</span>
                        <span className="text-3xl font-serif font-black italic text-brand-gold">{formatPrice(grandTotal)}</span>
                     </div>
                  </div>

                  <button 
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="w-full h-20 bg-brand-coffee text-white rounded-[2rem] mt-12 text-[10px] font-black uppercase tracking-[0.4em] shadow-2xl shadow-brand-coffee/20 hover:bg-brand-gold transition-all active:scale-95 flex items-center justify-center gap-4 disabled:bg-brand-brown/20"
                  >
                     {isProcessing ? (
                        <>
                           <Loader2 className="h-6 w-6 animate-spin" />
                           Encrypting Assets...
                        </>
                     ) : (
                        <>
                           Finalize Order • {formatPrice(grandTotal)}
                        </>
                     )}
                  </button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
