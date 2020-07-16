import {connect} from "react-redux";
import React from "react";
import {getSessionFromCookie} from "../Actions/UserAction";
import {HomePage} from "../Pages/HomePage/HomePage";
import {AuthPage} from "../Pages/AuthPage/AuthPage";


const mapStateToProps = state => {
    const {isAuth} = state.User;
    return {
        isAuth,
    }
};


const mapDispatchToProps = dispatch => {
    return {
        getSession: () => dispatch(getSessionFromCookie)
    }
};









class MainContainer extends React.Component{
    componentDidMount() {
        this.props.getSession();
    }

    render() {
        const isAuth = this.props.isAuth;
        return (
            <div>
                {
                    isAuth ?
                        <HomePage/>
                        :
                        <AuthPage/>
                }
            </div>
        );
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(MainContainer);
