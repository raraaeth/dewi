/* =====================================================
   SALARY DIARY
   FILE : js/salary.js
   DESCRIPTION : Salary Renderer
===================================================== */


/* =====================================================
   CURRENT PERIOD
===================================================== */

function getCurrentPeriod(){

    return Salary.salary.periods[

        Salary.salary.currentIndex

    ];

}


/* =====================================================
   PERIOD
===================================================== */

function renderSalaryPeriod(){

    const period=

    getCurrentPeriod();

    if(

        !period

    ){

        return;

    }

    setText(

        DOM.SALARY.period,

        period.title

    );

}


/* =====================================================
   SLIP
===================================================== */

function renderSalarySlip(){

    const period=

    getCurrentPeriod();

    if(

        !period

    ){

        return;

    }

    clear(

        DOM.SALARY.slip

    );

    period.slip.forEach(

        item=>{

            DOM.SALARY.slip

            .insertAdjacentHTML(

                "beforeend",

`

<div class="salary-item">

    <div class="salary-left">

        <div class="salary-name">

            ${item.name}

        </div>

        <div class="salary-detail">

            ${item.qty}

            ×

            ${formatDecimal(item.harga)}

        </div>

    </div>

    <div class="salary-right">

        ${formatCurrency(item.nominal)}

    </div>

</div>

`

            );

        }

    );

}


/* =====================================================
   TOTAL
===================================================== */

function renderSalaryTotal(){

    const period=

    getCurrentPeriod();

    if(

        !period

    ){

        return;

    }

    setText(

        DOM.SALARY.totalWork,

        formatCurrency(

            period.totalWork

        )

    );

    setText(

        DOM.SALARY.totalAllowance,

        formatCurrency(

            period.totalAllowance

        )

    );

    setText(

        DOM.SALARY.totalDeduction,

        formatCurrency(

            period.totalDeduction

        )

    );

    setText(

        DOM.SALARY.totalSalary,

        formatCurrency(

            period.totalSalary

        )

    );

}


/* =====================================================
   NAVIGATION
===================================================== */

function updateSalaryNavigation(){

    DOM.SALARY.back.disabled=

    Salary.salary.currentIndex>=

    Salary.salary.periods.length-1;

    DOM.SALARY.next.disabled=

    Salary.salary.currentIndex<=0;

}

/* =====================================================
   PREVIOUS PERIOD
===================================================== */

function previousSalaryPeriod(){

    if(

        Salary.salary.currentIndex<

        Salary.salary.periods.length-1

    ){

        Salary.salary.currentIndex++;

        renderSalary();

    }

}


/* =====================================================
   NEXT PERIOD
===================================================== */

function nextSalaryPeriod(){

    if(

        Salary.salary.currentIndex>

        0

    ){

        Salary.salary.currentIndex--;

        renderSalary();

    }

}

/* =====================================================
   SALARY
===================================================== */

function renderSalary(){

    renderSalaryPeriod();

    renderSalarySlip();

    renderSalaryTotal();

    updateSalaryNavigation();

}
