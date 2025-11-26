import mongoose from "mongoose";

export const connectToBD = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://mangenakate_db_user:kikinto123@cluster0.fatvzyr.mongodb.net/library_db?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("MongoDB is connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed", error);
    process.exit(1);
  }
};
