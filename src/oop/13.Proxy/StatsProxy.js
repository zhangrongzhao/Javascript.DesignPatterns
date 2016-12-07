///**
// * Created by zhangrongzhao on 2014/7/15.
// */
///*PageStats interface*/
//var PageStatsInterface=new Interface("PageStats",["getPageViews","getUniques","getBrowserShare","getTopSearchTerms","getMostVisitedPages"]);
//
///*remote proxy:远程代理*/
//var StatsProxy=(function(){
//    /*Private attributes.*/
//    var xhrHandler=XhrManager.createAjaxHandler();
//    var url={
//        pageViews:"/stats/getPageViews/",
//        uniques:"/stats/getUniques/",
//        browserShare:"/stats/getBrowserShare/",
//        topSearchTerms:"/stats/getTopSearchTerms/",
//        mostVisitedPages:"/stats/getMostVisitedPages/"
//    };
//
//    /*Private methods.*/
//    function _xhrFailure(){
//        throw new Error("StatsProxy:Asynchronous request for stats failed.");
//    }
//    function _fetchData(url,dataCallback,startDate,endDate,page){
//        var callback={
//            success:function(responseText){
//                var stats=eval("("+responseText+")");
//                dataCallback(stats);
//            },
//            failure:_xhrFailure
//        };
//
//        var getVars=[];
//        if(startDate!=undefined)
//        {
//            getVars.push("startDate="+encodeURIComponent(startDate));
//        }
//
//        if(endDate!=undefined)
//        {
//            getVars.push("endDate="+encodeURIComponent(endDate));
//        }
//
//        if(page!=undefined)
//        {
//            getVars.push("page="+page);
//        }
//        if(getVars.length>0)
//        {
//            url=url+"?"+getVars.join("&");
//        }
//        xhrHandler.request("GET",url,callback);
//    }
//
//    /*Public methods.*/
//    return{
//        getPageViews:function(callback,startDate,endDate,page){
//            _fetchData(url.pageViews,callback,startDate,endDate,page);
//        },
//        getUniques:function(callback,startDate,endDate,page){
//            _fetchData(url.uniques,callback,startDate,endDate,page);
//        },
//        getBrowserShare:function(callback,startDate,endDate,page){
//            _fetchData(url.browserShare,callback,startDate,endDate,page);
//        },
//        getTopSearchTerms:function(callback,startDate,endDate,page){
//            _fetchData(url.topSearchTerms,callback,startDate,endDate,page);
//        },
//        getMostVisitedPages:function(callback,startDate,endDate){
//            _fetchData(url.mostVisitedPages,callback,startDate,endDate);
//        }
//    };
//})();
