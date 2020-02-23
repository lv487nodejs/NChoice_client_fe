import React from 'react';
import { connect } from 'react-redux';
import {
    filterAddBrand,
    filterRemoveBrand,
    filterAddCategory,
    filterRemoveCategory,
    composeFilters,
} from '../../actions';
import './filter.css';



const Filter = props => {
    const { filterAddBrand, filterAddCategory, filterRemoveBrand, filterRemoveCategory, composeFilters } = props;
    return (
        <div className="row">
            <div style={{ marginTop: '0.8rem' }}>
                <fieldset className="card-content" style={{ position: 'relative' }}>
                    <legend style={{ padding: '0 0.5rem' }}>filter</legend>
                    <div className="col s12 filter-item">
                        <p>
                            <i className="material-icons plus-button">add</i>
                        </p>
                        <label>
                            <input
                                type="checkbox"
                                value="Armani"
                                onClick={e => {
                                    if (e.target.checked) {
                                        filterAddBrand(e.target.value);
                                        composeFilters();
                                    } else {
                                        filterRemoveBrand(e.target.value);
                                        composeFilters();
                                    }
                                }}
                                />
                            <span>Armani</span>
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="Versace"
                                onClick={e => {
                                    if (e.target.checked) {
                                        filterAddBrand(e.target.value);
                                        composeFilters();
                                    } else {
                                        filterRemoveBrand(e.target.value);
                                        composeFilters();
                                    }
                                }}
                                />
                            <span>Versace</span>
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="Gucci"
                                onClick={e => {
                                    if (e.target.checked) {
                                        filterAddBrand(e.target.value);
                                        composeFilters();
                                    } else {
                                        filterRemoveBrand(e.target.value);
                                        composeFilters();
                                    }
                                }}
                                />
                            <span>Gucci</span>
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="Prada"
                                onClick={e => {
                                    if (e.target.checked) {
                                        filterAddBrand(e.target.value);
                                        composeFilters();
                                    } else {
                                        filterRemoveBrand(e.target.value);
                                        composeFilters();
                                    }
                                }}
                                />
                            <span>Prada</span>
                        </label>
                    </div>
                    <div className="col s12 filter-item">
                        <p>
                            <i className="material-icons plus-button">add</i>
                        </p>
                        <label>
                            <input
                                type="checkbox"
                                name="dresses"
                                value="Dresses"
                                onClick={e => {
                                    if (e.target.checked) {
                                        filterAddCategory(e.target.value);
                                        composeFilters();
                                    } else {
                                        filterRemoveCategory(e.target.value);
                                        composeFilters();
                                    }
                                }}
                                />
                            <span>Dresses</span>
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="Jeans"
                                onClick={e => {
                                    if (e.target.checked) {
                                        filterAddCategory(e.target.value);
                                        composeFilters();
                                    } else {
                                        filterRemoveCategory(e.target.value);
                                        composeFilters();
                                    }
                                }}
                                />
                            <span>Jeans</span>
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="Shoes"
                                onClick={e => {
                                    if (e.target.checked) {
                                        filterAddCategory(e.target.value);
                                        composeFilters();
                                    } else {
                                        filterRemoveCategory(e.target.value);
                                        composeFilters();
                                    }
                                }}
                                />
                            <span>Shoes</span>
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="Sweaters"
                                onClick={e => {
                                    if (e.target.checked) {
                                        filterAddCategory(e.target.value);
                                        composeFilters();
                                    } else {
                                        filterRemoveCategory(e.target.value);
                                        composeFilters();
                                    }
                                }}
                                />
                            <span>Sweaters</span>
                        </label>
                    </div>
                </fieldset>
            </div>
        </div>
    );
};
const mapStateToProps = state => ({
    filtered: state.filtered,
});
const mapDispatchToProps = dispatch => ({
    filterAddBrand: brand => dispatch(filterAddBrand(brand)),
    filterRemoveBrand: brand => dispatch(filterRemoveBrand(brand)),
    filterAddCategory: category => dispatch(filterAddCategory(category)),
    filterRemoveCategory: category => dispatch(filterRemoveCategory(category)),
    composeFilters: () => dispatch(composeFilters()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
