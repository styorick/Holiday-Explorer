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

fetch('https://date.nager.at/api/v3/publicholidays/2026/BE')
  .then(response => response.json())
  .then(feestdagen => {
    const feestdagenlijst = document.getElementById('feestdagen-lijst');

    feestdagen.forEach(feestdag => {
      const tr = document.createElement('tr');
      const tdDatum = document.createElement('td');
      const tdLocalNaam = document.createElement('td');
      const tdEngelseNaam = document.createElement('td');
      const tdLandCode = document.createElement('td');
      const tdType = document.createElement('td');
      const tdGlobaal = document.createElement('td');

      tdDatum.textContent = feestdag.date;
      tdLocalNaam.textContent = feestdag.localName;
      tdEngelseNaam.textContent = feestdag.name;
      tdLandCode.textContent = feestdag.countryCode;
      tdType.textContent = feestdag.types.join(', ');
      tdGlobaal.textContent = feestdag.global ? 'Ja' : 'Nee';
      
      tr.appendChild(tdDatum);
      tr.appendChild(tdEngelseNaam);
      tr.appendChild(tdLocalNaam);
      tr.appendChild(tdLandCode);
      tr.appendChild(tdType);
      tr.appendChild(tdGlobaal);

      feestdagenlijst.appendChild(tr);
    })
  })
  .catch(error => {
      document.getElementById('error-message').textContent = 
        `Er ging iets mis: ${error.message}`;
  });