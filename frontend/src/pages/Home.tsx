import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  const goToRegister = () => {
    navigate("/RegisterUser");
  };

  const goToLogin = () => {
    navigate("/User");
  };

  return (
    <div className="paginaInicial">
      <h1>Seja bem-vindo!</h1>
      <img src="/src/assets/logo.png" alt="logo" />
      <button onClick={goToLogin} className="loginButton">
        Login
      </button>
      <button onClick={goToRegister} className="RegisterButton">
        Cadastrar
      </button>
    </div>
  );
}

export default Home;
