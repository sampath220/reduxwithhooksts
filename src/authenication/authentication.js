import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginuser } from '../authenication/authenication.action'
import { Redirect } from 'react-router-dom';
const Authentication = () => {
    const [user, setuser] = useState({ email: '', password: '' });
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setuser({ ...user, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginuser(user));
        setuser({ email: '', password: '' })
    }
    let login = useSelector((state) => state.user.login)
    return (
        <div>
            {login ? <Redirect to="/" /> :
                <form onSubmit={handleSubmit}>
                    <input type="email" name="email" value={user.email} placeholder="Enter your email" onChange={handleChange} required></input><br></br>
                    <input type="password" value={user.password} name="password" placeholder="enter password" onChange={handleChange} required></input><br></br>
                    <button>submit</button>
                </form>
            }
        </div>
    )
}
export default Authentication;