import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { RootState } from 'src/services/store';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  // const ingredientData = null;

  const { id } = useParams<{ id: string }>();

  const ingredientData = useSelector((state: RootState) => {
    const allIngredients = [
      ...state.ingredients.buns,
      ...state.ingredients.mains,
      ...state.ingredients.sauces
    ];
    return allIngredients.find((ingredient) => ingredient._id === id);
  });
  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
