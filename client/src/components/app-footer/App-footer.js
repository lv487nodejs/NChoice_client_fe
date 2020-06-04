import React from 'react';
import './App-footer.css';
import AppFooterLists from '../app-footer-lists';
import AppFooterLinks from '../app-footer-links';

const AppFooter = () => (
  <footer className='footer'>
    <div className='footer-inner'>
      <div className='footer-card-deck' id='footer-card'>
        <AppFooterLists />
        <AppFooterLinks />
      </div>
    </div>
  </footer>
);

export default AppFooter;
