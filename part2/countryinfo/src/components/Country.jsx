import SpecificCountry from "./SpecificCountry"
import { useState } from "react"

const Country = ({filteredCountries}) => {

    if(filteredCountries.length > 10) {

        return(
            <p>Too many matches, specify another filter</p>
        )

    }else if(filteredCountries.length <= 10 & filteredCountries.length > 1){

        const [selectedCountry, setSelectedCountry] = useState(null)

        const showCountry = (country) => {
          setSelectedCountry(country);
        }

        return(
            <div style={{margin: '10px 0px'}}>
                {filteredCountries.map((country,index) => (
                    <div key={index} style={{margin: '10px 0px'}}>
                        {country.name.common}
                        <button onClick={() => showCountry(country)} style={{marginLeft: '5px'}}>show</button>
                    </div>))}
                {selectedCountry && <SpecificCountry country={selectedCountry} />}
            </div>
        )

    }else if(filteredCountries.length === 1){

        const country = filteredCountries[0]

        return(
            <SpecificCountry country={country}/>
        )
    }
}

export default Country