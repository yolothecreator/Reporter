let initState = [];

const reports = (state = initState, action) => {

    switch (action.type) {
        case 'SET_STORE':
            console.log("Action: ", action);
            return Object.assign({}, state, action.store);

        case 'ADD_REPORTS':
            console.log("Action: ", action.reports);
            return [...action.reports];

        default:
            return state
    }
};
export default reports
