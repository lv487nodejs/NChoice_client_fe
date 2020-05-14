const initialState={
    rate:1
}
const ratingReducer = (state=initialState,action) =>{
    switch(action.type){
        case 'ADD_RATING_TO_STORE':
            return{
                ...state,
                rate:action.payload
            }
            default:
                 return state
    }
}
export default ratingReducer;