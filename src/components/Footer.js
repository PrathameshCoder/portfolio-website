'use client';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>Prathamesh <br></br>Gongle</div>

      <div className={styles.center}>
        <Link href="https://github.com/yourusername" target="_blank" aria-label="GitHub">
          <Image src="/git.svg" alt="GitHub" width={28} height={28} className={styles.icon} />
        </Link>
        <Link href="https://linkedin.com/in/yourusername" target="_blank" aria-label="LinkedIn">
          <Image src="/linkedin.svg" alt="LinkedIn" width={28} height={28} className={styles.icon} />
        </Link>
      </div>

      <div className={styles.right}>Proudly created by me ❤️</div>
    </footer>
  );
}
