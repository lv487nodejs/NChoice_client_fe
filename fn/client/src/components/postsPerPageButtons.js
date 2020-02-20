import React from 'react'
import { Button, ButtonGroup } from '@material-ui/core';

export default function PagesButtonGroup({changeItems,changeCurrentPage}) {
    const itemsPerPage = [15, 30, 60];
    const pickAmount = number => changeItems(number)
    return (
        <ButtonGroup variant="contained" aria-label="contained primary button group">
            {itemsPerPage.map(number => (
                <Button
                    key={number}
                    onClick={() => {
                        pickAmount(number);
                        changeCurrentPage()}}>
                    {number}
                </Button>))}
        </ButtonGroup>
    );
}
