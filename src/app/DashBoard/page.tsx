'use client'
import React, { useState } from 'react';
import PostForm from '../../components/PostForm';
import SearchForm from '../../components/SearchForm';
import AnnouncementList from '../../components/AnnouncementList';
import styles from './dashBoard.module.scss'
import Link from 'next/link';

export default function Page() {
  const [mode, setMode] = useState('postForm')
  return (
    <div>
      <h1 className={styles.h1}>お知らせ管理画面</h1>
      <div className={styles.selectMenu}>
      <span
          className={styles.label}
          onClick={() => setMode('postForm')}
        >
          postForm
        </span>
        <span
          className={styles.label}
          onClick={() => setMode('announcementList')}
        >
          announcementList
        </span>
        <span className={styles.label}>
          <Link href={'http://localhost:5555/'}>searchForm</Link>
        </span>
      </div>
      {mode === 'postForm'
        ? <PostForm />
        : mode === 'announcementList' &&
          <AnnouncementList />
      }

    </div>
  );
};