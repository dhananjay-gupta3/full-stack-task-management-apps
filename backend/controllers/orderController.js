import Order from "../models/Order.js";
import Menu from "../models/Menu.js";

export const placeOrder = async (req, res) => {
    const { items } = req.body;

    if (!items || !items.length) {
        return res.status(400).json({ message: "Order items are required" });
    }

    try {
        const menuItems = await Menu.find({ _id: { $in: items.map((i) => i.menuItemId) } });

        if (menuItems.length !== items.length) {
            return res.status(400).json({ message: "Invalid menu items" });
        }

        const totalAmount = items.reduce((total, item) => {
            const menuItem = menuItems.find((m) => m._id.equals(item.menuItemId));
            return total + menuItem.price * item.quantity;
        }, 0);

        const order = new Order({
            userId: req.user.id,
            items,
            totalAmount,
        });

        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: "Error placing order", error });
    }
};

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id }).populate({
            path: "items.menuItemId",
            select: "name price",
            match: { _id: { $ne: null } },
        });

        const filteredOrders = orders.map((order) => ({
            ...order._doc,
            items: order.items.filter((item) => item.menuItemId !== null),
        }));

        res.json(filteredOrders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
};