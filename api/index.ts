import express from "express";

const app = express();

app.use(express.json());

// API routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Recommendation API (Simulated ML / Proxy to Gemini in frontend is usually preferred but we can have a backend route if needed)
app.post("/api/recommendations", (req, res) => {
  // Simple rule-based recommendation for fallback
  const { timeOfDay, preferences } = req.body;
  res.json({
    recommendations: [
      { id: "1", name: "Masala Dosa", reason: "Popular for breakfast" },
      { id: "2", name: "Filter Coffee", reason: "Great with snacks" }
    ]
  });
});

export default app;
