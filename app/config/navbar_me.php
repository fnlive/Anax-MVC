<?php
/**
 * Config-file for navigation bar.
 *
 */
return [

    // Use for styling the menu
    'class' => 'navbar',

    // Here comes the menu strcture
    'items' => [
        'home' => [
            'text'  =>'Hem',
            'url'   => $this->di->get('url')->create(''),
            'title' => 'Hem',
        ],
        'websockets' => [
            'text'  =>'Websockets',
            'url'   => $this->di->get('url')->create('websockets'),
            'title' => 'Websockets',
        ],
        'webshop' => [
            'text'  =>'Butik',
            'url'   => $this->di->get('url')->create('webshop'),
            'title' => 'Butik',
        ],
        'spaceinvaders' => [
            'text'  =>'Space Invaders',
            'url'   => $this->di->get('url')->create('spaceinvaders'),
            'title' => 'Space Invaders',
        ],
        // TODO: fix so lighbox works again.
        // 'fnbox' => [
        //     'text'  =>'fnbox',
        //     'url'   => $this->di->get('url')->create('lightbox'),
        //     'title' => 'fnbox',
        // ],
        'redovisning' => [
            'text'  => 'Redovisning',
            'url'   => $this->di->get('url')->create('redovisning'),
            'title' => 'Redovisning',
        ],
        'source' => [
            'text'  =>'Källkod',
            'url'   => $this->di->get('url')->create('source'),
            'title' => 'Sourcecode browser'
        ],

    ],



    /**
     * Callback tracing the current selected menu item base on scriptname
     *
     */
    'callback' => function ($url) {
        if ($url == $this->di->get('request')->getCurrentUrl(false)) {
            return true;
        }
    },



    /**
     * Callback to check if current page is a decendant of the menuitem, this check applies for those
     * menuitems that has the setting 'mark-if-parent' set to true.
     *
     */
    'is_parent' => function ($parent) {
        $route = $this->di->get('request')->getRoute();
        return !substr_compare($parent, $route, 0, strlen($parent));
    },



   /**
     * Callback to create the url, if needed, else comment out.
     *
     */
   /*
    'create_url' => function ($url) {
        return $this->di->get('url')->create($url);
    },
    */
];
