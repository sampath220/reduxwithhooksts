import React, { useState, useEffect, Suspense, lazy } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { addcricketer, fetchcricketers } from '../cricketers/cricketer.action';
import Displaycricketers from './displaycricketers';
import '../App.css';
import { logout } from '../authenication/authenication.action';
import Axios from 'axios';


export default function Addcricketer() {
    let user = useSelector((state: any) => state.user);
    const [cricketer, setcricketer] = useState({ name: '', country: '', image: '' })
    const dispatch = useDispatch();
    // const Displaycricketers = lazy(() => import("./displaycricketers"))
    var uploadInput: any;
    const handleChange = (e: any) => {
        setcricketer({ ...cricketer, [e.target.name]: e.target.value });
    }
    useEffect(() => {
        dispatch(fetchcricketers());
    }, []);
    const capitalizeFirstLetter = (string: String) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const handleUpload = (e: any) => {
        const data = new FormData();
        data.append('myfile', uploadInput.files[0]);
        Axios.post("http://localhost:2000/addPhoto", data).then(res => setcricketer({ ...cricketer, image: res.data }))
    }
    const handleSubmit = (e: any) => {
        e.preventDefault();
        uploadInput="";
        dispatch(addcricketer({ name: capitalizeFirstLetter(cricketer.name), country: capitalizeFirstLetter(cricketer.country), image: cricketer.image }, user.logindata))
        setcricketer({ name: '', country: '', image: '' })
    }
    return (
        <div >
            {!user.login ? <div> <b>To add your favourite cricketers please login....</b><Link style={{ textDecoration: "none", padding: "0.5rem" }} to="/authentication" id="link">Login</Link></div> :
                <div >
                    <div className="container" style={{ width: "500px", float: "left" }}>
                        <h1>Add your favourite cricketers</h1>
                        <form onSubmit={handleSubmit} style={{}}>
                            <div className="input">
                                <label>cricketer name : </label>
                                <input type="text" name="name" required value={cricketer.name} onChange={handleChange}></input>
                            </div>
                            <br />
                            <div>
                                <label>country name : </label>
                                <input type="text" name="country" required value={cricketer.country} onChange={handleChange}></input>
                            </div>
                            <br />
                            <div>
                                <label>add picture </label>
                                <input type="file" name="picture" required accept={"image/*"} ref={(ref) => { uploadInput = ref; }} onChange={handleUpload}></input>
                            </div>
                            <br />
                            <div >
                                <button >Submit</button>
                            </div>
                        </form>
                        <br /><br />
                    </div>
                    <div style={{ padding: "5px", float: "right" }}>
                        <button onClick={() => dispatch(logout())}>logout</button>
                    </div>
                </div>

            }
            <Displaycricketers />
        </div>
    )
}
