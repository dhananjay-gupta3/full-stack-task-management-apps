import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./RegistrationPage.css";

const RegistrationPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            setError("Username and password are required.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/register", {
                username,
                password,
            });

            localStorage.setItem("token", response.data.token);
            navigate("/menu");
        } catch (error) {
            setError(error.response?.data?.message || "Registration failed. Please try again.");
        }
    };

    return (
        <div className="registration-container">
            <div className="registration-card">
                <h1>Register</h1>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit} className="registration-form">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="registration-input"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="registration-input"
                        required
                    />
                    <button type="submit" className="registration-button">
                        Register
                    </button>
                </form>
                <p className="login-link">
                    Already have an account? <a href="/login">Login here</a>.
                </p>
            </div>
        </div>
    );
};

export default RegistrationPage;