/* =====================================================
   SALARY DIARY
   FILE : js/events.js
   DESCRIPTION : Event Handler
===================================================== */


/* =====================================================
   HOME
===================================================== */

function onHomeClick(){

    showPage("home");

}


/* =====================================================
   STATISTIC
===================================================== */

function onStatisticClick(){

    showPage("statistic");

}


/* =====================================================
   SALARY
===================================================== */

function onSalaryClick(){

    showPage("salary");

}


/* =====================================================
   TIMELINE
===================================================== */

function onTimelineNext(){

    // TODO

}


function onTimelineBack(){

    // TODO

}


/* =====================================================
   SALARY PERIOD
===================================================== */

function onSalaryNext(){

    // TODO

}


function onSalaryBack(){

    // TODO

}


/* =====================================================
   FILTER
===================================================== */

function onFilterMonth(){

    // TODO

}


function onFilterThreeMonth(){

    // TODO

}


function onFilterSixMonth(){

    // TODO

}


/* =====================================================
   EXPORT
===================================================== */

function onExportImage(){

    // TODO

}


function onExportPdf(){

    // TODO

}


/* =====================================================
   BIND EVENTS
===================================================== */

function bindEvents(){

    /* =========================
       BOTTOM NAVIGATION
    ========================= */

    DOM.BUTTON.home

    .addEventListener(

        "click",

        onHomeClick

    );

    DOM.BUTTON.statistic

    .addEventListener(

        "click",

        onStatisticClick

    );

    DOM.BUTTON.salary

    .addEventListener(

        "click",

        onSalaryClick

    );


    /* =========================
       TIMELINE
    ========================= */

    DOM.TIMELINE.next

    .addEventListener(

        "click",

        onTimelineNext

    );

    DOM.TIMELINE.back

    .addEventListener(

        "click",

        onTimelineBack

    );


    /* =========================
       SALARY
    ========================= */

    DOM.SALARY.next

    .addEventListener(

        "click",

        onSalaryNext

    );

    DOM.SALARY.back

    .addEventListener(

        "click",

        onSalaryBack

    );


    /* =========================
       FILTER
    ========================= */

    DOM.STATISTIC.month

    .addEventListener(

        "click",

        onFilterMonth

    );

    DOM.STATISTIC.threeMonth

    .addEventListener(

        "click",

        onFilterThreeMonth

    );

    DOM.STATISTIC.sixMonth

    .addEventListener(

        "click",

        onFilterSixMonth

    );


    /* =========================
       EXPORT
    ========================= */

    DOM.SALARY.exportImage

    .addEventListener(

        "click",

        onExportImage

    );

    DOM.SALARY.exportPdf

    .addEventListener(

        "click",

        onExportPdf

    );

}
