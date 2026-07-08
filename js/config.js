/* =====================================================
   SALARY DIARY
   FILE : js/config.js
   DESCRIPTION : Application Configuration
===================================================== */


/* =====================================================
   APPLICATION
===================================================== */

const APP={

    NAME:"Salary Diary",

    VERSION:"1.0.0",

    AUTHOR:"Ainur",

    LOCALE:"id-ID",

    CURRENCY:"IDR"

};


/* =====================================================
   GOOGLE SPREADSHEET
===================================================== */

const SHEET={

    ID:

    "1NW0bnM6WUvj8quuiYJyOCqcm3W7WvReDIQ9khjJzYQo",

    WORK:"kerja",

    PRICE:"harga",

    EXT:"ext"

};


/* =====================================================
   API
===================================================== */

const API={

    BASE:

    "https://opensheet.elk.sh",

    work(){

        return `${this.BASE}/${SHEET.ID}/${SHEET.WORK}`;

    },

    price(){

        return `${this.BASE}/${SHEET.ID}/${SHEET.PRICE}`;

    },

    ext(){

        return `${this.BASE}/${SHEET.ID}/${SHEET.EXT}`;

    }

};


/* =====================================================
   TIMELINE
===================================================== */

const TIMELINE={

    LIMIT:5,

    INDICATOR:3

};


/* =====================================================
   SALARY
===================================================== */

const SALARY={

    START_DAY:28,

    END_DAY:27

};


/* =====================================================
   HOME
===================================================== */

const HOME={

    INSIGHT_LIMIT:1

};


/* =====================================================
   FILTER
===================================================== */

const FILTER={

    DEFAULT_TIMELINE_PAGE:0,

    DEFAULT_SALARY_INDEX:0

};


/* =====================================================
   EXT NAME
===================================================== */

const EXT={

    MEAL:"makan",

    BPJS:"bpjs"

};


/* =====================================================
   TYPE
===================================================== */

const TYPE={

    WORK:"work",

    ALLOWANCE:"allowance",

    DEDUCTION:"deduction"

};

/* =====================================================
   DEPARTMENT
===================================================== */

const DEPARTMENT={

    IRONING:"ironing"

};

/* =====================================================
   CHARACTER
===================================================== */

const CHARACTER={

    HAPPY:"happy.png",

    WORK:"work.png",

    SALARY:"salary.png"

};


/* =====================================================
   ICON
===================================================== */

const ICON={

    WORK:"laundry",

    ALLOWANCE:"restaurant",

    DEDUCTION:"receipt_long"

};


/* =====================================================
   COLOR
===================================================== */

const COLOR={

    PRIMARY:"#FF7EB6",

    SUCCESS:"#7EDC92",

    WARNING:"#FFC857",

    DANGER:"#FF6B81",

    INFO:"#74B9FF"

};


/* =====================================================
   FORMAT
===================================================== */

const FORMAT={

    DATE:"id-ID",

    CURRENCY:"IDR"

};


/* =====================================================
   STORAGE
===================================================== */

const STORAGE={

    LAST_PAGE:"salary-last-page"

};


/* =====================================================
   WEEKEND
===================================================== */

const WEEKEND=[

    0,

    6

];


/* =====================================================
   MONTH
===================================================== */

const MONTH=[

    "Januari",

    "Februari",

    "Maret",

    "April",

    "Mei",

    "Juni",

    "Juli",

    "Agustus",

    "September",

    "Oktober",

    "November",

    "Desember"

];


/* =====================================================
   DAY
===================================================== */

const DAY=[

    "Minggu",

    "Senin",

    "Selasa",

    "Rabu",

    "Kamis",

    "Jumat",

    "Sabtu"

];


/* =====================================================
   INSIGHT MESSAGE
===================================================== */

const MESSAGE={

    EARLY:{

        MORNING:

        "Awali bulan ini dengan semangat 💪. Setiap pekerjaan hari ini adalah langkah menuju hasil yang membahagiakan.",

        AFTERNOON:

        "Jangan lupa istirahat sejenak agar tenaga tetap terjaga untuk melanjutkan pekerjaan.",

        EVENING:

        "Bulan baru saja dimulai. Terima kasih sudah bekerja keras hari ini 👍."

    },

    MIDDLE:{

        MORNING:

        "Setengah perjalanan sudah dilewati. Tetap semangat sampai akhir periode.",

        AFTERNOON:

        "Jangan terlalu memaksakan diri. Istirahat juga bagian dari bekerja dengan baik 🫶.",

        EVENING:

        "Hasil kerja kerasmu mulai terkumpul. Tetap konsisten setiap hari."

    },

    LATE:{

        MORNING:

        "Sebentar lagi masa gajian tiba 🎉. Semangat menyelesaikan pekerjaan hari ini.",

        AFTERNOON:

        "Tinggal sedikit lagi sebelum hasil kerja kerasmu dibayarkan. Tetap fokus ya 🫶.",

        EVENING:

        "Perjuanganmu hampir selesai 💕. Semoga gaji nanti membawa kebahagiaan untuk keluarga."

    }

};
    

/* =====================================================
   DEBUG
===================================================== */

const DEBUG={

    APP:true,

    API:true,

    PROCESS:true,

    HOME:true,

    STATISTIC:true,

    SALARY:true,

    TIMELINE:true,

    EVENT:true,

    PERFORMANCE:false

};
