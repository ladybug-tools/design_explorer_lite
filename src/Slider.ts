import { Data, DataUniqueSet } from "./DeLite";

export class Slider{

    private _paramSet:DataUniqueSet;
    /**
     *
     */
    constructor(inputParamsSet:DataUniqueSet) {
        this._paramSet = inputParamsSet;
        let sorted = this.sortEachSet();
        console.log(sorted);
        
    }

    private sortEachSet():Data<string[]>{
        let columnSets = this._paramSet;
        let columnNames = Object.keys(columnSets);

        let sortedObjArray: Data<string[]> = {};

        //if value is string type, do not sort, use the order from the csv
        //if value if number type, Math.max()


        var maxSliderRange = {}
        //console.log('calculating max of each set and making dictionaries');
        columnNames.forEach(columnName => {
            var columnEntriesArray = Array.from(columnSets[columnName]);
            let ifNumber = isNaN(Number(columnEntriesArray[0]));
            if (ifNumber) {
                columnEntriesArray.sort(function(a:any, b:any){return a-b});

            }
            sortedObjArray[columnName] = columnEntriesArray;
            // _columnDictionaries[columnName] = {};
            // var key = 0;
            // columnEntriesArray.forEach(arrayEntrySorted =>{
            //     // console.log('Adding key: '+key+' for columnName: '+columnName+' with value of:'+arrayEntrySorted)
            //     _columnDictionaries[columnName][key] = arrayEntrySorted;
            //     key++;
            // });
            //maxSliderRange[columnName] = columnEntriesArray.length -1;
           
        });
    
        return sortedObjArray;
    }

}