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

    ) || null;

    const bpjs = period.slip.find(

        item => item.type === TYPE.DEDUCTION

    ) || null;

    const workingDays = new Set(

        period.items.map(

            item => item.tanggalText

        )

    ).size;

    return{

        period,

        workItems,

        meal,

        bpjs,

        workingDays,

        totalWork: period.totalWork,

        totalAllowance: period.totalAllowance,

        totalDeduction: period.totalDeduction,

        totalSalary: period.totalSalary

    };

}

/* =====================================================
   RENDER EXPORT
===================================================== */

function renderSalaryExport(){

    const slip = getSalarySlipData();

    if(!slip){

        return;

    }

    /* =========================
       HEADER
    ========================= */

    setText(

        document.getElementById(

            "exportPeriod"

        ),

        slip.period.title

    );

    /* =========================
       PROFILE
    ========================= */

    setText(

        document.getElementById(

            "exportName"

        ),

        APP.USER?.name ||

        "Dewi Nadzifah"

    );

    setText(

        document.getElementById(

            "exportNik"

        ),

        APP.USER?.nik ||

        "18012PHL"

    );

    setText(

        document.getElementById(

            "exportDepartment"

        ),

        APP.USER?.department ||

        "Ironing"

    );

    /* =========================
       WORKING DAYS
    ========================= */

    setText(

        document.getElementById(

            "exportWorkingDays"

        ),

        `${slip.workingDays} Hari Kerja`

    );

    /* =========================
       INCOME LIST
    ========================= */

    const container =

        document.getElementById(

            "exportIncomeList"

        );

    clear(

        container

    );

    slip.workItems.forEach(

        item=>{

            container.insertAdjacentHTML(

                "beforeend",

`
<div class="export-item">

    <div class="export-left">

        <b>

            ${item.name}

        </b>

        <span>

            ${item.qty}

            ×

            ${formatDecimal(item.harga)}

        </span>

    </div>

    <div class="export-right">

        ${formatCurrency(item.nominal)}

    </div>

</div>
`

            );

        }

    );

    /* =========================
       TOTAL
    ========================= */

    setText(

        document.getElementById(

            "exportIncomeTotal"

        ),

        formatCurrency(

            slip.totalWork

        )

    );

    setText(

        document.getElementById(

            "exportMeal"

        ),

        slip.meal

        ?

        formatCurrency(

            slip.meal.nominal

        )

        :

        "-"

    );

    setText(

        document.getElementById(

            "exportBpjs"

        ),

        slip.bpjs

        ?

        "-" +

        formatCurrency(

            slip.bpjs.nominal

        )

        :

        "-"

    );

    setText(

        document.getElementById(

            "exportSalary"

        ),

        formatCurrency(

            slip.totalSalary

        )

    );

    /* =========================
       PRINT DATE
    ========================= */

    const now = new Date();

    setText(

        document.getElementById(

            "exportPrintDate"

        ),

        `${formatDate(now)} • ${

            now.toLocaleTimeString(

                APP.LOCALE,

                {

                    hour:"2-digit",

                    minute:"2-digit"

                }

            )

        }`

    );

}


/* =====================================================
   EXPORT MODAL
===================================================== */

async function showSalaryExport(){

    renderSalaryExport();

    const source =

    document.getElementById(

        "salaryExport"

    );

    const modal =

    document.getElementById(

        "salaryExportModal"

    );

    const preview =

    document.getElementById(

        "salaryExportPreview"

    );

    if(

        !source ||

        !modal ||

        !preview

    ){

        return;

    }

    preview.innerHTML = "";

    const oldStyle = {

        position:source.style.position,

        left:source.style.left,

        top:source.style.top,

        zIndex:source.style.zIndex

    };

    source.style.position = "fixed";

    source.style.left = "0";

    source.style.top = "0";

    source.style.zIndex = "9999";

console.log(source);
console.log(source.offsetWidth);
console.log(source.offsetHeight);

    const canvas =

    await html2canvas(

        source,

        {

            scale:2,

            backgroundColor:"#FFFFFF",

            useCORS:true

        }

    );

    Salary.exportCanvas = canvas;

    preview.appendChild(

        canvas

    );

    source.style.position =

    oldStyle.position;

    source.style.left =

    oldStyle.left;

    source.style.top =

    oldStyle.top;

    source.style.zIndex =

    oldStyle.zIndex;

    modal.classList.add(

        "show"

    );

}


/* =====================================================
   CLOSE EXPORT
===================================================== */

function closeSalaryExport(){

    document

    .getElementById(

        "salaryExportModal"

    )

    .classList.remove(

        "show"

    );

}


/* =====================================================
   DOWNLOAD IMAGE
===================================================== */

function downloadSalaryImage(){

    if(

        !Salary.exportCanvas

    ){

        return;

    }

    const period =

    getCurrentPeriod();

    const link =

    document.createElement(

        "a"

    );

    link.download =

    `Slip Gaji ${period.id}.png`;

    link.href =

    Salary.exportCanvas

    .toDataURL(

        "image/png"

    );

    link.click();

}


/* =====================================================
   DOWNLOAD PDF
===================================================== */

function downloadSalaryPdf(){

    alert(

        "Export PDF akan ditambahkan pada tahap berikutnya."

    );

}

/* =====================================================
   RENDER SALARY
===================================================== */

function renderSalary(){

    renderSalaryPeriod();

    renderSalarySlip();

    renderSalaryTotal();

    renderSalaryExport();

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


