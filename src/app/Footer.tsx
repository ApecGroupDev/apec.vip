// Footer.tsx
import React from "react";
import styles from "./page.module.css"; // Adjust the path as necessary

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <a
        href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Test
      </a>
      <a
        href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Footer
      </a>
      <a
        href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Here
      </a>
    </footer>
  );
};

export default Footer;
