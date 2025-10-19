import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './ProfileMissionLeaderbord.css';
import missions from './missions.json';
import users from './users.json';
import {Typography, Button, Box } from "@mui/material";
import defaultAvatar from "../../../assets/defaultavatar.png";


const MainBody = () => {
    const missionsScrollRef = useRef(null);
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
    }, []);

    return (
        <div className="main-body">
        

            <div className="main-container">
                <div className="profile-missions-section">
                    <div className="mp-user-container">
                            <div className='user-info-container'>
                                <Typography variant="h6" className="mp-user-name">
                                    {"<Имя пользователя>"}
                                </Typography>
                                <Typography variant="h6" className="mp-user-surname">
                                    {"<Фамилия пользователя>"}
                                </Typography>
                                <Typography variant="h6" className="mp-user-rank">
                                    {"<Ранг пользователя>"}
                                </Typography>
                                <Typography variant="h6" className="mp-mana-exp">
                                    {"<Опыт>"}
                                </Typography>
                                <Typography variant="h6" className="mp-mana-exp">
                                    {"<Мана>"}
                                </Typography>
                                <Link className="profile-link" to='/profile'>
                                    <Button variant="contained" color="primary" className="profile-button">
                                        <Typography variant="h6" className="prbut-text"> В профиль </Typography>
                                    </Button>
                                </Link>
                            </div>
                            <div>
                                <img
                                alt="User Avatar"
                                src={  defaultAvatar}
                                className="mp-avatar"
                                />
                            </div>
                            
                    </div>
    

                    <div className="missions-section">
                        <div ref={missionsScrollRef} className="missions-scroll">
                                {missions.missions.map((mission, index) => (
                                    <div key={mission.id} className="mission-card">
                                        <div className="mission-content">
                                            <h3 className="mission-title">{mission.title}</h3>
                                            <p className="mission-description">{mission.description}</p>
                                            <a href="#" className="mission-link">Узнать подробнее</a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="new-course-button">
                                На новый курс
                            </button>
                    </div>
                </div>

                <div className="leaderboard-section">
                    <div className="leaderboard-container">
                        <h2 className="leaderboard-title">ТАБЛИЦА ЛИДЕРОВ</h2>

                        <div ref={leaderboardScrollRef} className="leaderboard-scroll">
                            {users.users.map((user, index) => (
                                <div key={user.id} className={`leaderboard-card ${index < 3 ? `rank-${index}` : ''}`}>
                                    <div className="leaderboard-content">
                                        <span className="leaderboard-rank">{user.id}</span>
                                        <span className="leaderboard-name">{user.name}</span>
                                        <span className="leaderboard-stats">
                                            EXP: {user.exp} | MANA: {user.exp}
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
                                        <span className="leaderboard-rank">{currentUser.id}</span>
                                        <span className="leaderboard-name">{currentUser.name}</span>
                                        <span className="leaderboard-stats">
                                            EXP: {currentUser.exp} | MANA: {currentUser.mana}
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