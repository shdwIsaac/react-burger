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
        <p className="pt-10 pb-5 text text_type_main-large left">Соберите бургер</p>
        <div className="app-content-constructor">
          <div className="p-5">
              <BurgerIngredients/>
          </div>
          <div className="p-5">
              <BurgerConstructor/>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
