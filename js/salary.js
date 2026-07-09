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

    const period = getCurrentPeriod();

    if(!period){
        return;
    }

    setText(
        DOM.SALARY.period,
        period.title
    );

}

/* =====================================================
   GROUP RENDERER
===================================================== */

function renderSalaryGroup(

    title,

    icon,

    items,

    total,

    negative = false

){

    if(

        !items ||

        items.length === 0

    ){

        return "";

    }

    return `

<div class="salary-group">

    <div class="salary-group-header">

        <div>

            <span class="material-symbols-rounded">

                ${icon}

            </span>

            <b>

                ${title}

            </b>

        </div>

        <strong class="${
            negative
            ? "negative"
            : ""
        }">

            ${
                negative
                ? "-" + formatCurrency(total)
                : formatCurrency(total)
            }

        </strong>

    </div>

    <div class="salary-group-body">

        ${items.map(item => `

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

            <div class="salary-right ${

                negative

                ? "negative"

                : ""

            }">

                ${

                    negative

                    ? "-" +

                    formatCurrency(

                        item.nominal

                    )

                    :

                    formatCurrency(

                        item.nominal

                    )

                }

            </div>

        </div>

        `).join("")}

        <div class="salary-group-total">

            <span>

                Total ${title}

            </span>

            <strong class="${
                negative
                ? "negative"
                : ""
            }">

                ${
                    negative
                    ? "-" + formatCurrency(total)
                    : formatCurrency(total)
                }

            </strong>

        </div>

    </div>

</div>

`;
   
 }

/* =====================================================
   RENDER SLIP
===================================================== */

function renderSalarySlip(){

    const period = getCurrentPeriod();

    if(!period){
        return;
    }

    clear(
        DOM.SALARY.slip
    );

    const work = period.slip.filter(
        item => item.type === TYPE.WORK
    );

    const allowance = period.slip.filter(
        item => item.type === TYPE.ALLOWANCE
    );

    const deduction = period.slip.filter(
        item => item.type === TYPE.DEDUCTION
    );

    let html = "";

    /* =========================
       PENDAPATAN
    ========================= */

    html += renderSalaryGroup(

        "Pendapatan",

        "payments",

        work,

        period.totalWork

    );

    /* =========================
       UANG MAKAN
    ========================= */

    if(allowance.length){

        html += renderSalaryGroup(

            "Uang Makan",

            "restaurant",

            allowance,

            period.totalAllowance

        );

    }

    /* =========================
       BPJS
    ========================= */

    if(deduction.length){

        html += renderSalaryGroup(

            "Tagihan BPJS",

            "health_and_safety",

            deduction,

            period.totalDeduction,

            true

        );

    }

    DOM.SALARY.slip.innerHTML = html;

}


/* =====================================================
   RENDER TOTAL
===================================================== */

function renderSalaryTotal(){

    const period = getCurrentPeriod();

    if(!period){

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

        "-" +

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

    DOM.SALARY.back.disabled =

        Salary.salary.currentIndex >=

        Salary.salary.periods.length - 1;

    DOM.SALARY.next.disabled =

        Salary.salary.currentIndex <= 0;

}


/* =====================================================
   PREVIOUS PERIOD
===================================================== */

function previousSalaryPeriod(){

    if(

        Salary.salary.currentIndex <

        Salary.salary.periods.length - 1

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

        Salary.salary.currentIndex > 0

    ){

        Salary.salary.currentIndex--;

        renderSalary();

    }

}








    
/* =====================================================
   RENDER SALARY
===================================================== */

function renderSalary(){

    renderSalaryPeriod();

    renderSalarySlip();

    renderSalaryTotal();

    

    updateSalaryNavigation();

    if(

        typeof animateCard === "function"

    ){

        animateCard(

            DOM.SALARY.slip

        );

        animateCard(

            DOM.SALARY.totalCard

        );

    }

}


