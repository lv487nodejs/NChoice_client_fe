import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

import './CatalogCategoriesItem.css'
import Categories from '../Categories'

export const CatalogCategoriesItem = (props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log(props)
    fetch(
      `https://stark-headland-06017.herokuapp.com/catalogs?catalog=${props.catalogName}`,
      {
        method: "GET"
      }
    )
      .then(res => res.json())
      .then(response => {
        setProducts(response[0].categories);
      })
      .catch(error => console.log(error));
  }, [props.catalogName]);

  return (
    <div className='categories'>
      <ul>
        {products.map((c) => (
            <li className='category-item'><Link to={c.category}>{c.category}</Link></li>
        ))}
      </ul>
      <Categories />
      <Categories />
    </div>
  );
};


export default CatalogCategoriesItem;