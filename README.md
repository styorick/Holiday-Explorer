# Holiday Explorer

## 1. Projectbeschrijving

Holiday Explorer is een interactieve single-page applicatie waarmee je de officiële feestdagen van landen wereldwijd kan opzoeken. Je selecteert een land door op een kaart te klikken, waarna een popup verschijnt met alle feestdagen van dat land voor het gekozen jaar.

**Functionaliteiten:**
- Landkaarten met vlag en naam
- Zoeken op landnaam
- Filteren op continent
- Zoeken en filteren werken gecombineerd
- Sorteren A-Z / Z-A
- Feestdagen bekijken via popup
- Jaar selecteren via dropdown
- Favorieten opslaan en filteren
- Dark/light thema
- Lazy loading van vlagafbeeldingen



## 2. Gebruikte API's

| API | Link | Gebruik |
|-----|------|---------|
| Nager.Date | https://date.nager.at/api | Beschikbare landen en feestdagen ophalen |
| RestCountries | https://restcountries.com | Vlaggen, landnamen en regio's ophalen |



## 3. Technische vereisten

| Vereiste | Bestand | Lijnnummer | Uitleg |
|----------|---------|------------|--------|
| **Elementen selecteren** | src/main.js | 18, 19, 41, 56, 64, 78, 127 | `getElementById` en `querySelectorAll` om elementen uit de DOM op te halen |
| **Elementen manipuleren** | src/main.js | 32, 177, 178, 179 | `textContent`, `src`, `dataset` en `style.display` aanpassen |
| **Events aan elementen koppelen** | src/main.js | 37, 38, 43, 57, 65, 200, 214 | `addEventListener` voor click, input en change events |
| **Gebruik van constanten** | src/main.js | 18, 19, 41, 56, 64, 78, 127 | `const` voor alle DOM-referenties en vaste waarden |
| **Template literals** | src/main.js | 84 | URL dynamisch opbouwen met het jaar en de landcode: `` `https://date.nager.at/api/v3/publicholidays/${year}/${countrycode}` `` |
| **Iteratie over arrays** | src/main.js | 23, 52, 67, 99, 170 | `forEach` om over landen, kaarten en feestdagen te itereren |
| **Array methodes** | src/main.js | 157, 158, 159, 204 | `map` om landcodes te extraheren, `filter` om landen te filteren, `includes` om te checken of een land favoriet is |
| **Arrow functions** | src/main.js | 22, 43, 57, 65, 200, 214 | Korte functiesyntax voor event listeners en array methodes |
| **Ternary operator** | src/main.js | 32, 50, 59, 60, 70, 113 | Compacte if/else voor weergave en logica |
| **Callback functions** | src/main.js | 37, 43, 57, 170 | Functies meegeven als argument aan `addEventListener` en `forEach` |
| **Promises** | src/main.js | 168, 217, 246 | `.then()` en `.catch()` voor het verwerken van API-antwoorden |
| **Async & Await** | src/main.js | 81, 128, 140, 152 | `async/await` in alle fetch-functies voor overzichtelijke asynchrone code |
| **Observer API** | src/main.js | 228 | `IntersectionObserver` voor lazy loading van vlagafbeeldingen. Afbeeldingen worden pas ingeladen als ze in de viewport komen |
| **Fetch** | src/main.js | 84, 130, 142 | Data ophalen van Nager.Date en RestCountries API |
| **JSON manipuleren** | src/main.js | 12, 85, 131, 143, 157 | `response.json()` om API-antwoorden te parsen, `JSON.parse` en `JSON.stringify` voor localStorage |
| **LocalStorage** | src/main.js | 7, 12, 60, 210 | Thema en favorieten bewaren zodat gebruikersvoorkeuren behouden blijven na herladen |
| **Flexbox** | src/style.css | 3, 23, 132 | Body, toolbar en kaartensectie zijn opgebouwd met flexbox |
| **Basis CSS** | src/style.css | 1-219 | Volledige styling inclusief dark theme, popup, kaarten en animaties |
| **Gebruiksvriendelijke elementen** | index.html | 40, 45, 51 | Sorteerknop met icoon, favorietenfilter met checkbox, sluitknop in popup |
| **Jaar filter** | index.html + src/main.js | 40-46 + 78, 82 | Dropdown met vaste jaren in HTML, geselecteerd jaar wordt meegestuurd in de fetch URL via template literal |
| **Vite** | package.json | - | Project opgezet met `npm create vite` |
| **Folderstructuur** | src/, dist/, public/ | - | HTML in root, CSS en JS in src/, assets in public/, gebouwde versie in dist/ |



## 4. Installatiehandleiding

**Vereisten:** Node.js geïnstalleerd

```bash
# 1. Clone de repository
git clone https://github.com/styorick/holiday-explorer.git

# 2. Ga naar de projectmap
cd holiday-explorer

# 3. Installeer dependencies
npm install

# 4. Start de development server
npm run dev

# 5. Open in browser
# http://localhost:5173
```

Voor productie:
```bash
npm run build
```



## 5. Screenshots



## 6. Bronnen

- Nager.Date API: https://date.nager.at/api
- RestCountries API: https://restcountries.com
- Google Fonts Icons: https://fonts.google.com/icons
- YouTube - Search/Filter functionaliteit: https://www.youtube.com/watch?v=f6ocDCkCmhM
- YouTube - sort in alphabetical order: https://www.youtube.com/watch?v=U9M8wn0Fm-M
- YouTube - glow checkbox config: https://www.youtube.com/shorts/ohIBMJneOeE
- Reddit - stopPropagation: https://www.reddit.com/r/javascript/comments/27zrqd/overlapping_onclick_events/
- YouTube - Popup: https://www.youtube.com/watch?v=AF6vGYIyV8M&t=4s
- W3Schools - Popup: https://www.w3schools.com/howto/howto_js_popup.asp
- wpopupmaker - z-index popup: https://wppopupmaker.com/docs/theming-popups/popups-display-in-front-of-screen-content/
- Stack Overflow - toLocaleDateString: https://stackoverflow.com/questions/27939773/tolocaledatestring-short-format

- AI-log: zie [AI-log.md](AI-log.md)

