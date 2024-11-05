'use client';

import { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    setIsDark(savedTheme === 'dark');
  }, []);

  return (
    <button onClick={toggleTheme}>
      Switch to {isDark ? 'Light' : 'Dark'} Mode
    </button>
  );
};

export default ThemeToggle;
