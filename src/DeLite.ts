
export class DeLite{

    private _deData: DeLiteData;
    private _currentData:object = {};
    /**
     *
     */
    constructor(dataObj:DeLiteData) {
        this._deData = dataObj;
        console.log(dataObj);
        
    }

    public buildPage():void{
        //TODO: remove all first;
        this.makeInputSliders();
        this.makeImageDivs();
        this.makeChartDivs();
        this.makeOutputDivs();
    }

    public updataPage():void{
        //TODO: remove first;
        this.makeImageDivs();
        this.makeChartDivs();
        this.makeOutputDivs();
    }


    public makeInputSliders():void {
        
    }

    public makeImageDivs():void{

    }

    public makeChartDivs():void{

    }

    public makeOutputDivs():void{

    }






    
}

 /**
 * This data object contains all formated info for Design Explorer Lite
 */
export class DeLiteData{
    inputParamSets:Set<string>[] = []; //For makeing sliders;
    data:object = {}; 
    setting:object ={}; //TODO: define setting obj;
}