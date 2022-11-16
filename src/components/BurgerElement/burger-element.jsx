import styles from "../DropTarget/drop-target.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useRef} from "react";
import {useDrag, useDrop} from "react-dnd";
import {deleteIngredient, moveIngredient} from "../../services/slices/burger-constructor";
import {useDispatch} from "react-redux";

export const BurgerElement = (props) => {

    const index = props.index;
    const dispatch = useDispatch()
    const [, drag] = useDrag({
        type: 'ingredient',
        item: {index}
    });
    const ref = useRef(null)
    const [{handlerId}, drop] = useDrop({
        accept: 'ingredient',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item, monitor) {
            if (item.hasOwnProperty('index')) {
                if (!ref.current) {
                    return
                }
                const dragIndex = item.index
                const hoverIndex = index
                if (dragIndex === hoverIndex) {
                    return
                }
                const hoverBoundingRect = ref.current?.getBoundingClientRect()
                const hoverMiddleY =
                    (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
                const clientOffset = monitor.getClientOffset()
                const hoverClientY = clientOffset.y - hoverBoundingRect.top
                if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                    return
                }
                if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                    return
                }
                dispatch(moveIngredient({fromIndex: dragIndex, toIndex: hoverIndex}))
                item.index = hoverIndex
            }
        },
    })

    const deleteItem = (index) => {
        dispatch(deleteIngredient(index));
    }
    drag(drop(ref))
    return (
        <div ref={ref} className={styles.ingredientContent} data-handler-id={handlerId}>
            <DragIcon type="primary"/>
            <ConstructorElement text={props.ingredient.name}
                                isLocked={false} price={props.ingredient.price} thumbnail={props.ingredient.image}
                                handleClose={() => deleteItem(props.index)}/>
        </div>
    )
}