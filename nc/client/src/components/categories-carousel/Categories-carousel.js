import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import { connect } from "react-redux";
import "./Categories-carousel.css";
import withStoreService from "../hoc";
import { filterAddBrand, filterRemoveAllBrands} from "../../actions";
import { PRODUCT_LIST_URL } from "../../configs/frontend-config";

const captionStyle = { textTransform: 'capitalize' };

const CategoriesCarousel = ({ storeService, catalog, filterAddBrand, filterRemoveAllBrands}) => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    storeService
      .getAllBrands()
      .then((response) => setBrands(response))
  }, [storeService]);

  const filterAddBrandHandler = (item) => () => {
    filterRemoveAllBrands();
    filterAddBrand(item);
  };

  const items = brands.map((item) => (
    <Carousel.Item key={item.brand} className="carousel">
      <Link
        to={PRODUCT_LIST_URL + catalog}
        onClick={filterAddBrandHandler(item.brand)}
      >
        <img className="d-block w-100 img-carousel" alt={item.images[0][catalog]} src={`/images/brands/${item.images[0][catalog]}`}/>
      </Link>
      <Carousel.Caption> <h2 style={captionStyle}>{item.brand}</h2> </Carousel.Caption>
    </Carousel.Item>
  ));

  return (
    <div>
      <Carousel>
        {items}
      </Carousel>
    </div>
  );
};

const mapDispatchToProps = {filterAddBrand, filterRemoveAllBrands};

export default withStoreService()(connect(null, mapDispatchToProps)(CategoriesCarousel));
