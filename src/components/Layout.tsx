import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Utensils, ChefHat, LayoutDashboard, MessageSquare, Instagram, Facebook, Twitter, MapPin, Phone, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../components/CartProvider';
import { useAuth } from '../components/AuthProvider';
import { cn } from '../lib/utils';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { itemCount } = useCart();
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Utensils },
    { name: 'Menu', path: '/menu', icon: Utensils },
    { name: 'About', path: '/about', icon: ChefHat },
    { name: 'Contact', path: '/contact', icon: MessageSquare },
  ];

  const adminItems = [
    { name: 'Kitchen', path: '/kitchen', icon: ChefHat },
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  ];

  return (
    <div className="min-h-screen bg-brand-nude font-sans text-brand-coffee selection:bg-brand-gold selection:text-white">
      {/* Dynamic Navigation */}
      <nav className="fixed top-0 z-[100] w-full border-b border-brand-beige bg-white/70 backdrop-blur-2xl transition-all duration-500">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-12">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-coffee text-brand-gold shadow-2xl transition-transform group-hover:rotate-12 duration-500">
              <Utensils className="h-6 w-6" />
            </div>
            <div className="flex flex-col -gap-1">
              <span className="text-2xl font-serif font-black italic tracking-tighter text-brand-coffee leading-none">Bistro</span>
              <span className="text-[8px] font-black uppercase tracking-[0.4em] text-brand-gold">Gastronomy</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-12">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "relative text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:text-brand-gold group",
                  location.pathname === item.path ? "text-brand-gold" : "text-brand-coffee/60"
                )}
              >
                {item.name}
                <span className={cn(
                  "absolute -bottom-1 left-0 h-0.5 bg-brand-gold transition-all duration-500",
                  location.pathname === item.path ? "w-full" : "w-0 group-hover:w-full"
                )} />
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-6">
             <Link to="/cart" className="relative group">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-coffee text-white shadow-xl transition-all group-hover:bg-brand-gold group-hover:-translate-y-1">
                  <ShoppingCart className="h-5 w-5" />
                </div>
                <AnimatePresence>
                  {itemCount > 0 && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-xl bg-brand-gold text-[10px] font-black text-white shadow-xl border-2 border-white ring-4 ring-brand-gold/10"
                    >
                      {itemCount}
                    </motion.span>
                  )}
                </AnimatePresence>
             </Link>

             <div className="hidden lg:flex items-center gap-4 border-l border-brand-beige pl-6">
                {adminItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-brand-gold/10 text-brand-brown/40 hover:text-brand-gold transition-all"
                    title={item.name}
                  >
                     <item.icon className="h-4 w-4" />
                  </Link>
                ))}
             </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        {children}
      </main>

      {/* Luxury Footer */}
      <footer className="relative z-10 bg-brand-coffee pt-32 pb-12 text-brand-nude overflow-hidden border-t border-brand-gold/20">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent opacity-30" />
        
        <div className="mx-auto max-w-7xl px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-20 lg:grid-cols-12 mb-32">
            {/* Brand Column */}
            <div className="lg:col-span-5 space-y-10">
               <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-brand-gold text-brand-coffee shadow-2xl">
                    <Utensils className="h-8 w-8" />
                  </div>
                  <div>
                    <h2 className="text-4xl font-serif font-black italic tracking-tighter">Bistro</h2>
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-gold">The Art of Gastronomy</p>
                  </div>
               </div>
               <p className="max-w-md text-brand-nude/40 font-medium leading-relaxed italic border-l-2 border-brand-gold/30 pl-8">
                Crafting timeless narratives through the alchemy of spices and tradition. 
                A curated symphony for the most discerning palates.
               </p>
               <div className="flex gap-6 pt-4">
                  {[Instagram, Twitter, Facebook].map((Icon, idx) => (
                    <a key={idx} href="#" className="h-12 w-12 rounded-2xl border border-white/10 flex items-center justify-center hover:bg-brand-gold hover:border-brand-gold transition-all duration-500 group">
                       <Icon className="h-5 w-5 text-white group-hover:scale-110 transition-transform" />
                    </a>
                  ))}
               </div>
            </div>

            {/* Links Columns */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-4">
               <div className="space-y-8">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold">Epigraph</h4>
                  <ul className="space-y-4 text-sm font-medium text-brand-nude/30">
                    <li><Link to="/about" className="hover:text-white transition-colors italic">Our Story</Link></li>
                    <li><Link to="/menu" className="hover:text-white transition-colors italic">The Menu</Link></li>
                    <li><Link to="/contact" className="hover:text-white transition-colors italic">Contact Us</Link></li>
                  </ul>
               </div>
               <div className="space-y-8">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold">The District</h4>
                  <div className="flex gap-4 items-start text-brand-nude/30 text-sm italic font-medium leading-relaxed">
                     <MapPin className="h-4 w-4 text-brand-gold shrink-0 mt-1" />
                     <p>123 Spice Boulevard, <br />Celestial Plaza, IN 560001</p>
                  </div>
                  <div className="flex gap-4 items-start text-brand-nude/30 text-sm italic font-medium">
                     <Phone className="h-4 w-4 text-brand-gold shrink-0 mt-1" />
                     <p>+91 98765 00000</p>
                  </div>
               </div>
               <div className="space-y-8">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold">Horology</h4>
                  <div className="flex gap-4 items-start text-brand-nude/30 text-sm italic font-medium leading-relaxed">
                     <Clock className="h-4 w-4 text-brand-gold shrink-0 mt-1" />
                     <p>Luncheon: 11 - 3 PM <br />Soirée: 7 - 11 PM</p>
                  </div>
               </div>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-nude/10">© 2026 Bistro. Reserved for Excellence.</p>
            <div className="flex gap-8 text-[9px] font-black uppercase tracking-widest text-brand-nude/10">
               <a href="#" className="hover:text-brand-gold transition-colors">Privacy</a>
               <a href="#" className="hover:text-brand-gold transition-colors">Compliance</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Nav */}
      <nav className="fixed bottom-0 z-[100] w-full border-t border-brand-beige bg-white/70 backdrop-blur-2xl lg:hidden">
        <div className="grid h-16 grid-cols-4 items-center">
            {navItems.map((item) => (
               <Link
                 key={item.path}
                 to={item.path}
                 className={cn(
                   "flex flex-col items-center justify-center gap-1",
                   location.pathname === item.path ? "text-brand-gold" : "text-brand-coffee/30"
                 )}
               >
                 <item.icon className="h-4 w-4" />
                 <span className="text-[8px] font-black uppercase tracking-widest">{item.name}</span>
               </Link>
            ))}
        </div>
      </nav>
    </div>
  );
}
