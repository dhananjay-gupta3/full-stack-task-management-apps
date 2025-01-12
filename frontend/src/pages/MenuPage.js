import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import "./MenuPage.css";

const MenuPage = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [availability, setAvailability] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [sortBy, setSortBy] = useState("name");
    const [filterAvailability, setFilterAvailability] = useState("all");
    const [editingItem, setEditingItem] = useState(null);
    const { token } = useContext(AuthContext);

    const fetchMenuItems = async (page = 1) => {
        try {
            const response = await axios.get("http://localhost:5000/menu", {
                params: { page, limit: 15, sortBy, availability: filterAvailability },
                headers: { Authorization: `Bearer ${token}` },
            });

            if (page === 1) {
                setMenuItems(response.data);
            } else {
                setMenuItems((prev) => [...prev, ...response.data]);
            }

            setHasMore(response.data.length === 15);
        } catch (error) {
            console.error("Error fetching menu items:", error);
        }
    };

    const handleAddMenuItem = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:5000/menu",
                { name, category, price, availability },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            fetchMenuItems(1);

            setName("");
            setCategory("");
            setPrice("");
            setAvailability(true);

            console.log("Item added successfully:", response.data);
        } catch (error) {
            console.error("Error adding menu item:", error.response?.data || error.message);
        }
    };

    const handleDeleteMenuItem = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/menu/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            fetchMenuItems(page);
        } catch (error) {
            console.error("Error deleting menu item:", error.response?.data || error.message);
        }
    };

    const startEditing = (item) => {
        setEditingItem(item);
        setName(item.name);
        setCategory(item.category);
        setPrice(item.price);
        setAvailability(item.availability);
    };

    const handleUpdateMenuItem = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `http://localhost:5000/menu/${editingItem._id}`,
                { name, category, price, availability },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            fetchMenuItems(page);

            setEditingItem(null);
            setName("");
            setCategory("");
            setPrice("");
            setAvailability(true);

            console.log("Item updated successfully:", response.data);
        } catch (error) {
            console.error("Error updating menu item:", error.response?.data || error.message);
        }
    };

    useEffect(() => {
        fetchMenuItems(page);
    }, [page, sortBy, filterAvailability]);

    const filteredMenuItems = menuItems.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="menu-page">
            <h1 className="menu-title">Menu</h1>

            <input
                type="text"
                placeholder="Search menu items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-bar"
            />

            <div className="menu-grid">
                {filteredMenuItems.map((item) => (
                    <div key={item._id} className="menu-card">
                        <h3>{item.name}</h3>
                        <p>Category: {item.category}</p>
                        <p>Price: ₹{item.price}</p>
                        <p>Availability: {item.availability ? "Available" : "Unavailable"}</p>
                        <button onClick={() => startEditing(item)} className="edit-button">Edit</button>
                        <button onClick={() => handleDeleteMenuItem(item._id)} className="delete-button">Delete</button>
                    </div>
                ))}
            </div>

            <h2 className="form-title">{editingItem ? "Edit Menu Item" : "Add New Menu Item"}</h2>
            <form onSubmit={editingItem ? handleUpdateMenuItem : handleAddMenuItem} className="menu-form">
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="form-input"
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    className="form-input"
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    className="form-input"
                />
                <label className="availability-label">
                    <input
                        type="checkbox"
                        checked={availability}
                        onChange={(e) => setAvailability(e.target.checked)}
                        className="availability-checkbox"
                    />
                    Available
                </label>
                <button type="submit" className="submit-button">
                    {editingItem ? "Update Item" : "Add Item"}
                </button>
                {editingItem && (
                    <button
                        type="button"
                        onClick={() => {
                            setEditingItem(null);
                            setName("");
                            setCategory("");
                            setPrice("");
                            setAvailability(true);
                        }}
                        className="cancel-button"
                    >
                        Cancel
                    </button>
                )}
            </form>
        </div>
    );
};

export default MenuPage;