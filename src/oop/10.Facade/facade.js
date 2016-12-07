/**
 * Created by zhangrongzhao on 2014/6/26.
 */
//function addEvent(element,type,fn){
//   if(window.addEventListener)
//   {
//       element.addEventListener(type,fn,false);
//   }
//   else if(window.attachEvent)
//   {
//       element.attachEvent("on"+type,fn);
//   }
//   else
//   {
//       el['on'+type]=fn;
//   }
//}

//var DED=window.DED||{};
//DED.util={
//    stopPropagation:function(e){
//       if(e.stopPropagation)
//       {
//           //W3 interface
//           e.stopPropagation();
//       }
//       else
//       {
//           //IE's interface
//           e.cancelBubble=true;
//       }
//    },
//    preventDefault:function(e){
//       if(e.preventDefault)
//       {
//           //W3 interface
//           e.preventDefault();
//       }
//       else
//       {
//           //IE's interface
//           e.returnValue=false;
//       }
//    },
//    stopEvent:function(e){
//        DED.util.stopPropagation(e);
//        DED.util.preventDefault(e);
//    }
//};

//setStyle(["foo","bar","baz"],"color","red");
//function setStyle(elements,property,value){
//    for(var i=0;i<elements.length;i++)
//    {
//        elements[i].style[property]=value;
//    }
//}
//
//setCss(["foo","bar","baz"],{position:"absolute",top:"50px",left:"300px"});
//function setCss(elements,oStyle){
//   for(var property in oStyle)
//   {
//       if(!oStyle.hasOwnProperty(property)) continue;
//       setStyle(elements,property,oStyle[property]);
//   }
//}

//var DED=window.DED||{};
//var DED.util=DED.util||{};
//var DED.util.Event={
//    //bulk goes here.
//    getEvent:function(e){
//        return e||window.event;
//    },
//    getTarget:function(e){
//        return e.target|| e.srcElement;
//    },
//    stopPropagation:function(e){
//        if(e.stopPropagation)
//        {
//            e.stopPropagation();
//        }
//        else
//        {
//            e.cancelBubble=true;
//        }
//    },
//    preventDefault:function(e){
//        if(e.preventDefault)
//        {
//            e.preventDefault();
//        }
//        else
//        {
//            e.returnValue=false;
//        }
//    },
//    stopEvent:function(e){
//        this.stopPropagation(e);
//        this.preventDefault(e);
//    }
//};




