import React from "react";
import { useNavigate } from "react-router-dom";
import "./Options.css";

const Options: React.FC = () => {
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="options-container">
      <h1>Simulador Online de Dietas</h1>
      <div className="button-container">
        <button onClick={() => navigate("/NewDiet")} className="option-button">
          Nova Dieta
        </button>
        <button
          onClick={() => navigate("/HistoricDiet")}
          className="option-button"
        >
          Histórico de Dietas
        </button>
        <button onClick={goToProfile} className="option-button">
          Meu Perfil
        </button>
      </div>
    </div>
  );
};

export default Options;
