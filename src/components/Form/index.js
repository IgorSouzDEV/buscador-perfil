import React, { useState } from "react";
import "./style.css";

function Form() {
  const [username, setUsername] = useState(""); // Estado para o valor do input
  const [userData, setUserData] = useState(null); // Estado para os dados do usuário
  const [error, setError] = useState(null); // Estado para erros
  const [isLoading, setIsLoading] = useState(false); // Estado para o carregamento

  // Função para lidar com a mudança no input
  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Ativa o carregamento
    setError(null); // Limpa erros anteriores
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error("Nenhum perfil foi encontrado com esse nome de usuário. Tente novamente.");
      }
      const data = await response.json();
      setUserData(data); // Armazena os dados do usuário no estado
    } catch (err) {
      setError(err.message); // Armazena a mensagem de erro personalizada
      setUserData(null); // Limpa os dados do usuário
    } finally {
      setIsLoading(false); // Desativa o carregamento, independentemente do resultado
    }
  };

  return (
    <div className="form-container">
      {/* Formulário */}
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Digite um usuário do GitHub"
          className="input-field"
          value={username}
          onChange={handleInputChange}
        />
        <button type="submit" className="search-button" disabled={isLoading}>
          {isLoading ? "Carregando..." : "Pesquisar"}
        </button>
      </form>

      {/* Exibe mensagens de erro */}
      {error && <p className="error-message">{error}</p>}

      {/* Exibe a tela de carregamento */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Carregando...</p>
        </div>
      )}

      {/* Exibe os dados do usuário */}
      {userData && (
        <div className="user-card">
          <img src={userData.avatar_url} alt="Avatar do usuário" className="avatar" />
          <div className="user-data">
            <h2>{userData.name || userData.login}</h2>
            <p>{userData.bio || "Sem bio disponível"}</p>
          </div>
          <div className="user-button">
            <a href={userData.html_url} target="_blank" rel="noopener noreferrer" className="profile-link">
              Ver perfil no GitHub
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Form;