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

    let bunTab = true;
    let sauceTab = false;
    let mainTab = false;

    const executeScroll = (ref) => {
        const element = ref
        element.current.scrollIntoView({
            behavior: "smooth",
            inline: "start"
        });
    }

    function getPositionAtCenter(element) {
        const {top, left, width, height} = element.getBoundingClientRect();
        return {
            x: left + width / 2,
            y: top + height / 2
        };
    }
    function getDistanceBetweenElements(a, b) {
        const aPosition = getPositionAtCenter(a);
        const bPosition = getPositionAtCenter(b);

        return Math.hypot(aPosition.x - bPosition.x, aPosition.y - bPosition.y);
    }

    const handleScroll = (event) => {
        console.log(event)
        const distance1 = getDistanceBetweenElements(
            document.getElementById("tabs"),
            document.getElementById("bun"))
        const distance2 = getDistanceBetweenElements(
            document.getElementById("tabs"),
            document.getElementById("sauce"))
        const distance3 = getDistanceBetweenElements(
            document.getElementById("tabs"),
            document.getElementById("main"));
        const min = Math.min(distance1, distance2, distance3)
        console.log(min)
        if (min===distance1)
        {
            bunTab=true;
            sauceTab=false;
            mainTab=false;
        }
        if (min===distance2)
        {
            bunTab=false;
            sauceTab=true;
            mainTab=false;
        }
        if (min===distance3)
        {
            bunTab=false;
            sauceTab=false;
            mainTab=true;
        }
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
            <div id="tabs" className={styles.ingredientsTabs}>
                <Tab active={bunTab}  onClick={() => executeScroll(bunsRef)}>
                    Булки
                </Tab>
                <Tab active={sauceTab}  onClick={() => executeScroll(saucesRef)}>
                    Соусы
                </Tab>
                <Tab active={mainTab} onClick={() => executeScroll(mainsRef)}>
                    Начинки
                </Tab>
            </div>
            <div className={styles.ingredientsScroll}>
                <div id="bun" ref={bunsRef}>
                    <TabComponent data={buns} name="Булки"/>
                </div>
                <div id="sauce" ref={saucesRef}>
                    <TabComponent data={sauces} name="Соусы"/>
                </div>
                <div id="main" ref={mainsRef}>
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