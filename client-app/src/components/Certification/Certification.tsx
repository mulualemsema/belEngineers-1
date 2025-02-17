import React from "react";
import "./Certification.css";
import hub from '../picture/HUB.png';
import mbe from '../picture/MBE.png';
import dbe from '../picture/DBE.jpg';

const Certification: React.FC = () => {
    return (
        <div className="certification-container">
            <h1 className="certification-heading">Certifications</h1>
            <p className="certification-paragraph">
                BEL Engineers LLC has a minority-owned Texas business. BEL is certified by
                the following agencies.
            </p>

            <div className="certification-content">
                <div className="logos-section">
                    <div className="logo-dbe">
                        <img src={dbe} alt="Disadvantage Business Enterprise DBE"/>
                    </div>
                    <div className="logo-hub">
                        <img
                            src={hub}
                            alt="Statewide Underutilized Business Program"
                        />
                    </div>
                    <div className="logo-mbe">
                        <img src={mbe} alt="Minority Business MBE"/>
                    </div>
                </div>
                <div className="txdot-section">
                    <h2 className="txdot-heading">TxDOT Pre-certification</h2>
                    <ul className="txdot-list">
                        <li>(4.2.1) ROADWAY DESIGN</li>
                        <li>(8.1.1) SIGNING, PAV.MARKING AND CHANNELIZATION </li>
                        <li>(10.1.1) HYDROLOGICAL STUDIES </li>
                        <li>(10.2.1) ROADWAY HYDRAULIC DESIGN </li>
                        <li>(10.3.1) BRIDGE HYDRAULIC DESIGN </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Certification;
