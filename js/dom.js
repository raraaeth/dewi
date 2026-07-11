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

        periodIncome:$("#periodIncome"),

        periodIncomeDate:$("#periodIncomeDate"),

        todayIncome:$("#todayIncome"),

        todayQty:$("#todayQty"),

        todayWork:$("#todayWork"),

        insightTitle:$("#insightTitle"),

        insightText:$("#insightText")

    },

    STATISTIC:{

    chart:$("#monthlyChart"),

    chartPeriod:$("#chartPeriod"),

    filterChip:$("#statisticFilterChip"),

    filterWeek:$("#filterWeekButton"),

    filterLastWeek:$("#filterLastWeekButton"),

    filterMonth:$("#filterMonthButton"),

    filterLastMonth:$("#filterLastMonthButton"),

    filterThreeMonth:$("#filterThreeMonthButton"),

    summaryWorkingDays:$("#summaryWorkingDays"),

    summaryQty:$("#summaryQty"),

    summaryIncome:$("#summaryIncome"),

    summaryAverage:$("#summaryAverage"),

    summaryPeriod:$("#summaryPeriod")

},

    TIMELINE:{

    container:$("#timelineContainer"),

    period:$("#timelinePeriod"),

    back:$("#timelineBackButton"),

    next:$("#timelineNextButton"),

    indicator:$("#timelineIndicator"),

    dots:$$(".timeline-dot")

},

 SALARY:{

    period:$("#salaryPeriod"),

    slip:$("#salarySlipContainer"),

    totalWork:$("#salaryGross"),

    totalAllowance:$("#salaryMeal"),

    totalDeduction:$("#salaryBpjs"),

    totalSalary:$("#salaryNet"),

    totalCard:$("#salaryTotalCard"),

    back:$("#salaryBackButton"),

    next:$("#salaryNextButton"),

    exportImage:$("#exportImageButton"),

    exportPdf:$("#exportPdfButton")

},
    BUTTON:{

    home:$("#homeButton"),

    statistic:$("#statisticButton"),

    salary:$("#salaryButton")

},


/* =====================================================
   THEME
===================================================== */

THEME:{

    toggle:$("#themeToggle"),

    icon:$("#themeToggleIcon"),

    text:$("#themeToggleText"),

    thumb:$("#themeToggleThumb")

}

};
