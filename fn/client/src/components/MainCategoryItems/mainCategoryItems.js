import React, {useState, useEffect} from "react";


export const MainCategoryItems = (props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(
      `https://my-json-server.typicode.com/chak-kit/demo-api/catalogs?catalogName=${props.catalogName}`,
      {
        method: "GET"
      }
    )
      .then(res => res.json())
      .then(response => {
        setProducts(response);
      })
      .catch(error => console.log(error));
  }, [props.catalogName]);

  return (
    <div>
      {products.map((c, index) => (
        <div key={index}>
          <div>
            <h3>
              {c.category}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
};


export default MainCategoryItems;