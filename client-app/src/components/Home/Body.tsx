import React, { useState, useEffect } from 'react';
import './Body.css';
import bodyImageFM112 from '../picture/FM112.jpg';
import bodyImageSH80IH35 from '../picture/SH 80 IH 35.png';
import bodyImageSH82IH35 from '../picture/SH82IH35.png';
import bodyImageSH95 from '../picture/SH95.jpg';
import bodyImageRM3238 from '../picture/RM3238.jpg';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Body = () => {
        const [currentImageIndex, setCurrentImageIndex] = useState(0);

        const titles = [
                'Designing the Future Infrastructure',
                'Roadway Design',
                'Hydrology Design',
                'Roadway Hydraulic Design',
                'Bridge Hydraulic Design',
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
                                    <FaChevronLeft />
                            </button>
                            <img
                                src={images[currentImageIndex]}
                                alt={`Slide ${currentImageIndex + 1}`}
                                className="carousel-image"
                            />
                            <button className="carousel-btn right" onClick={handleNext}>
                                    <FaChevronRight />
                            </button>
                    </div>
                    <h2 className="section-title">Some Previous Experience</h2>
                    <div className="image-grid">
                            <div className="image-grid">
                                    <div className="image-container">
                                            <div className="image-wrapper">
                                                    <a href="/images">
                                                            <img
                                                                src={bodyImageFM112}
                                                                alt="Placeholder 2"
                                                                className="grid-image"
                                                            />
                                                            <div className="image-caption-hover">
                                                                    <p>
                                                                            FM 112 Roadway & Bridge-Class Culvert
                                                                            Replacement
                                                                            (Designed-2015)
                                                                            Location: Williamson County, TX
                                                                    </p>

                                                                    <li>
                                                                            Oversaw the replacement of a bridge-class
                                                                            culvert.
                                                                    </li>
                                                                    <li>
                                                                            Performed hydrological and hydraulic
                                                                            analyses, and
                                                                            designed roadway geometry.
                                                                    </li>
                                                                    <li>
                                                                            Created phased construction schedules.
                                                                    </li>

                                                            </div>
                                                    </a>
                                            </div>
                                            <p className="image-caption-below">
                                                    BCCulvert Replacement
                                            </p>
                                    </div>
                                    <div className="image-container">
                                            <div className="image-wrapper">
                                                    <a href="/imagesSH80IH35">
                                                            <img
                                                                src={bodyImageSH80IH35}
                                                                alt="Placeholder 2"
                                                                className="grid-image"
                                                            />
                                                            <div className="image-caption-hover">
                                                                    <p>
                                                                            IH 35 at SL 80 Displaced Left Turn (Designed
                                                                            - 2012)
                                                                            Location: San Marcos, TX,
                                                                    </p>

                                                                    <li>
                                                                            Designed intersection improvements at IH 35
                                                                            /SH 80
                                                                            to reduce traffic congestion.
                                                                    </li>
                                                                    <li>
                                                                            Introduced a Displaced Left Turn (DLT)
                                                                            design to
                                                                            improve traffic flow and safety by
                                                                            relocating
                                                                            left-turn movements away from the main
                                                                            intersection.
                                                                    </li>

                                                            </div>
                                                    </a>
                                            </div>
                                            <p className="image-caption-below">
                                                    DLT Intersection Improvement SH 80
                                            </p>
                                    </div>
                                    <div className="image-container">
                                            <div className="image-wrapper">
                                                    <a href="/imagesSH82IH35">
                                                            <img
                                                                src={bodyImageSH82IH35}
                                                                alt="Placeholder 2"
                                                                className="grid-image"
                                                            />
                                                            <div className="image-caption-hover">
                                                                    <p>
                                                                            IH 35 at SL 82 Displaced Left Turn (Designed
                                                                            - 2012)
                                                                            Location: San Marcos, TX,

                                                                    </p>

                                                                    <li>
                                                                            Designed intersection improvements at IH 35
                                                                            / SH 82
                                                                            to reduce traffic congestion.
                                                                    </li>
                                                                    <li>
                                                                            Introduced a Displaced Left Turn (DLT)
                                                                            design to
                                                                            improve traffic flow and safety by
                                                                            relocating
                                                                            left-turn movements away from the main
                                                                            intersection.
                                                                    </li>

                                                            </div>
                                                    </a>
                                            </div>
                                            <p className="image-caption-below">
                                                    DLT Intersection Improvement SL 82
                                            </p>
                                    </div>
                                    <div className="image-container">
                                            <div className="image-wrapper">
                                                    <a href="/imagesSH95">
                                                            <img
                                                                src={bodyImageSH95}
                                                                alt="Placeholder 2"
                                                                className="grid-image"
                                                            />
                                                            <div className="image-caption-hover">
                                                                    <p>
                                                                            SH 95 at Willis Creek Bridge Replacement
                                                                            (Designed -
                                                                            2015)
                                                                            Williamson County, TX
                                                                    </p>

                                                                    <li>
                                                                            Managed the replacement of a 200-ft outdated
                                                                            bridge
                                                                            with a new 255-ft prestressed concrete
                                                                            bridge.
                                                                    </li>
                                                                    <li>
                                                                            Conducted hydrological and hydraulic
                                                                            analyses,
                                                                            designed roadway geometry, and developed
                                                                            phased
                                                                            construction schedules.
                                                                    </li>

                                                            </div>
                                                    </a>
                                            </div>
                                            <p className="image-caption-below">
                                                    Willis Creek Bridge Replacement
                                            </p>
                                    </div>
                                    <div className="image-container">
                                            <div className="image-wrapper">
                                                    <a href="/imagesRM3238">
                                                            <img
                                                                src={bodyImageRM3238}
                                                                alt="Placeholder 2"
                                                                className="grid-image"
                                                            />
                                                            <div className="image-caption-hover">
                                                                    <p>
                                                                            RM 3238 (Hamilton) Road Widening Project
                                                                            ((2021)
                                                                            Location: Hays County, TX
                                                                    </p>

                                                                    <li>
                                                                            Designed about 6-mile roadway widening project,
                                                                            including the addition of a center turn lane
                                                                            and shoulders.
                                                                    </li>
                                                                    <li>
                                                                            Conducted hydrological and hydraulic
                                                                            analyses, designing 24 cross-drainage
                                                                            structures to enhance stormwater management.
                                                                    </li>
                                                                    <li>
                                                                            Developed a comprehensive traffic control
                                                                            plan to minimize disruptions during
                                                                            construction
                                                                    </li>

                                                            </div>
                                                    </a>
                                            </div>
                                            <p className="image-caption-below">
                                                    Road Widening Project
                                            </p>
                                    </div>
                            </div>
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
