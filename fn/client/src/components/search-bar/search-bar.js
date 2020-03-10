import React, { useState } from 'react';
import './search-bar.css';

import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function SearchBar() {
    const [search, setSearch] = useState('');

    const updateSearch = e => {
        setSearch(e.target.value.substr(0, 20));
    };

    return (
        <Form>
            <Form.Control className="search-bar" placeholder="Search..." value={search} onChange={updateSearch.bind(this)} />
        </Form>
    );
}

export default SearchBar;
