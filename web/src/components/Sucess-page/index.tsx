import React from "react";

import sucessBackground from "../../assets/images/icons/success-check-icon.svg";
import "./styles.css";

interface IProps {
  title: string
  description: string
  bottonContent: string
}

const SucessPage:React.FC<IProps> = ({title, description, bottonContent}) => {
  return (
    <div className="title-icons-sucess-page">
      <img src={sucessBackground} />
      <h2>{title}</h2>
      <p>{description}</p>
      <button type="submit">{bottonContent}</button>
    </div>
  );
}

export default SucessPage;
