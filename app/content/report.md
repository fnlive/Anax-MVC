# Rapporter

## kmom05

Väldigt rolig övning på flera sätt. Jag valde att göra en variant på [Space Invaders](http://www.student.bth.se/~frnf15/dbwebb-kurser/javascript/me/kmom05/lekplats/spaceinvaders/). Kul att programmera ett spel. Här hade jag velat lägga mer tid på att få in mer funktioner. Än roligare har varit att få programmera lite större sjok med javascript mer självständigt. I början var det ganska trögt och krävde en del debuggging med console.log och debuggern för att få ut saker på rätt sätt. Men efter att fått in några features som funkade började det flyta på bättre och bättre i kodandet.

Jag har lärt mig mycket om scope för variabler. Om man inte skriver `var` före variabelnamnet så definieras variabeln globalt. När jag började skapa några objekt såsom invaders, score etc. råkade de bli globala (glömde `var`). När jag sedan deklarerade dem lokalt i funktionen var de inte längre åtkomliga för de objekt som använde dem. Jag löste det med ett exempel där jag skickar med referens till objektet `gun` till de objekt som behöver komma åt den. Jag förstår också bättre hur man skapar moduler och hur man styr vad som skall vara publikt och privat. Har också lärt mig om "call by reference". Vid anrop skickas objekt via referens och inte en kopia på objektet. När jag skulle testa att granaterna sköts iväg så åkte även kanontornet med då jag skickade in kanontornets position till granaten som startposition. Denna startposition använde jag sedan för att uppdatera granatens position. Så granaterna och kanontornet refererade till och uppdaterade samma vektor-position. Lösning var att skapa ett nytt vektor-objekt till varje granat.

Canvas med javascript var påfallande smidigt för att skapa spel med animeringar. Så det borde finnas stora möjligheter att utveckla spel med HTML5 canvas. Begränsningen kanske möjligen ligger i javascript som interpreterande språk? Att rita diagram och grafer är naturligtvis en annan möjlighet. Andra mer avancerade möjligheter med canvas kan t.ex. vara bildbehandlingsprogram, ritprogram etc. Rita upp saker och dynamiskt ändra saker och interagera med användaren.

Jag gjorde en väldigt enkel spelfysik. kanontornet kan röra sig åt höger och vänster med konstant hastighet och kan inte gå utanför spelplanen. Samma sak med granaterna. Från utskjutningspositionen rör de sig rakt uppåt med konstant hastighet. När de går utanför spelplanen tas granat-objektet bort från granat-arrayn för att den inte skall växa för stor. Invaders rör sig i sidledes och tar ett steg framåt när de träffar vänster- eller högerkanten. Det finns två kollisiondetektorer, dels när en invaders träffas av en granat, dels när kanontornet träffas av en invader. Jag började göra enkla streckfigurer men i torsdags dök det upp en packe med "Space icons" från [Smashing Magazine](https://www.smashingmagazine.com/2016/05/freebie-space-icon-set-40-icons-ai-png-svg/) som var svåra att motstå. Jag är lite osäker på laddning av bilderna då jag inte väntar in att de skall laddas. Det verkar dock funka, kanske beroende på ritytan ritas om kontinuerligt, så om de inte hunnit laddas i de första ramarna, så kommer de ändå vara tillgängliga såsmåningom.

Jag utgick rätt upp och ner från asteroids-exemplet och fortsatte skapa prototyp-objekt enligt mönstret från Vector och raketen i Asteroids. Attribut som skall finnas i objektet läggs i objektets konstruktor-funktion t.ex. `function Gunner(...)` som `this.attribute`. Objektets metoder läggs sedan till till objektet Grenade's prototype genom att definiera funktionerna direkt i en "object literal". Denna tilldelning kan alternativt göras direkt som `Gunner.prototype.fire = function (...) ... `. Att samla alla funktioner i en "object literal" känns dock snyggare. Objekten skapas sedan med new (`gun = new Gunner(...)`). Då spelet kan ha många granater och invaders har jag samlat alla i varsitt samlings-objekt, t.ex. Invaders. Denna samlar alla Invader-objekt i en array samt har funktioner för att rita och uppdatera objekten.

Jag har fortfarande kvar lint-varningar som mest har med att jag inte var-deklarerat en del objekt. dbwebb-lint är lite striktare än lint-modulerna i atom. Detta behöver såklart fixas, speciellt när spelet växer eller skall samexistera med andra javascript kan det uppstå buggar som är svåra att hitta när objekten är globala.  

Jag gjorde inte extrauppgiften.

[Space Invaders: http://www.student.bth.se/~frnf15/dbwebb-kurser/javascript/me/kmom05/lekplats/spaceinvaders/](http://www.student.bth.se/~frnf15/dbwebb-kurser/javascript/me/kmom05/lekplats/spaceinvaders/)

## kmom04

Övningarna med ajax har varit roliga. De första övningarna var ganska lätta att förstå vad som hände. Med firebug under Net-flicken gick det att följa samverkan mellan webbläsaren och servern och följa javascriptens POST och GET från webbläsaren och se svaret som servern skickade tillbaks. Flikarna Konsol, HTML, och Net ger en bra översikt vad som händer. Den sista  övningen med checkout var mer komplexa och svårare att följa vad som hände. När jag försökte dumpa variabler och objekt inifrån det php-script som javascript pratade med gick det inget bra. Inget kom ut på skärmen som det brukade. Jag hittade istället php error_log() funktionen för att dumpa strängar och variabler och kunde se dem skrivas ut i realtid i ett konsol-fönster mha "tail -f php_error_log". Smidigt.

Jag har inga tidigare erfarenhet av att arbeta med ajax. jQuery verkar göra det väldigt enkelt och lätt att jobba med ajax.

För att få in webbshoppen på min me-sida skapade jag en ny modul, Webshop, under app. Huveddelen av koden ligger under src/Webbshop med bla en WebshopController som hanterar både shopp- och checkout-sidan. Controllern innehåller actions för att visa  och checka ut kundvagnen. De två javascripten samt de två php-ajax-scripten för shop och checkout är i princip identiska med de från övningen. Url-parametern i ajax-anropet har jag hårdkodat till en absolut url då jag hade svårt att hitta ett bra sätt att få till en relativ url. Det mesta av den statiska html-koden från shoppen och checkout-sidan lade jag i två template-filer under view/webshop. Bilder lade jag under img/webshop och styles under css/webshop.css. Det var väldigt rättframt att lägga in webbshoppen i Anax-MVC. Det gick smidigt att få ihop Anax dispatch/controller/view-funktioner ihop med ajax och javascript.

Jag gjorde inte extra-uppgiften.

## kmom03

Det har känts kul att arbeta med jQuery. Där det tidigare varit omständligt och stökigt att arbeta med DOM och javascript, känns det lättare och mer intuitivt att använda jQuery. Övningarna flöt på ganska bra och jag klarade mig på egen hand fram till paket 6/lightbox. Jag utgick ifrån exemplet i Ninja-boken som dock saknade skalning av bilden när den visades i lightbox-div'en. Jag tog fram höjd/bredd/ratio på webbläsarfönster och bild för att kunna sätta rätt bredd/höjd på lightbox-div'en och få rätt ratio på visad bild. I paket 7/galleri hade jag väldigt svårt att få bilderna att visas med rätt ratio. Jag lyckades inte få ut original-storleken på bild-filen. När jag tjuvkikade på [dbwebb's](http://dbwebb.se/javascript/lekplats/nine-small-examples-to-get-started-with-jquery/) exempel såg det ut som scriptet hämtar en bild som förminskats till rätt storlek av servern. Smart.

Det har blivit ganska myket debuggande med firebug under övningarnas gång. I början mycket skrivande till console, efter ett tag lite mer försök med att sätta brytpunkter i skriptet och se på variablerna i firebug, samt titta i html-tabben för att se html-elementen och dess stil.

Jag har ingen egentlig erfarenhet av jQuery förutom en liten tutorial på  [codecademy](https://www.codecademy.com/). Exemplen där är dock enkla och betydligt mer tillrättalagda.

Jag valde att göra en lightbox plugin, [fnbox](https://github.com/fnlive/fnbox), som i princip är samma kod jag gjorde för paket 6. Jag började att pröva ut pluginen under lekplat i en ny folder, vilket gick väldigt smidigt. I nästa steg integrerade jag den på min [me-sida](http://www.student.bth.se/~frnf15/dbwebb-kurser/javascript/me/kmom03/Anax-MVC/webroot/lightbox). Ganska rättframt även om det är en del filer som behöver editeras och nya som skall skapas inuti Anax-MVC. Jag gjorde en ny vy-template för att visa markdown-fil med beskrivningen av plugin samt bild-galleri skapat från array med bild-filerna. Min plugin kan så klart utökas med mer funktioner, t.ex. visning av bildtext, snyggare ramar, ikon för att stänga lightbox, etc. Jag hade också gärna prövat på att göra en iframe som lightbox-popup som innehåller en webbsida. Detta får komma längre fram.

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
