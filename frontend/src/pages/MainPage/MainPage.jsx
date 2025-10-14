import React from 'react';
import { Link } from 'react-router-dom';  // Импортируем Link для создания ссылки
import './MainPage.css';

function MainPage() {
  return (
    <div className="App">
      <Link to="/profile">Перейти на страницу профиля</Link> {/* Ссылка на страницу профиля */}
      <Link to="/cources">Перейти на страницу миссий</Link> {/* Ссылка на страницу профиля */}
    </div>
  );
}

export default MainPage;