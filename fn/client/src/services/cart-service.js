import ClientService from './client-service';

class CartService extends ClientService {
    postCartItem = async cartItem => {
        const res = await this.postData('cart', cartItem);
        return res;
    };

    getCartById = async id => {
        const cart = await this.getResource(`cart/${id}`);
        return cart;
    };

    putCart = async (id, cartItem) => {
        const res = await this.putData(`cart/${id}`, { cartItem });
        return res;
    };

    deleteCart = async id => {
        const cart = await this.deleteResource(`cart/${id}`);
        return cart;
    }
}

const cartService = new CartService();

export default cartService;
