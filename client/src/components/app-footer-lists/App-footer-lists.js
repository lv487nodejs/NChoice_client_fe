import React from 'react';
import './App-footer-lists.css';
import '../app-footer/App-footer.css';

import {
    contactInformationFooter,
    policiesFooter,
    catalogsFooter,
    CATALOGS_URL
} from '../../configs/frontend-config';
import { Link } from 'react-router-dom';

const catalogs = catalogsFooter.items.map((item) => (
    <div key={item.item}><Link to={CATALOGS_URL + item.url}>{item.item}</Link></div>
))

const policies = policiesFooter.items.map((item) =>
    (<div key={item.item}><Link to={item.url}>{item.item}</Link></div>
    ))

const contacts = contactInformationFooter.items.map((item, index) =>
    (<div key={index}>{item}</div>
    ))

const AppFooterLists = () => (
    <div className='footer-card-deck footer-card-list'>
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
    </div>
);

export default AppFooterLists;
