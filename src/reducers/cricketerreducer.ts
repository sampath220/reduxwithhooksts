import { ADD_CRICKETER, FETCH_CRICKETERS, DELETE_CRICKETER, UPDATE_CRICKETER } from '../cricketers/cricketer.types'

const initialState = { cricketers: [] }
export default function userreducer(state = initialState, action: any) {
    switch (action.type) {
        case ADD_CRICKETER:
            return {
                cricketers: [...state.cricketers, action.payload]
            };
        case FETCH_CRICKETERS:
            return {
                cricketers: [...action.payload]
            };
        case UPDATE_CRICKETER:
            return {
                cricketers: [...action.payload]
            };
        case DELETE_CRICKETER:
            return {
                cricketers: [...action.payload]
            };
        default:
            return state
    }
}