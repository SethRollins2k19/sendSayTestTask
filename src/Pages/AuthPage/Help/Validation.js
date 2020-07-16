const loginRegIsEmail = /^\S+@\S+\.\S+$/;
const loginRegIsStringLogin = /^[A-Za-z-_][A-Za-z0-9-_]*$/;
const passwordReg = /[а-я]/;

function checkValidation(validation, setValidation, values) {
    const {login, subLogin, password} = values;
    let isAllValidate = true;
    for (const [key, value] of Object.entries(validation)) {
        switch (key) {
            case "login": {
                if(login === ""){
                    isAllValidate = false;
                    setValidation(prevState => ({
                        ...prevState,
                        [key]: false,
                    }));
                    break;
                }
                if (loginRegIsEmail.test(login)) {
                    setValidation(prevState => ({
                        ...prevState,
                        [key]: true,
                    }));
                } else {
                    let temp = loginRegIsStringLogin.test(login);
                    isAllValidate = isAllValidate ? temp : false;
                    setValidation(prevState => ({
                        ...prevState,
                        [key]: temp
                    }));
                }
                break;
            }
            case "subLogin": {
                if (subLogin === "") {
                    setValidation(prevState => ({
                        ...prevState,
                        [key]: true
                    }));
                } else {
                    let temp = loginRegIsStringLogin.test(subLogin);
                    isAllValidate = isAllValidate ? temp : false;
                    setValidation(prevState => ({
                        ...prevState,
                        [key]: temp
                    }));
                }
                break;
            }
            case "password": {
                if (password === "") {
                    isAllValidate = false;
                    setValidation(prevState => ({
                        ...prevState,
                        [key]: false,
                    }));
                } else {
                    let temp = !passwordReg.test(password);
                    isAllValidate = isAllValidate ? temp : false;
                    setValidation(prevState => ({
                        ...prevState,
                        [key]: temp
                    }));
                }
                break;
            }
            default:
                break;
        }
    }
    return isAllValidate;
};


export {
    checkValidation
}
