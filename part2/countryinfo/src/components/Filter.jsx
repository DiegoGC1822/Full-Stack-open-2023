const Filter = ({countries,setFilteredCountries}) => {

    const handleInputChange = (event) => {
        const searchTerm = event.target.value.toLowerCase()

        const filteredCountries = countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm)
        )

        setFilteredCountries(filteredCountries)
    }

    return(
        <div>
            <label htmlFor="searchInput">find countries</label>
            <input onChange={handleInputChange}/>
        </div>
    )
}

export default Filter