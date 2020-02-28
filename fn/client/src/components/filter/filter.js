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
    composeReceivedData,
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
    brand,
    category,
    color,
    fetchSuccessBrands,
    fetchSuccessCategories,
    fetchSuccessColors,
    composeReceivedData,
}) => {
    const [getBrands, setBrands] = useState([]);
    const [getCategories, setCategories] = useState([]);
    const [getColors, setColors] = useState([]);

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

    useEffect(() => {
        storeService.getCatalogByFilter({ brand }).then(res => {
            fetchSuccessBrands(res);
            composeReceivedData();
        });
    }, [brand, composeReceivedData, fetchSuccessBrands, storeService]);

    useEffect(() => {
        storeService.getCatalogByFilter({ category }).then(res => {
            fetchSuccessCategories(res);
            composeReceivedData();
        });
    }, [category, composeReceivedData, fetchSuccessCategories, storeService]);
    useEffect(() => {
        storeService.getCatalogByFilter({ color }).then(res => {
            fetchSuccessColors(res);
            composeReceivedData();
        });
    }, [color, composeReceivedData, fetchSuccessColors, storeService]);

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
                <FilterItem items={getBrands} type="brand" handler={filterAddBrandHandler} />
                <FilterItem items={getCategories} type="category" handler={filterAddCategoryHandler} />
                <FilterItem items={getColors} type="color" handler={filterAddColorHandler} />
            </div>
        </div>
    );
};
const mapStateToProps = ({ productsList: { brand, category, color } }) => ({
    brand,
    category,
    color,
});

const mapDispatchToProps = dispatch => ({
    filterAddBrand: brand => dispatch(filterAddBrand(brand)),
    filterAddColor: color => dispatch(filterAddColor(color)),
    filterAddCategory: category => dispatch(filterAddCategory(category)),
    filterRemoveBrand: brand => dispatch(filterRemoveBrand(brand)),
    filterRemoveCategory: category => dispatch(filterRemoveCategory(category)),
    filterRemoveColor: category => dispatch(filterRemoveColor(category)),
    composeFilters: () => dispatch(composeFilters()),
    composeReceivedData: () => dispatch(composeReceivedData()),
    fetchSuccessBrands: brands => dispatch(fetchSuccessBrands(brands)),
    fetchSuccessColors: colors => dispatch(fetchSuccessColors(colors)),
    fetchSuccessCategories: categories => dispatch(fetchSuccessCategories(categories)),
});

export default withStoreService()(connect(mapStateToProps, mapDispatchToProps)(Filter));
