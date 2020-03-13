import axios from 'axios';

export default class StoreService {
    _apiBase = 'http://localhost:5000/';

    getResource = async url => {
        try {
            const catalogs = await axios.get(`${this._apiBase}${url}`);
            return catalogs.data;
        } catch (error) {
            console.error(error);
        }
    };

    getAllProducts = async () => {
        const products = await this.getResource('products');
        return products;
    };

    getProductById = async id => {

        const products = await this.getResource(`products/${id}`);
        return products;
    };

    getProductsByFilter = async filter => {
        let queryString = 'products/?';

        const { brand, color, category, catalog, currentPage, postsPerPage } = filter;
        const { brand, color, category, catalog, sortByPrice, sortByRate } = filter;

        const { brand, color, category, catalog, searchTerm } = filter;
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

        if (currentPage) {
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

        const catalogs = await this.getResource(queryString);
        return catalogs;
        if (searchTerm) {
            queryString = `${queryString}&searchTerm=${searchTerm}`;
        }
        const products = await this.getResource(queryString);
        return products;
        // const catalogs = await this.getResource(queryString);
        // return catalogs;
    };

    getAllCatalogs = async () => {
        const catalogs = await this.getResource('catalogs');
        return catalogs;
    };

    getCatalogById = async id => {
        const catalogs = await this.getResource(`catalogs/${id}`);
        return catalogs;
    };

    getCatalogByName = async catalogName => {
        const catalogs = await this.getResource(`catalogs/?catalog=${catalogName}`);
        return catalogs;
    };

    getCatalogCategories = async catalogName => {
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

    getOrderById = async id => {
        const catalogs = await this.getResource(`orders/${id}`);
        return catalogs;
    };
}
