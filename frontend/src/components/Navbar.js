import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    Restaurant App
                </Link>

                {/* Hamburger Icon */}
                <div className="menu-icon" onClick={toggleMenu}>
                    <div className={isOpen ? "bar bar1 open" : "bar bar1"}></div>
                    <div className={isOpen ? "bar bar2 open" : "bar bar2"}></div>
                    <div className={isOpen ? "bar bar3 open" : "bar bar3"}></div>
                </div>

                {/* Navigation Links */}
                <ul className={isOpen ? "nav-menu active" : "nav-menu"}>
                    <li className="nav-item">
                        <Link to="/menu" className="nav-links" onClick={toggleMenu}>
                            Menu
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/order" className="nav-links" onClick={toggleMenu}>
                            Order
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/order-history" className="nav-links" onClick={toggleMenu}>
                            Order History
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/register" className="nav-links" onClick={toggleMenu}>
                            Register
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/login" className="nav-links" onClick={toggleMenu}>
                            Login
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;