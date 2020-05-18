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
import { socialNetworksURL, contactInformationFooter, policiesFooter, catalogsFooter, CATALOGS_URL } from '../../configs/frontend-config'

const catalogs = catalogsFooter.items.map((item) => (
  <Row key={item.item}><Link to={CATALOGS_URL + item.url}>{item.item}</Link></Row>
))

const policies = policiesFooter.items.map((item) =>
  (<Row key={item.item}><Link to={item.url}>{item.item}</Link></Row>
  ))

const contacts = contactInformationFooter.items.map((item, index) =>
  (<Row key={index}><Card.Link>{item}</Card.Link></Row>
  ))

const AppFooter = () => (
  <footer className="footer">
    <div className="footer-inner">
      <CardDeck id="footer-card">
        <Card.Body >
          <Card.Title>{catalogsFooter.title}</Card.Title>
          {catalogs}
        </Card.Body>
        <Card.Body>
          <Card.Title>{policiesFooter.title}</Card.Title>
          {policies}
        </Card.Body>
        <Card.Body>
          <Card.Title>{contactInformationFooter.title}</Card.Title>
          {contacts}
        </Card.Body>
        <Card.Body>
          <Row className="d-flex flex-column align-items-center">
            <Card.Title>Links</Card.Title>
            <Card.Title>
              <Card.Link href={socialNetworksURL.telegram} target='_blank'>
                <FontAwesomeIcon className="icon" icon={faTelegramPlane} />
              </Card.Link>
              <Card.Link href={socialNetworksURL.instagram} target='_blank'>
                <FontAwesomeIcon className="icon" icon={faInstagram} />
              </Card.Link>
              <Card.Link href={socialNetworksURL.facebook} target='_blank'>
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
