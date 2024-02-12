import { useState,useEffect } from "react"
import Filter from './components/Filter'
import Country from "./components/Country"
import axios from 'axios'

const App = () => {
  const [countries,setCountries] = useState([])
  const [filteredCountries,setFilteredCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
        setFilteredCountries(response.data)
      })
  }, [])

  return(
    <div>
      <Filter countries={countries} setFilteredCountries={setFilteredCountries}/>
      <Country filteredCountries={filteredCountries}/>
    </div>
  )
}

export default App