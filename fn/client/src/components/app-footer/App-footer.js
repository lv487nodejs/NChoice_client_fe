import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTelegramPlane,
  faInstagram,
  faFacebook,
} from '@fortawesome/free-brands-svg-icons';
import './App-footer.css';
import { Row, Card } from 'react-bootstrap';
import { socialNerworksURL } from '../../configs/frontend-config'

const AppFooter = () => (
  <footer className="footer">
    <Card className="footer-inner">
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
      <Card.Header>© 2020 Fashion Note</Card.Header>
    </Card>
  </footer>
);

export default AppFooter;
