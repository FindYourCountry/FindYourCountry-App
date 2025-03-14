async function fetchCountryData(country) {
 const url=`https://restcountries.com/v3.1/name/${country}`;
 axios.get(url).then(res=>{
    updateCountryInfo(res.data[0]); 
    // Update the UI with the first result
})

}

function updateCountryInfo(country) {
    document.getElementById("country-info").classList.remove("hidden"); //show the country

  
    document.getElementById("country-flag").src = country.flags.svg;
    document.getElementById("country-name").textContent = country.name.common;
    document.getElementById("capital").textContent = country.capital?.[0] || "N/A";
    document.getElementById("population").textContent = country.population.toLocaleString();
    document.getElementById("languages").textContent = Object.values(country.languages || {}).join(", ");
    document.getElementById("currency").textContent = Object.values(country.currencies || {}).map(c => c.name).join(", ");
    document.getElementById("maps-link").href = country.maps.googleMaps;
  }
  
  fetchCountryData("Somalia"); 
  
  function searchCountry() {
    const country = document.getElementById("search-box").value.trim();
    if (country) {
      fetchCountryData(country);
    }
  }

  document.getElementById("search-box").addEventListener("keypress", function(event) {
    if (event.key === "Enter") { // Check if Enter key is pressed
        searchCountry();
    }

});

