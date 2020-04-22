import {combineReducers} from 'redux';
import reports from "./reducers/reports";
import currentReportInfo from "./reducers/currentReportInfo";
import responseHandler from "./reducers/responseHandler";
import fetching from "./reducers/fetching";

const rootReducer = combineReducers({
    storeIsInit: (state = false, action) => action.type === 'STORE_FETCHING_SUCCESS'? true: state,
    reports,
    currentReportInfo,
    responseHandler,
    fetching
});

export default rootReducer
