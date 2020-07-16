import React, {useEffect, useRef, useState} from "react";
import "../../../style/HomePageHistoryRequestStyle.css";
import {copyToClipboard, parseToJSONViewResponse} from "../../../help/help";
import {useDispatch, useSelector} from "react-redux";
import {deleteAllRequest, deleteRequest, userRequest} from "../../../../../Actions/UserAction";
import {CHANGE_STRING} from "../../../../../Actions/TextAreaAction";

const HistoryRequest = () => {
    const {historyRequest} = useSelector(state => state.User);
    const dispatch = useDispatch();
    return (
        <div className="history-request">
            <HistoryRequestList historyRequest={historyRequest}/>
            <div className="history-request__close" onClick={e => {
                dispatch(deleteAllRequest);
            }}>
                <svg className="history-request__svg-close" width="30" height="30" viewBox="0 0 24 24" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.8">
                        <path d="M3 3L21 21" stroke="#0D0D0D" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M21 3L3 21" stroke="#0D0D0D" strokeWidth="2" strokeLinecap="round"/>
                    </g>
                </svg>
            </div>
        </div>
    )
};

const HistoryRequestList = ({historyRequest}) => {
    const [currentPos, setCurrentPos] = useState(0);
    return (
        <div className="history-request__wrapper">
            <div className="history-request__wrapper-inner"
                 style={{transform: `translate3d(${currentPos}px, 0px, 0px)`}} onWheel={e => {
                let scrollWidth = document.querySelector(".history-request__wrapper-inner").scrollWidth;
                let parentWidth = document.querySelector(".history-request__wrapper-inner").offsetWidth;

                let delta = e.deltaY;
                if (currentPos + delta / 5 > 0) {
                    setCurrentPos(0)
                } else {
                    let temp = currentPos + e.deltaY / 5;
                    if (-temp > scrollWidth - parentWidth) {
                        setCurrentPos(-(scrollWidth - parentWidth))
                    } else {
                        setCurrentPos(temp);
                    }
                }
            }}>
                {
                    historyRequest.map((item, index) => {
                        return <HistoryRequestListItem key={index} requestItem={item}/>
                    })
                }
            </div>
        </div>
    )
}


const HistoryRequestListItem = ({requestItem}) => {
    const dispatch = useDispatch();
    const {status, action = `some.action`, JSON: json, id} = requestItem;
    const [isOpen, setIsOpen] = useState(false);
    const [direction, setDirection] = useState(false);
    const [isCopyShow, setIsCopyShow] = useState(false);
    useEffect(() => {
        if (!isCopyShow) return;
        const timer = setTimeout(() => {
            setIsCopyShow(false);
        }, 2000);
        return () => clearTimeout(timer)
    }, [isCopyShow]);

    return (
        <div className="history-request__item-wrapper"
             onClick={(e) => {
                 if (e.target.getBoundingClientRect().x >= 140) {
                     setDirection(true)
                 } else {
                     setDirection(false)
                 }
                 setIsOpen(!isOpen)
             }}
        >
            <div className="history-request__item" tabIndex={2}
                 onBlur={e => {
                     setIsOpen(false);
                 }}>
                <div>
                    {status ?
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="5" cy="5" r="5" fill="#30B800"/>
                            <circle cx="5" cy="5" r="4.5" stroke="black" strokeOpacity="0.2"/>
                        </svg>
                        :
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="5" cy="5" r="5" fill="#CF2C00"/>
                            <circle cx="5" cy="5" r="4.5" stroke="black" strokeOpacity="0.2"/>
                        </svg>

                    }
                </div>
                <span className="history-request__text">{action}</span>
                <svg className="history-request__item-detail" width="4" height="18" viewBox="0 0 4 18" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <circle cx="2" cy="2" r="2" fill="black" fillOpacity="0.2"/>
                    <circle cx="2" cy="9" r="2" fill="black" fillOpacity="0.2"/>
                    <circle cx="2" cy="16" r="2" fill="black" fillOpacity="0.2"/>
                </svg>
                <div
                    className={`history-request__dropdown ${isOpen ? "history-request__dropdown--active" : ""} ${direction ? "history-request__dropdown--right" : "history-request__dropdown--left"}`}>
                    <div className="history-request__dropdown-item" onClick={async e => {
                        await dispatch(deleteRequest(id));
                        await dispatch({
                            type: CHANGE_STRING,
                            value: "{\n" + parseToJSONViewResponse(json) + "\n}"
                        });
                        await dispatch(userRequest(JSON.stringify(json)));
                    }}>Выполнить
                    </div>
                    <div className="history-request__dropdown-item history-request__dropdown-item--copy"
                         onClick={() => {
                             setIsCopyShow(true);
                             copyToClipboard("{\n" + parseToJSONViewResponse(json) + "\n}");
                         }}>Скопировать
                    </div>
                    <div className="history-request__dropdown-item--last-item">
                        <div className="history-request__dropdown-item history-request__dropdown-item--delete"
                             onClick={e => {
                                 dispatch(deleteRequest(id))
                             }}>
                            Удалить
                        </div>
                    </div>
                </div>
                {
                    isCopyShow ?
                        <div className={`history-request__event-copy`}>
                            Скопировано
                        </div>
                        : ""
                }
            </div>
        </div>
    )
};


export {
    HistoryRequest
}
