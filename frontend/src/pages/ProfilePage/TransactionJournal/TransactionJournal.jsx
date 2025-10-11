import React, { useState } from 'react';
import { Box, List, ListItem, ListItemText, Typography, Divider, Grid } from '@mui/material';
import './TransactionJournal.css';

function TransactionJournal() {
  // Пример данных для журнала транзакций
  const transactions = [
    { id: 1, date: '2023-09-25', amount: 100, description: 'Покупка книг', details: 'Оплата книг на сумму 100 рублей в магазине "Книги".' },
    { id: 2, date: '2023-09-26', amount: 50, description: 'Оплата транспорта', details: 'Покупка проездного билета на автобус за 50 рублей.' },
    { id: 3, date: '2023-09-27', amount: 200, description: 'Ресторан', details: 'Оплата ужина в ресторане за 200 рублей.' },
    { id: 4, date: '2023-09-28', amount: 150, description: 'Покупка одежды', details: 'Оплата одежды на сумму 150 рублей в магазине "Одежда".' },
    { id: 5, date: '2023-09-29', amount: 300, description: 'Магазин электроники', details: 'Оплата покупки в магазине электроники за 300 рублей.' },
  ];

  const [selectedTransaction, setSelectedTransaction] = useState(null); // Хранение выбранной транзакции

  // Функция для обработки клика по транзакции
  const handleTransactionClick = (transaction) => {
    setSelectedTransaction(transaction);
  };

  return (
    <Box className="transaction-journal">
      <Grid container spacing={2}>
        {/* Список транзакций */}
        <Grid className="transaction-frame" item xs={6}>
          <Box className="transaction-list">
            <Typography variant="h5" gutterBottom>Энергопоток</Typography>
            <List>
              {transactions.map((transaction) => (
                <ListItem 
                  button 
                  key={transaction.id} 
                  onClick={() => handleTransactionClick(transaction)} 
                  className="transaction-item"
                >
                  <ListItemText 
                    primary={`Дата: ${transaction.date}`} 
                    secondary={`Мана: ${transaction.amount} Опыт: ${transaction.amount} `}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>

        {/* Панель с информацией о выбранной транзакции */}
          <Box className="transaction-info">
            {selectedTransaction ? (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Информация о транзакции
                </Typography>
                <Divider />
                <Typography variant="body1"><strong>Дата:</strong> {selectedTransaction.date}</Typography>
                <Typography variant="body1"><strong>Описание:</strong> {selectedTransaction.description}</Typography>
                <Typography variant="body1"><strong>Детали:</strong> {selectedTransaction.details}</Typography>
                <Typography variant="body1"><strong>Mana:</strong> {selectedTransaction.amount}</Typography>
                <Typography variant="body1"><strong>Опыт:</strong> {selectedTransaction.amount}</Typography>
              </Box>
            ) : (
              <Typography variant="body2" color="textSecondary">Выберите транзакцию для просмотра информации</Typography>
            )}
          </Box>
      </Grid>
    </Box>
  );
}

export default TransactionJournal;
