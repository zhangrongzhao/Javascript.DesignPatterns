/**
 * Created by zhangrongzhao on 2014/6/10.
 */
window.DED=window.DED||{};
DED.util=DED.util||{};
DED.util.Observer=function(){
    this.fns=[];
};

DED.util.Observer.prototype={
    subscribe:function(fn){this.fns.push(fn);},
    unsubscribe:function(fn){
        this.fns=this.fns.filter(function(element){
            if(element!==fn)
            {
                return element;
            }
        });
    },
    fire:function(o){
         this.fns.foreach(function(element){element(o);});
    }
};

DED.Queue=function(){
    //Queued requests.
    this.queue=[];

    //Observable Objects that can notify the client of interesting moments on each DED.Queue instance.
    this.onComplete=new DED.util.Observer();
    this.onFailure=new DED.util.Observer();
    this.onFlush=new DED.util.Observer();

    //Core properties that set up a frontend queueing system.
    this.retryCount=3;
    this.currentRetry=0;
    this.paused=false;
    this.timeout=5000;

    this.conn={};
    this.timer={};
};

DED.Queue.method("flush",function(){
    if(this.queue.length<=0) return;
    if(this.paused){
        this.paused=false;
        return;
    }
    var that=this;
    this.currentRetry++;
    var abort=function(){
        that.conn.abort();
        if(that.currentRetry==that.retryCount)
        {
            that.onFailure.fire();
            that.currentRetry=0;
        }
        else
        {
            that.flush();
        }
    };

    this.timer=window.setTimeout(abort,this.timeout);
    var callback=function(oXhr){
        window.clearInterval(that.timer);
        that.currentRetry=0;
        that.queue.shift();
        that.onFlush.fire(oXhr.responseText);//?
        if(that.queue.length==0)
        {
            that.onComplete.fire();//?
            return;
        }
        //recursive call to flush
        that.flush();
    };
    this.conn=asyncRequest(this.queue[0]["method"],
                           this.queue[0]["uri"],
                           callback,
                           this.queue[0]["params"]);


}).method("setRetryCount",function(count){
   this.retryCount=count;
}).method("setTimeout",function(time){
   this.timeout=time;
}).method("add",function(o){
   this.queue.push(o);
}).method("pause",function(){
   this.paused=true;
}).method("dequeue",function(){
   this.queue.pop();
}).method("clear",function(){
   this.queue=[];
});


/*队列实现*/
var q=new DED.Queue();
//reset out retry count to be higher for slow connections.
q.setRetryCount(5);

//decrease timeout limit because we still want fast connections to benefit.
q.setTimeout(1000);

//add two slots.
q.add({method:"GET",uri:"/path/to/file.php?ajax=true&woe=me"});

//Flush the queue.
q.flush();

//Pause the queue,retaining the requests.
q.pause();

//clear our queue,retaining the requests.
q.clear();

//add two requests.
q.add({method:"GET",uri:"/path/to/file.php?ajax=true"});
q.add({method:"GET",uri:"/path/to/file.php?ajax=true&woe=me"});

//remove the last request form the queue.
q.dequeue();

//flush the queue again.
q.flush();
