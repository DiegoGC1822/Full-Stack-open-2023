import React, { useState,useEffect } from 'react'
import PersonFilter from './components/PersonFilter'
import Forms from './components/Forms'
import Numbers from './components/Numbers'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [filteredPersons,setFilteredPersons] = useState([])
  const [inputValue,setInputValue] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  return (
    <div>
      <PersonFilter persons={persons} setFilteredPersons={setFilteredPersons} setInputValue={setInputValue} message={message}/>
      <Forms persons={persons} setPersons={setPersons} setFilteredPersons={setFilteredPersons} setMessage={setMessage}/>
      <Numbers filteredPersons={filteredPersons} persons={persons} inputValue={inputValue} setPersons={setPersons} />
    </div>
  )
}

export default App