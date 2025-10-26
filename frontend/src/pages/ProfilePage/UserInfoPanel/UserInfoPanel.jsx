import React from 'react';
import { Box, Typography, Grid, LinearProgress } from '@mui/material';
import './UserInfoPanel.css';

function UserInfoPanel( {profile, skills}) {
  // Пример данных для панели пользователя
  const userStats = {
    mana: profile.student.mana,
    experience: profile.student.exp,
    competencies: skills
  };

  // Функция для вычисления цвета для компетенций
  const getCompetencyColor = (score) => {
    const hue = (1 - (score / 10)) * 240; 
    return `hsl(${hue}, 50%, 50%)`;
  };

  return (
    <Box className="user-info-panel">
      {/* <Box className="user-stats">
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography variant="h5" className="mana-text">Мана: {userStats.mana}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h5" className="experience-text">Опыт: {userStats.experience}</Typography>
          </Grid>
        </Grid>
      </Box> */}

      {/* Прокручиваемый список компетенций */}
      <Typography variant="h5" gutterBottom>
          Компетенции:
        </Typography>
      <Box className="competencies-list">

        <Box className="competencies-scroll">
          {userStats.competencies.map((competency, index) => (
            <Box key={index} className="competency">
              <Typography variant="body1">{competency.name}</Typography>
              <LinearProgress
                variant="determinate"
                value={(competency.score / 10) * 100} // Преобразуем уровень в процент
                sx={{
                  backgroundColor: 'rgba(0, 0, 0, 0.1)', // Прозрачный фон
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: getCompetencyColor(competency.score), // Цвет полосы зависит от уровня
                    boxShadow: `0 0 10px ${getCompetencyColor(competency.score)}`, // Эффект свечения
                  },
                }}
              />
              <Typography variant="body2" color="textSecondary">
                Уровень: {competency.score.toFixed(1)}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default UserInfoPanel;
