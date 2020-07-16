import React from "react";
import PropTypes from "prop-types";
import "./style/LogoStyle.css";



const Logo = ({img, text}) => {
    if(img){
        return <img src={img} alt="logo" className="logo"/>
    }
    return <div className="logo">{text}</div>
};


Logo.propTypes = {
    img: PropTypes.string,
    text: PropTypes.string
};

Logo.defaultProps = {
    img: null,
    text: "Logo"
};


export {
    Logo
}
