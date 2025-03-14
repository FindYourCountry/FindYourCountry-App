async function fetchCountryData(country) {
    try {
      const response = await fetch(`https://restcountries.com/v3.1/name/${country}`);
      if (!response.ok) {
        throw new Error("Country not found");
      }
      
      const data = await response.json();
      console.log(data)
      updateCountryInfo(data[0]); // Update the UI with the first result
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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