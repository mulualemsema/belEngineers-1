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
                    <div className="logo-hub">
                        <img
                            src={hub}
                            alt="Statewide Underutilized Business Program"
                        />
                    </div>
                    <div className="logo-mbe">
                        <img src={mbe} alt="Minority Business MBE" />
                    </div>
                    <div className="logo-dbe">
                        <img src={dbe} alt="Disadvantage Business Enterprise DBE" />
                    </div>
                </div>
                <div className="txdot-section">
                    <h2 className="txdot-heading">TxDOT Pre-certification</h2>
                    <ul className="txdot-list">
                        <li>Roadway Design</li>
                        <li>Hydraulics Design</li>
                        <li>Hydrological Studies</li>
                        <li>Roadway Hydraulic Design</li>
                        <li>Bridge Hydraulic Design</li>
                        <li>Signing, Pav. Marking, and Channelization</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Certification;
