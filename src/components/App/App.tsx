import React from 'react';
import logo from '../../images/logo.svg';
import './App.css';
import {AppHeader} from "../AppHeader/app-header";
import {BurgerIngredients} from "../BurgerIngredients/burger-ingredients";
import {BurgerConstructor} from "../BurgerConstructor/burger-constructor";

function App() {
  return (
    <div className="App">
      <AppHeader/>
      <div className="app-content">


        <div className="app-content-constructor">

            <BurgerIngredients/>
            <BurgerConstructor/>
        </div>

      </div>
    </div>
  );
}

export default App;
