import React, {useContext, useEffect, useReducer, useState} from "react";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Button, CurrencyIcon,} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import {OrderDetails} from "../OrderDetails/order-details";
import {Modal} from "../Modal/modal";
import {useDispatch, useSelector} from "react-redux";
import {burgerConstructorSelector} from "../../services/slices/burger-constructor";
import {modalSelector, openOrderPopup} from "../../services/slices/modal";
import {createOrder} from "../../services/slices/order-details";
import {DropTarget} from "../DropTarget/drop-target";


export const BurgerConstructor = () => {

    const dispatch = useDispatch()
    const {bun, ingredients, sum} = useSelector(burgerConstructorSelector);
    const {isOpenOrder} = useSelector(modalSelector);
    const boards = ["bunTop","ingredients","bunBottom"];
    //const filter = ingredients.filter((element) => element.type !== "bun")

    //let order = {ingredients: [bun._id, ...filter.map(ingredient => ingredient._id), bun._id]};

    function reducer() {
        let price = 0;
        //price = bun.price * 2;
        //filter.forEach(ingredient => price = price + ingredient.price)
        return {sum: price};
    }


    //Тоже наверное перенести в отдельный файл или в целом вся логика работы с общим апи в одном файле?
    const send = async () => {
        const postRequest = "https://norma.nomoreparties.space/api/orders"
        try {
            const response = await fetch(postRequest, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(),
            });
            console.log(response);
            if (!response.ok) {
                throw new Error('Ответ сети был не ok.');
            }
            dispatch(createOrder(response.json()))
            dispatch(openOrderPopup)
        } catch (error) {

            console.log("error", error);
        }
    }

    //const [totalPrice, totalPriceDispatcher] = useReducer(reducer, initialState, undefined);

    useEffect(() => {
        //totalPriceDispatcher();
    }, []);

    return (
        <div className={styles.constructorContent}>
                {
                    boards.map((item,i)=>(
                    <DropTarget key={i} board={item}/>
                ))}
            <div className={`${styles.controls} pt-10 pl-25`}>
                <div><p className="pt-4 mr-10 text text_type_digits-medium">{sum}<CurrencyIcon
                    type="primary"/></p></div>
                <Button htmlType="button" type="primary" onClick={
                    () => {
                        send()
                    }
                } size="large">
                    Оформить заказ
                </Button>
            </div>
            {isOpenOrder && <Modal header="">
                <OrderDetails/>
            </Modal>
            }
        </div>

    );
}
