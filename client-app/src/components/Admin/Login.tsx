import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

interface LoginProps {
    setToken: (token: string | null) => void;
}

const Login: React.FC<LoginProps> = ({ setToken }) => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [firstLogin, setFirstLogin] = useState<boolean>(false);
    const [localToken, setLocalToken] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null); // Clear previous errors
        setLoading(true);

        try {
            const response = await axios.post(
                "https://belengineerstexas-akbsf4f7gsfteggz.canadacentral-01.azurewebsites.net/api/users/login",
                {
                    username,
                    password,
                }
            );

            // Assuming the response contains a structured object with token and firstLogin flag
            const { token, firstLogin } = response.data;

            console.log(response.data); // Debugging purposes

            setToken(token); // Set token globally
            setLocalToken(token); // Save locally for password reset
            setFirstLogin(firstLogin);

            if (firstLogin) {
                alert("First login detected. Please reset your password.");
            } else {
                alert("Login successful!");
                navigate("/admin-dashboard");
            }
        } catch (err) {
            // TypeScript 3.2.1 does not support optional chaining, so we need to handle this manually
            const errorMessage = err && err.response && err.response.data && err.response.data.message
                ? err.response.data.message
                : "Invalid credentials. Please try again.";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        if (!localToken) {
            setError("Token missing. Please log in again.");
            setLoading(false);
            return;
        }

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
            setToken(null); // Clear global token
        } catch (err) {
            // TypeScript 3.2.1 does not support optional chaining, so we need to handle this manually
            const errorMessage = err && err.response && err.response.data && err.response.data.message
                ? err.response.data.message
                : "Failed to reset password. Please try again.";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div>
                <h2>{firstLogin ? "Reset Password" : "Admin Login"}</h2>
                {loading && <p>Processing...</p>}
                {error && <p>{error}</p>}

                {!firstLogin ? (
                    <form onSubmit={handleLogin} className="login-form">
                        <div>
                            <label htmlFor="username">Username:</label>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e:any) => setUsername(e.target.value)}
                                disabled={loading}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password:</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e:any) => setPassword(e.target.value)}
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
                        <div>
                            <label htmlFor="new-password">New Password:</label>
                            <input
                                id="new-password"
                                type="password"
                                value={newPassword}
                                onChange={(e:any) => setNewPassword(e.target.value)}
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
        </>
    );
};

export default Login;
