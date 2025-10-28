import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log(">>>>>>",process.env.MONGO_URL);
    
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // exit process with failure
  }
};