<?php
// Start session, shopping cart is stored in session
error_reporting(-1);

// Get the action that controlls what will happen
$action = empty($_GET['action']) ? null : $_GET['action'];

if ($action == 'sum') {
    session_name('shoppingcart');
    session_start();
    echo json_encode((isset($_SESSION['cart']) ? $_SESSION['cart'] : array('sum'=>0) ));
    exit;
} elseif ($action == 'pay') {
    //session_name('checkout-with-ajax');
    session_name('shoppingcart');
    session_start();
    include('cc_form.php');

    // Fix that submit button is not included in form submit from javaScript
    $_POST['doPay'] = true;
    $status = $form->Check();
    // error_log("Val: " . $form->value('name'));
    //
    // error_log("form-check: " . $status);
    // error_log("My true: " . true);
    // error_log("My false: " . false);

    $output = 'The form was not submitted';
    $outputClass = 'error';
    $error = null;
    $payment = 0;
    if ($status === true) {
        error_log("Form check status true...");
        // $payment = $form['payment']['value'];
        $payment = $_SESSION['cart']['sum'];
        $output = "The payment transaction was successful. " . $payment . "€ was withdrawn from you account.";
        $outputClass = 'success';
    } elseif ($status === false) {
        $output = "The form contains invalid values. Correct them and try again.";
        $error = $form->GetValidationErrors();
        error_log($output);
        error_log(serialize($error));
    }

    sleep(3);
    if (isset($_SESSION['cart'])) {
        $_SESSION['cart']['sum'] = $_SESSION['cart']['sum'] - $payment;
        // $_SESSION['cart']['sum'] = round(($_SESSION['cart']['sum'] - $payment) * 1.23, 2);
        $sum = $_SESSION['cart']['sum'];
        // Clear shopping cart
        $_SESSION['cart']['items'] = [];
        $_SESSION['cart']['numitems'] = 0;
    } else {
        $sum = 0;
    }

    echo json_encode(array('status' => $status, 'output' => $output, 'outputClass' => $outputClass, 'errors' => $error, 'sum' => $sum));
    exit;
}

echo "No valid action specified.";
