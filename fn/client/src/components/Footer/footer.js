import React from 'react';
import './footer.css';
// import { Footer } from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
// import M from 'materialize-css';

function Footer(props) {
  return (
    <footer class="page-footer">
      <div class="container">
        <div class="row">
          <div class="col l6 s12">
            <h5 class="white-text">Footer Content</h5>
          </div>
          <div class="col l4 offset-l2 s12">
            <h5 class="white-text">Links</h5>
            <ul>
              <li>
                <a class="grey-text text-lighten-3" href="#!">
                  https://www.facebook.com/
                </a>
              </li>
              <li>
                <a class="grey-text text-lighten-3" href="#!">
                  https://web.telegram.org
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer-copyright">
        <div class="container">© 2020 Fashion Note</div>
      </div>
    </footer>
  );
}

export default Footer;
