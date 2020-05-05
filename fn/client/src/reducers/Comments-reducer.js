const initialState = {
  comments: [],
};

const commentsReduser = (state = initialState, action) => {
  switch (action.type) {
case 'SET_COMMENTS':
return {
  ...state,
  product: {...state.product, comments: action.payload},
  loading: false,
};

case 'REMOVE_COMMENTS':
return {
  ...state,
  product: {
    ...state.product,
    comments: state.product.comments.filter(item => item._id !== action.payload)
  },
  loading: false
};
    default:
      return state;
  }
};

export default commentsReduser;
