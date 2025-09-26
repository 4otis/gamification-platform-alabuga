import React from 'react';
import './infoBody.css';
import aboutPictureBlue from '../img/Vector 63.svg';
import aboutPictureGray from '../img/Vector 63 (1).svg';

const InfoBody = () => {
    return (
        <div className="about">
            <div className="about-row">
                <div className="about-picture about-picture-blue about-picture-mirrored">
                    <div className={"info-text-blue revert"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div>
                </div>
                <div className="about-picture about-picture-blue">
                    <div className={"info-text-blue"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div>
                </div>
            </div>
            <div className="about-row">
                <div className="about-picture about-picture-gray">
                    <div className={"info-text-gray"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div>
                </div>
                <div className="about-picture about-picture-gray about-picture-mirrored">
                    <div className={"info-text-gray revert"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div>
                </div>
            </div>
        </div>
    );
};

export default InfoBody;