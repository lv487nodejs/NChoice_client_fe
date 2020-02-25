import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

export default function ProductListButtonPages({ changeItems, changeCurrentPage }) {
    const itemsPerPage = [15, 30, 60];
    const pickAmount = number => changeItems(number);
    return (
        <div className="buttonsGroup">
            <ButtonGroup aria-label="Buttons per page">
                {itemsPerPage.map(number => (
                    <Button
                        class="btn btn-outline-primary"
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
