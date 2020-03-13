import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import './Product-list-button-pages.css';
import { itemsPerPage } from '../../frontend-config';

export default function ProductListButtonPages({ changeItems, changeCurrentPage }) {
    const pickAmount = number => changeItems(number);
    return (
        <div className="buttonsGroup">
            <ButtonGroup aria-label="Buttons per page">
                {itemsPerPage.map(number => (
                    <Button
                        className="btn btn-primary"
                        key={number}
                        onClick={() => {
                            pickAmount(number);
                            changeCurrentPage();
                        }}
                    >
                        {number}
                    </Button>
                ))}
            </ButtonGroup>
        </div>
    );
}
