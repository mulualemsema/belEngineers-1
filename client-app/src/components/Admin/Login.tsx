import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

interface LoginProps {
    setToken: (token: any) => void;
}

const Login: React.FC<LoginProps> = ({ setToken }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [currentPassword, setCurrentPassword] = useState(""); // Current password state for reset
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [firstLogin, setFirstLogin] = useState(false);
    const [token, setLocalToken] = useState<string | null>(null); // Store the token locally

    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null); // Clear previous error
        setLoading(true);

        try {
            const response = await axios.post("http://localhost:8083/auth/login", {
                username,
                password,
            });

            const { token, firstLogin } = response.data;

            setToken(token);
            setLocalToken(token);  // Store the token for future use
            setFirstLogin(firstLogin);

            if (firstLogin) {
                alert("First login detected. Please reset your password.");
            } else {
                alert("Login successful!");
                navigate("/admin-dashboard");
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Invalid credentials. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        console.log("Reset Password Request:", { oldPassword: currentPassword, newPassword });

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await axios.post("http://localhost:8083/auth/reset-password", {
                oldPassword: currentPassword,  // Send the correct parameter
                newPassword,
            }, config);

            console.log("Password Reset Response:", response.data);

            alert("Password reset successful! Please log in again.");
            setFirstLogin(false);
            setPassword("");
            setNewPassword("");
            setCurrentPassword("");
        } catch (err: any) {
            console.error("Error during password reset:", err);
            setError(err.response?.data?.message || "Failed to reset password. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="login-container">
            <h2>{firstLogin ? "Reset Password" : "Admin Login"}</h2>
            {loading && <p className="loading">Processing...</p>}
            {error && <p className="error-message">{error}</p>}

            {!firstLogin ? (
                <form onSubmit={handleLogin} className="login-form">
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            disabled={loading}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-submit" disabled={loading}>
                        {loading ? "Processing..." : "Login"}
                    </button>
                </form>
            ) : (
                <form onSubmit={handlePasswordReset} className="reset-password-form">
                    <div className="form-group">
                        <label htmlFor="current-password">Current Password:</label>
                        <input
                            id="current-password"
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            disabled={loading}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="new-password">New Password:</label>
                        <input
                            id="new-password"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            disabled={loading}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-submit" disabled={loading}>
                        {loading ? "Processing..." : "Reset Password"}
                    </button>
                </form>
            )}
        </div>
    );
};

export default Login;
