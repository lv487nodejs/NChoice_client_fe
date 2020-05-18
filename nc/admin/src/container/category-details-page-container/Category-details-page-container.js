import React from 'react';

import CategoryDetails from '../../components/category-details';

const CategoryDetailsPageContainer = props => {
    const { id } = props.match.params;
    return (
        <div>
            <CategoryDetails categoryId={id} />
        </div>
    );
};

export default CategoryDetailsPageContainer;
