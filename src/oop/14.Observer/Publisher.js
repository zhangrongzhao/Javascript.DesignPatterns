/**
 * Created by zhangrongzhao on 2014/7/24.
 */
Function.prototype.subscribe=function(publisher){
    var that=this;
    var alreadyExists=publisher.subscribers.some(function(el){return el===that;});
    if(!alreadyExists)
    {
        publisher.subscribers.push(this);
    }
    return this;
};

Function.prototype.unsubscribe=function(publisher){
    var that=this;
    publisher.subscribers=publisher.subscribers.filter(function(el){return el!==that;});
    return this;
};

var Publisher=(function(){
    var _Publisher=function(){
        this.subscriber=[];
    };
    _Publisher.prototype={
        deliver:function(data){
           this.subscriber.foreach(function(fn){
                fn(data);
           });
           return this;
        },
        subscribe:function(){

        }
    };
    return _Publisher;
})();

/*有些订阅者监听到某种一次性的事件后，会在回调阶段立即退订该事件*/
var publisherObject=new Publisher();

var observerObject=function(data){
    //process data.
    console.log(data);
    //unsubscribe from this publisher.
    arguments.callee.unsubscribe(publisherObject);
};

observerObject.subscribe(publisherObject);
