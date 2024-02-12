import React from 'react'
import personService from '../services/persons'

const Person = ({ persons, setPersons}) => {
  const eliminatePerson = () => {
    if (window.confirm(`Do you really want to delete ${persons.name}?`)) {
      personService
        .eliminate(persons.id)
        .then(() => {
          setPersons(prevPersons => prevPersons.filter(person => person.id !== persons.id));
        })
        .catch(error => {
          console.error('Error deleting person:', error);
        });
    }
  }

  return(
    <tr>
      <td>{persons.name}</td>
      <td>{persons.number}</td>
      <td><button onClick={eliminatePerson}>delete</button></td>
    </tr>
  )
}

export default Person