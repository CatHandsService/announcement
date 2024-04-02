'use client'
import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './styles.module.scss'

const LoginForm = () => {
  const [userID, setUserID] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const formData = {
        id: userID,
        password: password
      };

      const response = await fetch('api/Login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if(response.ok) {
        const data = await response.json();
        console.log('API レスポンス:', data);
        if(data.authenticated) {
          router.push('/DashBoard');
        }
      }
    } catch (error) {
      console.error('ログイン情報の送信に失敗しました:', error);
    }
  };

  return (
    <form
      className={styles.loginFormContainer}
      onSubmit={handleLogin}
    >
      <input
        type="text"
        placeholder="ユーザーID"
        name='id'
        value={userID}
        onChange={(e) => setUserID(e.target.value)}
      />
      <input
        type="password"
        placeholder="パスワード"
        name='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">ログイン</button>
    </form>
  );
};

export default LoginForm;
