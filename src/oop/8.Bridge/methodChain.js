/**
 * Created by zhangrongzhao on 2014/6/10.
 */

/*method chain :链式调用*/
Function.prototype.method=function(name,fn){
    this.prototype[name]=fn;
    return this;
};

