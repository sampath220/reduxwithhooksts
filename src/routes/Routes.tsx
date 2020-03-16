import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Authentication from '../authenication/authentication';
import Addcricketer from '../cricketers/addcricketer'
const Routes: React.FC = () => {
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
