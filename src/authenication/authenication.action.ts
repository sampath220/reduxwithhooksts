
import axios from 'axios';
import { ADD_USER, LOGOUT } from './authentication.types';

export const loginuser = (user: any): any => {
    return async (dispatch: any) => {
        try {
            var res = await axios.get('http://localhost:3000/users?email=' + user.email)
            if (res.data.length === 0) {
                var postresponse = await axios.post('http://localhost:3000/users', {
                    email: user.email,
                    password: user.password
                })
                dispatch({
                    type: ADD_USER,
                    payload: {
                        logindata: { ...user, id: postresponse.data.id },
                        login: true
                    }
                })
                return Promise.resolve("successfully logged")
            }
            else if (res.data[0].password === user.password) {
                dispatch({
                    type: ADD_USER,
                    payload: {
                        logindata: { ...user, id: res.data[0].id },
                        login: true
                    }
                })
                return Promise.resolve("Welcome back" + res.data[0].email)
            }
            else {
                return Promise.reject("invalid login")
            }
        }
        catch (err) {
            return Promise.reject("Network error")
        };
    }
}

export const logout = () => {
    return function (dispatch: any) {
        dispatch({
            type: LOGOUT,
            payload: {
                logindata: {},
                login: false
            }
        })

    }
}