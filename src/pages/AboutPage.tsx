import { motion } from 'framer-motion';
import { ChefHat, History, Award, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-brand-nude min-h-screen pt-32 pb-40">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-32"
        >
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-gold mb-4">Our Heritage</p>
          <h1 className="text-6xl md:text-8xl font-serif font-black italic text-brand-coffee leading-none">The Bistro Story</h1>
        </motion.div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-40">
           <motion.div 
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="relative aspect-[4/5] rounded-[5rem] overflow-hidden shadow-3xl"
           >
              <img src="https://images.unsplash.com/photo-1550966842-2849a228ed8e?w=1000" className="w-full h-full object-cover grayscale brightness-90" />
              <div className="absolute inset-0 bg-brand-coffee/20" />
           </motion.div>
           
           <div className="space-y-10">
              <h2 className="text-4xl md:text-5xl font-serif italic text-brand-coffee leading-tight">Elevating culinary art since two decades.</h2>
              <p className="text-brand-brown/60 text-lg leading-relaxed italic font-medium">
                Established in 2006, Bistro began as a small family bistro with a radical vision: to treat every plate as a canvas. Today, it stands as a beacon of artisanal gastronomy, where we fuse traditional techniques with intelligent digital enhancements.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-brand-beige">
                 <div>
                    <h4 className="text-3xl font-serif font-black text-brand-gold">150+</h4>
                    <p className="text-[8px] font-black uppercase tracking-[0.2em] text-brand-brown/40">Master Recipes</p>
                 </div>
                 <div>
                    <h4 className="text-3xl font-serif font-black text-brand-gold">12</h4>
                    <p className="text-[8px] font-black uppercase tracking-[0.2em] text-brand-brown/40">Global Awards</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
           {[
             { icon: ChefHat, title: "Artisanal Mastery", desc: "Our chefs spend years perfecting specific regional flavors, ensuring authenticity in every bite." },
             { icon: Award, title: "Sustainably Sourced", desc: "We partner exclusively with local artisans and sustainable farms for the freshest seasonal produce." },
             { icon: Users, title: "Immersive Service", desc: "A dining experience that adapts to your mood, pace, and individual flavor preferences." }
           ].map((pillar, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-12 rounded-[4rem] shadow-3xl border border-brand-beige/20 hover:border-brand-gold transition-all duration-500"
              >
                 <div className="h-16 w-16 rounded-3xl bg-brand-nude flex items-center justify-center text-brand-gold mb-8 shadow-inner">
                    <pillar.icon className="h-8 w-8" />
                 </div>
                 <h3 className="text-2xl font-serif font-black italic text-brand-coffee mb-4 leading-tight">{pillar.title}</h3>
                 <p className="text-brand-brown/50 text-sm leading-relaxed italic font-medium">{pillar.desc}</p>
              </motion.div>
           ))}
        </div>
      </div>
    </div>
  );
}
