import './style.css'
'use strict';

fetch('https://date.nager.at/api/v3/publicholidays/2026/NL')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Er ging iets mis:', error));

fetch('https://restcountries.com/v3.1/all?fields=name,cca2,flags')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Er ging iets mis:', error));
