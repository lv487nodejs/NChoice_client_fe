const addRatingToStore = (value)=>{
    return {
        type:'ADD_RATING_TO_STORE',
        payload:value,
    }
}
export default addRatingToStore;