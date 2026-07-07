/* =====================================================
   SALARY DIARY
   FILE : js/ui.js
   DESCRIPTION : UI Helper
===================================================== */


/* =====================================================
   PAGE
===================================================== */

function showPage(page){

    DOM.PAGE.home.classList.remove("active");

    DOM.PAGE.statistic.classList.remove("active");

    DOM.PAGE.salary.classList.remove("active");

    DOM.BUTTON.home.classList.remove("active");

    DOM.BUTTON.statistic.classList.remove("active");

    DOM.BUTTON.salary.classList.remove("active");

    switch(page){

        case "home":

            DOM.PAGE.home.classList.add("active");

            DOM.BUTTON.home.classList.add("active");

        break;

        case "statistic":

            DOM.PAGE.statistic.classList.add("active");

            DOM.BUTTON.statistic.classList.add("active");

        break;

        case "salary":

            DOM.PAGE.salary.classList.add("active");

            DOM.BUTTON.salary.classList.add("active");

        break;

    }

}


/* =====================================================
   LOADING
===================================================== */

function showLoading(){

    DOM.LOADING.classList.add(

        "show"

    );

}


function hideLoading(){

    DOM.LOADING.classList.remove(

        "show"

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
