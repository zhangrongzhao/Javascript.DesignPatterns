/////**
//// * Created by zhangrongzhao on 2014/6/3.
//// */
/////*链式调用*/
/////*原始方法一*/
////function $(){
////    var elements=[];
////    for(var i= 0,len=arguments.length;i<len;i++)
////    {
////        var element=arguments[i];
////        if(typeof element ==="string")
////        {
////            element=document.getElementsById(element);
////        }
////        elements.push(element);
////    }
////    return elements;
////}
////
/////*改进方法2*/
////(function(){
////    //Use a private class.
////    function _$(els) {
////        this.elements = [];
////        for (var i = 0, len = els.length; i < len; i++) {
////            var element = els[i];
////            if (typeof element === "string") {
////                element = document.getElementById(element);
////            }
////            this.elements.push(element);
////        }
////    }
////
////    //The public interface remains the same.
////    window.$=function(){
////        return new _$(arguments);
////    };
////})();
////
/////*改进方法3*/
////(function(){
////    function _$(els){
////        // instance property and method
////    }
////
////    _$.prototype={
////        each:function(fn){
////            for(var i= 0,len=this.elements.length;i<len;i++)
////            {
////                fn.apply(this,[this.elements[i]]);
////            }
////            return this;
////        },
////        setStyle:function(prop,val){
////            this.each(function(element){
////                element[prop]=val;
////            });
////            return this;
////        },
////        show:function(){
////            var that=this;
////            this.each(function(element){
////                that.setStyle('display','block');
////            });
////            return this;
////        },
////        addEvent:function(type,fn){
////            var add=function(element){
////                if(window.addEventListener){
////                    element.addEventListener(type,fn,false);
////                }
////                else if(window.attachEvent)
////                {
////                    element.attachEvent("on"+type,fn);
////                }
////            };
////            this.each(function(element){
////                add(element);
////            });
////            return this;
////        }
////    };
////    window.$=function(){
////        return new _$(arguments);
////    };
////})();
////
/////*链式调用DEMO*/
////$(window).addEvent("load",function(){
////    $("test-1","test-2")
////        .show()
////        .setStyle("color","red")
////        .addEvent("click",function(e){
////            $(this).setStyle("color","green");
////        });
////});
//
////Include syntactic sugar to help the development of the interface.
//Function.prototpye.method=function(name,fn){
//    this.prototype[name]=fn;
//};
//(function(){
//    function _$(els){
//        //...
//    }
//    _$.method("addEvent",function(type,fn){
//        //...
//    }).method("getEvent",function(e){
//        //...
//    }).method("addClass",function(className){
//        //...
//    }).method("removeClass",function(className){
//        //...
//    }).method("replaceClass",function(oldClass,newClass){
//        //...
//    }).method("hasClass",function(className){
//        //...
//    }).method("getStyle",function(prop){
//        //...
//    }).method("setStyle",function(prop,val){
//        //...
//    }).method("load",function(uri,method){
//        //...
//    });
//
//    window.installHelper=function(scope,interface){
//        scope[interface]=function(){
//            return _$(arguments);
//        }
//    };
//})();
//
////installHelper(window,"$");
////$("example").show();
//
////define a namespace without overwriting it if it already exists.
////window.com=window.com||{};
////com.example=com.example||{};
////com.example.util=com.example.util||{};
////
////installHelper(com.example.util,"get");
////
////(function(){
////    var get=com.example.util.get;
////    get("example").addEvent("click",function(e){
////        get(this).addClass("hello");
////    });
////})();
//
//
//
//
