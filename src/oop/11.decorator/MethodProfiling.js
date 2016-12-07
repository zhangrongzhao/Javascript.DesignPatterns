/**
 * Created by zhangrongzhao on 2014/7/8.
 */
/*ListBuilder class.*/
var ListBuilder=function(parent,listLength){
    this.parentElement=$(parent);
    this.listLenth=listLength;
};

ListBuilder.prototype={
    buildList:function(){
        var list=document.createElement("ol");
        this.parentElement.appendChild(list);

        for(var i=0;i<listLength;i++)
        {
            var item=document.createElement("li");
            list.appendChild(item);
        }
    }
};

/*SimpleProfiler class.*/

var SimpleProfiler=function(component){
    this.component=component;
};

SimpleProfiler.prototype={
    buildList:function(){
        var startTime=new Date();
        this.component.buildList();
        var elapsedTime=(new Date()).getTime()-startTime.getTime();
        console.log("buildList:"+elapsedTime+"Ms");
    }
};

/*Demo*/
var list=new ListBuilder("list-container",5000);
list=new SimpleProfiler(list);
list.buildList();

/*扩展到任意对象的任意方法,做性能测试*/
var MethodProfiler=function(component){
    this.component=component;
    this.timers={};

    for(var key in this.component)
    {
        //Ensure that the property is function.
        if(typeof this.component[key] !=="function")
        {
            continue;
        }

        //add the same method to the current MethodProfiler instance.
        var that=this;
        (function(methodName){
           that[methodName]=function(){
               that.setTimer(methodName);
               var returnValue=that.component[methodName].apply(that.component,arguments);
               that.displayTime(methodName);
               return returnValue;
           };
        })(key);
    }
};
MethodProfiler.prototype={
    setTimer:function(methodName){
        this.timers[methodName]=(new Date()).getTime();
    },
    getElapsedTime:function(methodName){
        return (new Date()).getTime()-this.timers[methodName];
    },
    displayTime:function(methodName,time){
        console.log(methodName+":"+time+"ms.");
    }
};
/*Demo...*/
var list=new ListBuilder("list-container",5000);
list=new MethodProfiler(list);
list.buildList("ol");
list.buildList("ul");
list.removeLists("ul");
list.removeLists("ol");