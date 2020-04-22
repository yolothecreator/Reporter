import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../styles/reportsTable.css';
import {loadReportById, saveNewReport, updateReport} from "../actions/mainActions";
import PropTypes from "prop-types";
import {Message} from "./Message";

class CreateOrUpdateReport extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showError: false,
            errorMessage: ""
        };

        const {reportId} = this.props;

        if (reportId) {
            this.props.onLoadReportConfiguration(reportId);
        }
    };

    returnToMainPage = () => {
        window.location.href = "/";
    };

    onInput = (event) => {
        let inputId = event.target.id;

        this.setState({
            showError: false,
        });

        switch (inputId) {
            case "themeInput": {
                return this.props.onChangeReportConfigurationFieldValue({theme: event.target.value})
            }
            case "speakerInput": {
                return this.props.onChangeReportConfigurationFieldValue({speaker: event.target.value})
            }
            case "dateInput": {
                return this.props.onChangeReportConfigurationFieldValue({date: event.target.value})
            }
            default: {
                throw new Error("Wrong Input!");
            }
        }
    };

    isEmpty = (value) => {
        return !value || (value && value.trim() === "");
    };

    createNewReport = () => {
        const {currentReportInfo, reportId} = this.props;
        if (this.isEmpty(currentReportInfo.theme) || this.isEmpty(currentReportInfo.speaker) || this.isEmpty(currentReportInfo.date)) {
            this.setState({
                showError: true,
                errorMessage: "All fields must be filled!"
            })
        } else {
            if (this.isValidDate(currentReportInfo.date)) {
                if (reportId) {
                    this.props.onUpdateReport(reportId, currentReportInfo);
                } else {
                    this.props.onSaveNewReport(currentReportInfo);
                    this.props.onChangeReportConfigurationFieldValue({
                        theme: "",
                        speaker: "",
                        date: "",
                    });
                }
            } else {
                this.setState({
                    showError: true,
                    errorMessage: "Wrong data! Enter date with dd/MM/yyyy pattern!"
                })
            }
        }
    };

    isValidDate = (dateString) => {
        // First check for the pattern
        let regexp = new RegExp(
            "^([0-2][0-9]|(3)[0-1])(\\/)(((0)[0-9])|((1)[0-2]))(\\/)\\d{4}$"
        );

        if (dateString.trim().search(regexp) === -1)
            return false;

        let parts = dateString.split("/");
        let month = parseInt(parts[1], 10);
        let day = parseInt(parts[0], 10);
        let year = parseInt(parts[2], 10);

        if (year < 1000 || year > 3000 || month === 0 || month > 12)
            return false;

        let monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0))
            monthLength[1] = 29;

        return day > 0 && day <= monthLength[month - 1];
    };

    render() {
        const {reportId, currentReportInfo, responseHandler} = this.props;

        let buttonTitle = !reportId ? "Create New Report" : "Update Report Info";

        return (<div style={{margin: "100px", maxWidth: "1000"}}>
                <h3 style={{textAlign: "center"}}>Report configuration page</h3>

                <div style={{display: "table"}}>
                    <div style={{display: "table-row"}}>
                        <div style={{display: "table-cell", paddingRight: 10, paddingBottom: 10}}>
                            Theme:
                        </div>
                        <div style={{display: "table-cell"}}>
                            <input
                                id="themeInput"
                                onInput={this.onInput}
                                value={!currentReportInfo.theme ? "" : currentReportInfo.theme}
                            />
                        </div>
                    </div>
                    <div style={{display: "table-row"}}>
                        <div style={{display: "table-cell", paddingRight: 10, paddingBottom: 10}}>
                            Speaker:
                        </div>
                        <div style={{display: "table-cell"}}>
                            <input
                                id="speakerInput"
                                onInput={this.onInput}
                                value={!currentReportInfo.speaker ? "" : currentReportInfo.speaker}
                            />
                        </div>
                    </div>
                    <div style={{display: "table-row"}}>
                        <div style={{display: "table-cell", paddingRight: 10, paddingBottom: 10}}>
                            Date:
                        </div>
                        <div style={{display: "table-cell"}}>
                            <input
                                id="dateInput"
                                onInput={this.onInput}
                                value={!currentReportInfo.date ? "" : currentReportInfo.date}
                            />
                        </div>
                    </div>
                </div>

                <div style={{height: 40}}>
                    {
                        this.state.showError &&
                        <Message message={this.state.errorMessage} className={"error-message"}/>
                    }

                    {
                        responseHandler.showMessage &&
                        <Message message={responseHandler.message} className={"message"}/>
                    }
                </div>

                <div id="buttons" style={{textAlign: "right", marginTop: "40px"}}>
                    <div id="createButton" style={{display: "inline"}}>
                        <button onClick={this.createNewReport}>{buttonTitle}</button>
                    </div>
                    <div id="cancelButton" style={{display: "inline"}}>
                        <button onClick={this.returnToMainPage}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    }
}

CreateOrUpdateReport.propTypes = {
    reportId: PropTypes.string,
    currentReportInfo: PropTypes.object,
    responseHandler: PropTypes.object,

    onLoadReportConfiguration: PropTypes.func,
    onChangeReportConfigurationFieldValue: PropTypes.func,
    onSaveNewReport: PropTypes.func,
    onUpdateReport: PropTypes.func
};

const mapStateToProps = (state, ownProps) => {
    return {
        reportId: ownProps.match.params.reportId,
        currentReportInfo: !state.currentReportInfo ? {} : state.currentReportInfo,
        responseHandler: !state.responseHandler ? {} : state.responseHandler
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoadReportConfiguration: (id) => {
            return dispatch(loadReportById(id));
        },
        onChangeReportConfigurationFieldValue: (newData) => {
            return dispatch({
                type: "UPDATE_REPORT",
                newData: newData
            })
        },
        onSaveNewReport: (reportConfiguration) => {
            return dispatch(saveNewReport(reportConfiguration));
        },
        onUpdateReport: (reportId, reportConfiguration) => {
            return (dispatch(updateReport(reportId, reportConfiguration)));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateOrUpdateReport)
