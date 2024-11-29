import React from "react";
import { useNavigate } from "react-router-dom";
import './AdminDashboard.css';

const AdminDashboard = () => {
    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate("/view-message"); // Route to ViewMessage component
    };

    return (
        <div className={"adminContainer"}>
            <h1>Welcome to the Admin Dashboard!</h1>
            <button onClick={handleNavigation} className="navigateButton">
                Go to View Messages
            </button>
        </div>
    );
};

export default AdminDashboard;
