function copyToClipboard (string) {
    let block = document.createElement("input");
    block.type = "text";
    block.value = string;
    document.body.appendChild(block);
    block.select();
    document.execCommand("copy");
    block.parentNode.removeChild(block);
}


function validateJSON(string) {
    try{
        JSON.parse(string);
        return  true;
    }catch (e) {
        return  false
    }
}



function parseToJSONViewResponse(object, tabCount = 1,isArray = false) {
    let string = "";
    let tab = "   ";
    let tempArray = [];

    if(isArray){
        object.forEach((item, index) => {
            if(item && typeof item === "object"){
                if(item.length >= 0){
                    if(item.length === 0){
                        string+= repeatString(tab, tabCount) +"[" + parseToJSONViewResponse(item, tabCount+1, true) +  `]${index + 1 === object.length ? "" : ",\n"}`
                    } else {
                        string+= repeatString(tab, tabCount) +"[\n" + parseToJSONViewResponse(item, tabCount+1, true) +  `\n${repeatString(tab,tabCount)}]${index + 1 === object.length ? "" : ",\n"}`
                    }
                } else {
                    if(isEmpty(item)){
                        string += repeatString(tab, tabCount) +`{}${index + 1 === object.length ? "" : ",\n"}`
                    } else {
                        string+= repeatString(tab, tabCount) + "{\n" + parseToJSONViewResponse(item, tabCount+1) + `\n${repeatString(tab,tabCount)}}${index + 1 === object.length ? "" : ",\n"}`
                    }
                }
            } else {
                string+= repeatString(tab, tabCount) + `"${item}"${index + 1 === object.length ? "" : ",\n"}`
            }
        })
    } else {
        for(const [key, value] of Object.entries(object)){
            tempArray.push({key: key, value:value});
        }
        tempArray.forEach((item,index) => {
            if(item.value && typeof item.value === "object") {
                if(item.value.length >=0){
                    if(item.value.length === 0) {
                        string+= repeatString(tab, tabCount) + `"${item.key}":[` + parseToJSONViewResponse(item.value, tabCount + 1, true) + `]${index + 1 === tempArray.length ? "" : ",\n"}`;
                    } else {
                        string+= repeatString(tab, tabCount) + `"${item.key}":[\n` + parseToJSONViewResponse(item.value, tabCount + 1, true) + `\n${repeatString(tab,tabCount)}]${index + 1 === tempArray.length ? "" : ",\n"}`;
                    }
                } else {
                    if(isEmpty(item.value)){
                        string+= repeatString(tab, tabCount) + `"${item.key}":{` + parseToJSONViewResponse(item.value, tabCount + 1) + `}${index + 1 === tempArray.length ? "" : ",\n"}`
                    } else {
                        string+= repeatString(tab, tabCount) + `"${item.key}":{\n` + parseToJSONViewResponse(item.value, tabCount + 1) + `\n${repeatString(tab,tabCount)}}${index + 1 === tempArray.length ? "" : ",\n"}`
                    }
                }
            } else {
                string+= repeatString(tab, tabCount) + `"${item.key}":"${item.value}"${index + 1 === tempArray.length ? "" : ",\n"}`;
            }
        });
    }
    return string
}
function repeatString(value, count){
    let newString = "";
    for (let i = 0; i < count; i++){
        newString+=value;
    }
    return newString
}
function isEmpty(obj) {
    for(let key in obj) {
        return false;
    }
    return true;
}
export {
    copyToClipboard,
    validateJSON,
    parseToJSONViewResponse
}
