import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';

const AvailableMeals = () => {
  const [mealsList, setMealsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchMealData = async () => {
      const data = await fetch(
        'https://react-http-266ba-default-rtdb.firebaseio.com/react-http/meals.json'
      );

      if (!data.ok) {
        throw new Error('Something went wrong');
      }

      const mealsData = await data.json();

      const listData = [];

      for (const key in mealsData) {
        listData.push({
          id: key,
          description: mealsData[key].description,
          name: mealsData[key].name,
          price: mealsData[key].price,
        });
      }

      setMealsList(listData);
      setIsLoading(false);
    };

    fetchMealData().catch((error) => {
      setError(error);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={classes.MealsErrorMessage}>
        <p>Failed to fetch</p>
      </section>
    );
  }

  const mealList = mealsList.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.description}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
