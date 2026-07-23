/* =====================================================
   SALARY DIARY
   FILE : sw.js
   DESCRIPTION : Service Worker
===================================================== */

const CACHE_NAME =
"dewi-nadzifah-v5";

const APP_FILES = [

    "./",

    "./index.html",

    "./manifest.json",

    "./css/style.css",
    "./css/theme.css",
    "./css/hero.css",
    "./css/summary.css",
    "./css/statistic.css",
    "./css/salary.css",
    "./css/bottomnav.css",
    "./css/responsive.css",

    "./js/config.js",
    "./js/utils.js",
    "./js/dom.js",
    "./js/state.js",
    "./js/api.js",
    "./js/process.js",
    "./js/ui.js",
    "./js/home.js",
    "./js/statistic.js",
    "./js/salary.js",
    "./js/events.js",
    "./js/main.js",

    "./assets/icons/icon-192.png",
    "./assets/icons/icon-512.png",

    "./assets/images/happy.png"
];


/* =====================================================
   INSTALL
===================================================== */

self.addEventListener(

    "install",

    event=>{

        event.waitUntil(

            caches.open(

                CACHE_NAME

            )

            .then(

                cache=>

                cache.addAll(

                    APP_FILES

                )

            )

        );

        self.skipWaiting();

    }

);


/* =====================================================
   ACTIVATE
===================================================== */

self.addEventListener(

    "activate",

    event=>{

        event.waitUntil(

            caches.keys()

            .then(

                keys=>

                Promise.all(

                    keys.map(

                        key=>{

                            if(

                                key!==CACHE_NAME

                            ){

                                return caches.delete(

                                    key

                                );

                            }

                        }

                    )

                )

            )

        );

        self.clients.claim();

    }

);


/* =====================================================
   FETCH
===================================================== */

self.addEventListener(

    "fetch",

    event=>{

        event.respondWith(

            caches.match(

                event.request

            )

            .then(

                response=>

                response ||

                fetch(

                    event.request

                )

            )

        );

    }

);
