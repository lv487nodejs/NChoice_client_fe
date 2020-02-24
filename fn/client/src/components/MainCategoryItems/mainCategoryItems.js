import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { productsFetchData, productsFetchSuccess } from '../../actions/index';

export const MainCategoryItems = props => {
    console.log(props);

    useEffect(() => {
        fetch(`https://my-json-server.typicode.com/chak-kit/demo-api/catalogs?catalogName=${props.catalogName}`, {
            method: 'GET',
        })
            .then(res => res.json())
            .then(response => {
                console.log(response);
                props.productsFetchSuccess(response);
            })
            .catch(error => console.log(error));
    }, [props, props.catalogName]);

    return (
        <div>
            {props.products.map(c => (
                <div key={c.id}>
                    <div>
                        <h3>{c.category}</h3>
                    </div>
                </div>
            ))}
        </div>
    );
};
const mapStateToProps = state => {
    console.log(state);

    return {
        products: state.products,
    };
};
const mapDispatchToProps = dispatch => ({
    productsFetchData: url => dispatch(productsFetchData(url)),
    productsFetchSuccess: item => dispatch(productsFetchSuccess(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainCategoryItems);
