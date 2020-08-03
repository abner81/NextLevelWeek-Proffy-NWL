import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import { Landing } from './pages/landing'
import TeacherList from './pages/teacherList/TeacherList'
import TeacherForm from './pages/teacherForm/TeacherForm'

export default function Routes() {
  return (
    <BrowserRouter>
      <Route path='/' exact component={Landing} /> 
      <Route path='/study' component={TeacherList} /> 
      <Route path='/give-classes' component={TeacherForm} /> 
    </BrowserRouter>
  )
}
