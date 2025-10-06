import React from 'react';
import './ProfilePage.css';
import {Header, Footer} from "../publicComponents/publicComponents"

import UserProfile from './UserProfile/UserProfile'; 
import ArtifactList from './ArtifactList/ArtifactList'; 
import UserInfoPanel from './UserInfoPanel/UserInfoPanel';
import TransactionJournal from './TransactionJournal/TransactionJournal'

function ProfilePage() {
  return (
    <div className="App">
      <Header />
      <div className="main-content">
        <div className="prof-art-container">
          <UserProfile />
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
