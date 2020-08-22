import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import "./styles.css";

import TitleIcon from "../../assets/images/Intro-icons.svg";
import HeartIcon from "../../assets/images/Vector-heart.svg";
import PasswordIcon from "../../assets/images/icons/senha.svg";
import noPasswordIcon from "../../assets/images/icons/ver-senha.svg";
import Input from "../../components/Input";

type Inputs = {
  email: string;
  senha: string;
};

export default function Login() {
  const [formData, setFormData] = useState({});
  const [isVisible, setIsVisible] = useState(true);

  const { register, handleSubmit, errors } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => setFormData(data);

  console.log(formData);

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div id="page-content-login" >
      <section id="header-wrapper-login">
        <div className="header-title-img-login">
          <img src={TitleIcon} alt="Proffy" />
        </div>
      </section>

      <section id="form-wrapper-login">
        <div id="form-content-login" className="container">
          <h2>Fazer login</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-login-wrapper">
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
              <div className="input-login-wrapper" id="div-input-flex">
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
              <div className="input-login-wrapper" id="div-input-flex">
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
            <div className="checkbox-forgot-wrapper-login">
              <div className="checkbox-login">
                <input type="checkbox" name="checkbox" />
                <p>Lembrar-me</p>
              </div>
              <a href="/">Esqueci minha senha</a>
            </div>
            <button type="submit">Entrar</button>
          </form>

          <div className="account-info-wrapper">
            <div className="create-account-div">
              <p>Não tem conta?</p>
              <a href="/">Cadastre-se</a>
            </div>
            <div className="free-heart-icon-wrapper">
              <p>É de graça</p>
              <img src={HeartIcon} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
