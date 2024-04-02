import React from 'react';
import { useState } from 'react';
import styles from './styles.module.scss'

export default function PostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('');
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const [publication, setPublication] = useState<string>();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const currentDate = new Date();
    const createdDate = currentDate.toISOString();

    try {
      const response = await fetch('/api/Announcement', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          creator: 'Your Name',
          createdDate,
          tag,
          title,
          content,
          publication
        })
      });

      if (response.ok) {
        console.log('お知らせの投稿に成功しました');
        setTitle('');
        setContent('');
        setTag('');
        setPublication('false');
        setIsConfirm(false);
      } else {
        console.error('お知らせの投稿に失敗しました');
      }
    } catch (error) {
      console.error('エラーが発生しました:', error);
    }
  };

  const handleConfirm = () => {
    if (title && content && publication) {
      setIsConfirm(true);
    }
  }

  return (
    <div>
      <h2 className={styles.h2}>新規投稿</h2>
      {!isConfirm ? (
        <form className={styles.postFormContainer}>
          <input
            className={styles.inputTag}
            type="text"
            placeholder="タグ"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
          <input
            className={styles.inputTitle}
            type="text"
            placeholder="タイトル"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            className={styles.inputDescription}
            placeholder="本文"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <select
            className={styles.selectBox}
            name='publication'
            value={publication}
            onChange={(e) => setPublication(e.target.value)}
          >
            <option value='' hidden>公開可否</option>
            <option value='true'>公開</option>
            <option value='false'>非公開</option>
          </select>
          <button className={styles.confirm} type="button" onClick={() => handleConfirm()}>
            確認
          </button>
        </form>
      ) : (
        <div className={styles.postFormContainer}>
          <h3>確認画面</h3>
          <p>タイトル: {title}</p>
          <p>本文: {content}</p>
          <p>タグ: {tag}</p>
          <p>公開可否: {publication === 'true' ? '公開' : '非公開'}</p>
          <div className={styles.buttonWrapper}>
            <button
              className={styles.submit}
              onClick={handleSubmit}
            >
              送信
            </button>
            <button
              className={styles.modify}
              onClick={() => setIsConfirm(false)}
            >
              修正
            </button>
          </div>

        </div>
      )}
    </div>
  );
};