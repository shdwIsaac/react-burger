import React from "react";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import data from "../../utils/data.json"

export const BurgerConstructor = () => {
   return (
     <>
         <div style={{maxHeight:'400', overflowУ: 'scroll', display: 'flex', flexDirection: 'column', gap: '10px'}} className="pt-4 pb-4">
         {data.map((ingredient, index) =>
             <ConstructorElement
                 type={index===0 && 'top'}
                 key={ingredient.id}
                 isLocked={index===0 || index===data.length-1 && false}
                 text={ingredient.name}
                 price={ingredient.price}
                 thumbnail={ingredient.image}
             /> )}
         </div>
         <div style={{display: 'flex'}}>

             <Button onClick="" type="primary" size="large">
                 Оформить заказ
             </Button>
         </div>
     </>
   );
}

