import axios from 'axios';

import { ADD_CRICKETER, FETCH_CRICKETERS, DELETE_CRICKETER } from './cricketer.types';

export const addcricketer = (cricketer, user) => {
    return function (dispatch) {
        axios.post('http://localhost:3000/users/' + user.logindata.id + '/cricketers', {
            name: cricketer.name,
            country: cricketer.country
        })
            .then(res => dispatch({
                type: ADD_CRICKETER,
                payload: res.data
            }))
            .catch(res => alert("invalid"));
    }
}

export const fetchcricketers = () => {
    return function (dispatch) {
        axios.get('http://localhost:3000/cricketers')
            .then(res => dispatch({
                type: FETCH_CRICKETERS,
                payload: res.data
            }))
            .catch(res => alert("invalid"));
    }
}

export function deleteCricketer(cricketer) {
    return function (dispatch, getstate) {
        const state = getstate();
        axios.delete(`http://localhost:3000/cricketers/` + cricketer.id, {
        })
            .then(res => {
                const cricketers = state.cricketerdata.cricketers;
                // var removeIndex = cricketers.findIndex(cricketer => { return cricketer.id === deleteId });
                // console.log(removeIndex)
                // (removeIndex >= 0) && (cricketers.splice(removeIndex, 1));
                return cricketers.filter(t => t.id != cricketer.id);;
            }).then(cricketers => dispatch({
                type: DELETE_CRICKETER,
                payload: cricketers
            }));
    }
}