# DASHBOARD
### Uppgift 3 

![Skärmbild 2025-04-09 192424](https://github.com/user-attachments/assets/0587f1d2-2c06-4cef-b76e-1e8df7772355)

Funktioner:
* Klocka och datum: klokcslag och datum visas 
* Snabblänkar: Snabblänkar sparas och favicon hämtas från https://icons.duckduckgo.com/ip2/${input}.ico. Länkarna sparas till localstorage. 
* Redigerbara snabblänkar: Titeln på snabblänkarna går att redigera när man klickar på pennan uppei widgetens högra hörn. Länkarna sparas till localstorage. 
* Väder forecast: Väder hämtas från api från https://api.open-meteo.com*Dagens väder: Väder hämtas från api från https://api.openweathermap.org
* Anteckningar: Anteckningar som sparas till localStorage
* Slumpa bakgrundsbild: Bakgrundsbild hämtas från api från https://api.unsplash.com

<hr>

Teknologier:

  * JavaScript (ES6+)
  * HTML
  * CSS

<hr>

Styrkor och brister i min kod:

1. API nycklarna är inte dolda på ett säkert sätt. För att nycklarna ska döljas korrekt behöver man skapa en mini backend och skapa en proxy server. Då detta inte ingick i uppgiften uteslöts denna lösning men detta är en svaghet i koden.
2. Väder datan laddas väldigt långsamt. Det går säkert att utveckla så det går snababre.
3. Jag får upp en varning i consollen att "Layout was forced before the page was fully loaded. If stylesheets are not yet loaded this may cause a flash of unstyled content." för att kösa detta wrappade ajg all js kod i en window load eventlistener som verkar lösa problemet.
4. Svaghet: Jag råkade publicera på github utan att ha dolt en apinyckel som jag hade glömt bort, denna api nyckel syns nu i min commit historik vilket är en svageht.
5. styrka i koden: koden är bra strukturerad i olika mappar och filer
6. svaghet :  kanske onödigt många css filer, de skulle kunna vara orginaiserade i större filer för att minska anrop och prestanda.
7. Google Fonts & Font Awesome: Dessa externa resurser kan ta lite längre tid att hämta och påverka sidans prestanda.

<hr>

Författare:

  Författare: Linda Bengtsson

  GitHub: @liendea
  
  Instagram: @liendea.dev
  
  E-mail: bengtssons.linda@outlook.com
    
