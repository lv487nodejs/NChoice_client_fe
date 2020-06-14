import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  TermsConditionsContent,
  title,
  sidebarTitle
} from './Terms-conditions-content';
import { policiesFooter } from '../../configs/frontend-config';
import './Terms-conditions-page.css';

const termsConditionsUrl = '/terms-conditions';
const filteredPolicies = policiesFooter.items.filter(
  (item) => item.url !== termsConditionsUrl
);
const policies = filteredPolicies.map((item) => (
  <li key={item.item}>
    <Link className='item-link' to={item.url}>
      {item.item}
    </Link>
  </li>
));

const TermsConditionsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <h1 className='title'>{title}</h1>
      <aside className='sidebar'>
        <h3 className='sidebar-title'>{sidebarTitle}</h3>
        <ul className='sidebar-list'>{policies}</ul>
      </aside>
      <TermsConditionsContent />
    </div>
  );
};

export default TermsConditionsPage;
