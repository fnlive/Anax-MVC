<div id='shop-container' class="clearfix">
    <div id="itemlist">
        <table>
            <tr>
                <th>
                    Image
                </th>
                <th>
                    Title
                </th>
                <th>
                    price
                </th>
                <th>
                    Buy it
                </th>
            </tr>
            <?= $rows; ?>
        </table>
    </div>
    <div id="shoppingcart">
        <p id="sc-title">Shopping cart</p>
        <div id="shoppingcart-table">
        </div>
        <div id="shoppingcart-summary">
        </div>
        <div id="shoppingcart-clear">
            <button id="clearcart">Clear</button>
        </div>
        <div id="shoppingcart-checkout">
            <a class="button" href="<?=$checkoutLink?>">
                Checkout
                <!-- <button id="checkout">Checkout</button> -->
            </a>
        </div>
    </div>
</div>
