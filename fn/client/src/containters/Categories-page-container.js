import React from 'react';

import CategoryItems from '../components/category-items';

const CategoriesPageContainer = ({catalog}) => {
    return (
        <CategoryItems catalog={catalog}/>
    )
}

export default CategoriesPageContainer