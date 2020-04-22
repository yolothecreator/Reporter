import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import {BrowserRouter} from 'react-router-dom';
import configureStore from "./configureStore";

import './styles/index.css';
import './styles/bootstrap.css';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import ReporterRoute from "./route/ReporterRoute";


let store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <ReporterRoute/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
