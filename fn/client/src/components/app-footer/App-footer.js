import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTelegramPlane,
  faInstagram,
  faFacebook,
} from '@fortawesome/free-brands-svg-icons';
import './App-footer.css';
import { Row, Card, CardDeck } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { socialNerworksURL, contactInformationFooter, policiesFooter } from '../../configs/frontend-config'

const AppFooter = () => (
  <footer className="footer">
    <div className="footer-inner">
      <CardDeck>
        <Card.Body>
          <Card.Title>Catalogs</Card.Title>
          <Row><Link to="/catalogs/men">Men</Link></Row>
          <Row><Link to="/catalogs/women">Women</Link></Row>
          <Row><Link to="/catalogs/kids">Kids</Link></Row>
        </Card.Body>
        <Card.Body>
          <Card.Title>{policiesFooter.title}</Card.Title>
          <Row><Card.Link>{policiesFooter.aboutUs}</Card.Link></Row>
          <Row><Card.Link>{policiesFooter.termsAndConditions}</Card.Link></Row>
          <Row><Card.Link>{policiesFooter.privacyAndPolicy}</Card.Link></Row>
        </Card.Body>
        <Card.Body>
          <Card.Title>{contactInformationFooter.title}</Card.Title>
          <Row><Card.Link>{contactInformationFooter.email}</Card.Link></Row>
          <Row><Card.Link>{contactInformationFooter.phoneNumber}</Card.Link></Row>
        </Card.Body>
        <Card.Body>
          <Row className="d-flex flex-column align-items-center">
            <Card.Title>Links</Card.Title>
            <Card.Title>
              <Card.Link href={socialNerworksURL.telegram} target='_blank'>
                <FontAwesomeIcon className="icon" icon={faTelegramPlane} />
              </Card.Link>
              <Card.Link href={socialNerworksURL.instagram} target='_blank'>
                <FontAwesomeIcon className="icon" icon={faInstagram} />
              </Card.Link>
              <Card.Link href={socialNerworksURL.facebook} target='_blank'>
                <FontAwesomeIcon className="icon" icon={faFacebook} />
              </Card.Link>
            </Card.Title>
          </Row>
        </Card.Body>
      </CardDeck>
    </div>
  </footer>
);

export default AppFooter;
