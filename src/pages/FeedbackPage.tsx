import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Send, Heart, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { db } from '../lib/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

export default function FeedbackPage() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) return;
    
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "feedback"), {
        rating,
        comment,
        createdAt: serverTimestamp(),
        type: 'guest_review'
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting feedback:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-brand-nude min-h-screen pt-32 flex items-center justify-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center space-y-8 p-12 bg-white rounded-[5rem] shadow-3xl border border-brand-beige max-w-xl mx-6"
        >
           <div className="mx-auto h-32 w-32 rounded-full bg-brand-cream flex items-center justify-center text-brand-gold mb-8 shadow-inner border border-brand-gold/20">
              <Heart className="h-16 w-16 fill-current" />
           </div>
           <h2 className="text-5xl font-serif font-black italic text-brand-coffee shrink-0">Merci, Cher Amour</h2>
           <p className="text-brand-brown/50 font-medium italic text-lg leading-relaxed">
             Your feedback is the nourishment our creativity requires. We look forward to manifesting your next experience.
           </p>
           <div className="pt-8">
              <Link to="/" className="inline-flex items-center gap-4 bg-brand-coffee px-10 py-5 rounded-3xl text-[10px] font-black uppercase tracking-[0.3em] text-white hover:bg-brand-gold transition-all shadow-2xl shadow-brand-coffee/20">
                 Explore Future Curations
              </Link>
           </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-brand-nude min-h-screen pt-32 pb-40">
      <div className="container mx-auto px-6 max-w-4xl text-center">
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="space-y-12"
         >
          <div className="space-y-12">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-brown/30">Digital Socials</p>
            <h1 className="text-6xl md:text-8xl font-serif font-black italic text-brand-coffee leading-none">Perspective</h1>
            <p className="text-brand-brown/60 text-lg italic font-medium max-w-lg mx-auto leading-relaxed">
              How was your odyssey at Bistro? Your insight helps us refine the boundaries of gastronomy.
            </p>
          </div>

            <div className="bg-white p-12 md:p-20 rounded-[5rem] shadow-3xl border border-brand-beige space-y-16">
               {/* Star Rating */}
               <div className="space-y-8">
                  <p className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-brown/30">Rate the Experience</p>
                  <div className="flex justify-center gap-4 md:gap-8">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(0)}
                        onClick={() => setRating(star)}
                        className="transition-all hover:scale-125 focus:outline-none"
                      >
                        <Star 
                          className={cn(
                            "h-12 w-12 md:h-16 md:w-16 transition-all duration-500",
                            (hover || rating) >= star ? "fill-brand-gold text-brand-gold drop-shadow-[0_0_15px_rgba(191,155,48,0.5)]" : "text-brand-beige"
                          )} 
                        />
                      </button>
                    ))}
                  </div>
               </div>

               {/* Comments */}
               <form onSubmit={handleSubmit} className="space-y-12">
                  <div className="space-y-4 relative group">
                     <MessageSquare className="absolute left-8 top-10 h-6 w-6 text-brand-brown/20 group-focus-within:text-brand-gold transition-colors" />
                     <textarea
                       placeholder="Tell us about the textures, the light, the moments..."
                       className="w-full bg-brand-nude/30 border border-transparent rounded-[3rem] p-10 pl-20 text-brand-coffee outline-none focus:ring-4 focus:ring-brand-gold/10 font-medium italic transition-all"
                       rows={4}
                       value={comment}
                       onChange={(e) => setComment(e.target.value)}
                     />
                  </div>

                  <button 
                    disabled={!rating}
                    className="w-full h-24 bg-brand-coffee text-white rounded-[2.5rem] text-[12px] font-black uppercase tracking-[0.4em] shadow-2xl shadow-brand-coffee/20 hover:bg-brand-gold transition-all active:scale-95 flex items-center justify-center gap-4 disabled:opacity-30 disabled:hover:bg-brand-coffee"
                  >
                     Submit Perspective
                     <Send className="h-5 w-5" />
                  </button>
               </form>
            </div>
         </motion.div>
      </div>
    </div>
  );
}
