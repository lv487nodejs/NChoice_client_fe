import AdminService from './Admin-service';

class ProductsService extends AdminService {
    getAllProducts = async (currentpage, postsperpage) => {
        const catalogs = await this.getResource(
            `products?currentpage=${currentpage}&postsperpage=${postsperpage}`
        );
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

    getProductsByFilter = async (currentpage, postsperpage, filters, search) => {
        let queryString = `products?currentpage=${currentpage}&postsperpage=${postsperpage}`;
        const { brand, color, category, catalog } = filters;
        const searchTerm = search.toLowerCase();
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
        if (search) {
            queryString = `${queryString}&searchTerm=${searchTerm}`;
        }
        const products = await this.getResource(queryString);
        return products;
    };

    postProduct = async product => {
        const url = 'products/';
        const newProduct = await this.postData(url, product);
        return newProduct;
    };
}

const productsService = new ProductsService();

export default productsService;
