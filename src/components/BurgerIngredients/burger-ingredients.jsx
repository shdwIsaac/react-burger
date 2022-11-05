import React, {useState} from "react";
import { Tab, Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import './burger-ingredients-module.css'
import {IngredientDetails} from "../IngredientDetails/ingredient-details";
import {BurgerIngredientsPropTypes} from "./burger-ingredients-prop-types";
import {TabComponent} from "../TabComponent/tab-component";


export const BurgerIngredients = (props) => {
    const [current, setCurrent] = useState('one')
    const [showPopup, setShowPopup] = useState(false);
    const [currentIngredient, setCurrentIngredient] = useState(null);

    const buns = props.data.filter((ingredient) => ingredient.type==='bun');
    const mains = props.data.filter((ingredient) => ingredient.type==='main');
    const sauces = props.data.filter((ingredient) => ingredient.type==='sauce');


    const handleTabClick = (value) => {
        let element = document.getElementById(value);
        element.scrollIntoView({ behavior: "smooth" });
    }

    return(
        <div className="ingredient-content box pb-4">
            <p className="pt-10 pb-5 text text_type_main-large left">Соберите бургер</p>
            <div className="ingredients-tabs">
                <Tab className="ingredient-tab" value="buns" active={current === 'buns'} onClick={handleTabClick}>
                    Булки
                </Tab>
                <Tab className="ingredient-tab" value="sauces" active={current === 'sauces'} onClick={handleTabClick}>
                    Соусы
                </Tab>
                <Tab className="ingredient-tab" value="mains" active={current === 'mains'} onClick={handleTabClick}>
                    Начинки
                </Tab>
            </div>
            <div className="ingredients-scroll">
               <TabComponent id="buns" data={buns} setShowPopup={setShowPopup} showPopup={showPopup} setCurrentIngredient={setCurrentIngredient}/>
                <TabComponent id="sauces" data={sauces} setShowPopup={setShowPopup} showPopup={showPopup} setCurrentIngredient={setCurrentIngredient}/>
                <TabComponent id="mains" data={mains} setShowPopup={setShowPopup} showPopup={showPopup} setCurrentIngredient={setCurrentIngredient}/>
            </div>
            {showPopup && <IngredientDetails header="Детали ингредиента" setShowPopup={setShowPopup} ingredient={currentIngredient}/>}
        </div>
    );
}
BurgerIngredients.propsType = BurgerIngredientsPropTypes