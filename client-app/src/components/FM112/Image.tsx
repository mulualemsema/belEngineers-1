
import React, { useState } from 'react';
import './Image.css';
import bodyImageFM112 from './FM112.jpg';

const CenteredImagePage: React.FC = () => {
    const [isZoomed, setIsZoomed] = useState(false); // Track zoom state

    const handleImageClick = () => {
        setIsZoomed(!isZoomed); // Toggle zoom state on click
    };

    return (
        <div className="image-container">
            <img
                src={bodyImageFM112}
                alt="Centered"
                className={`centered-image ${isZoomed ? 'zoomed' : ''}`} // Add zoomed class conditionally
                onClick={handleImageClick} // Add onClick event handler
            />
        </div>
    );
};

export default CenteredImagePage;
