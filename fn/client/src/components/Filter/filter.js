import React from 'react';
import './filter.css';
import { connect } from 'react-redux';
import { filterBrand } from '../../actions';

const Filter = props => {
    console.log('props',props);
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
                                        props.filterBrand(e.target.value);
                                    }
                                }}
                            />
                            <span>Armani</span>
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="Gucci"
                                onClick={e => {
                                    if (e.target.checked) {
                                        props.filterBrand(e.target.value);
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
                                        props.filterBrand(e.target.value);
                                    }
                                }}
                            />
                            <span>Prada</span>
                        </label>
                        <label>
                            <input
                                type="checkbox" value="Versace"
                                onClick={e => {
                                    if (e.target.checked) {
                                        props.filterBrand(e.target.value);
                                    }
                                }}
                            />
                            <span>Versace</span>
                        </label>
            
                    </div>
                    <div className="col s12 filter-item">
                        <p>
                            <i className="material-icons plus-button">add</i>
                        </p>
                        <label>
                            <input type="checkbox" />
                            <span>brand1</span>
                        </label>
                        <label>
                            <input type="checkbox" />
                            <span>brand2</span>
                        </label>
                        <label>
                            <input type="checkbox" />
                            <span>brand3</span>
                        </label>
                        <label>
                            <input type="checkbox" />
                            <span>brand4</span>
                        </label>
                        <label>
                            <input type="checkbox" />
                            <span>brand5</span>
                        </label>
                    </div>
                    <div className="col s12 filter-item">
                        <p>
                            <i className="material-icons plus-button">add</i>
                        </p>
                        <label>
                            <input type="checkbox" />
                            <span>type1</span>
                        </label>
                        <label>
                            <input type="checkbox" />
                            <span>type2</span>
                        </label>
                        <label>
                            <input type="checkbox" />
                            <span>type3</span>
                        </label>
                        <label>
                            <input type="checkbox" />
                            <span>type4</span>
                        </label>
                        <label>
                            <input type="checkbox" />
                            <span>type5</span>
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
    filterBrand: brand => dispatch(filterBrand(brand)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
