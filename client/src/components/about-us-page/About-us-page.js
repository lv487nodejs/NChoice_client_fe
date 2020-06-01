import React, { useEffect } from 'react';

import StaticAboutUsPageContent from './Static-about-us-content';
import './About-us-page.css';

const AboutUsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <StaticAboutUsPageContent />;
};

export default AboutUsPage;
