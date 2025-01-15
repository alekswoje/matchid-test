// src/LoginButtons.js

import React from 'react';
import { useUserInfo } from '@matchain/mid';

const LoginButtons = ({ openEmailModal }) => {
  const {
    loginByTelegram,
    loginByTwitter,
    loginByGoogle,
    loginByWallet,
    openEmailModal: openEmail,
  } = useUserInfo();

  return (
    <div style={styles.buttonContainer}>
      <h2>Login Methods</h2>
      <button style={styles.button} onClick={loginByTelegram}>
        Login with Telegram
      </button>
      <button style={styles.button} onClick={loginByTwitter}>
        Login with Twitter
      </button>
      <button style={styles.button} onClick={loginByGoogle}>
        Login with Google
      </button>
      <button style={styles.button} onClick={loginByWallet}>
        Login with Wallet
      </button>
      <button style={styles.button} onClick={openEmailModal}>
        Login with Email
      </button>
    </div>
  );
};

const styles = {
  buttonContainer: {
    marginTop: '20px',
  },
  button: {
    display: 'block',
    margin: '10px auto',
    padding: '10px 30px',
    fontSize: '16px',
    backgroundColor: '#1890ff',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    width: '200px',
  },
};

export default LoginButtons;
