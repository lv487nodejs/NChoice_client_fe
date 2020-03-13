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
        const catalogs = await this.getResource('products');
        return catalogs;
    };

    getProductById = async id => {
        const catalogs = await this.getResource(`products/${id}`);
        return catalogs;
    };

    getProductsByFilter = async filter => {
        let queryString = 'products/?';
<<<<<<< HEAD
        const { brand, color, category, catalog, currentPage, postsPerPage } = filter;
=======
        const { brand, color, category, catalog, sortByPrice, sortByRate } = filter;
>>>>>>> 31e8ce3707b3414ec73ad0fb2f3994ba129e49ba
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
<<<<<<< HEAD
        if (currentPage) {
            queryString = `${queryString}&currentpage=${currentPage}`;
        }
        if (postsPerPage) {
            queryString = `${queryString}&postsperpage=${postsPerPage}`;
        }
=======
        if (sortByPrice) {
            queryString = `${queryString}&sortbyprice=${sortByPrice}`;
        }
        if (sortByRate) {
            queryString = `${queryString}&sortbyrate=${sortByRate}`;
        }

>>>>>>> 31e8ce3707b3414ec73ad0fb2f3994ba129e49ba
        const catalogs = await this.getResource(queryString);
        return catalogs;
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
}
