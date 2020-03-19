import AdminService from './Admin-service';

class UsersService extends AdminService {
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

const usersService = new UsersService();

export default usersService;
