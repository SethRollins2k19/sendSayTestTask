import React from "react";
import PropTypes from "prop-types";

//styles related to it in AuthFormStyle

const AuthInput = ({title, type, setter, value, isRequired, isValidate}) => {
    return (
        <label className="input-wrapper">
            <div className="input-wrapper__title">
                <span className={`input-wrapper__title-text ${isValidate ? "" : "input-wrapper__title-text--invalidate"}`}>
                    {title}
                </span>
                <span className="input-wrapper__title-text--optional">
                    {isRequired ? "" : "Опционально"}
                </span>
            </div>
            <input className={`input-wrapper__inner ${isValidate ? "" : "input-wrapper__inner--invalidate"}`}
                   type={type}
                   onChange={e => setter(e.target.value)}
                   value={value}
                   />
        </label>
    )
};


AuthInput.propTypes = {
    title: PropTypes.string,
    type: PropTypes.string,
    setter: PropTypes.func,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    isRequired: PropTypes.bool,
    isValidate: PropTypes.bool
};

AuthInput.defaultProps = {
    title: "Input",
    type: "text",
    setter: (e) => {},
    value: "some text",
    isRequired: false,
    isValidate: true,
};


export {
    AuthInput
}
