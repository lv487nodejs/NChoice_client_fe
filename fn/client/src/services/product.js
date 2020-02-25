import axios from 'axios';

export default class ProductService {
    _apiBase = 'https://stark-headland-06017.herokuapp.com/';

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

    getCatalogByFilter = async filter => {
        let queryString = 'products/?';
        const { brand, color, category, catalog } = filter;
        if (brand) {
            queryString = `${queryString}brand=${brand}`;
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
        const catalogs = await this.getResource(queryString);
        return catalogs;
    };
}
