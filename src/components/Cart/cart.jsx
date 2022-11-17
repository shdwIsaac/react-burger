import {burgerConstructorSelector} from "../../services/slices/burger-constructor";
import styles from "./cart.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {openIngredientPopup} from "../../services/slices/modal";
import {selectIngredient} from "../../services/slices/Ingredient-details";
import {useDrag} from "react-dnd";
import {CartPropTypes} from "./cart-prop-types";

export const Cart = (props) => {
    const dispatch = useDispatch()
    const {bun,ingredientsConstructor} = useSelector(burgerConstructorSelector)
    const id = props.ingredient._id

    const count = ingredientsConstructor.filter(x=> x._id===id).length

    const [, drag] = useDrag({
        type: 'ingredient',
        item: {id}
    });

    return (
        <div ref={drag} onClick={() => {
            dispatch(selectIngredient(props.ingredient));
            dispatch(openIngredientPopup());
        }}
             className={styles.card} key={props.ingredient._id}>
            <img src={props.ingredient.image}/>
            <p className={`${styles.ingredientPrice} text_type_digits-default`}>{props.ingredient.price}
                <CurrencyIcon type="primary"/></p>
            <p className="text text_type_main-default">{props.ingredient.name}</p>
            {bun && id === bun._id && <Counter count={1} size="default"/>}
            {ingredientsConstructor.length!==0 && ingredientsConstructor.includes(props.ingredient) && <Counter count={count} size="default"/>}
        </div>
    )
}
Cart.propTypes = CartPropTypes