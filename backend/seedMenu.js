import mongoose from "mongoose";
import Menu from "./models/Menu.js";
import dotenv from "dotenv";

dotenv.config();

// Database Connection
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

// Sample Menu Items
const menuItems = [
    { name: "Margherita Pizza", category: "Main Course", price: 10, availability: true },
    { name: "Pepperoni Pizza", category: "Main Course", price: 12, availability: true },
    { name: "Veggie Pizza", category: "Main Course", price: 11, availability: true },
    { name: "Cheese Burger", category: "Main Course", price: 8, availability: true },
    { name: "Chicken Burger", category: "Main Course", price: 9, availability: true },
    { name: "Veg Burger", category: "Main Course", price: 7, availability: true },
    { name: "French Fries", category: "Appetizers", price: 4, availability: true },
    { name: "Onion Rings", category: "Appetizers", price: 5, availability: true },
    { name: "Garlic Bread", category: "Appetizers", price: 6, availability: true },
    { name: "Caesar Salad", category: "Salads", price: 7, availability: true },
    { name: "Greek Salad", category: "Salads", price: 8, availability: true },
    { name: "Pasta Alfredo", category: "Main Course", price: 10, availability: true },
    { name: "Pasta Carbonara", category: "Main Course", price: 11, availability: true },
    { name: "Chicken Wings", category: "Appetizers", price: 9, availability: true },
    { name: "Mozzarella Sticks", category: "Appetizers", price: 7, availability: true },
    { name: "Chocolate Cake", category: "Desserts", price: 6, availability: true },
    { name: "Cheesecake", category: "Desserts", price: 7, availability: true },
    { name: "Ice Cream", category: "Desserts", price: 5, availability: true },
    { name: "Tiramisu", category: "Desserts", price: 8, availability: true },
    { name: "Coke", category: "Beverages", price: 2, availability: true },
    { name: "Pepsi", category: "Beverages", price: 2, availability: true },
    { name: "Lemonade", category: "Beverages", price: 3, availability: true },
    { name: "Iced Tea", category: "Beverages", price: 3, availability: true },
    { name: "Coffee", category: "Beverages", price: 4, availability: true },
    { name: "Tea", category: "Beverages", price: 2, availability: true },
];

// Add Menu Items to Database
const seedMenu = async () => {
    try {
        await Menu.deleteMany(); // Clear existing menu items
        await Menu.insertMany(menuItems); // Insert new menu items
        console.log("25 menu items added successfully!");
        process.exit();
    } catch (err) {
        console.error("Error seeding menu items:", err);
        process.exit(1);
    }
};

seedMenu();