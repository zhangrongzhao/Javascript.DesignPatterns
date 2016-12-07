/**
 * Created by zhangrongzhao on 2014/7/16.
 */
/*Directory interface*/
var Directory=new Interface("Directory",["showPage"]);

/*PersonalDirectory class,the real class.*/
var PersonalDirectory=(function(){
    var _PersonalDirectory=function(parent){
        this.xhrHandler=XhrManager.createAjaxHandler();
        this.parent=parent;
        this.data=null;
        this.currentPage=null;

        var that=this;
        var callback={
            success:that._configure,
            failure:function(){
                throw new Error("PersonalDirectory:failure in data retrieval.");
            }
        };
        this.xhrHandler.request("GET","directoryData.php",callback);
    };
    _PersonalDirectory.prototype={
        _configure:function(responseText){
            this.data=eval("("+responseText+")");
            this.currentPage="a";
        },
        showPage:function(page){
            $("page-"+this.currentPage).style.display="none";
            $("page-"+page).style.display="block";
        }
    };
    return _PersonalDirectory;
})();

/*DirectoryProxy class. just the outline.*/
var DirectoryProxy=(function(){
    var _DirectoryProxy=function(parent){
        this.parent=parent;
        this.directory=null;
        this.warning=null;
        this.interval=null;
        this.initialized=false;
        var that=this;
        addEvent(parent,"mouseover",that._initialize);
    };
    _DirectoryProxy.prototype={
        _initialize:function(){
            this.warning=document.createElement("div");
            this.parent.appendChild(this.warning);
            this.warning.innerHTML="The company directory is loading...";

            this.directory=new PersonalDirectory(this.parent);
            var that=this;
            this.interval=setInterval(function(){that._checkInitialization();},100);
        },
        _checkInitialization:function(){
            if(this.directory.currentPage!=null)
            {
                clearInterval(this.interval);
                this.initialized=true;
                this.parent.removeChild(this.warning);
            }
        },
        showPage:function(page){
            if(!this.initialized)
            {
                return ;
            }
            return this.directory.showPage(page);
        }
    };
    return _DirectoryProxy;
})();