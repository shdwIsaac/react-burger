import React, {useEffect, useRef, useState} from "react";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-ingredients.module.css'
import {IngredientDetails} from "../IngredientDetails/ingredient-details";
import {TabComponent} from "../TabComponent/tab-component";
import {Modal} from "../Modal/modal";
import {useDispatch, useSelector} from "react-redux";
import {ingredientsSelector} from "../../services/slices/ingredients";
import {modalSelector} from "../../services/slices/modal";


export const BurgerIngredients = () => {

    const dispatch=useDispatch()
    const {ingredients} = useSelector(ingredientsSelector);
    const {isOpenIngredient} = useSelector(modalSelector)

    const buns = ingredients.filter((ingredient) => ingredient.type === 'bun');
    const mains = ingredients.filter((ingredient) => ingredient.type === 'main');
    const sauces = ingredients.filter((ingredient) => ingredient.type === 'sauce');

    const bunsRef = useRef(null)
    const saucesRef = useRef(null)
    const mainsRef = useRef(null)


    const executeScroll = (ref) => {
        const element = ref
        element.current.scrollIntoView({
            behavior: "smooth",
            inline: "start"
        });


    }

    const handleScroll = () => {

    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <div className={`${styles.ingredientContent} ${styles.box} pb-4`}>
            <p className={`${styles.left} pt-10 pb-5 text text_type_main-large`}>Соберите бургер</p>
            <div className={styles.ingredientsTabs}>
                <Tab  onClick={() => executeScroll(bunsRef)}>
                    Булки
                </Tab>
                <Tab  onClick={() => executeScroll(saucesRef)}>
                    Соусы
                </Tab>
                <Tab onClick={() => executeScroll(mainsRef)}>
                    Начинки
                </Tab>
            </div>
            <div className={styles.ingredientsScroll}>
                <div ref={bunsRef}>
                    <TabComponent data={buns} name="Булки"/>
                </div>
                <div ref={saucesRef}>
                    <TabComponent data={sauces} name="Соусы"/>
                </div>
                <div ref={mainsRef}>
                    <TabComponent data={mains} name="Начинки"/>
                </div>

            </div>
            {
                isOpenIngredient &&
                <Modal header="Детали ингредиента">
                    <IngredientDetails/>
                </Modal>
            }
        </div>
    );
}