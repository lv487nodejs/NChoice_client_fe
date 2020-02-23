const fetchProducts = (state,action)=>{
    switch(action.type){
        case 'PRODUCTS_FETCH_SUCCESS':
            return{...state,productList:[...action.payload]}
    }
}
export {fetchProducts}