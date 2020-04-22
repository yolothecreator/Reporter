//third party libraries
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
//QA Point components
import {initStore} from "./actions/mainActions";
import Loader from "./components/Loader";
//actions

const withInitStore = (WrappedComponent) => {

    class StoreInitializer extends React.PureComponent {

        componentDidMount = () => {

            const {onInitStore} = this.props;

            onInitStore();
        };

        render() {
            const {storeIsInit} = this.props;

            switch (true) {

                case !storeIsInit:
                    return <Loader label={"Loading store..."}/>;
                default:
                    return storeIsInit ? <WrappedComponent/> : null;
            }
        }
    }

    StoreInitializer.propTypes = {
        //mapStateToProps
        storeIsInit: PropTypes.bool.isRequired,
        //mapDispatchToProps
        onInitStore: PropTypes.func.isRequired
    };
    return connect(mapStateToProps, mapDispatchToProps)(StoreInitializer)
};

const mapStateToProps = (state) => {
    return {
        storeIsInit: state.storeIsInit
    }
};
const mapDispatchToProps = (dispatch) => {
    return ({
        onInitStore: () =>{
            return dispatch(initStore())
        }
    })
};

export default withInitStore
