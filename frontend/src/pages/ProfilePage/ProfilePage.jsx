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


  return (
    <div className="App">
      <Header />
      <div className="main-content">
        <div className="prof-art-container">
          <UserProfile 
          />
          <ArtifactList />
        </div>
        <div className="stats-trans-container">
          <UserInfoPanel />
          <TransactionJournal />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProfilePage;
