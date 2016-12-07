/**
 * Created by zhangrongzhao on 2014/6/9.
 */

var asyncRequest=(function(){
    function _handleReadyState(oXhr,callback){
        var poll=window.setInterval(function(){
           if(oXhr&& oXhr.readyState==4){
               window.clearInterval(poll);
               if(callback)
               {
                   callback(oXhr);
               }
           }
        },50);
    }

    var _getXHR=function(){
        var http;
        try{
            http=new XMLHttpRequest();
            _getXHR=function(){
                return new XMLHttpRequest();
            };
        }
        catch(e){
            var msxml=["MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"];
            for(var i= 0,len=msxml.length;i<len;++i)
            {
                try{
                    http=new ActiveXObject(msxml[i]);
                    _getXHR=function(){
                        return new ActiveXObject(msxml[i]);
                    };
                    break;
                }catch(e){

                }
            }
        }
        return http;
    };

    return function(method,uri,callback,postData){
        var http=_getXHR();
        http.open(method,uri,true);
        _handleReadyState(http,callback);
        http.send(postData||null);
        return http;
    }
})();