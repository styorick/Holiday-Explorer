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
