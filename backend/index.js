// import express from "express";
// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import cors from "cors"
// import bodyParser from "body-parser";
// import dotenv from "dotenv";



// dotenv.config();

// const app = express();
// const PORT = 5000;

// // Middleware
// app.use(cors())
// app.use(bodyParser.json());
// app.use(express.json());

// // Database Connection
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log("MongoDB connected"))
//     .catch(err => console.error(err));

// // Schemas and Models
// const userSchema = new mongoose.Schema({
//     username: { type: String, required: true },
//     password: { type: String, required: true },
// });

// const menuSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     category: { type: String, required: true },
//     price: { type: Number, required: true },
//     availability: { type: Boolean, default: true },
// });

// const orderSchema = new mongoose.Schema({
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     items: [{
//         menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', required: true },
//         quantity: { type: Number, required: true }
//     }],
//     totalAmount: { type: Number, required: true },
//     status: { type: String, enum: ["Pending", "Completed"], default: "Pending" },
//     createdAt: { type: Date, default: Date.now },
// });

// const User = mongoose.model("User", userSchema);
// const Menu = mongoose.model("Menu", menuSchema);
// const Order = mongoose.model("Order", orderSchema);

// // JWT Middleware
// const authenticateJWT = (req, res, next) => {
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) return res.status(403).json({ message: "Access denied" });

//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//         if (err) return res.status(403).json({ message: "Invalid token" });
//         req.user = user;
//         next();
//     });
// };

// // API Endpoints
// // Authentication


// // Backend API for user registration
// app.post("/register", async (req, res) => {
//     const { username, password } = req.body;

//     if (!username || !password) {
//         return res.status(400).json({ message: "Username and password are required." });
//     }

//     try {
//         // Check if the user already exists
//         const existingUser = await User.findOne({ username });
//         if (existingUser) {
//             return res.status(400).json({ message: "Username already exists." });
//         }

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create a new user
//         const user = new User({ username, password: hashedPassword });
//         await user.save();

//         // Generate a JWT token
//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

//         // Return the token
//         res.status(201).json({ token });
//     } catch (error) {
//         res.status(500).json({ message: "Error registering user", error });
//     }
// });

// // app.post("/registe", async (req, res) => {
// //     try {
// //         const { username, password } = req.body;
// //         if (!username || !password) return res.status(400).json({ message: "Username and password are required." });

// //         const hashedPassword = await bcrypt.hash(password, 10);
// //         const user = new User({ username, password: hashedPassword });
// //         await user.save();
// //         res.status(201).json({ message: "User registered successfully" });
// //     } catch (error) {
// //         res.status(500).json({ message: "Error registering user", error });
// //     }
// // });

// app.post("/login", async (req, res) => {
//     try {
//         const { username, password } = req.body;
//         const user = await User.findOne({ username });
//         if (!user) return res.status(404).json({ message: "User not found" });

//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials" });

//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
//         res.json({ token });
//     } catch (error) {
//         res.status(500).json({ message: "Error logging in", error });
//     }
// });

// // Menu Management
// app.get("/menu", async (req, res) => {
//     try {
//         const menu = await Menu.find();
//         res.json(menu);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching menu", error });
//     }
// });

// // Backend: Add sorting to the /menu endpoint
// // Backend API for fetching menu items with pagination and sorting
// // Backend API for fetching menu items with pagination and sorting
// // Backend API for fetching menu items with pagination


// app.post("/menu", authenticateJWT, async (req, res) => {
//     try {
//         const { name, category, price, availability } = req.body;
//         if (!name || !category || !price) return res.status(400).json({ message: "All fields are required." });

//         const menuItem = new Menu({ name, category, price, availability });
//         await menuItem.save();
//         res.status(201).json(menuItem);
//     } catch (error) {
//         res.status(500).json({ message: "Error adding menu item", error });
//     }
// });

// app.put("/menu/:id", authenticateJWT, async (req, res) => {
//     try {
//         const { id } = req.params;
//         const updatedMenuItem = await Menu.findByIdAndUpdate(id, req.body, { new: true });
//         if (!updatedMenuItem) return res.status(404).json({ message: "Menu item not found" });
//         res.json(updatedMenuItem);
//     } catch (error) {
//         res.status(500).json({ message: "Error updating menu item", error });
//     }
// });

// // Backend API for updating a menu item
// // app.put("/menu/:id", async (req, res) => {
// //     const { id } = req.params;
// //     const { name, category, price, availability } = req.body;

// //     try {
// //         const updatedMenuItem = await Menu.findByIdAndUpdate(
// //             id,
// //             { name, category, price, availability },
// //             { new: true }
// //         );
// //         if (!updatedMenuItem) return res.status(404).json({ message: "Menu item not found" });
// //         res.json(updatedMenuItem);
// //     } catch (error) {
// //         res.status(500).json({ message: "Error updating menu item", error });
// //     }
// // });

// app.delete("/menu/:id", authenticateJWT, async (req, res) => {
//     try {
//         const { id } = req.params;
//         const deletedMenuItem = await Menu.findByIdAndDelete(id);
//         if (!deletedMenuItem) return res.status(404).json({ message: "Menu item not found" });
//         res.json({ message: "Menu item deleted" });
//     } catch (error) {
//         res.status(500).json({ message: "Error deleting menu item", error });
//     }
// });

// // Order Management
// app.post("/order", authenticateJWT, async (req, res) => {
//     try {
//         const { items } = req.body;
//         if (!items || !items.length) return res.status(400).json({ message: "Order items are required" });

//         const menuItems = await Menu.find({ _id: { $in: items.map(i => i.menuItemId) } });
//         if (menuItems.length !== items.length) return res.status(400).json({ message: "Invalid menu items" });

//         const totalAmount = items.reduce((total, item) => {
//             const menuItem = menuItems.find(m => m._id.equals(item.menuItemId));
//             return total + (menuItem.price * item.quantity);
//         }, 0);

//         const order = new Order({
//             userId: req.user.id,
//             items,
//             totalAmount,
//         });

//         await order.save();
//         res.status(201).json(order);
//     } catch (error) {
//         res.status(500).json({ message: "Error placing order", error });
//     }
// });






// app.get("/orders", authenticateJWT, async (req, res) => {
//     try {
//         const orders = await Order.find({ userId: req.user.id }).populate({
//             path: "items.menuItemId",
//             select: "name price",
//             match: { _id: { $ne: null } }, // Exclude null menuItemId
//         });

//         // Filter out items with null menuItemId
//         const filteredOrders = orders.map((order) => ({
//             ...order._doc,
//             items: order.items.filter((item) => item.menuItemId !== null),
//         }));

//         res.json(filteredOrders);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching orders", error });
//     }
// });



// //

// // Backend API for fetching menu items with pagination
// // Backend API for fetching menu items with pagination, sorting, and filtering
// // Backend API for fetching menu items with pagination, sorting, and filtering
// app.get("/menu", async (req, res) => {
//     const { page = 1, limit = 15, sortBy = "name", availability } = req.query;
//     const skip = (page - 1) * limit; // Calculate the number of items to skip

//     try {
//         let query = {};
//         if (availability !== "all") {
//             query.availability = availability === "true"; // Convert string to boolean
//         }

//         const menuItems = await Menu.find(query)
//             .sort({ [sortBy]: 1 }) // Sort by the selected field
//             .skip(parseInt(skip)) // Skip items for previous pages
//             .limit(parseInt(limit)); // Limit the number of items per page

//         const totalItems = await Menu.countDocuments(query); // Get the total count of matching items

//         res.json({
//             menuItems,
//             totalItems,
//         });
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching menu items", error });
//     }
// });







// // Backend API for creating an order// Backend API for creating an order

// // Backend API for creating an order
// app.post("/order", authenticateJWT, async (req, res) => {
//     const { items } = req.body;

//     if (!items || !items.length) {
//         return res.status(400).json({ message: "Order items are required" });
//     }

//     try {
//         const menuItems = await Menu.find({ _id: { $in: items.map(i => i.menuItemId) } });

//         if (menuItems.length !== items.length) {
//             return res.status(400).json({ message: "Invalid menu items" });
//         }

//         const totalAmount = items.reduce((total, item) => {
//             const menuItem = menuItems.find(m => m._id.equals(item.menuItemId));
//             return total + (menuItem.price * item.quantity);
//         }, 0);

//         const order = new Order({
//             userId: req.user.id, // Use the authenticated user's ID
//             items,
//             totalAmount,
//         });

//         await order.save();
//         res.status(201).json(order);
//     } catch (error) {
//         console.error("Error placing order:", error); // Log the error for debugging
//         res.status(500).json({ message: "Error placing order", error });
//     }
// });
// // Backend API for fetching order history
// // app.get("/orders", async (req, res) => {
// //     try {
// //         const orders = await Order.find({ userId: req.user.id }).populate("items.menuItemId");
// //         res.json(orders);
// //     } catch (error) {
// //         res.status(500).json({ message: "Error fetching orders", error });
// //     }
// // });


// // Backend: Add a new menu item
// app.post("/menu", authenticateJWT, async (req, res) => {
//     try {
//         const { name, category, price, availability } = req.body;

//         // Validate required fields
//         if (!name || !category || !price) {
//             return res.status(400).json({ message: "All fields are required." });
//         }

//         // Create a new menu item
//         const menuItem = new Menu({ name, category, price, availability });
//         await menuItem.save(); // Save to the database

//         // Return the saved item
//         res.status(201).json(menuItem);
//     } catch (error) {
//         console.error("Error adding menu item:", error);
//         res.status(500).json({ message: "Error adding menu item", error });
//     }
// });

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

const app = express();
const PORT = 5000;


app.use(cors());
app.use(express.json());

connectDB()

app.use("/", authRoutes);
app.use("/", menuRoutes);
app.use("/", orderRoutes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));