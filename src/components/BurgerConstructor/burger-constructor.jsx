import React from "react";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import data from "../../utils/data.json";
import "./burger-constructor-module.css";
import PropTypes from "prop-types";


const burgerConstructorPropTypes = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
})

export const BurgerConstructor = () => {
  return (
    <div className="constructor-content">
      <div className="bun-wrapper">
        <ConstructorElement
          type="top"
          key="60666c42cc7b410027a1a9b1"
          isLocked
          text="Краторная булка N-200i (верх)"
          price={1255}
          thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
        />
      </div>
      <div className="constructor-scroll">
        {data.slice(1).map((ingredient, index) => {
          return (
            <div>
              <DragIcon type="primary" />
              <ConstructorElement
                key={ingredient.id}
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
          key="60666c42cc7b410027a1a9b1"
          isLocked
          text="Краторная булка N-200i (ybp)"
          price={1255}
          thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
        />
      </div>
      <div className="controls pt-10 pl-25">
            <div><p className="pt-4 mr-10 text text_type_digits-medium">660 <CurrencyIcon type="primary"/></p></div>
            <Button onClick="" type="primary" size="large">
                Оформить заказ
            </Button>
        </div>
    </div>
  );
};
