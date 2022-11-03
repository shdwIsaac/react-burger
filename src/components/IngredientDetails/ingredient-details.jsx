import React from "react";
import {Modal} from "../Modal/modal";
import './ingredient-details-module.css'
import ReactDOM from "react-dom";
import {IngredientDetailsPropTypes} from "./ingredient-details-prop-types";

export const IngredientDetails = (props) => {



    return (
        <Modal header={props.header} setShowPopup={props.setShowPopup}>
            <img className="mb-15 mt-15 image" src={props.ingredient.image}/>
            <p className="text text_type_main-default">{props.ingredient.name}</p>
            <div className="mt-8 description">
                <p className="text text_type_main-default text_color_inactive">Каллории, ккал {props.ingredient.calories}</p>
                <p className="text text_type_main-default text_color_inactive">Белки, г {props.ingredient.proteins}</p>
                <p className="text text_type_main-default text_color_inactive">Жиры, г {props.ingredient.fat}</p>
                <p className="text text_type_main-default text_color_inactive">Углеводы, г {props.ingredient.carbohydrates}</p>
            </div>
        </Modal>
    )
}
IngredientDetails.propTypes = IngredientDetailsPropTypes;