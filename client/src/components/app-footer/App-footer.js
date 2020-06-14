import React from 'react';
import './App-footer.css';
import {
  contactInformationFooter,
  policiesFooter,
  catalogsFooter,
  CATALOGS_URL,
  socialNetworkLinks
} from '../../configs/frontend-config';
import {
  faTelegramPlane,
  faInstagram,
  faFacebook,
} from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LINKS_TITLE = 'Links';

const catalogs = catalogsFooter.items.map((item) => (
  <div key={item.item}><Link to={CATALOGS_URL + item.url}>{item.item}</Link></div>
))

const policies = policiesFooter.items.map((item) =>
  (<div key={item.item}><Link to={item.url}>{item.item}</Link></div>
  ))

const contacts = contactInformationFooter.items.map((item, index) =>
  (<div key={index}>{item}</div>
  ))

const Links = () => {
  return (
    <>
      <Link className='footer-icon' href={socialNetworkLinks.telegram} target='_blank'>
        <FontAwesomeIcon className="icon" icon={faTelegramPlane} />
      </Link>
      <Link className='footer-icon' href={socialNetworkLinks.instagram} target='_blank'>
        <FontAwesomeIcon className="icon" icon={faInstagram} />
      </Link>
      <Link className='footer-icon' href={socialNetworkLinks.facebook} target='_blank'>
        <FontAwesomeIcon className="icon" icon={faFacebook} />
      </Link>
    </>
  );
}

const AppFooter = () => (
  <footer className="footer">
    <div className="footer-inner">
      <div className='footer-card-deck' id="footer-card">
        <div className='footer-card-body' >
          <div className='footer-card-title'>{catalogsFooter.title}</div>
          {catalogs}
        </div>
        <div className='footer-card-body'>
          <div className='footer-card-title'>{policiesFooter.title}</div>
          {policies}
        </div>
        <div className='footer-card-body'>
          <div className='footer-card-title'>{contactInformationFooter.title}</div>
          {contacts}
        </div>
        <div className='footer-card-body'>
          <div className='footer-icons-box'>
            <div className='footer-card-title'>{LINKS_TITLE}</div>
            <div>
              <Links />
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default AppFooter;
