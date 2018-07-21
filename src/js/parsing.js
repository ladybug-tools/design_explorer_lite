//Place this file into a <script> tag,
//Call method parseCsv(googleObject) after getting the google drive link from user

//ASSUME: Format of data.csv comes in as https://github.com/d3/d3-dsv#dsv_parse dsv parse format, with data.columns

//ASSUME: Jquery is already loaded, and $ is in global scope.
//Assume: Methods updateImg();  updateEnergy(); exist on global scope

//This method will be called with the Google object - GET the data.csv, and the settings file

//this method will perform a loop, and PER input column:
//1.) Create Input{{NAME}} where name is name of column
//1.5) Create jquery on input changes for the above inputs
//2.) Create {{NAME}}Dict

var columnRegexPattern = "((?:in)|(?:out)): ?(?:(\w*) ?(?:\[(.*)\])?)";
var columnRegex = new RegExp(columnRegexPattern);
var oddSliderBackground = "background-color:#f2f2f2";
var evenSliderBackground = "background-color:#e6e6e6";
var columnToNameMap = {};
var rowValueSets = {};

var columnSets = {};
var _parameters =[];
var googleObject ={
    "csvFiles": {
        "data.csv": "https://www.googleapis.com/drive/v3/files/1n1qqgiN0r3cd0ZQEbf_5s9kV_wW2EpFk?alt=media&key=AIzaSyCSrF08UMawxKIb0m4JsA1mYE5NMmP36bY"
    },
    "imgFiles": {
        "082221_R4.png": "https://docs.google.com/uc?id=1yP_ZxnvDbYcPSBWdxU0T86sa5I268no9&export=download",
        "082212_R4.png": "https://docs.google.com/uc?id=19vMYKwqRyM3zQ_XqN-KjwF3rtG4UrCsS&export=download",
        "082220_R4.png": "https://docs.google.com/uc?id=1gTG9LWIBoyGfdXD8ESU6-OsvxupwnmwH&export=download",
        "082222_R4.png": "https://docs.google.com/uc?id=1FcUd5M3eF-wKenRxWGwBCO2CT4cayR-J&export=download",
        "082211_R4.png": "https://docs.google.com/uc?id=1bWytysKVy8z4zRS5yct4CrN2bO0DhtWO&export=download",
        "082121_R4.png": "https://docs.google.com/uc?id=17c-KV3LK5vL7fXVuESJcoLLXMN7xG-AQ&export=download",
        "082210_R4.png": "https://docs.google.com/uc?id=1zKfUVeqSBLOPBW5abXGYMvfVxAZm0hWX&export=download",
        "082202_R4.png": "https://docs.google.com/uc?id=1CtMczgtKT4ykAT9TjKmYyyuzO_CnvmDt&export=download",
        "082122_R4.png": "https://docs.google.com/uc?id=1rZXEb3vDagjkhfK79GpJCfcNoKqsoMy-&export=download",
        "082112_R4.png": "https://docs.google.com/uc?id=1nzJuUn1csqZgmZwvpuD9V6GlE_vLZvsh&export=download",
        "082120_R4.png": "https://docs.google.com/uc?id=1-Z6kOzU-qAUQ6JqBWJtKY-Udlz8Sramy&export=download",
        "082201_R4.png": "https://docs.google.com/uc?id=1GbprOS6xHU4pAg_sDJLRaBfdcuwzwQZO&export=download",
        "082200_R4.png": "https://docs.google.com/uc?id=12tspCZXvOZrVwfcNWBhJK_I55lT2Tsol&export=download",
        "082111_R4.png": "https://docs.google.com/uc?id=1jaFpD6hv572keSdi6oSyRVR66bkqwdSh&export=download",
        "082012_R4.png": "https://docs.google.com/uc?id=16pYr6lOO57LjP6d66I_FF05Ef16IijSz&export=download",
        "082110_R4.png": "https://docs.google.com/uc?id=1Al2czRBb5gc3I7ceO5nsVaq1xownLi9c&export=download",
        "082022_R4.png": "https://docs.google.com/uc?id=11RDW4s6OcTWRsDsuxJhB3q2mBpH8ff85&export=download",
        "082101_R4.png": "https://docs.google.com/uc?id=18I1iaYnwanMjtfkBcGyyX1XCvMEA-Q4v&export=download",
        "082021_R4.png": "https://docs.google.com/uc?id=1OJlKxbriS0r2rlRgDRuD0x8CsXW-xu3x&export=download",
        "082100_R4.png": "https://docs.google.com/uc?id=11eIGbJ0XJLgnp9sOF9qyUMvrMTiKowIa&export=download",
        "082102_R4.png": "https://docs.google.com/uc?id=1AdKD8XWeJe8j4Z5aiiaIrgyDPQg8pAZa&export=download",
        "081221_R4.png": "https://docs.google.com/uc?id=18cPs2vdVlapuQPRAtVz6U4yVl3WzByqb&export=download",
        "082010_R4.png": "https://docs.google.com/uc?id=1Q9ijEXYdQrvAtcmlP-ihlkvNyPqPyXuE&export=download",
        "082000_R4.png": "https://docs.google.com/uc?id=1iXRPIcDMXgiJvZkkAmsGaOb9vMccz6Km&export=download",
        "082020_R4.png": "https://docs.google.com/uc?id=1xEdRVhB9GlvsMXfAIV0rDXQwOvK9uIbp&export=download",
        "082002_R4.png": "https://docs.google.com/uc?id=1iU4q3gE2dYBz94p378vmcg3-YRn-vaIu&export=download",
        "082011_R4.png": "https://docs.google.com/uc?id=13CUz_j2Hy1ovci4UbHyzqEi_W5qxfM9U&export=download",
        "081202_R4.png": "https://docs.google.com/uc?id=12t2igD_45GtjM1boJIG2PpTFDq47FORl&export=download",
        "081212_R4.png": "https://docs.google.com/uc?id=1zL4TTnMhm3Kfj79QCYfTZclGDDXplP2B&export=download",
        "082001_R4.png": "https://docs.google.com/uc?id=1w-m2__yGjSTAM3J4YfXObq0FOw4ZNrhr&export=download",
        "081210_R4.png": "https://docs.google.com/uc?id=1ULMJg4-IW_DF-HkCT0dUSXWC_jvHTFCk&export=download",
        "081222_R4.png": "https://docs.google.com/uc?id=108wOhTL55PHHe5tyMNimwV1R4FxVzL7t&export=download",
        "081120_R4.png": "https://docs.google.com/uc?id=1coZi84eU5gsNnzQosWJz8ITlHEWiMaP8&export=download",
        "081101_R4.png": "https://docs.google.com/uc?id=1TwcGMNi6wKgK76yFkb4_sG4mhS7hOhYq&export=download",
        "081102_R4.png": "https://docs.google.com/uc?id=1dQrqa7AIM1i1pF-IfUtGnTvJLKbJx2y4&export=download",
        "081220_R4.png": "https://docs.google.com/uc?id=1JKUKThbgpgMfYEsUt5b_Uti_plS3cyLF&export=download",
        "081211_R4.png": "https://docs.google.com/uc?id=197kbxM_46VZfJBrRrfIw_DAz3BYMahaR&export=download",
        "081121_R4.png": "https://docs.google.com/uc?id=16C495h9iRc6r2DFg-lmxS8XW0S4yVyK1&export=download",
        "081111_R4.png": "https://docs.google.com/uc?id=1ieI5Ta0Bm-Opxn85SWLX0aV_FzRC5PGv&export=download",
        "081200_R4.png": "https://docs.google.com/uc?id=1FC3rYcuZrtfqJ5BQxfIABM0dLGJz0R8b&export=download",
        "081110_R4.png": "https://docs.google.com/uc?id=1_-D69nv0vT3dF09sfzJTg6TfdNDKnl_m&export=download",
        "081201_R4.png": "https://docs.google.com/uc?id=1j8w98dlC2sD1Qe8SoCqXEYhDPaZZ_Dtn&export=download",
        "081112_R4.png": "https://docs.google.com/uc?id=1mRj9ACGOx0mDfLcz58mdTv28hB-rzeYa&export=download",
        "081100_R4.png": "https://docs.google.com/uc?id=1tsce8qqfxTARp39eyoNfdllUox5eZRx3&export=download",
        "081022_R4.png": "https://docs.google.com/uc?id=1iUsfo-iyLp6lsyqAIBQ7WNyXttshVyG9&export=download",
        "081122_R4.png": "https://docs.google.com/uc?id=1SYGpf8O-UHJugMhowIEi0CKSMVf83fdJ&export=download",
        "081011_R4.png": "https://docs.google.com/uc?id=1HSR-3QWICKCmpsX4BBMqxmcMjKIgXhdm&export=download",
        "081012_R4.png": "https://docs.google.com/uc?id=1x8PN8cPZYNu1OM8nXbf3bK5Nwme0ExEM&export=download",
        "081001_R4.png": "https://docs.google.com/uc?id=14GS8eAVK7DcdMWGUKCClxrA5JygR8SdP&export=download",
        "081000_R4.png": "https://docs.google.com/uc?id=17DCevIFN9w_b2TCaSQM95_e2t7ErPKx_&export=download",
        "081010_R4.png": "https://docs.google.com/uc?id=1GxuQtbKXwDktD4RMI6l-Ff4SLTBE1iod&export=download",
        "081002_R4.png": "https://docs.google.com/uc?id=1spKVFJobB8QLgVtfdvpQ3cvvYDqWgsjm&export=download",
        "081020_R4.png": "https://docs.google.com/uc?id=1vLgidLgGV5k_ax4w6JCgFfSO1S5Am2Xd&export=download",
        "080210_R4.png": "https://docs.google.com/uc?id=122arcuZ0jO4z5J3b7EKul4E1T3QZafV0&export=download",
        "081021_R4.png": "https://docs.google.com/uc?id=10ojHwlIZ6tOB3uNgOHJSOhQkKxehy1er&export=download",
        "080212_R4.png": "https://docs.google.com/uc?id=1Hc84cTz53GjLIqJ3J6wTn7cDN3ig97vh&export=download",
        "080221_R4.png": "https://docs.google.com/uc?id=1bXwMwaIbaQFPiJwcksYNOu5NzXT8sV3m&export=download",
        "080211_R4.png": "https://docs.google.com/uc?id=1n16gKmgFtISdJFiDrdvf4iVHXth3-Bk9&export=download",
        "080222_R4.png": "https://docs.google.com/uc?id=1JunJLHzZIomtr6YdZKsCC5HfNOLGV9Vv&export=download",
        "080201_R4.png": "https://docs.google.com/uc?id=1XL2tA4jVpTem2a9C41pvF_KVYavXytV1&export=download",
        "080200_R4.png": "https://docs.google.com/uc?id=1M6BbflB4lVptmMOBQ8Z0fFGpaJfDUD87&export=download",
        "080121_R4.png": "https://docs.google.com/uc?id=1FgfGRfFehMudbP3AC7V6GDk-69FGrUiG&export=download",
        "080122_R4.png": "https://docs.google.com/uc?id=109sZSUZ0DNClQQAwqnv-bThq_WivHYnP&export=download",
        "080111_R4.png": "https://docs.google.com/uc?id=17D_BBgSwqb-kwgO9GV0CIplU_DzrQAOe&export=download",
        "080220_R4.png": "https://docs.google.com/uc?id=1DLJulK9BdhstwBgxU365_NBbU0gmRijI&export=download",
        "080112_R4.png": "https://docs.google.com/uc?id=1w8nCNKRRtSXw7VhX8_R-XZoU6eXIrGjz&export=download",
        "080202_R4.png": "https://docs.google.com/uc?id=1iCrT7kOmLeE04oZ8MMYGCpBYPjbOnvqP&export=download",
        "080120_R4.png": "https://docs.google.com/uc?id=14BjbkWZgP-8LCrPeaYs6dPeIMscgQdzt&export=download",
        "080100_R4.png": "https://docs.google.com/uc?id=1GlW3JShAUca_QYyAs1skS0peoANoka1e&export=download",
        "080102_R4.png": "https://docs.google.com/uc?id=1oecaBuPIOxM5PETtp1jSzhgerY-fQZAM&export=download",
        "080022_R4.png": "https://docs.google.com/uc?id=1CwkqSsxzZ_YnpqJMOI9pi9WSVpT0ueeD&export=download",
        "080101_R4.png": "https://docs.google.com/uc?id=1InyUgd04j44rE_8gQfTmtP-5URl5msOY&export=download",
        "080021_R4.png": "https://docs.google.com/uc?id=14Wd7jM9FY_6Y0XZKrPt-mKrlXA7MV4_e&export=download",
        "062222_R4.png": "https://docs.google.com/uc?id=1FpEFwqtlZSfnhDE2S5427q0SqFqvHmIY&export=download",
        "080001_R4.png": "https://docs.google.com/uc?id=1OVtrhdALRZ_F8mBrSXzsQ95cHmCSt0sC&export=download",
        "080002_R4.png": "https://docs.google.com/uc?id=1CCeyggFYyTi0salBL67u0N6lvyykJ_yC&export=download",
        "080110_R4.png": "https://docs.google.com/uc?id=1MzD84FtnVkQhLS69I62evFJJpEwAUyq0&export=download",
        "080012_R4.png": "https://docs.google.com/uc?id=1_jqItnK4-TLRrSdrCTAWcvvjMXUOo8k5&export=download",
        "080011_R4.png": "https://docs.google.com/uc?id=1bYhhhdZISl-JCK1qKn19cm9-xOYvBSsY&export=download",
        "062220_R4.png": "https://docs.google.com/uc?id=1kMG-NgiiGKJR1P6upKcRa0K2DK3SbMyX&export=download",
        "080000_R4.png": "https://docs.google.com/uc?id=1XYEOYqgCZfCYlZxCDuSukV5cHPuf1fap&export=download",
        "062221_R4.png": "https://docs.google.com/uc?id=1z7GW3LjqIu4QVoitryCFGydwLQ4dA_nz&export=download",
        "062210_R4.png": "https://docs.google.com/uc?id=18mcxv3QAYLdYnQj8by7woVW1icgTLTbG&export=download",
        "080020_R4.png": "https://docs.google.com/uc?id=1Ts6orw1VDXZfZyltoVv8I_zl9N_rEhOs&export=download",
        "080010_R4.png": "https://docs.google.com/uc?id=1F9N_4tSfwIYVkONZT4sPKF--y6P_VA29&export=download",
        "062122_R4.png": "https://docs.google.com/uc?id=1ELzWwjHpBw5dZcnanC4hz_MLSQb0daPa&export=download",
        "062212_R4.png": "https://docs.google.com/uc?id=1Zchmys_TBFRVJzCNyQKZHDSp-Z_vJEQ_&export=download",
        "062202_R4.png": "https://docs.google.com/uc?id=1iHVtfvQH1OsPtC7LxAmN8WaYISG59Ifm&export=download",
        "062112_R4.png": "https://docs.google.com/uc?id=1tZ89nEjJBRT6IkcTYSfDGRc8g7roHJQC&export=download",
        "062200_R4.png": "https://docs.google.com/uc?id=1lJ0RqlbHmjEcJJQSK8lFjdKQ8hFhdW-U&export=download",
        "062120_R4.png": "https://docs.google.com/uc?id=1cF4yHvw9AtG2sY4BIeTrlOSrnW6eIE8t&export=download",
        "062121_R4.png": "https://docs.google.com/uc?id=1a_REilqzKbEjMLQayjjeezk-4_oliJmb&export=download",
        "062211_R4.png": "https://docs.google.com/uc?id=1LYk4gMckmnuifEQutW52ugg41L5mAU83&export=download",
        "062111_R4.png": "https://docs.google.com/uc?id=11mPmOuf9--0SqlIgeO5oXAnCx3a_sx9B&export=download",
        "062101_R4.png": "https://docs.google.com/uc?id=1H1CEOURp8NaA3tN4_DvPqEazFPm3c9m2&export=download",
        "062012_R4.png": "https://docs.google.com/uc?id=1OueiwjyrKyMRXjZ2imdaCxNQc3A3RIzc&export=download",
        "062201_R4.png": "https://docs.google.com/uc?id=1fNVR3OcdCCoVyvFRxivTph6lkbqt4sgj&export=download",
        "062020_R4.png": "https://docs.google.com/uc?id=1VfqU_lbVdEs3sg_N3kM1_QcgMwW7EA9y&export=download",
        "062021_R4.png": "https://docs.google.com/uc?id=1f8HcNbSlibck0bQXx9W2Rrzjw51FUWxc&export=download",
        "062102_R4.png": "https://docs.google.com/uc?id=1BYI2io-qDLfbcsFNySgNlNgQE9kCgD5r&export=download",
        "062110_R4.png": "https://docs.google.com/uc?id=1Mwjg3AkuJTVJi_eWOFcy7vngexZ4zkmd&export=download",
        "062011_R4.png": "https://docs.google.com/uc?id=1-DEah9ISg-a4ie6ddnDFXsYmK1AkOfex&export=download",
        "062100_R4.png": "https://docs.google.com/uc?id=1io4NZrgdLf50YZm2QT04HUUjomHe0q7Y&export=download",
        "062022_R4.png": "https://docs.google.com/uc?id=1S4ID0x1MjLYOZ6JWNuKPK-et_BmLiOeV&export=download",
        "062010_R4.png": "https://docs.google.com/uc?id=1c8EPbWyN-ae_KeQn3r5CqI-RKgKsQ46L&export=download",
        "061211_R4.png": "https://docs.google.com/uc?id=1JMsWFDAVswkE12KlWHr7UMmu6iKdnkNr&export=download",
        "061212_R4.png": "https://docs.google.com/uc?id=1R58rr3aRbygOOagJhObpDGYeSfyVzZbZ&export=download",
        "062002_R4.png": "https://docs.google.com/uc?id=1ASoxM-ATsmMMntRbdgTtvjGaLtzNtMV9&export=download",
        "062001_R4.png": "https://docs.google.com/uc?id=1wkTqqs5ApafvxIyrTKNTsR5V_kDzlTqO&export=download",
        "061222_R4.png": "https://docs.google.com/uc?id=15N_x90DIajIxC7ET8yxLDvY4YXs6LKPm&export=download",
        "061221_R4.png": "https://docs.google.com/uc?id=1dBUC9JuYZjTHADAb66IDQo4FnxcnAA2Z&export=download",
        "062000_R4.png": "https://docs.google.com/uc?id=1cwTE1jsyzsjjtVvEzzwAprw05uwc9Y96&export=download",
        "061120_R4.png": "https://docs.google.com/uc?id=1PLCfAL4qnAXueBGX6xIlKsm0kWB_AIux&export=download",
        "061220_R4.png": "https://docs.google.com/uc?id=1sD1AaOG3zHN23htDMr_4LRlpyvlzXh_s&export=download",
        "061112_R4.png": "https://docs.google.com/uc?id=1zgwSAwcLxuqb5HswICgpqhEdRJeo9xD-&export=download",
        "061110_R4.png": "https://docs.google.com/uc?id=1t15xNHJ0CX7R80TQqFBnIJVb4v-ldmtX&export=download",
        "061210_R4.png": "https://docs.google.com/uc?id=1F-3XKThQ-HWZpfWtUQ_-pj3-Tfe0gDNG&export=download",
        "061122_R4.png": "https://docs.google.com/uc?id=19DIw-WPesodLZ-rQcSusWNwfeY_mQOBw&export=download",
        "061102_R4.png": "https://docs.google.com/uc?id=1_Qe9fo76jv4tJNUo9iLc9zMMiSB8kfMZ&export=download",
        "061201_R4.png": "https://docs.google.com/uc?id=1j8ngvkqtPo9-jM-XLsGa72dtzIXCGcX1&export=download",
        "061111_R4.png": "https://docs.google.com/uc?id=170xZNaxQAxRHTb8mCr3SHWudE-oV0lx4&export=download",
        "061200_R4.png": "https://docs.google.com/uc?id=13o1b486TImPjq1gSXqrh1vYstPcXKLlR&export=download",
        "061202_R4.png": "https://docs.google.com/uc?id=1wIGi4fEa5O0HQ72y4h4WvgCvur9ZaPRa&export=download",
        "061121_R4.png": "https://docs.google.com/uc?id=1NU-NtOw9DSLwePYB5TVReIGdSYUrV8wC&export=download",
        "061011_R4.png": "https://docs.google.com/uc?id=1jMtNFku7uHIQwYH2N8LaseYToC8OWDPO&export=download",
        "061001_R4.png": "https://docs.google.com/uc?id=1gbxfbZmL-OtxIrL1_l6Motg8i3fS6s1F&export=download",
        "061012_R4.png": "https://docs.google.com/uc?id=1oGgjPV22T3u9l_sgrnpwzlRfBmQX__lX&export=download",
        "061022_R4.png": "https://docs.google.com/uc?id=10rfwZ3hQ5Jy9cxjkkP_qYgEHxG9alPDA&export=download",
        "061021_R4.png": "https://docs.google.com/uc?id=1802pXZcqleKt93qi-VspNq3Y2RcIWYsT&export=download",
        "061020_R4.png": "https://docs.google.com/uc?id=1T1SPslviiN9fbKAhxQRQijPANP_2un_W&export=download",
        "061101_R4.png": "https://docs.google.com/uc?id=1RTUto8Z374etGlMvjMs_KLnFOOLixLFR&export=download",
        "061010_R4.png": "https://docs.google.com/uc?id=17wQsiKKX6Q5iA9DDiegcTTQwD9qnWdUB&export=download",
        "061002_R4.png": "https://docs.google.com/uc?id=1AEMCioH8m13ecrkxcg4SNUvE1dCctPJ_&export=download",
        "061100_R4.png": "https://docs.google.com/uc?id=1xHzFWtbLlSJLaXhsL2XcQQnM4yfmvqgt&export=download",
        "060212_R4.png": "https://docs.google.com/uc?id=12tlwsmGJDqiZJqBgMW7v7yHPDPetKm6T&export=download",
        "060220_R4.png": "https://docs.google.com/uc?id=1b3fh0aLYRVEKBXOZlgUEf1_oUiyWGWQJ&export=download",
        "060200_R4.png": "https://docs.google.com/uc?id=1943Q77kKwv3Bjh0siQ7xD56pXqRt3q2U&export=download",
        "061000_R4.png": "https://docs.google.com/uc?id=1YEL920W6letr32LkdXko88xaVCUDvsZs&export=download",
        "060210_R4.png": "https://docs.google.com/uc?id=1N6u7eXV4lT45AVKkn9FCJtjf4f9sbL6o&export=download",
        "060201_R4.png": "https://docs.google.com/uc?id=1XTEkU0LWeW7F3m4vhQh1DX_NLn6DlSC1&export=download",
        "060211_R4.png": "https://docs.google.com/uc?id=1Le_5KSEd7aJH11sJT1kOFGajR9e12v20&export=download",
        "060222_R4.png": "https://docs.google.com/uc?id=1t8dqNZWKiFxsgHesZIWQbdNYm0XgFK6Q&export=download",
        "060221_R4.png": "https://docs.google.com/uc?id=12c93FrhxqRFOCADJPbMQqjML3T0yezwS&export=download",
        "060120_R4.png": "https://docs.google.com/uc?id=1MI1o9XyW_3OvMnri8nN_qN_SZA-NtvVO&export=download",
        "060202_R4.png": "https://docs.google.com/uc?id=1PNkbNSBMeQo6c_zP74W-DfXvv6hkMrCW&export=download",
        "060022_R4.png": "https://docs.google.com/uc?id=1ZrqpWvr1puNLRHryLxPfqRQ1JhxgrRdo&export=download",
        "060102_R4.png": "https://docs.google.com/uc?id=1PnCnlnIxl9NmMKhiaid-H77C3nFVrtN9&export=download",
        "060122_R4.png": "https://docs.google.com/uc?id=1mcex2zF6rt4cXtpr4-A5CwChDEpqBPYY&export=download",
        "060110_R4.png": "https://docs.google.com/uc?id=1IsdyDBQkDAVIgv4mSpQD0zR37WCbEYSz&export=download",
        "060121_R4.png": "https://docs.google.com/uc?id=1znw4ILJgN4Ig4EQAneFHxJ627ogpyVDP&export=download",
        "060112_R4.png": "https://docs.google.com/uc?id=1SL1FNk6xiNmVZZoeKasU6y8PmU2vmitI&export=download",
        "060101_R4.png": "https://docs.google.com/uc?id=1e-XDs-jBbOf8s6mal0TRdxg1MgFcdyjw&export=download",
        "060021_R4.png": "https://docs.google.com/uc?id=1DneZehsOFePgBpnzl3tMhA6u12tDfSg_&export=download",
        "060100_R4.png": "https://docs.google.com/uc?id=1NWF7XYmA3CTy2T7zBi8R6RxKFiClbl9w&export=download",
        "060111_R4.png": "https://docs.google.com/uc?id=1stJSGrxe9245fYD2Bs0uEdGB6JjbjHe5&export=download",
        "060000_R4.png": "https://docs.google.com/uc?id=1ZB7Q5G9niuXTB23l_FRzdB0AUMmDN5sE&export=download",
        "042222_R4.png": "https://docs.google.com/uc?id=101ubcY0MFAPEu4KxFAbN6FzoKw8laTQH&export=download",
        "060012_R4.png": "https://docs.google.com/uc?id=1p8kQHJqDrBH0jOxmDgSqagNLASoPDRvr&export=download",
        "060001_R4.png": "https://docs.google.com/uc?id=17XuLvxH2cuVRGzjuw01s7fjlBOQhwKSi&export=download",
        "060011_R4.png": "https://docs.google.com/uc?id=1ynztmZG5w7M32_uASR8XMD4rKDuKqEEO&export=download",
        "060002_R4.png": "https://docs.google.com/uc?id=1ooxtD3tYpXm0ZdOynr484y24Wo468mP3&export=download",
        "060020_R4.png": "https://docs.google.com/uc?id=1nG_WAAbjJuFK8I-IoX5M-0GEqyy0FG2i&export=download",
        "042122_R4.png": "https://docs.google.com/uc?id=1YSnMuTK5cdLbYX33SDWpnnci-_PjRb-2&export=download",
        "060010_R4.png": "https://docs.google.com/uc?id=1YKmecYGGmE0431R79heZcR4RsI79MEPJ&export=download",
        "042221_R4.png": "https://docs.google.com/uc?id=1pyZzVlwqK0naeLL15JGrnYFMgPmdsOH-&export=download",
        "042201_R4.png": "https://docs.google.com/uc?id=19nE5hxQqjO1NWFhcdDziYLu53_PEZDK9&export=download",
        "042200_R4.png": "https://docs.google.com/uc?id=1Wk-7mlZv7GolupOeVEQ342tqh4A4RGi0&export=download",
        "042210_R4.png": "https://docs.google.com/uc?id=1G9Z2cWa_bZo7C00uszc2YBpT3YWxZgLl&export=download",
        "042212_R4.png": "https://docs.google.com/uc?id=198keemT7d1dQ-1oNCEK5OOIbYUvCskY2&export=download",
        "042121_R4.png": "https://docs.google.com/uc?id=10mxP3YGi54m2ZjCNdfM85Gh4DD51rfWR&export=download",
        "042220_R4.png": "https://docs.google.com/uc?id=1NHyXHs6Ig2Qib1ZGDITYuG8qssU_r5QO&export=download",
        "042101_R4.png": "https://docs.google.com/uc?id=1P8DPbOXL9wck-Q3ZkyhBA7K3g71hCaRQ&export=download",
        "042120_R4.png": "https://docs.google.com/uc?id=1TjavY8AOc2gPTcLtQyp1cNAdSyafJ69m&export=download",
        "042211_R4.png": "https://docs.google.com/uc?id=13a11MXReAzTx-xWAzPYQt2waf6sQAhmm&export=download",
        "042202_R4.png": "https://docs.google.com/uc?id=1Ta4fZi28fk8ONwUYA8thKzni444xpmok&export=download",
        "042102_R4.png": "https://docs.google.com/uc?id=1EKCWhIVJ1BLmLNZVnlJyO9VCyfaDExXg&export=download",
        "042110_R4.png": "https://docs.google.com/uc?id=1bsoN--A8UTbIj0pyL-9p-jsTupNUBN-k&export=download",
        "042021_R4.png": "https://docs.google.com/uc?id=1WxQS69QJynqfs_MIQgIRbNLu2-HfYIe0&export=download",
        "042100_R4.png": "https://docs.google.com/uc?id=1-8PEGpSYFYzVRrevI5k101SMi11zk2O-&export=download",
        "042022_R4.png": "https://docs.google.com/uc?id=1LiEHRIvhtckKxFwxoo0q8322newVuV-i&export=download",
        "042020_R4.png": "https://docs.google.com/uc?id=1zS_afTELOG2p1wiNwEB10418DeP8E1Wn&export=download",
        "042112_R4.png": "https://docs.google.com/uc?id=111L1OnAp02DLWCcvebq1OLLQUmQsZeY-&export=download",
        "042111_R4.png": "https://docs.google.com/uc?id=10LyfGkvlb80NUMj-3ejbR9z7NwmKFeRP&export=download",
        "042002_R4.png": "https://docs.google.com/uc?id=1-Mp1JgH8KFPsvrafpfc0kAR7wL-JPcP3&export=download",
        "042012_R4.png": "https://docs.google.com/uc?id=1k8o-FQK8oY3zeCtD58zNIk7_p9m6aiPi&export=download",
        "042010_R4.png": "https://docs.google.com/uc?id=1EbLWNdiqd-tLMBLqecQmLmzn9Vfnsvkg&export=download",
        "042000_R4.png": "https://docs.google.com/uc?id=1t0vjqpd_URhQJTKx_MEih7wRkAr5x-Un&export=download",
        "042001_R4.png": "https://docs.google.com/uc?id=1RbhuozpTYIUXXlICgTDVgZqDIjeFa4uw&export=download",
        "041220_R4.png": "https://docs.google.com/uc?id=1PkdEjzNx0gI5tkzxeFMTnDqbaUWDSknU&export=download",
        "041211_R4.png": "https://docs.google.com/uc?id=17L5evgEctc3TBL6MLYldXiz6RspE_QG9&export=download",
        "041122_R4.png": "https://docs.google.com/uc?id=1Q5ZCRkZdz5Pvf9kUnCqcQOBSR-48aCKe&export=download",
        "041221_R4.png": "https://docs.google.com/uc?id=1OwxC6O4Kknva3Dxiy36nUPEBxoRliEV4&export=download",
        "041212_R4.png": "https://docs.google.com/uc?id=1qzuyE0mN_MbZuk6I9REJ83N9Q7rlBg8m&export=download",
        "041222_R4.png": "https://docs.google.com/uc?id=1pdVcMjGASzhwrixes9ecw-XBmuZj6PSb&export=download",
        "042011_R4.png": "https://docs.google.com/uc?id=1lB9skhSRjB3kulGUPp1Lmv4VaQQQTKD5&export=download",
        "041200_R4.png": "https://docs.google.com/uc?id=1FNOAYEi9ye-pv1-hFDEuoLY2v1PGj1qs&export=download",
        "041111_R4.png": "https://docs.google.com/uc?id=1wdOgZlI9wv7stQ1LBVN44YryqP4gqGNQ&export=download",
        "041121_R4.png": "https://docs.google.com/uc?id=1dXF1MuyKrx5SIoJ0stsCXB7-Z-k59lko&export=download",
        "041112_R4.png": "https://docs.google.com/uc?id=16IBLvjN8PeTtEb_8f-tqgpobzn6tF_Z9&export=download",
        "041210_R4.png": "https://docs.google.com/uc?id=1AszflXCU8Kc8A6SovYH14fHTxAvjQYad&export=download",
        "041120_R4.png": "https://docs.google.com/uc?id=18OAmLy145ZtucJ8zAFS1xVbwatkdKmgU&export=download",
        "041110_R4.png": "https://docs.google.com/uc?id=1komQc52hyyqVYcVzYJukpyX7iQDUeYux&export=download",
        "041010_R4.png": "https://docs.google.com/uc?id=1H4gbsvVmjTs9y3EpMToSbl_yUeI0ZBs5&export=download",
        "041201_R4.png": "https://docs.google.com/uc?id=1jTo-QStK4wSbrtUrLgR7b5UwSDT6s7hG&export=download",
        "041202_R4.png": "https://docs.google.com/uc?id=1K9f5Nm8s5eqmCow4ZV96Q5pZpblLsr0u&export=download",
        "041020_R4.png": "https://docs.google.com/uc?id=1FLnkLkMWJ3o2hBoMRO9Kg4DWVgmM31KL&export=download",
        "041002_R4.png": "https://docs.google.com/uc?id=1dbT7ODSEACvkw3fIaHxikQSkMaoPDRUu&export=download",
        "041102_R4.png": "https://docs.google.com/uc?id=1odpQOICM-huhmapKTDP61A8gArcXu0FN&export=download",
        "041100_R4.png": "https://docs.google.com/uc?id=1qm6AzgMXiBr-NBiSkhKx0tbW_lKgoYci&export=download",
        "041101_R4.png": "https://docs.google.com/uc?id=1EICfM1E12FjIGFzOO0qBz3wA_AucEA6x&export=download",
        "041022_R4.png": "https://docs.google.com/uc?id=1vGb24Fv2Xq8HKDDKB3QRDb-b7PEiuS6R&export=download",
        "041012_R4.png": "https://docs.google.com/uc?id=1Ly4tE2YInxoz-0ROIDI2zSRfWFTjCX4j&export=download",
        "041011_R4.png": "https://docs.google.com/uc?id=1hbLIMsCPFdetYzE6Co40diEzNyaWe24E&export=download",
        "040222_R4.png": "https://docs.google.com/uc?id=1ebZj7H40IvtS8v4BsI0jSnMZNs8cw_Bo&export=download",
        "041021_R4.png": "https://docs.google.com/uc?id=1lMcuAfeRqn_v2OdJ0d27p-jUs7FfPeb7&export=download",
        "040221_R4.png": "https://docs.google.com/uc?id=18hTc2DZpw25zbAfzRa7vJqTckarHwoEP&export=download",
        "041000_R4.png": "https://docs.google.com/uc?id=1yfFgzgUDzJOOmeT-JSvxZGphl1LDgKC-&export=download",
        "040220_R4.png": "https://docs.google.com/uc?id=1n0hKAK2UYMfjd_ns3fw_Ib8FrhY9C2zE&export=download",
        "040201_R4.png": "https://docs.google.com/uc?id=1WKtEsHVK9__ONjkjOsz_DCJSpSbkRXg8&export=download",
        "040211_R4.png": "https://docs.google.com/uc?id=1L1tiSjXkw_s9DdymV3fjIjgHPXJtnN8-&export=download",
        "040212_R4.png": "https://docs.google.com/uc?id=1MO9OIcZVi7ppU0LNFQLYkHnM-2HX4ebx&export=download",
        "040120_R4.png": "https://docs.google.com/uc?id=1Qawpei4Z7q1OZJC9btX-GX4YGbjkLDus&export=download",
        "040210_R4.png": "https://docs.google.com/uc?id=1GYbv9sNAUe8TLSJ5KFwVB0eAgSRvMj3h&export=download",
        "040202_R4.png": "https://docs.google.com/uc?id=1VSoXLkHBBagXDAiK1F-_ZRMph64vMn3I&export=download",
        "041001_R4.png": "https://docs.google.com/uc?id=1DlM7olXuYVoP3_F6iIr-YoOPHZrNmiXd&export=download",
        "040200_R4.png": "https://docs.google.com/uc?id=1jrk-wAVgiAq1-e3tlJRhPSeLyam0Ka7Y&export=download",
        "040110_R4.png": "https://docs.google.com/uc?id=1N1Q_B6Ec8DOthijD9Nxw8eNGyCBiUqfN&export=download",
        "040111_R4.png": "https://docs.google.com/uc?id=1OZo2fwtF-zDgXtNsUjpQx2uTGFRLoWgp&export=download",
        "040112_R4.png": "https://docs.google.com/uc?id=10J2KH6UWfnNh7Tdn2BdC0xQzyHU08iTP&export=download",
        "040122_R4.png": "https://docs.google.com/uc?id=1g5qQZjS-BblwKPwqYFjD1WX_wjjOKOHe&export=download",
        "040121_R4.png": "https://docs.google.com/uc?id=1UbujVHjcXnVdRFLeCmdEf0W0gjW25QvM&export=download",
        "040101_R4.png": "https://docs.google.com/uc?id=1cBm5TpNdv0hNGg563u05McEeoBY_9ZvO&export=download",
        "040001_R4.png": "https://docs.google.com/uc?id=1a3FOkGOFXtG3vxGRqEZ1HhIvZtpSkDQm&export=download",
        "040100_R4.png": "https://docs.google.com/uc?id=159itjsDVuy13ZY_qY2iliEbAt0tyTJ-T&export=download",
        "040102_R4.png": "https://docs.google.com/uc?id=1ZE6du3h98-AROTBOpoGoRzKjEsrzGjvF&export=download",
        "040010_R4.png": "https://docs.google.com/uc?id=17pWmQUMnV2r_i77_EmWMCBDoL4gnHSAX&export=download",
        "040020_R4.png": "https://docs.google.com/uc?id=1TbPciFFBaAEE0pGkb6AAku6kHgpYurys&export=download",
        "040012_R4.png": "https://docs.google.com/uc?id=1xmtnLSiM2JD-d_VtO5uGsIGm8RkyRXNp&export=download",
        "040000_R4.png": "https://docs.google.com/uc?id=1U29Q_wYtOnAQQg4-s7FI-7s4H_TqvOa3&export=download",
        "040011_R4.png": "https://docs.google.com/uc?id=1wXqbIuVq-jSCrPaOkDEOPMco4MAdtt1u&export=download",
        "022201_R4.png": "https://docs.google.com/uc?id=1neq42Xc0AL3ypj_Hve-UA-FTfn7um_Yl&export=download",
        "022200_R4.png": "https://docs.google.com/uc?id=1v_TdYeS0L4BgsKQUV5cMLqzJE2bs2bSb&export=download",
        "022220_R4.png": "https://docs.google.com/uc?id=1r9Ibb0tdS3UUT2At4-dwDLan6JCDqLXU&export=download",
        "022212_R4.png": "https://docs.google.com/uc?id=1zSsw3fxppFIr7Va6ATspM7z1iB6zymiV&export=download",
        "022221_R4.png": "https://docs.google.com/uc?id=1DPeOyefp-8GmvIY2J2dBCiwORF8KYXcd&export=download",
        "040021_R4.png": "https://docs.google.com/uc?id=1LRx8YEpgJ9IpBJeoEmSyau1NehTRce-X&export=download",
        "040002_R4.png": "https://docs.google.com/uc?id=1vEtH1aC2VcKHoTP4cnRujAb5TwsZEEKr&export=download",
        "040022_R4.png": "https://docs.google.com/uc?id=1WNRuKmeMQ11G-WeIn0Jo2ahDP24mol2_&export=download",
        "022222_R4.png": "https://docs.google.com/uc?id=1cDRYQylU8CDl_pOHKjcspFktLUlTZ6Hc&export=download",
        "022210_R4.png": "https://docs.google.com/uc?id=1Xwh4X9w6Zz6HHBeUGx9DT-Fs1vxJt1bl&export=download",
        "022211_R4.png": "https://docs.google.com/uc?id=1wLT24IqD3vvmE4MEOr1TgknrHFidEn_g&export=download",
        "022121_R4.png": "https://docs.google.com/uc?id=1IdjItCK1tA9gHGSP_9BRpwiNRRGnwWdI&export=download",
        "022122_R4.png": "https://docs.google.com/uc?id=1BtzUeEzJDf7XSP9FC9SlDThh2HvXw8CC&export=download",
        "022202_R4.png": "https://docs.google.com/uc?id=1_wSaYXgk_bmDmh2VlA6RWO7WUYdItRZJ&export=download",
        "022110_R4.png": "https://docs.google.com/uc?id=1tGcqlARYx7dHP3GalswNwjH5MKdbDpRA&export=download",
        "022102_R4.png": "https://docs.google.com/uc?id=1KOlDnsSGYYiheQL6XdrY7Ithm82KV91n&export=download",
        "022101_R4.png": "https://docs.google.com/uc?id=19WKRAN1iAGnZ3xm02S5eTFWE-Ok0ccZI&export=download",
        "022021_R4.png": "https://docs.google.com/uc?id=1N9zWWgSbWAD7NS_Hi3H2yVVvY5WYAItE&export=download",
        "022111_R4.png": "https://docs.google.com/uc?id=1F20NF7WKamjRbP-ru-7tYI-1y3ziOyyA&export=download",
        "022120_R4.png": "https://docs.google.com/uc?id=1Le2F8jx7wFz9vSykNkjapBq1gLGs9EM6&export=download",
        "022022_R4.png": "https://docs.google.com/uc?id=1PG4rGnWRS-NgmZHuL2bNPGHFUDk0JytG&export=download",
        "022020_R4.png": "https://docs.google.com/uc?id=1gwEvdX3W0bUrNHFIOuEDn-ye6pRlAWEc&export=download",
        "022112_R4.png": "https://docs.google.com/uc?id=1jaVNN1EsRf_Cwz4sUQnU_IPBiahpG1K4&export=download",
        "022100_R4.png": "https://docs.google.com/uc?id=170t6Nx1UgnvN8QCGbKM5vXyhqk7f7pgP&export=download",
        "021221_R4.png": "https://docs.google.com/uc?id=1Ex3Y7OFkbIW1fWsRxS_o3ItdzmCxYypT&export=download",
        "022010_R4.png": "https://docs.google.com/uc?id=1f87bhqOmfIBDVZRmAboPfPUkFZKuE7XG&export=download",
        "022012_R4.png": "https://docs.google.com/uc?id=1r_IL-KalbN33s4yUMb4yKouZjsIVWqFS&export=download",
        "022002_R4.png": "https://docs.google.com/uc?id=1tq-IsPxH6g8CFBSA0FSXpXEGSV5G0Gvp&export=download",
        "022011_R4.png": "https://docs.google.com/uc?id=1jIR3aSb4kiTu2DkLr_ZWAzhXNmlDVaFM&export=download",
        "022001_R4.png": "https://docs.google.com/uc?id=1DWbQtAq4JN7UdGIE7Tyka2ABEcnDfEjL&export=download",
        "021222_R4.png": "https://docs.google.com/uc?id=1P1_IHODC1s2WbhvrsW7n7Xoo_Iqca79_&export=download",
        "022000_R4.png": "https://docs.google.com/uc?id=1zmP2ryfj2e-SkbUM9MDhFn8UUxihU6H9&export=download",
        "021212_R4.png": "https://docs.google.com/uc?id=1inl6BcVerAFH6VVgIr7kfYuPUwJyvoJZ&export=download",
        "021220_R4.png": "https://docs.google.com/uc?id=1IoIPtexVizBm3IREu8RFHzLLBLnBSOBi&export=download",
        "021200_R4.png": "https://docs.google.com/uc?id=1jxeruIm-HQe41EeD7z379QOwlOeTeDBM&export=download",
        "021210_R4.png": "https://docs.google.com/uc?id=1jGRPNqn96QkfDRH1m0SLZSJX2C0P8j7a&export=download",
        "021121_R4.png": "https://docs.google.com/uc?id=1L_Pr20Rl3tvl_ewXlizCLH1yR3QMyEqX&export=download",
        "021202_R4.png": "https://docs.google.com/uc?id=1n8YR7mVVUJNapMri_u7rawJxXhnrklCC&export=download",
        "021211_R4.png": "https://docs.google.com/uc?id=1oTWbFVG3gNq_rr5kR0mu-VcsBHc-rJNN&export=download",
        "021201_R4.png": "https://docs.google.com/uc?id=1G4CcJBwiQGIqrpAf3uMSz0HYQ54y0pZd&export=download",
        "021112_R4.png": "https://docs.google.com/uc?id=1aJB_5lzIYUpNptw_DkdtG1rPOYvQkYKJ&export=download",
        "021111_R4.png": "https://docs.google.com/uc?id=1nM3M5O0MbLDoXlGHZrIsdQMZpjlLC6S1&export=download",
        "021122_R4.png": "https://docs.google.com/uc?id=1gWZ7HLSeKTsnxDxkA28nex6JG_wAYWUn&export=download",
        "021120_R4.png": "https://docs.google.com/uc?id=1_flxoc3wYLDuz03tK67jLcWIDjaiQHbr&export=download",
        "021022_R4.png": "https://docs.google.com/uc?id=1FKQaZ-gQ5NAdbfFfVd-YXhD7isFFMTN-&export=download",
        "021021_R4.png": "https://docs.google.com/uc?id=1OTe8Z_TwQX3PZ0Hepwy50IjMbE3dH5ZP&export=download",
        "021100_R4.png": "https://docs.google.com/uc?id=1ed0oumZc39I2-2jsCO9bty0xIUG4puA3&export=download",
        "021011_R4.png": "https://docs.google.com/uc?id=19xesHxbxtvu9Wt8qgdJ9_gOuK89nhlOS&export=download",
        "021020_R4.png": "https://docs.google.com/uc?id=1Kdric6UYcPvNlJYLlv7KalP3gLXi78xn&export=download",
        "021010_R4.png": "https://docs.google.com/uc?id=1oGuRkNMAxAOYOjZhUuu3L2480LHCbRXC&export=download",
        "021102_R4.png": "https://docs.google.com/uc?id=1Vf_jSVxbcH9REg4rRm2Sp0cebEbLZnAH&export=download",
        "021110_R4.png": "https://docs.google.com/uc?id=1o6_iLae-ElsyZFHgG2qC9xroVsgos7Za&export=download",
        "021012_R4.png": "https://docs.google.com/uc?id=16BiXWjDA3P4bf_Tumz6CmqKOTHenXpIg&export=download",
        "021101_R4.png": "https://docs.google.com/uc?id=1jMyXqQB3Ei1bt13ftSE3vY081ifZnTiN&export=download",
        "020220_R4.png": "https://docs.google.com/uc?id=1rOQJrSxKIb1ofx7CSh1BxeZHpNDPHEaC&export=download",
        "020212_R4.png": "https://docs.google.com/uc?id=1nK6gfDKqrFNDVxmVq19Kr9ZgXdTqv4hD&export=download",
        "021002_R4.png": "https://docs.google.com/uc?id=12UaBA_UrM-7t_spzVeYrKNIuB3p8k7ne&export=download",
        "020202_R4.png": "https://docs.google.com/uc?id=1b1oUGt8BsC8KDTI0bVgxK5Fo9HOnLrN9&export=download",
        "020221_R4.png": "https://docs.google.com/uc?id=1XWuokC63_UksU3eb_0UFhXqZFtHHX6NZ&export=download",
        "021001_R4.png": "https://docs.google.com/uc?id=1VG2nvgGHC52MFtzYca67l-gR9Uz7ySSB&export=download",
        "020210_R4.png": "https://docs.google.com/uc?id=13DhTsV-z0yJpWgQbZJGKsB2v--XAvPHE&export=download",
        "020222_R4.png": "https://docs.google.com/uc?id=1uXom4VEo83uYRYTeAweivR_a8SRKTBJh&export=download",
        "020211_R4.png": "https://docs.google.com/uc?id=1rW63bJZEHvIQttcwpNvYIvOAE3Q7tC0K&export=download",
        "021000_R4.png": "https://docs.google.com/uc?id=16F-dWmTcRu-2mUnsuddQF1YSR6LOo5Rx&export=download",
        "020112_R4.png": "https://docs.google.com/uc?id=1p1wvKgmIY1E8OIO4uhwcwCw1k5X_pYAL&export=download",
        "020120_R4.png": "https://docs.google.com/uc?id=1PF39fpeXa7I9kTqoMTrfMwJXgPjpwOLC&export=download",
        "020101_R4.png": "https://docs.google.com/uc?id=1Hp3uluo5pjFgPRxvn4Qk1bCOlNE4hW4S&export=download",
        "020110_R4.png": "https://docs.google.com/uc?id=1Xo--T1FBQVzc87OZKViFmqOyTq2BaZww&export=download",
        "020111_R4.png": "https://docs.google.com/uc?id=1pNphPFUglDZV4YKxV6cGTonhnndYVx-B&export=download",
        "020102_R4.png": "https://docs.google.com/uc?id=1c7UZtTk5RU3I0mSls4IoCLzt6Zarrmgm&export=download",
        "020122_R4.png": "https://docs.google.com/uc?id=1gP-cjPuZ6JgpwGqHV16v4qvi2QbF-z5N&export=download",
        "020200_R4.png": "https://docs.google.com/uc?id=1uXgwtyjLIbCxaBQeYxD2cui6KrYkeDFH&export=download",
        "020121_R4.png": "https://docs.google.com/uc?id=1DE7hfN1WfPof7ewONX2TLwL9ECLoDYu0&export=download",
        "020201_R4.png": "https://docs.google.com/uc?id=1iwOZfZ6lwW8xeRJfLJ6YJo8yczWT0xpw&export=download",
        "020002_R4.png": "https://docs.google.com/uc?id=1bIAAiGNAQtsJPJuMO9jGGo5NCRCJnQPl&export=download",
        "020021_R4.png": "https://docs.google.com/uc?id=12CIja2DWcVRgDwcvKClC4kMCkwJ6AQVP&export=download",
        "020010_R4.png": "https://docs.google.com/uc?id=1VtlE0BJa3VnW1yAsCsIzHgkl-oloKP1q&export=download",
        "020012_R4.png": "https://docs.google.com/uc?id=19lhMqzFZ65winC0VbRC-ZfWlNryficQA&export=download",
        "020011_R4.png": "https://docs.google.com/uc?id=1yoQGvCrupQuYoxJpN0VBCJf7R190HEVQ&export=download",
        "020001_R4.png": "https://docs.google.com/uc?id=11s9_mgU4KA_6t7JWQvRumJBjq-Pj-kIJ&export=download",
        "020000_R4.png": "https://docs.google.com/uc?id=1jaSuvgxwz7UJFjuBiDfTLWD-kTSSTmds&export=download",
        "020100_R4.png": "https://docs.google.com/uc?id=175ERRq9C4hvRp8bCM0QC25tSF7tHfZ7h&export=download",
        "020022_R4.png": "https://docs.google.com/uc?id=1jt2l-eJ7lI8PD95D-91nzrn-ioC_qtVQ&export=download",
        "020020_R4.png": "https://docs.google.com/uc?id=1_6FRJTqWNXU3Qx5sbbNmlm4h_Lr_l8eH&export=download"
    },
    "jsonFiles": {},
    "settingFiles": {
        "settings_lite.json": "https://www.googleapis.com/drive/v3/files/10NAtvhE7-MbXSJJprJ_KFY09ZFIgoYsO?alt=media&key=AIzaSyCSrF08UMawxKIb0m4JsA1mYE5NMmP36bY"
    }
}

function getCsvObj(googleObject){
  //read csv file from google drive
  d3.csv(googleObject.csvFiles['data.csv'], function(d){
    _allData = d;
    parseCsv(d);

    //read settings file
    d3.json(googleObject.settingFiles['settings_lite.json'],
      function(d){
        //add settings file to global _settings
        _settings = d;


        console.log('pushed parameters and settings')
        console.log(_settings)
        console.log(_parameters)
        console.log('finished parsing csv')
        buildAll();
      });
  });

}


function parseCsv(data){

    columnNames = d3.keys(data[0]);
    // add csv data to gobal _csvdata

    //get description from settings file


    console.log('Starting parse csv')
    columnNames = d3.keys(_allData[0]);
    console.log(columnNames)
    columnNames.forEach(columnName => {
        columnSets[columnName] = new Set();
    });
    console.log('made new sets')

    data.forEach(row => {
        addRowToSets(row, columnNames);
    });
    console.log('added row to sets')
    calculateMaxOfEachSet();
    console.log('calculated max of sets')
    //console.log(maxSliderRange)

    columnNames.forEach((columnName, colIndex) => {
        var unitSuffix = '';
        var name = '';
        var isEven = colIndex % 2;
        var match = columnRegex.exec(columnName);
        if(match) {

            name = match[2];
            _parameters.push(name);
            columnToNameMap[columnName] = name;

            if(match[1] === 'in'){
                //this is an input column, create a slider and event handler.
                console.log('found in for column:'+columnName);
                makeInputSlider(name, unitSuffix, maxSliderRange[columnName], isEven);
                console.log('made input slider')
                //makeInputSliderEventHandler(name, columnName);
                console.log('made slider event handler');
            } else {
                //this is an output, create a metric div
                console.log('is output column:'+columnName);
                makeOutputDiv(name, unitSuffix);
            }
        } else {
            //must be the 'img' column... or something is wrong.
            //consider throwing error at some other time?
        }
    });

}



function makeInputSlider(name, unitSuffix, max, isEven){
    console.log('making input slider for name: '+name+' with unit suffix: '+unitSuffix);
    /*
    <div class="slider" id="progRatio">
    <label>Lab to NonLab Ratio</label>
    <input type="range" name="prog" id="prog" value="2" min="0" max="2" step = "1">
    <p id="progoutput">60%</p>
    </div>
    */
   //<fieldset id="sliderFields" class="inputgroup">
   var styleString = isEven ? evenSliderBackground : oddSliderBackground;
   $('#sliderFields').append(
    '<div class="slider" id="'+name+'" style="'+styleString+'">'+
    '<label>'+name+'</label>'+
    '<input type="range" name="'+name+'" id="'+name+'" value="0" min="0" max="'+max+'" step = "1">'+
    '<p id="'+name+'output"></p>'+
    '</div>');
}

function makeInputSliderEventHandler(name, columnName){
    /*
    $("#flrA").on("input", function(event) {
        FlrA = $(this).val();
        $("#flroutput").text(fAreaDict[FlrA]);
        updateImg();
        updateEnergy();
    });
    */
   var idName = "#"+name;
   console.log(idName);
   var outPutName = idName + "output"
   $(idName).on("input", function(event){
       var currentValue = $(this).val();
       output[name] = currentValue;
       $(outPutName).text(columnDictionaries[columnName][currentValue])
       updateAll();
   })
}

function makeOutputDiv(name, unitSuffix){
    $("#metrics").append('<div class="slider2" id="'+name+'div"><div id="'+name+'"></div><p style="margin-top:3px;">'+unitSuffix+'<br>'+name+'</p></div>');
};

function calculateMaxOfEachSet(){
    columnDictionaries = {}
    maxSliderRange= {}
    columnNames.forEach(columnName => {
        columnSets[columnName].forEach(columnSet =>{
            columnDictionaries[columnName] = {};
            var key = 0;
            var columnEntriesArray = Array.from(columnSet).sort();
            columnEntriesArray.forEach(arrayEntrySorted => {
                columnDictionaries[columnName][key] = arrayEntrySorted;
                key++;
            });

            maxSliderRange[columnName] = columnEntriesArray.length;
        });
    });
}

function addRowToSets(row){
    columnNames.forEach(columnName => {
        columnSets[columnName].add(row[columnName]); //sets only add new uniques.
    });
};