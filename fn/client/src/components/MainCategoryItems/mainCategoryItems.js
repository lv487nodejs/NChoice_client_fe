import React, {useState, useEffect} from "react";
import {Link,  Switch, Route,} from 'react-router-dom';
import CategoriesContainer from "../../containers/categoriesContainer";
import Wishlist from "../Wishlist/wishlist";

export const MainCategoryItems = (props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(
      `https://my-json-server.typicode.com/chak-kit/demo-api/catalogs?catalogName=${props.catalogName}`,
      {
        method: "GET"
      }
    )
      .then(res => res.json())
      .then(response => {
        setProducts(response);
      })
      .catch(error => console.log(error));
  }, [props.catalogName]);

  return (

    <div>
      {products.map((c, index) => (
        <Link key={index}
          to={{pathname: `/https://my-json-server.typicode.com/chak-kit/demo-api/catalogs?catalogName=${props.catalogName}
          ${index}`}} >

            <h3 >
              {c.category}
            </h3>

        </Link>
      ))}


    <Switch>
    <Route
      path="/img/:id"
      component={CategoriesContainer }
        />
      </Switch>
    </div>

  );
};



export default MainCategoryItems;