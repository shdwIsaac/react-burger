import React, { useState, useEffect } from 'react';
import logo from '../../images/logo.svg';
import './App.css';
import {AppHeader} from "../AppHeader/app-header";
import {BurgerIngredients} from "../BurgerIngredients/burger-ingredients";
import {BurgerConstructor} from "../BurgerConstructor/burger-constructor";
import {fetchData} from './app-functions.jsx';

function App() {
    const [state, setState] = useState({
        isLoading: false,
        hasError: false,
        data: []
    });

    //Разбить бургер ингридиент на компоненту и вызывать просто 3 раза
    //вынести разделенние данных в костанту черех фильтр в бургер ингридиент
    useEffect(() => {
        fetchData(state,setState);
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

    </div>

  );
}

export default App;
