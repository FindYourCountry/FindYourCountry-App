const url = "https://restcountries.com/v3.1/all";

axios.get(url)
.then(res => {

 const country = res.data[180];

 console.log(country)

 console.log(`waa falags ${country.flags.png}`)
 console.log(`waa tirida dadka ${country.population}`)
 

    
}).catch(err => {
  console.log("sax maaha api", err)
})