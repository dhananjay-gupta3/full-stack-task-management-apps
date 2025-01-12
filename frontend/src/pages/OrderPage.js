import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./OrderPage.css";

const OrderPage = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [cart, setCart] = useState([]);
    const { token, setToken } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetchMenuItems();
    }, []);

    const fetchMenuItems = async () => {
        try {
            const response = await axios.get("http://localhost:5000/menu");
            setMenuItems(response.data);
        } catch (error) {
            console.error("Error fetching menu items:", error);
        }
    };

    const addToCart = (item) => {
        const existingItem = cart.find((cartItem) => cartItem.menuItemId === item._id);
        if (existingItem) {
            setCart(
                cart.map((cartItem) =>
                    cartItem.menuItemId === item._id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                )
            );
        } else {
            setCart([...cart, { menuItemId: item._id, quantity: 1, name: item.name, price: item.price }]);
        }
    };

    const refreshToken = async () => {
        try {
            const refreshToken = localStorage.getItem("refreshToken");
            const response = await axios.post("http://localhost:5000/refresh-token", {
                refreshToken,
            });
            const newAccessToken = response.data.token;
            setToken(newAccessToken);
            localStorage.setItem("token", newAccessToken);
            return newAccessToken;
        } catch (error) {
            console.error("Error refreshing token:", error);
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            navigate("/login");
            return null;
        }
    };

    const placeOrder = async () => {
        try {
            let accessToken = token;
            const response = await axios.post(
                "http://localhost:5000/order",
                { items: cart },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            setCart([]);
            navigate("/order-history");
        } catch (error) {
            if (error.response?.data?.message === "Invalid token") {
                const newAccessToken = await refreshToken();
                if (newAccessToken) {
                    try {
                        const retryResponse = await axios.post(
                            "http://localhost:5000/order",
                            { items: cart },
                            {
                                headers: {
                                    Authorization: `Bearer ${newAccessToken}`,
                                },
                            }
                        );
                        setCart([]);
                        navigate("/order-history");
                    } catch (retryError) {
                        console.error("Error placing order after token refresh:", retryError);
                        alert("Failed to place order. Please try again.");
                    }
                }
            } else {
                console.error("Error placing order:", error.response?.data || error.message);
                alert("Failed to place order. Please try again.");
            }
        }
    };

    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="order-container">
            <h1 className="order-title">Order</h1>
            <div className="order-grid">
                <div className="menu-section">
                    <h2>Menu</h2>
                    <div className="menu-items">
                        {menuItems.map((item) => (
                            <div key={item._id} className="menu-item">
                                <h3>{item.name}</h3>
                                <p>Price: ₹{item.price}</p>
                                <button onClick={() => addToCart(item)} className="add-to-cart-button">
                                    Add to Cart
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="cart-section">
                    <h2>Cart</h2>
                    <div className="cart-items">
                        {cart.map((item) => (
                            <div key={item.menuItemId} className="cart-item">
                                <p>
                                    {item.name} - ₹{item.price} x {item.quantity}
                                </p>
                            </div>
                        ))}
                    </div>
                    <h3>Total: ₹{totalAmount}</h3>
                    <button onClick={placeOrder} className="place-order-button">
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;