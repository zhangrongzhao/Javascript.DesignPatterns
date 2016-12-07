/**
 * Created by zhangrongzhao on 2014/7/18.
 */
/*DynamicProxy abstract class,incomplete.*/
var DynamicProxy=(function(){
    var _DynamicProxy=function(){
        this.args=arguments;
        this.initialized=false;

        //this.class属性表示本体类。
        if(typeof this.class!="function")
        {
            throw new Error("DynamicProxy:the class attribute must be set before calling the super-class constructor.");
        }

        //为本体类（this.class）中的没一个方法创建对应的代理方法
        //create the methods needed to implement the same interface .
        for(var key in this.class.prototype)
        {
            //Ensure that the property is a function.
            if(typeof this.class.prototype[key] !=="function")
            {
                continue;
            }

            //add the method.
            var that=this;
            (function(methodName){
                that[methodName]=function(){
                  if(!that.initialized)
                  {
                      return;
                  }
                  return that.subject[methodName].apply(that.subject,arguments);
                };
            })(key);
        }
    };
    _DynamicProxy.prototype={
        _initialize:function(){
            this.subject={};
            this.class.apply(this.subject,this.args);
            this.subject.__proto__=this.class.prototype;

            var that=this;
            this.interval=setInterval(function(){that._checkInitialization();},100);
        },
        _checkInitialization:function(){
            if(this._isInitialized())
            {
                clearInterval(this.interval);
                this.initialized=true;
            }
        },
        _isInitialized:function(){
            throw new Error("Unsupported operation on an abstract class.");
        }
    };
    return _DynamicProxy;
})();

/*TestProxy class.*/
var TestProxy=(function(){
    var _TestProxy=function() {
        this.superClass.constructor.apply(this,arguments);
        this.class = TextClass;
        var that = this;

        addEvent($("test-link"),"click",function(){that._initialize();});
    };
    prototypeInheritHelper.inheritPrototype(DynamicProxy,_TestProxy);
    _TestProxy.prototype._isInitialized=function(){
         //Initialization condition goes here.
    };
    return _TestProxy;
})();