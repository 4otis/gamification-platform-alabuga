import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './ProfileMissionLeaderbord.css';
import missions from './missions.json';
import users from './users.json';
import {Typography, Button, Box } from "@mui/material";
import defaultAvatar from "../../../assets/defaultavatar.png";
import CountUp from '../../../shared/components/countingText/CountingText';
import { dimensionValueTypes } from 'motion/react';

const manaIcon=() =>{
    return(
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="Business-Prodect-Diamond--Streamline-Pixel" height="32" width="32">
            <g>
                <path d="M30.47 21.33H32v1.53h-1.53Z" fill="#ffffff" stroke-width="1"></path>
                <path d="M30.47 13.72h-6.09v-6.1h1.52V6.1h-1.52V4.57H7.62V6.1H6.09v1.52H4.57v1.52H3.05v1.53H1.52v1.52H0v4.57h1.52v-1.52h7.62v3.05h1.52v3.04h1.53v3.05h1.52v3.05h1.53V15.24h6.09v3.05h-1.52v3.04h-1.53v3.05h-1.52v3.05h-1.52v1.52h-1.53v1.53h1.53V32h1.52v-1.52h1.52v-1.53h1.53v-1.52h1.52v-1.52h1.53v-1.53h1.52v-1.52h1.52v-1.53h1.53v-1.52h1.52v-1.52h1.52v-1.53H32v-4.57h-1.53Zm-9.14 0H10.66v-1.53H9.14V6.1h6.1v1.52h1.52v1.52h1.52v1.53h1.53v1.52h1.52Z" fill="#ffffff" stroke-width="1"></path>
                <path d="M28.95 25.91h1.52v1.52h-1.52Z" fill="#ffffff" stroke-width="1"></path>
                <path d="M28.95 10.67h1.52v1.52h-1.52Z" fill="#ffffff" stroke-width="1"></path>
                <path d="M27.43 27.43h1.52v1.52h-1.52Z" fill="#ffffff" stroke-width="1"></path>
                <path d="M27.43 24.38h1.52v1.53h-1.52Z" fill="#ffffff" stroke-width="1"></path>
                <path d="M27.43 9.14h1.52v1.53h-1.52Z" fill="#ffffff" stroke-width="1"></path>
                <path d="m27.43 3.05 -1.53 0 0 1.52 1.53 0 0 1.53 1.52 0 0 -1.53 1.52 0 0 -1.52 -1.52 0 0 -1.53 -1.52 0 0 1.53z" fill="#ffffff" stroke-width="1"></path>
                <path d="M25.9 25.91h1.53v1.52H25.9Z" fill="#ffffff" stroke-width="1"></path>
                <path d="M25.9 7.62h1.53v1.52H25.9Z" fill="#ffffff" stroke-width="1"></path>
                <path d="M22.86 30.48h1.52V32h-1.52Z" fill="#ffffff" stroke-width="1"></path>
                <path d="M22.86 0h1.52v1.52h-1.52Z" fill="#ffffff" stroke-width="1"></path>
                <path d="M13.71 7.62h1.53v1.52h-1.53Z" fill="#ffffff" stroke-width="1"></path>
                <path d="M13.71 1.52h1.53v1.53h-1.53Z" fill="#ffffff" stroke-width="1"></path>
                <path d="M12.19 27.43h1.52v1.52h-1.52Z" fill="#ffffff" stroke-width="1"></path>
                <path d="M12.19 9.14h1.52v1.53h-1.52Z" fill="#ffffff" stroke-width="1"></path>
                <path d="M10.66 25.91h1.53v1.52h-1.53Z" fill="#ffffff" stroke-width="1"></path>
                <path d="M10.66 10.67h1.53v1.52h-1.53Z" fill="#ffffff" stroke-width="1"></path>
                <path d="M9.14 28.95h1.52v1.53H9.14Z" fill="#ffffff" stroke-width="1"></path>
                <path d="M9.14 24.38h1.52v1.53H9.14Z" fill="#ffffff" stroke-width="1"></path>
                <path d="M7.62 22.86h1.52v1.52H7.62Z" fill="#ffffff" stroke-width="1"></path>
                <path d="M6.09 21.33h1.53v1.53H6.09Z" fill="#ffffff" stroke-width="1"></path>
                <path d="M4.57 19.81h1.52v1.52H4.57Z" fill="#ffffff" stroke-width="1"></path>
                <path d="M4.57 3.05h1.52v1.52H4.57Z" fill="#ffffff" stroke-width="1"></path>
                <path d="m3.05 24.38 0 1.53 -1.53 0 0 1.52 1.53 0 0 1.52 1.52 0 0 -1.52 1.52 0 0 -1.52 -1.52 0 0 -1.53 -1.52 0z" fill="#ffffff" stroke-width="1"></path>
                <path d="M3.05 18.29h1.52v1.52H3.05Z" fill="#ffffff" stroke-width="1"></path>
                <path d="M3.05 4.57h1.52V6.1H3.05Z" fill="#ffffff" stroke-width="1"></path>
                <path d="M3.05 1.52h1.52v1.53H3.05Z" fill="#ffffff" stroke-width="1"></path>
                <path d="M1.52 16.76h1.53v1.53H1.52Z" fill="#ffffff" stroke-width="1"></path>
                <path d="M1.52 3.05h1.53v1.52H1.52Z" fill="#ffffff" stroke-width="1"></path>
                <path d="M0 21.33h1.52v1.53H0Z" fill="#ffffff" stroke-width="1"></path>
            </g>
        </svg>
    )
}
const expIcon=()=>{
    return(
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="Content-Files-Open-Book-Bookmark--Streamline-Pixel" height="32" width="32">
            <g>
                <path d="M30.48 4.575H32v22.85h-1.52Z" fill="#ffffff" stroke-width="1"></path>
                <path d="M19.81 27.425h10.67v1.53H19.81Z" fill="#ffffff" stroke-width="1"></path>
                <path d="M24.39 4.575h1.52v1.52h-1.52Z" fill="#ffffff" stroke-width="1"></path>
                <path d="M22.86 13.715h3.05v1.52h-3.05Z" fill="#ffffff" stroke-width="1"></path>
                <path d="M18.29 19.805h7.62v1.53h-7.62Z" fill="#ffffff" stroke-width="1"></path>
                <path d="M18.29 16.765h7.62v1.52h-7.62Z" fill="#ffffff" stroke-width="1"></path>
                <path d="M18.29 13.715h3.05v1.52h-3.05Z" fill="#ffffff" stroke-width="1"></path>
                <path d="M18.29 10.665h6.1v1.53h-6.1Z" fill="#ffffff" stroke-width="1"></path>
                <path d="M18.29 7.615h7.62v1.53h-7.62Z" fill="#ffffff" stroke-width="1"></path>
                <path d="M18.29 4.575h4.57v1.52h-4.57Z" fill="#ffffff" stroke-width="1"></path>
                <path d="M16.77 1.525h10.66v1.52H16.77Z" fill="#ffffff" stroke-width="1"></path>
                <path d="M12.2 28.955h7.61v1.52H12.2Z" fill="#ffffff" stroke-width="1"></path>
                <path d="M12.2 13.715h1.52v1.52H12.2Z" fill="#ffffff" stroke-width="1"></path>
                <path d="M12.2 10.665h1.52v1.53H12.2Z" fill="#ffffff" stroke-width="1"></path>
                <path d="M12.2 7.615h1.52v1.53H12.2Z" fill="#ffffff" stroke-width="1"></path>
                <path d="M12.2 4.575h1.52v1.52H12.2Z" fill="#ffffff" stroke-width="1"></path>
                <path d="M1.53 27.425H12.2v1.53H1.53Z" fill="#ffffff" stroke-width="1"></path>
                <path d="M9.15 19.805h4.57v1.53H9.15Z" fill="#ffffff" stroke-width="1"></path>
                <path d="M7.62 16.765h6.1v1.52h-6.1Z" fill="#ffffff" stroke-width="1"></path>
                <path d="M6.1 19.805h1.52v1.53H6.1Z" fill="#ffffff" stroke-width="1"></path>
                <path d="m6.1 15.235 1.52 0 0 -1.52 1.53 0 0 1.52 1.52 0 0 -12.19 4.57 0 0 -1.52 -10.66 0 0 1.52 1.52 0 0 12.19z" fill="#ffffff" stroke-width="1"></path>
                <path d="m3.05 25.905 10.67 0 0 1.52 4.57 0 0 -1.52 10.67 0 0 -21.33 1.52 0 0 -1.53 -3.05 0 0 21.34 -10.66 0 0 -21.34 -1.53 0 0 21.34 -10.66 0 0 -21.34 -3.05 0 0 1.53 1.52 0 0 21.33z" fill="#ffffff" stroke-width="1"></path>
                <path d="M0 4.575h1.53v22.85H0Z" fill="#ffffff" stroke-width="1"></path>
            </g>
            </svg>
    )
}
const rankIcon=()=>{
    return(
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="Social-Rewards-Rating-Star-2--Streamline-Pixel" height="32" width="32">
            <g>
            <path d="M30.48 10.66h-9.15v1.53h-1.52v1.52h-1.52v1.52h-1.53V4.57h1.53V1.52h-1.53V0h-1.52v1.52h-1.53v3.05h-1.52v3.05h-1.52v3.04H1.52v1.53H0v1.52h1.52v1.52h1.53v1.53H6.1v1.52h1.52v3.05h1.52v-1.52h3.05v-1.53h3.05v1.53h-1.53v1.52h-1.52v1.52h-1.52v1.53H9.14v1.52H7.62v1.53H6.1v1.52H4.57v-1.52H3.05v3.04h1.52V32h3.05v-1.53h1.52v-1.52h3.05v-1.52h1.52V25.9h1.53v-1.52h1.52v-4.57h1.53v1.52h1.52v1.52h1.52v1.53h1.53v1.52h1.52v1.53h1.52v3.04h-1.52V32h3.05v-1.53h1.52v-3.04h-1.52v-3.05H25.9v-3.05h-1.52v-3.05h1.52v-1.52h-3.04v1.52h-6.1v-1.52h4.57v-1.53h1.53v-1.52h6.09v1.52h1.53v-1.52H32v-1.52h-1.52Zm-16.77 6.1h-3.04v-1.53H7.62v-1.52H4.57v-1.52h7.62v1.52h1.52Z" fill="#ffffff" stroke-width="1"></path>
            <path d="M25.9 15.23h3.05v1.53H25.9Z" fill="#ffffff" stroke-width="1"></path>
            <path d="M22.86 28.95h1.52v1.52h-1.52Z" fill="#ffffff" stroke-width="1"></path>
            <path d="M19.81 27.43h3.05v1.52h-3.05Z" fill="#ffffff" stroke-width="1"></path>
            <path d="M19.81 7.62h1.52v3.04h-1.52Z" fill="#ffffff" stroke-width="1"></path>
            <path d="M18.29 25.9h1.52v1.53h-1.52Z" fill="#ffffff" stroke-width="1"></path>
            <path d="M18.29 4.57h1.52v3.05h-1.52Z" fill="#ffffff" stroke-width="1"></path>
            <path d="M16.76 24.38h1.53v1.52h-1.53Z" fill="#ffffff" stroke-width="1"></path>
            <path d="M6.1 21.33h1.52v3.05H6.1Z" fill="#ffffff" stroke-width="1"></path>
            <path d="M4.57 24.38H6.1v3.05H4.57Z" fill="#ffffff" stroke-width="1"></path>
            </g>
        </svg>
    )
}

const profileIcon=()=>{
    return(
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="Interface-Essential-Expand-3--Streamline-Pixel" height="32" width="32">
                                        <g>
                                            <path d="M30.47 18.29H32v12.19h-1.53Z" fill="#ffffff" stroke-width="1"></path>
                                            <path d="M30.47 1.52H32v12.19h-1.53Z" fill="#ffffff" stroke-width="1"></path>
                                            <path d="M27.42 16.76h3.05v1.53h-3.05Z" fill="#ffffff" stroke-width="1"></path>
                                            <path d="M18.28 30.48h12.19V32H18.28Z" fill="#ffffff" stroke-width="1"></path>
                                            <path d="M27.42 13.71h3.05v1.53h-3.05Z" fill="#ffffff" stroke-width="1"></path>
                                            <path d="m27.42 7.62 -1.52 0 0 1.52 -1.52 0 0 1.53 1.52 0 0 3.04 1.52 0 0 -6.09z" fill="#ffffff" stroke-width="1"></path>
                                            <path d="m25.9 22.86 0 1.52 1.52 0 0 -6.09 -1.52 0 0 3.04 -1.52 0 0 1.53 1.52 0z" fill="#ffffff" stroke-width="1"></path>
                                            <path d="M22.85 19.81h1.53v1.52h-1.53Z" fill="#ffffff" stroke-width="1"></path>
                                            <path d="M22.85 10.67h1.53v1.52h-1.53Z" fill="#ffffff" stroke-width="1"></path>
                                            <path d="M21.33 18.29h1.52v1.52h-1.52Z" fill="#ffffff" stroke-width="1"></path>
                                            <path d="M21.33 12.19h1.52v1.52h-1.52Z" fill="#ffffff" stroke-width="1"></path>
                                            <path d="m22.85 6.09 1.53 0 0 -1.52 -6.1 0 0 1.52 3.05 0 0 1.53 1.52 0 0 -1.53z" fill="#ffffff" stroke-width="1"></path>
                                            <path d="m24.38 27.43 0 -1.53 -1.53 0 0 -1.52 -1.52 0 0 1.52 -3.05 0 0 1.53 6.1 0z" fill="#ffffff" stroke-width="1"></path>
                                            <path d="M19.8 22.86h1.53v1.52H19.8Z" fill="#ffffff" stroke-width="1"></path>
                                            <path d="M18.28 16.76h3.05v1.53h-3.05Z" fill="#ffffff" stroke-width="1"></path>
                                            <path d="M19.8 7.62h1.53v1.52H19.8Z" fill="#ffffff" stroke-width="1"></path>
                                            <path d="M18.28 0h12.19v1.52H18.28Z" fill="#ffffff" stroke-width="1"></path>
                                            <path d="m18.28 21.33 0 -3.04 -1.52 0 0 4.57 3.04 0 0 -1.53 -1.52 0z" fill="#ffffff" stroke-width="1"></path>
                                            <path d="M18.28 13.71h3.05v1.53h-3.05Z" fill="#ffffff" stroke-width="1"></path>
                                            <path d="M18.28 9.14h1.52v1.53h-1.52Z" fill="#ffffff" stroke-width="1"></path>
                                            <path d="M16.76 27.43h1.52v3.05h-1.52Z" fill="#ffffff" stroke-width="1"></path>
                                            <path d="M16.76 10.67h1.52v3.04h-1.52Z" fill="#ffffff" stroke-width="1"></path>
                                            <path d="M16.76 1.52h1.52v3.05h-1.52Z" fill="#ffffff" stroke-width="1"></path>
                                            <path d="M13.71 27.43h1.52v3.05h-1.52Z" fill="#ffffff" stroke-width="1"></path>
                                            <path d="M13.71 18.29h1.52v3.04h-1.52Z" fill="#ffffff" stroke-width="1"></path>
                                            <path d="M13.71 10.67h1.52v3.04h-1.52Z" fill="#ffffff" stroke-width="1"></path>
                                            <path d="M13.71 1.52h1.52v3.05h-1.52Z" fill="#ffffff" stroke-width="1"></path>
                                            <path d="M12.19 21.33h1.52v1.53h-1.52Z" fill="#ffffff" stroke-width="1"></path>
                                            <path d="M10.66 16.76h3.05v1.53h-3.05Z" fill="#ffffff" stroke-width="1"></path>
                                            <path d="M12.19 9.14h1.52v1.53h-1.52Z" fill="#ffffff" stroke-width="1"></path>
                                            <path d="M1.52 30.48h12.19V32H1.52Z" fill="#ffffff" stroke-width="1"></path>
                                            <path d="M10.66 22.86h1.53v1.52h-1.53Z" fill="#ffffff" stroke-width="1"></path>
                                            <path d="M10.66 13.71h3.05v1.53h-3.05Z" fill="#ffffff" stroke-width="1"></path>
                                            <path d="M10.66 7.62h1.53v1.52h-1.53Z" fill="#ffffff" stroke-width="1"></path>
                                            <path d="m7.61 4.57 0 1.52 1.53 0 0 1.53 1.52 0 0 -1.53 3.05 0 0 -1.52 -6.1 0z" fill="#ffffff" stroke-width="1"></path>
                                            <path d="m9.14 25.9 -1.53 0 0 1.53 6.1 0 0 -1.53 -3.05 0 0 -1.52 -1.52 0 0 1.52z" fill="#ffffff" stroke-width="1"></path>
                                            <path d="M9.14 18.29h1.52v1.52H9.14Z" fill="#ffffff" stroke-width="1"></path>
                                            <path d="M9.14 12.19h1.52v1.52H9.14Z" fill="#ffffff" stroke-width="1"></path>
                                            <path d="M7.61 19.81h1.53v1.52H7.61Z" fill="#ffffff" stroke-width="1"></path>
                                            <path d="M7.61 10.67h1.53v1.52H7.61Z" fill="#ffffff" stroke-width="1"></path>
                                            <path d="m6.09 9.14 0 -1.52 -1.52 0 0 6.09 1.52 0 0 -3.04 1.52 0 0 -1.53 -1.52 0z" fill="#ffffff" stroke-width="1"></path>
                                            <path d="m4.57 24.38 1.52 0 0 -1.52 1.52 0 0 -1.53 -1.52 0 0 -3.04 -1.52 0 0 6.09z" fill="#ffffff" stroke-width="1"></path>
                                            <path d="M1.52 16.76h3.05v1.53H1.52Z" fill="#ffffff" stroke-width="1"></path>
                                            <path d="M1.52 0h12.19v1.52H1.52Z" fill="#ffffff" stroke-width="1"></path>
                                            <path d="M1.52 13.71h3.05v1.53H1.52Z" fill="#ffffff" stroke-width="1"></path>
                                            <path d="M0 18.29h1.52v12.19H0Z" fill="#ffffff" stroke-width="1"></path>
                                            <path d="M0 1.52h1.52v12.19H0Z" fill="#ffffff" stroke-width="1"></path>
                                        </g>
                                        </svg>
    )
}

const MainBody = ({profile, missions, leaderlist, currentPosition}) => {
    const leaderboardScrollRef = useRef(null);
    const [currentUser, setCurrentUser] = useState(null);

    const findUserByName = (name) => {
        const foundUser = users.users.find(user =>
            user.name.toLowerCase().includes(name.toLowerCase())
        );
        setCurrentUser(foundUser || null);
    };

    useEffect(() => {
        findUserByName("Петр Петров");
    }, [])

    return (
        <div className="main-body">
        

            <div className="main-container">
                <div className="profile-missions-section">
                    <div className="mp-user-container">
                            <Link className="profile-link"
                                to='/profile'
                                style={{top: 0, right: 0, position:"absolute", margin:"20px"}}
                            >
                                <Button variant="contained" color="primary" className="profile-button">
                                    {profileIcon()}
                                </Button>
                            </Link>
                            <div className='user-info-container'
                                style={{top: 0, left: 0, position:"absolute", }}
                            >
                                <Typography variant="h6" className="mp-exp-mana">
                                    <span style={{display:"flex",  gap:"5px"}}>
                                        {manaIcon()}
                                    <CountUp
                                        from={profile.student.exp/2}
                                        to={profile.student.exp}
                                        separator=","
                                        direction="up"
                                        duration={1}
                                        className="count-up-text"
                                    />
                                    </span>
                                    <span style={{display:"flex",  gap:"5px"}}>
                                        {expIcon()}
                                        <CountUp
                                            from={profile.student.mana/2}
                                            to={profile.student.mana+10000}
                                            separator=","
                                            direction="up"
                                            duration={1}
                                            className="count-up-text"
                                        />
                                    </span>
                                    
                                </Typography>
                                <Typography variant="h6" className="mp-user-name-surname">
                                    {profile.student.name + " " + profile.student.surname}
                                </Typography>
                                <Typography variant="h6" className="mp-user-rank">
                                    {rankIcon()}
                                    <span>{profile.student.rank}</span>
                                </Typography>
                                
                            </div>

                            <img
                            alt="User Avatar"
                            src={  defaultAvatar}
                            className="mp-avatar"
                            />
              
                            
                    </div>
    

                    <div className="missions-section">
                        <div className="missions-scroll">
                                {missions.map((mission, index) => (
                                    <div key={mission.id} className="mission-card">
                                        <div className="mission-content">
                                            <h3 className="mission-title">{mission.title}</h3>
                                            <p className="mission-description">{mission.descr}</p>
                                            <Link to="cources/detail" className="mission-link">Узнать подробнее</Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='to-cources-buttons'>
                                <Link to="/cources" style={{width:"100%"}}>
                                    <Button variant="contained" color="primary" className="new-course-button">
                                        На новый курс
                                    </Button>
                                </Link>
                            </div>
                    </div>
                </div>

                <div className="leaderboard-section">
                    <div className="leaderboard-container">
                        <h2 className="leaderboard-title">ТАБЛИЦА ЛИДЕРОВ</h2>

                        <div ref={leaderboardScrollRef} className="leaderboard-scroll">
                            {leaderlist.map((user, index) => (
                                <div key={user.id} className={`leaderboard-card ${index < 3 ? `rank-${index}` : ''}`}>
                                    <div className="leaderboard-content">
                                        <span className="leaderboard-rank">{index+1}</span>
                                        <span className="leaderboard-name">{user.name}</span>
                                        <span className="leaderboard-stats">
                                            EXP: {" "}
                                            <CountUp
                                                from={user.exp/2}
                                                to={user.exp}
                                                separator=","
                                                direction="up"
                                                duration={1}
                                                className="count-up-text"
                                            />
                                            : {" "}
                                            <CountUp
                                                from={user.exp/2}
                                                to={user.exp}
                                                separator=","
                                                direction="up"
                                                duration={1}
                                                className="count-up-text"
                                            />
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {currentUser && (
                            <div className="current-user-section">
                                <h3>Ваша позиция:</h3>
                                <div className="leaderboard-card current-user">
                                    <div className="leaderboard-content">
                                        <span className="leaderboard-rank">{currentPosition}</span>
                                        <span className="leaderboard-name">{profile.student.name}</span>
                                        <span className="leaderboard-stats">
                                            EXP: {profile.student.exp} | MANA: {profile.student.mana}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>


        </div>
    );
};

export default MainBody;