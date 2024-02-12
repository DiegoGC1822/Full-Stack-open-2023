import React,{useState} from 'react'
import personService from '../services/persons'

const Forms = ({setPersons,persons,setMessage}) => {

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')

  const addName = (event) =>{
      event.preventDefault()
      if (newName === '' || newNumber === ''){
        alert('Please put name and number')
      }else if(persons.some((person) => person.name.toLowerCase() === newName.toLowerCase())){
        const existingPerson = persons.find((p) => p.name.toLowerCase() === newName.toLowerCase())
        handleUpdate(existingPerson)
      }else{
        const newPerson = { name: newName, number: newNumber}
        personService
          .create(newPerson)
          .then(createdPersons => {
            setPersons(persons.concat(createdPersons))
            const message = {
              content: `Added ${newName}`,
              color: 'green',
              background: 'lightgrey',
              fontSize: 20,
              borderStyle: 'solid',
              borderRadius: 5,
              padding: 10,
              marginBottom: 10,
            }
            setMessage(message)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
      }
      setNewName('')
      setNewNumber('')
  }
  
  const handleUpdate = (person) => {
    if (window.confirm(`${person.name} ya está en la libreta de teléfonos. ¿Quieres reemplazar el antiguo número con uno nuevo?`)) {
      const updatedPerson = { ...person, number: newNumber };
      personService
        .update(person.id, updatedPerson)
        .then((returnedPerson) => {
          setPersons(persons.map((p) => (p.id !== person.id ? p : returnedPerson)));
        })
        .catch((error) => {
          const message = {
            content: `Information of ${person.name} has already been removed from server`,
            color: 'red',
            background: 'lightgrey',
            fontSize: 20,
            borderStyle: 'solid',
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
          }
          setMessage(message)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
  }

    return(
      <div>
        <h2>add a new</h2>
        <form onSubmit={addName}>
          <div>
            name: <input value={newName} onChange={(event) => setNewName(event.target.value)}/>
          </div>
          <div>
            number: <input value={newNumber} onChange={(event) => setNewNumber(event.target.value)}/>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </div>
    )
}

export default Forms