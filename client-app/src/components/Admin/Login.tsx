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
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [firstLogin, setFirstLogin] = useState(false);
    const [localToken, setLocalToken] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null); // Clear previous errors
        setLoading(true);

        try {
            const response = await axios.post("https://belengineerstexas-akbsf4f7gsfteggz.canadacentral-01.azurewebsites.net/api/users/login", {
                username,
                password,
            });

            const rawTokenData = response.data.token; // Get the raw string
            console.log(rawTokenData); // Debugging purposes

            // Extract values using regular expressions or string manipulation
            const firstLoginMatch = rawTokenData.match(/firstLogin:(true|false)/);
            const tokenMatch = rawTokenData.match(/token:([\w.-]+)/);

            const firstLogin = firstLoginMatch ? firstLoginMatch[1] === "true" : false;
            const token = tokenMatch ? tokenMatch[1] : null;

            setToken(token); // Set token globally
            setLocalToken(token); // Save locally for password reset
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

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localToken}`,
                },
            };

            await axios.post(
                "https://belengineerstexas-akbsf4f7gsfteggz.canadacentral-01.azurewebsites.net/api/users/reset-password",
                { newPassword },
                config
            );

            alert("Password reset successful! Please log in again.");
            setFirstLogin(false);
            setUsername("");
            setPassword("");
            setNewPassword("");
            setLocalToken(null);
        } catch (err: any) {
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
