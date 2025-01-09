import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ResetPassword.css";

interface ResetPasswordProps {
    token: string | null;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ token }) => {
    const [oldPassword, setOldPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!token) {
            setMessage("Authorization token is missing. Please log in again.");
            return;
        }

        setLoading(true);
        setMessage(null);

        try {
            await axios.post(
                "https://belengineers-g0b2hbgzarhjbrdb.canadacentral-01.azurewebsites.net/auth/reset-password",
                { oldPassword, newPassword },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Fix token formatting
                    },
                }
            );

            setMessage("Password reset successful! Redirecting to dashboard...");
            setTimeout(() => navigate("/admin-dashboard"), 2000);
        } catch (err: any) {
            if (err.response?.status === 403) {
                setMessage("Incorrect current password. Please try again.");
            } else if (err.response?.status === 401) {
                setMessage("Unauthorized: Invalid or expired token. Please log in again.");
            } else {
                setMessage("Something went wrong. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="reset-password-container">
            <h2>Reset Password</h2>
            {loading && <p className="loading-message">Processing...</p>}
            {message && <p className="message">{message}</p>}

            <form onSubmit={handleReset} className="reset-password-form">
                <div className="form-group">
                    <label htmlFor="oldPassword">Current Password:</label>
                    <input
                        id="oldPassword"
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        disabled={loading}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="newPassword">New Password:</label>
                    <input
                        id="newPassword"
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
        </div>
    );
};

export default ResetPassword;
