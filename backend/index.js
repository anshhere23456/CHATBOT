import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import chatbotRoutes from './routes/chatbot.route.js';

dotenv.config();
const app = express();

const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });

// Routes
app.use("/bot/v1", chatbotRoutes);

// Render test route
app.get("/", (req, res) => {
  res.send("API working on Render!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
