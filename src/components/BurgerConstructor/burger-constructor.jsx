import React from "react";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import data from "../../utils/data.json";
import "./burger-constructor-module.css";




export const BurgerConstructor = () => {
  return (
    <div className="constructor-content">
      <div className="bun-wrapper">
        <ConstructorElement
          type="top"
          isLocked
          text={data[0].name+" (верх)"}
          price={data[0].price}
          thumbnail={data[0].image}
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
          isLocked
          text={data[0].name+" (низ)"}
          price={data[0].price}
          thumbnail={data[0].image}
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
