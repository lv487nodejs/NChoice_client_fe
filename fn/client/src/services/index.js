import axios from 'axios';

export default class StoreService {
  _apiBase = 'http://localhost:5000/';

  getResource = async (url) => {
    try {
      const catalogs = await axios.get(`${this._apiBase}${url}`);
      return catalogs.data;
    } catch (error) {
      console.error(error);
    }
  };

  postData = async (url, dataToSend) => {
    try {
        const response = await axios.post(`${this._apiBase}${url}`, dataToSend);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

  getAllProducts = async () => {
    const products = await this.getResource('products');
    return products.products;
  };

  getProductById = async (id) => {
    const product = await this.getResource(`products/${id}`);
    return product[0];
  };

  getProductsByFilter = async (filter) => {
    let queryString = 'products/?';
    const {
      brand,
      color,
      category,
      catalog,
      currentPage,
      postsPerPage,
      sortByPrice,
      sortByRate,
      searchTerm,
    } = filter;
    if (brand) {
      queryString = `${queryString}&brand=${brand}`;
    }
    if (color) {
      queryString = `${queryString}&color=${color}`;
    }
    if (category) {
      queryString = `${queryString}&category=${category}`;
    }
    if (catalog) {
      queryString = `${queryString}&catalog=${catalog}`;
    }
    if (currentPage > -1) {
      queryString = `${queryString}&currentpage=${currentPage}`;
    }
    if (postsPerPage) {
      queryString = `${queryString}&postsperpage=${postsPerPage}`;
    }
    if (sortByPrice) {
      queryString = `${queryString}&sortbyprice=${sortByPrice}`;
    }
    if (sortByRate) {
      queryString = `${queryString}&sortbyrate=${sortByRate}`;
    }
    if (searchTerm) {
      queryString = `${queryString}&searchTerm=${searchTerm}`;
    }
    const products = await this.getResource(queryString);
    return products;
     };

  getAllCatalogs = async () => {
    const catalogs = await this.getResource('catalogs');
    return catalogs;
  };

  getCatalogById = async (id) => {
    const catalogs = await this.getResource(`catalogs/${id}`);
    return catalogs;
  };

  getCatalogByName = async (catalogName) => {
    const catalogs = await this.getResource(`catalogs/?catalog=${catalogName}`);
    return catalogs;
  };

  getCatalogCategories = async (catalogName) => {
    const catalogs = await this.getResource(`catalogs/?catalog=${catalogName}`);
    const { categories } = catalogs[0];
    return categories;
  };

  getAllBrands = async () => {
    const brands = await this.getResource('brands');
    return brands;
  };

  getAllCategories = async () => {
    const categories = await this.getResource('categories');
    return categories;
  };

  getAllColors = async () => {
    const colors = await this.getResource('colors');
    return colors;
  };

  getAllOrders = async () => {
    const catalogs = await this.getResource('orders');
    return catalogs;
  };

  getOrderById = async (id) => {
    const catalogs = await this.getResource(`orders/${id}`);
    return catalogs;
  };

  postOrder = async order => {
    const res = await this.postData('orders', order);
    return res;
};

  getProductProperties = async (id) => {
    const product = await this.getResource(`products/${id}`);
    const { propetries } = product[0];
    return propetries;
  };
  getAllCarts = async () => {
    const carts = await this.getResource('cart');
    return carts;
  };

  getCartById = async (id) => {
    const cart = await this.getResource(`cart/${id}`);
    return cart;
  };
}
