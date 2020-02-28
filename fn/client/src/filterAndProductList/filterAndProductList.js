import React from 'react';
import from './filterAndProductList.css';
export default function filterAndProductList(left, rignt) {
    return (
        <div className="flex fa-align-center">
            <div className="left-item">

                {left}
            </div><div className="right-item">
                {rignt}
            </div>
        </div>
    )
}
