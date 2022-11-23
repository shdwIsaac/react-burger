import React, {useState, useEffect} from 'react';
import styles from './app.module.css';
import {AppHeader} from "../AppHeader/app-header";
import {BurgerIngredients} from "../BurgerIngredients/burger-ingredients";
import {BurgerConstructor} from "../BurgerConstructor/burger-constructor";
import {useDispatch, useSelector} from "react-redux";
import {fetchData, ingredientsSelector} from "../../services/slices/ingredients";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";



function App() {
    const dispatch = useDispatch()
    const {ingredients, isLoading, hasError} = useSelector(ingredientsSelector);


    useEffect(() => {
        dispatch(fetchData())
    }, [dispatch]);


    return (
        <div className={styles.app}>
            <AppHeader/>
            <div className={styles.appContent}>
                    {!isLoading &&
                        !hasError &&
                        ingredients.length &&
                        <DndProvider backend={HTML5Backend}>
                        <div className={styles.appContentConstructor}>
                            <BurgerIngredients/>
                            <BurgerConstructor/>
                        </div>
                        </DndProvider>
                    }
            </div>
        </div>
    );
}

export default App;
