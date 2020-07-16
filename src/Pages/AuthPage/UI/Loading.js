import React from "react";
import "../style/LoadingStyle.css"
import PropTypes from "prop-types";


const Loading = ({width, height}) => {
    return (
        <div className="loading bar" style={{width: `${width}px`, height: `${height}px`}}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
};

Loading.propTypes = {
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
Loading.defaultProps = {
    width: 45,
    height: 40
}

export {
    Loading
}
