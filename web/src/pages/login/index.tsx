import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import "./styles.css";

import TitleIcon from "../../assets/images/Intro-icons.svg";
import HeartIcon from "../../assets/images/Vector-heart.svg";
import PasswordIcon from "../../assets/images/icons/senha.svg";
import noPasswordIcon from "../../assets/images/icons/ver-senha.svg";
import { useAuth } from "../../contexts";
import { Link } from "react-router-dom";

type Inputs = {
  email: string;
  senha: string;
};

export default function Login() {
  const { setLoginFormData, signIn, loginFormData } = useAuth()
  const [isVisible, setIsVisible] = useState(true);

  const { register, handleSubmit, errors } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => setLoginFormData(data)

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  const handleSignInUser = async () => {
    if (loginFormData)
      signIn() 
}

  return (
    <div id="page-content-login">
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
                autoFocus={true}
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
              <Link to="/forgot">Esqueci minha senha</Link>
            </div>
            <button type="submit" onClick={handleSignInUser}>
              Entrar
            </button>
          </form>

          <div className="account-info-wrapper">
            <div className="create-account-div">
              <p>Não tem conta?</p>
              <Link to="/cadastro">Cadastre-se</Link>
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
