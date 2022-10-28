import React from "react";
import { Tab, Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import data from '../../utils/data.json'
import './burger-ingredients-module.css'



export const BurgerIngredients = () => {
    const [current, setCurrent] = React.useState('one')
    const ref = React.useRef(null)
    return(
        <div className="box pb-4">
            <div style={{ display: 'flex' }}>
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <div className="scroll">
                <p ref={ref} className="text-left text text_type_main-medium pb-6">
                    Булки
                </p>
                <div style={{ display: 'flex', flexFlow :'wrap'}} >
                    {data.map((ingredient, index)=> {
                        return ingredient.type === 'bun' &&
                            <div className="card" style={{width: '50%'}}>
                                <img src={ingredient.image}/>
                                    <p className="text_type_digits-default">{ingredient.price} <CurrencyIcon type="primary"/></p>
                                <p className="text text_type_main-medium">{ingredient.name}</p>
                            </div>
                    })}
                </div>
                <p ref={ref} className="text-left text text_type_main-medium pb-6">
                    Соусы
                </p>
                <div style={{ display: 'flex', flexFlow :'wrap'}} >
                    {data.map((ingredient, index)=> {
                        return ingredient.type === 'sauce' &&

                            <div className="card" style={{width: '50%'}}>
                                <img src={ingredient.image}/>
                                <p className="text_type_digits-default">{ingredient.price} <CurrencyIcon type="primary"/></p>
                                <p className="text text_type_main-medium">{ingredient.name}</p>
                            </div>
                    })}
                </div>
                <p ref={ref} className="text-left text text_type_main-medium pb-6">
                    Начинки
                </p>
                <div style={{ display: 'flex', flexFlow :'wrap' }} >
                    {data.map((ingredient, index)=> {
                        return ingredient.type === 'main' &&
                            <div className="card" style={{width: '50%'}}>
                                <img src={ingredient.image}/>
                                <p className="text_type_digits-default">{ingredient.price} <CurrencyIcon type="primary"/></p>
                                <p className="text text_type_main-medium">{ingredient.name}</p>
                            </div>
                    })}
                </div>
            </div>
        </div>
    );
}