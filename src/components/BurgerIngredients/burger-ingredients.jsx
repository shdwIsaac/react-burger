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

    const {ingredients} = useSelector(ingredientsSelector);
    const {isOpenIngredient} = useSelector(modalSelector)

    const buns = ingredients.filter((ingredient) => ingredient.type === 'bun');
    const mains = ingredients.filter((ingredient) => ingredient.type === 'main');
    const sauces = ingredients.filter((ingredient) => ingredient.type === 'sauce');

    const tabsRef = useRef(null)
    const bunsRef = useRef(null)
    const saucesRef = useRef(null)
    const mainsRef = useRef(null)

    const [bunTab,setBunTab] = useState(true)
    const [sauceTab, setSauceTab] = useState(false)
    const [mainTab, setMainTab] = useState(false)

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
            y: top
        };
    }
    function getDistanceBetweenElements(a, b) {
        const aPosition = getPositionAtCenter(a);
        const bPosition = getPositionAtCenter(b);

        return Math.hypot(aPosition.y - bPosition.y);
    }

    const handleScroll = (event) => {
        const distance1 = getDistanceBetweenElements(
            tabsRef.current,
            bunsRef.current)
        const distance2 = getDistanceBetweenElements(
            tabsRef.current,
            saucesRef.current)
        const distance3 = getDistanceBetweenElements(
            tabsRef.current,
            mainsRef.current);
        const min = Math.min(distance1, distance2, distance3)
        if (min===distance1)
        {
            setBunTab(true)
            setSauceTab(false)
            setMainTab(false)
        }
        if (min===distance2)
        {
            setBunTab(false)
            setSauceTab(true)
            setMainTab(false)
        }
        if (min===distance3)
        {
            setBunTab(false)
            setSauceTab(false)
            setMainTab(true)
        }
    }

    return (
        <div className={`${styles.ingredientContent} ${styles.box} pb-4`}>
            <p className={`${styles.left} pt-10 pb-5 text text_type_main-large`}>Соберите бургер</p>
            <div ref={tabsRef} className={styles.ingredientsTabs}>
                <Tab active={bunTab} onClick={() => executeScroll(bunsRef)}>
                    Булки
                </Tab>
                <Tab active={sauceTab}  onClick={() => executeScroll(saucesRef)}>
                    Соусы
                </Tab>
                <Tab active={mainTab} onClick={() => executeScroll(mainsRef)}>
                    Начинки
                </Tab>
            </div>
            <div className={styles.ingredientsScroll} onScroll={handleScroll}>
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