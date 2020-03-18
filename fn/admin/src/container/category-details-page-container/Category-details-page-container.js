import React from 'react';
import { useStyles } from './Category-details-page-container-styles';

import CategoryDetails from '../../components/category-details';

const CategoryDetailsPageContainer = props => {
    const classes = useStyles();
    const { id } = props.match.params;
    return (
        <div className={classes.content}>
            <CategoryDetails categoryId={id} />
        </div>
    );
};

export default CategoryDetailsPageContainer;
