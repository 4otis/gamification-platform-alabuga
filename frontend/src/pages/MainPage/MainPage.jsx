import React , { useState, useEffect } from 'react';
import './MainPage.css';
import { Link } from 'react-router-dom';  // Импортируем Link для создания ссылки
import {Header, Footer} from "../../shared/components/publicComponents";
import PixelBackground from '../../shared/components/pixelBackground/pixelBackground';
import { mainPageApi } from '../../shared/api/endpoints/mainpage-api';

import FeedBack from "./Feedback/Feedback.jsx";
import MainBody from "./profile+mission+leaderboard/ProfileMissionLeaderbord.jsx";
import InfoBody from "./Info/Info.jsx";

function MainPage() {
  const [mainPageData, setMainPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMainPageData = async () => {
      try {
        setLoading(true);
        setError(null);

        const studentId = 1; /* подлежит к уничтожению */
        const data = await mainPageApi.getMainPage(studentId);
        setMainPageData(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMainPageData();
  }, []);
  
  if (loading) {
    return (
      <div className="App">
        <Header />
          <h2 className="loading">Загрузка профиля...</h2>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="App">
        <Header />
        <div className='error'>
          <h2>Ошибка</h2>
          <p>Не удалось подключиться к серверу</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!mainPageData) {
    return (
      <div className="App">
        <Header />
          <div className="error">Данные не найдены</div>
        <Footer />
      </div>
    );
  }


  return (
    <div className="App">
      <PixelBackground
        pixelSize={6}
        color={['#ceecffff']}
        speed={600}
        intensity={0.001} 
      />
      <div className='main-content-wrapper'>
        <Header/>
        <MainBody  
          profile={mainPageData.profile}
          missions={mainPageData.missions}
          leaderlist={mainPageData.leaderboard}
          currentPosition={mainPageData.cur_position}
        />
        <InfoBody />
        <FeedBack />
        <Footer />
      </div>
      
    </div>
  );
}

export default MainPage;