## [2026-06-03] JavaScript zoekfunctie debuggen

**Tool:** Claude (Anthropic)  
**Context:** Schoolproject — debugging JavaScript

### Prompt
Ik weet niet wat er hier fout is. De tekst in het zoekveld moet overeenkomen met de tekst in de 'card':

```javascript
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase();
  document.querySelectorAll('article').forEach(card => {
    card.includes(searchTerm) ? card.style.display = 'block' : card.style.display = 'none';
  });
});
```

### Antwoord (samenvatting)
`card` is een DOM-element, geen string — `.includes()` werkt niet rechtstreeks op een element.
Oplossing: gebruik `card.textContent.toLowerCase()` om eerst de tekstinhoud op te halen.

### Gecorrigeerde code
```javascript
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase();
  document.querySelectorAll('article').forEach(card => {
    const text = card.textContent.toLowerCase();
    card.style.display = text.includes(searchTerm) ? 'block' : 'none';
  });
});
```

### Wat ik hieruit leer
- `querySelectorAll` geeft DOM-elementen terug, geen strings
- Tekstinhoud van een element opvragen doe je via `.textContent`
- Pas daarna kan je `.includes()` gebruiken voor een zoekvergelijking


## [2026-06-05] Theme toggle met zon/maan icoon

**Tool:** Claude (Anthropic)  
**Context:** Schoolproject — theme switcher verbeteren met SVG iconen

### Prompt
Hoe kan ik de theme toggle verbeteren met een zon/maan icoon?

### Antwoord (samenvatting)
De bestaande `light-mode.svg` en `dark-mode.svg` bestanden worden gebruikt via een `<img>` tag in de toggle button. De src wisselt via `themeToggle.querySelector('img').src` op basis van of de `dark-theme` class actief is op de body.

### Gecorrigeerde code
```javascript
themeToggle.addEventListener('click', () => {
  const darkMode = document.body.classList.toggle('dark-theme');
  themeToggle.querySelector('img').src = darkMode ? '/dark-mode.svg' : '/light-mode.svg';
  localStorage.setItem('theme', darkMode ? 'dark-theme' : '');
});
```

### Wat ik hieruit leer
- Dat het via .src wordt opgevraagd en niet gewoon via img


## [2026-06-05] Hartje positioneren in rechterbovenhoek van een card

**Tool:** Claude (Anthropic)  
**Context:** Schoolproject — CSS positionering

### Prompt
Ik wil dat de hartjes in de rechterbovenhoek van de boxen staan. Hoe zou je dat aanpakken?

### Antwoord (samenvatting)
Via CSS `position: absolute` op het hartje en `position: relative` op de parent card.
Zo wordt het hartje gepositioneerd relatief aan de card zelf, niet aan de pagina.

### Gebruikte code
```css
article {
  position: relative;
}

.favorite-btn {
  position: absolute;
  top: 12px;
  right: 12px;
}
```

### Wat ik hieruit leer
- Een element met `position: absolute` positioneert zich relatief aan het dichtstbijzijnde parent-element met `position: relative`
- Zonder `position: relative` op de parent zou het hartje zich positioneren ten opzichte van de hele pagina
- `top` en `right` bepalen de exacte afstand vanaf de randen van de parent


## [2026-06-06] Popup opent niet na klikken op kaart

**Tool:** Claude (Anthropic)  
**Context:** Schoolproject — debugging JavaScript

### Prompt
Mijn popup opent niet als ik op een kaart klik. Dit is mijn code:

```javascript
popup.classlist.add('open')
```

### Antwoord (samenvatting)
Typo: `classlist` moet `classList` zijn (hoofdletter L). JavaScript is hoofdlettergevoelig.

### Gecorrigeerde code
```javascript
popup.classList.add('open')
```


## [2026-06-06] IntersectionObserver laadt niet alle afbeeldingen

**Tool:** Claude (Anthropic)  
**Context:** Schoolproject — debugging IntersectionObserver

### Prompt
Mijn lazy loading werkt niet voor alle afbeeldingen. De laatste kaarten worden niet ingeladen.

### Antwoord (samenvatting)
De observer stond binnen de `forEach` loop. Op dat moment zijn nog niet alle kaarten in de DOM toegevoegd. De observer moet na de volledige `forEach` staan zodat alle afbeeldingen al in de DOM zitten.

### Gecorrigeerde code
```javascript
countries.forEach(country => {
  // ...kaart aanmaken...
  countryCards.appendChild(card);
});

// observer hier, na de forEach
const lazyImages = document.querySelectorAll('img.lazy');
const imageObserver = new IntersectionObserver(...);
lazyImages.forEach(img => imageObserver.observe(img));
```