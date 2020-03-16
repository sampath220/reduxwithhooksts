import { ADD_USER, LOGOUT } from '../authenication/authentication.types';

const initialState = { logindata: {}, login: false }
export default function userreducer(state = initialState, action: any) {
    switch (action.type) {
        case ADD_USER:
            return {
                ...state,
                ...action.payload
            };
        case LOGOUT:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}