import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import './tab-component-module.css'

export const TabComponent = (props) => {
    return (
    <div id={props.id} className="ingredient-type">
        <p className="text-left text text_type_main-medium pb-6">
            Булки
        </p>
        <div className="ingredients-wrapper">
            {props.data.map((ingredient, index) => {
                return(
                    <div onClick={()=>{
                        props.setShowPopup(!props.showPopup)
                        props.setCurrentIngredient(ingredient)
                    }} className="card" key={ingredient._id}>
                        <img src={ingredient.image}/>
                        <p className="ingredient-price text_type_digits-default">{ingredient.price} <CurrencyIcon type="primary"/></p>
                        <p className="text text_type_main-default">{ingredient.name}</p>
                        <Counter count={1} size="default" />
                    </div>
                )})}
        </div>
    </div>
    )}