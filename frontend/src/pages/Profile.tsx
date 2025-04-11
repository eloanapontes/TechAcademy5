import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import api from "../services/api";

interface ProfileData {
  nome: string;
  usuario: string;
  email: string;
  cpf: string;
  senhaAtual: string;
  novaSenha: string;
  confirmarSenha: string;
}

const Profile = () => {
  const [profile, setProfile] = useState<ProfileData>({
    nome: "",
    usuario: "",
    email: "",
    cpf: "",
    senhaAtual: "",
    novaSenha: "",
    confirmarSenha: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Adicionado estado para mensagem de sucesso
  const [showChangePassword, setShowChangePassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get(
          `/usuarios/${localStorage.getItem("userId")}`
        );
        const userData = response.data;
        setProfile((prev) => ({
          ...prev,
          ...userData,
          senhaAtual: "",
          novaSenha: "",
          confirmarSenha: "",
        }));
      } catch (error) {
        setErrorMessage("Erro ao carregar dados do usuário");
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!profile.nome || !profile.usuario || !profile.cpf) {
      setErrorMessage("Preencha todos os campos obrigatórios");
      setSuccessMessage(""); // Limpa mensagem de sucesso
      return;
    }

    try {
      const updateData = {
        nome: profile.nome,
        usuario: profile.usuario,
        cpf: profile.cpf,
        ...(showChangePassword && {
          senhaAtual: profile.senhaAtual,
          novaSenha: profile.novaSenha,
        }),
      };

      const response = await api.put(
        `/usuarios/${localStorage.getItem("userId")}`,
        updateData
      );

      if (response.status === 200) {
        setSuccessMessage("Perfil atualizado com sucesso!");
        setTimeout(() => navigate("/options"), 2000);
      }
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message || "Erro ao atualizar perfil"
      );
    }
  };

  return (
    <div className="profile-container">
      <form onSubmit={handleSubmit} className="profile-form">
        <h2>Meu Perfil</h2>

        <div className="form-group">
          <label htmlFor="nome">Nome:</label>
          <input
            id="nome"
            name="nome"
            type="text"
            value={profile.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="usuario">Nome de Usuário:</label>
          <input
            id="usuario"
            name="usuario"
            type="text"
            value={profile.usuario}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            value={profile.email}
            disabled
            className="disabled-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="cpf">CPF:</label>
          <input
            id="cpf"
            name="cpf"
            type="text"
            value={profile.cpf}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="senhaAtual">Senha Atual:</label>
          <input
            id="senhaAtual"
            name="senhaAtual"
            type="password"
            value={profile.senhaAtual}
            onChange={handleChange}
            placeholder="Senha atual para salvar alterações"
            required
          />
        </div>

        <button
          type="button"
          onClick={() => setShowChangePassword(!showChangePassword)}
          className="change-password-button"
        >
          {showChangePassword ? "Cancelar alteração de senha" : "Alterar senha"}
        </button>

        {showChangePassword && (
          <div className="senha-group">
            <h3>Nova Senha</h3>
            <div className="form-group">
              <label htmlFor="novaSenha">Nova Senha:</label>
              <input
                id="novaSenha"
                name="novaSenha"
                type="password"
                value={profile.novaSenha}
                onChange={handleChange}
                placeholder="Digite a nova senha"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmarSenha">Confirmar Nova Senha:</label>
              <input
                id="confirmarSenha"
                name="confirmarSenha"
                type="password"
                value={profile.confirmarSenha}
                onChange={handleChange}
                placeholder="Digite novamente a nova senha"
              />
            </div>
          </div>
        )}

        <div className="button-group">
          <button type="submit">Salvar Alterações</button>
          <button
            type="button"
            onClick={() => navigate("/options")}
            className="cancel-button"
          >
            Voltar
          </button>
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </div>
  );
};

export default Profile;
