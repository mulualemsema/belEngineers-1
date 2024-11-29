// CenteredImagePage.tsx
import React, { useState } from 'react';
import './Image.css'; // Importing the CSS for styling
import bodyImageRM3238 from '../picture/RM3238.jpg';

const CenteredImageRM3238 : React.FC = () => {
    const [isZoomed, setIsZoomed] = useState(false); // Track zoom state

    const handleImageClick = () => {
        setIsZoomed(!isZoomed); // Toggle zoom state on click
    };

    return (
        <div className="image-container">
            <img
                src={bodyImageRM3238}
                alt="Centered"
                className={`centered-image ${isZoomed ? 'zoomed' : ''}`} // Add zoomed class conditionally
                onClick={handleImageClick} // Add onClick event handler
            />
        </div>
    );
};

export default CenteredImageRM3238;
