import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { deleteCricketer } from './cricketer.action';

export default function Displaycricketers() {
    let cricketers = useSelector((state) => state.cricketerdata.cricketers);
    const [selected, setCheckbox] = useState(false)
    let user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleDelete = (cricketer) => {
        ;
        dispatch(deleteCricketer(cricketer));
    }

    return (
        <div >
            {cricketers.length > 0 ? <h1>Cricketers list</h1> : <h1>Cricketers list is empty</h1>}
            {user.login && <p><input type="checkbox" name="isChecked" onChange={() => setCheckbox(!selected)} /> Display your favourites</p>}
            {cricketers.filter(cricketer => selected ? cricketer.userId == user.logindata.id : true).map(cricketer => {
                return <div style={{ textAlign: "left" }} key={cricketer.id}>
                    <p>Name : <b>{cricketer.name}</b></p>
                    <p>Country : <b>{cricketer.country}</b></p>
                    {selected && <button onClick={() => handleDelete(cricketer)}>Delete cricketer</button>}
                    <br />
                </div>
            })}
        </div>
    )
}
