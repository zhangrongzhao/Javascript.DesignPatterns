/**
 * Created by zhangrongzhao on 2014/6/10.
 */
/*添加数组的两个方法：foreach,filter*/
if(!Array.prototype.forEach)
{
    Array.method("foreach",function(fn,thisObj){
        var scope=thisObj||window;
        for(var i= 0,len=this.length;i<len;++i){
            fn.call(scope,this[i],i,this);
        }
    });
}

if(!Array.prototype.filter)
{
    Array.method("filter",function(fn,thisObj){
        var scope=thisObj||window;
        var a=[];
        for(var i= 0,len=this.length;i<len;i++)
        {
            if(!fn.call(scope,this[i],i,this))
            {
                continue;
            }
            a.push(this[i]);
        }
        return a;
    });
}