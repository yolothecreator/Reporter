let initState = {
    message: false
};

const responseHandler = (state = initState, action) => {

    switch (action.type) {
        case 'REPORT_SAVED_OR_UPDATED':
            return Object.assign({}, state, {
                showMessage: action.showMessage,
                message: action.message
            });

        default:
            return state
    }
};
export default responseHandler
