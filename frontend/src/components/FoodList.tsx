import React, { useState, useEffect } from "react";
import "./FoodList.css";
import api from "../services/api";

interface Food {
  name: string;
  calories: number;
}

interface Meal {
  name: string;
  foods: { food: Food; quantity: number }[];
}

const FoodList: React.FC = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        setLoading(true);
        const response = await api.get("/refeicoes");
        setMeals(response.data);
      } catch (error) {
        setError("Erro ao carregar refeições");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  return (
    <div>
      <h4>Dietas Simuladas:</h4>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        meals.map((meal) => (
          <div key={meal.name} className="meal-container">
            <h3>{meal.name}</h3>
            <ul>
              {meal.foods.map(({ food, quantity }) => (
                <li key={food.name} className="food-item">
                  <span>
                    {food.name} - {quantity}x ({food.calories * quantity} kcal)
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default FoodList;
