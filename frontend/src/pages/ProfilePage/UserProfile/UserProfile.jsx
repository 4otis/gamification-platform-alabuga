import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'; 
import { Avatar, Button, Typography, Box } from '@mui/material';
import defaultAvatar from "../../../../public/defaultavatar.png";
import './UserProfile.css';

function UserProfile( {profile}) {
  return (
    <Box className="user-profile-container">
      <div container='user-name-avatar'>
        <Typography variant="h6" className="user-rank">
          {profile.student.rank}
        </Typography>
        <Typography variant="h6" className="user-name">
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
      <Link className="customization-link" to='/profile/customization'>
        <Button variant="contained" color="primary" className="customization-button">
          Кастомизация
        </Button>
      </Link>
    </Box>
  );
}

export default UserProfile;
