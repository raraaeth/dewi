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
   SECTION EXPORT
===================================================== */

/* =====================================================
   EXPORT
===================================================== */

function buildSalaryExport(){

    const period = getCurrentPeriod();

    if(!period){

        return null;

    }

    const work = period.slip.filter(

        item=>item.type===TYPE.WORK

    );

    const meal = period.slip.find(

        item=>item.type===TYPE.ALLOWANCE

    );

    const bpjs = period.slip.find(

        item=>item.type===TYPE.DEDUCTION

    );

    const workingDays = new Set(

        period.items.map(

            item=>item.tanggalText

        )

    ).size;

    const wrapper =

    document.createElement(

        "div"

    );

    wrapper.style.position="fixed";

    wrapper.style.left="-99999px";

    wrapper.style.top="0";

    wrapper.style.width="800px";

    wrapper.style.background="#FFFFFF";

    wrapper.style.padding="40px";

    wrapper.style.zIndex="-1";

    wrapper.innerHTML=`

<div class="export-sheet">

<div class="export-header">

<h1>

Salary Diary

</h1>

<p>

Slip Gaji

</p>

<span>

${period.title}

</span>

</div>

<div class="export-profile">

<div>

<small>Nama</small>

<strong>

${APP.USER?.name||"Dewi Nadzifah"}

</strong>

</div>

<div>

<small>NIK</small>

<strong>

${APP.USER?.nik||"18012PHL"}

</strong>

</div>

<div>

<small>Bagian</small>

<strong>

${APP.USER?.department||"Ironing"}

</strong>

</div>

</div>

<div class="export-section">

<div class="export-title">

<span>

Pendapatan

</span>

<small>

${workingDays} Hari Kerja

</small>

</div>

${work.map(item=>`

<div class="export-row">

<div>

<b>

${item.name}

</b>

<small>

${item.qty} × ${formatDecimal(item.harga)}

</small>

</div>

<strong>

${formatCurrency(item.nominal)}

</strong>

</div>

`).join("")}

</div>

<div class="export-summary">

<div class="export-summary-row">

<span>

Pendapatan

</span>

<strong>

${formatCurrency(period.totalWork)}

</strong>

</div>

<div class="export-summary-row">

<span>

Uang Makan

</span>

<strong>

${meal?formatCurrency(meal.nominal):"-"}

</strong>

</div>

<div class="export-summary-row">

<span>

BPJS

</span>

<strong style="color:#E53935;">

${bpjs?"-"+formatCurrency(bpjs.nominal):"-"}

</strong>

</div>

</div>

<div class="export-total">

<span>

Total Gaji

</span>

<h2>

${formatCurrency(period.totalSalary)}

</h2>

</div>

</div>

`;

    return wrapper;

}


/* =====================================================
   EXPORT IMAGE
===================================================== */

async function downloadSalaryImage(){

    showLoading();

    try{

        const wrapper=

        buildSalaryExport();

        if(!wrapper){

            return;

        }

        document.body.appendChild(

            wrapper

        );

        const canvas=

        await html2canvas(

            wrapper,

            {

                scale:3,

                backgroundColor:"#FFFFFF",

                useCORS:true

            }

        );

        const link=

        document.createElement(

            "a"

        );

        link.download=

        `Slip Gaji ${getCurrentPeriod().id}.png`;

        link.href=

        canvas.toDataURL(

            "image/png"

        );

        link.click();

        wrapper.remove();

    }

    finally{

        hideLoading();

    }

}


/* =====================================================
   EXPORT PDF
===================================================== */

function downloadSalaryPdf(){

    alert(

        "Versi PDF akan ditambahkan setelah PNG selesai."

    );

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


