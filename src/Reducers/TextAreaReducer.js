import {
    CHANGE_RESPONSE,
    CHANGE_STRING,
    CHECK_VALIDATION,
    DATA_FETCHED,
    START_FETCH_DATA
} from "../Actions/TextAreaAction";
import {validateJSON} from "../Pages/HomePage/help/help";

const TextAreaReducer =(state = {
    string: "",
    response: {},
    fetched: false,
    fetching: false,
    validation: true,
    error: 0
},action) => {
    switch (action.type) {
        case CHANGE_STRING: return {
            ...state,
            string: action.value
        };
        case CHANGE_RESPONSE: return {
            ...state,
            response: {...action.value},
            error: action.error
        }
        case CHECK_VALIDATION: return  {
            ...state,
            validation: action.value
        };
        case START_FETCH_DATA: return  {
            ...state,
            fetching: true,
            fetched: false
        };
        case DATA_FETCHED: return  {
            ...state,
            fetching: false,
            fetched: true
        }
        default: return state
    }
};



export {
    TextAreaReducer
}
