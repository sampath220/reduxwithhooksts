import axios from 'axios';
import Cricketer from '../models/Cricketer'

import { ADD_CRICKETER, FETCH_CRICKETERS, DELETE_CRICKETER, UPDATE_CRICKETER } from './cricketer.types';

export const addcricketer = (cricketer: Cricketer, user: any) => {
    return async (dispatch: any, getstate: any) => {
        const store = getstate();
        const existinglist = store.cricketerdata.cricketers;
        const existingcricketer = existinglist.find((e: Cricketer) => e.name === cricketer.name && e.country === cricketer.country);

        if (existingcricketer) {
            if (existingcricketer.users.indexOf(user.id) === -1) {
                var existingCricketerResponse = await axios.put('http://localhost:3000/cricketers/' + existingcricketer.id + '/', {
                    name: existingcricketer.name,
                    country: existingcricketer.country,
                    image:existingcricketer.image,
                    users: [...existingcricketer.users, user.id]
                })
                const indx = existinglist.indexOf(existingcricketer)
                existinglist[indx] = existingCricketerResponse.data;
                dispatch({
                    type: UPDATE_CRICKETER,
                    payload: existinglist
                })
            }
            else {
                alert("already exists")
            }
        }
        else {
            console.log(cricketer)
            var res = await axios.post('http://localhost:3000/cricketers', {
                name: cricketer.name,
                country: cricketer.country,
                image: cricketer.image,
                users: [user.id]
            })
            dispatch({
                type: ADD_CRICKETER,
                payload: res.data
            })
        }
    }
}

export const fetchcricketers = () => {
    return async (dispatch: any) => {
        try {
            var res = await axios.get('http://localhost:3000/cricketers')
            dispatch({
                type: FETCH_CRICKETERS,
                payload: res.data
            })
        }
        catch (res) { alert("invalid") };
    }
}

export function deleteCricketer(cricketer: Cricketer, user: any) {
    return async (dispatch: any, getstate: any) => {
        const state = getstate();
        if (cricketer.users.length > 1) {
            const existinglist = state.cricketerdata.cricketers;
            const updatedUsers = cricketer.users.filter((t: Cricketer) => t !== user.logindata.id)
            var res = await axios.put('http://localhost:3000/cricketers/' + cricketer.id + '/', {
                name: cricketer.name,
                country: cricketer.country,
                users: [...updatedUsers]
            })
            const indx = existinglist.indexOf(cricketer)
            existinglist[indx] = res.data;
            dispatch({
                type: UPDATE_CRICKETER,
                payload: existinglist
            })
        }
        else {
            res = await axios.delete(`http://localhost:3000/cricketers/` + cricketer.id, {
            })
            const cricketers = state.cricketerdata.cricketers;
            var currentCricketers = cricketers.filter((t: Cricketer) => t.id !== cricketer.id);
            dispatch({
                type: DELETE_CRICKETER,
                payload: currentCricketers
            });
        }
    }
}