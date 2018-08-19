import * as d3 from "d3";


export class GoogleDrObj{
    private static _Gkey = "AIzaSyCSrF08UMawxKIb0m4JsA1mYE5NMmP36bY";
    private _GID:string = "";
    public GFolderInfoPromise:Promise<FolderInfo>;
    //GFolderInfo:FolderInfo = new FolderInfo();
    /**
     *This class takes care of fetching data from user's Google Drive link.
     Use getFolderInfo(callback()) after constructing this obj.
     */
    constructor(GoogleFolderURL:string) {
        this._GID =  GoogleDrObj.getGFolderID(GoogleFolderURL); //0Bz2PwDvkjovJNjhxRkg4WXlNMTA;
        const urlApi ="https://www.googleapis.com/drive/v3/files?q=%27" + this._GID + "%27+in+parents&key=" + GoogleDrObj._Gkey;
        this.GFolderInfoPromise =  GoogleDrObj.getFolderInfo(urlApi);
    }

    
    public static async getFolderInfo (url:string) : Promise<FolderInfo> {
        let urlApi = url;
        
        const rawData = await d3.json(urlApi);
        const formatedData =  GoogleDrObj.makeCleanFolderObj(rawData);

        let nextPageToken = rawData['nextPageToken'];
        if (nextPageToken !== undefined) {

            if (urlApi.search("&pageToken=") > 0) {
                urlApi = urlApi.split("&pageToken=", 1)[0];
            }

            urlApi +=  "&pageToken=" + nextPageToken;
            const nextData = await GoogleDrObj.getFolderInfo(urlApi);

            $.extend(formatedData.csvFiles,nextData.csvFiles);
            $.extend(formatedData.imgFiles,nextData.imgFiles);
            $.extend(formatedData.jsonFiles,nextData.jsonFiles);
            $.extend(formatedData.settingFiles,nextData.settingFiles);
            
        }

        return formatedData;

    }

    private static makeCleanFolderObj(data:any):FolderInfo{
        let folderObj = new FolderInfo();
        let Gkey =GoogleDrObj._Gkey;

        const files:object[] = data.files;
        console.log('Currently loading amount: '+files.length);
        

        files.forEach(function (item:any) {
            let GLink:string = "";
            if(item.mimeType === "text/csv"){
                GLink = "https://www.googleapis.com/drive/v3/files/" + item.id + "?alt=media&key=" + Gkey;
                //this item is a data csv file
                folderObj.csvFiles[item.name] = GLink;

            }else if(item.mimeType.startsWith("image")){
                GLink = "https://docs.google.com/uc?id=" + item.id + "&export=download";
                //this item is a image file
                folderObj.imgFiles[item.name] = GLink;

            }else if(item.mimeType === "application/json"){
                GLink = "https://www.googleapis.com/drive/v3/files/" + item.id + "?alt=media&key=" + Gkey;

                if (item.name.startsWith("setting")) {
                    //this item is a Design Explore's setting file
                    folderObj.settingFiles[item.name] = GLink;
                } else {
                    //this item is a json model
                    folderObj.jsonFiles[item.name] = GLink;
                }
            }

        });

        //console.log("Got folderObj");
        //console.log(folderObj);
        return folderObj;

    }

    private static getGFolderID(URL:string):string {
        let link:string = URL;
        var linkID;
    
        if (link.search("google.com")>0) {
            
            linkID = link.replace("?usp=sharing", "");
            linkID = linkID.replace("open?id=", "");
            linkID = linkID.split("/");
            linkID = linkID[linkID.length - 1];
    
        } else {
            //server link or ms
            linkID = link;
        }
    
        return linkID;
    }


}

export class FolderInfo { 
    csvFiles:object = {};
    imgFiles:object = {};
    jsonFiles:object = {};
    settingFiles:object = {}
};