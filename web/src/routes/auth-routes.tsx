import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Login from "../pages/login";
import CadastroAccount from "../pages/cadastro-account";
import SucessNewAccount from "../pages/sucess-create-account";
import ForgotPassword from "../pages/forgot";
import SucessForgot from "../pages/sucess-forgot";

export default function AuthRoutes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Login} />
      <Route path="/cadastro" component={CadastroAccount} />
      <Route path="/sucess" component={SucessNewAccount} />
      <Route path="/forgot" component={ForgotPassword} />
      <Route path="/sucess-forgot" component={SucessForgot} />
    </BrowserRouter>
  );
}
