import React from "react";
import "./Safety.css";
import imageFM112 from '../picture/FM112.jpg';
import imageSH80IH35 from '../picture/SH 80 IH 35.png';
import imageSH82IH35 from '../picture/SH82IH35.png';
import imageSH95 from '../picture/SH95.jpg';
import imageRM3238 from '../picture/RM3238.jpg';
interface SafetyPractice {
    title: string;
    description: string;
    icon: string; // Path to an icon image or URL
}

const safetyPractices: SafetyPractice[] = [
    {
        title: "Road Safety Standards",
        description: "Ensure road designs adhere to international safety standards, including proper lane marking, signage, and visibility enhancements.",
        icon: imageFM112,
    },
    {
        title: "Hydraulic Structure Durability",
        description: "Utilize high-quality materials to prevent structural failures in hydraulic systems, ensuring long-term performance and safety.",
        icon: imageSH80IH35,
    },
    {
        title: "Emergency Preparedness",
        description: "Incorporate emergency response plans, such as flood control mechanisms in hydraulics and escape routes in roadways.",
        icon: imageSH95,
    },
    {
        title: "Environmental Considerations",
        description: "Implement eco-friendly designs to minimize environmental impact, including water conservation in hydraulics and reduced emissions in road designs.",
        icon: imageSH82IH35,
    },
    {
        title: "Regular Inspections",
        description: "Schedule regular inspections to identify and address wear and tear in both roadways and hydraulic structures.",
        icon: imageRM3238 ,
    },
];

const Safety = () => {
    return (
        <div className="safetyContainer">
            <center>
                <h2>Safety Best Practices</h2>
            </center>
            <div className="safetyGrid">
                {safetyPractices.map((practice, index) => (
                    <div key={index} className="safetyCard">
                        <img src={practice.icon} alt={practice.title} className="safetyIcon" />
                        <h3>{practice.title}</h3>
                        <p>{practice.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Safety;
