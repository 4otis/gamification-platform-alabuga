import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'; 
import {  Button, Typography, Box } from '@mui/material';
import UserInfoPanel from '../UserInfoPanel/UserInfoPanel';
import Avatar from '../../../shared/components/hooks/Avatar';

import './UserProfile.css';

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
          
          <Avatar
            width={270}
            height={270}
            marginRight={0}
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
