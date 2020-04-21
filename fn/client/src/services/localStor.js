const nChoice = {
    accessToken: null,
    refreshToken: null,
    userId: null,
    wishlist_collection:null,
    products_collection:null,
    cart_numbers:null
}
localStorage.setItem('nChoice', JSON.stringify(nChoice))

const localObject = JSON.parse(localStorage.getItem("nChoice"));

export const getUserIdLS = () => {
    return localObject.userId
}

export const getAccessTokenLS = () => {
    return localObject.accessToken
}

export const getCartProductsLS = () => {
    return localObject.products_collection
}

export const getCartNumbersLS = () => {
    return localObject.cart_numbers
}

export const getWishlistLS = () => {
    return localObject.wishlist_collection
}

export const setWishlistLS = (item) => {
    localObject.wishlist_collection = item
    localStorage.setItem("nChoice", JSON.stringify(localObject))
}

export const setCartProductsLS = (item) => {
    localObject.products_collection = item
    localStorage.setItem("nChoice", JSON.stringify(localObject))
}

export const setCartNumbersLS = (item) => {
    localObject.cart_numbers = item
    localStorage.setItem("nChoice", JSON.stringify(localObject))
}

