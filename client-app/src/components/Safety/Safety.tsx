import React from "react";
import "./Safety.css";

interface SafetyPractice {
    title: string;
    description: string;
}

const safetyPractices: SafetyPractice[] = [
    {
        title: "Roadway Safety",
        description: "Roadway safety emphasizes proper design, clear signage, skid-resistant pavements, " +
            "effective drainage, safety barriers, adequate lighting, and speed management to prevent " +
            "accidents and protect users."
    },
    {
        title: "Environmental Considerations",
        description: "Stabilize slopes, manage runoff, and use vegetation or geo textiles. Prevent " +
            "pollution with sediment traps and filtration, and include wildlife crossings to reduce habitat disruption."
    },
    {
        title: "Regular Inspections",
        description: "Conduct regular inspections to detect and address wear and tear in roadways and hydraulic structures."
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
                        <h3>{practice.title}</h3>
                        <p>{practice.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Safety;
