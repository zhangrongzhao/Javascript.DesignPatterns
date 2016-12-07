/**
 * Created by zhangrongzhao on 2014/5/26.
 */
/**************************************************/
var prototypeInheritHelper=(function(){
    var _createNewPrototypeObj=function(originalPrototype){
        function _T(){}
        _T.prototype=originalPrototype;
        return new _T();
    };
    return {
         inheritPrototype:function(superType,subType){
             subType.prototype=_createNewPrototypeObj(superType.prototype);
             subType.prototype.constructor=subType;
             /*为子类添加superClass属性，直接指向父类原型：可以base.method()*/
             subType.superClass=superType.prototype;
             /*确保超类的构造函数能够正确的设置*/
             if(superType.prototype.constructor==Object.prototype.constructor)
             {
                 superType.prototype.constructor=superType;
             }
         }
    };
})();
/**************************************************/
var Person=function(name){
    this.name=name;
};
Person.prototype={
    constructor:Person,
    getName:function(){return this.name}
};

var Author=function(name,age){
    this.superClass.constructor.call(this,name);
    this.age=age;
};

prototypeInheritHelper.inheritPrototype(Person,Author);
Author.prototype.getName=function(){
    var superName=this.superClass.getName.call(this);
    return this.name+superName;
};

Author.prototype.getAge = function(){
    return this.age;
};






