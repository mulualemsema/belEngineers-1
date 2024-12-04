import React, { useState } from 'react';
import './Contact.css';

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        phone: '',
        message: '',
    });
    const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [errors, setErrors] = useState<{ phone?: string }>({}); // Validation errors

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

        // Clear validation error when user edits the input
        if (e.target.name === 'phone') {
            validatePhoneNumber(e.target.value);
        }
    };

    const validatePhoneNumber = (phone: string) => {
        const phoneRegex = /^[+]?[1-9]\d{1,14}$/; // E.164 standard or basic validation for international and local numbers
        if (!phoneRegex.test(phone)) {
            setErrors({ phone: 'Invalid phone number. Please enter a valid number.' });
            return false;
        }
        setErrors({ phone: undefined });
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate phone number before submitting
        if (!validatePhoneNumber(formData.phone)) {
            setNotification({ message: 'Please fix errors before submitting.', type: 'error' });
            setTimeout(() => setNotification(null), 5000);
            return;
        }

        try {
            const response = await fetch('http://localhost:8083/api/messages/posting', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setNotification({ message: 'Data submitted successfully!', type: 'success' });
                setFormData({ userName: '', email: '', phone: '', message: '' });
            } else {
                const errorData = await response.json();
                console.error('Error:', errorData);
                setNotification({ message: 'Failed to submit data. Please try again.', type: 'error' });
            }
        } catch (error) {
            console.error('Error:', error);
            setNotification({ message: 'An error occurred. Please check your connection.', type: 'error' });
        }

        // Automatically hide the notification after a few seconds
        setTimeout(() => setNotification(null), 5000);
    };

    return (
        <div className="container-body">
            <center>
                <h2>Contact Us</h2>
            </center>

            <h2>Are you ready?</h2>

            {/* Notification message */}
            {notification && (
                <div className={`notification ${notification.type}`}>
                    {notification.message}
                </div>
            )}

            <div className="contact-container">
                <div className="form-section">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input
                                type="text"
                                name="userName"
                                value={formData.userName}
                                onChange={handleChange}
                                placeholder="Full Name"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email Address"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Phone Number"
                                required
                            />
                            {errors.phone && <span className="error-text">{errors.phone}</span>}
                        </div>
                        <div>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Please provide your message here."
                                required
                                rows={4}
                            />
                        </div>
                        <button type="submit" className="submit-button">Save</button>
                    </form>
                </div>

                {/* Address section */}
                <div className="address-section">
                    <h3>Our Address</h3>
                    <p>
                        1110 Connemara Ln, <br />
                        Pflugerville, TX 78660 <br />
                        <br />
                        Email: demissie@belengineers.com <br />
                        Phone: (512) 363-0461
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Contact;
