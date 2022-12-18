import React, { FC, RefObject, useRef, useState } from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredients.module.css'
import { IngredientDetails } from '../IngredientDetails/ingredient-details'
import { TabComponent } from '../TabComponent/tab-component'
import { Modal } from '../Modal/modal'
import { ingredientsSelector } from '../../services/slices/ingredients'
import { modalSelector } from '../../services/slices/modal'
import { getDistanceBetweenElements } from '../../utils/position-function'
import { INGREDIENT_TYPE } from '../../utils/constatnts'
import { useAppSelector } from '../../services/slices'
import { IIngredientElement } from '../../Abstraction/IIngredientElement'

export const BurgerIngredients: FC = () => {
  const { ingredients } = useAppSelector(ingredientsSelector)
  const { isOpenIngredient } = useAppSelector(modalSelector)

  const buns: IIngredientElement[] = ingredients.filter((ingredient: IIngredientElement) => ingredient.type === INGREDIENT_TYPE.BUN)
  const mains: IIngredientElement[] = ingredients.filter((ingredient: IIngredientElement) => ingredient.type === INGREDIENT_TYPE.MAIN)
  const sauces: IIngredientElement[] = ingredients.filter((ingredient: IIngredientElement) => ingredient.type === INGREDIENT_TYPE.SAUCE)

  const tabsRef = useRef<HTMLDivElement>(null)
  const bunsRef = useRef<HTMLDivElement>(null)
  const saucesRef = useRef<HTMLDivElement>(null)
  const mainsRef = useRef<HTMLDivElement>(null)

  const [bunTab, setBunTab] = useState<boolean>(true)
  const [sauceTab, setSauceTab] = useState<boolean>(false)
  const [mainTab, setMainTab] = useState<boolean>(false)

  const executeScroll = (ref: RefObject<HTMLDivElement>): void => {
    ref.current?.scrollIntoView({
      behavior: 'smooth',
      inline: 'start'
    })
  }

  const handleScroll = (): void => {
    const distance1 = getDistanceBetweenElements(
      tabsRef.current,
      bunsRef.current)
    const distance2 = getDistanceBetweenElements(
      tabsRef.current,
      saucesRef.current)
    const distance3 = getDistanceBetweenElements(
      tabsRef.current,
      mainsRef.current)
    const min = Math.min(distance1, distance2, distance3)
    if (min === distance1) {
      setBunTab(true)
      setSauceTab(false)
      setMainTab(false)
    }
    if (min === distance2) {
      setBunTab(false)
      setSauceTab(true)
      setMainTab(false)
    }
    if (min === distance3) {
      setBunTab(false)
      setSauceTab(false)
      setMainTab(true)
    }
  }

  return (
      <div className={`${styles.ingredientContent} ${styles.box} pb-4`}>
        <p className={`${styles.left} pt-10 pb-5 text text_type_main-large`}>Соберите бургер</p>
        <div ref={tabsRef} className={styles.ingredientsTabs}>
          <Tab active={bunTab} onClick={() => executeScroll(bunsRef)} value={'1'}>
            Булки
          </Tab>
          <Tab active={sauceTab} onClick={() => executeScroll(saucesRef)} value={'1'}>
            Соусы
          </Tab>
          <Tab active={mainTab} onClick={() => executeScroll(mainsRef)} value={'1'}>
            Начинки
          </Tab>
        </div>
        <div className={styles.ingredientsScroll} onScroll={handleScroll}>
          <div ref={bunsRef}>
            <TabComponent data={buns} name="Булки"/>
          </div>
          <div ref={saucesRef}>
            <TabComponent data={sauces} name="Соусы"/>
          </div>
          <div ref={mainsRef}>
            <TabComponent data={mains} name="Начинки"/>
          </div>

        </div>
        {
            isOpenIngredient &&
            <Modal header="Детали ингредиента">
              <IngredientDetails/>
            </Modal>
        }
      </div>
  )
}
