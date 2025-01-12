// import mongoose from "mongoose";


// export const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URL, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             connectTimeoutMS: 30000, // 30 seconds
//             socketTimeoutMS: 30000, // 30 seconds

//         });
//         console.log("Database connected successfully");
//     } catch (err) {
//         console.log(err)
//     }
// }


import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB Connected");
    } catch (err) {
        console.error("MongoDB Connection Error:", err.message);
        process.exit(1); // Exit the process with failure
    }
};

export default connectDB;