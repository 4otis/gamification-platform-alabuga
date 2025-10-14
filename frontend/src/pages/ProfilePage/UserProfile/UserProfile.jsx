import React, {useState, useEffect} from 'react';
import { Avatar, Button, Typography, Box } from '@mui/material';
import userAvatar from "./п1.png"
import './UserProfile.css';

function UserProfile( {profile}) {
  return (
    <Box className="user-profile-container">
      <div container='user-name-avatar'>
        <Typography variant="h6" className="user-name">
          {profile.student.name + " " + 
          profile.student.surname + " " + 
          profile.student.patronymic}
        </Typography>
        <Typography variant="h6" className="user-rank">
          {profile.student.rank}
        </Typography>
        <img
          alt="User Avatar"
          src={userAvatar}
          className="avatar"
        />
      </div>
      
      {/* Кнопка кастомизации */}
      <Button variant="contained" color="primary" className="customization-button">
        Кастомизация
      </Button>
    </Box>
  );
}

export default UserProfile;
