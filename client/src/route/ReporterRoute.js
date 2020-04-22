//third party libraries
import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
//QA Point components
import App from "../components/App";
import CreateOrUpdateReport from "../components/CreateOrUpdateReport";

const ReporterRoute = () => {
    return (
        <Switch>
            <Route exact path='/' component={App}/>
            <Route exact path='/reports/new' component={CreateOrUpdateReport}/>
            <Route exact path='/reports/edit/:reportId' component={CreateOrUpdateReport}/>
        </Switch>
    )
};

export default withRouter(ReporterRoute)
