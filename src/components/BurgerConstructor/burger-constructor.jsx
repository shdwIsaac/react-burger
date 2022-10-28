import React from "react";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import data from "../../utils/data.json"

export const BurgerConstructor = () => {
   return (
     <>
        <div className="scroll">
            <div style={{overflow: 'auto', display: 'flex', flexDirection: 'column', gap: '10px'}} className="pt-4 pb-4">
            {data.map((ingredient, index) => {
                let type = ''
                let locked =false
                if (index === 0) {
                    type = 'top'
                    locked =true
                } 
                if (index === data.length - 1) {
                    type = 'bottom'
                    locked =true
                }

                return (
                    <ConstructorElement
                        type={type}
                        key={ingredient.id}
                        isLocked={locked}
                        text={ingredient.name}
                        price={ingredient.price}
                        thumbnail={ingredient.image}
                    /> 
                )
            })}
            </div>
        </div>
        <div className="pt-10 pl-25" style={{display: 'flex', flexDirection: 'initial'}}>
            <p className="pt-4 mr-10 text text_type_digits-medium">660 <CurrencyIcon type="primary"/></p>
            <Button onClick="" type="primary" size="large">
                Оформить заказ
            </Button>
        </div>
     </>
   );
}

