import React, {useEffect, useState} from "react";
import "../../../style/JSONTextAreaStyle.css"
import {useDispatch, useSelector} from "react-redux";
import {setStringValue} from "../../../../../Actions/TextAreaAction";
import {parseToJSONViewResponse} from "../../../help/help";
import {DraggableCursor} from "./DraggableCursor";


const JSONTextArea = () => {
    const dispatch = useDispatch();
    const {string, response, validation, error} = useSelector(state => state.TextArea);
    const [proportion, setProportion] = useState([50,50]);

    return (

        <div className="json-textarea-wrapper" style={{gridTemplateColumns: `${proportion[0]}fr 10px ${proportion[1]}fr`}}>
            <div>
                <span
                    className={`json-textarea__title ${validation ? "" : "json-textarea__title--error"}`}>Запрос:</span>
                <textarea className={`json-textarea__text-area ${validation ? "" : "json-textarea__text-area--error"}`}
                          value={string} onChange={e => {
                    dispatch(setStringValue(e.target.value))
                }} onKeyDown={async e => {
                    if (e.keyCode === 9 && !e.altKey && !e.ctrlKey && !e.shiftKey) {
                        e.preventDefault();
                        let block = e.target;
                        let temp = string.split("");
                        let curPos = 0;
                        if (!temp.length) {
                            temp.push("");
                            curPos = await getCaretPos(block);
                            temp[curPos] += "   ";
                        } else {
                            curPos = await getCaretPos(block);
                            temp[curPos - 1] += "   ";
                        }
                        await dispatch(setStringValue(temp.join("")));
                        setCaretPosition(block, curPos + 3);
                    }
                }}>

                </textarea>
            </div>
            <DraggableCursor changeProportion={setProportion} proportion={proportion} delta={40} centerPropotion={50}/>
            <div>
                <span className={`json-textarea__title ${error ? "json-textarea__title--error" : ""}`}>Ответ:</span>
                <textarea className={`json-textarea__text-area ${error ? "json-textarea__text-area--error" : ""}`}
                          disabled={true} value={"{\n" + parseToJSONViewResponse(response) + "\n}"}>

                </textarea>
            </div>
        </div>
    )
};




function getCaretPos(objName) {
    var obj = objName;
    obj.focus();
    if (document.selection) { // IE
        var sel = document.selection.createRange();
        var clone = sel.duplicate();
        sel.collapse(true);
        clone.moveToElementText(obj);
        clone.setEndPoint('EndToEnd', sel);
        return clone.text.length;
    } else if (obj.selectionStart !== false) return obj.selectionStart; // Gecko
    else return 0;
}

function setCaretPosition(objName, caretPos) {
    var elem = objName;

    if (elem != null) {
        if (elem.createTextRange) {
            var range = elem.createTextRange();
            range.move('character', caretPos);
            range.select();
        } else {
            if (elem.selectionStart) {
                elem.focus();
                elem.setSelectionRange(caretPos, caretPos);
            } else
                elem.focus();
        }
    }
}

export {
    JSONTextArea
}
