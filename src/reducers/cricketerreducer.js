import { ADD_CRICKETER, FETCH_CRICKETERS, DELETE_CRICKETER } from '../cricketers/cricketer.types'

const initialState = { cricketers: [] }
export default function userreducer(state = initialState, action) {
    switch (action.type) {
        case ADD_CRICKETER:
            return {
                cricketers: [...state.cricketers, action.payload]
            };
        case FETCH_CRICKETERS:
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