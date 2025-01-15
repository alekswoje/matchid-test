// src/UserInfo.js

import React from 'react';
import { useUserInfo } from '@matchain/mid';

const UserInfo = () => {
  const { user, loading, error, logout } = useUserInfo();

  if (loading) return <p>Loading user information...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!user) return <p>No user is currently logged in.</p>;

  return (
    <div style={styles.userInfo}>
      <h2>User Information</h2>
      <p><strong>MID:</strong> {user.mid}</p>
      <p><strong>Token:</strong> {user.token}</p>
      <p><strong>Logged In:</strong> {user.isLogin ? 'Yes' : 'No'}</p>
      <button style={styles.logoutButton} onClick={logout}>
        Logout
      </button>
    </div>
  );
};

const styles = {
  userInfo: {
    marginTop: '30px',
    padding: '20px',
    border: '1px solid #ccc',
    display: 'inline-block',
    textAlign: 'left',
    borderRadius: '8px',
  },
  logoutButton: {
    marginTop: '10px',
    padding: '10px 20px',
    backgroundColor: '#ff4d4f',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default UserInfo;
