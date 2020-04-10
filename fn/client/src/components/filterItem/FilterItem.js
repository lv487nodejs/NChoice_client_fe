import React, { useState } from 'react';
import FontAwesome from 'react-fontawesome'
import './FilterItem.css';
import { connect } from 'react-redux'

const FilterItem = props => {
    const [isVisible, setIsVisible] = useState(true);
    
    const listClass = isVisible ? '' : 'hide';
    const { items = [], type, handler } = props;

    const elements = items.map(item => {
        const checked = props.brand.includes(item[type])||props.category.includes(item[type])||props.color.includes(item[type])

        return (<li key={item[type]} >
            <label className="list-group-item">
                <input type="checkbox" value={item[type]} checked={checked} onChange={e => handler(e, e.target.value)} />
                {item[type]}
            </label>
        </li>)
    });
    const changeHandler = () => {
        isVisible ? setIsVisible(false) : setIsVisible(true)
    }
    return (
        <div className="filter-item">

            <FontAwesome name="plus" className="btn btn-outline-primary plus-button" onClick={changeHandler}></FontAwesome>

            <p className="filter-name">{type}</p>
            <ul className={listClass}>{elements}</ul>
        </div>
    );
};
const mapStateToProps = ({ filter: { brand, category, color } }) => ({
    brand, category, color
})
export default connect(mapStateToProps)(FilterItem)