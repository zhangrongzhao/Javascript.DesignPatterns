/**
 * Created by zhangrongzhao on 2014/7/29.
 */
/*AdCommand interface.*/
var AdCommand=new Interface("AdCommand",["execute","undo"]);

/*Stop command class.*/
var StopAd=(function(){
    var _StopAd = function(adObject){
        Interface.ensureImplements(adObject,AdCommand);
        this.ad=adObject;
    };
    _StopAd.prototype={
         execute:function(){
             this.ad.stop(); //delegate to the adobject .
         }
    };
    Interface.ensureImplements(_StopAd,AdCommand);
    return _StopAd;
})();

/*Start command class.*/
var StartAd=(function(){
    var _StartAd=function(adObject){
        Interface.ensureImplements(adObject,AdCommand);
        this.ad=adObject;
    };
    _StartAd.prototype={
        execute:function() {
          this.ad.start();
        }
    };
    Interface.ensureImplements(_startAd,AdCommand);
    return _StartAd;
})();

///*Implementation code.*/
//var ads=getAds();
//ads.foreach(function(){
//    //create command objects for starting and stopping the ad.
//    var startCommand=new StartAd(this);
//    var stopCommand=new StopAd(this);
//
//    //Create the UI elements that will execute the command on click.
//    new UiButton("Start"+this.name,startCommand);
//    new UiButton("Stop"+this.name,stopCommand);
//});

var markStart=function(adObject){
   return function(){
       adObject.start();
   };
};

var markStop=function(adObject){
    return function(){
        adObject.stop();
    };
};

///*Implementation code.*/
//var startCommand = markStart(ads[0]);
//var stopCommand = markStop(ads[0]);
//
//startCommand();
//stopCommand();

var Command=new Interface("Command",["execute","undo"]);

