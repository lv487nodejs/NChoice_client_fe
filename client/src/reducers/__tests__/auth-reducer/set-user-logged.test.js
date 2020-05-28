import authReducer from '../../Auth-reducer';
import {setUserLogged} from '../../../actions';

describe('auth-reducer SET_USER_LOGGED type:', () => {
    let state, action, fakeAction;

    beforeEach(() => {
        action = setUserLogged(true);
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

    it('should to change userLogged value to "hello"', () => {
        action = setUserLogged("hello");
        const newState = authReducer(state, action);

        expect(newState).toStrictEqual({...state, userLogged: "hello"});
        expect(newState.userLogged).toBe( "hello");
    })

    it('other state fields shouldn‘t to change and userLogged becomes true', () => {
        state = {
            userLogged: 'test',
            userLoading: false,
            user:{
                firstName: 'David',
                lastName: 'Bowie',
                email: 'd_bowie@gmail.com',
                password:'1234',
            }
        };

        const newState = authReducer(state, action);
        const result = {
            ...state,
            userLogged: true
        };

        expect(newState).toStrictEqual(result)
        expect(newState.userLogged).toBe(result.userLogged)
        expect(typeof newState.user).toStrictEqual('object');
        expect(newState.user).toStrictEqual(state.user);
    })
})
