/**
 * Created by zhangrongzhao on 2014/7/15.
 */
/*WebServiceProxy class.*/
var WebServiceProxy=(function(){
    var _WebServiceProxy=function(){
        this.xhrHandler=XhrManager.createAjaxHandler();
    };
    _WebServiceProxy.prototype={
        _xhrFailure:function(statusCode){
            throw new Error("WebServiceProxy:Asynchronous request failed.");
        },
        _fetchData:function(url,dataCallback,parameters){
            var that=this;
            var callback={
                success:function(responseText){
                    var obj=eval("("+responseText+")");
                    dataCallback(obj);
                },
                failure:this._xhrFailure
            };
            var parameterArray=[];
            for(var paraName in parameters)
            {
                parameters.push(paraName+"="+parameters[paraName]);
            }

            if(parameterArray.length>0)
            {
                url=url+"?"+parameterArray.join("&");
            }

            this.xhrHandler("GET",url,callback);
        }
    };
    return _WebServiceProxy;
})();

var StatsProxy=(function(){
    var url={
        pageViews:"/stats/getPageViews/",
        uniques:"/stats/getUniques/",
        browserShare:"/stats/getBrowserShare/",
        topSearchTerms:"/stats/getTopSearchTerms/",
        mostVisitedPages:"/stats/getMostVisitedPages/"
    };
    var _StatsProxy=function(){ };
    prototypeInheritHelper.inheritPrototype(WebServiceProxy,_StatsProxy);
    _StatsProxy.prototype.getPageViews=function(callback,startDate,endDate,page){
        this. _fetchData(url.pageViews,callback,{
            "startDate":startDate,
            "endDate":endDate,
            "page":page
        });
    };
    _StatsProxy.prototype.getUniques=function(callback,startDate,endDate,page){
        this. _fetchData(url.uniques,callback,{
            "startDate":startDate,
            "endDate":endDate,
            "page":page
        });
    };
    _StatsProxy.prototype.getBrowserShare=function(callback,startDate,endDate,page){
        this. _fetchData(url.browserShare,callback,{
            "startDate":startDate,
            "endDate":endDate,
            "page":page
        });
    };
    _StatsProxy.prototype.getTopSearchTerms=function(callback,startDate,endDate,page){
        this. _fetchData(url.topSearchTerms,callback,{
            "startDate":startDate,
            "endDate":endDate,
            "page":page
        });
    };
    _StatsProxy.prototype.getMostVisitedPages=function(callback,startDate,endDate){
        this. _fetchData(url.mostVisitedPages,callback,{
            "startDate":startDate,
            "endDate":endDate
        });
    };
    return _StatsProxy;
})();

var StatsProxyManager=(function(){
    var _statsProxy=null;
    return {
          getStatsProxy:function(){
              if(_statsProxy==null)
              {
                  _statsProxy=new StatsProxy();
              }
              return _statsProxy;
          }
    }
})();