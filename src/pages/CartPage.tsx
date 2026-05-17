import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../components/CartProvider';
import { formatPrice, cn } from '../lib/utils';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="bg-brand-nude min-h-screen pt-32 flex items-center justify-center">
        <div className="text-center space-y-8 max-w-lg px-6">
           <div className="mx-auto h-32 w-32 rounded-full bg-white flex items-center justify-center text-brand-beige mb-12 shadow-inner">
              <ShoppingBag className="h-16 w-16" />
           </div>
           <h2 className="text-5xl font-serif font-black italic text-brand-coffee shrink-0">Your Palate is Empty</h2>
           <p className="text-brand-brown/50 font-medium italic">Explore our curated collection and discover flavors that resonate with your soul.</p>
           <Link to="/menu" className="inline-flex items-center gap-4 bg-brand-coffee px-10 py-5 rounded-3xl text-[10px] font-black uppercase tracking-[0.3em] text-white hover:bg-brand-gold transition-all shadow-2xl shadow-brand-coffee/20">
              Return to Gallery
              <ArrowRight className="h-4 w-4" />
           </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-nude min-h-screen pt-32 pb-40">
      <div className="container mx-auto px-6 max-w-7xl">
         <div className="flex flex-col lg:flex-row gap-20">
            {/* Items List */}
            <div className="flex-1 space-y-12">
               <div className="space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-gold">Your Selection</p>
                  <h1 className="text-6xl font-serif font-black italic text-brand-coffee">The Cart</h1>
               </div>

               <div className="space-y-6">
                  <AnimatePresence mode="popLayout">
                    {items.map((item) => (
                      <motion.div 
                        key={`${item.id}-${JSON.stringify(item.customization)}`}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-white p-8 rounded-[3.5rem] shadow-3xl border border-brand-beige/20 flex gap-8 group"
                      >
                         <div className="h-32 w-32 rounded-[2rem] overflow-hidden shrink-0 shadow-lg border border-brand-beige">
                            <img src={item.image} className="h-full w-full object-cover transition-transform group-hover:scale-110" />
                         </div>
                         
                         <div className="flex-1 flex flex-col justify-between py-2">
                            <div className="flex justify-between items-start">
                               <div>
                                  <h3 className="text-2xl font-serif font-black italic text-brand-coffee">{item.name}</h3>
                                  <p className="text-[10px] text-brand-brown/40 font-black uppercase tracking-widest mt-1">
                                     {item.customization?.spice} • {item.customization?.onion ? 'With Onion' : 'No Onion'} {item.customization?.cheese ? '• Extra Cheese' : ''}
                                  </p>
                               </div>
                               <button 
                                 onClick={() => removeFromCart(item.id, item.customization)}
                                 className="h-10 w-10 flex items-center justify-center rounded-2xl bg-brand-nude text-brand-brown group-hover:bg-red-50 group-hover:text-red-500 transition-all"
                               >
                                  <Trash2 className="h-4 w-4" />
                               </button>
                            </div>

                            <div className="flex justify-between items-center">
                               <div className="flex items-center gap-4 bg-brand-nude p-1.5 rounded-2xl border border-brand-beige/50">
                                  <button 
                                    onClick={() => updateQuantity(item.id, -1, item.customization)}
                                    className="h-8 w-8 flex items-center justify-center rounded-xl bg-white shadow-sm hover:bg-brand-gold hover:text-white transition-all"
                                  >
                                     <Minus className="h-3 w-3" />
                                  </button>
                                  <span className="w-4 text-center font-serif italic font-bold">{item.quantity}</span>
                                  <button 
                                    onClick={() => updateQuantity(item.id, 1, item.customization)}
                                    className="h-8 w-8 flex items-center justify-center rounded-xl bg-white shadow-sm hover:bg-brand-gold hover:text-white transition-all"
                                  >
                                     <Plus className="h-3 w-3" />
                                  </button>
                               </div>
                               <p className="text-xl font-serif font-bold italic text-brand-coffee">{formatPrice(item.price * item.quantity)}</p>
                            </div>
                         </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
               </div>
            </div>

            {/* Summary Card */}
            <div className="w-full lg:w-[400px]">
               <div className="sticky top-40 bg-brand-coffee p-12 rounded-[4rem] text-brand-nude shadow-3xl space-y-12">
                  <h2 className="text-3xl font-serif font-black italic">Collection Summary</h2>
                  
                  <div className="space-y-6 pt-12 border-t border-white/10">
                     <div className="flex justify-between items-center text-brand-nude/40 text-[10px] font-black uppercase tracking-widest">
                        <span>Subtotal</span>
                        <span className="text-white">{formatPrice(totalPrice)}</span>
                     </div>
                     <div className="flex justify-between items-center text-brand-nude/40 text-[10px] font-black uppercase tracking-widest">
                        <span>Artisan Fee (GST)</span>
                        <span className="text-white">{formatPrice(totalPrice * 0.05)}</span>
                     </div>
                     <div className="flex justify-between items-center text-brand-nude/40 text-[10px] font-black uppercase tracking-widest">
                        <span>Service Charge</span>
                        <span className="text-white">{formatPrice(40)}</span>
                     </div>
                     <div className="h-px bg-white/10 w-full" />
                     <div className="flex justify-between items-center pt-2">
                        <span className="font-serif italic text-2xl">Grand Total</span>
                        <span className="text-3xl font-serif font-black text-brand-gold italic">{formatPrice(totalPrice * 1.05 + 40)}</span>
                     </div>
                  </div>

                  <Link 
                    to="/checkout"
                    className="w-full h-20 bg-brand-gold rounded-[2rem] flex items-center justify-center gap-4 text-[12px] font-black uppercase tracking-[0.4em] text-white hover:bg-white hover:text-brand-coffee transition-all shadow-2xl shadow-brand-gold/20 group"
                  >
                     Proceed to Checkout
                     <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                  </Link>

                  <p className="text-center text-[8px] font-black uppercase tracking-widest text-brand-nude/20">
                     Includes complimentary session insights
                  </p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
