import React from 'react'
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom';
import Authentication from '../authenication/authentication';
import Addcricketer from '../cricketers/addcricketer'
import { useSelector } from 'react-redux';
const Routes = () => {
    let login = useSelector((state) => state.user.login)
    return (
        <Router>
            <Switch>
                <Route exact path="/authentication" component={Authentication} />
                <Route exact path="/" component={Addcricketer} />
            </Switch>
        </Router>
    )
}
export default Routes;
