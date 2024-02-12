import React from "react"
import Person from "./Person"

const Numbers = ({ filteredPersons, persons, inputValue, setPersons}) => (
  <div>
    <h2>Numbers</h2>
    <table>
      <tbody>
        {inputValue === '' ? (
            persons.map(person => 
              <Person key={person.id} persons={person} setPersons={setPersons} />)
          ) : (
            filteredPersons.map(fperson => 
              <Person key={fperson.id} persons={fperson} setPersons={setPersons}/>) 
          )}
      </tbody>
    </table>
  </div>
)

export default Numbers