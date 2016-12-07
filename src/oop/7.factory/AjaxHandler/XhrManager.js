/**
 * Created by zhangrongzhao on 2014/6/5.
 */
var XhrManager={
    createAjaxHandler:function(){
        var xhr;
        if(this.isOffline()){
            xhr=new OfflineHandler();
        }
        else if(this.isHighLatency())
        {
            xhr=new QueuedHandler();
        }
        else
        {
            xhr=new SimpleHandler();
        }

        Interface.ensureImplements(xhr,AjaxHandler);
        return xhr;
    },
    isOffline:function(){},
    isHighLatency:function(){}
};


//var myHandler=XhrManager.createAjaxHandler();
//var callback={
//    success:function(responseText){},
//    failure:function(statusCode){}
//};

//myHandler.request("Get","script.php",callback);