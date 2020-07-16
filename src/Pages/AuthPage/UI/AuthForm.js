import React, {useEffect, useState} from "react";
import "../style/AuthFormStyle.css";
import {AuthInput} from "./AuthInput";
import {useDispatch, useSelector} from "react-redux";
import {Loading} from "./Loading";
import {checkValidation} from "../Help/Validation";
import {authProcess} from "../../../Actions/UserAction";
import {Error} from "./Error";
import {Button} from "../../../Components/Button";


const AuthForm = () => {
    const dispatch = useDispatch();
    const {fetching, fetched, status, explain} = useSelector(state => state.User);
    const [login, setLogin] = useState("");
    const [subLogin, setSubLogin] = useState("");
    const [password, setPassword] = useState("");
    const [validation, setValidation] = useState({
        login: true,
        password: true,
        subLogin: true,
        totalValidate: true,
    });

    useEffect( () => {
        if(validation.totalValidate)return;
        let temp = checkValidation(validation, setValidation, {login, subLogin, password});
        setValidation(prevState => ({
            ...prevState,
            totalValidate: temp
        }));
    }, [login,password,subLogin]);

    return(
        <form className="auth-form-wrapper" onSubmit={ async e => {
            e.preventDefault();
            let temp = await checkValidation(validation, setValidation, {login, subLogin, password});
            await setValidation(prevState => ({
                ...prevState,
                totalValidate: temp
            }));
            if(validation.totalValidate){
                dispatch(authProcess(login,password))
            }

        }}>
            <div className="auth-form-wrapper__title">
                API-консолька
            </div>
            {
                fetched && status !== 200?
                    <Error text={explain}/>
                    :
                    ""
            }
            <AuthInput value={login}
                       setter={setLogin}
                       title={"Логин"}
                       type={"text"}
                       isRequired={true}
                       isValidate={validation.login}
            />
            <AuthInput value={subLogin}
                       setter={setSubLogin}
                       type={"text"}
                       title={"Сублогин"}
                       isRequired={false}
                       isValidate={validation.subLogin}
            />
            <AuthInput value={password}
                       setter={setPassword}
                       title={"Пароль"}
                       type={"password"}
                       isRequired={true}
                       isValidate={validation.password}
            />
            {
                fetching ?
                    <Button type={"button"} additionalClassName={`auth-form-wrapper__submit--loading`}>
                        <Loading/>
                    </Button>
                    :
                    <Button type="submit" isDisabled={!validation.totalValidate}>
                        Войти
                    </Button>
            }
        </form>
    )
};








export {
    AuthForm
}
