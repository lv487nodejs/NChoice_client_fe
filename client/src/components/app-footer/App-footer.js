import React from 'react';
import './App-footer.css';
import {
  contactInformationFooter,
  policiesFooter,
  catalogsFooter,
  CATALOGS_URL,
  socialNetworkLinks
} from '../../configs/frontend-config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTelegramPlane,
  faInstagram,
  faFacebook,
} from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
// import { socialNetworkLinks, contactInformationFooter, policiesFooter, catalogsFooter, CATALOGS_URL } from '../../configs/frontend-config'

const catalogs = catalogsFooter.items.map((item) => (
  <div key={item.item}><Link to={CATALOGS_URL + item.url}>{item.item}</Link></div>
))

const policies = policiesFooter.items.map((item) =>
  (<div key={item.item}><Link to={item.url}>{item.item}</Link></div>
  ))

const contacts = contactInformationFooter.items.map((item, index) =>
  (<div key={index}>{item}</div>
  ))

// const Links = () => {
//   return (
//     <>
//       <Link className='footer-icon' href={socialNetworksURL.telegram} target='_blank'>
//         <FontAwesomeIcon className="icon" icon={faTelegramPlane} />
//       </Link>
//       <Link className='footer-icon' href={socialNetworksURL.instagram} target='_blank'>
//         <FontAwesomeIcon className="icon" icon={faInstagram} />
//       </Link>
//       <Link className='footer-icon' href={socialNetworksURL.facebook} target='_blank'>
//         <FontAwesomeIcon className="icon" icon={faFacebook} />
//       </Link>
//     </>
//   );
// }

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
            <div className='footer-card-title'>{socialNetworkLinks.title}</div>
            <div>
              <Link className='footer-icon' href={socialNetworkLinks.telegram} target='_blank'>
                <FontAwesomeIcon className="icon" icon={faTelegramPlane} />
              </Link>
              <Link className='footer-icon' href={socialNetworkLinks.instagram} target='_blank'>
                <FontAwesomeIcon className="icon" icon={faInstagram} />
              </Link>
              <Link className='footer-icon' href={socialNetworkLinks.facebook} target='_blank'>
                <FontAwesomeIcon className="icon" icon={faFacebook} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default AppFooter;
