import React, {useState, useEffect} from "react";
import {productsFetchData} from '../../actions/index'
import { connect } from 'react-redux';

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
      {products.map((c) => (
        <div key={c.id}>
          <div>
            <h3>
              {c.category}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    fetchProducts: state.items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    items: (url) => dispatch(productsFetchData(url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainCategoryItems);


