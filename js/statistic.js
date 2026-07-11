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

        typeof Chart === "undefined"

    ){

        return;

    }


    /* =========================
       THEME
    ========================= */

    const isDark =

    document.body.classList.contains(

        "dark-mode"

    );


    const chartTextColor =

    isDark

    ? "#C7BACB"

    : "#7F7F7F";


    const chartGridColor =

    isDark

    ? "rgba(255,130,183,.10)"

    : "rgba(0,0,0,.06)";


    const chartBarColor =

    isDark

    ? "#FF82B7"

    : "#D94F8A";


    /* =========================
       DESTROY OLD CHART
    ========================= */

    if(

        statisticChart

    ){

        statisticChart.destroy();

    }


    /* =========================
       DATA
    ========================= */

    const labels =

    Salary.statistic.chart

    .map(

        item =>

        item.label

    );


    const income =

    Salary.statistic.chart

    .map(

        item =>

        item.income

    );


    /* =========================
       CREATE CHART
    ========================= */

    statisticChart =

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

                    chartBarColor,

                    borderSkipped:false

                }]

            },


            options:{

                responsive:true,

                maintainAspectRatio:false,


                animation:{

                    duration:700,

                    easing:

                    "easeOutQuart"

                },


                plugins:{

                    legend:{

                        display:false

                    },


                    tooltip:{

                        backgroundColor:

                        isDark

                        ? "#2A2138"

                        : "#FFFFFF",


                        titleColor:

                        isDark

                        ? "#FFF5FA"

                        : "#3E3E3E",


                        bodyColor:

                        isDark

                        ? "#C7BACB"

                        : "#7F7F7F",


                        borderColor:

                        isDark

                        ? "rgba(255,130,183,.18)"

                        : "rgba(217,79,138,.15)",


                        borderWidth:1,


                        padding:12,


                        displayColors:false,


                        callbacks:{

                            label:

                            context =>

                            formatCurrency(

                                context.raw

                            )

                        }

                    }

                },


                scales:{

                    x:{

                        border:{

                            display:false

                        },


                        grid:{

                            display:false

                        },


                        ticks:{

                            color:

                            chartTextColor,


                            font:{

                                family:

                                "Poppins",

                                size:11

                            }

                        }

                    },


                    y:{

                        beginAtZero:true,


                        border:{

                            display:false

                        },


                        grid:{

                            color:

                            chartGridColor

                        },


                        ticks:{

                            color:

                            chartTextColor,


                            font:{

                                family:

                                "Poppins",

                                size:11

                            },


                            callback:

                            value =>

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

