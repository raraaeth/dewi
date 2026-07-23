/* =====================================================
   SALARY DIARY
   FILE : js/home.js
   DESCRIPTION : Home Renderer
===================================================== */
/* =====================================================
   HERO
===================================================== */

function renderHero(){

    const now=

    new Date();

    setText(

        DOM.HERO.time,

        now.toLocaleTimeString(

            APP.LOCALE,

            {

                hour:"2-digit",

                minute:"2-digit"

            }

        )

    );

    setText(

        DOM.HERO.day,

        getDayName(

            now

        )

    );

    setText(

        DOM.HERO.date,

        formatDate(

            now

        )

    );

    setText(

        DOM.HERO.greeting,

        getGreeting()

    );

    setText(

    DOM.HERO.message,

    Salary.home.insight ||

    getInsightMessage()

);

    setImage(

        DOM.HERO.character,

        `assets/images/${getCharacter()}`

    );

}

/* =====================================================
   GREETING
===================================================== */

function getGreeting(){

    const hour=

    new Date()

    .getHours();

    if(

        hour<11

    ){

        return "Selamat Pagi ❤️";

    }

    if(

        hour<15

    ){

        return "Selamat Siang 🌸";

    }

    if(

        hour<18

    ){

        return "Selamat Sore ✨";

    }

    return "Selamat Malam 🌙";

}

/* =====================================================
   RANDOM MESSAGE
===================================================== */

function randomGreeting(){

    const hour=

    new Date()

    .getHours();

    if(

        hour<11

    ){

        return randomItem(

            MESSAGE.MORNING

        );

    }

    if(

        hour<15

    ){

        return randomItem(

            MESSAGE.AFTERNOON

        );

    }

    if(

        hour<18

    ){

        return randomItem(

            MESSAGE.EVENING

        );

    }

    return randomItem(

        MESSAGE.NIGHT

    );

}

/* =====================================================
   NUMBER ANIMATION
===================================================== */

function animateNumber(

    element,

    target,

    options = {}

){

    if(

        !element

    ){

        return;

    }


    const duration =

        options.duration ||

        3000;


    const currency =

        options.currency ||

        false;


    const startTime =

        performance.now();


    const finalValue =

        Number(target) || 0;


    function updateNumber(

        currentTime

    ){

        const elapsed =

            currentTime -

            startTime;


        const progress =

            Math.min(

                elapsed /

                duration,

                1

            );


        /*
        Gerakan cepat di awal
        dan melambat mendekati akhir
        */

        const easeOut =

            1 -

            Math.pow(

                1 - progress,

                4

            );


        const currentValue =

            Math.round(

                finalValue *

                easeOut

            );


        if(

            currency

        ){

            setText(

                element,

                formatCurrency(

                    currentValue

                )

            );

        }

        else{

            setText(

                element,

                currentValue

            );

        }


        if(

            progress < 1

        ){

            requestAnimationFrame(

                updateNumber

            );

        }

        else{

            /*
            Memastikan angka terakhir
            selalu sama dengan data asli
            */

            if(

                currency

            ){

                setText(

                    element,

                    formatCurrency(

                        finalValue

                    )

                );

            }

            else{

                setText(

                    element,

                    finalValue

                );

            }

        }

    }


    requestAnimationFrame(

        updateNumber

    );

}


/* =====================================================
   SUMMARY
===================================================== */

function renderHomeSummary(){

    /* =========================
       LAST INCOME
    ========================= */

    animateNumber(

        DOM.SUMMARY.lastIncome,

        Salary.home.lastIncome,

        {

            currency:true,

            duration:3000

        }

    );


    setText(

        DOM.SUMMARY.lastDate,

        Salary.home.lastWorkDate

    );


    /* =========================
       WEEK INCOME
    ========================= */

    animateNumber(

        DOM.SUMMARY.weekIncome,

        Salary.home.weekIncome,

        {

            currency:true,

            duration:3000

        }

    );


    /* =========================
       PERIOD INCOME
    ========================= */

    animateNumber(

        DOM.SUMMARY.periodIncome,

        Salary.home.periodIncome,

        {

            currency:true,

            duration:3000

        }

    );


    setText(

        DOM.SUMMARY.periodIncomeDate,

        Salary.home.periodDate

    );


    /* =========================
   TODAY INCOME
========================= */

animateNumber(

    DOM.SUMMARY.todayIncome,

    Salary.home.todayIncome,

    {

        currency:true,

        duration:3000

    }

);

setTimeout(

    ()=>{

        setText(

            DOM.SUMMARY.todayIncome,

            formatCurrencyShort(

                Salary.home.todayIncome

            )

        );

    },

    3000

);


    /* =========================
       TODAY QUANTITY
    ========================= */

    animateNumber(

        DOM.SUMMARY.todayQty,

        Salary.home.todayQty,

        {

            duration:3000

        }

    );


    /* =========================
       TODAY WORK
    ========================= */

    animateNumber(

        DOM.SUMMARY.todayWork,

        Salary.home.todayWork,

        {

            duration:3000

        }

    );
   /* =========================
   PERIOD QUICK SUMMARY
========================= */

animateNumber(

    DOM.SUMMARY.periodQuickIncome,

    Salary.home.periodIncome,

    {

        currency:true,

        duration:3000

    }

);

setTimeout(

    ()=>{

        setText(

            DOM.SUMMARY.periodQuickIncome,

            formatCurrencyShort(

                Salary.home.periodIncome

            )

        );

    },

    3000

);

animateNumber(

    DOM.SUMMARY.periodQuickQty,

    Salary.home.periodQty,

    {

        duration:3000

    }

);

animateNumber(

    DOM.SUMMARY.periodWorkingDays,

    Salary.home.periodWorkingDays,

    {

        duration:3000

    }

);

setText(

    DOM.SUMMARY.periodQuickDate,

    Salary.home.periodDate

);

       }

/* =====================================================
   HOME
===================================================== */

function renderHome(){

    renderHero();

    renderHomeSummary();

}
