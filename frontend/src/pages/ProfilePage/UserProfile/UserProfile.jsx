import React, {useState, useEffect} from 'react';
import { Avatar, Button, Typography, Box } from '@mui/material';
import userAvatar from "./п1.png"
import './UserProfile.css';

function UserProfile( {name, surname, patronimic}) {
  return (
    <Box className="user-profile-container">
      <div container='user-name-avatar'>
        <Typography variant="h6" className="user-name">
          {name + " " + surname + " " + patronimic}
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
