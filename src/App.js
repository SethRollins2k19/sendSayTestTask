import React from 'react';
import {Switch, Route} from "react-router-dom";
import './App.css';

import MainContainer from "./Containers/MainContainer";


function App() {
    return (
        <Switch>
            <Route path="/">
                <MainContainer/>
            </Route>
        </Switch>

    );
}


export default App;
