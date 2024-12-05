import React from "react";
import "./Safety.css";

interface SafetyPractice {
    title: string;
    description: string;
}

const safetyPractices: SafetyPractice[] = [
    {
        title: "Road Safety Standards",
        description: "Ensure road designs adhere to international safety standards, including proper lane marking, signage, and visibility enhancements."
    },
    {
        title: "Hydraulic Structure Durability",
        description: "Utilize high-quality materials to prevent structural failures in hydraulic systems, ensuring long-term performance and safety."
    },
    {
        title: "Emergency Preparedness",
        description: "Incorporate emergency response plans, such as flood control mechanisms in hydraulics and escape routes in roadways."
    },
    {
        title: "Environmental Considerations",
        description: "Implement eco-friendly designs to minimize environmental impact, including water conservation in hydraulics and reduced emissions in road designs."
    },
    {
        title: "Regular Inspections",
        description: "Schedule regular inspections to identify and address wear and tear in both roadways and hydraulic structures."
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
                        <div className="safetyIcon" />
                        <h3>{practice.title}</h3>
                        <p>{practice.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Safety;
