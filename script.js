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

let quizCountry = null;

// Function to get a random country for the quiz
async function getRandomCountry() {
  try {
    const response = await axios.get("https://restcountries.com/v3.1/all");
    const countries = response.data;
    quizCountry = countries[Math.floor(Math.random() * countries.length)];

    // Show the flag of the selected country
    document.getElementById("quiz-flag").src = quizCountry.flags.svg;
  } catch (error) {
    console.error("Error fetching countries:", error);
  }
}

// Check user's guess
function checkGuess() {
  const userGuess = document.getElementById("guess-input").value.trim().toLowerCase();
  const correctAnswer = quizCountry.name.common.toLowerCase();

  if (userGuess === correctAnswer) {
    alert("🎉 Correct! You guessed the right country!");
    getRandomCountry(); // Load a new country after correct guess
  } else {
    alert("❌ Incorrect! Try again.");
  }
}

// Provide a hint
function getHint() {
  alert(`Hint: The country's capital is ${quizCountry.capital?.[0] || "N/A"}`);
}

// Start the quiz on page load
getRandomCountry();

function resetGuess() {
  document.getElementById("guess-input").value = ""; 
  getRandomCountry();// Clear input field
}
