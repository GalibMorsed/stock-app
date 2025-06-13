import React from "react";

export default function AboutMe() {
  return (
    <div className="about-wrapper">
      <section className="about-container">
        <div className="overlay">
          <img src="/profile.jpg" alt="profile" className="My-img" />
          <h1>
            Hi, I'm <span>Galib Morsed</span>
          </h1>
          <p className="typewriter">
            Software Developer | Full Stack Development | MERN Specialist
          </p>
        </div>
      </section>

      <section className="glass-card">
        <h2>About Me</h2>
        <p>
          I'm a passionate developer with a strong grip on the MERN stack.
          Currently pursuing my Bachelor's degree, I thrive on building cool
          projects, exploring new tech, and crafting clean UI/UX.
        </p>
      </section>

      <section className="skills-section">
        <h2>Skills</h2>
        <div className="skills-tags">
          <span>React</span>
          <span>Node.js</span>
          <span>MongoDB</span>
          <span>Express</span>
          <span>SCSS</span>
          <span>REST APIs</span>
          <span>JavaScript</span>
          <span>HTML5</span>
          <span>CSS</span>
          <span>ECMAScript</span>
          <span>NoSQL</span>
        </div>
      </section>

      <section className="social-links">
        <a
          href="https://github.com/GalibMorsed"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        <a
          href="https:www.linkedin.com/in/galib-morsed"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>
        <a href="mailto:morsedgalib982@gmail.com">Email</a>
        <a href="">X</a>
        <a href="https://www.instagram.com/galib_morsed/">Instagram</a>
      </section>
    </div>
  );
}
