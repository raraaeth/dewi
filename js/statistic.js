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
