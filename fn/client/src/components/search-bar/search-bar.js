import React, { useState } from 'react';
import './search-bar.css';

import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const products = [
    {
        id: 1,
        name: 'product1',
        price: '100',
    },
    {
        id: 2,
        name: 'product2',
        price: '200',
    },
    {
        id: 3,

        name: 'product3',
        price: '300',
    },
    {
        id: 4,
        name: 'product4',
        price: '400',
    },
];

function SearchBar() {
    const [search, setSearch] = useState('');

    const updateSearch = e => {
        setSearch(e.target.value.substr(0, 20));
    };
    const filterProducts = products.filter(function(product) {
        return product.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });
    return (
        <Form>
            <Form.Control className="search-bar" placeholder="Search..." value={search} onChange={updateSearch.bind(this)} />
        </Form>
    );
}

export default SearchBar;
