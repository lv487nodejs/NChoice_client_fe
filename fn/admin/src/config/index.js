import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import AssessmentIcon from '@material-ui/icons/Assessment';
import CategoryIcon from '@material-ui/icons/Category';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';

export const DRAWER_WIDTH = 220;
export const PAGE_TITLE = 'FN Admin Panel';

export const ROWS_PER_PAGE_OPTIONS = [10, 25, 50, 100];

export const MENU_CATEGORIES = [
    ['Statistics', '/', AssessmentIcon],
    ['Products', '/products', ShoppingBasketIcon],
    ['Categories', '/categories', CategoryIcon],
    ['Brands', '/brands', CollectionsBookmarkIcon],
    ['Users', '/users', PeopleAltIcon],
];
export const PRODUCTS_TABLE_HEAD = [
    'Image',
    'Catalog',
    'Category',
    'Brand',
    'Title',
    'Price',
    'Mrsp',
    'Actions',
];
export const USERS_TABLE_HEAD = ['Avatar', 'Email', 'First Name', 'Last Name', 'Role', 'Actions'];
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
    mrsp: '',
    price: '',
    images: [],
    propetries: [],
};

export const NEW_PRODUCT_PROPETRIES = {
    size: '',
    available: '',
    sku: '',
};

export const PRODUCT_OPTION_NAMES = ['catalog', 'category', 'brand', 'color'];
export const FILTER_OPTION_NAMES = ['catalog', 'category', 'brand'];

export const NEW_PRODUCT_DESCR = ['title', 'mrsp', 'price', 'description'];
export const SIZES_SHOES = ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45'];
export const SIZES_CLOTHES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export const INPUT_TYPE_NUMBER = ['price', 'mrsp'];
export const INPUT_MULTILINE = ['description'];

export const PRODUCT_ADD_STEPS_LABEL = [
    'Please choose products Catalog, Category, Brand and Color',
    'Please provide product descriptions',
    'Please provide product sizes information',
    'Please verify and confirm product saving',
];

export const PRODUCT_KEYS = [
    'catalog',
    'category',
    'brand',
    'color',
    'title',
    'description',
    'mrsp',
    'price',
];

export const snackbarDuration = 4000;

export const PROPETRIES_KEYS = ['size', 'available', 'sku'];

export const FILTER_OPTIONS = {
    catalog: [],
    category: [],
    brand: [],
};

export const FILTER_COUNTERS = {
    catalog: 0,
    brand: 0,
    category: 0,
    total: 0,
};
