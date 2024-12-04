import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './ResetPassword.css';

// @ts-ignore
const ResetPassword = ({ token }) => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false); // Loader state
    const navigate = useNavigate(); // React Router hook for navigation

    const handleReset = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setLoading(true); // Show loader
        try {
            await axios.post(
                'https://belengineerstexas-akbsf4f7gsfteggz.canadacentral-01.azurewebsites.net/auth/reset-password',
                { oldPassword, newPassword },
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
            setMessage("Password reset successful");

            // Navigate to Admin Dashboard after successful reset
            setTimeout(() => navigate("/admin-dashboard"), 2000);
        } catch (err) {
            // @ts-ignore
            if (err.response?.status === 403) {
                setMessage("Incorrect current password");
            } else { // @ts-ignore
                if (err.response?.status === 401) {
                                setMessage("Unauthorized: Invalid or expired token");
                            } else {
                                setMessage("Something went wrong");
                            }
            }
        } finally {
            setLoading(false); // Hide loader
        }
    };

    return (
        <div className={"restContainer"}>
            <h2>Reset Password</h2>
            {loading && <p>Loading...</p>} {/* Loader */}
            <form onSubmit={handleReset}>
                <div>
                    <label>Current Password:</label>
                    <input
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        disabled={loading} // Disable input during loading
                    />
                </div>
                <div>
                    <label>New Password:</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        disabled={loading} // Disable input during loading
                    />
                </div>
                {message && <p>{message}</p>}
                <button type="submit" disabled={loading}> {/* Disable button during loading */}
                    {loading ? "Processing..." : "Reset Password"}
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;
