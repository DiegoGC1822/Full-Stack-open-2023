import React from 'react'
import Notification from './Notification'

const PersonFilter = ({ persons, setFilteredPersons, setInputValue, message }) => {

  const handleInputChange = (event) => {
    const searchTerm = event.target.value.toLowerCase()
    setInputValue(searchTerm)
    const filteredPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(searchTerm)
    )

    setFilteredPersons(filteredPersons)
    console.log(persons)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <label htmlFor="searchInput">Search users:</label>
      <input onChange={handleInputChange}/>
    </div>
  )
}

export default PersonFilter