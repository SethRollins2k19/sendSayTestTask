export const CHECK_VALIDATION = "CHECK_VALIDATION";
export const CHANGE_STRING = "CHANGE_STRING";
export const CHANGE_RESPONSE= "CHANGE_RESPONSE";
export const START_FETCH_DATA = "START_FETCH_DATA";
export const DATA_FETCHED = "DATA_FETCHED";


const setStringValue = value => dispatch => {
    dispatch({
        type: CHANGE_STRING,
        value
    })
};



export {
    setStringValue,
}


