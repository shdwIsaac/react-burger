import {useDispatch, useSelector} from "react-redux";
import {useDrag, useDrop} from "react-dnd";
import styles from './drop-target.module.css'
import React, {useRef} from "react";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {addIngredient, burgerConstructorSelector, deleteIngredient} from "../../services/slices/burger-constructor";
import {ingredientsSelector} from "../../services/slices/ingredients";
import {BurgerElement} from "../BurgerElement/burger-element";
import {DRAG_TYPE} from "../../utils/constatnts";

export const DropTarget = () => {
    const dispatch = useDispatch()
    const {ingredientsConstructor, bun} = useSelector(burgerConstructorSelector)
    const {ingredients} = useSelector(ingredientsSelector);

    const [, drop] = useDrop({
        accept: DRAG_TYPE,
        drop(itemId) {
            const item = ingredients.find(el => el._id === itemId.id)
            dispatch(addIngredient(item));
        },
    });

    const scrollStyle = ingredientsConstructor.length!==0 ? styles.constructorScroll : styles.constructorWithoutScroll

    return (
        <div ref={drop}>
            <div className={styles.bunWrapper}>
                {bun && <ConstructorElement type='top' isLocked={true} text={bun.name + " (вверх)"}
                                            price={bun.price} thumbnail={bun.image}/>}
            </div>
            <div className={scrollStyle}>
                {ingredientsConstructor && ingredientsConstructor.map((ingredient, index) =>
                    <BurgerElement key={index} ingredient={ingredient} index={index}/>)
                }
            </div>
            <div className={styles.bunWrapper}>
                {bun && <ConstructorElement type='bottom' isLocked={true} text={bun.name + " (низ)"}
                                            price={bun.price} thumbnail={bun.image}/>}
            </div>
        </div>
    )
}