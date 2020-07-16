import React from "react";
import "./style/HomePageStyle.css"
import {Header} from "./UI/header/HomeHeader";
import {Main} from "./UI/main/HomeMain";
import {Footer} from "./UI/footer/HomeFooter";





class HomePage extends React.Component {
    render() {
        return (
            <div className="home-page-wrapper">
                <Header/>
                <Main/>
                <Footer/>
            </div>
        );
    }
}



export {
    HomePage
}
