/**
 * Created by zhangrongzhao on 2014/6/5.
 */

var QueuedHandler=function(){
    this.queue=[];
    this.requestInProgress=false;//正在请求当中
    this.retryDelay=5;
};

prototypeInheritHelper.inheritPrototype(SimpleHandler,QueuedHandler);

QueuedHandler.prototype.request=function(method,url,callback,postVars,override){
    if(this.requestInProgress&&!override)
    {
        this.queue.push({method:method,
                         url:url,
                         callback:callback,
                         postVars:postVars});
    }
    else
    {
        this.requestInProgress=true;
        var xhr=this.createXhrObject();
        var that=this;
        xhr.onreadystatechange=function(){
            if(xhr.readyState!==4) return;
            if(xhr.status===200)
            {
                callback.success(xhr.responseText,xhr.responseXML);
                that.advanceQueue();
            }
            else
            {
                callback.failure(xhr.status);
                setTimeout(function(){that.request(method,url,callback,postVars,true);},that.retryDelay*1000);
            }
        };

        xhr.open(method,url,true);
        if(method!="POST") postVars=null;
        xhr.send(postVars);
    }
};

QueuedHandler.prototype.advanceQueue=function(){
    if(this.queue.length===0)
    {
        this.requestInProgress=false;
        return;
    }

    var req=this.queue.shift();
    this.request(req.method,req.url,req.callback,req.postVars,true);
};



