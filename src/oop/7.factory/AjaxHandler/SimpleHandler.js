/**
 * Created by zhangrongzhao on 2014/6/4.
 */

/*AjaxHandler interface*/

var AjaxHandler=new Interface("AjaxHandler",["request","createXhrObject"]);

var SimpleHandler=function(){};
SimpleHandler.prototype={
    request:function(method,url,callback,postVars){
        var xhr=this.createXhrObject();
        xhr.onreadystatechange=function(){
          if(xhr.readyState!==4) return ;
           (xhr.status==200)?
               callback.success(xhr.responseText,xhr.responseXML)
               :callback.failure(xhr.status);
        };
        xhr.open(method,url,true);
        if(method!=="POST") postVars=null;
        xhr.send(postVars);
    },
    createXhrObject:function(){
        var methods=[
                     function(){return new XMLHttpRequest();},
                     function(){return new ActiveXObject("Msxml2.XMLHTTP");},
                     function(){return new ActiveXObject("Microsoft.XMLHTTP")}
                    ];
        for(var i=0;i<methods.length;i++)
        {
            try
            {
                methods[i]();
            }
            catch(e)
            {
                continue;
            }
            this.createXhrObject=methods[i];
            return methods[i]();
        }

        throw new Error("SimpleHandler:could not create an XHR object.");
    }
};

//var simpleHandler=new SimpleHandler();
//var callback={
//    success:function(responseText,responseXML){},
//    failure:function(status){}
//};
//simpleHandler.request("POST","Demo.aspx",callback,{a:1,b:1});

