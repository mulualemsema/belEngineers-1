// CenteredImagePage.tsx
import React, { useState } from 'react';
import './Image.css'; // Importing the CSS for styling
import bodyImageSH80IH35 from '../picture/SH 80 IH 35.png';


const CenteredImageSH80IH35: React.FC = () => {
    const [isZoomed, setIsZoomed] = useState(false); // Track zoom state

    const handleImageClick = () => {
        setIsZoomed(!isZoomed); // Toggle zoom state on click
    };

    return (
        <div className="image-container">
            <img
                src={bodyImageSH80IH35}
                alt="Centered"
                className={`centered-image ${isZoomed ? 'zoomed' : ''}`} // Add zoomed class conditionally
                onClick={handleImageClick} // Add onClick event handler
            />
        </div>
    );
};

export default CenteredImageSH80IH35;
