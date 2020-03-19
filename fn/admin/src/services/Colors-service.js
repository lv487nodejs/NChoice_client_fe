import AdminService from './Admin-service';

class ColorsService extends AdminService {
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

const colorsService = new ColorsService();

export default colorsService;
