import React from "react";
import {Logo} from "../../../../Components/Logo";
import {UserData} from "./UI/UserData";
import {LogOut} from "./UI/LogOut";
import {FullSizeToggle} from "./UI/FullSizeToggle";



const HeaderTop = () => {
    return (
        <div className="header-top">
            <div className="header-top__left">
                <Logo/>
                <p className="header-top__title">API-Консолька</p>
            </div>
            <div className="header-top__right">
                <UserData/>
                <LogOut/>
                <FullSizeToggle/>
            </div>
            <UserData isMobile={true}/>
        </div>
    )
};




export {
    HeaderTop
}
