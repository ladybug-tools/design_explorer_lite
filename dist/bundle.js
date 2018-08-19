/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/DeLite.ts":
/*!***********************!*\
  !*** ./src/DeLite.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class DeLite {
    /**
     *
     */
    constructor(dataObj) {
        this._currentData = {};
        this._deData = dataObj;
        console.log(dataObj);
    }
    buildPage() {
        //TODO: remove all first;
        this.makeInputSliders();
        this.makeImageDivs();
        this.makeChartDivs();
        this.makeOutputDivs();
    }
    updataPage() {
        //TODO: remove first;
        this.makeImageDivs();
        this.makeChartDivs();
        this.makeOutputDivs();
    }
    makeInputSliders() {
    }
    makeImageDivs() {
    }
    makeChartDivs() {
    }
    makeOutputDivs() {
    }
}
exports.DeLite = DeLite;
/**
* This data object contains all formated info for Design Explorer Lite
*/
class DeLiteData {
    constructor() {
        this.inputParamSets = {}; //For makeing sliders;
        this.data = {};
        this.setting = {}; //TODO: define setting obj;
    }
}
exports.DeLiteData = DeLiteData;


/***/ }),

/***/ "./src/GoogleDrObj.ts":
/*!****************************!*\
  !*** ./src/GoogleDrObj.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const d3 = __importStar(__webpack_require__(/*! d3 */ "d3"));
class GoogleDrObj {
    //GFolderInfo:FolderInfo = new FolderInfo();
    /**
     *This class takes care of fetching data from user's Google Drive link.
     Use getFolderInfo(callback()) after constructing this obj.
     */
    constructor(GoogleFolderURL) {
        this._GID = "";
        this._GID = GoogleDrObj.getGFolderID(GoogleFolderURL);
        ;
    }
    getFolderInfo(action) {
        let GID = GoogleDrObj.getGFolderID(this._GID); //0Bz2PwDvkjovJNjhxRkg4WXlNMTA;
        let urlApi = "https://www.googleapis.com/drive/v3/files?q=%27" + GID + "%27+in+parents&key=" + GoogleDrObj._Gkey;
        let tempObj = new FolderInfo();
        let jsonFunc = (url, da) => d3.json(url)
            .then((d) => {
            let obj = GoogleDrObj.makeCleanFolderObj(d);
            $.extend(da.csvFiles, obj.csvFiles);
            $.extend(da.imgFiles, obj.imgFiles);
            $.extend(da.jsonFiles, obj.jsonFiles);
            $.extend(da.settingFiles, obj.settingFiles);
            return d;
        }).then((d) => {
            if (d.nextPageToken !== undefined) {
                if (urlApi.search("&pageToken=") > 0) {
                    urlApi = urlApi.split("&pageToken=", 1)[0];
                }
                urlApi += "&pageToken=" + d.nextPageToken;
                return jsonFunc(urlApi, da);
            }
            else {
                return da;
            }
        });
        jsonFunc(urlApi, tempObj)
            .then((d) => {
            action(d);
            //console.log(d);
        });
    }
    static makeCleanFolderObj(data) {
        let folderObj = new FolderInfo();
        let Gkey = GoogleDrObj._Gkey;
        data.files.forEach(function (item) {
            let GLink = "";
            if (item.mimeType === "text/csv") {
                GLink = "https://www.googleapis.com/drive/v3/files/" + item.id + "?alt=media&key=" + Gkey;
                //this item is a data csv file
                folderObj.csvFiles[item.name] = GLink;
            }
            else if (item.mimeType.startsWith("image")) {
                GLink = "https://docs.google.com/uc?id=" + item.id + "&export=download";
                //this item is a image file
                folderObj.imgFiles[item.name] = GLink;
            }
            else if (item.mimeType === "application/json") {
                GLink = "https://www.googleapis.com/drive/v3/files/" + item.id + "?alt=media&key=" + Gkey;
                if (item.name.startsWith("setting")) {
                    //this item is a Design Explore's setting file
                    folderObj.settingFiles[item.name] = GLink;
                }
                else {
                    //this item is a json model
                    folderObj.jsonFiles[item.name] = GLink;
                }
            }
        });
        //console.log("Got folderObj");
        //console.log(folderObj);
        return folderObj;
    }
    static getGFolderID(URL) {
        let link = URL;
        var linkID;
        if (link.search("google.com") > 0) {
            linkID = link.replace("?usp=sharing", "");
            linkID = linkID.replace("open?id=", "");
            linkID = linkID.split("/");
            linkID = linkID[linkID.length - 1];
        }
        else {
            //server link or ms
            linkID = link;
        }
        return linkID;
    }
}
GoogleDrObj._Gkey = "AIzaSyCSrF08UMawxKIb0m4JsA1mYE5NMmP36bY";
exports.GoogleDrObj = GoogleDrObj;
class FolderInfo {
    constructor() {
        this.csvFiles = {};
        this.imgFiles = {};
        this.jsonFiles = {};
        this.settingFiles = {};
    }
}
exports.FolderInfo = FolderInfo;
;


/***/ }),

/***/ "./src/Parsing.ts":
/*!************************!*\
  !*** ./src/Parsing.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const d3 = __importStar(__webpack_require__(/*! d3 */ "d3"));
const DeLite_1 = __webpack_require__(/*! ./DeLite */ "./src/DeLite.ts");
class Parsing {
    /**
     *This class takes a FolderInfo obj and parses and convert to DeLiteData object,
     and passing DeLiteData to callback drawPageAction;
     */
    constructor(GFolderInfo, drawPageAction) {
        let hasDataCsv = this.checkGFolder(GFolderInfo);
        if (hasDataCsv) {
            Parsing.getCsvObj(GFolderInfo, drawPageAction);
        }
        else {
            alert('No data.csv!');
        }
    }
    checkGFolder(GFolderInfo) {
        let dataCsvFile = GFolderInfo.csvFiles['data.csv'];
        if (dataCsvFile === null) {
            return false;
        }
        else {
            return true;
        }
    }
    static getCsvObj(GFolderInfo, drawPageAction) {
        //read csv file from google drive
        let gFolder = GFolderInfo;
        let dataCsvFile = gFolder.csvFiles['data.csv'];
        let settingFile = gFolder.settingFiles['settings_lite.json'];
        d3.csv(dataCsvFile).then(function (d) {
            let deData = new DeLite_1.DeLiteData();
            //read settings file
            //TODO: check if settingFile is null.
            if (settingFile === null) {
                deData = Parsing.parseDataItems(d, deData);
            }
            else {
                d3.json(settingFile).then(function (settingsJson) {
                    //add settings file to global _settings
                    deData.setting = settingsJson;
                    //_settings = settingsJson; 
                    deData = Parsing.parseDataItems(d, deData);
                    //console.log('pushed parameters and settings')
                    //console.log('finished parsing csv')
                    //buildAll();
                });
            }
            drawPageAction(deData);
        });
    }
    static parseDataItems(data, deLiteData) {
        let columnNames = Object.keys(data[0]);
        let columnRegex = new RegExp(/((?:in)|(?:out)): ?(?:(\w*) ?(?:\[(.*)\])?)/i);
        let parameters = [];
        let deData = deLiteData;
        let columnSets = deData.inputParamSets;
        columnNames.forEach((columnName, colIndex) => {
            let name = '';
            var isEven = colIndex % 2;
            var match = columnRegex.exec(columnName);
            if (match) {
                if (columnName.startsWith('in:')) {
                    columnSets[columnName] = new Set();
                }
                name = match[2];
                parameters.push(name);
                //columnToNameMap[columnName] = name;
            }
        });
        let inputParamNames = Object.keys(columnSets);
        data.forEach(row => {
            var inputStringCombination = "";
            inputParamNames.forEach(columnName => {
                let value = row[columnName];
                columnSets[columnName].add(value); //sets only add new uniques.
                inputStringCombination += value;
            });
            deData.data[inputStringCombination] = row;
        });
        deData.inputParamSets = columnSets;
        return deData;
    }
}
exports.Parsing = Parsing;


/***/ }),

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const GoogleDrObj_1 = __webpack_require__(/*! ./GoogleDrObj */ "./src/GoogleDrObj.ts");
const Parsing_1 = __webpack_require__(/*! ./Parsing */ "./src/Parsing.ts");
let url = "https://drive.google.com/drive/folders/14fhftDFou0htwqsQEg4dwLDm_G7h-PZH";
let g = new GoogleDrObj_1.GoogleDrObj(url);
g.getFolderInfo((d) => {
    console.log("getting data");
    //document.body.innerHTML = JSON.stringify(d);
    console.log(d);
    new Parsing_1.Parsing(d, (deData) => {
        console.log(deData);
        //let deLite = new DeLite(deData);
        //let divSeletion = d3.select('');
        //deLite.buildPage();
    });
});


/***/ }),

/***/ "d3":
/*!*********************!*\
  !*** external "d3" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = d3;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0RlTGl0ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvR29vZ2xlRHJPYmoudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BhcnNpbmcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJkM1wiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0RBQXNEO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDN0dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0Q7QUFDbEQ7QUFDQSxhQUFhO0FBQ2I7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQzdGQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLENBQUM7Ozs7Ozs7Ozs7OztBQ2hCRCxvQiIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9hcHAudHNcIik7XG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jbGFzcyBEZUxpdGUge1xyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihkYXRhT2JqKSB7XHJcbiAgICAgICAgdGhpcy5fY3VycmVudERhdGEgPSB7fTtcclxuICAgICAgICB0aGlzLl9kZURhdGEgPSBkYXRhT2JqO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGFPYmopO1xyXG4gICAgfVxyXG4gICAgYnVpbGRQYWdlKCkge1xyXG4gICAgICAgIC8vVE9ETzogcmVtb3ZlIGFsbCBmaXJzdDtcclxuICAgICAgICB0aGlzLm1ha2VJbnB1dFNsaWRlcnMoKTtcclxuICAgICAgICB0aGlzLm1ha2VJbWFnZURpdnMoKTtcclxuICAgICAgICB0aGlzLm1ha2VDaGFydERpdnMoKTtcclxuICAgICAgICB0aGlzLm1ha2VPdXRwdXREaXZzKCk7XHJcbiAgICB9XHJcbiAgICB1cGRhdGFQYWdlKCkge1xyXG4gICAgICAgIC8vVE9ETzogcmVtb3ZlIGZpcnN0O1xyXG4gICAgICAgIHRoaXMubWFrZUltYWdlRGl2cygpO1xyXG4gICAgICAgIHRoaXMubWFrZUNoYXJ0RGl2cygpO1xyXG4gICAgICAgIHRoaXMubWFrZU91dHB1dERpdnMoKTtcclxuICAgIH1cclxuICAgIG1ha2VJbnB1dFNsaWRlcnMoKSB7XHJcbiAgICB9XHJcbiAgICBtYWtlSW1hZ2VEaXZzKCkge1xyXG4gICAgfVxyXG4gICAgbWFrZUNoYXJ0RGl2cygpIHtcclxuICAgIH1cclxuICAgIG1ha2VPdXRwdXREaXZzKCkge1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuRGVMaXRlID0gRGVMaXRlO1xyXG4vKipcclxuKiBUaGlzIGRhdGEgb2JqZWN0IGNvbnRhaW5zIGFsbCBmb3JtYXRlZCBpbmZvIGZvciBEZXNpZ24gRXhwbG9yZXIgTGl0ZVxyXG4qL1xyXG5jbGFzcyBEZUxpdGVEYXRhIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuaW5wdXRQYXJhbVNldHMgPSB7fTsgLy9Gb3IgbWFrZWluZyBzbGlkZXJzO1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IHt9O1xyXG4gICAgICAgIHRoaXMuc2V0dGluZyA9IHt9OyAvL1RPRE86IGRlZmluZSBzZXR0aW5nIG9iajtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLkRlTGl0ZURhdGEgPSBEZUxpdGVEYXRhO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcclxuICAgIHJlc3VsdFtcImRlZmF1bHRcIl0gPSBtb2Q7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IGQzID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJkM1wiKSk7XHJcbmNsYXNzIEdvb2dsZURyT2JqIHtcclxuICAgIC8vR0ZvbGRlckluZm86Rm9sZGVySW5mbyA9IG5ldyBGb2xkZXJJbmZvKCk7XHJcbiAgICAvKipcclxuICAgICAqVGhpcyBjbGFzcyB0YWtlcyBjYXJlIG9mIGZldGNoaW5nIGRhdGEgZnJvbSB1c2VyJ3MgR29vZ2xlIERyaXZlIGxpbmsuXHJcbiAgICAgVXNlIGdldEZvbGRlckluZm8oY2FsbGJhY2soKSkgYWZ0ZXIgY29uc3RydWN0aW5nIHRoaXMgb2JqLlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihHb29nbGVGb2xkZXJVUkwpIHtcclxuICAgICAgICB0aGlzLl9HSUQgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuX0dJRCA9IEdvb2dsZURyT2JqLmdldEdGb2xkZXJJRChHb29nbGVGb2xkZXJVUkwpO1xyXG4gICAgICAgIDtcclxuICAgIH1cclxuICAgIGdldEZvbGRlckluZm8oYWN0aW9uKSB7XHJcbiAgICAgICAgbGV0IEdJRCA9IEdvb2dsZURyT2JqLmdldEdGb2xkZXJJRCh0aGlzLl9HSUQpOyAvLzBCejJQd0R2a2pvdkpOamh4UmtnNFdYbE5NVEE7XHJcbiAgICAgICAgbGV0IHVybEFwaSA9IFwiaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vZHJpdmUvdjMvZmlsZXM/cT0lMjdcIiArIEdJRCArIFwiJTI3K2luK3BhcmVudHMma2V5PVwiICsgR29vZ2xlRHJPYmouX0drZXk7XHJcbiAgICAgICAgbGV0IHRlbXBPYmogPSBuZXcgRm9sZGVySW5mbygpO1xyXG4gICAgICAgIGxldCBqc29uRnVuYyA9ICh1cmwsIGRhKSA9PiBkMy5qc29uKHVybClcclxuICAgICAgICAgICAgLnRoZW4oKGQpID0+IHtcclxuICAgICAgICAgICAgbGV0IG9iaiA9IEdvb2dsZURyT2JqLm1ha2VDbGVhbkZvbGRlck9iaihkKTtcclxuICAgICAgICAgICAgJC5leHRlbmQoZGEuY3N2RmlsZXMsIG9iai5jc3ZGaWxlcyk7XHJcbiAgICAgICAgICAgICQuZXh0ZW5kKGRhLmltZ0ZpbGVzLCBvYmouaW1nRmlsZXMpO1xyXG4gICAgICAgICAgICAkLmV4dGVuZChkYS5qc29uRmlsZXMsIG9iai5qc29uRmlsZXMpO1xyXG4gICAgICAgICAgICAkLmV4dGVuZChkYS5zZXR0aW5nRmlsZXMsIG9iai5zZXR0aW5nRmlsZXMpO1xyXG4gICAgICAgICAgICByZXR1cm4gZDtcclxuICAgICAgICB9KS50aGVuKChkKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkLm5leHRQYWdlVG9rZW4gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHVybEFwaS5zZWFyY2goXCImcGFnZVRva2VuPVwiKSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB1cmxBcGkgPSB1cmxBcGkuc3BsaXQoXCImcGFnZVRva2VuPVwiLCAxKVswXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHVybEFwaSArPSBcIiZwYWdlVG9rZW49XCIgKyBkLm5leHRQYWdlVG9rZW47XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ganNvbkZ1bmModXJsQXBpLCBkYSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBqc29uRnVuYyh1cmxBcGksIHRlbXBPYmopXHJcbiAgICAgICAgICAgIC50aGVuKChkKSA9PiB7XHJcbiAgICAgICAgICAgIGFjdGlvbihkKTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhkKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBtYWtlQ2xlYW5Gb2xkZXJPYmooZGF0YSkge1xyXG4gICAgICAgIGxldCBmb2xkZXJPYmogPSBuZXcgRm9sZGVySW5mbygpO1xyXG4gICAgICAgIGxldCBHa2V5ID0gR29vZ2xlRHJPYmouX0drZXk7XHJcbiAgICAgICAgZGF0YS5maWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgIGxldCBHTGluayA9IFwiXCI7XHJcbiAgICAgICAgICAgIGlmIChpdGVtLm1pbWVUeXBlID09PSBcInRleHQvY3N2XCIpIHtcclxuICAgICAgICAgICAgICAgIEdMaW5rID0gXCJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9kcml2ZS92My9maWxlcy9cIiArIGl0ZW0uaWQgKyBcIj9hbHQ9bWVkaWEma2V5PVwiICsgR2tleTtcclxuICAgICAgICAgICAgICAgIC8vdGhpcyBpdGVtIGlzIGEgZGF0YSBjc3YgZmlsZVxyXG4gICAgICAgICAgICAgICAgZm9sZGVyT2JqLmNzdkZpbGVzW2l0ZW0ubmFtZV0gPSBHTGluaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChpdGVtLm1pbWVUeXBlLnN0YXJ0c1dpdGgoXCJpbWFnZVwiKSkge1xyXG4gICAgICAgICAgICAgICAgR0xpbmsgPSBcImh0dHBzOi8vZG9jcy5nb29nbGUuY29tL3VjP2lkPVwiICsgaXRlbS5pZCArIFwiJmV4cG9ydD1kb3dubG9hZFwiO1xyXG4gICAgICAgICAgICAgICAgLy90aGlzIGl0ZW0gaXMgYSBpbWFnZSBmaWxlXHJcbiAgICAgICAgICAgICAgICBmb2xkZXJPYmouaW1nRmlsZXNbaXRlbS5uYW1lXSA9IEdMaW5rO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGl0ZW0ubWltZVR5cGUgPT09IFwiYXBwbGljYXRpb24vanNvblwiKSB7XHJcbiAgICAgICAgICAgICAgICBHTGluayA9IFwiaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vZHJpdmUvdjMvZmlsZXMvXCIgKyBpdGVtLmlkICsgXCI/YWx0PW1lZGlhJmtleT1cIiArIEdrZXk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5uYW1lLnN0YXJ0c1dpdGgoXCJzZXR0aW5nXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzIGl0ZW0gaXMgYSBEZXNpZ24gRXhwbG9yZSdzIHNldHRpbmcgZmlsZVxyXG4gICAgICAgICAgICAgICAgICAgIGZvbGRlck9iai5zZXR0aW5nRmlsZXNbaXRlbS5uYW1lXSA9IEdMaW5rO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzIGl0ZW0gaXMgYSBqc29uIG1vZGVsXHJcbiAgICAgICAgICAgICAgICAgICAgZm9sZGVyT2JqLmpzb25GaWxlc1tpdGVtLm5hbWVdID0gR0xpbms7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiR290IGZvbGRlck9ialwiKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKGZvbGRlck9iaik7XHJcbiAgICAgICAgcmV0dXJuIGZvbGRlck9iajtcclxuICAgIH1cclxuICAgIHN0YXRpYyBnZXRHRm9sZGVySUQoVVJMKSB7XHJcbiAgICAgICAgbGV0IGxpbmsgPSBVUkw7XHJcbiAgICAgICAgdmFyIGxpbmtJRDtcclxuICAgICAgICBpZiAobGluay5zZWFyY2goXCJnb29nbGUuY29tXCIpID4gMCkge1xyXG4gICAgICAgICAgICBsaW5rSUQgPSBsaW5rLnJlcGxhY2UoXCI/dXNwPXNoYXJpbmdcIiwgXCJcIik7XHJcbiAgICAgICAgICAgIGxpbmtJRCA9IGxpbmtJRC5yZXBsYWNlKFwib3Blbj9pZD1cIiwgXCJcIik7XHJcbiAgICAgICAgICAgIGxpbmtJRCA9IGxpbmtJRC5zcGxpdChcIi9cIik7XHJcbiAgICAgICAgICAgIGxpbmtJRCA9IGxpbmtJRFtsaW5rSUQubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvL3NlcnZlciBsaW5rIG9yIG1zXHJcbiAgICAgICAgICAgIGxpbmtJRCA9IGxpbms7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBsaW5rSUQ7XHJcbiAgICB9XHJcbn1cclxuR29vZ2xlRHJPYmouX0drZXkgPSBcIkFJemFTeUNTckYwOFVNYXd4S0liMG00SnNBMW1ZRTVOTW1QMzZiWVwiO1xyXG5leHBvcnRzLkdvb2dsZURyT2JqID0gR29vZ2xlRHJPYmo7XHJcbmNsYXNzIEZvbGRlckluZm8ge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5jc3ZGaWxlcyA9IHt9O1xyXG4gICAgICAgIHRoaXMuaW1nRmlsZXMgPSB7fTtcclxuICAgICAgICB0aGlzLmpzb25GaWxlcyA9IHt9O1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ0ZpbGVzID0ge307XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5Gb2xkZXJJbmZvID0gRm9sZGVySW5mbztcclxuO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcclxuICAgIHJlc3VsdFtcImRlZmF1bHRcIl0gPSBtb2Q7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IGQzID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJkM1wiKSk7XHJcbmNvbnN0IERlTGl0ZV8xID0gcmVxdWlyZShcIi4vRGVMaXRlXCIpO1xyXG5jbGFzcyBQYXJzaW5nIHtcclxuICAgIC8qKlxyXG4gICAgICpUaGlzIGNsYXNzIHRha2VzIGEgRm9sZGVySW5mbyBvYmogYW5kIHBhcnNlcyBhbmQgY29udmVydCB0byBEZUxpdGVEYXRhIG9iamVjdCxcclxuICAgICBhbmQgcGFzc2luZyBEZUxpdGVEYXRhIHRvIGNhbGxiYWNrIGRyYXdQYWdlQWN0aW9uO1xyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihHRm9sZGVySW5mbywgZHJhd1BhZ2VBY3Rpb24pIHtcclxuICAgICAgICBsZXQgaGFzRGF0YUNzdiA9IHRoaXMuY2hlY2tHRm9sZGVyKEdGb2xkZXJJbmZvKTtcclxuICAgICAgICBpZiAoaGFzRGF0YUNzdikge1xyXG4gICAgICAgICAgICBQYXJzaW5nLmdldENzdk9iaihHRm9sZGVySW5mbywgZHJhd1BhZ2VBY3Rpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgYWxlcnQoJ05vIGRhdGEuY3N2IScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNoZWNrR0ZvbGRlcihHRm9sZGVySW5mbykge1xyXG4gICAgICAgIGxldCBkYXRhQ3N2RmlsZSA9IEdGb2xkZXJJbmZvLmNzdkZpbGVzWydkYXRhLmNzdiddO1xyXG4gICAgICAgIGlmIChkYXRhQ3N2RmlsZSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgZ2V0Q3N2T2JqKEdGb2xkZXJJbmZvLCBkcmF3UGFnZUFjdGlvbikge1xyXG4gICAgICAgIC8vcmVhZCBjc3YgZmlsZSBmcm9tIGdvb2dsZSBkcml2ZVxyXG4gICAgICAgIGxldCBnRm9sZGVyID0gR0ZvbGRlckluZm87XHJcbiAgICAgICAgbGV0IGRhdGFDc3ZGaWxlID0gZ0ZvbGRlci5jc3ZGaWxlc1snZGF0YS5jc3YnXTtcclxuICAgICAgICBsZXQgc2V0dGluZ0ZpbGUgPSBnRm9sZGVyLnNldHRpbmdGaWxlc1snc2V0dGluZ3NfbGl0ZS5qc29uJ107XHJcbiAgICAgICAgZDMuY3N2KGRhdGFDc3ZGaWxlKS50aGVuKGZ1bmN0aW9uIChkKSB7XHJcbiAgICAgICAgICAgIGxldCBkZURhdGEgPSBuZXcgRGVMaXRlXzEuRGVMaXRlRGF0YSgpO1xyXG4gICAgICAgICAgICAvL3JlYWQgc2V0dGluZ3MgZmlsZVxyXG4gICAgICAgICAgICAvL1RPRE86IGNoZWNrIGlmIHNldHRpbmdGaWxlIGlzIG51bGwuXHJcbiAgICAgICAgICAgIGlmIChzZXR0aW5nRmlsZSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgZGVEYXRhID0gUGFyc2luZy5wYXJzZURhdGFJdGVtcyhkLCBkZURhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZDMuanNvbihzZXR0aW5nRmlsZSkudGhlbihmdW5jdGlvbiAoc2V0dGluZ3NKc29uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9hZGQgc2V0dGluZ3MgZmlsZSB0byBnbG9iYWwgX3NldHRpbmdzXHJcbiAgICAgICAgICAgICAgICAgICAgZGVEYXRhLnNldHRpbmcgPSBzZXR0aW5nc0pzb247XHJcbiAgICAgICAgICAgICAgICAgICAgLy9fc2V0dGluZ3MgPSBzZXR0aW5nc0pzb247IFxyXG4gICAgICAgICAgICAgICAgICAgIGRlRGF0YSA9IFBhcnNpbmcucGFyc2VEYXRhSXRlbXMoZCwgZGVEYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdwdXNoZWQgcGFyYW1ldGVycyBhbmQgc2V0dGluZ3MnKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2ZpbmlzaGVkIHBhcnNpbmcgY3N2JylcclxuICAgICAgICAgICAgICAgICAgICAvL2J1aWxkQWxsKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkcmF3UGFnZUFjdGlvbihkZURhdGEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIHBhcnNlRGF0YUl0ZW1zKGRhdGEsIGRlTGl0ZURhdGEpIHtcclxuICAgICAgICBsZXQgY29sdW1uTmFtZXMgPSBPYmplY3Qua2V5cyhkYXRhWzBdKTtcclxuICAgICAgICBsZXQgY29sdW1uUmVnZXggPSBuZXcgUmVnRXhwKC8oKD86aW4pfCg/Om91dCkpOiA/KD86KFxcdyopID8oPzpcXFsoLiopXFxdKT8pL2kpO1xyXG4gICAgICAgIGxldCBwYXJhbWV0ZXJzID0gW107XHJcbiAgICAgICAgbGV0IGRlRGF0YSA9IGRlTGl0ZURhdGE7XHJcbiAgICAgICAgbGV0IGNvbHVtblNldHMgPSBkZURhdGEuaW5wdXRQYXJhbVNldHM7XHJcbiAgICAgICAgY29sdW1uTmFtZXMuZm9yRWFjaCgoY29sdW1uTmFtZSwgY29sSW5kZXgpID0+IHtcclxuICAgICAgICAgICAgbGV0IG5hbWUgPSAnJztcclxuICAgICAgICAgICAgdmFyIGlzRXZlbiA9IGNvbEluZGV4ICUgMjtcclxuICAgICAgICAgICAgdmFyIG1hdGNoID0gY29sdW1uUmVnZXguZXhlYyhjb2x1bW5OYW1lKTtcclxuICAgICAgICAgICAgaWYgKG1hdGNoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29sdW1uTmFtZS5zdGFydHNXaXRoKCdpbjonKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtblNldHNbY29sdW1uTmFtZV0gPSBuZXcgU2V0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBuYW1lID0gbWF0Y2hbMl07XHJcbiAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzLnB1c2gobmFtZSk7XHJcbiAgICAgICAgICAgICAgICAvL2NvbHVtblRvTmFtZU1hcFtjb2x1bW5OYW1lXSA9IG5hbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBsZXQgaW5wdXRQYXJhbU5hbWVzID0gT2JqZWN0LmtleXMoY29sdW1uU2V0cyk7XHJcbiAgICAgICAgZGF0YS5mb3JFYWNoKHJvdyA9PiB7XHJcbiAgICAgICAgICAgIHZhciBpbnB1dFN0cmluZ0NvbWJpbmF0aW9uID0gXCJcIjtcclxuICAgICAgICAgICAgaW5wdXRQYXJhbU5hbWVzLmZvckVhY2goY29sdW1uTmFtZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSByb3dbY29sdW1uTmFtZV07XHJcbiAgICAgICAgICAgICAgICBjb2x1bW5TZXRzW2NvbHVtbk5hbWVdLmFkZCh2YWx1ZSk7IC8vc2V0cyBvbmx5IGFkZCBuZXcgdW5pcXVlcy5cclxuICAgICAgICAgICAgICAgIGlucHV0U3RyaW5nQ29tYmluYXRpb24gKz0gdmFsdWU7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBkZURhdGEuZGF0YVtpbnB1dFN0cmluZ0NvbWJpbmF0aW9uXSA9IHJvdztcclxuICAgICAgICB9KTtcclxuICAgICAgICBkZURhdGEuaW5wdXRQYXJhbVNldHMgPSBjb2x1bW5TZXRzO1xyXG4gICAgICAgIHJldHVybiBkZURhdGE7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5QYXJzaW5nID0gUGFyc2luZztcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgR29vZ2xlRHJPYmpfMSA9IHJlcXVpcmUoXCIuL0dvb2dsZURyT2JqXCIpO1xyXG5jb25zdCBQYXJzaW5nXzEgPSByZXF1aXJlKFwiLi9QYXJzaW5nXCIpO1xyXG5sZXQgdXJsID0gXCJodHRwczovL2RyaXZlLmdvb2dsZS5jb20vZHJpdmUvZm9sZGVycy8xNGZoZnRERm91MGh0d3FzUUVnNGR3TERtX0c3aC1QWkhcIjtcclxubGV0IGcgPSBuZXcgR29vZ2xlRHJPYmpfMS5Hb29nbGVEck9iaih1cmwpO1xyXG5nLmdldEZvbGRlckluZm8oKGQpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKFwiZ2V0dGluZyBkYXRhXCIpO1xyXG4gICAgLy9kb2N1bWVudC5ib2R5LmlubmVySFRNTCA9IEpTT04uc3RyaW5naWZ5KGQpO1xyXG4gICAgY29uc29sZS5sb2coZCk7XHJcbiAgICBuZXcgUGFyc2luZ18xLlBhcnNpbmcoZCwgKGRlRGF0YSkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGRlRGF0YSk7XHJcbiAgICAgICAgLy9sZXQgZGVMaXRlID0gbmV3IERlTGl0ZShkZURhdGEpO1xyXG4gICAgICAgIC8vbGV0IGRpdlNlbGV0aW9uID0gZDMuc2VsZWN0KCcnKTtcclxuICAgICAgICAvL2RlTGl0ZS5idWlsZFBhZ2UoKTtcclxuICAgIH0pO1xyXG59KTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSBkMzsiXSwic291cmNlUm9vdCI6IiJ9