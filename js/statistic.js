/*=====================================================
   SALARY DIARY
   FILE : js/statistic.js
   DESCRIPTION : Statistic Renderer
===================================================== */


/* =====================================================
   CHART
===================================================== */

let statisticChart = null;

/* =====================================================
   RENDER CHART
===================================================== */

function renderChart(){

    if(

        typeof Chart==="undefined" ||

        !DOM.STATISTIC.chart

    ){

        return;

    }

    if(

        statisticChart

    ){

        statisticChart.destroy();

    }

    const labels=

    Salary.statistic.chart

    .map(

        item=>

        item.label

    );

    const income=

    Salary.statistic.chart

    .map(

        item=>

        item.income

    );

    statisticChart=

    new Chart(

        DOM.STATISTIC.chart,

        {

            type:"bar",

            data:{

                labels,

                datasets:[{

                    data:income,

                    borderRadius:12,

                    backgroundColor:"#D94F8A"

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
   RENDER FILTER
===================================================== */

function renderFilter(){

}


/* =====================================================
   RENDER TIMELINE
===================================================== */

function renderTimeline(){

    if(

        !DOM.TIMELINE.container

    ){

        return;

    }

    clear(

        DOM.TIMELINE.container

    );

    Salary.statistic

    .filtered

    .forEach(

        item=>{

            DOM.TIMELINE.container

            .insertAdjacentHTML(

                "beforeend",

                `

<div class="timeline-card">

<div class="timeline-top">

<h3>

${item.tanggalText}

</h3>

<span>

${item.hari}

</span>

</div>

<div class="timeline-list">

${item.items.map(work=>`

<div class="timeline-item">

<span>

${work.name}

</span>

<strong>

${work.qty} × ${formatCurrency(work.harga)}

</strong>

</div>

`).join("")}

</div>

<div class="timeline-total">

<span>

Total

</span>

<strong>

${formatCurrency(item.totalNominal)}

</strong>

</div>

</div>

`

            );

        }

    );

}


/* =====================================================
   RENDER WORK SUMMARY
===================================================== */

function renderWorkSummary(){

}









/* =====================================================
   RENDER STATISTIC
===================================================== */

function renderStatistic(){

    renderChart();

    renderFilter();

    renderTimeline();

    renderWorkSummary();

}
