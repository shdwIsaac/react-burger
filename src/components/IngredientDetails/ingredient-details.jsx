import React from "react";
import styles from './ingredient-details.module.css'
import {useSelector} from "react-redux";
import {ingredientDetailsSelector} from "../../services/slices/Ingredient-details";

export const IngredientDetails = () => {

    const {selectedIngredient} = useSelector(ingredientDetailsSelector);

    return (
        <>
            <img className={`${styles.image} mb-15 mt-15`} src={selectedIngredient.image}/>
            <p className="text text_type_main-default">{selectedIngredient.name}</p>
            <div className={`${styles.description} mt-8`}>
                <p className="text text_type_main-default text_color_inactive">Каллории, ккал {selectedIngredient.calories}</p>
                <p className="text text_type_main-default text_color_inactive">Белки, г {selectedIngredient.proteins}</p>
                <p className="text text_type_main-default text_color_inactive">Жиры, г {selectedIngredient.fat}</p>
                <p className="text text_type_main-default text_color_inactive">Углеводы, г {selectedIngredient.carbohydrates}</p>
            </div>
        </>
    )
}