const checkbox = document.querySelector("#theme-switch"),
  body = document.querySelector("body"),
  nav = document.querySelector(".top-nav"),
  btn = document.querySelector(".btn"),
  navTitle = document.querySelector(".nav-title"),
  details = document.querySelector(".detail"),
  text = document.querySelectorAll(".detail-text p"),
  countryName = document.querySelector(".country-name"),
  nativeName = document.querySelector(".native-name"),
  population = document.querySelector(".population"),
  region = document.querySelector(".region"),
  subRegion = document.querySelector(".subregion"),
  capital = document.querySelector(".capital"),
  topLevelDomain = document.querySelector(".domain"),
  currencies = document.querySelector(".currencies"),
  languages = document.querySelector(".languages"),
  borderCountry = document.querySelector(".border-country-container"),
  flag = document.querySelector(".flag")

const getData = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const urlName = urlParams.get("name");
  await fetch(`https://restcountries.com/v3.1/name/${urlName}?fullText=true`)
    .then((res) => res.json())
    .then((data) => updateUI(data));
};
getData();

const updateUI = ([data]) => {
  population.textContent = data.population;
  region.textContent = data.region;
  flag.src = data.flags.png;
  countryName.textContent = data.name.common;
  if (data.subregion) {
    subRegion.textContent = data.subregion;
  } else {
    subRegion.textContent = "Subregion is not defined";
  }
  if (data.name.nativeName) {
    const nameNative = Object.values(data.name.nativeName);
    nativeName.innerText = nameNative[0].common;
  } else {
    nativeName.textContent = data.name.common;
  }
  if (data.capital) {
    capital.textContent = data.capital[0];
  } else {
    capital.textContent = data.name.common;
  }
  if (data.tld) {
    topLevelDomain.textContent = data.tld[0];
  } else {
    topLevelDomain.textContent = "Top level domain is not found";
  }
  if (data.currencies) {
    const dataCurrencies = Object.values(data.currencies);
    currencies.textContent = dataCurrencies[0].symbol;
  } else {
    currencies.textContent = "Curresncies is not defined";
  }
  if (data.languages) {
    const dataLanguages = Object.values(data.languages);
    dataLanguages.map((item) => {
      languages.innerHTML += `
      <span class="detail-obj">${item}</span>
      `;
    });
  } else {
    languages.innerHTML +=
      '<span class="detail-obj">Languages is not defined</span>';
  }
  if (data.borders) {
    data.borders.forEach((item) => {
      fetch(`https://restcountries.com/v3.1/alpha/${item}`)
        .then((res) => res.json())
        .then(([border]) => {
          const btn = document.createElement('button')
          btn.classList.add('border-country')
          btn.textContent = border.cca3
          borderCountry.appendChild(btn)
          btn.addEventListener('click',() => {
            window.location.href = `country.html?name=${border.name.common}`
          })
        });
    });
    // data.borders.map(item => {
    //   borderCountry.innerHTML += `
    //     <button class="border-country">${item}</button>
    //   `
    // })
  } else {
    borderCountry.innerHTML += `
      <h5 class='error-border' style='margin-top:5px;'>Border Countries is not defined</h5>
    `;
  }
};


checkbox.addEventListener("change", () => {
  window.localStorage.setItem("theme", checkbox.checked.toString());
  darkMode();
});

const darkMode = () => {
  const themeValue = localStorage.getItem("theme");
  const errorBorder = document.querySelector(".error-border");
  const borderBtn = document.querySelectorAll('.border-country')
  if (themeValue == "true") {
    body.style.backgroundColor = "#202d36";
    nav.classList.add("dark-mode");
    btn.classList.add("dark-mode");
    navTitle.style.color = "#fff";
    text.forEach((item) => {
      item.classList.add("dark-text");
    });
    countryName.style.color = "#fff";
    if (errorBorder) {
      errorBorder.style.color = "#fff";
    }
    borderBtn.forEach(item => item.classList.add('dark-border'))
  } else {
    body.style.backgroundColor = "#fff";
    nav.classList.remove("dark-mode");
    btn.classList.remove("dark-mode");
    navTitle.style.color = "#000";
    text.forEach((item) => {
      item.classList.remove("dark-text");
    });
    countryName.style.color = "#000";
    if (errorBorder) {
      errorBorder.style.color = "#000";
    }
    borderBtn.forEach(item => item.classList.remove('dark-border'))
  }
};
darkMode();

