// src/EmailLoginModal.js

import React, { useState } from 'react';
import { useUserInfo } from '@matchain/mid';

const EmailLoginModal = ({ isOpen, onClose }) => {
  const { getLoginEmailCode, loginByEmail } = useUserInfo();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState(1); // Step 1: Enter Email, Step 2: Enter Code
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleSendCode = async () => {
    setLoading(true);
    setError(null);
    try {
      const sentCode = await getLoginEmailCode(email);
      console.log('Verification code sent:', sentCode);
      alert('Verification code sent to your email.');
      setStep(2);
    } catch (err) {
      console.error('Error sending code:', err);
      setError('Failed to send verification code.');
    }
    setLoading(false);
  };

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const success = await loginByEmail({ email, code });
      if (success) {
        alert('Logged in successfully with Email!');
        onClose();
      } else {
        setError('Invalid verification code.');
      }
    } catch (err) {
      console.error('Error logging in:', err);
      setError('Failed to log in.');
    }
    setLoading(false);
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Email Login</h2>
        {step === 1 && (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
            {error && <p style={styles.error}>{error}</p>}
            <button
              style={styles.button}
              onClick={handleSendCode}
              disabled={loading || !email}
            >
              {loading ? 'Sending...' : 'Send Verification Code'}
            </button>
          </>
        )}
        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="Enter verification code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              style={styles.input}
            />
            {error && <p style={styles.error}>{error}</p>}
            <button
              style={styles.button}
              onClick={handleLogin}
              disabled={loading || !code}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </>
        )}
        <button style={styles.closeButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '8px',
    width: '300px',
    textAlign: 'center',
    position: 'relative',
  },
  input: {
    width: '90%',
    padding: '10px',
    margin: '10px 0',
    fontSize: '16px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#52c41a',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    width: '100%',
    marginTop: '10px',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: '#ff4d4f',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
  },
};

export default EmailLoginModal;


