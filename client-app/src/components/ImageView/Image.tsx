
import React from 'react';
import { useParams } from 'react-router-dom';
import imageFM112 from "../picture/sizedImage/SizedFM112.jpg";
import imageSH95 from "../picture/sizedImage/SizedSH95.jpg";
import imageRM3238 from "../picture/sizedImage/SizedRM3238.jpg";
import imageSH80IH35 from "../picture/sizedImage/SizedSH 80 IH 35.png";
import imageSH82IH35 from "../picture/sizedImage/SizedSH82IH35.png";

const ImageView = () => {
    const { id } = useParams<{ id: string }>();

    const imagesMiddle = [
        { id: 1, src: imageSH80IH35, title: 'DLT Intersection Improvement' },
        { id: 2, src: imageSH82IH35, title: 'DLT Intersection Improvement' },
        { id: 3, src: imageFM112, title: 'BCCulvert Replacement' },
        { id: 4, src: imageSH95, title: 'Bridge Replacement' },
        { id: 5, src: imageRM3238, title: 'Road Widening Project' },
    ];

    const image = imagesMiddle.find((img) => img.id === parseInt(id || '', 10));

    if (!image) return <p>Image not found</p>;

    return (
        <div style={{ textAlign: 'center', padding: '70px', marginTop: '120px' }}>
            <img src={image.src} alt={image.title} style={{ maxWidth: '100%', borderRadius: '8px' }} />
        </div>
    );
};

export default ImageView;

