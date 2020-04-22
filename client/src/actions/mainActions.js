import fetch from 'isomorphic-fetch';

const STORE_FETCHING_SUCCESS = "STORE_FETCHING_SUCCESS";
const SET_STORE = "SET_STORE";
export const initStore = () => dispatch => {

    try {
        fetch('/api/reduxStore/init', {
            credentials: "same-origin"
        })
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then((store) => {
                if (typeof store === "object") {
                    dispatch({
                        type: SET_STORE,
                        store: store
                    });
                    dispatch({type: STORE_FETCHING_SUCCESS});
                }
            })
    } catch (err) {
        console.error("err", err)
    }
};

export const deleteReportsByIds = (ids) => dispatch => {
    let formData = new FormData();
    formData.append("reportsIds", ids);

    dispatch({
        type: "START_FETCHING_TO_DELETE"
    });
    fetch(
        '/api/reports/delete/byIds',
        {
            method: "POST",
            body: formData
        }
    ).then((response) => {
        if (response.status !== 200) {
            throw new Error("Bad response from server!");
        }
    });

    dispatch({
        type: "END_FETCHING_TO_DELETE"
    });

};

export const updateReport = (reportId, reportConfiguration) => dispatch => {
    let formData = new FormData();
    formData.append("id", reportId);
    formData.append("theme", reportConfiguration.theme);
    formData.append("speaker", reportConfiguration.speaker);
    formData.append("date", reportConfiguration.date);

    dispatch({
        type: "START_FETCHING_TO_UPDATE"
    });
    fetch(
        '/api/reports/update',
        {
            method: "POST",
            body: formData
        }
    ).then((response) => {
        if (response.status !== 200) {
            throw new Error("Bad response from server!")
        }
        dispatch({
            type: "REPORT_SAVED_OR_UPDATED",
            showMessage: true,
            message: "Report updated!"
        })
    });

    dispatch({
        type: "END_FETCHING_TO_DELETE"
    });
};

export const saveNewReport = (reportConfiguration) => dispatch => {
    let formData = new FormData();
    formData.append("theme", reportConfiguration.theme);
    formData.append("speaker", reportConfiguration.speaker);
    formData.append("date", reportConfiguration.date);

    dispatch({
        type: "START_FETCHING_TO_CREATE"
    });

    fetch(
        '/api/reports/new',
        {
            method: "POST",
            body: formData
        }
    ).then((response) => {
        if (response.status !== 200) {
            throw new Error("Bad response from server!")
        }
        dispatch({
            type: "REPORT_SAVED_OR_UPDATED",
            showMessage: true,
            message: "Report saved!"
        })
    })

    dispatch({
        type: "END_FETCHING_TO_CREATE"
    });
};

export const loadReportById = (id) => dispatch => {
    let formData = new FormData();
    formData.append("reportId", id);

    dispatch({
        type: "START_FETCHING_TO_LOAD"
    });
    fetch(
        '/api/reports/byId',
        {
            method: "POST",
            body: formData
        }
    ).then((response) => {
            if (response.status !== 200) {
                throw new Error("Bad response from server!");
            }
            return response.json();
        }
    ).then(report => {
        dispatch({
            type: "ADD_REPORT_INFO",
            report: report
        });
    });

    dispatch({
        type: "END_FETCHING_TO_LOAD"
    });
};

export const loadAllReports = () => dispatch => {
    dispatch({
        type: "START_FETCHING_TO_LOAD"
    });

    fetch(
        '/api/reports/all',
        {
            method: "GET",
        }
    ).then((response) => {
            if (response.status !== 200) {
                throw new Error("Bad response from server!");
            }
            return response.json();
        }
    ).then(reports => {
        dispatch({
            type: "ADD_REPORTS",
            reports: reports
        });
    });

    dispatch({
        type: "END_FETCHING_TO_LOAD"
    });
};