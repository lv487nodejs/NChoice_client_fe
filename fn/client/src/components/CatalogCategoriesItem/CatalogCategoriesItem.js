import React, {useState, useEffect} from "react";

import './CatalogCategoriesItem.css'

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
    <ul className='categories'>
      {products.map((c) => (
            <li key={c.id}>
              {c.category}
            </li>
      ))}
    </ul>
  );
};


export default CatalogCategoriesItem;