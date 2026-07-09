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
   RENDER GROUP
===================================================== */

function renderSalaryGroup(

    title,

    icon,

    items,

    total,

    negative=false

){

    if(

        items.length===0

    ){

        return "";

    }

    let groupClass="income";

    if(

        title==="Tunjangan"

    ){

        groupClass="allowance";

    }

    if(

        title==="Potongan"

    ){

        groupClass="deduction";

    }

    return `

<div class="salary-group ${groupClass}">

<div class="salary-group-header">

<div>

<span class="material-symbols-rounded">

${icon}

</span>

<b>

${title}

</b>

</div>

<strong>

${negative
?
"-"+formatCurrency(total)
:
formatCurrency(total)}

</strong>

</div>

<div class="salary-group-body">

${items.map(item=>`

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

<div class="salary-right ${negative?"negative":""}">

${negative
?
"-"+formatCurrency(item.nominal)
:
formatCurrency(item.nominal)}

</div>

</div>

`).join("")}

<div class="salary-group-total">

<span>

Total ${title}

</span>

<strong>

${negative
?
"-"+formatCurrency(total)
:
formatCurrency(total)}

</strong>

</div>

</div>

</div>

`;

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

    const work=

    period.slip.filter(

        item=>

        item.type===TYPE.WORK

    );

    const allowance=

    period.slip.filter(

        item=>

        item.type===TYPE.ALLOWANCE

    );

    const deduction=

    period.slip.filter(

        item=>

        item.type===TYPE.DEDUCTION

    );

    DOM.SALARY.slip.innerHTML=

        renderSalaryGroup(

            "Pendapatan",

            "payments",

            work,

            period.totalWork

        )+

        renderSalaryGroup(

            "Tunjangan",

            "restaurant",

            allowance,

            period.totalAllowance

        )+

        renderSalaryGroup(

            "Potongan",

            "shield",

            deduction,

            period.totalDeduction,

            true

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
   SLIP DATA
===================================================== */

function getSalarySlipData(){

    const period = getCurrentPeriod();

    if(!period){

        return null;

    }

    const workItems = period.slip.filter(

        item => item.type === TYPE.WORK

    );

    const meal = period.slip.find(

        item => item.type === TYPE.ALLOWANCE

    );

    const bpjs = period.slip.find(

        item => item.type === TYPE.DEDUCTION

    );

    return{

        period,

        workItems,

        meal,

        bpjs,

        workingDays:new Set(

            period.items.map(

                item=>item.tanggalText

            )

        ).size,

        totalWork:period.totalWork,

        totalAllowance:period.totalAllowance,

        totalDeduction:period.totalDeduction,

        totalSalary:period.totalSalary

    };

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
