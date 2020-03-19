import AdminService from './Admin-service';

class CategoriesService extends AdminService {
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

const categoriesService = new CategoriesService();

export default categoriesService;
