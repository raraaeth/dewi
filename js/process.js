/* =====================================================
   SALARY DIARY
   FILE : js/process.js
   DESCRIPTION : Data Processor
===================================================== */

/* =====================================================
   NORMALIZE
===================================================== */

function normalizeData(){

    Salary.data.kerja=[];

    Salary.raw.kerja.forEach(

        (item,index)=>{

            const tanggal=

            new Date(

                item.Tanggal

            );

            const dept=

            item.Dept

            ?.trim() ||

            "";

            const jenis=

            item.Jenis

            ?.trim() ||

            "";

            const qty=

            toNumber(

                item.QTY

            );

            const special=

            toNumber(

                item.Special

            );

            const isIroning=

            dept

            .toLowerCase()

            ===

            DEPARTMENT.IRONING;

            const name=

            isIroning

            ?

            jenis

            :

            dept;

            const harga=

            isIroning

            ?

            (

                Salary.cache.priceMap

                [jenis] ||

                0

            )

            :

            special;

            const nominal=

            qty*

            harga;

            Salary.data.kerja.push({

                id:

                index+1,

                tanggal,

                tanggalText:

                formatDate(

                    tanggal

                ),

                hari:

                getDayName(

                    tanggal

                ),

                bulan:

                tanggal.getMonth(),

                bulanNama:

                getMonthName(

                    tanggal.getMonth()

                ),

                tahun:

                tanggal.getFullYear(),

                dept,

                jenis,

                name,

                qty,

                harga,

                nominal,

                special,

                catatan:

                item.Catatan ||

                "",

                isIroning,

                isWeekend:

                isWeekend(

                    tanggal

                ),

                periodeGaji:null

            });

        }

    );

    Salary.data.kerja.sort(

        sortDateDesc

    );

    /* =====================================
       DEBUG
    ===================================== */

    console.group(

        "Normalize Data"

    );

    console.table(

        Salary.data.kerja

    );

    console.log(

        "Total Data :",

        Salary.data.kerja.length

    );

    console.groupEnd();

               }

/* =====================================================
   PRICE MAP
===================================================== */

function buildPriceMap(){

    Salary.cache.priceMap={};

    Salary.raw.harga.forEach(

        item=>{

            const jenis=

            item.Jenis?.trim();

            const harga=

            toNumber(

                item.Harga

            );

            if(

                !jenis

            ){

                return;

            }

            Salary.cache.priceMap

            [jenis]=

            harga;

        }

    );

}


/* =====================================================
   EXT MAP
===================================================== */

function buildExtMap(){

    Salary.cache.extMap={};

    Salary.raw.ext.forEach(

        item=>{

            const key=

            item.Ext

            ?.trim()

            .toLowerCase();

            const nominal=

            toNumber(

                item.Nominal

            );

            if(

                !key

            ){

                return;

            }

            Salary.cache.extMap

            [key]=

            nominal;

        }

    );

}

/* =====================================================
   TIMELINE
===================================================== */

function buildTimeline(){

    const groups={};

    Salary.data.kerja.forEach(

        item=>{

            const key=

            item.tanggal

            .toISOString()

            .split("T")[0];

            if(

                !groups[key]

            ){

                groups[key]={

                    id:key,

                    tanggal:item.tanggal,

                    tanggalText:

                    item.tanggalText,

                    hari:

                    item.hari,

                    bulan:

                    item.bulan,

                    bulanNama:

                    item.bulanNama,

                    tahun:

                    item.tahun,

                    totalQty:0,

                    totalNominal:0,

                    workCount:0,

                    subtitle:"",

                    items:[]

                };

            }

            groups[key]

            .items

            .push({

                name:

                item.name,

                qty:

                item.qty,

                harga:

                item.harga,

                nominal:

                item.nominal

            });

            groups[key]

            .totalQty+=

            item.qty;

            groups[key]

            .totalNominal+=

            item.nominal;

            groups[key]

            .workCount++;

        }

    );

    const timeline=

    Object.values(

        groups

    )

    .sort(

        (

            a,

            b

        )=>

        b.tanggal-

        a.tanggal

    );

    timeline.forEach(

        item=>{

            item.subtitle=

            `${

                item.workCount

            } Jenis Pekerjaan`;

        }

    );

    Salary.timeline.pages=[];

    for(

        let i=0;

        i<timeline.length;

        i+=TIMELINE.LIMIT

    ){

        Salary.timeline.pages.push(

            timeline.slice(

                i,

                i+

                TIMELINE.LIMIT

            )

        );

    }

    Salary.timeline.currentPage=0;

    /* =====================================
       DEBUG
    ===================================== */

    console.group(

        "Timeline"

    );

    console.log(

        "Page :",

        Salary.timeline.pages.length

    );

    console.table(

        timeline.map(

            item=>({

                Tanggal:

                item.tanggalText,

                Qty:

                item.totalQty,

                Nominal:

                item.totalNominal,

                Pekerjaan:

                item.workCount

            })

        )

    );

    console.groupEnd();

}


/* =====================================================
   HOME
===================================================== */

function buildHome(){

    const timeline=

    Salary.timeline

    .pages

    .flat();

    if(

        timeline.length===0

    ){

        Salary.home={

            lastIncome:0,

            lastWorkDate:"-",

            weekIncome:0,

            periodIncome:0,

            periodDate:"-",

            todayIncome:0,

            todayQty:0,

            todayWork:0,

            insight:null

        };

        return;

    }

    const last=

    timeline[0];

    const week=

    timeline

    .slice(

        0,

        7

    );

    /* =====================================
       PAYROLL PERIOD (28 - TODAY)
    ===================================== */

    const today=

    new Date();

    let periodStart;

    if(

        today.getDate()>=28

    ){

        periodStart=

        new Date(

            today.getFullYear(),

            today.getMonth(),

            28

        );

    }

    else{

        periodStart=

        new Date(

            today.getFullYear(),

            today.getMonth()-1,

            28

        );

    }

    const periodData=

    Salary.data.kerja

    .filter(

        item=>

        item.tanggal>=periodStart &&

        item.tanggal<=today

    );

    const periodIncome=

    periodData.reduce(

        (

            total,

            item

        )=>

        total+

        item.nominal,

        0

    );

    const periodDate=

    `${

        formatDate(

            periodStart

        )

    } - ${

        formatDate(

            today

        )

    }`;

    Salary.home={

        lastIncome:

        last.totalNominal,

        lastWorkDate:

        last.tanggalText,

        weekIncome:

        sum(

            week,

            "totalNominal"

        ),

        periodIncome:

        periodIncome,

        periodDate:

        periodDate,

        todayIncome:

        last.totalNominal,

        todayQty:

        last.totalQty,

        todayWork:

        last.workCount,

        insight:null

    };

}


/* =====================================================
   STATISTIC
===================================================== */

function buildStatistic(){

    const source=

    Salary.timeline

    .pages

    .flat();

    Salary.statistic={

        currentFilter:"week",

        source,

        filtered:[],

        chart:[],

        summary:{},

        timeline:{

            pages:[],

            currentPage:0

        }

    };

    applyStatisticFilter();

}

/* =====================================================
   APPLY STATISTIC FILTER
===================================================== */

function applyStatisticFilter(){

    let data=

    [...Salary.statistic.source];

    switch(

        Salary.statistic.currentFilter

    ){

        case "week":

            data=data.slice(0,5);

            break;

        case "lastWeek":

            data=data.slice(5,10);

            break;

        case "month":

            {

                const now=data[0];

                data=data.filter(

                    item=>

                    item.bulan===now.bulan &&

                    item.tahun===now.tahun

                );

            }

            break;

        case "lastMonth":

            {

                const now=data[0];

                let bulan=

                now.bulan-1;

                let tahun=

                now.tahun;

                if(

                    bulan<0

                ){

                    bulan=11;

                    tahun--;

                }

                data=data.filter(

                    item=>

                    item.bulan===bulan &&

                    item.tahun===tahun

                );

            }

            break;

        case "threeMonth":

            data=data.slice(0,90);

            break;

    }

    Salary.statistic.filtered=data;

    buildStatisticChart();

    buildStatisticSummary();

    buildStatisticTimeline();

}

/* =====================================================
   BUILD CHART
===================================================== */

function buildStatisticChart(){

    Salary.statistic.chart=

    Salary.statistic.filtered

    .slice()

    .reverse()

    .map(

        item=>({

            label:

            item.hari.substring(

                0,

                3

            ),

            income:

            item.totalNominal

        })

    );

           }
/* =====================================================
   BUILD SUMMARY
===================================================== */

function buildStatisticSummary(){

    const data=

    Salary.statistic.filtered;

    const income=

    data.reduce(

        (

            total,

            item

        )=>

        total+

        item.totalNominal,

        0

    );

    const qty=

    data.reduce(

        (

            total,

            item

        )=>

        total+

        item.totalQty,

        0

    );

    Salary.statistic.summary={

        workingDays:

        data.length,

        totalQty:qty,

        income,

        average:

        data.length

        ?

        income/

        data.length

        :

        0

    };

}

/* =====================================================
   BUILD TIMELINE
===================================================== */

function buildStatisticTimeline(){

    const pages=[];

    const data=

    Salary.statistic.filtered;

    const CARD_PER_PAGE=3;

    for(

        let i=0;

        i<data.length;

        i+=CARD_PER_PAGE

    ){

        pages.push(

            data.slice(

                i,

                i+

                CARD_PER_PAGE

            )

        );

    }

    Salary.statistic.timeline={

        pages,

        currentPage:0

    };

}


/* =====================================================
   SALARY PERIOD
===================================================== */

function buildSalaryPeriod(){

    Salary.salary.periods=[];

    const periods={};

    Salary.data.kerja.forEach(

        item=>{

            const tanggal=

            item.tanggal;

            const tahun=

            tanggal.getFullYear();

            const bulan=

            tanggal.getMonth();

            const hari=

            tanggal.getDate();

            let periodYear=

            tahun;

            let periodMonth=

            bulan;

            if(

                hari>=SALARY.START_DAY

            ){

                periodMonth++;

                if(

                    periodMonth>11

                ){

                    periodMonth=0;

                    periodYear++;

                }

            }

            const id=

            `${periodYear}-${String(periodMonth+1).padStart(2,"0")}`;

            if(

                !periods[id]

            ){

                const start=

                new Date(

                    periodYear,

                    periodMonth-1,

                    SALARY.START_DAY

                );

                const end=

                new Date(

                    periodYear,

                    periodMonth,

                    SALARY.END_DAY

                );

                periods[id]={

                    id,

                    title:

                    `${

                        formatDate(start)

                    } - ${

                        formatDate(end)

                    }`,

                    start,

                    end,

                    items:[],

                    slip:[],

                    totalWork:0,

                    totalAllowance:0,

                    totalDeduction:0,

                    totalSalary:0

                };

            }

            item.periodeGaji=id;

            periods[id]

            .items

            .push(

                item

            );

        }

    );

    Salary.salary.periods=

    Object.values(

        periods

    )

    .sort(

        (a,b)=>

        b.start-a.start

    );

    /* =====================================
       DEFAULT PERIOD
    ===================================== */

    const today=

    new Date();

    const currentStart=

    new Date(

        today.getFullYear(),

        today.getMonth(),

        SALARY.START_DAY

    );

    if(

        today<currentStart

    ){

        Salary.salary.currentIndex=1;

    }

    else{

        Salary.salary.currentIndex=0;

    }

    if(

        Salary.salary.currentIndex>

        Salary.salary.periods.length-1

    ){

        Salary.salary.currentIndex=0;

    }

    /* =====================================
       DEBUG
    ===================================== */

    console.group(

        "Salary Period"

    );

    console.table(

        Salary.salary.periods.map(

            period=>({

                ID:

                period.id,

                Period:

                period.title,

                Item:

                period.items.length,

                Current:

                period===Salary.salary.periods[
                    Salary.salary.currentIndex
                ]

            })

        )

    );

    console.log(

        "Current Index :",

        Salary.salary.currentIndex

    );

    console.log(

        "Current Period :",

        Salary.salary.periods[
            Salary.salary.currentIndex
        ]?.title

    );

    console.groupEnd();

              }


/* =====================================================
   SALARY SLIP
===================================================== */

function buildSalarySlip(){

    Salary.salary.periods.forEach(

        period=>{

            period.slip=[];

            period.totalWork=0;

            period.totalAllowance=0;

            period.totalDeduction=0;

            period.totalSalary=0;

            const workMap={};

            let mealDay=0;

            /* =====================================
               WORK
            ===================================== */

            period.items.forEach(

                item=>{

                    const key=

                    item.name;

                    if(

                        !workMap[key]

                    ){

                        workMap[key]={

                            type:

                            TYPE.WORK,

                            name:key,

                            qty:0,

                            harga:item.harga,

                            nominal:0

                        };

                    }

                    workMap[key]

                    .qty+=

                    item.qty;

                    workMap[key]

                    .nominal+=

                    item.nominal;

                }

            );

            period.slip.push(

                ...Object.values(

                    workMap

                )

            );

            /* =====================================
               TOTAL WORK
            ===================================== */

            period.totalWork=

            period.slip

            .reduce(

                (

                    total,

                    item

                )=>

                item.type===TYPE.WORK

                ?

                total+item.nominal

                :

                total,

                0

            );

            /* =====================================
               MEAL
            ===================================== */

            mealDay=

            unique(

                period.items

                .filter(

                    item=>

                    item.isWeekend

                )

                .map(

                    item=>

                    item.tanggalText

                )

            ).length;

            if(

                mealDay>0

            ){

                const mealPrice=

                Salary.cache.extMap

                [EXT.MEAL] ||

                0;

                period.slip.push({

                    type:

                    TYPE.ALLOWANCE,

                    name:"Makan",

                    qty:mealDay,

                    harga:mealPrice,

                    nominal:

                    mealDay*

                    mealPrice

                });

                period.totalAllowance=

                mealDay*

                mealPrice;

            }

            /* =====================================
               BPJS
            ===================================== */

            const bpjs=

            Salary.cache.extMap

            [EXT.BPJS] ||

            0;

            if(

                bpjs>0

            ){

                period.slip.push({

                    type:

                    TYPE.DEDUCTION,

                    name:"BPJS",

                    qty:1,

                    harga:bpjs,

                    nominal:bpjs

                });

                period.totalDeduction=

                bpjs;

            }

            /* =====================================
               TOTAL SALARY
            ===================================== */

            period.totalSalary=

            period.totalWork+

            period.totalAllowance-

            period.totalDeduction;

        }

    );

    /* =====================================
       DEBUG
    ===================================== */

    console.group(

        "Salary Slip"

    );

    Salary.salary.periods.forEach(

        period=>{

            console.log(

                "Periode :",

                period.title

            );

            console.table(

                period.slip

            );

            console.log(

                "Total Work :",

                formatCurrency(

                    period.totalWork

                )

            );

            console.log(

                "Allowance :",

                formatCurrency(

                    period.totalAllowance

                )

            );

            console.log(

                "Deduction :",

                formatCurrency(

                    period.totalDeduction

                )

            );

            console.log(

                "Total Salary :",

                formatCurrency(

                    period.totalSalary

                )

            );

        }

    );

    console.groupEnd();

}

/* =====================================================
   PROCESS ALL
===================================================== */

function processAll(){

    buildPriceMap();

    buildExtMap();

    normalizeData();

    buildTimeline();

    buildSalaryPeriod();

    buildSalarySlip();

    buildHome();

    buildStatistic();

} 
