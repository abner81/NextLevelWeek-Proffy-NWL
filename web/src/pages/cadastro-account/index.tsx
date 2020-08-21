import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import "./styles.css";

import TitleIcon from "../../assets/images/Intro-icons.svg";
import HeartIcon from "../../assets/images/Vector-heart.svg";
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

export default function CadastroAccount() {
  const [formData, setFormData] = useState({});
  const [isVisible, setIsVisible] = useState(true);

  const { register, handleSubmit, errors } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => setFormData(data);

  console.log(formData);

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div id="page-content-cadastro">
      <section id="header-wrapper-cadastro">
        <div className="header-title-img-cadastro">
          <img src={TitleIcon} alt="Proffy" />
        </div>
      </section>

      <section id="form-wrapper-cadastro">
        <div id="form-content-cadastro" className="container">
          <Link to="/" id="img-back-icon">
            <img src={backIcon} alt="Voltar" />
          </Link>
          <h2>Cadastro</h2>
          <p>Preencha os dados abaixo para começar.</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-cadastro-wrapper">
              <input
                placeholder="Nome"
                name="nome"
                ref={register({
                  required: true,
                })}
              />
            </div>
            {errors.email && <span>Campo obrigatório!</span>}

            <div className="input-cadastro-wrapper">
              <input
                placeholder="Sobrenome"
                name="sobrenome"
                ref={register({
                  required: true,
                })}
              />
            </div>
            {errors.email && <span>Campo obrigatório!</span>}

            <div className="input-cadastro-wrapper">
              <input
                placeholder="E-mail"
                name="email"
                ref={register({
                  required: true,
                })}
              />
            </div>
            {errors.email && <span>Campo obrigatório!</span>}

            {!isVisible && (
              <div className="input-cadastro-wrapper" id="div-input-flex">
                <input
                  placeholder="Senha"
                  name="senha"
                  ref={register({
                    required: true,
                  })}
                />
                <button onClick={handleClick}>
                  <img id="passwordKey" src={PasswordIcon} />
                </button>
              </div>
            )}

            {isVisible && (
              <div className="input-cadastro-wrapper" id="div-input-flex">
                <input
                  placeholder="Senha"
                  name="senha"
                  type="password"
                  ref={register({
                    required: true,
                  })}
                />
                <button onClick={handleClick}>
                  <img id="passwordKey" src={noPasswordIcon} />
                </button>
              </div>
            )}

            {errors.senha && <span>Campo obrigatório!</span>}
            <button type="submit">Entrar</button>
          </form>
        </div>
      </section>
    </div>
  );
}
