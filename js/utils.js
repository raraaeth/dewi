/* =====================================================
   SALARY DIARY
   FILE : js/utils.js
   DESCRIPTION : Utility Functions
===================================================== */


/* =====================================================
   NUMBER
===================================================== */

function toNumber(value){

    if(

        value===null ||

        value===undefined ||

        value===""

    ){

        return 0;

    }

    return Number(value);

}


/* =====================================================
   CURRENCY
===================================================== */

function formatCurrency(value){

    return "Rp"+

    new Intl.NumberFormat(

        FORMAT.DATE,

        {

            maximumFractionDigits:0

        }

    ).format(

        toNumber(

            value

        )

    );

}


/* =====================================================
   DECIMAL
===================================================== */

function formatDecimal(value){

    return new Intl.NumberFormat(

        FORMAT.DATE,

        {

            minimumFractionDigits:2,

            maximumFractionDigits:2

        }

    ).format(

        value

    );

}


/* =====================================================
   DATE
===================================================== */

function formatDate(date){

    return new Intl.DateTimeFormat(

        FORMAT.DATE,

        {

            day:"numeric",

            month:"long",

            year:"numeric"

        }

    ).format(

        date

    );

}


/* =====================================================
   DAY NAME
===================================================== */

function getDayName(date){

    return DAY[

        date.getDay()

    ];

}


/* =====================================================
   MONTH NAME
===================================================== */

function getMonthName(month){

    return MONTH[month];

}


/* =====================================================
   WEEKEND
===================================================== */

function isWeekend(date){

    return WEEKEND.includes(

        date.getDay()

    );

}


/* =====================================================
   RANDOM
===================================================== */

function randomItem(array){

    return array[

        Math.floor(

            Math.random()*

            array.length

        )

    ];

}


/* =====================================================
   CLONE
===================================================== */

function clone(data){

    return structuredClone(

        data

    );

}


/* =====================================================
   SORT DATE DESC
===================================================== */

function sortDateDesc(a,b){

    return b.tanggal-a.tanggal;

}


/* =====================================================
   UNIQUE
===================================================== */

function unique(array){

    return [

        ...new Set(

            array

        )

    ];

}


/* =====================================================
   SUM
===================================================== */

function sum(array,key){

    return array.reduce(

        (

            total,

            item

        )=>

        total+

        item[key],

        0

    );

}


/* =====================================================
   GROUP BY
===================================================== */

function groupBy(array,key){

    return Object.groupBy(

        array,

        item=>

        item[key]

    );

}


/* =====================================================
   UUID
===================================================== */

function uuid(){

    return crypto.randomUUID();

}
