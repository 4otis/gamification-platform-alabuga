import React, { useState } from 'react';
import { Box, Grid, Card, CardContent, CardMedia, Typography, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import './ArtifactList.css';
import Artifact1 from "./1.png";
import Artifact2 from "./2.png";
import Artifact3 from "./3.png";
import Artifact4 from "./4.png";
import Artifact5 from "./5.png";
import Artifact6 from "./6.png";

function ArtifactList() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const items = [
    { name: 'Папка 1', rarity: 'Обычная', description: 'Описание папки 1', imageUrl:  Artifact1},
    { name: 'Папка 2', rarity: 'Редкая', description: 'Описание папки 2', imageUrl: Artifact2 },
    { name: 'Папка 3', rarity: 'Эпическая', description: 'Описание папки 3', imageUrl: Artifact3},
    { name: 'Папка 4', rarity: 'Легендарная', description: 'Описание папки 4', imageUrl: Artifact4 },
    { name: 'Папка 5', rarity: 'Редкая', description: 'Описание папки 5', imageUrl: Artifact5 },
    { name: 'Папка 6', rarity: 'Обычная', description: 'Описание папки 6', imageUrl: Artifact6 },
  ];

  const handleClickOpen = (item) => {
    setSelectedItem(item);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setSelectedItem(null);
  };

  // Функция для получения цвета фона в зависимости от редкости
  const getBackgroundColor = (rarity) => {
    switch (rarity) {
      case 'Обычная':
        return '#d4d4d4ff'; 
      case 'Редкая':
        return '#6ac4d6b6';
      case 'Эпическая':
        return '#3b8fd4b6'; 
      case 'Легендарная':
        return '#fabc21aa';
      default:
        return '#ffffff';
    }
  };

  return (
    <Box className="item-list-container">
      <Box className="scrollable-list">
        {/* Прокручиваемый список с двумя элементами в ряду */}
        <Grid container spacing={2} justifyContent="center">
          {items.map((item, index) => (
            <Card
              onClick={() => handleClickOpen(item)}
              className="item-card"
              style={{ backgroundColor: getBackgroundColor(item.rarity) }} // Изменение фона в зависимости от редкости
            >
              <img
                alt={item.name}
                src={item.imageUrl}
                className="item-image"
              />
              <CardContent>
                <Typography className='artifactName' variant="h6" gutterBottom>
                  {item.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Редкость: {item.rarity} {/* Выводим редкость */}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Box>

      {/* Диалоговое окно с описанием */}
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>{selectedItem?.name}</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            {selectedItem?.description}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ArtifactList;
