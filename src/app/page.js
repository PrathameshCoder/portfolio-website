'use client'

import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from "react";
import { useState } from "react";
import ThemeToggle from "../components/ThemeToggle";


export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 2.2]);
  const opacityOld = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const opacityNew = useTransform(scrollYProgress, [0.3, 1], [0, 1]);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <motion.main
        className={styles.main}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        ref={heroRef}
      >
        {/* Image transition wrapper */}
        <div className={styles.logoWrapper}>
          <motion.div style={{ scale, opacity: opacityOld, position: 'absolute' }}>
            <Image
              className={styles.logo}
              src="/me.jpg"
              alt="My photo"
              width={180}
              height={180}
              priority
            />
          </motion.div>

          <motion.div style={{ scale, opacity: opacityNew, position: 'absolute' }}>
            <Image
              className={styles.logo}
              src="/me-alt.jpg"
              alt="Alternate photo"
              width={180}
              height={180}
              priority
            />
          </motion.div>
        </div>

        <h1 className={styles.title}>Hi, I'm Prathamesh Gongle! 👋🏻</h1>
        <div className={styles.underline}>
          <h3>Master's Student at FAU Erlangen-Nürnberg</h3>
        </div>
        <a className={styles.heroButton} href="#projects">View My Work</a>
      </motion.main>

      {/* About Section */}
      <motion.section
        className={styles.aboutSection}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      > 
      <a id="about" className={styles.anchor}></a>
      <h2 className={styles.sectionTitle}>About Me</h2>  
        <div className={styles.aboutContent}>
          
          
          <Image src="/me-new.png" alt="About Image" width={350} height={0} style={{ width: "350px", height: "auto", objectFit: "contain" }}/>
          <p className={styles.aboutText}>
            I’m Prathamesh Gongle, a Master’s student in Business Informatics at FAU Erlangen-Nürnberg with a strong passion for building impactful digital solutions. With a solid foundation in software development, design, and cloud technologies, I enjoy creating applications that blend technical excellence with user-focused design. Beyond academics, I actively explore creative projects, from developing portfolio websites to experimenting with design and automation. My goal is to grow as a versatile developer who bridges technology, business, and creativity to deliver meaningful solutions.
          </p>
        </div>
      </motion.section>

    {/* Projects Section */}
<motion.section
  className={styles.projectsSection}
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
>
  <a id="projects" className={styles.anchor}></a>
  <h2 className={styles.sectionTitle}>Projects</h2>

  <div className={styles.cardGrid}>
    {/* Software Dev */}
    <a href="https://github.com/PrathameshCoder" target="_blank" rel="noopener noreferrer" className={styles.projectCard}>
      <div className={styles.imageWrapper}>
        <img src="./dev.png" alt="Software Development" />
      </div>
      <h3>Code & Build</h3>
      <p>Crafting scalable, efficient, and modern applications.</p>
    </a>

    {/* Design */}
    <a href="https://www.behance.net/prathamgongle" target="_blank" rel="noopener noreferrer" className={styles.projectCard}>
      <div className={styles.imageWrapper}>
        <img src="./design.png" alt="Design" />
      </div>
      <h3>Design & Create</h3>
      <p>Turning ideas into clean, user-friendly experiences.</p>
    </a>

    {/* Hobby */}
    <a href="https://beacons.ai/rhythmicchaos" target="_blank" rel="noopener noreferrer" className={styles.projectCard}>
      <div className={styles.imageWrapper}>
        <img src="./hobby.png" alt="Hobby" />
      </div>
      <h3>Beyond Work</h3>
      <p>Exploring music, fitness, and creativity outside the code.</p>
    </a>
  </div>
</motion.section>


    {/* Contact Section */}
    <motion.section
      className={styles.contactSection}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
     <a id="contact" className={styles.anchor}></a>
      <h2 className={styles.sectionTitle}>Contact Me</h2>
      <p>Have an idea or opportunity? I’d love to hear from you.</p>
<form
  className={styles.contactForm}
  onSubmit={async (e) => {
    e.preventDefault();
    const formEl = e.currentTarget;
    const form = new FormData(formEl);

    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      message: form.get("message"),
      website: form.get("website"),
    };

    try {
      setStatus("loading");
      setMessage("");

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Failed");

      setStatus("success");
      setMessage("✅ Thanks! Your message has been sent.");
      formEl.reset();
    } catch (err) {
      setStatus("error");
      setMessage(`❌ Oops: ${err.message}`);
    }
  }}
>
  {/* Honeypot field - hidden from users */}
  <input
  type="text"
  name="website"
  tabIndex="-1"
  autoComplete="off"
  className={styles.honeypot}
/>  

  <div className={styles.inputRow}>
    <input type="text" name="name" placeholder="Name" className={styles.input} required />
    <input type="email" name="email" placeholder="Email" className={styles.input} required />
  </div>

  <textarea name="message" placeholder="I'm Listening..." className={styles.textarea} rows="5" required />

  <button type="submit" className={styles.sendButton} disabled={status === "loading"}>
    {status === "loading" ? "Sending..." : "Send"}
  </button>

  {message && (
    <p className={`${styles.formMessage} ${status === "success" ? styles.success : styles.error}`}>
      {message}
    </p>
  )}
</form>


    </motion.section>

    {/* Floating Theme Toggle */}
<div className={styles.floatingToggle}>
  <ThemeToggle />
</div>
    </div>
 
  );
}
