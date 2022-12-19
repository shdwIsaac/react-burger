import React, { FC } from 'react'
import styles from './ingredient-details.module.css'
import { useParams } from 'react-router-dom'
import { ingredientsSelector } from '../../services/slices/ingredients'
import { useAppSelector } from '../../services/slices'
import { IIngredientElement } from '../../Abstraction/IIngredientElement'

export const IngredientDetails: FC = () => {
  const { ingredients } = useAppSelector(ingredientsSelector)
  const { ingredientId } = useParams()
  const selectedIngredient = ingredients.find(item => item._id === ingredientId) as IIngredientElement

  return (
      <div className={styles.content}>
        <img alt={selectedIngredient.name} className={`${styles.image} mb-15 mt-15`} src={selectedIngredient.image}/>
        <p className="text text_type_main-default">{selectedIngredient.name}</p>
        <div className={`${styles.description} mt-8`}>
          <p className="text text_type_main-default text_color_inactive">Каллории,
            ккал {selectedIngredient.calories}</p>
          <p className="text text_type_main-default text_color_inactive">Белки, г {selectedIngredient.proteins}</p>
          <p className="text text_type_main-default text_color_inactive">Жиры, г {selectedIngredient.fat}</p>
          <p className="text text_type_main-default text_color_inactive">Углеводы,
            г {selectedIngredient.carbohydrates}</p>
        </div>
      </div>
  )
}
