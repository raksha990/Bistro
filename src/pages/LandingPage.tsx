import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Utensils, Star, Clock, MapPin, Phone, ArrowRight, Quote, Play } from 'lucide-react';
import { MENU_ITEMS } from '../constants';

export default function LandingPage() {
  return (
    <div className="relative overflow-hidden bg-brand-nude">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[800px] w-full items-center justify-center flex overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1544148103-0773bf10d330?w=1600&auto=format&fit=crop&q=90"
            alt="Premium Restaurant Background"
            className="h-full w-full object-cover brightness-[0.5] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-coffee/40 via-transparent to-brand-nude" />
        </div>

        <div className="container relative z-10 mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex justify-center mb-8">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: 60 }}
                 className="h-[2px] bg-brand-gold self-center"
               />
               <span className="px-6 text-[10px] font-black uppercase tracking-[0.5em] text-brand-gold">
                 Est. 2026
               </span>
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: 60 }}
                 className="h-[2px] bg-brand-gold self-center"
               />
            </div>
            
            <h1 className="mb-10 text-7xl font-serif italic tracking-tighter text-white sm:text-9xl leading-[0.9]">
              The <br />
              <span className="text-brand-gold not-italic font-black opacity-90">Bistro</span>
            </h1>
            
            <p className="mx-auto mb-16 max-w-xl text-lg text-brand-nude/70 font-medium tracking-tight sm:text-xl leading-relaxed italic">
              Where ancestral flavors meet the avant-garde. <br />
              An immersive odyssey of the senses.
            </p>

            <div className="flex flex-col items-center justify-center gap-8 sm:flex-row">
              <Link
                to="/menu"
                className="group flex items-center gap-4 rounded-3xl bg-brand-gold px-12 py-6 text-xs font-black uppercase tracking-[0.2em] text-white transition-all hover:bg-white hover:text-brand-coffee hover:scale-105 active:scale-95 shadow-2xl shadow-brand-gold/20"
              >
                Enter the Gallery
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <button
                className="group flex items-center gap-4 rounded-3xl border border-white/40 bg-white/5 px-12 py-6 text-xs font-black uppercase tracking-[0.2em] text-white backdrop-blur-md transition-all hover:bg-white/10"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-gold text-white">
                   <Play className="h-3 w-3 fill-current ml-0.5" />
                </div>
                Review the Story
              </button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30"
        >
          <span className="text-[8px] font-black uppercase tracking-[0.5em] text-brand-coffee">Scroll</span>
          <div className="h-10 w-px bg-brand-coffee" />
        </motion.div>
      </section>

      {/* Philosophy Section */}
      <section className="py-40 bg-white relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-nude/50 -z-0" />
        <div className="container mx-auto px-6 relative z-10">
           <div className="max-w-4xl mx-auto">
              <div className="flex flex-col items-center text-center">
                 <Quote className="h-12 w-12 text-brand-gold/20 mb-12" />
                 <h2 className="text-4xl md:text-6xl font-serif italic text-brand-coffee leading-tight mb-16">
                  "Gastronomy is the silent language of the soul. At Bistro, we don't just serve food; we compose narratives that transcend time and borders."
                 </h2>
                 <div className="flex flex-col items-center gap-4">
                    <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-brand-gold p-1">
                       <img src="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=200" className="h-full w-full object-cover rounded-full" />
                    </div>
                    <div>
                       <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-coffee">Chef Julian Vane</p>
                       <p className="text-[8px] font-black uppercase tracking-[0.2em] text-brand-gold">Executive Alchemist</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* The Gallery Cuisines */}
      <section className="py-40 bg-brand-nude overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-2xl">
               <p className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-gold mb-4">Curated Collections</p>
               <h2 className="text-5xl md:text-7xl font-serif italic text-brand-coffee leading-none">The Finest Selections</h2>
            </div>
            <Link to="/menu" className="text-[10px] font-black uppercase tracking-[0.3em] border-b-2 border-brand-gold pb-2 hover:text-brand-gold transition-colors">
              View the Archive
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
             {[
               { title: "North Indian Heritage", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1000", desc: "Velvety gravies and smokey tandoor creations from the royal kitchens." },
               { title: "South Coast Flavors", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=1000", desc: "Sun-kissed spices and morning-fresh preparations inspired by the coast." },
               { title: "Artisanal Desserts", img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=1000", desc: "Decadence reimagined with locally harvested ingredients and rare spices." }
             ].map((item, id) => (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: id * 0.2 }}
                  className="group relative h-[600px] overflow-hidden rounded-[4rem] shadow-3xl bg-brand-coffee"
                >
                  <img src={item.img} alt={item.title} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-coffee via-transparent to-transparent p-12 flex flex-col justify-end">
                    <h3 className="font-serif text-4xl font-bold text-white mb-4 italic leading-tight">{item.title}</h3>
                    <p className="text-brand-nude/50 text-sm italic font-medium leading-relaxed max-w-xs">{item.desc}</p>
                    <div className="mt-8 h-1 w-0 bg-brand-gold transition-all duration-700 group-hover:w-24 rounded-full" />
                  </div>
                </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* Trending / Most Ordered Section */}
      <section className="py-40 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-gold mb-4">The Selection of the Discerning</p>
            <h2 className="text-5xl md:text-7xl font-serif italic text-brand-coffee">Most Revered Creations</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {MENU_ITEMS.filter(i => i.popularCount && i.popularCount > 140).map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative flex flex-col items-center text-center space-y-6"
              >
                <div className="relative h-64 w-full rounded-[3rem] overflow-hidden shadow-2xl">
                   <img src={item.image} alt={item.name} className="h-full w-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" />
                   <div className="absolute inset-0 bg-brand-coffee/20 group-hover:opacity-0 transition-opacity" />
                </div>
                <div className="space-y-2">
                   <h4 className="text-2xl font-serif font-black italic text-brand-coffee">{item.name}</h4>
                   <p className="text-[8px] font-black uppercase tracking-[0.3em] text-brand-gold">Ordered {item.popularCount} times</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Innovation Section */}
      <section className="bg-white py-40">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div className="space-y-16">
              <div className="space-y-6">
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-gold">The Bistro Experience</p>
                <h2 className="font-serif text-6xl md:text-8xl text-brand-coffee leading-[0.9] italic">Elegance meets <br /><span className="not-italic font-black text-brand-gold opacity-90">Innovation.</span></h2>
              </div>
              
              <div className="grid gap-12">
                {[
                  { icon: Star, title: "AI-Curated Palate", desc: "Our intelligent sommelier analyzes your current mood to suggest the perfect flavor profiles." },
                  { icon: Clock, title: "Precision Craftsmanship", desc: "Real-time kitchen oversight ensures your masterpiece is served at the exact thermodynamic peak." },
                  { icon: Utensils, title: "Bespoke Environment", desc: "A curated space featuring acoustic harmony and artisanal scents designed for comfort." }
                ].map((feature, idx) => (
                  <div key={idx} className="flex gap-8 group">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[2rem] bg-brand-nude shadow-2xl text-brand-gold group-hover:bg-brand-coffee group-hover:text-brand-gold transition-all duration-500">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-black uppercase tracking-[0.2em] text-brand-coffee text-xs mb-3">{feature.title}</h4>
                      <p className="text-brand-brown/50 text-sm leading-relaxed italic font-medium">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="overflow-hidden rounded-[5rem] shadow-3xl aspect-[3/4]"
              >
                <img
                  src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1000"
                  alt="Modern Dining"
                  className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-1000"
                />
              </motion.div>
              
              {/* Achievement Badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-10 -left-10 rounded-[3rem] bg-brand-coffee p-12 shadow-3xl border border-brand-gold/20 backdrop-blur-xl"
              >
                 <div className="flex flex-col items-center gap-3">
                    <div className="text-5xl font-serif italic font-black text-brand-gold">M+</div>
                    <div className="text-[8px] font-black uppercase tracking-[0.4em] text-brand-gold/60">Gastronomy Standards</div>
                 </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
