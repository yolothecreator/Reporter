import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../styles/reportsTable.css';
import {deleteReportsByIds, loadAllReports} from "../actions/mainActions";
import PropTypes from 'prop-types';

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Message} from "./Message";

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedReports: [],
            showMessage: false,
            showCreateNewReport: false,
            message: "",
        };

        this.props.loadAllReports();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.message !== prevState.message) {
            this.props.loadAllReports();
        }

    }

    deleteReports = () => {
        const selectedReports = this.state.selectedReports;
        if (selectedReports.length === 0) {
            this.setState({
                showMessage: true,
                message: "You have no selected reports!",
                className: "error-message",
            })
        } else {
            this.props.deleteReportsByIds(selectedReports.join());
            this.setState({
                showMessage: true,
                message: "Reports deleted!",
                className: "message",
            })
        }
    };

    createReports = () => {
        window.location.href = "/reports/new";
    };

    onSelect = (report, isSelect) => {
        let updatedSelectedReports;
        if (isSelect) {
            updatedSelectedReports = [...this.state.selectedReports, report.key];
        } else {
            updatedSelectedReports = this.state.selectedReports;
            let index = -1;
            for (let i = 0; i < updatedSelectedReports.length && index === -1; i++) {
                if (updatedSelectedReports[i] === report.key) index = i;
            }
            updatedSelectedReports.splice(index, 1);
        }

        this.setState({
            selectedReports: updatedSelectedReports,
            showMessage: false,
        })
    };

    onSelectAll = (isSelect) => {
        let updatedSelectedReports = [];
        if (isSelect) {
            updatedSelectedReports = this.props.reports.map(subscription => subscription.key);
        }
        this.setState({selectedReports: updatedSelectedReports})
    };

    formatter = (column) => (cell, report) => {
        switch (column) {
            case "theme": {
                return <a style={{width: "max-content"}} href={`/reports/edit/${report.key}`}
                          title={"Edit configuration"}>{cell}</a>;
            }
            default: {
                return cell
            }
        }
    };


    render() {
        const {reports} = this.props;

        const selectRow = {
            mode: 'checkbox',
            clickToSelect: true,
            onSelect: this.onSelect,
            onSelectAll: this.onSelectAll
        };

        return (
            <div style={{margin: "100px"}}>
                <h3 style={{textAlign: "center"}}>Welcome to My Reports!</h3>

                <div style={{marginTop: "20px"}}>
                    <BootstrapTable data={reports} selectRow={selectRow}>
                        <TableHeaderColumn dataField='key' isKey hidden hiddenOnInsert>
                            Do not fill
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField='theme'
                            dataFormat={this.formatter("theme")}
                            dataSort={true}
                        >
                            Theme
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField='speaker'
                            dataFormat={this.formatter("speaker")}
                            dataSort={true}
                        >
                            Speaker
                        </TableHeaderColumn>

                        <TableHeaderColumn
                            dataField='date'
                            dataFormat={this.formatter("date")}
                            dataSort={true}
                            sortFunc={this.sorter}
                        >
                            Date
                        </TableHeaderColumn>
                    </BootstrapTable>
                </div>

                <div style={{marginTop: 20, height: 50}}>
                    {
                        this.state.showMessage &&
                        <Message message={this.state.message} className={this.state.className}/>
                    }
                </div>

                <div id="buttons" style={{textAlign: "right", marginTop: "10px"}}>
                    <div id="createButton" style={{display: "inline"}}>
                        <button onClick={this.createReports}>Create report</button>
                    </div>
                    <div id="deleteButton" style={{display: "inline"}}>
                        <button onClick={this.deleteReports}>Delete report</button>
                    </div>
                </div>
            </div>
        );
    }
}

App.propTypes = {
    reports: PropTypes.array.isRequired,

    deleteReportsByIds: PropTypes.func,
    loadAllReports: PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        reports: !state.reports ? [] : state.reports,
        fetching: !state.fetching ? {} : state.fetching,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteReportsByIds: (ids) => {
            return dispatch(deleteReportsByIds(ids));
        },
        loadAllReports: () => {
            return dispatch(loadAllReports());
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

// export default App;