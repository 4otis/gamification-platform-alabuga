import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { Avatar } from '../../../shared/components/hooks/Avatar';
import ProgressBar from '../../../shared/components/progressBar/ProfgressBar';

import "./AvatarCustomizer.css"

export default function AvatarCustomiser ({profile, items, types}) {
  const [activeCategory, setActiveCategory] = useState(1);
  const handleItemSelect = async (item) => {
    console.log("Всё ок")
  }

  const isItemUnlocked = (item) => {
    return profile.student.exp >= item.min_exp;
  };

  console.log("до return"+activeCategory)

  return (
    <div className="customisation-frame">
      {/* Левая панель - предпросмотр аватара */}
      <div className="avatar-preview">
        <Typography variant="h4">Ваш Аватар</Typography>
        <Avatar items={items} />
        
        {/* Дополнительная информация о студенте */}
        <div className="student-info">
            <ProgressBar initialProgress={profile.student.exp}/>
          <p>EXP: {profile.student.exp}</p>
        </div>
      </div>

      {/* Правая панель - кастомизация */}
      <div className="customization-panel">
        {/* Табы категорий */}
        <div className="category-tabs">
          {types.map(category => (
            <button
              key={category.id}
              className={`tab ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Сетка предметов текущей категории */}
        <div className="items-grid">
          {items.map(item => {
            console.log("---------------------------"+item.type_id+" "+ activeCategory)
            if (item.type_id==activeCategory){
              const unlocked = isItemUnlocked(item);
              console.log("!!!!!!!!!!!!!!!!мапаем"+activeCategory);
              return (
                <div
                  key={item.file_path}
                  className={`item-card ${unlocked ? 'unlocked' : 'locked'}`}
                  onClick={() => unlocked && handleItemSelect(item)}
                >
                  <img 
                    src={ "https://myasnavesna.com/home/catalog_products/item_114/image/guliver2.png"} 
                    alt={item.name}
                    className="item-image"
                  />
                  <div className="item-info">
                    <span className="item-name">{item.name}</span>
                    <span className="required-exp">EXP: {item.min_exp}</span>

                  </div>
                </div>
              );
            }
            
          })}
        </div>
      </div>
    </div>
  );
};