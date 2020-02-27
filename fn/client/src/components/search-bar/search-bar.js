import React, { useState } from 'react';
import './search-bar.css';

import { Form, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

let products = [
    {
        id: 1,
        name: 'product1',
        price: '100'
    },
    {
        id: 2,
        name: 'product2',
        price: '200'
    },
    {
        id: 3,

        name: 'product3',
        price: '300'
    },
    {
        id: 4,
        name: 'product4',
        price: '400'
    }
]

function SearchBar() {
    const [search, setSearch] = useState('')

    const updateSearch = e => {
        setSearch(e.target.value.substr(0, 20))
    }
    const filterProducts = products.filter(function (product) {
        return product.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
    })
    return (
        <div>
            <>
                <Form>
                    <Row>
                        <Col sm={2}>
                            <Form.Control placeholder="write product..." value={search} onChange={updateSearch.bind(this)} />
                        </Col>
                    </Row>
                </Form>

            </>

            {/* <div className="wrapper">
                {filterProducts.map((item) =>
                    <div className="productItem" key={item.id}> {item.name}</div>)
                }
            </div> */}
        </div>


    )
}

export default SearchBar;