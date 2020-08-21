import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import { Landing } from './pages/landing'
import TeacherList from './pages/teacherList/TeacherList'
import TeacherForm from './pages/teacherForm/TeacherForm'
import Login from './pages/login'
import CadastroAccount from './pages/cadastro-account'
import SucessNewAccount from './pages/sucess-create-account'

export default function Routes() {
  return (
    <BrowserRouter>
      <Route path='/sucess' component={SucessNewAccount} /> 
      <Route path='/cadastro' component={CadastroAccount} /> 
      <Route path='/login' component={Login} /> 
      <Route path='/' exact component={Landing} /> 
      <Route path='/study' component={TeacherList} /> 
      <Route path='/give-classes' component={TeacherForm} /> 
    </BrowserRouter>
  )
}
