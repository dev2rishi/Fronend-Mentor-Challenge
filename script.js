const countriesContainer = document.querySelector('.countries-container')
const scrollToTop = document.querySelector('.scroll-to-top')
const filterByRegion = document.querySelector('.filter-by-region')
const searchCountries = document.querySelector('.search-container input')
const themeChanger = document.querySelector('.theme-changer')
const darkModeIcon = document.querySelector('.theme-changer i')

let allCountries
let allCountriesByRegion

searchCountries.value = ""

    try {
        fetch('https://restcountries.com/v3.1/all')
        .then((res) => res.json())
        .then((data) => {
            allCountries = data
            .sort((a, b) => a.name.common.localeCompare(b.name.common))
            renderCountries(allCountries)
        })
    } catch (error) {
        console.log(error)
    }

filterByRegion.addEventListener('change', (e) => {
    try {
     // console.log(filterByRegion.value)
        fetch(`https://restcountries.com/v3.1/region/${e.target.value}`)
        .then((res) => res.json())
        .then((data) => {
            allCountriesByRegion = data
            .sort((a, b) => a.name.common.localeCompare(b.name.common))
            renderCountries(allCountriesByRegion)
         })
    } catch (error) {
        console.log(error)
    }

})

const filteredCountries = (countries, event) => {
    const filteredCountries =  countries
      .filter((country) => country.name.common.toLowerCase()
      .includes(event.target.value.toLowerCase()))
      renderCountries(filteredCountries)
 }

searchCountries.addEventListener('input', (e) => {
    if(allCountries) {
      filteredCountries(allCountries, e)
    }
    if(allCountriesByRegion) {
       filteredCountries(allCountriesByRegion, e)
    }
})

const renderCountries = (data) => {
    countriesContainer.innerHTML = ''
    try {
        data.forEach(country => {
            const countryCard = document.createElement('a')
            countryCard.classList.add('country-card')
            countryCard.href = `country.html?name=${country.name.common}`
            countryCard.innerHTML = 
            `<img src="${country.flags.svg}" alt="${country.flags.alt}">
            <div class="card-text">
                <h3 class="card-title">${country.name.common}</h3>
                <p><b>Population: </b> ${country.population.toLocaleString('en-IN')}</p>
                <p><b>Region: </b> ${country.region}</p>
                <p><b>Capital: </b> ${country.capital ? country.capital : 'None'}</p>
            </div>`
    
            countriesContainer.append(countryCard)
        });
    } catch (error) {
        console.log(error)
    }

}

themeChanger.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode')
    darkModeIcon.classList.toggle('fa-solid')
  })

scrollToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 1,
        left: 0,
        behavior: 'smooth'
    })
})