import React from 'react';
import { Box, Typography, Grid, LinearProgress } from '@mui/material';
import './UserInfoPanel.css';

function UserInfoPanel() {
  // Пример данных для панели пользователя
  const userStats = {
    rank: 'Магистр',
    mana: 1200,
    experience: 8500,
    competencies: [
      { name: 'Магия огня', level: 1.7 },
      { name: 'Магия воды', level: 0.1},
      { name: 'Алхимия', level: 9.1 },
      { name: 'Заклинания защиты', level: 2.8 },
      { name: 'Магия воздуха', level: 4.2 },
    ],
  };

  // Функция для вычисления цвета для компетенций
  const getCompetencyColor = (level) => {
    const hue = (1 - (level / 10)) * 240; 
    return `hsl(${hue}, 50%, 50%)`;
  };

  return (
    <Box className="user-info-panel">
      <Typography variant="h5" className="rank-text">Ранг: {userStats.rank}</Typography>
      <Box className="user-stats">
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography variant="h6" className="mana-text">Мана: {userStats.mana}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6" className="experience-text">Опыт: {userStats.experience}</Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Прокручиваемый список компетенций */}
      <Typography variant="h6" gutterBottom>
          Компетенции:
        </Typography>
      <Box className="competencies-list">

        <Box className="competencies-scroll">
          {userStats.competencies.map((competency, index) => (
            <Box key={index} className="competency">
              <Typography variant="body1">{competency.name}</Typography>
              <LinearProgress
                variant="determinate"
                value={(competency.level / 10) * 100} // Преобразуем уровень в процент
                sx={{
                  backgroundColor: 'rgba(0, 0, 0, 0.1)', // Прозрачный фон
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: getCompetencyColor(competency.level), // Цвет полосы зависит от уровня
                    boxShadow: `0 0 10px ${getCompetencyColor(competency.level)}`, // Эффект свечения
                  },
                }}
              />
              <Typography variant="body2" color="textSecondary">
                Уровень: {competency.level.toFixed(1)}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default UserInfoPanel;
