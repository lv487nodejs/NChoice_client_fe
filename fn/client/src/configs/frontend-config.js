export const itemsPerPage = [15, 30, 60];
export const PRODUCT_LIST_URL = '/productlist/';
export const countries = {
    title: 'Country',
    name: 'country',
    value: [
        "",
        "Ukraine",
        "Italy",
        "Netherlands",
        "Poland",
        "Portugal",
        "France",
        "Germany",
        "Greece",
        "Spain",
        "Hungary",
        "Sweden",
        "England",
        "USA"
    ]
};
export const paymentMethods = {
    title: "Payment Method",
    name: "paymentMethod",
    value: [
        "",
        "credit card",
        "pay pal",
        "cash",
        "google pay",
        "amazon pay",
        "apple pay"
    ]
};
export const deliveryType = {
    title: "Delivery Type",
    name: "deliveryType",
    value: [
        "",
        "currier",
        "post",
        "delivery servise"
    ]
};


export const SERVER_URL = 'https://stark-headland-06017.herokuapp.com/'
export const USERID_LOC_STOR = localStorage.getItem('UserId');