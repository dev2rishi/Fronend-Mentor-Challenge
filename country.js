const countryName = new URLSearchParams(location.search).get('name')
const flagImage = document.querySelector('.country-details img')
const countryNameCommon = document.querySelector('.country-details h1')
const nativeName = document.querySelector('.native-name')
const population = document.querySelector('.population')
const region = document.querySelector('.region')
const subRegion = document.querySelector('.sub-region')
const capital = document.querySelector('.capital')
const topLevelDomain = document.querySelector('.top-level-domain')
const currencies = document.querySelector('.currencies')
const languages = document.querySelector('.languages')
const borderCountries = document.querySelector('.border-countries')
const themeChanger = document.querySelector('.theme-changer')
const darkModeIcon = document.querySelector('.theme-changer i')


themeChanger.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode')
  darkModeIcon.classList.toggle('fa-solid')
})

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then(([country]) => {
    flagImage.src = country.flags.svg
    flagImage.alt = country.flags.alt ? country.flags.alt : 'Flag-image'
    countryNameCommon.innerText = country.name.common

    nativeName.innerText = country.name.nativeName ? Object.values(country.name.nativeName)[0].common : country.name.common

    population.innerText = country.population.toLocaleString('en-IN')

    region.innerText = country.region

    subRegion.innerText = country.subregion ? country.subregion : 'None';

    capital.innerText = country.capital ? country.capital.join(', ') : 'None';

    topLevelDomain.innerText = country.tld.join(', ');

    currencies.innerText = country.currencies ? Object.values(country.currencies)
    .map((currency) => currency.name)
    .join(', ') : 'None';

    languages.innerText = country.languages ? Object.values(country.languages).join(', ') : 'None';

    if(country.borders) {
      country.borders.forEach(border => {
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
        .then((res) => res.json())
        .then(([borderCountry]) => {
         const borderCountryTag = document.createElement('a')
         borderCountryTag.innerText = borderCountry.name.common
         borderCountryTag.href = `country.html?name=${borderCountry.name.common}`
         borderCountries.append(borderCountryTag)
        })
        .catch((error) => console.error(error))
      })
    } else {
      const borderCountryTag = document.createElement('a')
      borderCountryTag.innerText = 'Nil'
      borderCountries.append(borderCountryTag)
      
    }
  })


