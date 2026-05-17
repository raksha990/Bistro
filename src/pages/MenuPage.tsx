import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Minus, Star, Heart, SlidersHorizontal, Info, X, Zap } from 'lucide-react';
import { MENU_ITEMS, MenuItem } from '../constants';
import { useCart } from '../components/CartProvider';
import { cn, formatPrice } from '../lib/utils';
import { getSmartRecommendations, predictTrendingDishes } from '../services/geminiService';

interface CustomizationModalProps {
  item: MenuItem;
  onClose: () => void;
  onConfirm: (customs: any) => void;
}

function CustomizationModal({ item, onClose, onConfirm }: CustomizationModalProps) {
  const [spice, setSpice] = useState("Medium");
  const [onion, setOnion] = useState(true);
  const [cheese, setCheese] = useState(false);
  const [notes, setNotes] = useState("");

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] flex items-center justify-center bg-brand-coffee/40 p-4 backdrop-blur-sm"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="w-full max-w-lg overflow-hidden rounded-[3rem] bg-white shadow-2xl"
      >
        <div className="relative h-48">
          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md hover:bg-white/40"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-8">
          <div className="mb-6">
            <h2 className="font-serif text-3xl font-black italic text-brand-coffee">{item.name}</h2>
            <p className="text-sm text-slate-500">How would you like your masterpiece prepared?</p>
          </div>

          <div className="space-y-6">
             {/* Spice Level */}
             <div>
               <p className="mb-3 text-[10px] font-black uppercase tracking-widest text-brand-brown/40">Spice Intensity</p>
               <div className="flex gap-2">
                 {["Less Spicy", "Medium", "Extra Spicy"].map((level) => (
                    <button
                      key={level}
                      onClick={() => setSpice(level)}
                      className={cn(
                        "flex-1 rounded-2xl py-2.5 text-xs font-bold transition-all border",
                        spice === level ? "bg-brand-gold border-brand-gold text-white shadow-lg shadow-brand-gold/20" : "bg-white border-brand-beige text-brand-coffee hover:bg-brand-nude"
                      )}
                    >
                      {level === "Extra Spicy" ? "🌶️ " : level === "Less Spicy" ? "😊 " : ""}
                      {level}
                    </button>
                 ))}
               </div>
             </div>

             {/* Toggles */}
             <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setOnion(!onion)}
                  className={cn(
                    "flex flex-col items-center justify-center rounded-3xl p-4 transition-all border",
                    onion ? "bg-white border-brand-beige text-brand-coffee" : "bg-brand-cream border-brand-gold/30 text-brand-gold"
                  )}
                >
                  <span className="text-xl mb-1">{onion ? "🧅" : "🚫"}</span>
                  <span className="text-xs font-bold">{onion ? "Include Onion" : "No Onion"}</span>
                </button>
                <button
                  onClick={() => setCheese(!cheese)}
                  className={cn(
                    "flex flex-col items-center justify-center rounded-3xl p-4 transition-all border",
                    cheese ? "bg-brand-cream border-brand-gold text-brand-gold" : "bg-white border-brand-beige text-brand-coffee"
                  )}
                >
                  <span className="text-xl mb-1">🧀</span>
                  <span className="text-xs font-bold">Extra Cheese</span>
                </button>
             </div>

             {/* Notes */}
             <div>
               <p className="mb-3 text-[10px] font-black uppercase tracking-widest text-brand-brown/40">Special Requests</p>
               <textarea 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="E.g. No salt, allergens, or special instructions..."
                  className="w-full rounded-2xl border border-brand-beige bg-brand-cream/30 p-4 text-sm text-brand-coffee focus:outline-none focus:ring-2 focus:ring-brand-gold/20"
                  rows={2}
               />
             </div>
          </div>

          <button
            onClick={() => onConfirm({ spice, onion, cheese, notes })}
            className="mt-8 w-full rounded-2xl bg-brand-coffee py-4 font-black uppercase tracking-widest text-white shadow-2xl shadow-brand-coffee/20 transition-all hover:bg-brand-gold active:scale-95"
          >
            Add to Order • {formatPrice(item.price)}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [vegOnly, setVegOnly] = useState(false);
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [recommendedItems, setRecommendedItems] = useState<MenuItem[]>([]);
  const [trendingItems, setTrendingItems] = useState<MenuItem[]>([]);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  
  const { items, addToCart, updateQuantity } = useCart();

  useEffect(() => {
    const timer = setTimeout(() => {
      async function loadSmartData() {
        setIsLoadingAI(true);
        const currentTime = new Date().getHours();
        const timeOfDay = currentTime < 12 ? 'Morning' : currentTime < 17 ? 'Afternoon' : 'Evening';
        
        try {
          const [recs, trends] = await Promise.all([
            getSmartRecommendations({
              timeOfDay,
              previousOrders: items.map(i => i.name),
              preferences: vegOnly ? ['Vegetarian'] : [],
              mood: selectedMood || undefined
            }),
            predictTrendingDishes()
          ]);
          
          setRecommendedItems(recs || []);
          setTrendingItems(trends || []);
        } finally {
          setIsLoadingAI(false);
        }
      }
      loadSmartData();
    }, 800);

    return () => clearTimeout(timer);
  }, [vegOnly, selectedMood]);

  const moods = [
    { label: 'Happy', emoji: '😊' },
    { label: 'Relaxed', emoji: '😴' },
    { label: 'Energetic', emoji: '⚡' },
    { label: 'Hungry', emoji: '😋' },
    { label: 'Celebratory', emoji: '🥳' }
  ];

  const categories = ["All", "South Indian", "North Indian", "Chinese", "Pizza", "Desserts"];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      const matchesCategory = activeCategory === "All" || item.category === activeCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesVeg = !vegOnly || item.isVeg;
      return matchesCategory && matchesSearch && matchesVeg;
    });
  }, [activeCategory, searchQuery, vegOnly]);

  const getItemQuantity = (id: string) => {
    return items.filter(i => i.id === id).reduce((sum, i) => sum + i.quantity, 0);
  };

  const handleAddWithCustom = (customs: any) => {
    if (customizingItem) {
      addToCart(customizingItem, customs);
      setCustomizingItem(null);
    }
  };

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    const itemInCart = items.find(i => i.id === itemId);
    if (itemInCart) {
      updateQuantity(itemId, delta, itemInCart.customization);
    } else if (delta > 0) {
      const menuItem = MENU_ITEMS.find(m => m.id === itemId);
      if (menuItem) addToCart(menuItem);
    }
  };

  return (
    <div className="container mx-auto px-6 py-24 max-w-7xl">
      <AnimatePresence>
        {customizingItem && (
          <CustomizationModal 
            item={customizingItem} 
            onClose={() => setCustomizingItem(null)} 
            onConfirm={handleAddWithCustom}
          />
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-20">
        {/* Header & Mood Selector */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-gold">The Grand Menu</p>
              <h1 className="text-6xl md:text-8xl font-serif font-black italic text-brand-coffee leading-none">Curation</h1>
              <p className="text-brand-brown/50 font-medium italic">A symphony of flavors, curated by AI and crafted by hand.</p>
            </div>

            <div className="bg-white p-6 rounded-[3rem] shadow-3xl border border-brand-beige/20 inline-flex flex-col gap-4">
              <p className="text-[8px] font-black uppercase tracking-[0.4em] text-brand-brown/30 px-2 text-center">Your Current Vibe</p>
              <div className="flex gap-3">
                {moods.map((m) => (
                  <button
                    key={m.label}
                    onClick={() => setSelectedMood(m.label)}
                    className={cn(
                      "h-14 w-14 rounded-2xl flex items-center justify-center text-2xl transition-all hover:scale-110",
                      selectedMood === m.label ? "bg-brand-coffee shadow-2xl scale-110" : "bg-brand-nude hover:bg-brand-beige"
                    )}
                    title={m.label}
                  >
                    {m.emoji}
                  </button>
                ))}
              </div>
            </div>
        </div>

        {/* AI Recommendations & Trending */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
            {/* Recommended */}
            <div className="bg-brand-coffee p-12 md:p-16 rounded-[4rem] relative overflow-hidden shadow-3xl border border-white/5">
               <div className="absolute top-0 right-0 -mr-20 -mt-20 h-80 w-80 rounded-full bg-brand-gold/10 blur-3xl" />
               <div className="flex items-center gap-6 mb-12 relative z-10">
                  <div className="h-16 w-16 rounded-3xl bg-brand-gold/20 flex items-center justify-center text-brand-gold border border-brand-gold/30">
                     <Zap className="h-8 w-8 " />
                  </div>
                  <div>
                     <h3 className="text-3xl font-serif font-black italic text-brand-nude">AI Sommelier</h3>
                     <p className="text-brand-nude/30 text-[10px] font-black uppercase tracking-[0.3em]">
                        {selectedMood ? `Resonating with your ${selectedMood} mood` : 'Personalized recommendations'}
                     </p>
                  </div>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                 {isLoadingAI ? (
                   Array.from({ length: 2 }).map((_, i) => (
                     <div key={i} className="h-32 rounded-3xl bg-white/5 animate-pulse" />
                   ))
                 ) : (
                   recommendedItems.slice(0, 2).map(item => (
                     <button
                       key={item.id}
                       onClick={() => setCustomizingItem(item)}
                       className="flex items-center gap-6 p-6 rounded-[3rem] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-brand-gold/50 transition-all text-left group"
                     >
                       <div className="h-20 w-20 rounded-2xl overflow-hidden shrink-0 border border-white/10">
                          <img src={item.image} alt={item.name} loading="lazy" className="h-full w-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700" />
                       </div>
                       <div className="space-y-1">
                          <h4 className="font-serif text-lg font-bold italic text-brand-nude group-hover:text-brand-gold transition-colors">{item.name}</h4>
                          <p className="text-brand-gold text-sm font-bold">{formatPrice(item.price)}</p>
                       </div>
                     </button>
                   ))
                 )}
               </div>
            </div>

            {/* Trending Today */}
            <div className="bg-white p-12 md:p-16 rounded-[4rem] border border-brand-beige/20 shadow-3xl relative overflow-hidden">
               <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-brand-nude blur-3xl opacity-50" />
               <div className="flex items-center gap-6 mb-12 relative z-10">
                  <div className="h-16 w-16 rounded-3xl bg-brand-nude flex items-center justify-center text-brand-gold border border-brand-beige shadow-sm">
                     <Star className="h-8 w-8 text-brand-gold fill-current" />
                  </div>
                  <div>
                     <h3 className="text-3xl font-serif font-black italic text-brand-coffee">Trending</h3>
                     <p className="text-brand-brown/30 text-[10px] font-black uppercase tracking-[0.3em]">The talk of the district</p>
                  </div>
               </div>

               <div className="flex flex-wrap gap-4 relative z-10">
                  {trendingItems.map(item => (
                    <button
                      key={item.id}
                      onClick={() => setCustomizingItem(item)}
                      className="px-6 py-4 rounded-3xl bg-brand-nude border border-brand-beige/30 hover:border-brand-gold hover:bg-white transition-all text-xs font-black uppercase tracking-widest text-brand-coffee flex items-center gap-4 shadow-xl hover:shadow-brand-gold/10 group"
                    >
                      <div className="h-10 w-10 rounded-xl overflow-hidden shrink-0">
                         <img src={item.image} alt={item.name} loading="lazy" className="h-full w-full object-cover group-hover:scale-110 transition-transform" />
                      </div>
                      {item.name}
                      <span className="text-brand-gold animate-pulse text-lg">🔥</span>
                    </button>
                  ))}
               </div>
            </div>
        </div>

        {/* Filters & Search bar */}
        <div className="flex flex-col md:flex-row gap-8 items-center bg-white/50 backdrop-blur-xl p-8 rounded-[3.5rem] border border-brand-beige/20 shadow-2xl">
           <div className="relative flex-1 w-full group">
              <Search className="absolute left-8 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-brown/30 group-focus-within:text-brand-gold transition-colors" />
              <input
                type="text"
                placeholder="Search the collection..."
                className="w-full pl-18 pr-8 py-6 rounded-[2.5rem] bg-brand-nude/50 border border-transparent focus:bg-white focus:border-brand-gold outline-none text-brand-coffee font-medium transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
           </div>
           
           <div className="flex gap-4 w-full md:w-auto overflow-x-auto no-scrollbar">
             {categories.map((cat) => (
               <button
                 key={cat}
                 onClick={() => setActiveCategory(cat)}
                 className={cn(
                   "px-8 py-4 rounded-3xl text-[10px] font-black uppercase tracking-[0.3em] transition-all whitespace-nowrap",
                   activeCategory === cat
                     ? "bg-brand-coffee text-brand-gold shadow-2xl scale-105"
                     : "bg-white text-brand-brown/40 border border-brand-beige hover:border-brand-gold"
                 )}
               >
                 {cat}
               </button>
             ))}
           </div>

           <button 
             onClick={() => setVegOnly(!vegOnly)}
             className={cn(
               "h-[72px] px-10 rounded-[2.5rem] flex items-center gap-4 transition-all shadow-xl whitespace-nowrap",
               vegOnly ? "bg-emerald-500 text-white" : "bg-white text-brand-brown/40 border border-brand-beige/20 hover:border-emerald-500"
             )}
           >
             <div className={cn("h-4 w-4 rounded-full border-2", vegOnly ? "border-white bg-white" : "border-emerald-500")} />
             <span className="text-[10px] font-black uppercase tracking-widest ">Veg Selection</span>
           </button>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
          {filteredItems.map((item, idx) => {
            const qty = getItemQuantity(item.id);
            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx % 8 * 0.05 }}
                className="group flex flex-col rounded-[4rem] bg-white p-6 shadow-3xl hover:shadow-[0_60px_100px_-20px_rgba(111,78,55,0.15)] transition-all duration-700 border border-brand-beige/10 hover:border-brand-gold h-full"
              >
                <div className="relative mb-8 aspect-[4/5] overflow-hidden rounded-[3.5rem]">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0"
                  />
                  
                  <div className="absolute top-6 left-6">
                    <div className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-2xl bg-white/90 backdrop-blur-md shadow-2xl border-2",
                      item.isVeg ? "border-emerald-600" : "border-red-600"
                    )}>
                       <div className={cn("h-4 w-4 rounded-full", item.isVeg ? "bg-emerald-600 shadow-lg shadow-emerald-500/50" : "bg-red-600 shadow-lg shadow-red-500/50")} />
                    </div>
                  </div>

                  <div className="absolute bottom-6 right-6">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/90 backdrop-blur-md text-[10px] font-black text-brand-coffee shadow-2xl italic">
                       <Star className="h-3 w-3 fill-brand-gold text-brand-gold" />
                       {item.rating}
                    </div>
                  </div>
                </div>

                <div className="flex-1 space-y-4 px-2 mb-8">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold opacity-80">{item.category}</span>
                  </div>
                  <h3 className="text-2xl font-serif font-black italic text-brand-coffee group-hover:text-brand-gold transition-colors leading-tight">{item.name}</h3>
                  <p className="text-brand-brown/50 text-sm italic font-medium leading-relaxed line-clamp-2 h-10">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between px-2 pt-4 border-t border-brand-beige/10">
                  <div className="flex flex-col">
                    <span className="text-[8px] font-black uppercase tracking-[0.4em] text-brand-brown/30 mb-1">Curation</span>
                    <span className="text-2xl font-serif font-bold italic text-brand-coffee">{formatPrice(item.price)}</span>
                  </div>

                  {qty === 0 ? (
                    <button
                      onClick={() => setCustomizingItem(item)}
                      className="flex h-14 w-14 items-center justify-center rounded-3xl bg-brand-coffee text-white transition-all hover:bg-brand-gold active:scale-95 shadow-3xl shadow-brand-coffee/20"
                    >
                      <Plus className="h-6 w-6" />
                    </button>
                  ) : (
                    <div className="flex items-center gap-4 rounded-3xl bg-brand-nude p-2 border border-brand-gold/20 shadow-xl">
                      <button
                        onClick={() => handleUpdateQuantity(item.id, -1)}
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-brand-coffee hover:bg-brand-gold hover:text-white transition-all shadow-md"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-4 text-center font-serif italic text-lg font-black">{qty}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, 1)}
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-brand-coffee hover:bg-brand-gold hover:text-white transition-all shadow-md"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
