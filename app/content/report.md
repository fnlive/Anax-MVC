# Rapporter

## kmom03

Skriv redovisningstext på din me-sida. Skriv ett stycke (minst 15 meningar) om kursmomentet. Reflektera över svårigheter, problem, lösningar, erfarenheter, lärdomar, resultatet, etc.

Se till att följande frågor besvaras i texten:

    Vad tycker du om jQuery, hur känns det?
    Vilka är dina erfarenheter av jQuery inför detta kursmoment?
    Berätta om din plugin.

## kmom02

Har kommit in lite bättre i javascript nu. De lite större övningarna med Boulderdash och Roulette var nyttiga. Jag har läst på lite mer om DOM API't och kan hitta nya metoder hjälpligt. I Roulettespelet kunde jag återskapa log-rutan och stoppa in senaste raden överst med .insertBefore och .firstChild. På spelplanen kunde jag lysa upp siffran som kulan hamnade på genom att välja motsvarande element med .childNodes[x] och ändra klassen genom .classname. Kapitlet [DOM](http://eloquentjavascript.net/13_dom.html) i [Eloquent JavaScript](http://eloquentjavascript.net/) tillsammans med [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) gav lite intro.

Tal och strängar är lite besvärligt. Variabler och retur-värden som man tror borde innehålla ett tal innehåller oftare en sträng-representation av talet som då gör att det andra talet som man försöker addera det med också omvandlas till en sträng. Resultatet blir då en sträng-konkatenering av talen (t.ex. 20+30 = 2030). Jag använder parseInt() för att omvandal text-strängen till ett tal.

Jag slet ganska mycket med bollen som skulle klickas på för att flytta den. Jag lyckades inte centrera bollen utan den satte sig uppe i övre högra hörnet och ville inte därifrån. Mitt script lyckades inte läsa ut dimension på flash-div'en så jag hårdkodade in en offset på 200px för att få ut den på planen. Här fick jag pröva på att använda javascript debuggern i firebug för att lättare kunna se variablers värden. Knuff-längden på bollen är proportionell mot klickpunktens avstånd från bollens mitt. Ju längre ifrån, desto längre skjuts bollen iväg i motsats riktning.

"Regular expressions" verkar kraftfulla och bra att lära sig. Försöker lära mig mer genom att använda dem i Atom's sökfunktion.

Jag har installerat och kör linter-jscs och linter-jshint inifrån Atom. Jag har också kört [JSLint](http://jslint.com/) på mina program. Man behöver trixa lite med inställningarna, t.ex. "tolerate for" och lägga in globala variabler. Jag låter bli att rätta upp t.ex. i++ i mina for-loopar, som jag tycker är mer lättlästa än i += 1 eller i = i + 1.

Jag har lagt in två funktioner i min variant av mos.js, fnlive.js. Dels en random-funktion som returnerar ett slumptal (heltal) mellan inparametrarna min och max. Dels en funktion getOffset(), kopierad från mos.js, som returnerar positionen på ett element.

Jag gjorde inget extra till Boulderdash eller Roulettespelet.

## Kmom01

Min utvecklingsmiljö består av Windows 10 eller 7 med xampp, cygwin och Atom texteditor. Under phpmvc-kursen har jag använt git och github och känner mig numera rätt bekväm med de lite vanligare operationerna. Repona lägger jag på dropbox med mjuka länkar från webbservern. Under phpmvc har jag  använt lintning i Atom med linter-php, linter-phpcs och csslint. Skall nu försöka prova linter-jshint och linter-jscs.

Jag anser mig vara nybörjare på JavaScript. Har dock prövat på och lekt litegrann för flera år sedan genom att göra en webb-baserad mini-räknare. Har också kört två tutorials på [codecademy](https://www.codecademy.com/) om JavaScript och jQuery. Men nu vill jag lära mig JavaScript och annat runtikring ordentligt.

Så här långt efter att ha gjort kmom01 och lite av kmom02 känns det ganska obekvämt med JavaScript. Php känns mycket mer rättframt. Det är lättare att läsa och förstå koden men framförallt lättare att följa vilken html-kod som genereras och förstå hur den genereras. JavaScripts prototyp-baserade objekt-orientering känns lite lösare än att skapa objekt från klasser som är väldefinierade. Hur skall jag skapa mina JavaScript objekt? Lägga till lite metoder och variabler här och där i koden eller skapa dem tydligt på ett ställe? Anonyma funktioner, closures, curry-metoder? Känns konstigt! Det andra som kanske är mest förvirrande nu är nog användningen av DOM-API't. Om jag anropar document.getElementById(), vad får jag för objekt då och vad kan jag göra med det? Jag verkar kunna ändra klass på det genom xxx.className, jag kan skapa syskon till det och lägga till det i dokumentet etc. Det känns som jag behöver läsa på och förstå DOM-API't och hur det verkar på html-dokumentet. DOM-API't hade jag velat ha en bra introduktions-läsning till. Grundkonstruktionerna i JavaScript är annars rättfram. Jag hoppas bli bra vän med JavaScript under kursens gång.

Jag gjorde följande exempelprogram:

* [Resize](http://www.student.bth.se/~frnf15/dbwebb-kurser/javascript/me/kmom01/lekplats/resize/)
* [Baddie](http://www.student.bth.se/~frnf15/dbwebb-kurser/javascript/me/kmom01/lekplats/baddie/)
* [Transform](http://www.student.bth.se/~frnf15/dbwebb-kurser/javascript/me/kmom01/lekplats/transform/)

Jag kopierade Baddie'n från dbwebb och den kan väl inga extra konster utöver de från exemplen. Det går docka att flytta på Baddie även med tangenterna 'wasd'. De tangenterna ligger lite bättre i handen än piltangenterna. Jag gjorde inte extrauppgiften.
