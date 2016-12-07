/**
 * Created by zhangrongzhao on 2014/7/15.
 */
///*Tooltip实例对象与目标DOM元素耦合：每个DOM元素拥有一个Tooltip实例对象.
// 缺点：如果页面上需要Tooltip的元素成千上万，那么Tooltip实例将会消耗大量系统资源（内存），降低系统效率。
//   需要使用享元模式进行优化。
// */
//var Tooltip=function(targetElement,text){
//    this.target=targetElement;
//    this.text=text;
//
//    this.delayTimeout=null;
//    this.delay=1500;
//
//    //create the html
//    this.element=document.createElement("div");
//    this.element.style.display="none";
//    this.element.style.position="absolute";
//    this.element.className="tooltip";
//    this.element.innerHTML=text;
//    document.getElementsByTagName("body")[0].appendChild(this.element);
//
//    //Attach the events.
//    var that=this;
//    addEvent(this.target,"mouseover",function(e){that.startDelay(e);});
//    addEvent(this.target,"mouseout",function(e){that.hide();});
//};
//
//Tooltip.prototype={
//    show:function(x,y){
//        clearTimeout(this.delayTimeout);
//        this.delayTimeout=null;
//        this.element.style.left=x+"px";
//        this.element.style.top=(y+20)+"px";
//        this.element.style.display="block";
//    },
//    hide:function(){
//        clearTimeout(this.delayTimeout);
//        this.delayTimeout=null;
//        this.element.style.display="none";
//    },
//    startDelay:function(e){
//        if(this.delayTimeout==null)
//        {
//            var that=this;
//            var x= e.clientX;
//            var y= e.clientY;
//            this.delayTimeout=setTimeout(function(){that.show(x,y);},this.delay);
//        }
//    }
//};