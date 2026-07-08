/* =====================================================
   SALARY DIARY
   FILE : js/dom.js
   DESCRIPTION : DOM References
===================================================== */


/* =====================================================
   SELECTOR
===================================================== */

const $ = selector =>

document.querySelector(selector);


const $$ = selector =>

document.querySelectorAll(selector);


/* =====================================================
   DOM
===================================================== */

const DOM={

    LOADING:{

        screen:$("#loadingScreen")

    },

    PAGE:{

        home:$("#homePage"),

        statistic:$("#statisticPage"),

        salary:$("#salaryPage")

    },

    HERO:{

        greeting:$("#heroGreeting"),

        time:$("#heroTime"),

        day:$("#heroDay"),

        date:$("#heroDate"),

        message:$("#heroMessage"),

        character:$("#heroCharacter")

    },

    SUMMARY:{

        lastIncome:$("#lastIncome"),

        lastDate:$("#lastIncomeDate"),

        weekIncome:$("#weekIncome"),

        weekDate:$("#weekIncomeDate"),

        todayIncome:$("#todayIncome"),

        todayQty:$("#todayQty"),

        todayWork:$("#todayWork"),

        insightTitle:$("#insightTitle"),

        insightText:$("#insightText")

    },

    STATISTIC:{

        chart:$("#monthlyChart"),

        yesterdayIncome:$("#yesterdayIncome"),

        bestWeekIncome:$("#bestWeekIncome"),

        bestMonthIncome:$("#bestMonthIncome"),

        workingDays:$("#workingDays"),

        totalQty:$("#totalQty"),

        workSummary:$("#workSummary"),

        month:$("#filterMonthButton"),

        threeMonth:$("#filterThreeMonthButton"),

        sixMonth:$("#filterSixMonthButton")

    },

    TIMELINE:{

        container:$("#timelineContainer"),

        back:$("#timelineBackButton"),

        next:$("#timelineNextButton"),

        indicator:$$(".timeline-indicator")

    },

    SALARY:{

        period:$("#salaryPeriod"),

        slip:$("#salarySlipContainer"),

        totalWork:$("#salaryGross"),

        totalAllowance:$("#salaryMeal"),

        totalDeduction:$("#salaryBpjs"),

        totalSalary:$("#salaryNet"),

        back:$("#salaryBackButton"),

        next:$("#salaryNextButton"),

        exportImage:$("#exportImageButton"),

        exportPdf:$("#exportPdfButton")

    },

    BUTTON:{

        home:$("#homeButton"),

        statistic:$("#statisticButton"),

        salary:$("#salaryButton")

    }

};
