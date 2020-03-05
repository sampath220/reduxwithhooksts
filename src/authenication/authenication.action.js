
import axios from 'axios';
import { ADD_USER, LOGOUT } from './authentication.types';

export const loginuser = (user) => {
    return function (dispatch) {
        axios.get('http://localhost:3000/users?email=' + user.email)
            .then(res => {
                if (res.data.length == 0) {
                    axios.post('http://localhost:3000/users', {
                        email: user.email,
                        password: user.password,
                        cricketers: []
                    }).then(postresponse => dispatch({
                        type: ADD_USER,
                        payload: {
                            logindata: { ...user, id: postresponse.data.id },
                            login: true
                        }
                    }))
                        .catch(res => alert("invalid"));
                }
                else if (res.data[0].password == user.password) {
                    dispatch({
                        type: ADD_USER,
                        payload: {
                            logindata: { ...user, id: res.data[0].id },
                            login: true
                        }
                    })
                }
                else {
                    alert("invalid login")
                }
            })

    }
}

export const logout = () => {
    return function (dispatch) {
        dispatch({
            type: LOGOUT,
            payload: {
                logindata: {},
                login: false
            }
        })

    }
}