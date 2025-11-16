import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();               
dotenv.config({ path: '.env.local' });  // Optional: local override

const app: Express = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['https://fin-track-eight-taupe.vercel.app/', 'http://localhost:5173/'],
  credentials: true
}));

// Load MongoDB URI
const mongoURI = process.env.MONGO_URL || process.env.mongoURL;

if (!mongoURI) {
  console.error("❌ MongoDB URI is missing. Please add MONGO_URL to your .env file.");
  process.exit(1);
}

// Connect to MongoDB
mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });

// Routes
import financialRecordRouter from "./routes/financial-records";
app.use("/financial-records", financialRecordRouter);

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
