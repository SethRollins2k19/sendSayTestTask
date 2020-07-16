import {combineReducers} from "redux";
import {UserReducer} from "./UserReducer";
import {TextAreaReducer} from "./TextAreaReducer";




export default combineReducers({
    User: UserReducer,
    TextArea: TextAreaReducer
})
