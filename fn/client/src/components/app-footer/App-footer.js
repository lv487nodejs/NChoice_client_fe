import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTelegramPlane,
  faInstagram,
  faFacebook,
} from '@fortawesome/free-brands-svg-icons';
import './App-footer.css';
import { Row, Card } from 'react-bootstrap';

const AppFooter = () => (
  <footer className="footer">
    <div className="footer-inner">
        <Row className="d-flex flex-column align-items-center">
          <Card.Title>Links</Card.Title>
          <Card.Title>
            <Card.Link href="#">
              <FontAwesomeIcon className="icon" icon={faTelegramPlane} />
            </Card.Link>
            <Card.Link href="#">
              <FontAwesomeIcon className="icon" icon={faInstagram} />
            </Card.Link>
            <Card.Link href="#">
              <FontAwesomeIcon className="icon" icon={faFacebook} />
            </Card.Link>
          </Card.Title>
        </Row>
    </div>
  </footer>
);

export default AppFooter;
