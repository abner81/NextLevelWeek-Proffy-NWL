import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import LogoImg from "../../assets/images/logo.svg";
import LandingImg from "../../assets/images/landing.svg";

import studyIcon from "../../assets/images/icons/study.svg";
import giveClassesIcon from "../../assets/images/icons/give-classes.svg";
import purpleHeartIcon from "../../assets/images/icons/purple-heart.svg";
import sairIcon from "../../assets/images/icons/Sair.svg";

import "./styles.css";
import api from "../../services/api";

export const Landing = () => {
  const [totalConnections, setTotalConnections] = useState(0);

  useEffect(() => {
    api.get("connections").then((res) => {
      const { total } = res.data;

      setTotalConnections(total);
    });
  }, []);

  return (
    <div id="page-landing">
      <section id="page-landing-content">
        <div id="profile-wrapper-landing" >
          <div className="profile-info-landing">
            <img
              src="https://avatars1.githubusercontent.com/u/54149914?s=460&u=e6a4306816a79fdcf1f4927c265ede6adcfb5a33&v=4"
              alt=""
            />
            <p>Abner Machado</p>
          </div>
          <button>
            <img src={sairIcon} alt="Sair" />
          </button>
        </div>

        <div id="logo-container" >
          <div id='title-div-logo'>
          <img src={LogoImg} alt="Proffy" />
          <h2>Sua plataforma de estudo online.</h2>
          </div>

          <img
            src={LandingImg}
            alt="Plataforma de estudos"

          />
        </div>
      </section>

      <section id="down-content-landing">
        <div id="group-down-landing" >
          <h3>
            Seja bem-vindo. <br /> <strong>O que deseja fazer?</strong>
          </h3>
          <div className="buttons-container">
            <Link to="/study" className="study">
              <img src={studyIcon} alt="Estudar" />
              Estudar
            </Link>
            <Link to="/give-classes" className="give-classes">
              <img src={giveClassesIcon} alt="Dar aulas" />
              Dar aulas
            </Link>
          </div>

          <span className="total-connections">
            Total de {totalConnections} conexões <br />
            já realizadas <img src={purpleHeartIcon} alt="Coração roxo" />
          </span>
        </div>
      </section>
    </div>
  );
};
