import React, { useState } from 'react';
import './Product-sort.css';
import Button from 'react-bootstrap/Button';
import FA from 'react-fontawesome';

const ProductSort = (props) => {
  const [sortValue, setSortValue] = useState(props.value);
  const [className, setClassName] = useState(null);
  const changeHandler = () => {
    setSortValue(-sortValue);
    sortValue === 1
        ? setClassName(props.defaultClass)
        : setClassName(props.toChangeClass);
    props.handler(sortValue);
  };

  return (
      <Button key={props.text} variant={props.variant} onClick={changeHandler}>
        {props.text} <FA name="sort" className={className ? className : 'fas fa-sort'} />
      </Button>
  )
};

export default ProductSort;
