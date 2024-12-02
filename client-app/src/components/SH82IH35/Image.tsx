// CenteredImagePage.tsx
import React, { useState } from 'react';
import './Image.css'; // Importing the CSS for styling
import bodyImageSH82IH35 from '../picture/SH82IH35.png';

const CenteredImageSH82IH35: React.FC = () => {
    const [isZoomed, setIsZoomed] = useState(false); // Track zoom state

    const handleImageClick = () => {
        setIsZoomed(!isZoomed); // Toggle zoom state on click
    };

    return (
        <div className="image-container">
            <img
                src={bodyImageSH82IH35}
                alt="Centered"
                className={`centered-image ${isZoomed ? 'zoomed' : ''}`} // Add zoomed class conditionally
                onClick={handleImageClick} // Add onClick event handler
            />
        </div>
    );
};

export default CenteredImageSH82IH35;
