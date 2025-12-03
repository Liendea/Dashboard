# DASHBOARD

### Uppgift 3

![Skärmbild 2025-04-09 192424](https://github.com/user-attachments/assets/0587f1d2-2c06-4cef-b76e-1e8df7772355)

Funktioner:

- Klocka och datum: klokcslag och datum visas
- Snabblänkar: Snabblänkar sparas och favicon hämtas från https://icons.duckduckgo.com/ip2/${input}.ico. Länkarna sparas till localstorage.
- Redigerbara snabblänkar: Titeln på snabblänkarna går att redigera när man klickar på pennan uppei widgetens högra hörn. Länkarna sparas till localstorage.
- Väder forecast: Väder hämtas från api från https://api.open-meteo.com baserat på användares geolocation
- Dagens väder: Väder hämtas från api från https://api.openweathermap.org baserat på användares geolocation
- Anteckningar: Anteckningar som sparas till localStorage
- Slumpa bakgrundsbild: Bakgrundsbild hämtas från api från https://api.unsplash.com

<hr>

Teknologier:

- JavaScript (ES6+)
- HTML
- CSS

<hr>

Styrkor och brister i min kod:

En av de största svagheterna i min kod är att API-nycklarna inte är dolda på ett säkert sätt. För att skydda dem ordentligt hade jag behövt implementera en enkel backendlösning, till exempel genom att skapa en proxyserver. Eftersom uppgiften endast krävde en frontendlösning valde jag att inte implementera detta, men det är viktigt att notera att detta gör koden sårbar. En annan tydlig brist är att väderdatan laddas relativt långsamt, vilket sannolikt går att förbättra genom optimering av API-anrop eller bättre hantering av asynkrona funktioner.

Jag får även upp en varning i konsollen som lyder: “Layout was forced before the page was fully loaded. If stylesheets are not yet loaded this may cause a flash of unstyled content.” För att lösa detta valde jag att wrappa all JavaScript-kod i en window.load-lyssnare, vilket tyvärr inte löste problemet. Så det är ett problem jag inte lyckats lösa.

Det finns även saker som skulle kunnas göras tydligae i designen. Dashboardens rubrik går att redigera men det är inte tillräckligt tydligt att den är redigerbar. Men då det bara är jag själv som kommer använda denna dashboard är det inte något problem. Men hade jag byggt åt någon annan hade jag förtydligat detta.

När det gäller styrkor är koden överlag välstrukturerad och uppdelad i tydliga mappar och filer, vilket gör projektet lätt att navigera och underhålla. Dock kan det argumenteras att det finns onödigt många separata CSS-filer – dessa hade med fördel kunnat slås ihop i större, mer organiserade filer för att minska antalet HTTP-anrop och därmed förbättra prestandan.

Slutligen använder projektet externa resurser som Google Fonts och Font Awesome. Även om dessa är användbara och snygga, kan de i vissa fall påverka laddningstiden negativt eftersom de kräver extra nätverksanrop.

<hr>

Författare:

Författare: Linda Bengtsson

GitHub: @liendea

Instagram: @liendea.dev

E-mail: bengtsson-linda@outlook.com
