import AdminService from './Admin-service';
import { PRODUCT_OPTION_NAMES } from '../config';

import { categoriesService, catalogsService, brandsService, colorsService } from './index';

class ProductPropetriesService extends AdminService {
    getCheckboxList = (options, name) => {
        const checkboxList = {};
        options.map(option => {
            const itemName = option[name];
            checkboxList[itemName] = false;
            return checkboxList[itemName];
        });

        return checkboxList;
    };

    getProductOptions = async () => {
        const catalogs = await catalogsService.getAllCatalogs();
        const categories = await categoriesService.getAllCategories();
        const colors = await colorsService.getAllColors();
        const brands = await brandsService.getAllBrands();

        const productOptions = [catalogs, categories, brands, colors];
        const filterOptions = [catalogs, categories, brands];

        let filterOptionsList = {};
        filterOptions.map((option, index) => {
            const result = this.getCheckboxList(option, PRODUCT_OPTION_NAMES[index]);
            filterOptionsList = { ...filterOptionsList, ...result };
            return filterOptionsList;
        });

        return { productOptions, filterOptionsList, filterOptions };
    };
}

const productPropetriesService = new ProductPropetriesService();

export default productPropetriesService;
