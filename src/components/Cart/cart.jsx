import {burgerConstructorSelector} from "../../services/slices/burger-constructor";
import styles from "./cart.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {openIngredientPopup} from "../../services/slices/modal";
import {selectIngredient} from "../../services/slices/Ingredient-details";
import {useDrag} from "react-dnd";
import PropTypes from "prop-types";
import {DRAG_TYPE} from "../../utils/constatnts";

export const Cart = (props) => {
    const dispatch = useDispatch()
    const {bun, ingredientsConstructor} = useSelector(burgerConstructorSelector)
    const id = props.ingredient._id

    const count = ingredientsConstructor.filter(x => x._id === id).length

    const [, drag] = useDrag({
        type: DRAG_TYPE,
        item: {id}
    });

    return (
        <div ref={drag} onClick={() => {
            dispatch(selectIngredient(props.ingredient));
            dispatch(openIngredientPopup());
        }}
             className={styles.card} key={props.ingredient._id}>
            <img src={props.ingredient.image}/>
            <div className={styles.ingredientPrice}>
                <p className={`text_type_digits-default`}>{props.ingredient.price}</p>
                <CurrencyIcon type="primary"/>
            </div>
            <p className="text text_type_main-default">{props.ingredient.name}</p>
            {bun && id === bun._id && <Counter count={2} size="default"/>}
            {ingredientsConstructor.length !== 0 && count &&
                <Counter count={count} size="default"/>}
        </div>
    )
}
Cart.propTypes = {
    ingredient: PropTypes.shape({
        name: PropTypes.string,
        price: PropTypes.number,
        image: PropTypes.string,
    }).isRequired
}