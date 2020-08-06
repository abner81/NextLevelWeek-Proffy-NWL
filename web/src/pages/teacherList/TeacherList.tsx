import React, { useState, FormEvent } from 'react'

import './styles.css'

import TeacherItem from '../../components/TeacherItem'
import PageHeader from '../../components/PageHeader'
import Input from '../../components/Input'
import Select from '../../components/Select'

export default function TeacherList() {
  const [subject, setSubject] = useState('')
  const [week_day, setWeek_day] = useState('')
  const [time, setTime] = useState('')

  const searchTeachers = (e: FormEvent) => {
    e.preventDefault()

    
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis.">
        <form id="search-teachers" onSubmit={searchTeachers}>
          <Select
            name='subject'
            label='Matéria'
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            options={[
              { value: 'Artes', label: 'Artes' },
              { value: 'Química', label: 'Química' },
              { value: 'Física', label: 'Física' },
              { value: 'Matemática', label: 'Matemática' },
              { value: 'Educação Física', label: 'Educação Física' },
              { value: 'Literatura', label: 'Artes' },
              { value: 'Sociologia', label: 'Sociologia' },
              { value: 'Filosofia', label: 'Filosofia' },
              { value: 'Protuguês', label: 'Protuguês' },
              { value: 'Inglês', label: 'Inglês' },
              { value: 'Espanhol', label: 'Espanhol' },
            ]}
          />

          <Select
            name='week_day'
            label='Dia da semana'
            value={week_day}
            onChange={(e) => setWeek_day(e.target.value)}
            options={[
              { value: '0', label: 'Domingo' },
              { value: '1', label: 'Segunda-feira' },
              { value: '2', label: 'Terça-feira' },
              { value: '3', label: 'Quarta-feira' },
              { value: '4', label: 'Quinta-feira' },
              { value: '5', label: 'Sexta-feira' },
              { value: '6', label: 'Sábado' },
            ]}
          />

          <Input type='time' name='time' label='Hora' value={time}
            onChange={(e) => setTime(e.target.value)} />
        </form>
      </PageHeader>

      <main>
        <TeacherItem />
        <TeacherItem />
        <TeacherItem />
        <TeacherItem />
      </main>
    </div>
  );
}
