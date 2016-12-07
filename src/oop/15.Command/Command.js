///**
// * Created by zhangrongzhao on 2014/7/30.
// */
///*Command interface.*/
//var Command=new Interface("Command",["execute","undo"]);
//
///*Checking the interface of the command object.*/
//
///*Ensure that the execute operation is defined.if not,
//*a descriptive exception will be thrown.*/
//Interface.ensureImplements(someCommand,Command);
//
///*If no exception is thrown,you can safely invoke the execute operation.*/
//someCommand.execute();
//
//if(typeof someCommand !="function")
//{
//    throw new Error("Command isn't a function.");
//}
//
///*SimpleCommand,a loosely coupled,simple command class.*/
//var SimpleCommand=(function(){
//    var _SimpleCommand=function(receiver){
//        this.receiver=receiver;
//    };
//    _SimpleCommand.prototype={
//        execute:function(){
//           this.receiver.execute();
//        },
//        undo:function(){
//            this.receiver.undo();
//        }
//    };
//    Interface.ensureImplements(_SimpleCommand,Command);
//    return _SimpleCommand;
//})();
//
///*ComplexCommand,a tightly coupled,complex command class.*/
//var ComplexCommand=(function(){
//    var _ComplexCommand=function(){
//         this.logger=new Logger();
//         this.xhrHandler=XhrManager.createAjaxHandler();
//         this.parameters={};
//    };
//    _ComplexCommand.prototype={
//        setParameter:function(key,value){
//            this.parameters[key]=value;
//        },
//        execute:function(){
//            this.logger.log("Executing Command.");
//            var postArray=[];
//            for(var key in this.parameters)
//            {
//                postArray.push(key+"="+this.parameters[key]);
//            }
//            var postString=postArray.join("&");
//            this.xhrHandler.request("POST","script.php",function(){},postString);
//        },
//        undo:function(){
//
//        }
//    };
//    return _ComplexCommand;
//})();
//
///*GreyAreaCommand,somewhere between simple and complex.*/
//var GreyAreaCommand=(function(){
//    var _GreyAreaCommand=function(receiver){
//        this.logger=new Logger();
//        this.receiver=receiver;
//    };
//    _GreyAreaCommand.prototype={
//        execute:function(){
//            this.logger.log("Executing Command.");
//            this.receiver.prepareAction();
//            this.receiver.action();
//        },
//        undo:function(){}
//    };
//    Interface.ensureImplements(_GreyAreaCommand,Command);
//    return _GreyAreaCommand;
//})();
