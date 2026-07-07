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

        randomGreeting()

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
   SUMMARY
===================================================== */

function renderSummary(){

    setText(

        DOM.SUMMARY.lastIncome,

        formatCurrency(

            Salary.home.lastIncome

        )

    );

    setText(

        DOM.SUMMARY.lastDate,

        Salary.home.lastWorkDate

    );

    setText(

        DOM.SUMMARY.weekIncome,

        formatCurrency(

            Salary.home.weekIncome

        )

    );

    setText(

        DOM.SUMMARY.todayQty,

        Salary.home.todayQty

    );

    setText(

        DOM.SUMMARY.todayWork,

        Salary.home.todayWork

    );

}

/* =====================================================
   HOME
===================================================== */

function renderHome(){

    renderHero();

    renderSummary();

}
