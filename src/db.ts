import mongoose from 'mongoose';

const connectToDatabase = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to database: ${connection.connection.name}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(`Error: ${error.message}`);
      throw error;
    }
  }
};

export default connectToDatabase;
