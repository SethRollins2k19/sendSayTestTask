import React from "react";
import {useSelector} from "react-redux";
import PropTypes from "prop-types";


const UserData = ({isMobile}) => {
    const {email, subLogin} = useSelector(state => state.User);

    return (
        <div className={`user-wrapper ${isMobile? "user-wrapper--mobile" : ""}`}>
            {email}<span className="user-wrapper__semicolon">:</span>{subLogin}
        </div>
    )
};

UserData.propTypes = {
    isMobile: PropTypes.bool
};

UserData.defaultProps = {
    isMobile: false
}


export {
    UserData
}
