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

            lastIncome:null,

            weekIncome:0,

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

    Salary.home={

        lastIncome:last,

        weekIncome:

        sum(

            week,

            "totalNominal"

        ),

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

    const kerja=

    Salary.data.kerja;

    const timeline=

    Salary.timeline

    .pages

    .flat();

    if(

        timeline.length===0

    ){

        Salary.statistic={

            monthly:[],

            summary:{},

            filter:1

        };

        return;

    }

    /* =====================================
       MONTHLY INCOME
    ===================================== */

    const monthly={};

    timeline.forEach(

        item=>{

            const key=

            `${item.tahun}-${item.bulan}`;

            if(

                !monthly[key]

            ){

                monthly[key]={

                    label:

                    `${

                        item.bulanNama

                    } ${

                        item.tahun

                    }`,

                    income:0

                };

            }

            monthly[key]

            .income+=

            item.totalNominal;

        }

    );

    /* =====================================
       SUMMARY
    ===================================== */

    const yesterday=

    timeline[1] ||

    null;

    const recentWeek=

    timeline.slice(

        0,

        7

    );

    const bestWeek=

    recentWeek.reduce(

        (

            best,

            item

        )=>

        item.totalNominal>

        best.totalNominal

        ?

        item

        :

        best,

        recentWeek[0]

    );

    const currentMonth=

    timeline.filter(

        item=>

        item.bulan===

        timeline[0].bulan &&

        item.tahun===

        timeline[0].tahun

    );

    const bestMonth=

    currentMonth.reduce(

        (

            best,

            item

        )=>

        item.totalNominal>

        best.totalNominal

        ?

        item

        :

        best,

        currentMonth[0]

    );

    const workMap={};

    kerja.forEach(

        item=>{

            if(

                !workMap[

                    item.name

                ]

            ){

                workMap[

                    item.name

                ]=0;

            }

            workMap[

                item.name

            ]+=

            item.qty;

        }

    );

    Salary.statistic={

        monthly:

        Object.values(

            monthly

        ).reverse(),

        summary:{

            yesterdayIncome:

            yesterday

            ?

            yesterday.totalNominal

            :

            0,

            bestWeekIncome:

            bestWeek

            ?

            bestWeek.totalNominal

            :

            0,

            bestMonthIncome:

            bestMonth

            ?

            bestMonth.totalNominal

            :

            0,

            workingDays:

            timeline.length,

            totalQty:

            sum(

                kerja,

                "qty"

            ),

            totalWork:

            workMap

        },

        filter:1

    };

    /* =====================================
       DEBUG
    ===================================== */

    console.group(

        "Statistic"

    );

    console.table(

        Salary.statistic.monthly

    );

    console.log(

        Salary.statistic.summary

    );

    console.groupEnd();

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

    buildHome();

    buildStatistic();

    buildSalaryPeriod();

    buildSalarySlip();

}
