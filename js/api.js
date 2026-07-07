/* =====================================================
   SALARY DIARY
   FILE : js/api.js
   DESCRIPTION : API Service
===================================================== */


/* =====================================================
   FETCH JSON
===================================================== */

async function fetchJSON(url){

    const response=

    await fetch(

        url

    );

    if(

        !response.ok

    ){

        throw new Error(

            "Failed to fetch data."

        );

    }

    return await response.json();

}


/* =====================================================
   LOAD WORK
===================================================== */

async function loadWork(){

    Salary.raw.kerja=

    await fetchJSON(

        API.work()

    );

}


/* =====================================================
   LOAD PRICE
===================================================== */

async function loadPrice(){

    Salary.raw.harga=

    await fetchJSON(

        API.price()

    );

}


/* =====================================================
   LOAD EXT
===================================================== */

async function loadExt(){

    Salary.raw.ext=

    await fetchJSON(

        API.ext()

    );

}


/* =====================================================
   LOAD ALL
===================================================== */

async function loadData(){

    try{

        Salary.loading=true;

        Salary.error=null;

        await Promise.all([

            loadWork(),

            loadPrice(),

            loadExt()

        ]);

        Salary.loading=false;

        console.log(

            "Spreadsheet Loaded ✅"

        );

    }

    catch(error){

        Salary.loading=false;

        Salary.error=

        error;

        console.error(

            error

        );

    }

}
