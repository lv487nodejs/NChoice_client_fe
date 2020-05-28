import React from 'react';
import filter from '../../Filter-reducer';

import {
    filterAddCategory,
    filterRemoveCategory,
    filterAddCategories,
    filterRemoveAllCategories
} from '../../../actions';


describe('filter-reducer ADD/REMOVE_CATEGORY(‘ES) type:', () => {
    let state, addAction, removeAction, fakeAction, category, newState;

    beforeEach(() => {
        category = 'Kid'
        addAction = filterAddCategories(category);
        removeAction = filterRemoveCategory(category);
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
        newState = filter(state, addAction);
    })

    it('should to return object', () => {
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

    it('should add to state category new value', () => {
        expect(newState).toStrictEqual({...state, category: [category]});
        expect(newState.category.length).toBe(1);
    })

    it('should remove from state category value', () => {
        state = filter(state, addAction)
        expect(state).toStrictEqual({...state, category: [category]});
        expect(state.category.length).toBe(1);

        newState = filter(state, removeAction);
        expect(newState).toStrictEqual({...state, category: []});
        expect(newState.category.length).toBe(0);
    })

    it('other state fields shouldn‘t to change', () => {
        state = {
            brand: ['Prada'],
            products: ['Jeans'],
            category: ['Women'],
            color: ['Blue'],
            catalogFilter: 'none',
            searchTerm: 'none',
            searchValue: 'none',
        };

        //ADDING
        newState = filter(state, addAction);
        expect(newState).toStrictEqual({...state, category: ['Women', 'Kid']})
        expect(newState.category.length).toBe(2);
        expect(newState.color[0]).toEqual('Blue');

        //REMOVING
        newState = filter(state, removeAction);
        expect(newState).toStrictEqual({...state});
        expect(!newState.category.includes(category)).not.toStrictEqual(state.category.includes(category));
        expect(newState.category.length).toBe(1);
    })

    it('should to replace all categories to one', () => {
        state = {
            brand: ['Prada'],
            products: ['Jeans'],
            category: ['Women', 'Kid', 'Men'],
            color: ['Blue'],
            catalogFilter: 'none',
            searchTerm: 'none',
            searchValue: 'none',
        };

        const action = filterAddCategory('Teens')
        newState = filter(state, action);
        expect(newState).toStrictEqual({...state, category: ['Teens']})
        expect(newState.category.length).toBe(1);
    })

    it('should to remove all categories', () => {
        state = {
            ...state,
            category: ['Women', 'Kid', 'Men']
        };

        const action = filterRemoveAllCategories()
        newState = filter(state, action);
        expect(newState).toStrictEqual({...state, category: []})
        expect(newState.category.length).toBe(0);
    })
})
