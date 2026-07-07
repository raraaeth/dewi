/* =====================================================
   SALARY DIARY
   FILE : js/main.js
   DESCRIPTION : Application Entry Point
===================================================== */


/* =====================================================
   INITIALIZE
===================================================== */

async function init(){

    console.clear();

    console.log(

        `%c${APP.NAME} v${APP.VERSION}`,

        "font-size:16px;font-weight:bold;color:#FF7EB6"

    );

    try{

        Salary.loading=true;

        await loadData();

        processAll();

        renderHome();

        renderStatistic();

        renderSalary();

        bindEvents();

        Salary.ready=true;

        console.log(

            "Application Ready ✅"

        );

    }

    catch(error){

        console.error(

            error

        );

    }

    finally{

        Salary.loading=false;

    }

}


/* =====================================================
   START
===================================================== */

document.addEventListener(

    "DOMContentLoaded",

    init

);
