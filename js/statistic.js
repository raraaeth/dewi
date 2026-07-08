/* =====================================================
   SALARY DIARY
   FILE : js/statistic.js
   DESCRIPTION : Statistic Renderer
===================================================== */


/* =====================================================
   CHART
===================================================== */

let statisticChart=null;


/* =====================================================
   RENDER CHART
===================================================== */

function renderChart(){

    if(

        !DOM.STATISTIC.chart ||

        typeof Chart==="undefined"

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

                    backgroundColor:"#D94F8A",

                    borderSkipped:false

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

                        beginAtZero:true,

                        ticks:{

                            callback:value=>

                            formatCurrency(

                                value

                            )

                        }

                    }

                }

            }

        }

    );

}


/* =====================================================
   RENDER SUMMARY
===================================================== */

function renderStatisticSummary(){

    const summary=

    Salary.statistic.summary;

    DOM.STATISTIC.summaryWorkingDays.textContent=

    summary.workingDays;

    DOM.STATISTIC.summaryQty.textContent=

    summary.totalQty;

    DOM.STATISTIC.summaryIncome.textContent=

    formatCurrency(

        summary.income

    );

    DOM.STATISTIC.summaryAverage.textContent=

    formatCurrency(

        summary.average

    );

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

    const pages=

    Salary.statistic.timeline.pages;

    const current=

    Salary.statistic.timeline.currentPage;

    const items=

    pages[current] ||

    [];

    items.forEach(

        day=>{

            DOM.TIMELINE.container

            .insertAdjacentHTML(

                "beforeend",

`
<div class="timeline-card">

<div class="timeline-header">

<div>

<h3>

${day.tanggalText}

</h3>

<p>

${day.hari}

</p>

</div>

<strong>

${formatCurrency(day.totalNominal)}

</strong>

</div>

<div class="timeline-total">

<span>

📦 Total Pekerjaan

</span>

<strong>

${day.totalQty} pcs

</strong>

</div>

<div class="timeline-divider">

</div>

<div class="timeline-body">

${day.items.map(item=>`

<div class="timeline-item">

<div>

<b>

${item.name}

</b>

<small>

${item.qty} pcs

</small>

</div>

<span>

${formatCurrency(item.nominal)}

</span>

</div>

`).join("")}

</div>

</div>

`

            );

        }

    );

    updateTimelineIndicator();

}


/* =====================================================
   TIMELINE INDICATOR
===================================================== */

function updateTimelineIndicator(){

    DOM.TIMELINE.dots

    .forEach(

        (

            dot,

            index

        )=>{

            dot.classList.toggle(

                "active",

                index===

                Salary.statistic.timeline.currentPage

            );

        }

    );

}

/* =====================================================
   NEXT PAGE
===================================================== */

function nextTimeline(){

    const timeline=

    Salary.statistic.timeline;

    if(

        timeline.currentPage<

        timeline.pages.length-1

    ){

        timeline.currentPage++;

    }

    renderTimeline();

}


/* =====================================================
   PREVIOUS PAGE
===================================================== */

function previousTimeline(){

    if(

        Salary.statistic.timeline.currentPage>

        0

    ){

        Salary.statistic.timeline.currentPage--;

    }

    renderTimeline();

           }

/* =====================================================
   CHANGE FILTER
===================================================== */

function changeStatisticFilter(filter){

    Salary.statistic.currentFilter=

    filter;

    applyStatisticFilter();

    renderStatistic();

}

/* =====================================================
   UPDATE FILTER BUTTON
===================================================== */

function renderFilter(){

    const buttons=[

        DOM.STATISTIC.filterWeek,

        DOM.STATISTIC.filterLastWeek,

        DOM.STATISTIC.filterMonth,

        DOM.STATISTIC.filterLastMonth,

        DOM.STATISTIC.filterThreeMonth

    ];

    const filters=[

        "week",

        "lastWeek",

        "month",

        "lastMonth",

        "threeMonth"

    ];

    buttons.forEach(

        (

            button,

            index

        )=>{

            button.classList.toggle(

                "active",

                Salary.statistic.currentFilter===

                filters[index]

            );

        }

    );

}

/* =====================================================
   UPDATE PERIOD TEXT
===================================================== */

function renderPeriod(){

    const text={

        week:"Minggu Ini",

        lastWeek:"Minggu Lalu",

        month:"Bulan Ini",

        lastMonth:"Bulan Lalu",

        threeMonth:"3 Bulan"

    };

    const value=

    text[

        Salary.statistic.currentFilter

    ];

    DOM.STATISTIC.chartPeriod.textContent=
    value;

    DOM.STATISTIC.filterChip.textContent=
    value;

    DOM.TIMELINE.period.textContent=
    value;

    DOM.STATISTIC.summaryPeriod.textContent=
    value;

}

/* =====================================================
   RENDER STATISTIC
===================================================== */

function renderStatistic(){

    renderFilter();

    renderPeriod();

    renderChart();

    renderTimeline();

    renderStatisticSummary();

}

/* =====================================================
   FILTER ACTION
===================================================== */

function filterWeek(){

    changeStatisticFilter(

        "week"

    );

}


function filterLastWeek(){

    changeStatisticFilter(

        "lastWeek"

    );

}


function filterMonth(){

    changeStatisticFilter(

        "month"

    );

}


function filterLastMonth(){

    changeStatisticFilter(

        "lastMonth"

    );

}


function filterThreeMonth(){

    changeStatisticFilter(

        "threeMonth"

    );

       }

/* =====================================================
   TIMELINE ACTION
===================================================== */

function timelineNext(){

    nextTimeline();

}


function timelineBack(){

    previousTimeline();

}

