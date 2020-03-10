import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import AssessmentIcon from '@material-ui/icons/Assessment';
import CategoryIcon from '@material-ui/icons/Category';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';

export const DRAWER_WIDTH = 240;
export const PAGE_TITLE = 'FN Admin Panel';
export const MENU_CATEGORIES = [
    ['Statistics', '/', AssessmentIcon],
    ['Products', '/products', ShoppingBasketIcon],
    ['Categories', '/categories', CategoryIcon],
    ['Brands', '/brands', CollectionsBookmarkIcon],
    ['Users', '/users', PeopleAltIcon],
];
export const PRODUCTS_TABLE_HEAD = ['Image', 'Catalog', 'Category', 'Brand', 'Title', 'Price', 'Mrsp', 'Actions'];
export const USERS_TABLE_HEAD = ['Avatar', 'First Name', 'Last Name', 'Email', 'Role', 'Actions'];
export const BRANDS_TABLE_HEAD = ['Avatar', 'Brand', 'Actions'];
export const CATEGORIES_TABLE_HEAD = ['Avatar', 'Category', 'Actions'];

export const SERVER_URL = 'https://stark-headland-06017.herokuapp.com/';

export const NEW_PRODUCT_MODEL = {
    catalog: '',
    category: '',
    brand: '',
    color: '',
    title: '',
    description: '',
    msrp: 0,
    price: 0,
    images: [],
    propetries: [],
};

export const NEW_PRODUCT_PROPETRIES = {
    size: '',
    available: 0,
    sku: '',
};

export const NEW_PRODUCT_DESCR = ['title', 'description', 'msrp', 'price'];
export const SIZES_SHOES = ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45'];
export const SIZES_CLOTHES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
