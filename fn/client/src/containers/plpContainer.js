import React from 'react'
import Row from '../components/Row';
import Filter from '../components/Filter';

 const plpContainer=()=> {
    return (
        <div>
            <Row left={<Filter />} />
        </div>
    )
}
export default plpContainer;