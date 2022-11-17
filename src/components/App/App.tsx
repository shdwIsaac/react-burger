import React, { useState, useEffect } from 'react';
import logo from '../../images/logo.svg';
import './App.css';
import {AppHeader} from "../AppHeader/app-header";
import {BurgerIngredients} from "../BurgerIngredients/burger-ingredients";
import {BurgerConstructor} from "../BurgerConstructor/burger-constructor";
import {fetchData} from './app-functions.jsx';
import {IngredientsContext} from "../../services/burger-constructor-context";

function App() {
    const [state, setState] = useState({
        isLoading: false,
        hasError: false,
        data: []
    });


    useEffect(() => {
        fetchData(state,setState);
    }, []);


    const { data, isLoading, hasError } = state;
    return (
    <div className="App">
      <AppHeader/>
      <div className="app-content">
<IngredientsContext.Provider value={state.data}>
          {!isLoading &&
              !hasError &&
              data.length &&
        <div className="app-content-constructor">
                    <BurgerIngredients data={data}/>
                    <BurgerConstructor/>
        </div>
          }
</IngredientsContext.Provider>
      </div>

    </div>

  );
}

export default App;
