import React , { useState, useEffect } from 'react';
import './ProfilePage.css';
import {Header, Footer} from "../../shared/components/publicComponents"

import { studentApi } from '../../shared/api/endpoints/student-api';

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
        const data = await studentApi.getProfile(studentId);
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
        <div className="loading">Загрузка профиля...</div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="App">
        <Header />
        <div className="error">Ошибка: {error}</div>
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
      <Header />
      <div className="main-content">
        <div className="prof-art-container">
          <UserProfile 
            profile={profileData.profile}
          />
          <ArtifactList />
        </div>
        <div className="stats-trans-container">
          <UserInfoPanel 
            artifacts={profileData.profile.artifacts}
          />
          <TransactionJournal />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProfilePage;
