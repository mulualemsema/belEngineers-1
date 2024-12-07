import React, { useState, useEffect } from 'react';
import './Header.css';

const Header: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [activeLink, setActiveLink] = useState<string>(window.location.pathname);
    const [menuOpen, setMenuOpen] = useState(false); // For toggling menu visibility

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLinkClick = (link: string) => {
        setActiveLink(link);
        setMenuOpen(false); // Close menu after clicking a link
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <>
            <div className="top-strip">
                <span className="phone-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="16px" height="16px">
                        <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.27c1.21.5 2.55.77 3.91.77a1 1 0 011 1v3.11a1 1 0 01-.91 1c-10.15 1-18.26-7.14-17.26-17.26a1 1 0 011-.91H6a1 1 0 011 1c0 1.36.27 2.7.77 3.91a1 1 0 01-.27 1.11l-2.2 2.2z" />
                    </svg>
                </span>
                <span className="phone-number">(512) 363-0461</span>
            </div>

            <div className="header-container">
                <header className={`header ${scrolled ? 'scrolled' : ''}`}>
                    <div className="logo-container">
                        <img src="/logo.png"
                             srcSet="/logo.png 768w,
                             /logo.png 1200w,
                             /logo.png 480w,
                             /logo.png 320w"
                             alt="Logo" className="logo-image"
                        />
                        <h3 className="Bel-name">BEL Engineers LLC</h3>
                    </div>
                    <button className="menu-toggle" onClick={toggleMenu}>
                        {menuOpen ? "Close" : "Menu"}
                    </button>
                    <nav className={`nav ${menuOpen ? 'open' : ''}`}>
                        <ul className="nav-links">
                            <li>
                                <a
                                    href="/"
                                    onClick={() => handleLinkClick('/')}
                                    className={activeLink === '/' ? 'active' : ''}
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/aboutUs"
                                    onClick={() => handleLinkClick('/aboutUs')}
                                    className={activeLink === '/aboutUs' ? 'active' : ''}
                                >
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/service"
                                    onClick={() => handleLinkClick('/service')}
                                    className={activeLink === '/service' ? 'active' : ''}
                                >
                                    Our Service
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/certification"
                                    onClick={() => handleLinkClick('/certification')}
                                    className={activeLink === '/certification' ? 'active' : ''}
                                >
                                    Certification
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/contact"
                                    onClick={() => handleLinkClick('/contact')}
                                    className={activeLink === '/contact' ? 'active' : ''}
                                >
                                    Contact Us
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/safety"
                                    onClick={() => handleLinkClick('/safety')}
                                    className={activeLink === '/safety' ? 'active' : ''}
                                >
                                    Safety
                                </a>
                            </li>
                            <li>
                                {/* Replaced "Admin" text with an admin icon */}
                                <a
                                    href="/admin"
                                    onClick={() => handleLinkClick('/admin')}
                                    className={activeLink === '/admin' ? 'active' : ''}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        width="24px"
                                        height="24px"
                                        className="admin-icon"
                                    >
                                        <path
                                            d="M12 2l7 4v6c0 5.25-3.75 9.25-7 10-3.25-.75-7-4.75-7-10V6l7-4zm0 2.18l-5 2.86V12c0 4.05 2.81 7.6 5 8.7 2.19-1.1 5-4.65 5-8.7V7.04l-5-2.86z"
                                        />
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </header>
            </div>
        </>
    );
};

export default Header;
