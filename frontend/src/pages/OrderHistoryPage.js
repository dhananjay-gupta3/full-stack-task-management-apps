import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { backend_url } from '../server'
import "./OrderHistoryPage.css";

const OrderHistoryPage = () => {
    const [orders, setOrders] = useState([]);
    const { token } = useContext(AuthContext);

    useEffect(() => {
        fetchOrderHistory();
    }, []);

    const fetchOrderHistory = async () => {
        try {
            const response = await axios.get(`${backend_url}/orders`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setOrders(response.data);
        } catch (error) {
            console.error("Error fetching order history:", error);
        }
    };

    return (
        <div className="order-history-container">
            <h1 className="order-history-title">Order History</h1>
            <div className="order-history-grid">
                {orders.map((order) => (
                    <div key={order._id} className="order-card">
                        <p className="order-id">Order ID: {order._id}</p>
                        <h4 className="order-items-title">Items:</h4>
                        <ul className="order-items-list">
                            {order.items.map((item) => (
                                item.menuItemId ? (
                                    <li key={item.menuItemId._id} className="order-item">
                                        {item.menuItemId.name} -  ₹{item.menuItemId.price} x {item.quantity}
                                    </li>
                                ) : (
                                    <li key={item._id} className="order-item">
                                        Item no longer available
                                    </li>
                                )
                            ))}
                        </ul>
                        <p className="order-total">Total Amount:  ₹{order.totalAmount}</p>
                        <p className="order-status">Status: {order.status}</p>
                        <p className="order-date">Created At: {new Date(order.createdAt).toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderHistoryPage;