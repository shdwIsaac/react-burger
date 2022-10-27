import React from "react";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import data from '../../utils/data.json'
import './burger-ingredients-module.css'



export const BurgerIngredients = () => {
    const [current, setCurrent] = React.useState('one')
    return(
        <div className="box">
            <div style={{ display: 'flex' }} className="pb-10">
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
            <div>
                <p className="text text_type_main-medium pb-6">
                    Булки
                </p>
                <div style={{ display: 'flex-inline', flexWrap :'wrap', width:'900px' }} className="card">
                    {data.map((ingredient, index)=>
                        <div>
                            <img src={ingredient.image}/>
                            <p className="text_type_digits-default">{ingredient.price}</p>
                            <p className="text text_type_main-medium">{ingredient.name}</p>
                        </div>
                    )}
                </div>
            </div>
            <div>
                <p className="text text_type_main-medium pb-6">
                    Соусы
                </p>

            </div>
            <div>
                <p className="text text_type_main-medium pb-6">
                    Начинки
                </p>

            </div>
        </div>
    );
}