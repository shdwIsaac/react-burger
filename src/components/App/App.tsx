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

    //Константу и вызов fetch стоит спрятать в отдельный файл, чтобы тут была только логика присвоения полученных данных, а вся работа с запросом была бы спрятана
    //Разбить бургер ингридиент на компоненту и вызывать просто 3 раза
    //вынести разделенние данных в костанту черех фильтр в бургер ингридиент
    useEffect(() => {
        const url = "https://norma.nomoreparties.space/api/ingredients";

        const fetchData = async () => {
            try {
                setState({ ...state, hasError: false, isLoading: true });
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Ответ сети был не ok.');
                }
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

    </div>

  );
}

export default App;
