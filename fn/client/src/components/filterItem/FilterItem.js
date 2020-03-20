import React,{useState} from 'react';
import FontAwesome from 'react-fontawesome'
import './FilterItem.css';

export const FilterItem = props => {
    const [isVisible,setIsVisible] = useState(true);
    const listClass = isVisible?'':'hide';
    const { items = [], type, handler  } = props;
    const elements = items.map(item => (
        <li key={item[type]} >
            <label className="list-group-item">
                <input type="checkbox" value={item[type]} onClick={e => handler(e, e.target.value)} />
                {item[type]}
            </label>
        </li>
    ));
const changeHandler = () =>{
    isVisible?setIsVisible(false):setIsVisible(true)
}
    return (
        <div className="filter-item">
            
                <FontAwesome name='filter' className="btn btn-outline-primary fa-plus plus-button" onClick={changeHandler}></FontAwesome>
            
    <p className="filter-name">{type}</p>
            <ul className={listClass}>{elements}</ul>
        </div>
    );
};
