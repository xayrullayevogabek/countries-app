const cardContainer = document.querySelector("#cards-row"),
  modeBtn = document.querySelector("#theme-switch"),
  body = document.body,
  topNav = document.querySelector("#top-nav"),
  title = document.querySelector("#title"),
  input = document.querySelector(".form-control"),
  select = document.querySelector(".form-select");

let allCountriesData;

fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    updateUI(data);
    allCountriesData = data;
  });

select.addEventListener("change", (e) => {
  if (e.target.value !== "All") {
    fetch(`https://restcountries.com/v3.1/region/${e.target.value}`)
      .then((res) => res.json())
      .then((data) => updateUI(data));
  } else {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => updateUI(data));
  }
});

input.addEventListener('input',(e) => {
  console.log(e.target.value)
  const filteredData = allCountriesData.filter(item => item.name.common.toLowerCase().includes(e.target.value))
  updateUI(filteredData)
})

const updateUI = (data) => {
  cardContainer.innerHTML = "";
  if(data.length < 5){
    data.map((item) => {
      cardContainer.innerHTML += `
          <div class="col col-sm-8 col-md-8 col-lg-10 col-xl-10">
            <div id="card" class="card" style="width: 100%">
              <a href="country.html?name=${item.name.common}"> 
                <img src="${item.flags.png}" class="card-img-top card-img" alt="..." />
              </a>
                <div class="card-body">
                  <h5 class="card-title mb-4"><strong>${item.name.common}</strong><h5>
                  <p class="card-text"><strong>Population: </strong>${item.population}</p>
                  <p class="card-text"><strong>Region: </strong>${item.region}</p>
                  <p class="card-text"><strong>Capital: </strong>${item.capital}</p>
                </div>
               
            </div>
          </div> 
        `;
    });
  }else{
    data.map((item) => {
      cardContainer.innerHTML += `
          <div class="col col-sm-6 col-md-4 col-lg-3 col-xl-2">
            <div id="card" class="card" style="width: 100%">
              <a href="country.html?name=${item.name.common}"> 
                <img src="${item.flags.png}" class="card-img-top card-img" alt="..." />
              </a>
                <div class="card-body">
                  <h5 class="card-title mb-4"><strong>${item.name.common}</strong><h5>
                  <p class="card-text"><strong>Population: </strong>${item.population}</p>
                  <p class="card-text"><strong>Region: </strong>${item.region}</p>
                  <p class="card-text"><strong>Capital: </strong>${item.capital}</p>
                </div>
               
            </div>
          </div> 
        `;
    });
  }

};

modeBtn.addEventListener("change", () => {
  localStorage.setItem("theme", modeBtn.checked.toString());
  darkMode();
});

const darkMode = () => {
  const themeValue = localStorage.getItem("theme");
  const cards = document.querySelectorAll("#card");
  if (themeValue == "true") {
    topNav.classList.add("dark-nav");
    body.classList.add("dark-body");
    title.style.color = "#fff";
    cards.forEach((item) => {
      item.classList.add("dark-card");
    });
    input.classList.add("dark-card");
    select.classList.add("dark-card");
  } else {
    topNav.classList.remove("dark-nav");
    body.classList.remove("dark-body");
    title.style.color = "#000";
    cards.forEach((item) => {
      item.classList.remove("dark-card");
    });
    input.classList.remove("dark-card");
    select.classList.remove("dark-card");
  }
};
darkMode();
