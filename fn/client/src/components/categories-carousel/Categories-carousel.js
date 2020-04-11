import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import "./Categories-carousel.css";
import withStoreService from "../hoc";
import connect from "react-redux/es/connect/connect";
import { filterAddBrand, filterRemoveAllBrands, setCatalogFilter} from "../../actions";
import { PRODUCT_LIST_URL } from "../../configs/frontend-config";
import { Link } from "react-router-dom";

const CategoriesCarousel = ({ cartAndStoreService:{storeService}, catalog, filterAddBrand, filterRemoveAllBrands, setCatalogFilter}) => {
  const [getBrands, setBrands] = useState([]);
  const [getProd, setProd] = useState([]);

  let brands = getBrands.map((item) => item.brand);
  useEffect(() => {
    storeService
      .getAllBrands()
      .then((response) => setBrands(response))
      .catch((err) => console.log(err));
  }, [storeService]);

  let productsArray = [];
  useEffect(() => {
    setCatalogFilter(catalog)
    brands.forEach((item) => {
      storeService.getProductsByFilter({ catalog, brand: item, postsPerPage: 1 })
        .then((res) => {
          setProd([...productsArray, res.products[0]]);
          productsArray.push(res.products[0]);
        }).catch((e) => console.log(e));
      setProd([...getProd, ...productsArray]);
    });
  }, [
    storeService,
    getBrands,
    catalog
  ]);
  // useEffect(() => () => {filterRemoveAllBrands('')}, [filterRemoveAllBrands, filterAddBrand ]);

  const filterAddBrandHandler = (item) => () => {
    if (filterRemoveAllBrands()){
      filterAddBrand(item);
    }
  };

  return (
    <div>
      <Carousel controls={true}>
        {getProd.map((item) => (
          <Carousel.Item key={item.id} className="carousel">
            <Link
              to={PRODUCT_LIST_URL + catalog}
              onClick={filterAddBrandHandler(item.brand)}
            >
              <img className="d-block w-100 img-carousel" alt={item.images[0]} src={`/images/products/${item.images[0]}`}/>
            </Link>
            <Carousel.Caption> <h2>{item.brand}</h2> </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};
const mapStateToProps = ({ filter: { getBrands } }) => ({ getBrands });

const mapDispatchToProps = (dispatch) => ({
  filterAddBrand: (brand) => dispatch(filterAddBrand(brand)),
  filterRemoveAllBrands: () =>dispatch(filterRemoveAllBrands()),
  setCatalogFilter: (catalog) => dispatch(setCatalogFilter(catalog))
});

export default withStoreService()(connect(mapStateToProps, mapDispatchToProps)(CategoriesCarousel));
