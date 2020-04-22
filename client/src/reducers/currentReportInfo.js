let initState = {};

const currentReportInfo = (state = initState, action) => {

    switch (action.type) {
        case 'ADD_REPORT_INFO':
            return Object.assign({}, state, action.report);
        case 'UPDATE_REPORT':
            return Object.assign({}, state, action.newData);

        default:
            return state
    }
};
export default currentReportInfo
