import React from 'react';
import { connect } from 'react-redux';
import { filterAddBrand, filterRemoveBrand, filterAddCategory, filterRemoveCategory } from '../../actions';
import './filter.css';

const Filter = props => {
    console.log(props);
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
                                        props.filterAddBrand(e.target.value);
                                    } else {
                                        props.filterRemoveBrand(e.target.value);
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
                                        props.filterAddBrand(e.target.value);
                                    } else {
                                        props.filterRemoveBrand(e.target.value);
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
                                        props.filterAddBrand(e.target.value);
                                    } else {
                                        props.filterRemoveBrand(e.target.value);
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
                                        props.filterAddBrand(e.target.value);
                                    } else {
                                        props.filterRemoveBrand(e.target.value);
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
                                value="Dresses"
                                onClick={e => {
                                    if (e.target.checked) {
                                        props.filterAddCategory(e.target.value);
                                    } else {
                                        props.filterRemoveCategory(e.target.value)
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
                                        props.filterAddCategory(e.target.value);
                                    } else {
                                        props.filterRemoveCategory(e.target.value)
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
                                        props.filterAddCategory(e.target.value);
                                    } else {
                                        props.filterRemoveCategory(e.target.value)
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
                                        props.filterAddCategory(e.target.value);
                                    } else {
                                        props.filterRemoveCategory(e.target.value)
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
