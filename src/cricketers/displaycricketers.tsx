import React, { useState, useEffect, Suspense, lazy } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { deleteCricketer } from './cricketer.action';
import '../App.css'
import Cricketer from 'src/models/Cricketer';
import Axios from 'axios';
export default function Displaycricketers() {
    let cricketers = useSelector((state: any) => state.cricketerdata.cricketers);
    const [selected, setCheckbox] = useState(false);
    const [sortCricketers, setSortCricketers] = useState(cricketers);
    const [sortType, setSortType] = useState('desc');
    const DisplayImage = lazy(() => import("./displayImage"));
    let user = useSelector((state: any) => state.user);
    const dispatch = useDispatch();
    const handleDelete = (cricketer: Cricketer) => {
        dispatch(deleteCricketer(cricketer, user));
    }
    useEffect(() => {
        if (!user.login) {
            setCheckbox(false)
        }
    }, [user.login]);
    const onSort = (e: any, column: string, order: string) => {
        const data = cricketers;
        data.sort(compareValues(column, order))
        setSortCricketers(data);
        setSortType(sortType === 'asc' ? 'desc' : 'asc')
    }
    function compareValues(key: string, order = 'asc') {
        return function innerSort(a: any, b: any) {
            if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) return 0;
            const comparison = a[key].localeCompare(b[key]);

            return (
                (order === 'desc') ? (comparison * -1) : comparison
            );
        };

    }
    return (
        <div style={{ display: "block", content: "", clear: "both" }}>
            {cricketers.length > 0 ? <div><h1>Cricketers list</h1>
                {user.login && <p style={{ float: "right", width: "500px", padding: "1px" }}><input type="checkbox" checked={selected} name="isChecked" onChange={(e) => { setCheckbox(e.target.checked) }} /> Display your favourites</p>}
                <br />
                <br />
                <table style={{ width: "50%", marginLeft: "15%", marginRight: "15%" }}>
                    <tbody>
                        <tr>
                            <th className="sort-by" onClick={e => onSort(e, 'name', sortType)}>Name</th>
                            <th className="sort-by" onClick={e => onSort(e, 'country', sortType)}>Country</th>
                            <th >Image</th>
                            {selected && <th></th>}
                        </tr>
                        {cricketers.filter((cricketer: Cricketer) => selected ? cricketer.users.indexOf(user.logindata.id) !== -1 : true).map((cricketer: Cricketer) => {
                            return <tr style={{ textAlign: "left" }} key={cricketer.id}>
                                <td>{cricketer.name}</td>
                                <td>{cricketer.country}</td>
                                <Suspense fallback={<><b>Loading...</b></>}>
                                    <td><DisplayImage image={cricketer.image} /></td>
                                </Suspense>
                                {selected && <td><button onClick={() => handleDelete(cricketer)}>Delete cricketer</button></td>}
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
                : <h1>Cricketers list is empty</h1>}
        </div>
    )
}
