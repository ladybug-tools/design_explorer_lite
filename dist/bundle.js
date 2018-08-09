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
var d3 = __importStar(__webpack_require__(/*! d3 */ "d3"));
var GoogleDrObj = /** @class */ (function () {
    /**
     *
     */
    function GoogleDrObj(GoogleFolderURL) {
        var _this = this;
        this.GFolderInfo = new FolderInfo();
        //TODO: check URL
        var url = GoogleFolderURL;
        this.getFolderInfo(url).then(function (d) {
            _this.GFolderInfo = d;
            //console.log(this.GFolderInfo);
        });
    }
    GoogleDrObj.prototype.getFolderInfo = function (URL) {
        var selfObj = this;
        var Gkey = GoogleDrObj._Gkey;
        var gFolderInfo = selfObj.GFolderInfo;
        var selfFunc = selfObj.getFolderInfo;
        var url = URL; //https://drive.google.com/drive/folders/0Bz2PwDvkjovJNjhxRkg4WXlNMTA;
        var GID = GoogleDrObj.getGFolderID(url); //0Bz2PwDvkjovJNjhxRkg4WXlNMTA;
        var urlApi = "https://www.googleapis.com/drive/v3/files?q=%27" + GID + "%27+in+parents&key=" + Gkey;
        if (url.search("&pageToken=") > 0) {
            urlApi = url;
            console.log("the second page");
        }
        var tempObj = {};
        var jsonFunc = function (url) { return d3.json(url)
            .then(function (d) {
            var obj = GoogleDrObj.makeCleanFolderObj(d);
            //$.extend( selfObj.GFolderInfo,obj);
            //tempObj = obj;
            console.log(obj);
            return d;
        }).then(function (data) {
            if (data.nextPageToken !== undefined) {
                if (urlApi.search("&pageToken=") > 0) {
                    urlApi = urlApi.split("&pageToken=", 1)[0];
                }
                urlApi += "&pageToken=" + data.nextPageToken;
                console.log("Loading the next page");
                console.log(urlApi);
                jsonFunc(urlApi);
                // selfObj.getFolderInfo(urlApi).then(
                //     (d)=>{
                //         console.log(d);
                //     }
                // );
            }
            else if (data["children@odata.nextLink"] !== undefined) {
                urlApi = data["children@odata.nextLink"];
                jsonFunc(urlApi);
                //selfObj.getFolderInfo(urlApi);
            }
            else if (data["@odata.nextLink"] !== undefined) {
                urlApi = data["odata.nextLink"];
                jsonFunc(urlApi);
                //selfObj.getFolderInfo(urlApi);
            }
            // else { 
            //     //this is the last page, so return googleReturnObj directly
            //     var csvFile = _googleReturnObj.csvFiles["data.csv"];
            //     if (csvFile === undefined) {
            //         alert("Could not find the data.csv file in this folder, please double check!\n\rThis might because Google Drive is processing the newly uploaded files, please wait a couple minutes!");
            //     } else {
            //         //readyToLoad(csvFile);
            //         //console.log(_googleReturnObj);
            //         getCsvObj(_googleReturnObj);
            //         //window.prompt only if user input data, not from URL
            //         if (document.getElementById("folderLink").value) {
            //             showStillLink();
            //         }
            //     }
            // }
            //return gFolderInfo;
        }); };
        var prom = jsonFunc(urlApi);
        return prom;
    };
    GoogleDrObj.makeCleanFolderObj = function (data) {
        var folderObj = new FolderInfo();
        var Gkey = GoogleDrObj._Gkey;
        // let csvFiles = {};
        // let imgFiles ={};
        // let jsonFiles ={};
        // let settingFiles ={};
        data.files.forEach(function (item) {
            var GLink = "";
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
        console.log("Got folderObj");
        console.log(folderObj);
        return folderObj;
        // $.extend(selfObj.GFolderInfo.csvFiles, csvFiles);
        // $.extend(selfObj.GFolderInfo.imgFiles, imgFiles);
        // $.extend(selfObj.GFolderInfo.jsonFiles, jsonFiles);
        // $.extend(selfObj.GFolderInfo.settingFiles, settingFiles);
    };
    GoogleDrObj.getGFolderID = function (URL) {
        var link = URL;
        var linkID;
        if (link.search("google.com") > 0) {
            // if (link.search("?usp=sharing")>0) {
            //     linkID = link.replace("?usp=sharing", "");
            // } else if (link.search("open?id=")) {
            //     linkID = link.replace("open?id=", "");
            // } else {
            //     linkID = link;
            // }
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
    };
    GoogleDrObj._Gkey = "AIzaSyCSrF08UMawxKIb0m4JsA1mYE5NMmP36bY";
    return GoogleDrObj;
}());
exports.GoogleDrObj = GoogleDrObj;
var FolderInfo = /** @class */ (function () {
    function FolderInfo() {
        this.csvFiles = {};
        this.imgFiles = {};
        this.jsonFiles = {};
        this.settingFiles = {};
    }
    return FolderInfo;
}());
;


/***/ }),

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GoogleDrObj_1 = __webpack_require__(/*! ./GoogleDrObj */ "./src/GoogleDrObj.ts");
var url = "https://drive.google.com/drive/folders/0Bz2PwDvkjovJNjhxRkg4WXlNMTA";
var g = new GoogleDrObj_1.GoogleDrObj(url);
//document.body.innerHTML = greeter(user);


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0dvb2dsZURyT2JqLnRzIiwid2VicGFjazovLy8uL3NyYy9hcHAudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZDNcIiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEIsZ0RBQWdEO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsRUFBRTtBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7QUNuS0E7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDTEEsb0IiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvYXBwLnRzXCIpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2ltcG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0U3RhcikgfHwgZnVuY3Rpb24gKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHRbXCJkZWZhdWx0XCJdID0gbW9kO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgZDMgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcImQzXCIpKTtcclxudmFyIEdvb2dsZURyT2JqID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBHb29nbGVEck9iaihHb29nbGVGb2xkZXJVUkwpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuR0ZvbGRlckluZm8gPSBuZXcgRm9sZGVySW5mbygpO1xyXG4gICAgICAgIC8vVE9ETzogY2hlY2sgVVJMXHJcbiAgICAgICAgdmFyIHVybCA9IEdvb2dsZUZvbGRlclVSTDtcclxuICAgICAgICB0aGlzLmdldEZvbGRlckluZm8odXJsKS50aGVuKGZ1bmN0aW9uIChkKSB7XHJcbiAgICAgICAgICAgIF90aGlzLkdGb2xkZXJJbmZvID0gZDtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLkdGb2xkZXJJbmZvKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIEdvb2dsZURyT2JqLnByb3RvdHlwZS5nZXRGb2xkZXJJbmZvID0gZnVuY3Rpb24gKFVSTCkge1xyXG4gICAgICAgIHZhciBzZWxmT2JqID0gdGhpcztcclxuICAgICAgICB2YXIgR2tleSA9IEdvb2dsZURyT2JqLl9Ha2V5O1xyXG4gICAgICAgIHZhciBnRm9sZGVySW5mbyA9IHNlbGZPYmouR0ZvbGRlckluZm87XHJcbiAgICAgICAgdmFyIHNlbGZGdW5jID0gc2VsZk9iai5nZXRGb2xkZXJJbmZvO1xyXG4gICAgICAgIHZhciB1cmwgPSBVUkw7IC8vaHR0cHM6Ly9kcml2ZS5nb29nbGUuY29tL2RyaXZlL2ZvbGRlcnMvMEJ6MlB3RHZram92Sk5qaHhSa2c0V1hsTk1UQTtcclxuICAgICAgICB2YXIgR0lEID0gR29vZ2xlRHJPYmouZ2V0R0ZvbGRlcklEKHVybCk7IC8vMEJ6MlB3RHZram92Sk5qaHhSa2c0V1hsTk1UQTtcclxuICAgICAgICB2YXIgdXJsQXBpID0gXCJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9kcml2ZS92My9maWxlcz9xPSUyN1wiICsgR0lEICsgXCIlMjcraW4rcGFyZW50cyZrZXk9XCIgKyBHa2V5O1xyXG4gICAgICAgIGlmICh1cmwuc2VhcmNoKFwiJnBhZ2VUb2tlbj1cIikgPiAwKSB7XHJcbiAgICAgICAgICAgIHVybEFwaSA9IHVybDtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0aGUgc2Vjb25kIHBhZ2VcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciB0ZW1wT2JqID0ge307XHJcbiAgICAgICAgdmFyIGpzb25GdW5jID0gZnVuY3Rpb24gKHVybCkgeyByZXR1cm4gZDMuanNvbih1cmwpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkKSB7XHJcbiAgICAgICAgICAgIHZhciBvYmogPSBHb29nbGVEck9iai5tYWtlQ2xlYW5Gb2xkZXJPYmooZCk7XHJcbiAgICAgICAgICAgIC8vJC5leHRlbmQoIHNlbGZPYmouR0ZvbGRlckluZm8sb2JqKTtcclxuICAgICAgICAgICAgLy90ZW1wT2JqID0gb2JqO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhvYmopO1xyXG4gICAgICAgICAgICByZXR1cm4gZDtcclxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLm5leHRQYWdlVG9rZW4gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHVybEFwaS5zZWFyY2goXCImcGFnZVRva2VuPVwiKSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB1cmxBcGkgPSB1cmxBcGkuc3BsaXQoXCImcGFnZVRva2VuPVwiLCAxKVswXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHVybEFwaSArPSBcIiZwYWdlVG9rZW49XCIgKyBkYXRhLm5leHRQYWdlVG9rZW47XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkxvYWRpbmcgdGhlIG5leHQgcGFnZVwiKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHVybEFwaSk7XHJcbiAgICAgICAgICAgICAgICBqc29uRnVuYyh1cmxBcGkpO1xyXG4gICAgICAgICAgICAgICAgLy8gc2VsZk9iai5nZXRGb2xkZXJJbmZvKHVybEFwaSkudGhlbihcclxuICAgICAgICAgICAgICAgIC8vICAgICAoZCk9PntcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coZCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChkYXRhW1wiY2hpbGRyZW5Ab2RhdGEubmV4dExpbmtcIl0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdXJsQXBpID0gZGF0YVtcImNoaWxkcmVuQG9kYXRhLm5leHRMaW5rXCJdO1xyXG4gICAgICAgICAgICAgICAganNvbkZ1bmModXJsQXBpKTtcclxuICAgICAgICAgICAgICAgIC8vc2VsZk9iai5nZXRGb2xkZXJJbmZvKHVybEFwaSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoZGF0YVtcIkBvZGF0YS5uZXh0TGlua1wiXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB1cmxBcGkgPSBkYXRhW1wib2RhdGEubmV4dExpbmtcIl07XHJcbiAgICAgICAgICAgICAgICBqc29uRnVuYyh1cmxBcGkpO1xyXG4gICAgICAgICAgICAgICAgLy9zZWxmT2JqLmdldEZvbGRlckluZm8odXJsQXBpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBlbHNlIHsgXHJcbiAgICAgICAgICAgIC8vICAgICAvL3RoaXMgaXMgdGhlIGxhc3QgcGFnZSwgc28gcmV0dXJuIGdvb2dsZVJldHVybk9iaiBkaXJlY3RseVxyXG4gICAgICAgICAgICAvLyAgICAgdmFyIGNzdkZpbGUgPSBfZ29vZ2xlUmV0dXJuT2JqLmNzdkZpbGVzW1wiZGF0YS5jc3ZcIl07XHJcbiAgICAgICAgICAgIC8vICAgICBpZiAoY3N2RmlsZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgYWxlcnQoXCJDb3VsZCBub3QgZmluZCB0aGUgZGF0YS5jc3YgZmlsZSBpbiB0aGlzIGZvbGRlciwgcGxlYXNlIGRvdWJsZSBjaGVjayFcXG5cXHJUaGlzIG1pZ2h0IGJlY2F1c2UgR29vZ2xlIERyaXZlIGlzIHByb2Nlc3NpbmcgdGhlIG5ld2x5IHVwbG9hZGVkIGZpbGVzLCBwbGVhc2Ugd2FpdCBhIGNvdXBsZSBtaW51dGVzIVwiKTtcclxuICAgICAgICAgICAgLy8gICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgLy9yZWFkeVRvTG9hZChjc3ZGaWxlKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAvL2NvbnNvbGUubG9nKF9nb29nbGVSZXR1cm5PYmopO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIGdldENzdk9iaihfZ29vZ2xlUmV0dXJuT2JqKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAvL3dpbmRvdy5wcm9tcHQgb25seSBpZiB1c2VyIGlucHV0IGRhdGEsIG5vdCBmcm9tIFVSTFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZvbGRlckxpbmtcIikudmFsdWUpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgc2hvd1N0aWxsTGluaygpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAvL3JldHVybiBnRm9sZGVySW5mbztcclxuICAgICAgICB9KTsgfTtcclxuICAgICAgICB2YXIgcHJvbSA9IGpzb25GdW5jKHVybEFwaSk7XHJcbiAgICAgICAgcmV0dXJuIHByb207XHJcbiAgICB9O1xyXG4gICAgR29vZ2xlRHJPYmoubWFrZUNsZWFuRm9sZGVyT2JqID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICB2YXIgZm9sZGVyT2JqID0gbmV3IEZvbGRlckluZm8oKTtcclxuICAgICAgICB2YXIgR2tleSA9IEdvb2dsZURyT2JqLl9Ha2V5O1xyXG4gICAgICAgIC8vIGxldCBjc3ZGaWxlcyA9IHt9O1xyXG4gICAgICAgIC8vIGxldCBpbWdGaWxlcyA9e307XHJcbiAgICAgICAgLy8gbGV0IGpzb25GaWxlcyA9e307XHJcbiAgICAgICAgLy8gbGV0IHNldHRpbmdGaWxlcyA9e307XHJcbiAgICAgICAgZGF0YS5maWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgIHZhciBHTGluayA9IFwiXCI7XHJcbiAgICAgICAgICAgIGlmIChpdGVtLm1pbWVUeXBlID09PSBcInRleHQvY3N2XCIpIHtcclxuICAgICAgICAgICAgICAgIEdMaW5rID0gXCJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9kcml2ZS92My9maWxlcy9cIiArIGl0ZW0uaWQgKyBcIj9hbHQ9bWVkaWEma2V5PVwiICsgR2tleTtcclxuICAgICAgICAgICAgICAgIC8vdGhpcyBpdGVtIGlzIGEgZGF0YSBjc3YgZmlsZVxyXG4gICAgICAgICAgICAgICAgZm9sZGVyT2JqLmNzdkZpbGVzW2l0ZW0ubmFtZV0gPSBHTGluaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChpdGVtLm1pbWVUeXBlLnN0YXJ0c1dpdGgoXCJpbWFnZVwiKSkge1xyXG4gICAgICAgICAgICAgICAgR0xpbmsgPSBcImh0dHBzOi8vZG9jcy5nb29nbGUuY29tL3VjP2lkPVwiICsgaXRlbS5pZCArIFwiJmV4cG9ydD1kb3dubG9hZFwiO1xyXG4gICAgICAgICAgICAgICAgLy90aGlzIGl0ZW0gaXMgYSBpbWFnZSBmaWxlXHJcbiAgICAgICAgICAgICAgICBmb2xkZXJPYmouaW1nRmlsZXNbaXRlbS5uYW1lXSA9IEdMaW5rO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGl0ZW0ubWltZVR5cGUgPT09IFwiYXBwbGljYXRpb24vanNvblwiKSB7XHJcbiAgICAgICAgICAgICAgICBHTGluayA9IFwiaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vZHJpdmUvdjMvZmlsZXMvXCIgKyBpdGVtLmlkICsgXCI/YWx0PW1lZGlhJmtleT1cIiArIEdrZXk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5uYW1lLnN0YXJ0c1dpdGgoXCJzZXR0aW5nXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzIGl0ZW0gaXMgYSBEZXNpZ24gRXhwbG9yZSdzIHNldHRpbmcgZmlsZVxyXG4gICAgICAgICAgICAgICAgICAgIGZvbGRlck9iai5zZXR0aW5nRmlsZXNbaXRlbS5uYW1lXSA9IEdMaW5rO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzIGl0ZW0gaXMgYSBqc29uIG1vZGVsXHJcbiAgICAgICAgICAgICAgICAgICAgZm9sZGVyT2JqLmpzb25GaWxlc1tpdGVtLm5hbWVdID0gR0xpbms7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkdvdCBmb2xkZXJPYmpcIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coZm9sZGVyT2JqKTtcclxuICAgICAgICByZXR1cm4gZm9sZGVyT2JqO1xyXG4gICAgICAgIC8vICQuZXh0ZW5kKHNlbGZPYmouR0ZvbGRlckluZm8uY3N2RmlsZXMsIGNzdkZpbGVzKTtcclxuICAgICAgICAvLyAkLmV4dGVuZChzZWxmT2JqLkdGb2xkZXJJbmZvLmltZ0ZpbGVzLCBpbWdGaWxlcyk7XHJcbiAgICAgICAgLy8gJC5leHRlbmQoc2VsZk9iai5HRm9sZGVySW5mby5qc29uRmlsZXMsIGpzb25GaWxlcyk7XHJcbiAgICAgICAgLy8gJC5leHRlbmQoc2VsZk9iai5HRm9sZGVySW5mby5zZXR0aW5nRmlsZXMsIHNldHRpbmdGaWxlcyk7XHJcbiAgICB9O1xyXG4gICAgR29vZ2xlRHJPYmouZ2V0R0ZvbGRlcklEID0gZnVuY3Rpb24gKFVSTCkge1xyXG4gICAgICAgIHZhciBsaW5rID0gVVJMO1xyXG4gICAgICAgIHZhciBsaW5rSUQ7XHJcbiAgICAgICAgaWYgKGxpbmsuc2VhcmNoKFwiZ29vZ2xlLmNvbVwiKSA+IDApIHtcclxuICAgICAgICAgICAgLy8gaWYgKGxpbmsuc2VhcmNoKFwiP3VzcD1zaGFyaW5nXCIpPjApIHtcclxuICAgICAgICAgICAgLy8gICAgIGxpbmtJRCA9IGxpbmsucmVwbGFjZShcIj91c3A9c2hhcmluZ1wiLCBcIlwiKTtcclxuICAgICAgICAgICAgLy8gfSBlbHNlIGlmIChsaW5rLnNlYXJjaChcIm9wZW4/aWQ9XCIpKSB7XHJcbiAgICAgICAgICAgIC8vICAgICBsaW5rSUQgPSBsaW5rLnJlcGxhY2UoXCJvcGVuP2lkPVwiLCBcIlwiKTtcclxuICAgICAgICAgICAgLy8gfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gICAgIGxpbmtJRCA9IGxpbms7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgbGlua0lEID0gbGluay5yZXBsYWNlKFwiP3VzcD1zaGFyaW5nXCIsIFwiXCIpO1xyXG4gICAgICAgICAgICBsaW5rSUQgPSBsaW5rSUQucmVwbGFjZShcIm9wZW4/aWQ9XCIsIFwiXCIpO1xyXG4gICAgICAgICAgICBsaW5rSUQgPSBsaW5rSUQuc3BsaXQoXCIvXCIpO1xyXG4gICAgICAgICAgICBsaW5rSUQgPSBsaW5rSURbbGlua0lELmxlbmd0aCAtIDFdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy9zZXJ2ZXIgbGluayBvciBtc1xyXG4gICAgICAgICAgICBsaW5rSUQgPSBsaW5rO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbGlua0lEO1xyXG4gICAgfTtcclxuICAgIEdvb2dsZURyT2JqLl9Ha2V5ID0gXCJBSXphU3lDU3JGMDhVTWF3eEtJYjBtNEpzQTFtWUU1Tk1tUDM2YllcIjtcclxuICAgIHJldHVybiBHb29nbGVEck9iajtcclxufSgpKTtcclxuZXhwb3J0cy5Hb29nbGVEck9iaiA9IEdvb2dsZURyT2JqO1xyXG52YXIgRm9sZGVySW5mbyA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIEZvbGRlckluZm8oKSB7XHJcbiAgICAgICAgdGhpcy5jc3ZGaWxlcyA9IHt9O1xyXG4gICAgICAgIHRoaXMuaW1nRmlsZXMgPSB7fTtcclxuICAgICAgICB0aGlzLmpzb25GaWxlcyA9IHt9O1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ0ZpbGVzID0ge307XHJcbiAgICB9XHJcbiAgICByZXR1cm4gRm9sZGVySW5mbztcclxufSgpKTtcclxuO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgR29vZ2xlRHJPYmpfMSA9IHJlcXVpcmUoXCIuL0dvb2dsZURyT2JqXCIpO1xyXG52YXIgdXJsID0gXCJodHRwczovL2RyaXZlLmdvb2dsZS5jb20vZHJpdmUvZm9sZGVycy8wQnoyUHdEdmtqb3ZKTmpoeFJrZzRXWGxOTVRBXCI7XHJcbnZhciBnID0gbmV3IEdvb2dsZURyT2JqXzEuR29vZ2xlRHJPYmoodXJsKTtcclxuLy9kb2N1bWVudC5ib2R5LmlubmVySFRNTCA9IGdyZWV0ZXIodXNlcik7XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gZDM7Il0sInNvdXJjZVJvb3QiOiIifQ==