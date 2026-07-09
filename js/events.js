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

    timelineNext();

}

function onTimelineBack(){

    timelineBack();

}


/* =====================================================
   SALARY PERIOD
===================================================== */

function onSalaryNext(){

    nextSalaryPeriod();

}


function onSalaryBack(){

    previousSalaryPeriod();

}


/* =====================================================
   FILTER
===================================================== */

function onFilterWeek(){

    filterWeek();

}

function onFilterLastWeek(){

    filterLastWeek();

}

function onFilterMonth(){

    filterMonth();

}

function onFilterLastMonth(){

    filterLastMonth();

}

function onFilterThreeMonth(){

    filterThreeMonth();

}


/* =====================================================
   EXPORT
===================================================== */

function onExportImage(){

    showSalaryExport();

}

function onExportPdf(){

    showSalaryExport();

}

function onDownloadImage(){

    downloadSalaryImage();

}

function onCloseExport(){

    closeSalaryExport();

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

DOM.STATISTIC.filterWeek

.addEventListener(

    "click",

    onFilterWeek

);

DOM.STATISTIC.filterLastWeek

.addEventListener(

    "click",

    onFilterLastWeek

);

DOM.STATISTIC.filterMonth

.addEventListener(

    "click",

    onFilterMonth

);

DOM.STATISTIC.filterLastMonth

.addEventListener(

    "click",

    onFilterLastMonth

);

DOM.STATISTIC.filterThreeMonth

.addEventListener(

    "click",

    onFilterThreeMonth

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

document

.getElementById(

    "downloadImageButton"

)

.addEventListener(

    "click",

    onDownloadImage

);

document

.getElementById(

    "closeExportButton"

)

.addEventListener(

    "click",

    onCloseExport

);
}
