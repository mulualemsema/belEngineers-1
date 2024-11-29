// CenteredImagePage.tsx
import React, { useState } from 'react';
import './Image.css'; // Importing the CSS for styling
import bodyImageSH95 from '../picture/SH95.jpg';

const CenteredImageSH95: React.FC = () => {
    const [isZoomed, setIsZoomed] = useState(false); // Track zoom state

    const handleImageClick = () => {
        setIsZoomed(!isZoomed); // Toggle zoom state on click
    };

    return (
        <div className="image-container">
            <img
                src={bodyImageSH95}
                alt="Centered"
                className={`centered-image ${isZoomed ? 'zoomed' : ''}`} // Add zoomed class conditionally
                onClick={handleImageClick} // Add onClick event handler
            />
        </div>
    );
};

export default CenteredImageSH95;
