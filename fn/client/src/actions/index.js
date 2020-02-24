const productsFetchSuccess = (items) => {
  return {
    type: 'PRODUCTS_FETCH_SUCCESS',
    payload: items
  }
};
const productsFetchData = (dispatch) => (url, method = null, body = {}) => {
  fetch(url, method, body).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return response
  })
    .then((response) => response.json())
    .then((items) => dispatch(productsFetchSuccess(items))).catch((err) => { throw new Error(err); }
  );
};

export {productsFetchData,productsFetchSuccess };


