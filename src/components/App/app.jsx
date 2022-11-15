import React, {useState, useEffect} from 'react';
import styles from './app.module.css';
import {AppHeader} from "../AppHeader/app-header";
import {BurgerIngredients} from "../BurgerIngredients/burger-ingredients";
import {BurgerConstructor} from "../BurgerConstructor/burger-constructor";
import {useDispatch, useSelector} from "react-redux";
import {fetchData, ingredientsSelector} from "../../services/slices/ingredients";



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
                        <div className={styles.appContentConstructor}>
                            <BurgerIngredients/>
                            <BurgerConstructor/>
                        </div>
                    }
            </div>
        </div>
    );
}

export default App;
