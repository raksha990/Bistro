import { GoogleGenAI } from "@google/genai";
import { MENU_ITEMS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface RecommendationContext {
  previousOrders?: string[];
  customerType?: string;
  timeOfDay: string;
  preferences?: string[];
  mood?: string;
  isPopular?: boolean;
}

let isCooldown = false;
let cooldownTimeout: NodeJS.Timeout | null = null;

function startCooldown(duration = 60000) {
  if (cooldownTimeout) clearTimeout(cooldownTimeout);
  isCooldown = true;
  cooldownTimeout = setTimeout(() => {
    isCooldown = false;
  }, duration);
}

export async function getSmartRecommendations(context: RecommendationContext) {
  if (isCooldown) {
    return MENU_ITEMS.filter(i => i.popularCount && i.popularCount > 100).slice(0, 3);
  }

  try {
    const menuSummary = MENU_ITEMS.map(i => `${i.name} (${i.category}, ${i.isVeg ? 'Veg' : 'Non-Veg'})`).join(", ");
    
    const prompt = `
      You are an AI Sommelier for a luxury restaurant called "Bistro".
      Menu Collection: ${menuSummary}
      
      Current Context:
      - Mood: ${context.mood || "Balanced/General"}
      - Time: ${context.timeOfDay}
      - Previous Palate: ${context.previousOrders?.join(", ") || "Fresh Start"}
      - Dietary: ${context.preferences?.join(", ") || "None"}
      
      Assignment:
      Recommend exactly 3 dish names from the menu that would best resonate with this ${context.mood || ''} mood at ${context.timeOfDay}. 
      If the mood is "Happy", suggest celebratory or sweet dishes.
      If "Relaxed", suggest comfort foods or teas.
      If "Hungry", suggest heavy meals like Biryani or Pizzas.
      
      Return ONLY a JSON array of strings containing the dish names.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });
    
    const text = response.text || "";
    const match = text.match(/\[.*\]/s);
    if (match) {
      const recommendedNames = JSON.parse(match[0]);
      return MENU_ITEMS.filter(item => recommendedNames.includes(item.name));
    }
    
    return MENU_ITEMS.filter(i => i.popularCount && i.popularCount > 100).slice(0, 3);
  } catch (error: any) {
    if (error?.status === 429 || error?.code === 429 || error?.message?.includes("429")) {
      console.warn("AI Sommelier is resting (Quota reached). Using curated selection.");
      startCooldown();
    } else {
      console.error("AI Recommendation error:", error);
    }
    return MENU_ITEMS.slice(0, 3);
  }
}

export async function predictTrendingDishes() {
  if (isCooldown) {
    return MENU_ITEMS.slice(0, 3);
  }

  const prompt = `
    Based on the current menu, predict which 3 dishes will be the "Trending" items for today's lunch session.
    Menu: ${MENU_ITEMS.map(i => i.name).join(", ")}
    Consider that it's a sunny afternoon.
    Return ONLY a JSON array of 3 dish names.
  `;
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });
    const text = response.text || "";
    const match = text.match(/\[.*\]/s);
    if (match) {
       const trending = JSON.parse(match[0]);
       return MENU_ITEMS.filter(item => trending.includes(item.name));
    }
    return MENU_ITEMS.slice(0, 3);
  } catch (error: any) {
    if (error?.status === 429 || error?.code === 429 || error?.message?.includes("429")) {
      startCooldown();
    }
    return MENU_ITEMS.slice(0, 3);
  }
}
