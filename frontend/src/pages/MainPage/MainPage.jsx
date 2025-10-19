import React from 'react';
import './MainPage.css';
import { Link } from 'react-router-dom';  // Импортируем Link для создания ссылки
import {Header, Footer} from "../../shared/components/publicComponents";
import PixelBackground from '../../shared/components/pixelBackground/pixelBackground';

import FeedBack from "./Feedback/Feeback.jsx";
import MainBody from "./profile+mission+leaderboard/ProfileMissionLeaderbord.jsx";
import InfoBody from "./Info/Info.jsx";

function MainPage() {
  return (
    <div className="App">
      <PixelBackground
        pixelSize={6}
        color={['#ceecffff']}
        speed={600}
        intensity={0.001} 
      />
      <div style={{zIndex:1}}>
        <Header />
        <MainBody />
        <InfoBody />
        <FeedBack />
        <Footer />
      </div>
      
    </div>
  );
}

export default MainPage;