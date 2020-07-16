import {
    DELETE_REQUEST, DELETE_REQUEST_ALL,
    FETCH_LOGIN,
    SET_HISTORY,
    SET_NEW_REQUEST,
    SET_USER_DATA,
    START_LOGIN
} from "../Actions/UserAction";

const UserReducer = (state = {
    fetching: false,
    fetched: false,
    status: 200,
    explain: "",
    isAuth: false,
    name: "",
    subLogin: "",
    email: "",
    historyRequest: [],
}, action) => {
    switch (action.type) {
        case START_LOGIN: return  {
            ...state,
            fetching: true,
        };
        case FETCH_LOGIN: return {
            ...state,
            fetching: false,
            fetched: true,
            status: action.status,
            explain: action.explain
        };
        case SET_USER_DATA: return {
            ...state,
            ...action.user,
            isAuth: true,
        };
        case SET_NEW_REQUEST: return  {
            ...state,
            historyRequest: [action.request,...state.historyRequest.slice(0, 14)]
        };
        case DELETE_REQUEST: return  {
            ...state,
            historyRequest:  [...state.historyRequest.filter(item => item.id !== action.id)]
        };
        case SET_HISTORY: return  {
            ...state,
            historyRequest: action.hist
        };
        case DELETE_REQUEST_ALL: return {
            ...state,
            historyRequest: []
        }
        default: return state;
    }
};


export {
    UserReducer
}
