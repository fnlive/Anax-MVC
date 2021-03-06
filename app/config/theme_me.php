<?php
/**
 * Config-file for Anax, theme related settings, return it all as array.
 *
 */
return [

    /**
     * Settings for Which theme to use, theme directory is found by path and name.
     *
     * path: where is the base path to the theme directory, end with a slash.
     * name: name of the theme is mapped to a directory right below the path.
     */
    'settings' => [
        'path' => ANAX_INSTALL_PATH . 'theme/',
        'name' => 'anax-base',
    ],


    /**
     * Add default views.
     */
    'views' => [
        ['region' => 'header', 'template' => 'welcome/header', 'data' => [], 'sort' => -1],
        ['region' => 'footer', 'template' => 'welcome/footer', 'data' => [], 'sort' => -1],
    ],
    'views' => [
        [
            'region'   => 'header',
            'template' => 'me/header',
            'data'     => [
                'siteTitle' => "ECMA or JavaScript",
                'siteTagline' => "Learning JS, DOM, and other stuff",
            ],
            'sort'     => -1
        ],
        [
            'region' => 'navbar',
            'template' => [
                'callback' => function () {
                    return $this->di->navbar->create();
                },
            ],
            'data' => [],
            'sort' => -1
        ],
        ['region' => 'footer', 'template' => 'me/footer', 'data' => [
            'liveReload' => function () {
                return ($_SERVER['SERVER_NAME']=='localhost') ? '<script src="http://localhost:35729/livereload.js"></script>' : '';
            },
        ], 'sort' => -1],
    ],
    /**
     * Data to extract and send as variables to the main template file.
     */
    'data' => [

        // Language for this page.
        'lang' => 'sv',

        // Append this value to each <title>
        'title_append' => ' | fnlive',

        // Stylesheets
        'stylesheets' => [
            'css/style.css',
            'css/webshop.css',
            'css/navbar_me.css',
        ],

        // Inline style
        'style' => null,

        // Favicon
        'favicon' => 'favicon.ico',

        // Path to modernizr or null to disable
        'modernizr' => 'js/modernizr.js',

        // Path to jquery or null to disable
        'jquery' => '//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js',

        // Array with javscript-files to include
        'javascript_include' => [
            'js/fnlive.js',
            // '../app/src/fnbox/jquery.fnbox.js',
            // '../app/src/fnbox/test_fnbox.js',
            '../app/src/Webshop/cart.js',
            '../app/src/Webshop/checkout.js',
            '../app/src/Websockets/ws_client.js',
            '../app/src/Websockets/ws_chat_client.js',
            // '../app/src/Spaceinvaders/Spaceinvaders.js',
        ],

        // Use google analytics for tracking, set key or null to disable
        'google_analytics' => null,
    ],
];
