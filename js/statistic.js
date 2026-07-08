/* =====================================================
   SALARY DIARY
   FILE : js/statistic.js
   DESCRIPTION : Statistic Renderer
===================================================== */


/* =====================================================
   CHART
===================================================== */

let monthlyChart=null;


/* =====================================================
   MONTHLY CHART
===================================================== */

function renderMonthlyChart(){

    const data=

    Salary.statistic.monthly;

    const labels=

    data.map(

        item=>

        item.label

    );

    const income=

    data.map(

        item=>

        item.income

    );

    if(

        monthlyChart

    ){

        monthlyChart.destroy();

    }

    monthlyChart=

    new Chart(

        DOM.STATISTIC.chart,

        {

            type:"bar",

            data:{

                labels,

                datasets:[{

                    data:income,

                    borderRadius:12,

                    backgroundColor:

                    COLOR.PRIMARY

                }]

            },

            options:{

                responsive:true,

                maintainAspectRatio:false,

                plugins:{

                    legend:{

                        display:false

                    }

                },

                scales:{

                    x:{

                        grid:{

                            display:false

                        }

                    },

                    y:{

                        beginAtZero:true

                    }

                }

            }

        }

    );

}

/* =====================================================
   SUMMARY
===================================================== */

function renderStatisticSummary(){

    const summary=

    Salary.statistic.summary;

    setText(

        DOM.STATISTIC.yesterdayIncome,

        formatCurrency(

            summary.yesterdayIncome

        )

    );

    setText(

        DOM.STATISTIC.bestWeekIncome,

        formatCurrency(

            summary.bestWeekIncome

        )

    );

    setText(

        DOM.STATISTIC.bestMonthIncome,

        formatCurrency(

            summary.bestMonthIncome

        )

    );

    setText(

        DOM.STATISTIC.workingDays,

        summary.workingDays

    );

    setText(

        DOM.STATISTIC.totalQty,

        summary.totalQty

    );

}

/* =====================================================
   WORK SUMMARY
===================================================== */

function renderWorkSummary(){

    clear(

        DOM.STATISTIC.workSummary

    );

    Object.entries(

        Salary.statistic.summary.totalWork

    )

    .forEach(

        ([name,qty])=>{

            DOM.STATISTIC.workSummary

            .insertAdjacentHTML(

                "beforeend",

                `

<div class="work-item">

    <span>${name}</span>

    <strong>${qty}</strong>

</div>

`

            );

        }

    );

}

/* =====================================================
   STATISTIC
===================================================== */

function renderStatistic(){

    if(typeof Chart!=="undefined"){

        renderMonthlyChart();

    }

    renderStatisticSummary();

    renderWorkSummary();

}

