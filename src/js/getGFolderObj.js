var Gkey = "AIzaSyCSrF08UMawxKIb0m4JsA1mYE5NMmP36bY";
var _googleReturnObj ={ //{"fileName":Google Drive ID}
csvFiles:{},
imgFiles:{},
jsonFiles:{},
settingFiles:{}
}; 

function LoadFromCloud(dataMethod) {
    var serverFolderLink;
    
    document.getElementById('csv-file').value = "";

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
                console.log(_googleReturnObj);
                
            }
   
        }


    });
}