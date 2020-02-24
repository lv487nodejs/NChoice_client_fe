// const fetchProducts = (state,action)=>{
//     switch(action.type){
//         case 'PRODUCTS_FETCH_SUCCESS':
//             return{...state,productList:[...action.payload]}
//     }
// }
// export default fetchProducts;

export function fetchProducts(state = [], action) {
  switch (action.type) {
    case 'PRODUCTS_FETCH_SUCCESS':
      return action.items;

    default:
      return state;
  }
}
