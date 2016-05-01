fnbox
====

fnbox är en ny lättviktig lightbox som visar dina bilder från sin bästa sida. Lägg upp tumnagel-varianter av dina bilder och länka dem till den större bilden. När du klickar på tumnagel-bilden kommer den stora bilden att visas utan att användaren lämnar nuvarande sida.

## Installation

Ladda ner [fnbox från github](https://github.com/fnlive/fnbox).

inkludera jquery.fnbox.js på webb-sidan, förslagsvis långt ner på sidan före </body> men efter inkludering av jquery.js.

Välj ut de element du vill få upp med *fnbox* i ett javascript som du inkluderar på sidan, t.ex.

    $(document).ready(function(){
        // Demo example for using jquery plugin fnbox
        $('a.lightbox').each(function() {
            $(this).fnbox();
        });
    });

Alla <a> element med klassen "lightbox" kommer då väljas ut och bilden som <a> elementet länkar till kommer att visas i lightbox.

Lägg till style för lightbox i din css/less-fil (se fnbox.css):

    #overlay {
        position:fixed;
        top:0;
        left:0;
        height:100%;
        width:100%;
        background:black url(loader.png) no-repeat scroll center center;
    }
    #lightbox {
        position:fixed;
        background: darkgray;
    }

Lägg in dina bilder med följande html-kod:

    <a href='img/fnbox_image.jpg' class='lightbox'><img src="img/fnbox_image_tn.jpg" alt="Din alt text/></a>

Klart för att börja använda fnbox.

## Demo

Klicka på någon av bilderna nedanför att se "fnbox" i action.
