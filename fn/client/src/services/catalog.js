import axios from 'axios';

export default class CatalogService {
    _apiBase = 'https://stark-headland-06017.herokuapp.com/';

    getResource = async url => {
        try {
            const catalogs = await axios.get(`${this._apiBase}${url}`);
            return catalogs.data;
        } catch (error) {
            console.error(error);
        }
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
}
