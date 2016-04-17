<?php
/**
 * This is a Anax pagecontroller.
 *
 */

require __DIR__.'/config_with_app.php';

// About me
$app->router->add('', function () use ($app) {
    $app->theme->setTitle("Om mig");
    $content = $app->fileContent->get('me.md');
    $content = $app->textFilter->doFilter($content, 'shortcode, markdown');

    $byline = $app->fileContent->get('byline.md');
    $byline = $app->textFilter->doFilter($byline, 'shortcode, markdown');

    $app->views->add('me/page', [
        'content' => $content,
        'byline' => $byline,
    ]);
});

// Report
$app->router->add('redovisning', function () use ($app) {
    $app->theme->setTitle("Redovisning");
    $content = $app->fileContent->get('report.md');
    $content = $app->textFilter->doFilter($content, 'shortcode, markdown');

    $byline = $app->fileContent->get('byline.md');
    $byline = $app->textFilter->doFilter($byline, 'shortcode, markdown');

    $app->views->add('me/page', [
        'content' => $content,
        'byline' => $byline,
    ]);

});

// Source code browsing
$app->router->add('source', function () use ($app) {
    $app->theme->addStylesheet('css/source.css');
    $app->theme->setTitle("Källkod");

    $source = new \Mos\Source\CSource([
        'secure_dir' => '..',
        'base_dir' => '..',
        'add_ignore' => ['.htaccess'],
    ]);

    $app->views->add('me/source', [
        'content' => $source->View(),
    ]);

});


// JS Lekplats
$app->router->add('lekplats', function () use ($app) {
    $app->theme->setTitle("Lekplats");
    $lekplats = "http://www.student.bth.se/~frnf15/dbwebb-kurser/javascript/me/kmom01/lekplats/";
    $app->views->add('default/page', [
        'title' => "JS Lekplats",
        'content' => "Page with JavaScript examples. ",
        'links' => [
            [
                'href' => $app->url->create($lekplats . 'resize/'),
                'text' => "Resize",
            ],
            [
                'href' => $app->url->create($lekplats . 'baddie/'),
                'text' => "Baddie",
            ],
            [
                'href' => $app->url->create($lekplats . 'transform/'),
                'text' => "Transform",
            ],
        ],
    ]);

});


$app->router->handle();
$app->theme->render();
