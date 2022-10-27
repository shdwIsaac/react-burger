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
        <div style={{display : 'flex'}} className="pl-10">
            <div>
                <p className="pt-10 pb-5 text text_type_main-large">Соберите бургер</p>
                <BurgerIngredients/>
            </div>
            <div className="pt-25">
                <BurgerConstructor/>
            </div>
        </div>
    </div>
  );
}

export default App;
