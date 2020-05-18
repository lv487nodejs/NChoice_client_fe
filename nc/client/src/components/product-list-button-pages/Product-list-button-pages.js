import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import './Product-list-button-pages.css';
import { itemsPerPage } from '../../configs/frontend-config';

export default function ProductListButtonPages({ changeItems, changeCurrentPage }) {
    const pickAmount = number => changeItems(number);
    const buttons = itemsPerPage.map(number => (
        <Button
            variant="dark"
            className="btn btn-primary"
            key={number}
            onClick={() => {
                pickAmount(number);
                changeCurrentPage();
            }}>
            {number}
        </Button>
    ));
    return (
        <div className="buttonsGroup">
            <ButtonGroup aria-label="Buttons per page">
                {buttons}
            </ButtonGroup>
        </div>
    );
}
