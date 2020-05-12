const initialState = {
  comments: []
};

const commentsReduser = (state = initialState, action) => {

  switch (action.type) {
    case 'SET_COMMENTS':
      return {
        comments:action.payload,
      };

    case 'REMOVE_COMMENTS':
      console.log(state.comments.filter(item => item._id !== action.payload));
      
      return {
        comments: state.comments.filter(item => item._id !== action.payload)
      };

    default:
      return state;
  }
};

export default commentsReduser;
