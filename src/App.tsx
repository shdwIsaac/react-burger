import React from 'react';
import logo from './logo.svg';
import './App.css';
import {AppHeader} from "./components/AppHeader/app-header";
import {BurgerIngredients} from "./components/BurgerIngredients/burger-ingredients";
import {BurgerConstructor} from "./components/BurgerConstructor/burger-constructor";

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
