import authReducer from '../../Auth-reducer';
import {setUser} from '../../../actions';

describe('auth-reducer SET_USER_LOGGED type:', () => {
    let state, action, fakeAction;

    beforeEach(() => {
        action = setUser('Elvis Presley');
        fakeAction = {type: 'FAKE_TYPE'};
        state = {
            userLogged: false,
            userLoading: false,
            user:{
                firstName: '',
                lastName: '',
                email: '',
                password:'',
            }
        };
    })

    it('should return object', () => {
        expect(typeof state).toStrictEqual('object');
    })

    it('should to be truthy', () => {
        const newState = authReducer(state, action);
        expect(newState).toBeTruthy();
    })

    it('shouldn‘t to be falsy and equal initial state', () => {
        const newState = authReducer(undefined, fakeAction);
        expect(newState).not.toBeFalsy();
        expect(newState).toStrictEqual(state);
    })

    it('should to be equal empty object', () => {
        const newState = authReducer(null, fakeAction);
        expect(newState).toStrictEqual({});
    })

    it('should return default state without changes', () => {
        const newState = authReducer(state, fakeAction);
        expect(newState).toStrictEqual(state);
    })

    it('should to change user value to "Chuck Norris"', () => {
        const user = 'Chuck Norris';
        action = setUser(user);
        const newState = authReducer(state, action);

        expect(newState).toStrictEqual({...state, user: user});
        expect(newState.user).toStrictEqual(user);
    })

    it('other state fields shouldn‘t to change and user becomes "Elvis Presley"', () => {
        state = {
            userLogged: true,
            userLoading: false,
            user:{
                firstName: 'David',
                lastName: 'Bowie',
            }
        };

        const newState = authReducer(state, action);
        const result = {
            ...state,
            user: action.payload
        };

        expect(newState).toStrictEqual(result)
        expect(newState.userLogged).toBe(result.userLogged)
        expect(typeof newState.user).toStrictEqual('string');
        expect(newState.user).toBe('Elvis Presley');

    })
})
