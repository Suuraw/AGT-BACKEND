import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


dotenv.config({ path: path.resolve(__dirname, "../.env") });

const URI = process.env.URI;

const connectDB = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connection successful!");
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1); 
  }
};

export default connectDB;
