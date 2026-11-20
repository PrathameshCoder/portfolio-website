'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { profile } from '@/data/content'
import { ease } from '@/lib/motion'
import { scrollToId } from '@/lib/smooth'
import { Reveal, SplitLetters } from './Split'

// Everything waits for the preloader (about 1.3 s) before it plays.
const AFTER_LOADER = 1.25

export default function Hero() {
  const reduce = useReducedMotion()
  const jump = (id) => (e) => {
    e.preventDefault()
    scrollToId(id)
  }

  return (
    <section id="top" className="hero" data-label="Index">
      <div className="hero-copy">
        <Reveal className="label" delay={AFTER_LOADER} animateNow>
          {profile.location}
        </Reveal>
        <h1 className="hero-name">
          <SplitLetters text={profile.name} delay={AFTER_LOADER + 0.05} animateNow />
        </h1>
        <Reveal as="p" className="hero-role" delay={AFTER_LOADER + 0.5} animateNow>
          {profile.intro}
        </Reveal>
        <Reveal as="p" className="hero-meta" delay={AFTER_LOADER + 0.6} animateNow>
          Master&apos;s student in Information Systems at FAU. {profile.availability}.
        </Reveal>
        <Reveal className="btn-row" delay={AFTER_LOADER + 0.75} animateNow>
          <a className="btn btn-primary" href="#siemens" onClick={jump('siemens')}>
            See my work
          </a>
          <a className="btn btn-ghost" href="#contact" onClick={jump('contact')}>
            Get in touch
          </a>
        </Reveal>
      </div>

      <motion.figure
        className="hero-portrait"
        initial={reduce ? false : { clipPath: 'inset(0% 0% 100% 0%)' }}
        animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
        transition={{ duration: 1.3, ease, delay: AFTER_LOADER - 0.1 }}
      >
        <motion.div
          className="hero-portrait-img"
          initial={reduce ? false : { scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease, delay: AFTER_LOADER - 0.1 }}
        >
          <Image
            src="/hero-image.png"
            alt="Prathamesh Gongle with arms crossed in front of a historic building"
            width={1122}
            height={1402}
            sizes="(max-width: 900px) 60vw, 360px"
            priority
          />
        </motion.div>
      </motion.figure>
    </section>
  )
}
