import React , { useState, useEffect } from 'react';
import './ProfilePage.css';
import {Header, Footer} from "../../shared/components/publicComponents"
import { studentProfileApi } from '../../shared/api/endpoints/profile-api';

import PixelBackground from '../../shared/components/pixelBackground/pixelBackground';
import UserProfile from './UserProfile/UserProfile'; 
import ArtifactList from './ArtifactList/ArtifactList'; 
import UserInfoPanel from './UserInfoPanel/UserInfoPanel';
import TransactionJournal from './TransactionJournal/TransactionJournal'

function ProfilePage() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        setError(null);

        const studentId = 1; 
        const data = await studentProfileApi.getProfile(studentId);
        setProfileData(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
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

  if (!profileData) {
    return (
      <div className="App">
        <Header />
        <div className="error">Данные профиля не найдены</div>
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
        <Header />
        <div className="main-content">
          <div className="prof-art-container">
            <UserProfile 
              profile={profileData.profile}
            />
            <ArtifactList 
              artifacts={profileData.artifacts}
            />
          </div>
          <div className="stats-trans-container">
            <UserInfoPanel 
              profile={profileData.profile}
              skills={profileData.skills}
            />
            <TransactionJournal />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default ProfilePage;
