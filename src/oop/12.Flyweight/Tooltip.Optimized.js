/**
 * Created by zhangrongzhao on 2014/7/15.
 */
/*使用享元模式：Tooltip实例对象与目标DOM元素剥离开来，解除耦合。所有目标DOM元素共享一个Tooltip实例对象*/
/*使用TooltipManager管理Tooltip实例对象，避免Tooltip的实例个数。*/
var TooltipManager=(function(){
    var _storedInstance=null;
    var Tooltip=function(){
        this.delayTimeout=null;
        this.delay=1500;

        //create the html
        this.element=document.createElement("div");
        this.element.style.display="none";
        this.element.style.position="absolute";
        this.element.className="tooltip";

        document.getElementsByTagName("body")[0].appendChild(this.element);
    };
    Tooltip.prototype={
        show:function(x,y,text){
            clearTimeout(this.delayTimeout);
            this.delayTimeout=null;
            this.element.style.left=x+"px";
            this.element.style.top=(y+20)+"px";
            this.element.style.display="block";
            this.element.innerHTML=text;
        },
        hide:function(){
            clearTimeout(this.delayTimeout);
            this.delayTimeout=null;
            this.element.style.display="none";
        },
        startDelay:function(e,text){
            if(this.delayTimeout==null)
            {
                var that=this;
                var x= e.clientX;
                var y= e.clientY;
                this.delayTimeout=setTimeout(function(){that.show(x,y,text);},this.delay);
            }
        }
    };

    return {
        getTooltip:function(){
            if(_storedInstance==null)
            {
                _storedInstance=new Tooltip();
            }
            return _storedInstance;
        },
        addTooltip:function(targetElement,text){
            var tooltip= this.getTooltip();
            addEvent(targetElement,"mouseover",function(e){tooltip.startDelay(e,text)});
            addEvent(targetElement,"mouseout",function(e){tooltip.hide();});
        }
    };
})();