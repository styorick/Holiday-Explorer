import './style.css';
'use strict';
//=======================
//       STORAGE      
//=======================

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  document.body.classList = savedTheme;
}

let favourites = JSON.parse(localStorage.getItem('favourites')) || [];


//=======================
//        BUTTONS      
//=======================
const searchInput = document.getElementById('search-input');
const continentFilter = document.getElementById('continent-filter');

//creating a generic function
function filterCards() {
  document.querySelectorAll('article').forEach(card => {
    const selectedContinent = continentFilter.value;
    const searchTerm = searchInput.value.toLowerCase();
    const region = card.dataset.region;
    const text = card.textContent.toLowerCase();

    const matchContintent = selectedContinent === '' || region === selectedContinent;
    const matchSearch = text.includes(searchTerm);

     card.style.display = matchContintent && matchSearch ? 'block' : 'none';
  });
}

// add event listener to search input nd continent filter
searchInput.addEventListener('input', filterCards);
continentFilter.addEventListener('change', filterCards);

// add event listener to sort button
const sortButton = document.getElementById('sort-button');
let sortasc = true;
sortButton.addEventListener('click', () => {
  sortasc = !sortasc;

  const countries = Array.from(document.querySelectorAll('article'));
  countries.sort((a, b) => {
    const nameA = a.textContent.toLowerCase();
    const nameB = b.textContent.toLowerCase();
    return sortasc ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
  });
  countries.forEach(country => countryCards.appendChild(country));
});

// add event listeren to theme toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  const darkMode = document.body.classList.toggle('dark-theme')
  themeToggle.querySelector('img').src = darkMode ? '/dark-mode.svg' : '/light-mode.svg';
  localStorage.setItem('theme', darkMode ? 'dark-theme' : '');
});

// add event listener to favourites filter
const favouritesFilter = document.getElementById('favourites-filter');
favouritesFilter.addEventListener('change', () => {
  const showFavouritesOnly = favouritesFilter.checked;
  document.querySelectorAll('article').forEach(card => {
    const countryCode = card.dataset.code;
    const isFavourite = favourites.includes(countryCode);
    card.style.display = !showFavouritesOnly || isFavourite ? 'block' : 'none';
  });
});

//=======================
//        FUNCTIONS    
//=======================

const yearFilter = document.getElementById('year-filter');

// fetch holidays for a specific country code
async function getHolidays(countrycode) {
  const year = yearFilter.value;
  try {
    const response = await fetch(`https://date.nager.at/api/v3/publicholidays/${year}/${countrycode}`);
    const holidays = await response.json();
    return holidays;
  } catch (error) {
    console.error('There is something wrong:', error);
    throw error;
  }
}

// display holidays in the table
function showHolidays(holidays) {
  const holidaysList = document.getElementById('holidays-list');
  if (holidaysList) {
    holidaysList.innerHTML = '';
  }
  holidays.forEach(holiday => {
      const tr = document.createElement('tr');
      const tdDate = document.createElement('td');
      const tdLocalName = document.createElement('td');
      const tdEnglishName = document.createElement('td');
      const tdCountryCode = document.createElement('td');
      const tdType = document.createElement('td');
      const tdGlobal = document.createElement('td');

      tdDate.textContent = new Date(holiday.date).toLocaleDateString('nl-BE', { day: '2-digit', month: '2-digit', year: 'numeric' });
      tdLocalName.textContent = holiday.localName;
      tdEnglishName.textContent = holiday.name;
      tdCountryCode.textContent = holiday.countryCode;
      tdType.textContent = holiday.types.join(', ');
      tdGlobal.textContent = holiday.global ? 'Yes' : 'No';
      
      tr.appendChild(tdDate);
      tr.appendChild(tdEnglishName);
      tr.appendChild(tdLocalName);
      tr.appendChild(tdCountryCode);
      tr.appendChild(tdType);
      tr.appendChild(tdGlobal);

      holidaysList.appendChild(tr);
  })
}

// fetch available countries and country info, then display them as cards
const countryCards = document.getElementById('countries-cards');
async function getAvailableCountries() {
  try {
    const response = await fetch('https://date.nager.at/api/v3/AvailableCountries');
    const countries = await response.json();
    return countries;
  } catch (error) {
    console.error('There is something wrong:', error);
    throw error;
  }
}

// fetch country info from restcountries API
async function getCountryInfo() {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2,flags,region');
    const countries = await response.json();
    return countries;
  } catch (error) {
    console.error('There is something wrong:', error);
    throw error;
  }
}

// load countries, filter them based on available countries, and display them as cards
async function loadCountries() {
  try {
    const avalailableCountries = await getAvailableCountries();
    const countryInfo = await getCountryInfo();
    
    const countryCodes = avalailableCountries.map(country => country.countryCode);
    const filteredCountries = countryInfo.filter(country =>
      countryCodes.includes(country.cca2)
    );
    return filteredCountries;
  } catch (error) {
    console.error('There is something wrong:', error);
    throw error;
  }
}

loadCountries()
  .then(countries => {
    countries.forEach(country => {
      const card = document.createElement('article');
      const countryName = document.createElement('h2');
      const flag = document.createElement('img');
      const favobutton = document.createElement('button');
      const favoIcon = document.createElement('img')

      countryName.textContent = country.name.common;
      flag.dataset.src = country.flags.png;
      flag.src = '';
      flag.classList.add('lazy');
      favoIcon.src = '/heart-grey.svg';
      favobutton.appendChild(favoIcon)
      if (favourites.includes(country.cca2)) {
        favoIcon.src = '/heart-colour.svg';
      }


      card.appendChild(countryName);
      card.appendChild(flag);
      card.appendChild(favobutton); 
      card.dataset.region = country.region;
      card.dataset.code = country.cca2;

      //stop double click event on favobutton
      function stopBubbling(evt) {
        evt.stopPropagation();
        evt.cancelBubble = true;
      }

      favobutton.addEventListener('click', (evt) => {
        stopBubbling(evt);

        if (favourites.includes(country.cca2)) {
            favourites = favourites.filter(code => code !== country.cca2);
            favoIcon.src = '/heart-grey.svg';
          } else {
            favourites.push(country.cca2);
            favoIcon.src = '/heart-colour.svg';
          }
        localStorage.setItem('favourites', JSON.stringify(favourites));
      });

      //click event on card
      card.addEventListener('click', () => {
        const popup = document.getElementById('popup')

        getHolidays(country.cca2)
          .then(holidays => {
            showHolidays(holidays);
            popup.classList.add('open')
          });
      });
      countryCards.appendChild(card);
    });
    
    //lazy-images
    const lazyImages = document.querySelectorAll('img.lazy');
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '100px 0px',
      threshold: 0.1
    });
    lazyImages.forEach(img => imageObserver.observe(img)); 

  })
  .catch(error => console.error('There is something wrong:', error));

  const closePopup = document.getElementById('close-popup');
  closePopup.addEventListener('click', () => {
    document.getElementById('popup').classList.remove('open');
  });

    
    

  