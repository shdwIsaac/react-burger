import React from "react";
import { Tab, Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import data from '../../utils/data.json'
import './burger-ingredients-module.css'


export const BurgerIngredients = () => {
    const [current, setCurrent] = React.useState('one')

    const handleTabClick = (value) => {
        let element = document.getElementById(value);
        element.scrollIntoView({ behavior: "smooth" });
        //window.location.href = `#${value}`
        //setCurrent(value)
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
                <div id="buns" className="ingredient-type">
                    <p className="text-left text text_type_main-medium pb-6">
                        Булки
                    </p>
                    <div className="ingredients-wrapper">
                        {data.map((ingredient, index) => {
                            const isShowCount = index === 0
                            return ingredient.type === 'bun' &&
                                <div className="card" key={ingredient.id}>
                                    <img src={ingredient.image}/>
                                        <p className="ingredient-price text_type_digits-default">{ingredient.price} <CurrencyIcon type="primary"/></p>
                                    <p className="text text_type_main-default">{ingredient.name}</p>
                                    {isShowCount && <Counter count={1} size="default" />}
                                </div>
                        })}
                    </div>
                </div>
                <div id="sauces" className="ingredient-type">
                    <p className="text-left text text_type_main-medium pb-6">
                        Соусы
                    </p>
                    <div className="ingredients-wrapper">
                        {data.map((ingredient, index)=> {
                            const isShowCount = ingredient._id === '60666c42cc7b410027a1a9b8'
                            return ingredient.type === 'sauce' &&
                                <div className="card" key={ingredient.id}>
                                    <img src={ingredient.image}/>
                                    <p className="ingredient-price text_type_digits-default">{ingredient.price} <CurrencyIcon type="primary"/></p>
                                    <p className="text text_type_main-default">{ingredient.name}</p>
                                    {isShowCount && <Counter count={1} size="default" />}
                                </div>
                        })}
                    </div>
                </div>
                <div id="mains" className="ingredient-type">
                    <p className="text-left text text_type_main-medium pb-6">
                        Начинки
                    </p>
                    <div className="ingredients-wrapper">
                        {data.map((ingredient, index)=> {
                            return ingredient.type === 'main' &&
                                <div className="card" key={ingredient.id}>
                                    <img src={ingredient.image}/>
                                    <p className="ingredient-price text_type_digits-default">{ingredient.price} <CurrencyIcon type="primary"/></p>
                                    <p className="text text_type_main-default">{ingredient.name}</p>
                                </div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}