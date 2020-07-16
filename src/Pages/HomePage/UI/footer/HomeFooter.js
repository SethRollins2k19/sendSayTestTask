import React, {useEffect} from "react";
import "../../style/HomePageFooterStyle.css";
import {useDispatch, useSelector} from "react-redux";
import {formatRequest, userRequest} from "../../../../Actions/UserAction";
import {Button} from "../../../../Components/Button";
import {CHECK_VALIDATION} from "../../../../Actions/TextAreaAction";
import {Loading} from "../../../AuthPage/UI/Loading";

const Footer = () => {
    const dispatch = useDispatch();
    const {validation, string, fetching} = useSelector(state => state.TextArea);
    useEffect(() => {
        if (validation) return;
        dispatch({
            type: CHECK_VALIDATION,
            value: true
        })
    }, [string]);
    return (
        <footer className="footer">
            <div>
                {
                    fetching ?
                        <Button type={"button"} additionalClassName={`auth-form-wrapper__submit--loading`}>
                            <Loading/>
                        </Button> :
                        <Button type="submit" isDisabled={!validation} onClick={async e => {
                            if (validation) {
                                dispatch(userRequest(string));
                            }
                        }}>
                            Отправить
                        </Button>
                }
            </div>
            <div className="gh-link-wrapper">
                <a href="https://github.com/SethRollins2k19" className="gh-link-wrapper__link">@SethRollins2k19</a>
            </div>
            <div className="footer__format" tabIndex={6} onClick={e => {
                dispatch(formatRequest(string));
            }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.8">
                        <path d="M21 10H7" stroke="#0D0D0D" strokeWidth="2" strokeLinecap="round"
                              strokeLinejoin="round"/>
                        <path d="M11 6H3" stroke="#0D0D0D" strokeWidth="2" strokeLinecap="round"
                              strokeLinejoin="round"/>
                        <path d="M12 14H7" stroke="#0D0D0D" strokeWidth="2" strokeLinecap="round"
                              strokeLinejoin="round"/>
                        <path d="M7 18H3" stroke="#0D0D0D" strokeWidth="2" strokeLinecap="round"
                              strokeLinejoin="round"/>
                    </g>
                </svg>
                <span className="footer__text">
                    Форматировать
                </span>
            </div>
        </footer>
    )
};


export {
    Footer
}
