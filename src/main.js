import './style.css';
'use strict';

fetch('https://date.nager.at/api/v3/publicholidays/2026/NL')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Er ging iets mis:', error));

fetch('https://restcountries.com/v3.1/all?fields=name,cca2,flags')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Er ging iets mis:', error));

async function getFeestdagen(landcode) {
  try {
    const response = await fetch(`https://date.nager.at/api/v3/publicholidays/2026/${landcode}`);
    const feestdagen = await response.json();
    return feestdagen;
  } catch (error) {
    console.error('Er ging iets mis:', error);
    throw error;
  }
}

function showFeestdagen(feestdagen) {
  
  const feestdagenlijst = document.getElementById('feestdagen-lijst');
  if (feestdagenlijst) {
    feestdagenlijst.innerHTML = '';
  }
  feestdagen.forEach(feestdag => {
      const tr = document.createElement('tr');
      const tdDatum = document.createElement('td');
      const tdLocalNaam = document.createElement('td');
      const tdEngelseNaam = document.createElement('td');
      const tdLandCode = document.createElement('td');
      const tdType = document.createElement('td');
      const tdGlobaal = document.createElement('td');

      tdDatum.textContent = new Date(feestdag.date).toLocaleDateString('nl-BE', { day: '2-digit', month: '2-digit', year: 'numeric' });
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
}

const LandenKaarten = document.getElementById('landen-kaarten');
const landen = ['NL', 'BE', 'DE', 'FR', 'ES'];
fetch('https://restcountries.com/v3.1/all?fields=name,cca2,flags')
  .then(response => response.json())
  .then(countries => {
    const gefilterdeLanden = countries.filter(country => 
      landen.includes(country.cca2)
    );
    gefilterdeLanden.forEach(land => {
      const kaart = document.createElement('article');
      const landNaam = document.createElement('h2');
      const vlag = document.createElement('img');

      landNaam.textContent = land.name.common;
      vlag.src = land.flags.png;
      kaart.appendChild(landNaam);
      kaart.appendChild(vlag);
      kaart.addEventListener('click', () => {
        getFeestdagen(land.cca2)
          .then(feestdagen => {
            showFeestdagen(feestdagen);
          });
      });
      LandenKaarten.appendChild(kaart);
    })
  })
  .catch(error => console.error('Er ging iets mis:', error));