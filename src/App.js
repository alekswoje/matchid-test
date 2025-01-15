// src/App.js

import React, { useState } from 'react';
import { MatchProvider, useMatchEvents } from '@matchain/mid';
import UserInfo from './UserInfo';
import LoginButtons from './LoginButtons';
import EmailLoginModal from './EmailLoginModal';

const App = () => {
  // State to control the visibility of the email login modal
  const [isEmailModalOpen, setEmailModalOpen] = useState(false);

  // Handle MatchID events
  useMatchEvents({
    onLogin: (data) => {
      console.log('User logged in:', data);
      alert(`Logged in! MID: ${data.mid}, Token: ${data.token}`);
    },
    onLogout: () => {
      console.log('User logged out');
      alert('Logged out successfully!');
    },
  });

  return (
    <MatchProvider
      appid={process.env.APP_ID}
      env="test"
      theme="dark"
    >
      <div style={styles.container}>
        <h1>MatchID SDK Comprehensive Test</h1>
        <LoginButtons openEmailModal={() => setEmailModalOpen(true)} />
        <UserInfo />
        <EmailLoginModal
          isOpen={isEmailModalOpen}
          onClose={() => setEmailModalOpen(false)}
        />
      </div>
    </MatchProvider>
  );
};

// Simple styling for better presentation
const styles = {
  container: {
    textAlign: 'center',
    padding: '50px',
    fontFamily: 'Arial, sans-serif',
  },
};

export default App;
