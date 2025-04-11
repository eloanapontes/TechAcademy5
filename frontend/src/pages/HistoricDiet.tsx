import React, { useEffect, useState } from "react";
import api from "../services/api";
import "./HistoricDiet.css";

interface Alimento {
  id: number;
  nome: string;
  calorias: number;
}

interface Refeicao {
  id: number;
  nome: string;
  alimentos: Alimento[];
  totalCalorias: number;
}

const HistoricDiet: React.FC = () => {
  const [refeicoes, setRefeicoes] = useState<Refeicao[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRefeicoes = async () => {
      try {
        const response = await api.get("/refeicoes");
        setRefeicoes(response.data.dados); // 'dados' porque no backend você retornou assim
      } catch (error) {
        console.error("Erro ao buscar refeições:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRefeicoes();
  }, []);

  if (loading) {
    return <h2 className="historic-title">Carregando histórico...</h2>;
  }

  if (refeicoes.length === 0) {
    return <h2 className="historic-title">Nenhuma refeição registrada ainda.</h2>;
  }

  return (
    <div className="historic-container">
      <h2 className="historic-title">Histórico das Refeições</h2>

      {refeicoes.map((refeicao) => (
        <div key={refeicao.id} className="meal-block">
          <h3>{refeicao.nome}</h3>
          <ul className="final-food-list">
            {refeicao.alimentos.map((alimento) => (
              <li key={alimento.id} className="food-item">
                {alimento.nome} - {alimento.calorias} kcal
              </li>
            ))}
          </ul>
          <h4 className="calorie-total">Total: {refeicao.totalCalorias} kcal</h4>
        </div>
      ))}
    </div>
  );
};

export default HistoricDiet;
