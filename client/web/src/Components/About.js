import React from 'react';

import Landon from '../Images/Landon.jpg';
import Clark from '../Images/Clark.jpg';

const About = () => {
  return (
    <div>
      <h1 className="visionHeader">Vision</h1>
      <p>TransUnited uplifts the transgender community and is an active safe space for all trans related surgeries.</p>
      <p>TransUnited provides an open, supportive environment for diverse community members and our allies.</p>
      <h1>Who we are</h1>
      <div className="bio">
        <h2 className="bioName">Landon Shimek</h2>
        <div className="bio-flex">
          <img className="bioImage" src={Landon} alt="Landon Shimek" />
          <p>Landon began playing piano and guitar at age eight. He sang with the Seattle Men’s Chorus for two years before moving to the Portland area and finding a new voice with the Portland Gay Men’s Chorus. Landon is now the founding member and Executive Director of the Northwest Queer Chorus. Landon is known for his easy going personality and his love for people and his Queer community. As a trans man, Landon’s vision is to use musical excellence as a platform for positive interactions between Queer and non-Queer identified communities. Landon recently had stage 1 Phalloplasty on January 10,2020 at OHSU in Portland Oregon with Doctor Jens Berli. Shortly after posting to several social media sites with some picture of his results, he kept getting kicked off and blocked. While this was frustrating to him, he met Clark Winters who is a web developer. We have decided to team up and build a new social media app for transgender people and our allies. One where we can share freely, without the fear of being blocked or banned for being our true authentic selves.</p>
        </div>
      </div>
      <div className="bio">
        <h2 className="bioName">Clark Winters</h2>
        <div className="bio-flex">
          <img className="bioImage" src={Clark} alt="Clark Winters with Four the Border Collie" />
          <p>Clark is a full stack web developer and proud transgender man. With Landon's help, he hopes to build TransUnited into a social media app for all manner of people who are both in the trans community and allied to it. He believes a space is needed for trans folks to openly express themselves without fear of judgement or ban hammers. Outside of work and his web dev projects, Clark enjoys spending time with his pets (two dogs and a cat), volunteering, reading, and watching movies and TV shows.</p>
        </div>
      </div>
    </div>
  );
}

export default About;