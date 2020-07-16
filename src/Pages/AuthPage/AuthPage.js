import React from "react";
import "./style/AuthPageStyle.css";
import PropTypes from "prop-types";
import {AuthForm} from "./UI/AuthForm";
import {Logo} from "../../Components/Logo";

// component relate to page which will viewed when user is unauthorized
class AuthPage extends React.Component {
    render() {
        return (
            <div className="auth-page-wrapper">
                <Logo/>
                <AuthForm/>
                <div className="gh-link-wrapper">
                    <a href="https://github.com/SethRollins2k19" className="gh-link-wrapper__link">@SethRollins2k19</a>
                </div>
            </div>
        );
    }
}


export {
    AuthPage
}
