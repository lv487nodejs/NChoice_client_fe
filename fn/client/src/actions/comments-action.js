const setComments = (productId) => ({
  type: 'SET_COMMENTS',
  payload: productId
});

const removeComments = commentId => ({
  type: 'REMOVE_COMMENTS',
  payload: commentId,
});

export {setComments, removeComments};
