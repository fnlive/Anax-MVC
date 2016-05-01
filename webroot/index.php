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

// Lightbox example
$app->router->add('lightbox', function () use ($app) {
    $app->theme->addStylesheet('../../lekplats/fnbox/fnbox.css');
    $app->theme->setTitle("fnbox");

    $content = $app->fileContent->get('fnbox.md');
    $content = $app->textFilter->doFilter($content, 'shortcode, markdown');

    $byline = $app->fileContent->get('byline.md');
    $byline = $app->textFilter->doFilter($byline, 'shortcode, markdown');

    $app->views->add('fnbox/page', [
        'content' => $content,
        'byline' => $byline,
        'galleryImages' => [
            [
                'href' => 'img/lb-demo/2016-01-23 13.01.56.jpg',
                'tn' => 'img/lb-demo/2016-01-23 13.01.56_tn.jpg',
                'alt' => 'Rambo mosse vintern 2016'
            ],
            [
                'href' => 'img/lb-demo/2016-01-23 13.06.47.jpg',
                'tn' => 'img/lb-demo/2016-01-23 13.06.47_tn.jpg',
                'alt' => 'Rambo mosse vintern 2016'
            ],
            [
                'href' => 'img/lb-demo/2016-01-23 13.07.00.jpg',
                'tn' => 'img/lb-demo/2016-01-23 13.07.00_tn.jpg',
                'alt' => 'Rambo mosse vintern 2016'
            ],
            [
                'href' => 'img/lb-demo/2016-01-23 13.07.10.jpg',
                'tn' => 'img/lb-demo/2016-01-23 13.07.10_tn.jpg',
                'alt' => 'Rambo mosse vintern 2016'
            ],
            [
                'href' => 'img/lb-demo/2016-01-23 13.11.00.jpg',
                'tn' => 'img/lb-demo/2016-01-23 13.11.00_tn.jpg',
                'alt' => 'Rambo mosse vintern 2016'
            ],
            [
                'href' => 'img/lb-demo/2016-01-23 13.15.21.jpg',
                'tn' => 'img/lb-demo/2016-01-23 13.15.21_tn.jpg',
                'alt' => 'Rambo mosse vintern 2016'
            ],
            [
                'href' => 'img/lb-demo/2016-01-23 13.15.39.jpg',
                'tn' => 'img/lb-demo/2016-01-23 13.15.39_tn.jpg',
                'alt' => 'Rambo mosse vintern 2016'
            ],
            [
                'href' => 'img/lb-demo/2016-01-23 13.18.20.jpg',
                'tn' => 'img/lb-demo/2016-01-23 13.18.20_tn.jpg',
                'alt' => 'Rambo mosse vintern 2016'
            ],
            [
                'href' => 'img/lb-demo/2016-01-23 13.21.27.jpg',
                'tn' => 'img/lb-demo/2016-01-23 13.21.27_tn.jpg',
                'alt' => 'Rambo mosse vintern 2016'
            ],
            [
                'href' => 'img/lb-demo/2016-01-23 13.36.46.jpg',
                'tn' => 'img/lb-demo/2016-01-23 13.36.46_tn.jpg',
                'alt' => 'Rambo mosse vintern 2016'
            ],
            [
                'href' => 'img/lb-demo/2016-01-23 13.39.51.jpg',
                'tn' => 'img/lb-demo/2016-01-23 13.39.51_tn.jpg',
                'alt' => 'Rambo mosse vintern 2016'
            ],
            [
                'href' => 'img/lb-demo/2016-01-23 13.40.11.jpg',
                'tn' => 'img/lb-demo/2016-01-23 13.40.11_tn.jpg',
                'alt' => 'Rambo mosse vintern 2016'
            ],
        ]
    ]);

});


// JS Lekplats
$app->router->add('lekplats', function () use ($app) {
    $app->theme->setTitle("Lekplats");
    // $lekplats = "http://www.student.bth.se/~frnf15/dbwebb-kurser/javascript/me/kmom01/lekplats/";
    $lekplats = ($_SERVER['SERVER_NAME']=='localhost') ?
        '../../../lekplats/' :
        'http://www.student.bth.se/~frnf15/dbwebb-kurser/javascript/me/kmom02/lekplats/';
    $app->views->add('default/page', [
        'title' => "JS Lekplats",
        'content' => "Page with JavaScript examples from kmom02. ",
        'links' => [
            [
                'href' => $app->url->create($lekplats . 'ball/'),
                'text' => "Ball",
            ],
            [
                'href' => $app->url->create($lekplats . 'boulderdash/'),
                'text' => "Boulderdash",
            ],
            [
                'href' => $app->url->create($lekplats . 'dates/'),
                'text' => "Dates",
            ],
            [
                'href' => $app->url->create($lekplats . 'dice/'),
                'text' => "Dice",
            ],
            [
                'href' => $app->url->create($lekplats . 'exception/'),
                'text' => "Exception",
            ],
            [
                'href' => $app->url->create($lekplats . 'literals/'),
                'text' => "literals",
            ],
            [
                'href' => $app->url->create($lekplats . 'numbers/'),
                'text' => "Numbers",
            ],
            [
                'href' => $app->url->create($lekplats . 'regexp/'),
                'text' => "Regular expresions",
            ],
            [
                'href' => $app->url->create($lekplats . 'roulette/'),
                'text' => "Roulette",
            ],
            [
                'href' => $app->url->create($lekplats . 'strings/'),
                'text' => "Strings",
            ],
        ],
    ]);

});


$app->router->handle();
$app->theme->render();
