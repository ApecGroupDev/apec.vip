import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css'; // Create a separate CSS module for styles
import ThemeToggle from "./ThemeToggle"; // Import the ThemeToggle component

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
        </Link>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li>
              <Link href="/" className={styles.navItem}>Home</Link>
            </li>
            <li>
              <Link href="/about" className={styles.navItem}>About</Link>
            </li>
            <li>
              <Link href="/services" className={styles.navItem}>Services</Link>
            </li>
            <li>
              <Link href="/contact" className={styles.navItem}>Contact</Link>
            </li>
          </ul>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
