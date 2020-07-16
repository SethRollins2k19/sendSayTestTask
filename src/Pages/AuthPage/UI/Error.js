import React from "react";
import PropTypes from "prop-types";

//styles related to it in AuthFormStyle

const Error = ({text}) => {
    return (
        <div className="error-wrapper">
            <div className="error-wrapper__title">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.8">
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#CF2C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8 15H16" stroke="#CF2C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9 9H9.01" stroke="#CF2C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M15 9H15.01" stroke="#CF2C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </g>
                </svg>
                <span>
                    Вход не вышел
                </span>
            </div>
            <div className="error-wrapper__subtitle">
                {text}
            </div>
        </div>
    )
};

Error.propTypes = {
    text: PropTypes.string
};
Error.defaultProps = {
    text: ""
};

export {
    Error
}
