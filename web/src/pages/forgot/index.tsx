import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import "./styles.css";

import TitleIcon from "../../assets/images/Intro-icons.svg";
import PasswordIcon from "../../assets/images/icons/senha.svg";
import noPasswordIcon from "../../assets/images/icons/ver-senha.svg";
import backIcon from "../../assets/images/icons/back.svg";
import { Link } from "react-router-dom";

type Inputs = {
  nome: string
  sobrenome: string;
  email: string;
  senha: string;
};

export default function ForgotPassword() {
  const [formData, setFormData] = useState({});

  const { register, handleSubmit, errors } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => setFormData(data);

  const handleSucessPage = () => {
    
  }

  return (
    <div id="page-content-forgot">
      <section id="header-wrapper-forgot">
        <div className="header-title-img-forgot">
          <img src={TitleIcon} alt="Proffy" />
        </div>
      </section>

      <section id="form-wrapper-forgot">
        <div id="form-content-forgot" className="container">
          <Link to="/" id="img-back-icon">
            <img src={backIcon} alt="Voltar" />
          </Link>
          <h2>Eita, esqueceu sua senha?</h2>
          <p>Não esquenta, vamos dar um jeito nisso.</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-forgot-wrapper">
              <input
                placeholder="E-mail"
                name="email"
                ref={register({
                  required: true,
                })}
              />
            </div>
            {errors.email && <span>Campo obrigatório!</span>}
            <button type="submit" onClick={handleSucessPage}>Entrar</button>
          </form>

        </div>
      </section>
    </div>
  );
}
