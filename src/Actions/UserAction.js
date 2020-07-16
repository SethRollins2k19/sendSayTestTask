import Sendsay from 'sendsay-api';
import {CHANGE_RESPONSE, CHANGE_STRING, CHECK_VALIDATION, DATA_FETCHED, START_FETCH_DATA} from "./TextAreaAction";
import {parseToJSONViewResponse, validateJSON} from "../Pages/HomePage/help/help";

export const START_LOGIN = "START_LOGIN";
export const FETCH_LOGIN = "FETCH_LOGIN";
export const SET_USER_DATA = "SET_USER_DATA";
export const SET_NEW_REQUEST = "SET_NEW_REQUEST";
export const DELETE_REQUEST = "DELETE_REQUEST";
export const SET_HISTORY = "SET_HISTORY";
export const DELETE_REQUEST_ALL = "DELETE_REQUEST_ALL";

const sendsay = new Sendsay();
const {addRequest, deleteRequest,deleteAllRequest} = idCounter();

const getSessionFromCookie = dispatch => {
    sendsay.setSessionFromCookie();
    sendsay.request({
        action: "pong",
    }).then(res => {
        sendsay.request({
            action: 'sys.settings.get',
            list: [
                'about.name',
                'about.user',
                'about.owner.email',
            ],
        }).then(res => {
            dispatch({
                type: SET_USER_DATA,
                user: {
                    name: res.list['about.name'],
                    email: res.list['about.owner.email'][0],
                    subLogin: res.list['about.user']
                }
            })
        });
    }).catch(res => {
        document.cookie = "sendsay_session=";
    })

    // document.cookie.split(";").filter(item => item.split("=")[0] === "sendsay_session")
}
const authProcess = (login, password) => dispatch => {
    dispatch({type: START_LOGIN});
    sendsay.request({
        "action": "login",
        "login": login,
        "passwd": password
    }).then(res => {
        dispatch({
            type: FETCH_LOGIN,
            status: 200,
            explain: ""
        });
        document.cookie = `sendsay_session=${res.session}`;
        dispatch(getSessionFromCookie)
    }).catch(res => {
        dispatch({
            type: FETCH_LOGIN,
            status: 403,
            explain: JSON.stringify({id: res.id, explain: res.explain})
        })
    })
};


const logOut = dispatch => {
    sendsay.request({"action": "logout"}).then(res => {
        window.location.pathname = "/";
    })
}

const userRequest = (jsonString) => dispatch => {
    let validate = validateJSON(jsonString);
    dispatch({
        type: CHECK_VALIDATION,
        value: validate
    });
    if (validate) {
        dispatch({
            type: START_FETCH_DATA
        });
        let jsonBlock = JSON.parse(jsonString);
        sendsay.request(jsonBlock).then(async res => {
            await dispatch(addRequest(jsonBlock, jsonBlock.action,1));
            await dispatch({
                type: CHANGE_RESPONSE,
                value: res,
                error: 0
            });
            await dispatch({
                type: DATA_FETCHED
            });
        }).catch(res => {
            dispatch(addRequest(jsonBlock, jsonBlock.action,0));
            dispatch({
                type: CHANGE_RESPONSE,
                value: res,
                error: 1
            });
            dispatch({
                type: DATA_FETCHED
            });
        })
    }

};
const formatRequest = (jsonString) => dispatch => {
    let validate = validateJSON(jsonString);
    dispatch({
        type: CHECK_VALIDATION,
        value: validate
    });
    if (validate) {
        dispatch({
            type: CHANGE_STRING,
            value: "{\n" + parseToJSONViewResponse(JSON.parse(jsonString)) + "\n}"
        })
    }
};

const setHistoryFromStorage = dispatch => {
    let historyRQ = JSON.parse(localStorage.getItem("historyRQ"));
    let temp;
    if(historyRQ){
        temp = [...historyRQ];
    } else {
        temp = [];
    }
    dispatch({
        type: SET_HISTORY,
        hist: temp
    })
}

function idCounter() {
    const historyRequest = JSON.parse(localStorage.getItem("historyRQ"));
    let id;
    if(historyRequest){
        id = historyRequest.length - 1;
    } else {
        id = 0;
    }
    const addRequest = ( json, actionName, status) => dispatch => {
        id++;
        const historyRequest = JSON.parse(localStorage.getItem("historyRQ"));
        let temp;
        if (!historyRequest){
            temp = [];
        } else {
            temp = [...historyRequest];
        }
        let item = {
            id,
            action: actionName,
            JSON: json,
            status
        };
        temp = [item, ...temp.slice(0, 14)];
        dispatch({
            type: SET_NEW_REQUEST,
            request: item
        });
        localStorage.setItem("historyRQ", JSON.stringify(temp));
    };
    const deleteRequest = id => dispatch => {
        const historyRequest = JSON.parse(localStorage.getItem("historyRQ"));
        let temp;
        if (!historyRequest){
            temp = [];
        } else {
            temp = [...historyRequest];
        }
        dispatch({
            type: DELETE_REQUEST,
            id
        })
        localStorage.setItem("historyRQ", JSON.stringify(temp.filter(item => item.id !== id)));
    };
    const deleteAllRequest = dispatch => {
        localStorage.setItem("historyRQ", JSON.stringify([]));
        dispatch({
            type: DELETE_REQUEST_ALL
        })
    }

    return {
        addRequest,
        deleteRequest,
        deleteAllRequest
    }
}


export {
    authProcess,
    getSessionFromCookie,
    logOut,
    userRequest,
    formatRequest,
    addRequest,
    deleteRequest,
    setHistoryFromStorage,
    deleteAllRequest
}
