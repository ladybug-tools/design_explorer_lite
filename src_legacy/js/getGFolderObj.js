var Gkey = "AIzaSyCSrF08UMawxKIb0m4JsA1mYE5NMmP36bY";
var _googleReturnObj ={ //{"fileName":Google Drive ID}
csvFiles:{},
imgFiles:{},
jsonFiles:{},
settingFiles:{}
};

var _folderInfo = {
    "DE_PW":"",
    "inLink":"",
    "url":"",
    "type":""
}


function LoadFromCloud(dataMethod) {
    // clear all data within the google object
    _googleReturnObj.csvFiles = {}
    _googleReturnObj.imgFiles = {}
    _googleReturnObj.jsonFiles = {}
    _googleReturnObj.settingFiles = {}

    var serverFolderLink;


    //this is for the short link with ID
    if (dataMethod === "URL") {
        document.getElementById("folderLink").value = "";

        var inUrl = window.location.href;
        decodeUrlID(
            inUrl,
            function(d){
                loadFromUrl(d);
            }
        );

    //Load from google folder input without ID
    } else {
        serverFolderLink = document.getElementById("folderLink").value;
        loadFromUrl(serverFolderLink);
    }

}

function loadFromUrl(rawUrl) {

    checkInputLink(rawUrl, function (d) {
        _folderInfo = d; //set global foler obj

        //this is from Google or MS
        prepareGFolder(d);

        //console.log(link);
    })
}

function checkInputLink(link, callback){
    var folderLinkObj = {
        "DE_PW":"",
        "inLink":"",
        "url":"",
        "type":""
    };

    // Only supports the Google Drive now
    var GFolderID = getGFolderID(link);
    //folderLinkObj.DE_PW = "DE_G";
    folderLinkObj.url ="https://www.googleapis.com/drive/v3/files?q=%27" + GFolderID + "%27+in+parents&key=" +Gkey;
    folderLinkObj.type = "GoogleDrive";

    folderLinkObj.inLink = link;
    // console.log(folderLinkObj);
    callback(folderLinkObj);

}

function getGFolderID(link) {
    var linkID;

    if (link.includes("google.com")) {

        if (link.includes("?usp=sharing")) {
            linkID = link.replace("?usp=sharing", "");
        } else if (link.includes("open?id=")) {
            linkID = link.replace("open?id=", "");
        } else {
            linkID = link;
        }

        linkID = linkID.split("/");
        linkID = linkID[linkID.length - 1];

    } else {
        //server link or ms
        linkID = link;
    }

    return linkID;
}

//Decode URL from google short link
function decodeUrlID(rawUrl, callback) {
    var serverFolderLink="";
    var urlVars = getUrlVars(rawUrl);
    var GfolderORUrl = urlVars.GFOLDER;
    var DEID = urlVars.ID;

    if(DEID !== undefined) {
        linkID = DEID;
        //console.log(linkID)

        if (linkID.length === 6) {
            var url = "https://www.googleapis.com/urlshortener/v1/url?key="+ Gkey+"&shortUrl=http://goo.gl/"+linkID;

            d3.json(url,
                function(d){
                    var GID = (getUrlVars(d.longUrl).ID);
                    serverFolderLink = decodeUrl(GID);
                    callback(serverFolderLink);
                }
            )
        } else {
            serverFolderLink = decodeUrl(linkID);
            callback(serverFolderLink);
        }


    }else {

    }


}

//Ready to load the google folder content as Json format from google folder api and folder ID.
function prepareGFolder(folderLink) {

    googleReturnObj ={ //{"fileName":Google Drive ID}
        csvFiles:{},
        imgFiles:{},
        jsonFiles:{},
        settingFiles:{}
    };

    var folder = {
        "DE_PW":"", // short code from google or base64 coded inLink
        "inLink":"", //raw url
        "url": "",  //url to load the list item inside the folder
        "type": "" //folder type : GoogleDrive, OneDrive, or userServerLink
    }
    //_folderInfo = folderLink;

    folder = folderLink;

    d3.json(folder.url, function (data) {
        var csvFiles = {};
        var imgFiles ={};
        var jsonFiles ={};
        var settingFiles ={};


        if (folder.type=== "GoogleDrive") { //this is google returned obj
            data.files.forEach(function (item) {
                var GLink = "";
                //googleReturnObj[item.name]=item.id

                if(item.mimeType === "text/csv"){
                    GLink = "https://www.googleapis.com/drive/v3/files/" + item.id + "?alt=media&key=" + Gkey;
                    //this item is a data csv file
                    csvFiles[item.name] = GLink;

                }else if(item.mimeType.startsWith("image")){
                    GLink = "https://docs.google.com/uc?id=" + item.id + "&export=download";
                    //this item is a image file
                    imgFiles[item.name] = GLink;

                }else if(item.mimeType === "application/json"){
                    GLink = "https://www.googleapis.com/drive/v3/files/" + item.id + "?alt=media&key=" + Gkey;

                    if (item.name.startsWith("setting")) {
                        //this item is a Design Explore's setting file
                        settingFiles[item.name] = GLink;
                    } else {
                        //this item is a json model
                        jsonFiles[item.name] = GLink;
                    }
                }

            });

        }

        $.extend(_googleReturnObj.csvFiles, csvFiles);
        $.extend(_googleReturnObj.imgFiles, imgFiles);
        $.extend(_googleReturnObj.jsonFiles, jsonFiles);
        $.extend(_googleReturnObj.settingFiles, settingFiles);
        //console.log(data);

        if (data.nextPageToken !== undefined) {

            if (folder.url.search("&pageToken=") > 0) {
                folder.url = folder.url.split("&pageToken=", 1)[0];
            }

            folder.url +=  "&pageToken=" + data.nextPageToken

            prepareGFolder(folder);

        } else if (data["children@odata.nextLink"] !== undefined) {

            folder.url =  data["children@odata.nextLink"];

            prepareGFolder(folder);

        } else if (data["@odata.nextLink"] !== undefined) {

            folder.url =  data["odata.nextLink"];

            prepareGFolder(folder);

        }else { //this is the last page, so return googleReturnObj directly

            var csvFile = _googleReturnObj.csvFiles["data.csv"];

            if (csvFile === undefined) {
                alert("Could not find the data.csv file in this folder, please double check!\n\rThis might because Google Drive is processing the newly uploaded files, please wait a couple minutes!");
            } else {
                //readyToLoad(csvFile);

                //console.log(_googleReturnObj);
                getCsvObj(_googleReturnObj);

                //window.prompt only if user input data, not from URL
                if (document.getElementById("folderLink").value) {
                    showStillLink();
                }

            }

        }


    });
}

function loadFromUrl(rawUrl) {

    checkInputLink(rawUrl, function (d) {
        _folderInfo = d; //set global foler obj

        if (d.type === "userServerLink") {
            //this is a user's server link, and load csv directly
            readyToLoad(d.url + "data.csv");
        }else {
            //this is from Google or MS
            prepareGFolder(d);
        }

        //console.log(link);
    })
}

function showStillLink() {

    var studyCaseLink = encodeUrl(_folderInfo.inLink);
    var studyEncodedUrl = "";

    if (studyCaseLink.length===0) {
        var warningString = "There is no static link for you if you are not using online shared folder.";
        d3.select("#myStudyID").html(warningString);
        $("#showStillLink").modal()
        return;

    }else if (_folderInfo.DE_PW.length>0){
        // if _folderInfo.DE_PW existed, just return.
        studyEncodedUrl = document.location.origin + "/design_explorer_lite/?ID=" + _folderInfo.DE_PW;
        d3.select("#showShortUrl").html("https://goo.gl/" +_folderInfo.DE_PW);
        d3.select("#myStudyID").html(studyEncodedUrl);
        $("#showStillLink").modal();
        return;

    }

    //valid online folder available
    var siteOrigin = document.location.origin;
    if (siteOrigin.includes('127.0.0.1')||siteOrigin.toLowerCase().includes('localhost')) {
        siteOrigin = 'https://www.ladybug.tools/design_explorer_lite'
    }
    var studyLongUrl = siteOrigin +"/design_explorer_lite/?ID="+ studyCaseLink;
    d3.select("#welcome").style("display","none");


    makeUrlId(studyLongUrl, function name(UrlId) {
        _folderInfo.DE_PW = UrlId;
        console.log("loging DE_PW");

        console.log(_folderInfo);


        if(UrlId.length ==6){ // google url id

            studyEncodedUrl = siteOrigin +"/design_explorer_lite/?ID="+_folderInfo.DE_PW;
            d3.select("#showShortUrl").html("https://goo.gl/"+ _folderInfo.DE_PW);

        }else{
            studyEncodedUrl = studyLongUrl;
        }

        d3.select("#myStudyID").html(studyEncodedUrl);
        $("#showStillLink").modal()

    })


}

function makeUrlId(rawUrl,callback) {
    var longUrl=rawUrl;
    console.log("making DE_PW");
    console.log(longUrl);

    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: "https://www.googleapis.com/urlshortener/v1/url?key="+Gkey,
        data: "{ longUrl: '"+longUrl+"'}",
        error: function(e) {
        console.log('loging POST error');

        callback(encodeUrl(longUrl));

        },
        dataType: 'json',
        success: function(response) {
        var UrlID ="";
        if(response.id != null)
        {
            //response.id:  https://goo.gl/bMOO
            UrlID = response.id.split("/");
            UrlID = UrlID[UrlID.length-1];  //UrlID: bMOO

        }
        callback(UrlID);
        }
    });
}

function decodeUrlID(rawUrl, callback) {
    var serverFolderLink="";
    var urlVars = getUrlVars(rawUrl);
    var GfolderORUrl = urlVars.GFOLDER;
    var DEID = urlVars.ID;

    //old GFOLDER
    if (GfolderORUrl !== undefined) {

        if (GfolderORUrl.search("/") == -1) {
            //GfolderORUrl is google folder ID
            serverFolderLink = "https://drive.google.com/drive/folders/" + GfolderORUrl;
        } else {
            serverFolderLink = GfolderORUrl;
        }

        callback(serverFolderLink);

    } else if(DEID !== undefined) {

        //linkID = rawUrl.split("/");
        //linkID = linkID[linkID.length - 1];
        linkID = DEID;
        //console.log(linkID)

        if (linkID.length === 6) {
            d3.json("https://www.googleapis.com/urlshortener/v1/url?key="+ Gkey+"&shortUrl=http://goo.gl/"+linkID,
                function(d){
                    var GID = (getUrlVars(d.longUrl).ID);
                    serverFolderLink = decodeUrl(GID);
                    callback(serverFolderLink);
                }
            )
        } else {
            serverFolderLink = decodeUrl(linkID);
            callback(serverFolderLink);
        }


    }else {

    }


}

function encodeUrl(url) {
    // var link = btoa(url).slice(0, -1).replace('/','_').replace('+','-');
    var link = btoa(url);
    return link;
}

function decodeUrl(encodedString) {
    // var url = atob(encodedString.replace('_','/').replace('-','+')+"=");
    var url = "";
    try{
        url = atob(encodedString);
    }catch(err) {
        console.log(err.message+" But fixed:>");
        url = atob(encodedString.replace('_','/').replace('-','+')+"=");
    }

    return url;
}

function getUrlVars(rawUrl) {
    var vars = {};
    var parts = rawUrl.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}
