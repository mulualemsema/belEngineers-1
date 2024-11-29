import React from "react";
import "./AboutUs.css";
import imageDemissie from '../picture/Demissie.jpg'

const AboutUs = () => {
    return (
        <div className="about-us">
            <section className="about">
                <div className="container">
                    <h2>Who We Are</h2>
                    <p>BEL Engineers LLC, founded in 2023 by Demissie M. Sema, offers
                        extensive expertise in the field of transportation engineering.
                        A licensed engineer since 2005, Mr. Sema brings over 23 years of experience,
                        specializing in TxDOT Austin District design and construction projects.
                        His areas of expertise include roadway design, hydrology, roadway and bridge hydraulics,
                        traffic control, and the preparation of Plans, Specifications, and Estimates (PS&E)
                        for design projects, as well as construction management.
                    </p>
                    <p>
                        The firm is proudly certified as a DBE, HUB,
                        and MBE and holds TxDOT pre-certification, positioning BEL Engineers LLC
                        as a trusted and qualified partner in delivering exceptional transportation
                        engineering solutions.
                    </p>
                    <div className="team">
                        <div className="team-members">
                            <div className="member">
                                <img src={imageDemissie}
                                     alt="Founder"
                                />
                                <h4>Demissie M. Sema, P.E. </h4>
                                <p>Founder of BEL Engineers LLC</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;