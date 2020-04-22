import React from 'react';

import logo from '../logo.svg';

import '../styles/loader.css';
import PropTypes from "prop-types";

const Loader = ({label})=> (
    <div className={"beautiful-loader"}>
        <p className={"loading-label"}>{label}</p>
        <div className={"round"}>
            <img className="loader-logo" src={logo} alt={"Loading..."}/>
        </div>
    </div>
);

Loader.propTypes = {
    label: PropTypes.string.isRequired
};

export default Loader;