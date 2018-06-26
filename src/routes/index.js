import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LoginPage from '../views/LoginPage/LoginPage.js';
import TimeCard from '../views/TimeCard/TimeCard.js';
import Error404 from '../views/Error/404.js';
import Error401 from '../views/Error/401.js';
import { Admin } from '../views/Admin/';
import User from '../views/Employee/Header';

class Index extends Component {
    
    render () {
        return (
        <Router>
            <Switch>
                <Route path="/" component={ LoginPage } exact/> 
                <Route path="/timecard" component={ TimeCard } exact />    
                <Route path="/admin" component={ Admin }  />
                <Route path="/user" component={ User }  />
                <Route path="/401" component={ Error401 } exact /> 
                <Route component={ Error404 } />
            </Switch>
        </Router>
        )
    }
}

export default Index