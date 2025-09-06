<?xml version="1.0" encoding="UTF-8"?>
<readme>
  <title>Prathamesh Gongle — Portfolio Website</title>

  <summary>
    This repository contains the source code for my personal portfolio website, built with Next.js, React, and Framer Motion. It showcases my projects, skills, and includes a contact form with a live backend.
  </summary>

  <liveDemo><![CDATA[Add your Vercel link here after deployment]]></liveDemo>

  <features>
    <feature>Dark/Light Theme Toggle (custom switch with icons)</feature>
    <feature>Modern UI/UX with smooth animations using Framer Motion</feature>
    <feature>Responsive Design (optimized for desktop &amp; mobile)</feature>
    <feature>Projects Section with hover effects &amp; external links (GitHub, Behance, etc.)</feature>
    <feature>About Section with intro &amp; background</feature>
    <feature>Contact Form with backend (Next.js API + Resend)</feature>
    <feature>Deployed on Vercel for fast, serverless hosting</feature>
  </features>

  <techStack>
    <frontend>
      <item>Next.js</item>
      <item>React</item>
      <item>Framer Motion</item>
    </frontend>
    <styling>
      <item>CSS Modules</item>
      <item>Custom theming</item>
    </styling>
    <backend>
      <item>Next.js API Routes</item>
    </backend>
    <emailService>
      <item>Resend</item>
    </emailService>
    <deployment>
      <item>Vercel</item>
    </deployment>
  </techStack>

  <preview>
    <note>Add a screenshot or GIF of your site here once deployed.</note>
  </preview>

  <gettingStarted>
    <step index="1" title="Clone the repo">
      <code><![CDATA[
git clone https://github.com/prathameshgongle/prathamesh-gongle-portfolio.git
cd prathamesh-gongle-portfolio
      ]]></code>
    </step>
    <step index="2" title="Install dependencies">
      <code><![CDATA[
npm install
# or
yarn install
      ]]></code>
    </step>
    <step index="3" title="Add environment variables">
      <instruction>Create a .env.local file in the project root with your Resend API key:</instruction>
      <code><![CDATA[
RESEND_API_KEY=your_resend_api_key_here
      ]]></code>
    </step>
    <step index="4" title="Run locally">
      <code><![CDATA[
npm run dev
# or
yarn dev
      ]]></code>
      <open><![CDATA[http://localhost:3000]]></open>
    </step>
  </gettingStarted>

  <contact>
    <intro>Want to collaborate or have an opportunity? Reach me at:</intro>
    <links>
      <link type="LinkedIn"><![CDATA[https://linkedin.com/in/prathameshgongle]]></link>
      <link type="GitHub"><![CDATA[https://github.com/prathameshgongle]]></link>
      <link type="Email"><![CDATA[your.email@example.com]]></link>
    </links>
  </contact>

  <extras>
    <starPrompt>If you like this project, don’t forget to star the repo!</starPrompt>
  </extras>
</readme>
