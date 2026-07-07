/* =====================================================
   SALARY DIARY
   FILE : js/dom.js
   DESCRIPTION : DOM References
===================================================== */


/* =====================================================
   SELECTOR
===================================================== */

const $=(selector)=>

document.querySelector(

    selector

);


const $$=(selector)=>

document.querySelectorAll(

    selector

);


/* =====================================================
   DOM
===================================================== */

const DOM={


/* =====================================================
   LOADING
===================================================== */

loadingScreen:

$("#loadingScreen"),


/* =====================================================
   PAGE
===================================================== */

homePage:

$("#homePage"),

statisticPage:

$("#statisticPage"),

salaryPage:

$("#salaryPage"),


/* =====================================================
   HERO
===================================================== */

heroGreeting:

$("#heroGreeting"),

heroTime:

$("#heroTime"),

heroDay:

$("#heroDay"),

heroDate:

$("#heroDate"),

heroMessage:

$("#heroMessage"),

heroCharacter:

$("#heroCharacter"),


/* =====================================================
   SUMMARY
===================================================== */

lastIncome:

$("#lastIncome"),

lastIncomeDate:

$("#lastIncomeDate"),

weekIncome:

$("#weekIncome"),

weekIncomeDate:

$("#weekIncomeDate"),


/* =====================================================
   QUICK STAT
===================================================== */

todayIncome:

$("#todayIncome"),

todayQty:

$("#todayQty"),

todayWork:

$("#todayWork"),


/* =====================================================
   INSIGHT
===================================================== */

insightTitle:

$("#insightTitle"),

insightText:

$("#insightText"),


/* =====================================================
   STATISTIC
===================================================== */

monthlyChart:

$("#monthlyChart"),

yesterdayIncome:

$("#yesterdayIncome"),

bestWeekIncome:

$("#bestWeekIncome"),

bestMonthIncome:

$("#bestMonthIncome"),

workingDays:

$("#workingDays"),


/* =====================================================
   FILTER
===================================================== */

filterMonth:

$("#filterMonthButton"),

filterThreeMonth:

$("#filterThreeMonthButton"),

filterSixMonth:

$("#filterSixMonthButton"),


/* =====================================================
   TIMELINE
===================================================== */

timelineContainer:

$("#timelineContainer"),


/* =====================================================
   SALARY
===================================================== */

salaryPeriod:

$("#salaryPeriod"),

salarySlip:

$("#salarySlipContainer"),

salaryGross:

$("#salaryGross"),

salaryBpjs:

$("#salaryBpjs"),

salaryNet:

$("#salaryNet"),


/* =====================================================
   EXPORT
===================================================== */

exportImage:

$("#exportImageButton"),

exportPdf:

$("#exportPdfButton"),


/* =====================================================
   NAVIGATION
===================================================== */

homeButton:

$("#homeButton"),

statisticButton:

$("#statisticButton"),

salaryButton:

$("#salaryButton")

};
