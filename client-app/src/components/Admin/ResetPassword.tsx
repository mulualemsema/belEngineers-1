import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './ResetPassword.css';

interface ResetPasswordProps {
    token: string;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ token }) => {
    const [oldPassword, setOldPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false); // Loader state
    const navigate = useNavigate(); // React Router hook for navigation

    const handleReset = async (e: React.FormEvent) => {
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
            // Manually checking if `err` is an object and has the expected properties
            if (err && err.response && err.response.status === 403) {
                setMessage("Incorrect current password");
            } else if (err && err.response && err.response.status === 401) {
                setMessage("Unauthorized: Invalid or expired token");
            } else {
                setMessage("Something went wrong");
            }
        } finally {
            setLoading(false); // Hide loader
        }
    };

    return (
        <div>
            <h2>Reset Password</h2>
            {loading && <p>Loading...</p>} {/* Loader */}
            <form onSubmit={handleReset}>
                <div>
                    <label>Current Password:</label>
                    <input
                        type="password"
                        value={oldPassword}
                        onChange={(e:any) => setOldPassword(e.target.value)}
                        disabled={loading} // Disable input during loading
                    />
                </div>
                <div>
                    <label>New Password:</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e:any) => setNewPassword(e.target.value)}
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
