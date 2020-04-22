if(!localStorage.getItem('nChoice')){
    const nChoice = {
        accessToken: null,
        refreshToken: null,
        userId: null,
        wishlist_collection:null,
        products_collection:null,
        cart_numbers:null
    }
    localStorage.setItem('nChoice', JSON.stringify(nChoice))    
}

export const getUserIdLS = () => {
    const localObject = JSON.parse(localStorage.getItem("nChoice"));
    return localObject.userId
}

export const getAccessTokenLS = () => {
    const localObject = JSON.parse(localStorage.getItem("nChoice"));
    return localObject.accessToken
}

export const getCartProductsLS = () => {
    const localObject = JSON.parse(localStorage.getItem("nChoice"));
    return localObject.products_collection
}

export const getCartNumbersLS = () => {
    const localObject = JSON.parse(localStorage.getItem("nChoice"));
    return localObject.cart_numbers
}

export const getWishlistLS = () => {
    const localObject = JSON.parse(localStorage.getItem("nChoice"));
    return localObject.wishlist_collection
}

export const setWishlistLS = (item) => {
    const localObject = JSON.parse(localStorage.getItem("nChoice"));
    localObject.wishlist_collection = item
    localStorage.setItem("nChoice", JSON.stringify(localObject))
}

export const setCartProductsLS = (item) => {
    const localObject = JSON.parse(localStorage.getItem("nChoice"));
    localObject.products_collection = item
    localStorage.setItem("nChoice", JSON.stringify(localObject))
}

export const setCartNumbersLS = (item) => {
    const localObject = JSON.parse(localStorage.getItem("nChoice"));
    localObject.cart_numbers = item
    localStorage.setItem("nChoice", JSON.stringify(localObject))
}

export const setUserIdLS = (item) => {
    const localObject = JSON.parse(localStorage.getItem("nChoice"));
    localObject.userId = item
    localStorage.setItem("nChoice", JSON.stringify(localObject))
}

export const setAccessTokenLS = (item) => {
    const localObject = JSON.parse(localStorage.getItem("nChoice"));
    localObject.accessToken = item
    localStorage.setItem("nChoice", JSON.stringify(localObject))
}

export const setRefreshTokenLS = (item) => {
    const localObject = JSON.parse(localStorage.getItem("nChoice"));
    localObject.refreshToken = item
    localStorage.setItem("nChoice", JSON.stringify(localObject))
}

