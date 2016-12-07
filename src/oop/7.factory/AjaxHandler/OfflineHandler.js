/**
 * Created by zhangrongzhao on 2014/6/5.
 */

var OfflineHandler=function(){
    this.storedRequests=[];
};

prototypeInheritHelper.inheritPrototype(SimpleHandler,OfflineHandler);

OfflineHandler.prototype.request=function(method,url,callback,postVars){
   if(XhrMananger.isOffline())
   {
       this.storedRequests.push({method:method,
                                 url:url,
                                 callback:callback,
                                 postVars:postVars});
   }
   else
   {
       this.flushStoredRequests();
       OfflineHandler.superClass.request(method,url,callback,postVars);
   }
};

OfflineHandler.prototype.flushStoredRequests=function(){
    for(var i=0;len=this.storedRequests.length;i++)
    {
         var req=this.storedRequests[i];
        OfflineHandler.superClass.request(req.method,req.url,req.callback,req.postVars);
    }
};