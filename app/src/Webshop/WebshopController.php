<?php

namespace Anax\Webshop;

/**
 * A controller for "Questions".
 *
 */
class WebshopController implements \Anax\DI\IInjectionAware
{
    use \Anax\DI\TInjectable,
    \Anax\MVC\TRedirectHelpers;


    /**
    * Properties
    *
    */
    // private $items;

    /**
     * Display items and shoppingcart.
     *
     * @return void
     */
    public function cartAction()
    {
        $this->views->add('default/page', [
            'title'     => 'Bokbutiken',
            'content'     => 'Här hittar du de bästa böckerna om JavaScript.',
        ]);

        $this->views->add('webshop/cart', [
            'rows'  => $this->getItemRows(),
            'checkoutLink' => $this->di->get('url')->create('webshop/checkout'),
        ]);
    }

    /**
     * Display checkout page.
     *
     * @return void
     */
    public function checkoutAction()
    {
        // Include the form
        include('cc_form.php');
        $checkoutForm = $form->GetHTML(array('id' => 'form1', 'columns' => 2));

        $this->theme->setTitle("Butik");
        $this->views->add('webshop/checkout', [
            'form'  => $checkoutForm,
        ]);
    }


    private function getItemRows()
    {
        // Define the items and prices
        $items = array(
         'book1' => array(
            //  'image' => '<img src="javascript-the-definitive-guide.png">',
             'image' => 'img/webshop/javascript-the-definitive-guide.png',
             'title' => 'JavaScript The Definitive Guide', 'price' => '17'),
         'book2' => array(
             'image' => 'img/webshop/javascript-the-good-parts.png',
             'title' => 'JavaScript The Good Parts', 'price' => '19'),
         'book3' => array(
             'image' => 'img/webshop/jquery-novice-to-ninja.png',
             'title' => 'jQuery Novice To Ninja', 'price' => '23'),
        );
        // Build rows for items to sell to be added in itemlist table
        $rows = "";
        $cnt = 1;
        foreach ($items as $item) {
            $item['image'] = "<img class='sitelogo' src='" . $this->url->asset($item['image']) . "' alt='fnlive logo'/>";
            $rows .= "<tr>";
            foreach ($item as $key => $value) {
                $rows .= "<td>" . $value . "</td>";
            }
            $rows .= '<td><button id="book' . $cnt . '" class="purchase">Buy it</button></td>';
            $cnt += 1;
            $rows .= "</tr>";
        }
        return $rows;
    }
}
