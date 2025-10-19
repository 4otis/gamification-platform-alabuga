import React from 'react';
import './MainPage.css';
import { Link } from 'react-router-dom';  // Импортируем Link для создания ссылки
import {Header, Footer} from "../../shared/components/publicComponents";
import FeedBack from "./Feedback/Feeback.jsx";
import MainBody from "./profile+mission+leaderboard/ProfileMissionLeaderbord.jsx";
import InfoBody from "./Info/Info.jsx";

function MainPage() {
  return (
    <div className="App">
      <Header />
      <MainBody />
      <InfoBody />
      <FeedBack />
      <Footer />
    </div>
  );
}

export default MainPage;