import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useHistory } from "react-router-dom";

import "./styles.css";

import TitleIcon from "../../assets/images/Intro-icons.svg";
import PasswordIcon from "../../assets/images/icons/senha.svg";
import noPasswordIcon from "../../assets/images/icons/ver-senha.svg";
import backIcon from "../../assets/images/icons/back.svg";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts";

type Inputs = {
  nome: string
  sobrenome: string;
  email: string;
  senha: string;
};

export default function CadastroAccount() {
  const {loginFormData, setLoginFormData, createAccount} = useAuth()
  const [isVisible, setIsVisible] = useState(true);

  const history = useHistory()

  const { register, handleSubmit, errors } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => setLoginFormData(data);

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  const handleCreateNewAccount = () => {
    if (loginFormData) {
      createAccount().then(() => history.push("/"));
    } 
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
            {errors.nome && <span>Campo obrigatório!</span>}

            <div className="input-cadastro-wrapper">
              <input
                placeholder="Sobrenome"
                name="sobrenome"
                ref={register({
                  required: true,
                })}
              />
            </div>
            {errors.sobrenome && <span>Campo obrigatório!</span>}

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
            <button type="submit" onClick={handleCreateNewAccount}>
              Entrar
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
