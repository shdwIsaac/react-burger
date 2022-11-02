import React, {useState} from "react";
import {ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {Button, CurrencyIcon,} from "@ya.praktikum/react-developer-burger-ui-components";
import "./burger-constructor-module.css";
import {OrderDetails} from "../OrderDetails/order-details";
import {BurgerConstructorPropTypes} from './burger-constructor-prop-types'




export const BurgerConstructor = (props) => {

    const [showPopup, setShowPopup] = useState(false);
  return (
    <div className="constructor-content">
      <div className="bun-wrapper">
        <ConstructorElement
          type="top"
          isLocked
          text={props.data[0].name+" (верх)"}
          price={props.data[0].price}
          thumbnail={props.data[0].image}
        />
      </div>
      <div className="constructor-scroll">
        {props.data.slice(1).map((ingredient, index) => {
          return (
            <div key={ingredient._id}>
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
          text={props.data[0].name+" (низ)"}
          price={props.data[0].price}
          thumbnail={props.data[0].image}
        />
      </div>
      <div className="controls pt-10 pl-25">
            <div><p className="pt-4 mr-10 text text_type_digits-medium">660 <CurrencyIcon type="primary"/></p></div>
              <Button htmlType="button" type="primary" onClick={()=>setShowPopup(!showPopup)} size="large">
                  Оформить заказ
              </Button>
        </div>
        {showPopup && <OrderDetails header="" setShowPopup={setShowPopup}/>}
    </div>

  );
}
BurgerConstructor.propTypes = BurgerConstructorPropTypes;
