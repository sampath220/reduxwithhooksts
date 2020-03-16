import {combineReducers} from 'redux';
import userReducer from './userreducer';
import cricketerreducer from './cricketerreducer';

export default combineReducers({
    user:userReducer,
    cricketerdata:cricketerreducer
})