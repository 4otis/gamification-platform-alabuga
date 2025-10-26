import React, { useState } from 'react';
import { Box, List, ListItem, ListItemText, Typography, Divider, Grid } from '@mui/material';
import './TransactionJournal.css';

function formatTimestamp(timestamp, locale = 'ru-RU') {
    const date = new Date(timestamp);
    
    return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).format(date);
}

const getCompetencyColor = (score) => {
    const hue = (1 - (score / 10)) * 240; 
    return `hsl(${hue}, 50%, 50%)`;
  };

function TransactionJournal({transactions}) {
  // Пример данных для журнала транзакций

  const [selectedTransaction, setSelectedTransaction] = useState(null); // Хранение выбранной транзакции

  // Функция для обработки клика по транзакции
  const handleTransactionClick = (transaction) => {
    setSelectedTransaction(transaction);
  };

  return (
    <Box className="transaction-journal">
        {/* Список транзакций */}
        <Grid className="transaction-frame" item xs={6}>
          <Typography variant="h5" className='transaction-list-title'gutterBottom>Энергопоток</Typography>
          <Divider />
          <Box className="transaction-list">
            <List>
              {transactions.map((transaction) => (
                <ListItem 
                  key={transaction.id} 
                  onClick={() => handleTransactionClick(transaction)} 
                  className="transaction-item"
                >
                  <ListItemText 
                    primary={`Дата: ${formatTimestamp(transaction.timestamp)}`} 
                    secondary={`Мана: ${transaction.mana < 0 ? "":"+"}${transaction.mana} Опыт: ${transaction.exp} `}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>

        {/* Панель с информацией о выбранной транзакции */}
          <Box className="transaction-info">
            {selectedTransaction ? (
              <div style={{height:"100%"}}>
                <Typography variant="h6" gutterBottom>
                  Информация о транзакции
                </Typography>
                <Divider />
                <Typography variant="body1">{selectedTransaction.type}</Typography>
                <Typography variant="body1"><strong>{selectedTransaction.title}</strong> </Typography>
                
                <Typography variant="body1">{selectedTransaction.descr}</Typography>
                
                <Typography variant="body1">
                  Mana: {((selectedTransaction.mana < 0 )? "":"+") + selectedTransaction.mana + " "}
                  Опыт: {selectedTransaction.exp}
                </Typography>
                <div className='transaction-skills-list'>
                  {selectedTransaction.skills?.map((skill, index)=>{
                    <LinearProgress
                      key={index}
                      variant="determinate"
                      value={(skill.score / 10) * 100} // Преобразуем уровень в процент
                      sx={{
                        backgroundColor: 'rgba(0, 0, 0, 0.1)', // Прозрачный фон
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: getCompetencyColor(skill.score),
                          boxShadow: `0 0 10px ${getCompetencyColor(skill.score)}`, 
                        },
                      }}
                    />
                  })}

                </div>
              </div>
            ) : (
              <Typography variant="body2" color="textSecondary">Выберите транзакцию для просмотра информации</Typography>
            )}
          </Box>
    </Box>
  );
}

export default TransactionJournal;
