/* =====================================================
   SALARY DIARY
   FILE : js/ui.js
   DESCRIPTION : UI Helper
===================================================== */

/* =====================================================
   PAGE
===================================================== */

let pageTransitionRunning = false;


function getActivePage(){

    return document.querySelector(

        ".page.active"

    );

}


function getTargetPage(page){

    switch(page){

        case "home":

            return DOM.PAGE.home;

        case "statistic":

            return DOM.PAGE.statistic;

        case "salary":

            return DOM.PAGE.salary;

        default:

            return null;

    }

}


function updateActiveNavigation(page){

    DOM.BUTTON.home.classList.remove(

        "active"

    );

    DOM.BUTTON.statistic.classList.remove(

        "active"

    );

    DOM.BUTTON.salary.classList.remove(

        "active"

    );


    switch(page){

        case "home":

            DOM.BUTTON.home.classList.add(

                "active"

            );

        break;


        case "statistic":

            DOM.BUTTON.statistic.classList.add(

                "active"

            );

        break;


        case "salary":

            DOM.BUTTON.salary.classList.add(

                "active"

            );

        break;

    }

}


function showPage(page){

    const currentPage =

        getActivePage();


    const targetPage =

        getTargetPage(page);


    if(

        !targetPage

    ){

        return;

    }


    /*
    Jangan jalankan animasi
    jika halaman sudah aktif
    */

    if(

        currentPage === targetPage

    ){

        return;

    }


    /*
    Mencegah klik berkali-kali
    selama transisi berjalan
    */

    if(

        pageTransitionRunning

    ){

        return;

    }


    pageTransitionRunning = true;


    /*
    Update bottom navigation
    */

    updateActiveNavigation(

        page

    );


    /*
    Animasi halaman lama
    */

    if(

        currentPage

    ){

        currentPage.classList.add(

            "page-leave"

        );

    }


    setTimeout(

        ()=>{


            /*
            Sembunyikan semua halaman
            */

            DOM.PAGE.home.classList.remove(

                "active",

                "page-leave",

                "page-enter"

            );


            DOM.PAGE.statistic.classList.remove(

                "active",

                "page-leave",

                "page-enter"

            );


            DOM.PAGE.salary.classList.remove(

                "active",

                "page-leave",

                "page-enter"

            );


            /*
            Tampilkan halaman tujuan
            */

            targetPage.classList.add(

                "active",

                "page-enter"

            );


            /*
            Kembali ke bagian atas
            */

            window.scrollTo({

                top:0,

                behavior:"instant"

            });


            /*
            Hapus class animasi
            setelah selesai
            */

            setTimeout(

                ()=>{

                    targetPage.classList.remove(

                        "page-enter"

                    );


                    pageTransitionRunning = false;

                },

                320

            );


        },

        180

    );

}

/* =====================================================
   THEME
===================================================== */

const THEME_STORAGE_KEY =

"salary-diary-theme";


/* =====================================================
   APPLY THEME
===================================================== */

function applyTheme(

    theme

){

    const isDark =

        theme === "dark";


    /*
    Aktifkan class dark mode
    */

    document.body.classList.toggle(

        "dark-mode",

        isDark

    );


    /*
    Update icon
    */

    setText(

        DOM.THEME.icon,

        isDark

        ? "light_mode"

        : "dark_mode"

    );


    /*
    Update text
    */

    setText(

        DOM.THEME.text,

        isDark

        ? "Mode Terang"

        : "Mode Malam"

    );


    /*
    Update aksesibilitas
    */

    DOM.THEME.toggle?.setAttribute(

        "aria-label",

        isDark

        ? "Aktifkan mode terang"

        : "Aktifkan mode malam"

    );


    DOM.THEME.toggle?.setAttribute(

        "aria-pressed",

        String(

            isDark

        )

    );


    /*
    Class untuk animasi switch
    */

    DOM.THEME.toggle?.classList.toggle(

        "active",

        isDark

    );

}


/* =====================================================
   LOAD THEME
===================================================== */

function loadTheme(){

    const savedTheme =

        localStorage.getItem(

            THEME_STORAGE_KEY

        );


    const theme =

        savedTheme === "dark"

        ? "dark"

        : "light";


    applyTheme(

        theme

    );

}


/* =====================================================
   TOGGLE THEME
===================================================== */

function toggleTheme(){

    const isDark =

        document.body.classList.contains(

            "dark-mode"

        );


    const newTheme =

        isDark

        ? "light"

        : "dark";


    localStorage.setItem(

        THEME_STORAGE_KEY,

        newTheme

    );


    applyTheme(

        newTheme

    );

}


/* =====================================================
   LOADING
===================================================== */

function showLoading(){

    DOM.LOADING.screen?.classList.remove(

        "hide"

    );

}


function hideLoading(){

    DOM.LOADING.screen?.classList.add(

        "hide"

    );

}


/* =====================================================
   HTML
===================================================== */

function setHTML(

    element,

    html

){

    if(

        element

    ){

        element.innerHTML=

        html;

    }

}


/* =====================================================
   TEXT
===================================================== */

function setText(

    element,

    text

){

    if(

        element

    ){

        element.textContent=

        text;

    }

}


/* =====================================================
   IMAGE
===================================================== */

function setImage(

    element,

    src

){

    if(

        element

    ){

        element.src=

        src;

    }

}


/* =====================================================
   TOGGLE
===================================================== */

function show(

    element

){

    if(

        element

    ){

        element.hidden=false;

    }

}


function hide(

    element

){

    if(

        element

    ){

        element.hidden=true;

    }

}


/* =====================================================
   EMPTY
===================================================== */

function clear(

    element

){

    if(

        element

    ){

        element.innerHTML="";

    }

}


/* =====================================================
   TOAST
===================================================== */

function showToast(

    message

){

    console.log(

        "Toast :",

        message

    );

}


/* =====================================================
   CARD ANIMATION
===================================================== */

function animateCard(

    element

){

    if(

        !element

    ){

        return;

    }

    element.classList.remove(

        "fade-up"

    );

    requestAnimationFrame(

        ()=>{

            element.classList.add(

                "fade-up"

            );

        }

    );

}
