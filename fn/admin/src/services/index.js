import axios from 'axios';

import { SERVER_URL } from '../config';

export default class AdminService {
    getResource = async url => {
        try {
            const response = await axios.get(`${SERVER_URL}${url}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    };

    postData = async (url, dataToSend) => {
        console.log(dataToSend)
        try {
            const response = await axios.post(
                `${SERVER_URL}${url}`,
                dataToSend
            );
            return response.data;
        } catch (error) {
            console.error(error);
        }
    };

    putData = async (url, dataToSend) => {
        try {
            const response = await axios.put(`${SERVER_URL}${url}`, dataToSend);
            return response;
        } catch (error) {
            console.error(error);
        }
    };

    getAllProducts = async () => {
        const catalogs = await this.getResource('products');
        return catalogs;
    };

    getProductById = async id => {
        const product = await this.getResource(`products/${id}`);
        return product[0];
    };

    getProductPropetries = async id => {
        const product = await this.getResource(`products/${id}`);
        const { propetries } = product[0];
        return propetries;
    };

    getProductsByFilter = async filter => {
        let queryString = 'products/?';
        const { brand, color, category, catalog } = filter;
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
        const catalogs = await this.getResource(queryString);
        return catalogs;
    };

    postProduct = async product => {
        const url = 'products/';
        const newProduct = await this.postData(url, product);
        return newProduct;
    }

    getProductOptions = async () => {
        const catalogs = await this.getAllCatalogs();
        const categories = await this.getAllCategories();
        const colors = await this.getAllColors();
        const brands = await this.getAllBrands();

        const productOptions = [catalogs, categories, brands, colors];
        return productOptions;
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
        const catalogs = await this.getResource(
            `catalogs/?catalog=${catalogName}`
        );
        return catalogs;
    };

    getCatalogCategories = async catalogName => {
        const catalogs = await this.getResource(
            `catalogs/?catalog=${catalogName}`
        );
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

    getCategoryById = async id => {
        const category = await this.getResource(`categories/${id}`);
        return category;
    };

    putCategory = async category => {
        const res = await this.putData(`categories/${category.id}`, category);
        return res;
    };

    getAllColors = async () => {
        const colors = await this.getResource('colors');
        return colors;
    };

    getAllUsers = async () => {
        const colors = await this.getResource('users');
        return colors;
    };

    getUserById = async id => {
        const colors = await this.getResource(`users/${id}`);
        return colors;
    };

    putUser = async user => {
        const res = await this.putData(`users/${user.id}`, user);
        return res;
    };
}
