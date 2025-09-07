import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>Prathamesh</div>

      {/* Social Icons */}
      <div className={styles.center}>
        <a
          href="https://github.com/PrathameshCoder"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/git.svg" alt="GitHub" className={styles.icon} />
        </a>
        <a
          href="https://linkedin.com/in/your-linkedin"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/linkedin.svg" alt="LinkedIn" className={styles.icon} />
        </a>

      </div>

      <div className={styles.right}>Proudly created by me ❤️</div>
    </footer>
  );
}
