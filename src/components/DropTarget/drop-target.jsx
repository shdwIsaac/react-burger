import {useDispatch, useSelector} from "react-redux";
import {useDrag, useDrop} from "react-dnd";
import styles from './drop-target.module.css'
import React, {useRef} from "react";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {addIngredient, burgerConstructorSelector, deleteIngredient} from "../../services/slices/burger-constructor";
import {ingredientsSelector} from "../../services/slices/ingredients";

export const DropTarget = ({board}) => {
    const dispatch = useDispatch();
    const {ingredientsConstructor, bun} = useSelector(burgerConstructorSelector)
    const {ingredients} = useSelector(ingredientsSelector);

    const ref = useRef(null)

    const [, drag] = useDrag({
        type: 'ingredient',
    });
    const [, drop] = useDrop({
        accept: board === 'bunTop' || board === 'bunBottom' ? 'bun' : 'ingredient',
        drop(itemId) {
            const item = ingredients.find(el => el._id === itemId.id)
            dispatch(addIngredient(item));
        },
    });


    const deleteItem = (index) =>{
        dispatch(deleteIngredient(index));
    }

    const boardClass = board === 'bunTop' || board === 'bunBottom' ?  styles.bunWrapper : styles.constructorScroll;
    const isLock = board === 'bunTop' || board === 'bunBottom'
    const typeEl = board === 'bunTop' ? "top" : "bottom"
    const bunClass = bun ? styles.bunVisible : styles.bunInvisible
    const stringName = board === 'bunTop' ? " (вверх)" : " (низ)"


    return (
        <div ref={drop} className={boardClass}>
            {
                board === 'bunTop' || board === 'bunBottom' ?
                    <div className={bunClass}>
                        {bun && <ConstructorElement type={typeEl} isLocked={isLock} text={bun.name + stringName}
                                                    price={bun.price} thumbnail={bun.image}/>}
                    </div>
                    :
                        ingredientsConstructor && ingredientsConstructor.map((ingredient, index) =>
                            <div draggable={true} key={ingredient._id} ref={drag} className={styles.ingredientContent}>
                                <DragIcon type="primary"/>
                                <ConstructorElement key={ingredient._id} text={ingredient.name}
                                                    isLocked={false} price={ingredient.price} thumbnail={ingredient.image} handleClose={()=>deleteItem(index)}/>
                            </div>)
            }
        </div>
    )
}