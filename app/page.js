'use client';

import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from './page.module.css';
import InputFiled from './components/InputFiled';
import AllTodo from './components/AllTodo';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [refresh, setRefresh] = useState(0);
  return (
    <main className={`${styles.container} ${inter.className}`}>
      <div className={styles.card}>
        <h1 className={`${styles.title} ${inter.className}`}>Todo List</h1>
        <InputFiled setRefresh={setRefresh} refresh={refresh} />
        <AllTodo refresh={refresh} />
      </div>
    </main>
  );
}
