import React, { useState, useEffect } from "react";
import "./FoodSelection.css";
import api from "../services/api";

interface Food {
  name: string;
  calories: number;
}

interface Meal {
  name: string;
  foods: { food: Food; quantity: number }[];
}

interface FoodSelectionProps {
  meal: Meal;
  setMeals: React.Dispatch<React.SetStateAction<Meal[]>>;
  onClose: () => void;
}

const FoodSelection: React.FC<FoodSelectionProps> = ({
  meal,
  setMeals,
  onClose,
}) => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Food[]>([]);
  const [quantity, setQuantity] = useState(1);

  // Buscar alimentos do backend
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        setLoading(true);
        const response = await api.get("/alimentos");
        setFoods(response.data);
        setSearchResults(response.data);
      } catch (error) {
        console.error("Erro ao buscar alimentos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setSearchResults(
      foods.filter((food) =>
        food.name.toLowerCase().includes(term.toLowerCase())
      )
    );
  };

  // Adicionar alimento à refeição
  const handleAddFood = async (food: Food) => {
    try {
      await api.post(`/refeicoes/${meal.id}/alimentos`, {
        alimentoId: food.id,
        quantidade: quantity,
      });

      // Atualizar lista de refeições
      const response = await api.get("/refeicoes");
      setMeals(response.data);
    } catch (error) {
      console.error("Erro ao adicionar alimento:", error);
    }
  };

  const calculateTotalCalories = () => {
    return meal.foods.reduce(
      (total, item) => total + item.food.calories * item.quantity,
      0
    );
  };

  return (
    <div className="form-overlay">
      <div className="form-content">
        <h3>Adicionar Alimentos para {meal.name}</h3>

        <div className="search-section">
          <input
            className="buscarAlimento"
            type="text"
            placeholder="Buscar alimento"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <input
            className="quantidade"
            type="number"
            min="1"
            placeholder="Quantidade"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </div>

        <ul className="food-list">
          {searchResults.map((food) => (
            <li key={food.name} className="food-item">
              <span className="food-info">
                {food.name} ({food.calories} kcal)
              </span>
              <button className="adicionar" onClick={() => handleAddFood(food)}>
                Adicionar
              </button>
            </li>
          ))}
        </ul>

        <div className="meal-summary">
          <h4>Total da refeição: {calculateTotalCalories()} kcal</h4>
        </div>

        <button className="close-button" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
};

export default FoodSelection;
