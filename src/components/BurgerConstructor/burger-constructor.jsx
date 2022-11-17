import React, {useContext, useEffect, useReducer, useState} from "react";
import {ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {Button, CurrencyIcon,} from "@ya.praktikum/react-developer-burger-ui-components";
import "./burger-constructor-module.css";
import {OrderDetails} from "../OrderDetails/order-details";
import {BurgerConstructorPropTypes} from './burger-constructor-prop-types'
import {IngredientsContext} from "../../services/burger-constructor-context";
import {fetchData} from "../App/app-functions";




export const BurgerConstructor = () => {

    const data = useContext(IngredientsContext);
    const initialState = { sum: 0 };
    const bun = data[0];
    const ingredients = data.filter((element)=> element.type!=="bun")

    let order = { ingredients: [bun._id, ...ingredients.map(ingredient=>ingredient._id), bun._id] };

    function reducer() {
        let price =0;
        price = bun.price*2;
        ingredients.forEach(ingredient=>price=price+ingredient.price)
        return { sum: price};
    }
    //Тоже наверное перенести в отдельный файл или в целом вся логика работы с общим апи в одном файле?
    const send = async() => {
        const postRequest = "https://norma.nomoreparties.space/api/orders"
        try {
            console.log(order);
            console.log(totalPrice);
            const response = await fetch(postRequest, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(order),
            });
            console.log(response);
            if (!response.ok) {
                throw new Error('Ответ сети был не ok.');
            }
            setShowPopup(!showPopup)
        }
    catch(error)
        {

            console.log("error", error);
        }
    }

    const [totalPrice, totalPriceDispatcher] = useReducer(reducer, initialState, undefined);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        totalPriceDispatcher();
    }, []);

  return (
    <div className="constructor-content">
      <div className="bun-wrapper">
        <ConstructorElement
          type="top"
          isLocked
          text={bun.name+" (верх)"}
          price={bun.price}
          thumbnail={bun.image}
        />

      </div>
      <div className="constructor-scroll">
        {ingredients.map((ingredient, index) => {
          return (
            <div key={ingredient['_id']}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
              />
            </div>
          );
        })}
      </div>
      <div className="bun-wrapper">
        <ConstructorElement
          type="bottom"
          isLocked
          text={bun.name+" (низ)"}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>
      <div className="controls pt-10 pl-25">
            <div><p className="pt-4 mr-10 text text_type_digits-medium">{totalPrice.sum}<CurrencyIcon type="primary"/></p></div>
              <Button htmlType="button" type="primary" onClick={
                  ()=> {
                      send()
                  }
              } size="large">
                  Оформить заказ
              </Button>
        </div>
        {showPopup && <OrderDetails header="" setShowPopup={setShowPopup}/>}
    </div>

  );
}
BurgerConstructor.propTypes = BurgerConstructorPropTypes;
