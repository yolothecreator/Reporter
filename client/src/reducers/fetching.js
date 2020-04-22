let initState = {
    fetchingToCreate: false,
    fetchingToLoad: false,
    fetchingToUpdate: false,
    fetchingToDelete: false
};

const reports = (state = initState, action) => {

    switch (action.type) {
        case 'START_FETCHING_TO_DELETE':
            return Object.assign({}, state, {
                fetchingToDelete: true
            });
        case 'END_FETCHING_TO_DELETE':
            return Object.assign({}, state, {
                fetchingToDelete: false
            });
        case 'START_FETCHING_TO_CREATE':
            return Object.assign({}, state, {
                fetchingToCreate: true
            });
        case 'END_FETCHING_TO_CREATE':
            return Object.assign({}, state, {
                fetchingToCreate: false
            });
        case 'START_FETCHING_TO_LOAD':
            return Object.assign({}, state, {
                fetchingToLoad: true
            });
        case 'END_FETCHING_TO_LOAD':
            return Object.assign({}, state, {
                fetchingToLoad: false
            });
        case 'START_FETCHING_TO_UPDATE':
            return Object.assign({}, state, {
                fetchingToUpdate: true
            });
        case 'END_FETCHING_TO_UPDATE':
            return Object.assign({}, state, {
                fetchingToUpdate: false
            });

        default:
            return state
    }
};
export default reports
