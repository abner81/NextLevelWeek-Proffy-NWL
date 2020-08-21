import React from "react";

import sucessBackground from "../../assets/images/icons/success-check-icon.svg";
import "./styles.css";

export default function SucessNewAccount() {
  return (
    <div className="title-icons-sucess-page">
      <img src={sucessBackground} />
      <h2>Cadastro concluído</h2>
      <p>
        Agora você faz parte da plataforma da Proffy. Tenha uma ótima
        experiência.
      </p>
      <button type="submit">Fazer login</button>
    </div>
  );
}
