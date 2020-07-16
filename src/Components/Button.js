import React from "react";
import PropTypes from "prop-types";
import "./style/ButtonStyle.css";

const Button = ({isDisabled,type, children, additionalClassName, onClick}) => {
    return (
        <button type={type} onClick={onClick} className={`button ${isDisabled?"button--invalidate" : ""} ${additionalClassName}`}>
            {children}
        </button>
    )
};

Button.propTypes = {
    isDisabled: PropTypes.bool,
    type: PropTypes.string,
    additionalClassName: PropTypes.string,
    onClick: PropTypes.func
};

Button.defaultProps = {
    isDisabled: false,
    type: "button",
    additionalClassName: "",
    onClick: () => {},
};


export {
    Button
}
