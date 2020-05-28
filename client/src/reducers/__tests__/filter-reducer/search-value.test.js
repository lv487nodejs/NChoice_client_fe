import React from 'react';
import filter from '../../Filter-reducer';

import { setSearchValue, setCatalogFilter, clearFilter } from '../../../actions';

describe('filter-reducer: CLEAR_FIELD (searchValue) type:', () => {
    let state, newState, action, fakeAction;

    beforeEach(() => {
        action = setSearchValue('newSearchValue')
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

    it('should to change state.searchTerm value to the new value', () => {
        expect(newState).toStrictEqual({...state, searchValue: 'newSearchValue'});
        expect(newState.searchValue.length).toBe('newSearchValue'.length);
    })

    it('should to replace from state.searchTerm value to empty string', () => {
        action = setSearchValue('');
        newState = filter(state, action)
        expect(newState).toStrictEqual({...state})
        expect(newState.searchValue).toBe('')
        expect(newState.searchValue).toBeFalsy()
    })

    it('other state fields shouldn‘t to change', () => {
        state = {
            brand: ['Prada'],
            products: ['Jeans'],
            category: ['Women'],
            color: ['Blue'],
            catalogFilter: 'null',
            searchTerm: 'null',
            searchValue: '',
        };

        //ADDING
        newState = filter(state, action);
        expect(newState).toStrictEqual({...state, searchValue: 'newSearchValue'})
        expect(newState.searchValue).toBe('newSearchValue')
        expect(newState.color.length).toBe(1);
        expect(newState.category[0]).toEqual('Women');

        //REMOVING
        action = setSearchValue('');
        newState = filter(state, action)
        expect(newState).toStrictEqual({...state});
        expect(newState.color.includes('Blue')).toStrictEqual(state.color.includes('Blue'));
        expect(newState.color.length).toBe(1);
    })
})
