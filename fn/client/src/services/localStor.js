export const getUserIdLS = () => {
    const localObject = JSON.parse(localStorage.getItem("nChoice"));
    return localObject.userId
}

export const getAccessTokenLS = () => {
    const localObject = JSON.parse(localStorage.getItem("nChoice"));
    return localObject.accessToken
}

// export const getaccessTokenLS = () => {
//     const localObject = JSON.parse(localStorage.getItem("nChoice"));
//     return localObject.accessToken
// }

export const setWishlistLS = (item) => {
    const localObject = JSON.parse(localStorage.getItem("nChoice"));
    localObject.wishlist_collection = item
    localStorage.setItem("nChoice", JSON.stringify(localObject))
}