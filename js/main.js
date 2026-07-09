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

        Salary.ready=true;

hideLoading();

console.log(

    "Application Ready ✅"

);

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

/* =====================================================
   SERVICE WORKER
===================================================== */

if(

    "serviceWorker" in navigator

){

    window.addEventListener(

        "load",

        ()=>{

            navigator.serviceWorker

            .register(

                "./sw.js"

            )

            .then(

                registration=>{

                    console.log(

                        "Service Worker Registered ✅",

                        registration.scope

                    );

                }

            )

            .catch(

                error=>{

                    console.error(

                        "Service Worker Failed ❌",

                        error

                    );

                }

            );

        }

    );

       }
