import Menu from "../models/Menu.js";

export const getMenu = async (req, res) => {
    try {
        const menu = await Menu.find();
        res.json(menu);
    } catch (error) {
        res.status(500).json({ message: "Error fetching menu", error });
    }
};

export const addMenuItem = async (req, res) => {
    const { name, category, price, availability } = req.body;

    if (!name || !category || !price) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        const menuItem = new Menu({ name, category, price, availability });
        await menuItem.save();
        res.status(201).json(menuItem);
    } catch (error) {
        res.status(500).json({ message: "Error adding menu item", error });
    }
};

export const updateMenuItem = async (req, res) => {
    const { id } = req.params;

    try {
        const updatedMenuItem = await Menu.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedMenuItem) return res.status(404).json({ message: "Menu item not found" });
        res.json(updatedMenuItem);
    } catch (error) {
        res.status(500).json({ message: "Error updating menu item", error });
    }
};

export const deleteMenuItem = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedMenuItem = await Menu.findByIdAndDelete(id);
        if (!deletedMenuItem) return res.status(404).json({ message: "Menu item not found" });
        res.json({ message: "Menu item deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting menu item", error });
    }
};