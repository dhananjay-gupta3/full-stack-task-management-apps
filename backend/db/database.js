import mongoose from "mongoose";


export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 30000, // 30 seconds
            socketTimeoutMS: 30000, // 30 seconds

        });
        console.log("Database connected successfully");
    } catch (err) {
        console.log(err)
    }
}
