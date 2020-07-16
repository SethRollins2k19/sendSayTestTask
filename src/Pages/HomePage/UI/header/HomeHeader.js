import React, {useEffect} from "react";
import {HeaderTop} from "./HeaderTop";
import {HeaderBottom} from "./HeaderBottom";
import "../../style/HomePageHeaderStyle.css"
import {useDispatch} from "react-redux";
import {setHistoryFromStorage} from "../../../../Actions/UserAction";
const Header = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setHistoryFromStorage)
    },[dispatch]);
    return (
        <header>
            <HeaderTop/>
            <HeaderBottom/>
        </header>
    )
};


export {
    Header
}
