import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../../styles/Login.module.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  const handleClick = async () => {
    try {
      if (!username || !password) {
        setError(true);
        return;
      }
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
        username,
        password,
      });
      if (res) {
        setError(false);
        router.push('/admin');
      }
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>Admin Dashboard</h1>
        <input
          type='text'
          placeholder='Username'
          className={styles.input}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type='password'
          placeholder='Password'
          className={styles.input}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className={styles.error}>Invalid credentials</p>}
        <button onClick={handleClick} className={styles.button}>
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Login;
