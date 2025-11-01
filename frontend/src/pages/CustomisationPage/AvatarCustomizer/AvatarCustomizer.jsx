import { useState, useEffect } from 'react';
import { Typography, Button } from '@mui/material';
import Avatar from '../../../shared/components/hooks/Avatar';
import ProgressBar from '../../../shared/components/progressBar/ProfgressBar';
import {USER} from '../../../shared/globals';
import "./AvatarCustomizer.css"

export default function AvatarCustomiser ({profile, items, equipedItems, types, api}) {
  const [activeCategory, setActiveCategory] = useState(1);
  const [avatarKey, setAvatarKey] = useState(0);
  const handleItemSelect = async (item) => {
    const updateData = {
          "item_id": item.id,
          "type_id": item.type_id
        };
    console.log(updateData)
    try {
      const result = await api.patchCustomisation(USER.id, updateData)
      console.log('Кастомизация обновлена:', result);
      setAvatarKey(prev => prev + 1);
    } catch (error) {
      console.error('Ошибка обновления:', error);
    }
    
  }

  const isItemUnlocked = (item) => {
    return profile.student.exp >= item.min_exp;
  };

  return (
    <div className="customisation-frame">
      {/* Левая панель - предпросмотр аватара */}
      <div className="avatar-preview">
        <Typography variant="h4">Ваш Аватар</Typography>
        <Avatar
          key={avatarKey}
          width={270}
          height={270}
         />
        {/* Дополнительная информация о студенте */}
        <ProgressBar initialProgress={profile.student.exp}/>
        <Typography variant='h6'>EXP: {profile.student.exp}</Typography>
      </div>

      {/* Правая панель - кастомизация */}
      <div className="customization-panel">
        {/* Табы категорий */}
        <div className="category-tabs">
          {types.map(category => (
            <Button
              key={category.id}
              className={`tab ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Сетка предметов текущей категории */}
        <div className='customization-frame-items'>
          <div className="customization-items">
            {items.map(item => {
            
              if (item.type_id==activeCategory){
                const unlocked = isItemUnlocked(item);
                return (
                  <div
                    key={item.file_path}
                    className={`customization-item-card ${unlocked ? 'unlocked' : 'locked'}`}
                    onClick={() => unlocked && handleItemSelect(item)}
                  >
                    <img 
                      src={USER.backendURL+"/static"+item.file_path} 
                      alt={item.name}
                      className="customization-item-image"
                    />
                    <div className="customization-item-info">
                      <span className="customization-item-name">{item.name}</span>
                      <br/>
                      <span className="required-exp">EXP: {item.min_exp}</span>

                    </div>
                  </div>
                );
              }
              
            })}
            
          </div>
        </div>
        
      </div>
    </div>
  );
};