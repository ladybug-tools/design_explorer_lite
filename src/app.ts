import { GoogleDrObj } from "./GoogleDrObj";


let url = "https://drive.google.com/drive/folders/14fhftDFou0htwqsQEg4dwLDm_G7h-PZH";

let g = new GoogleDrObj(url);

g.getFolderInfo((d)=>{
    console.log("getting data");
    //document.body.innerHTML = JSON.stringify(d);
    console.log(d);
    
})

