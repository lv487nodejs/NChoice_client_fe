import React from 'react';
import './filter.css';

const Filter = () => {
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
                            <input type="checkbox" />
                            <span>case1</span>
                        </label>
                        <label>
                            <input type="checkbox" />
                            <span>case2</span>
                        </label>
                        <label>
                            <input type="checkbox" />
                            <span>case3</span>
                        </label>
                        <label>
                            <input type="checkbox" />
                            <span>case4</span>
                        </label>
                        <label>
                            <input type="checkbox" />
                            <span>case5</span>
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
export default Filter;
