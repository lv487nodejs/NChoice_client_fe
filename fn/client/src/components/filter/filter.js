import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
    filterAddBrand,
    filterAddColor,
    filterAddCategory,
    filterRemoveColor,
    filterRemoveCategory,
    filterRemoveBrand,
    composeFilters,
    fetchSuccessBrands,
    fetchSuccessCategories,
    fetchSuccessColors,
} from '../../actions';

import FilterItem from '../filterItem';
import withStoreService from '../hoc';

import './filter.css';

const Filter = ({
    storeService,
    filterAddBrand,
    filterAddCategory,
    filterAddColor,
    filterRemoveBrand,
    filterRemoveCategory,
    filterRemoveColor,
    composeFilters,
    state,
    fetchSuccessBrands,
    fetchSuccessCategories,
    fetchSuccessColors,
}) => {
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [colors, setColors] = useState([]);

    useEffect(() => {
        storeService
            .getAllBrands()
            .then(response => setBrands(response))
            .catch(err => console.log(err));
    }, [storeService]);

    useEffect(() => {
        storeService
            .getAllCategories()
            .then(response => setCategories(response))
            .catch(err => console.log(err));
    }, [storeService]);
    useEffect(() => {
        storeService
            .getAllColors()
            .then(response => setColors(response))
            .catch(err => console.log(err));
    }, [storeService]);

    console.log(state.filter.brands);
    // problem here
    useEffect(
        () =>
            storeService.getCatalogByFilter({ brand: state.filter.brands }).then(res => fetchSuccessBrands(res)
            ),
        []
    );
    console.log(state.filter.category);

    // problem here
    useEffect(
        () =>
            storeService.getCatalogByFilter({ category: state.filter.category }).then(res => fetchSuccessCategories(res)
            ),
        []
    );
    // problem here
    useEffect(
        () =>
            storeService.getCatalogByFilter({ color: state.filter.color }).then(res => fetchSuccessColors(res)
            ),
        []
    );

    const filterAddBrandHandler = (e, item) => {
        if (e.target.checked) {
            console.log(item);
            filterAddBrand(item);
        } else {
            filterRemoveBrand(item);
        }
        composeFilters();
    };
    const filterAddCategoryHandler = (e, item) => {
        if (e.target.checked) {
            console.log(item);
            filterAddCategory(item);
        } else {
            filterRemoveCategory(item);
        }
        composeFilters();
    };
    const filterAddColorHandler = (e, item) => {
        if (e.target.checked) {
            console.log(item);
            filterAddColor(item);
        } else {
            filterRemoveColor(item);
        }
        composeFilters();
    };

    return (
        <div className="row">
            <div className="filter-group">
                <span>filter</span>
                <FilterItem items={brands} type="brand" func={filterAddBrandHandler} />
                <FilterItem items={categories} type="category" func={filterAddCategoryHandler} />
                <FilterItem items={colors} type="color" func={filterAddColorHandler} />
            </div>
        </div>
    );
};
const mapStateToProps = state => ({
    state,
});
const mapDispatchToProps = dispatch => ({
    filterAddBrand: brand => dispatch(filterAddBrand(brand)),
    filterAddColor: color => dispatch(filterAddColor(color)),
    filterAddCategory: category => dispatch(filterAddCategory(category)),
    filterRemoveBrand: brand => dispatch(filterRemoveBrand(brand)),
    filterRemoveCategory: category => dispatch(filterRemoveCategory(category)),
    filterRemoveColor: category => dispatch(filterRemoveColor(category)),
    composeFilters: () => dispatch(composeFilters()),
    fetchSuccessBrands: brands => dispatch(fetchSuccessBrands(brands)),
    fetchSuccessColors: colors => dispatch(fetchSuccessColors(colors)),
    fetchSuccessCategories: categories => dispatch(fetchSuccessCategories(categories)),
});

export default withStoreService()(connect(mapStateToProps, mapDispatchToProps)(Filter));
