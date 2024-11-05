import Image from "next/image";
import styles from "./page.module.css";
import ThemeToggle from "./ThemeToggle"; // Import the ThemeToggle component
import Header from "./Header"; // Import the Header component
import Footer from "./Footer";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header /> {/* Include the header */}
      <main className={styles.main}>
        <div className={styles.contentContainer}>
          <div className={styles.welcomeContainer}>
            <h1 className={styles.welcomeText}>Welcome Bob</h1> {/* Welcome message */}
            <h3 className={styles.subtitle}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere culpa et aperiam excepturi esse rem minus, quia totam inventore cumque.</h3>
            <h5 className={styles.description}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati, ex!</h5>
            <div className={styles.buttonContainer}>
              <button className={styles.primaryButton}>Button 1</button>
              <button className={styles.secondaryButton}>Button 2</button>
            </div>
          </div>
          <div className={styles.logoContainer}>
            <Image
              src="/images/One-stop-Shop-Logo.jpg"
              alt="One Stop Shop logo"
              width={500}
              height={500}
              priority
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
