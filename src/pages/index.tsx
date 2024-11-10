import styles from './index.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.heroSection}>
        <h1 className={styles.heroTitle}>Your Trusted Petroleum One-Stop Shop</h1>
        <p className={styles.heroSubtitle}>Quality products, expert solutions, and industry-leading services at your fingertips.</p>
        <button className={styles.heroButton}>Explore Services</button>
      </header>

      <section className={styles.aboutSection}>
        <h2 className={styles.sectionTitle}>About Us</h2>
        <p className={styles.sectionDescription}>
          We are committed to providing top-notch petroleum solutions, from fuel supply to equipment maintenance, with a focus on sustainability and customer satisfaction.
        </p>
      </section>

      <section className={styles.servicesSection}>
        <h2 className={styles.sectionTitle}>Our Services</h2>
        <div className={styles.servicesGrid}>
          <div className={styles.serviceCard}>
            <h3>Fuel Supply</h3>
            <p>Reliable fuel supply for commercial and industrial needs, including bulk delivery and storage solutions.</p>
          </div>
          <div className={styles.serviceCard}>
            <h3>Lubricants</h3>
            <p>A wide range of high-quality lubricants to ensure the longevity and performance of your equipment.</p>
          </div>
          <div className={styles.serviceCard}>
            <h3>Equipment Maintenance</h3>
            <p>Comprehensive maintenance services to keep your petroleum and storage equipment in peak condition.</p>
          </div>
        </div>
      </section>

      <section className={styles.solutionsSection}>
        <h2 className={styles.sectionTitle}>Innovative Solutions</h2>
        <div className={styles.solutionsGrid}>
          <div className={styles.solutionCard}>
            <h3>Energy Efficiency</h3>
            <p>Solutions designed to reduce operational costs and increase energy efficiency across industries.</p>
          </div>
          <div className={styles.solutionCard}>
            <h3>Environmental Safety</h3>
            <p>Adopting industry best practices to minimize environmental impact and promote sustainability.</p>
          </div>
          <div className={styles.solutionCard}>
            <h3>Advanced Technology</h3>
            <p>Leveraging technology for better monitoring, tracking, and optimization of fuel and lubricant usage.</p>
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <h2>Partner with Us for Reliable Petroleum Solutions</h2>
        <button className={styles.ctaButton}>Contact Us Today</button>
      </section>
    </div>
  );
}