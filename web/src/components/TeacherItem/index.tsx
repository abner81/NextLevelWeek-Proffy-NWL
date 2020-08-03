import React from 'react'

import './styles.css'
import whatsappIcon from "../../assets/images/icons/whatsapp.svg";

export default function TeacherItem() {
  return (
    <article className="teacher-item">
      <header>
        <img
          src="https://avatars1.githubusercontent.com/u/54149914?s=460&u=e6a4306816a79fdcf1f4927c265ede6adcfb5a33&v=4"
          alt="Abner Machado"
        />
        <div>
          <strong>Abner Machado</strong>
          <span>Engenharia de Software</span>
        </div>
      </header>

      <p>
        Professor com 15 anos de esperiência.
        <br /> <br />
        Mudando vidas através da tecnologia, ensinando alunos e aplicando
        conhecimentos para resolver problemas.
      </p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ 70,00</strong>
        </p>
        <button type="button">
          <img src={whatsappIcon} alt="whatsapp" />
          Entrar em contato
        </button>
      </footer>
    </article>
  );
}
