import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addcricketer, fetchcricketers, deleteCricketer } from './cricketer.action'
import Displaycricketers from './displaycricketers';
import '../App.css';
import { logout } from '../authenication/authenication.action';

export default function Addcricketer() {
    let user = useSelector((state) => state.user);
    const [cricketer, setcricketer] = useState({ name: '', country: '' })
    const dispatch = useDispatch();
    const handleChange = (e) => {
        setcricketer({ ...cricketer, [e.target.name]: e.target.value });
    }
    useEffect(() => {
        dispatch(fetchcricketers());
    }, [user.login]);
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addcricketer(cricketer, user))
        setcricketer({ name: '', country: '' })
    }
    return (
        <div >
            {!user.login ? <Link style={{ textDecoration: "none", padding: "0.9rem" }} to="/authentication" id="link">Login</Link> :
                <div style={{ position: "relative" }}>
                    <div >
                        <h1>Add your favourite cricketers</h1>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label>cricketer name : </label>
                                <input type="text" name="name" required value={cricketer.name} onChange={handleChange}></input>
                            </div>
                            <div>
                                <label>country name : </label>
                                <input type="text" name="country" required value={cricketer.country} onChange={handleChange}></input>
                            </div>
                            <br />
                            <div >
                                <button type="Submit">Submit</button>
                            </div>
                        </form>
                    </div>
                    <div style={{ marginLeft: "25%" }}>
                        <button onClick={() => dispatch(logout())}>logout</button>
                    </div>
                </div>

            }
            <Displaycricketers />
        </div>
    )
}
