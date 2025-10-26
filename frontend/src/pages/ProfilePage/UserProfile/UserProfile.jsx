import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'; 
import { Avatar, Button, Typography, Box } from '@mui/material';
import defaultAvatar from "../../../assets/defaultavatar.png";
import './UserProfile.css';
import UserInfoPanel from '../UserInfoPanel/UserInfoPanel';

function UserProfile( {profile, skills}) {
  return (
    <Box className="full-profile-container">
      <Box className="user-profile-container">
        <div container='user-name-avatar'>
          <Typography variant="h5" className="user-rank">
            {profile.student.rank}
          </Typography>
          <Typography variant="h5" className="user-name">
            {profile.student.name + " " + 
            profile.student.surname + " " + 
            profile.student.patronymic}
          </Typography>
          
          <img
            alt="User Avatar"
            src={defaultAvatar}
            className="avatar"
          />
        </div>
        
        {/* Кнопка кастомизации */}
        <Link className="customization-link" to='/profile/customisation'>
          <Button variant="contained" color="primary" className="customization-button">
            Кастомизация
          </Button>
        </Link>
      </Box>
      <UserInfoPanel
        profile={profile}
        skills={skills}
      />
    </Box>
    
  );
}

export default UserProfile;
