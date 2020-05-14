import axios from 'axios';
import { _apiBase } from '../configs/frontend-config'

export default class StoreService {
  
  getResource = async (url) => {
    try {
      const catalogs = await axios.get(`${_apiBase}${url}`);
      return catalogs.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  postData = async (url, dataToSend) => {
    try {
      const response = await axios.post(`${_apiBase}${url}`, dataToSend);      
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

  getOneProductPropertie = async (id) => {
    const productPropertie = await this.getResource(`products/propetries/${id}`);
    return productPropertie;
  };

  getAllCarts = async () => {
    const carts = await this.getResource('cart');
    return carts;
  };

  getCartById = async (id) => {
    const cart = await this.getResource(`cart/${id}`);
    return cart;
  };
  getUserById = async (id, token) => {
    return axios({ method: 'GET', url: `${_apiBase}users/${id}`, headers: { "x-auth-token": token } })
  };
  sendUserChangedData = async (id, token, data) => {
    return axios({ method: 'PUT', url: `${_apiBase}users/${id}`, data, headers: { "x-auth-token": token } })
  };
  
  registerUser = async (user) => {
    return await this.postData('users/register', user);
  }
  
  loginUser = async (user) => {
    return await this.postData('auth/login', user);
  }
  putToCart = async (id, data, token) => {
    return await axios.put(`${_apiBase}users/cart/${id}`, { data, "x-auth-token": token });
  }
  getAllNews = async () => {
    const news = await this.getResource('news');
    return news;
  };

  getAllComments = async () => {
    const comments = await this.getResource('comments');
    return comments;
  };

  getCommentsByProductId = async (productId) => {
    const comments = await this.getResource(`comments?productId=${productId}`);
    return comments;
  };

  postComments = async comment => {
    const res = await this.postData('comments', comment);
    return res;
  };

  deleteComment = async (id, token) => {
    return await axios.delete(`${_apiBase}comments/${id}`, { headers: { "x-auth-token": token }})
  };

  confirmEmail = async token => {
    try {
      const res = await this.getResource(`auth/confirmation/${token}`)
      return res;
    } catch (error) {
      throw error;
    }
  }
  updateRate = async (id, rate, token) => {        
    return await axios.put(`${_apiBase}rating/${id}`,{rate}, { headers: { 'x-auth-token': token}}
    );
  }
}
