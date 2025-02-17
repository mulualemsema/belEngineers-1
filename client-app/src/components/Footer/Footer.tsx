import React from 'react';
import './Footer.css'; // Import Footer CSS
import { FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear(); // Get the current year

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="contact-info">
                    <p><strong>Phone:</strong> (512) 363-0461</p>
                    <p><strong>Address:</strong> 1110 Connemara Ln, Pflugerville, TX 78660</p>
                    <p><strong>Working Hours:</strong> Mon-Fri, 8:00 AM - 5:00 PM</p>
                </div>
                <div className="footer-year">
                    <p>&copy; {currentYear} BEL Engineers LLC All rights reserved. </p>
                </div>
                <div className="social-icons">
                    <a href="https://www.linkedin.com/in/demissie-m-sema-p-e-05ab68287" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <FaLinkedin className="social-icon linkedin" />
                    </a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                        <FaTwitter className="social-icon twitter" />
                    </a>
                    <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                        <FaYoutube className="social-icon youtube" />
                    </a>
                </div>
            </div>
            <div className="footer-logo">
                <img src="/logo.png"
                     srcSet="/logo.png 768w,
                             /logo.png 1200w,
                             /logo.png 480w,
                             /logo.png 320w"
                     alt="Logo" className="logo-image"
                />
            </div>
        </footer>
    );
};

export default Footer;
