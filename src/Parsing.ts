import { FolderInfo } from "./GoogleDrObj";
import * as d3 from "d3";
import { DeLiteData } from "./DeLite";

export class Parsing{
    
    /**
     *This class takes a FolderInfo obj and parses and convert to DeLiteData object, 
     and passing DeLiteData to callback drawPageAction;
     */
    constructor(GFolderInfo:FolderInfo, drawPageAction:(deData:DeLiteData)=> void) {
        let hasDataCsv = this.checkGFolder(GFolderInfo);
        if (hasDataCsv) {
            Parsing.getCsvObj(GFolderInfo, drawPageAction);
        } else {
            alert('No data.csv!');
        }
        
    }

    private checkGFolder(GFolderInfo:FolderInfo):boolean{
        
        let dataCsvFile:string = GFolderInfo.csvFiles['data.csv'];
        if (dataCsvFile === null) {
            return false;
        }else{
            return true;
        }


    }

    private static getCsvObj(GFolderInfo: FolderInfo, drawPageAction:(deData:DeLiteData)=> void):void{

        //read csv file from google drive
        let gFolder = GFolderInfo;

        let dataCsvFile:string = gFolder.csvFiles['data.csv'];
        let settingFile:string = gFolder.settingFiles['settings_lite.json'];
        d3.csv(dataCsvFile).then(
            function(d:any){
            
                let deData = new DeLiteData();
                //read settings file
                //TODO: check if settingFile is null.
                if (settingFile === null) {
                    deData = Parsing.parseDataItems(d,deData);
                }else{
                    d3.json(settingFile).then(
                        function(settingsJson){
                            //add settings file to global _settings
                            deData.setting = settingsJson;
                            //_settings = settingsJson; 
                            deData =  Parsing.parseDataItems(d,deData);
                            //console.log('pushed parameters and settings')
                            //console.log('finished parsing csv')
                            //buildAll();
                          }
                    )
                }

                drawPageAction(deData);
                

              }
        )
        
    }

    private static parseDataItems(data:object[], deLiteData:DeLiteData):DeLiteData{

        let columnNames = d3.keys(data[0]);
        let columnRegex = new RegExp(/((?:in)|(?:out)): ?(?:(\w*) ?(?:\[(.*)\])?)/i);
        let parameters:string[] = [];
        
        let deData = deLiteData;
        let columnSets = deData.inputParamSets;

    
        
        columnNames.forEach((columnName, colIndex) => {
            let name = '';
            var isEven = colIndex % 2;
            var match = columnRegex.exec(columnName);
            if(match) {

                if(columnName.startsWith('in:')){
                    columnSets[columnName] = new Set();
                }
                name = match[2];
                parameters.push(name);
                
                //columnToNameMap[columnName] = name;
            }
        });
        
        let inputParamNames = d3.keys(columnSets);

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

