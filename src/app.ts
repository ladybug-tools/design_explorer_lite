import { GoogleDrObj } from "./GoogleDrObj";
import { Parsing } from "./Parsing";
import { DeLiteData, DeLite } from "./DeLite";
//import d3 from "../node_modules/@types/d3";



//loading('mew msg!', alert('finished'));
// window['pageLoading'] = loading
//WINDOW.pageLoading('mew msg!',console.log('finished'));



let url = "https://drive.google.com/drive/folders/14fhftDFou0htwqsQEg4dwLDm_G7h-PZH";

let g = new GoogleDrObj(url);

g.GFolderInfoPromise.then(
    (d)=>{
        
        //console.log("getting data");
        //console.log(d);
    
        new Parsing(d, 
            (deData:DeLiteData) => {
                //console.log(deData);
                //debugger;
                let deLite = new DeLite(deData);
                //let divSeletion = d3.select('');
                deLite.buildPage();
            }
        )  
        
    }
)


