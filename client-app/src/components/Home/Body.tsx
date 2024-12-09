import React, { useState, useEffect } from 'react';
import './Body.css';
import bodyImageSH80IH35 from '../picture/SH 80 IH 35.png';
import bodyImageSH82IH35 from '../picture/SH82IH35.png';
import imageFM112 from '../picture/sizedImage/SizedFM112.jpg';
import imageSH95 from '../picture/sizedImage/SizedSH95.jpg';
import imageRM3238 from '../picture/sizedImage/SizedRM3238.jpg';
import imageSH80IH35 from '../picture/sizedImage/SizedSH 80 IH 35.png';
import imageSH82IH35 from '../picture/sizedImage/SizedSH82IH35.png';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Body = () => {
        const [currentImageIndex, setCurrentImageIndex] = useState(0);
        const navigate = useNavigate();

        const titles = [
                'Designing the Future',
                'Roadway Design',
                'Hydrology Design',
                'Roadway Hydraulic Design',
                'Bridge Hydraulic Design',
                'Roadway PS&E'
        ];

        const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

        const images = [
                bodyImageSH80IH35,
                bodyImageSH82IH35,
        ];

        // Auto-slide for titles
        useEffect(() => {
                const titleInterval = setInterval(() => {
                        setCurrentTitleIndex((prevIndex) =>
                            prevIndex === titles.length - 1 ? 0 : prevIndex + 1
                        );
                }, 5000); // Change title every 5 seconds

                return () => clearInterval(titleInterval);
        }, [titles.length]);

        // Auto-slide for images
        useEffect(() => {
                const imageInterval = setInterval(() => {
                        setCurrentImageIndex((prevIndex) =>
                            prevIndex === images.length - 1 ? 0 : prevIndex + 1
                        );
                }, 14000); // Change slide every 14 seconds

                return () => clearInterval(imageInterval);
        }, [images.length]);

        const handleNext = () => {
                setCurrentImageIndex((prevIndex) =>
                    prevIndex === images.length - 1 ? 0 : prevIndex + 1
                );
        };

        const handlePrev = () => {
                setCurrentImageIndex((prevIndex) =>
                    prevIndex === 0 ? images.length - 1 : prevIndex - 1
                );
        };

        const imagesMiddle = [
                {
                        id: 1,
                        src: imageSH82IH35,
                        title: 'DLT Intersection Improvement',
                        body: 'IH 35 at SL 82 Displaced Left Turn (Designed - 2012) Location: San Marcos, TX',
                        list1: 'Designed intersection improvements at IH 35/SH 82 to reduce traffic congestion.',
                        list2: 'Introduced a Displaced Left Turn (DLT) design to improve traffic flow and safety by relocating left-turn movements away from the main intersection.',
                        list3: ''
                },
                {
                        id: 2,
                        src: imageSH80IH35,
                        title: 'DLT Intersection Improvement',
                        body: 'IH 35 at SL 80 Displaced Left Turn (Designed - 2012) Location: San Marcos, TX',
                        list1: 'Designed intersection improvements at IH 35/SH 80 to reduce traffic congestion.',
                        list2: 'Introduced a Displaced Left Turn (DLT) design to improve traffic flow and safety by relocating left-turn movements away from the main intersection.',
                        list3: ''
                },
                {
                        id: 3,
                        src: imageFM112,
                        title: 'BCCulvert Replacement',
                        body: 'FM 112 Roadway & Bridge-Class Culvert\n' +
                            'Replacement (Designed-2015) Location: Williamson County, TX',
                        list1: 'Oversaw the replacement of a bridge-class culvert.',
                        list2: 'Performed hydrological and hydraulic analyses, and designed roadway geometry.',
                        list3: 'Created phased construction schedules.'
                },
                {
                        id: 4,
                        src: imageSH95,
                        title: 'Bridge Replacement' ,
                        body: 'SH 95 at Willis Creek Bridge Replacement (Designed - 2015) Williamson County, TX',
                        list1: 'Oversaw the replacement of a bridge-class culvert.',
                        list2: 'Managed the replacement of a 200-ft outdated bridge with a new 255-ft prestressed concrete bridge.',
                        list3: 'Conducted hydrological and hydraulic analyses, designed roadway geometry, and developed phased construction schedules.'
                },
                {
                        id: 5,

                        src: imageRM3238,
                        title: 'Road Widening Project',
                        body: 'RM 3238 (Hamilton) Road Widening Project ((2021) Location: Hays County, TX',
                        list1: 'Designed about 6-mile roadway widening  project, including the addition of a center turn lane and shoulders.',
                        list2: 'Conducted hydrological and hydraulic analyses, designing 24 cross-drainage structures to enhance stormwater management.',
                        list3: 'Developed a comprehensive traffic control plan to minimize disruptions during construction '
                }
        ];

        const handleImageClick = (imageId: number) => {
                navigate(`/images/${imageId}`);
        };

        return (
            <div className="body-container">
                    {/* Title overlay with slide show */}
                    <div className="title-overlay">
                            <h1 className="title slide-show-title">
                                    {titles[currentTitleIndex]}
                            </h1>
                    </div>

                    <div className="carousel">
                            <button className="carousel-btn left" onClick={handlePrev}>
                                    <FaChevronLeft/>
                            </button>
                            <img
                                src={images[currentImageIndex]}
                                alt={`Slide ${currentImageIndex + 1}`}
                                className="carousel-image"
                            />
                            <button className="carousel-btn right" onClick={handleNext}>
                                    <FaChevronRight/>
                            </button>
                    </div>
                    <h2 className="section-title">Some of the Founder's Previous Experience</h2>
                    <div className="image-grid">
                            {imagesMiddle.map((image) => (
                                <div
                                    key={image.id}
                                    className="image-container"
                                    onClick={() => handleImageClick(image.id)}
                                >
                                        <img src={image.src} alt={image.title} className="grid-image"/>

                                        <div className="image-overlay">
                                                <p className="image-body">{image.body}</p>
                                                <ul className="image-list">
                                                        <li>{image.list1}</li>
                                                        <li>{image.list2}</li>
                                                        <li>{image.list3}</li>
                                                </ul>
                                        </div>

                                        <div className="image-title">{image.title}</div>
                                </div>
                            ))}
                    </div>

                    <div className="card-container">
                            <div className="card">
                                    <h3 className="card-title">Safety Culture</h3>
                                    <p className="card-description">
                                            Building a strong safety culture ensures everyone is aligned with safety
                                            protocols.
                                    </p>
                                    <a href="/safety" className="card-button">
                                    Read More
                                    </a>
                            </div>
                            <div className="card">
                                    <h3 className="card-title">Services</h3>
                                    <p className="card-description">
                                            Explore our wide range of services designed to meet your needs and exceed
                                            expectations.
                                    </p>
                                    <a href="/service" className="card-button">
                                            Read More
                                    </a>
                            </div>
                            <div className="card">
                                    <h3 className="card-title">Certification</h3>
                                    <p className="card-description">
                                            Our certifications demonstrate our commitment to quality and excellence.
                                    </p>
                                    <a href="/certification" className="card-button">
                                            Read More
                                    </a>
                            </div>
                    </div>
            </div>
        );
};

export default Body;