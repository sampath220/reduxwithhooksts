import React, { useState, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginuser } from './authenication.action'
import { Redirect } from 'react-router-dom';
const Authentication = () => {
    const [user, setuser] = useState({ email: '', password: '' });
    const [status, setStatus] = useState('');
    const dispatch = useDispatch();

    const handleChange = (e: FormEvent<HTMLInputElement>) => {
        setuser({ ...user, [e.currentTarget.name]: e.currentTarget.value });
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            var res = await dispatch(loginuser(user));
        }
        catch (err) {
            setStatus(err);
        }
    }
    let login = useSelector((state: any) => state.user.login)
    return (
        <div className="container">
            {login ? <Redirect to="/" /> :
                <div>
                    <form onSubmit={handleSubmit}>
                        <input type="email" name="email" value={user.email} placeholder="Enter your email" onChange={handleChange} required></input><br></br>
                        <input type="password" value={user.password} name="password" placeholder="enter password" onChange={handleChange} required></input><br></br>
                        <button>submit</button>
                    </form>
                    {status && <h4>{status}</h4>}
                </div>
            }
        </div>
    )
}
export default Authentication;