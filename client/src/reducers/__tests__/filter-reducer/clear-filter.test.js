import React from 'react';
import filter from '../../Filter-reducer';

import { clearFilter } from '../../../actions';

describe('filter-reducer: CLEAR_FILTER type:', () => {
    let state, newState, action, fakeAction;

    beforeEach(() => {
        action = clearFilter();
        fakeAction = {type: 'FAKE_TYPE'};
        state = {
            brand: [],
            products: [],
            category: [],
            color: [],
            catalogFilter: '',
            searchTerm: '',
            searchValue: '',
        };
        newState = filter(state, action);
    })

    it('should return the object', () => {
        expect(typeof state).toStrictEqual('object');
    })

    it('should to be truthy', () => {
        expect(newState).toBeTruthy();
        expect(filter(state, fakeAction)).toBeTruthy();
    })

    it('shouldn‘t to be falsy', () => {
        newState = filter(undefined, fakeAction);
        expect(newState).not.toBeFalsy();
    })

    it('should to be null', () => {
        newState = filter(null, fakeAction);
        expect(newState).toBeNull();
    })

    it('should return default state without changes', () => {
        newState = filter(state, fakeAction);
        expect(newState).toStrictEqual(state);
    })

    it('should to clear all state props except products and catalogFilter', () => {
        newState = {
            brand: ['Prada'],
            products: ['Jeans'],
            category: ['Women'],
            color: ['Blue'],
            catalogFilter: 'Hello',
            searchTerm: 'null',
            searchValue: 'undefined',
        };

        expect(filter(newState, action)).toStrictEqual({...state, products: ['Jeans'], catalogFilter: 'Hello',})
        expect(filter(newState, action).products[0]).toEqual('Jeans');

    })
})
