import React from "react";
import "./Service.css";
import imageFM112 from '../picture/FM112.jpg';
import imageSH80IH35 from '../picture/SH 80 IH 35.png';
import imageSH82IH35 from '../picture/SH82IH35.png';
import imageSH95 from '../picture/SH95.jpg';
import imageRM3238 from '../picture/RM3238.jpg';

interface Service {
    title: string;
    description: string;
    icon: string; // Path to an icon image or a URL
}

const services: Service[] = [
    {
        title: "Roadway Design ",
        description: "Specializing in the design of highways, arterial roads, and local streets, " +
            "ensuring safety, efficiency, and sustainability. Offering end-to-end services, " +
            "from planning to construction, with a focus on traffic flow optimization, geometric design, " +
            "and environmental integration.",
        icon: imageFM112
    },
    {
        title: "Hydrological Studies",
        description: "Specialized in hydrological studies, focusing on watershed analysis, stormwater management, and flood risk assessment to optimize water resource management.Utilizing advanced modeling techniques to design drainage systems that balance environmental impact, regulatory compliance, and long-term sustainability.",
        icon: imageSH80IH35
    },
    {
        title: "Roadway Hydraulic Design",
        description: "Expert roadway hydraulic design services focused on stormwater management, " +
            "drainage systems, and flood prevention to enhance roadway safety and performance. " +
            "Designing efficient runoff control systems, culverts, and channels that comply with " +
            "environmental regulations and optimize long-term durability.",
        icon: imageSH82IH35
    },
    {
        title: "Bridge Hydraulic Design",
        description: "Offering specialized bridge hydraulic design services to optimize water flow, " +
            "prevent erosion, and ensure structural integrity under varying conditions. " +
            "Providing tailored solutions that comply with environmental standards and " +
            "enhance the durability and safety of bridge structures.",
        icon: imageSH95
    },
    {
        title: "Signing, Pav.Marking and Channelization",
        description: "Offering professional design and consultancy services for roadway signing, " +
            "pavement marking, and traffic channelization to improve safety and traffic flow. " +
            "Ensuring compliance with local regulations and implementing best practices to enhance " +
            "visibility, reduce congestion, and guide motorists effectively.",
        icon: imageRM3238
    }


];

const OurService = () => {
    return (
        <div className="serviceContainer">
            <center>
                <h2>Our Services</h2>
            </center>
            <div className="serviceGrid">
                {services.map((service, index) => (
                    <div key={index} className="serviceCard">
                        <img src={service.icon} alt={service.title} className="serviceIcon" />
                        <h3>{service.title}</h3>
                        <p>{service.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OurService;
