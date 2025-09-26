import React, { useEffect, useRef, useState } from 'react';
import picturephoto from '../img/image 20 (1) 1.png';
import profile from '../img/profile.svg';
import vectorBg from '../img/Vector 65.svg';
import './main_body.css';
import missions from './missions.json';
import users from './users.json';

const MainBody = () => {
    const missionsScrollRef = useRef(null);
    const leaderboardScrollRef = useRef(null);
    const [showTopBorderMissions, setShowTopBorderMissions] = useState(false);
    const [showBottomBorderMissions, setShowBottomBorderMissions] = useState(false);
    const [showTopBorderLeaderboard, setShowTopBorderLeaderboard] = useState(false);
    const [showBottomBorderLeaderboard, setShowBottomBorderLeaderboard] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const checkMissionsScroll = () => {
        if (missionsScrollRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = missionsScrollRef.current;
            setShowTopBorderMissions(scrollTop > 0);
            setShowBottomBorderMissions(scrollTop < scrollHeight - clientHeight - 1);
        }
    };

    const checkLeaderboardScroll = () => {
        if (leaderboardScrollRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = leaderboardScrollRef.current;
            setShowTopBorderLeaderboard(scrollTop > 0);
            setShowBottomBorderLeaderboard(scrollTop < scrollHeight - clientHeight - 1);
        }
    };

    const findUserByName = (name) => {
        const foundUser = users.users.find(user =>
            user.name.toLowerCase().includes(name.toLowerCase())
        );
        setCurrentUser(foundUser || null);
    };

    useEffect(() => {
        checkMissionsScroll();
        checkLeaderboardScroll();
        findUserByName("Петр Петров");

        const missionsScrollElement = missionsScrollRef.current;
        const leaderboardScrollElement = leaderboardScrollRef.current;

        if (missionsScrollElement) {
            missionsScrollElement.addEventListener('scroll', checkMissionsScroll);
        }

        if (leaderboardScrollElement) {
            leaderboardScrollElement.addEventListener('scroll', checkLeaderboardScroll);
        }

        window.addEventListener('resize', checkMissionsScroll);
        window.addEventListener('resize', checkLeaderboardScroll);

        return () => {
            if (missionsScrollElement) {
                missionsScrollElement.removeEventListener('scroll', checkMissionsScroll);
            }
            if (leaderboardScrollElement) {
                leaderboardScrollElement.removeEventListener('scroll', checkLeaderboardScroll);
            }
            window.removeEventListener('resize', checkMissionsScroll);
            window.removeEventListener('resize', checkLeaderboardScroll);
        };
    }, []);

    return (
        <div>
            <div className={"main-container"}>
                <div>
                    <img className={"profile"} src={profile} alt={"profile"} />
                    <img className={"profile-picture"} src={picturephoto} alt={"profile-picture"} />
                    <a href="#" className={"profile-button"}>
                        ПЕРЕЙТИ<br />
                        В ПРОФИЛЬ
                    </a>
                </div>
                <div className={"missions-section"}>
                    <div ref={missionsScrollRef}
                        className={`missions-list-scroll ${showTopBorderMissions ? 'has-top-content' : ''
                            } ${showBottomBorderMissions ? 'has-bottom-content' : ''
                            }`}
                    >
                        {missions.missions.map((mission, index) => (
                            <div key={mission.id} className={"mission-card"}>
                                <div className={`mission-bg ${index % 2 === 1 ? 'mirrored' : ''}`}>
                                    <img src={vectorBg} alt="background" />
                                </div>
                                <div className="mission-content">
                                    <h3 className={`mission-title ${index % 2 === 1 ? 'mirrored' : ''}`}>{mission.title}</h3>
                                    <p className={`mission-description ${index % 2 === 1 ? 'mirrored' : ''}`}>{mission.description}</p>
                                    <a href="#" className={`mission-about ${index % 2 === 1 ? 'mirrored' : ''}`}>Узнать подробнее</a>
                                </div>
                            </div>
                        ))}
                    </div>
                    <a className={"new-course"}>
                        <p className={"button-text"}>На новый курс</p>
                    </a>
                </div>
            </div>
            <div className={"leader-board-container"}>
                <svg width="1756" height="805" viewBox="0 0 1756 805" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M953.502 2.39569H1744C1749.52 2.39569 1754 6.87286 1754 12.3957V727.716C1754 729.849 1753.32 731.927 1752.05 733.644L1704 798.927C1702.11 801.487 1699.12 802.999 1695.94 802.999H12C6.47717 802.999 2 798.522 2 792.999V147.938C2 145.71 2.74414 143.546 4.1145 141.789L62.1337 67.3932C64.053 64.9323 66.9685 63.5081 70.0892 63.5424C313.476 66.2132 642.59 64.6729 885.806 63.8967C888.511 63.888 891.06 62.7838 892.937 60.8357L946.302 5.45679C948.186 3.50073 950.786 2.39569 953.502 2.39569Z"
                        fill="#DCD4CB" stroke="black" stroke-width="4" />
                </svg>
                <div className={"leaderboard"}>
                    <span>ТАБЛИЦА ЛИДЕРОВ</span>
                    <div ref={leaderboardScrollRef}
                        className={`leaderboard-scroll ${showTopBorderLeaderboard ? 'has-top-content' : ''
                            } ${showBottomBorderLeaderboard ? 'has-bottom-content' : ''
                            }`}>
                        {users.users.map((user, index) => (
                            <div key={user.id} className={"leaderboard-card"}>
                                <div className={`leaderboard-bg ${index === 0 ? 'golden' : index === 1 ? 'serebro' : index === 2 ? 'bronze' : ''}`}>
                                </div>
                                <div className={`user-board-content ${index === 0 ? 'golden' : index === 1 ? 'serebro' : index === 2 ? 'bronze' : ''}`}>
                                    <p className={`leaderboard-index`}>{user.id}</p>
                                    <p className={`leaderboard-name`}>{user.name}</p>
                                    <p className={`leaderboard-name`}>EXP: {user.exp} </p>
                                    <p className={`leaderboard-mana`}>MANA: {user.exp}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div>
                        {currentUser && (
                            <div className={`user-board-content ${currentUser.id - 1 === 0 ? 'golden' : currentUser.id - 1 === 1 ? 'serebro' : currentUser.id - 1 === 2 ? 'bronze' : ''} ${"alpha"}`}>
                                <p className={`leaderboard-index`}>{currentUser.id}</p>
                                <p className={`leaderboard-name`}>{currentUser.name}</p>
                                <p className={`leaderboard-name`}>EXP: {currentUser.exp}</p>
                                <p className={`leaderboard-mana`}>MANA: {currentUser.exp}</p>
                            </div>
                        )}
                    </div>
                    <p className={"info-legend"}>Что вам даст эта платформа</p>
                </div>
                <div>
                </div>
            </div>
        </div>
    );
};

export default MainBody;