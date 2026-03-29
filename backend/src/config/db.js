import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected successfully :)");
  } catch (error) {
    console.error("Error Connecting to MONGODB", error);
    proces.exit(1);
  }
};
