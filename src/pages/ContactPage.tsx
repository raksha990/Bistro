import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Instagram, Twitter, Facebook } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="bg-brand-nude min-h-screen pt-32 pb-40">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
           {/* Left: Info */}
           <motion.div 
             initial={{ opacity: 0, x: -30 }}
             animate={{ opacity: 1, x: 0 }}
             className="space-y-16"
           >
              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-gold">Reach Out</p>
                <h1 className="text-6xl md:text-8xl font-serif font-black italic text-brand-coffee leading-none">Connections</h1>
              </div>

              <div className="space-y-12">
                 <div className="flex gap-8 group">
                    <div className="h-16 w-16 rounded-[2rem] bg-white shadow-2xl flex items-center justify-center text-brand-gold group-hover:bg-brand-coffee transition-all duration-500">
                       <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                       <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-brown/40 mb-2">Our Sanctuary</p>
                       <p className="text-lg font-serif italic text-brand-coffee">Bistro Plaza, 5th Avenue <br /> Manhattan, NY 10001</p>
                    </div>
                 </div>

                 <div className="flex gap-8 group">
                    <div className="h-16 w-16 rounded-[2rem] bg-white shadow-2xl flex items-center justify-center text-brand-gold group-hover:bg-brand-coffee transition-all duration-500">
                       <Phone className="h-6 w-6" />
                    </div>
                    <div>
                       <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-brown/40 mb-2">Direct Line</p>
                       <p className="text-lg font-serif italic text-brand-coffee">+1 (234) 567 890</p>
                    </div>
                 </div>

                 <div className="flex gap-8 group">
                    <div className="h-16 w-16 rounded-[2rem] bg-white shadow-2xl flex items-center justify-center text-brand-gold group-hover:bg-brand-coffee transition-all duration-500">
                       <Mail className="h-6 w-6" />
                    </div>
                    <div>
                       <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-brown/40 mb-2">Electronic Post</p>
                       <p className="text-lg font-serif italic text-brand-coffee">concierge@lumiere.com</p>
                    </div>
                 </div>
              </div>

              <div className="space-y-6">
                 <p className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-gold">Digital Socials</p>
                 <div className="flex gap-6">
                    {[Instagram, Twitter, Facebook].map((Icon, i) => (
                       <button key={i} className="h-12 w-12 rounded-2xl bg-white shadow-xl flex items-center justify-center text-brand-coffee hover:bg-brand-gold hover:text-white transition-all shadow-brand-coffee/5">
                          <Icon className="h-5 w-5" />
                       </button>
                    ))}
                 </div>
              </div>
           </motion.div>

           {/* Right: Form */}
           <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-12 md:p-16 rounded-[5rem] shadow-3xl border border-brand-beige"
           >
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black uppercase tracking-widest text-brand-brown/40">Your Name</label>
                       <input type="text" className="w-full bg-brand-nude/30 border-none rounded-2xl p-5 text-brand-coffee outline-none focus:ring-2 focus:ring-brand-gold/20" />
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black uppercase tracking-widest text-brand-brown/40">Email Identity</label>
                       <input type="email" className="w-full bg-brand-nude/30 border-none rounded-2xl p-5 text-brand-coffee outline-none focus:ring-2 focus:ring-brand-gold/20" />
                    </div>
                 </div>

                 <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-brand-brown/40">Your Inquiry</label>
                    <textarea rows={5} className="w-full bg-brand-nude/30 border-none rounded-3xl p-5 text-brand-coffee outline-none focus:ring-2 focus:ring-brand-gold/20" />
                 </div>

                 <button className="w-full bg-brand-coffee py-6 rounded-3xl text-[10px] font-black uppercase tracking-[0.3em] text-white shadow-2xl shadow-brand-coffee/20 flex items-center justify-center gap-4 hover:bg-brand-gold transition-all active:scale-95 group">
                    Dispatch Message
                    <Send className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                 </button>
              </form>
           </motion.div>
        </div>
      </div>
    </div>
  );
}
