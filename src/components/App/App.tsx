import React, { useState, useEffect } from 'react';
import logo from '../../images/logo.svg';
import './App.css';
import {AppHeader} from "../AppHeader/app-header";
import {BurgerIngredients} from "../BurgerIngredients/burger-ingredients";
import {BurgerConstructor} from "../BurgerConstructor/burger-constructor";

function App() {
    const [state, setState] = useState({
        isLoading: false,
        hasError: false,
        data: []
    });


    useEffect(() => {
        const url = "https://norma.nomoreparties.space/api/ingredients";

        const fetchData = async () => {
            try {
                setState({ ...state, hasError: false, isLoading: true });
                const response = await fetch(url);
                const dataJson = await response.json();
                setState({ ...state, data: dataJson.data, isLoading: false })
                console.log(dataJson.data);
            } catch (error) {
                setState({ ...state, hasError: true, isLoading: false });
                console.log("error", error);
            }
        };

        fetchData();
    }, []);


    const { data, isLoading, hasError } = state;
    return (
    <div className="App">
      <AppHeader/>
      <div className="app-content">

          {!isLoading &&
              !hasError &&
              data.length &&
        <div className="app-content-constructor">
                    <BurgerIngredients data={data}/>
                    <BurgerConstructor data={data}/>
        </div>}
      </div>
        <div id="react-modals">
        </div>
    </div>

  );
}

export default App;
