/**
 * Created by zhangrongzhao on 2014/5/28.
 */
/*原型链继承:类式继承*/
var prototypeInheritHelper=(function(){
    var _clone=function(original){
        function _T(){}
        _T.prototype=original;
        return new _T();
    };
    var _inheritPrototype=function(superClass,subClass){
        subClass.prototype=_clone(superClass.prototype);
        subClass.prototype.constructor=subClass;

        subClass.prototype.superClass=superClass.prototype;
        if(superClass.prototype.constructor==Object.prototype.constructor)
        {
            superClass.prototype.constructor=superClass;
        }
    };

    return {
        inheritPrototype:_inheritPrototype,
        clone:_clone
    };
})();

////DEMO:
//var Person=function(name){
//    this.name=name;
//};
//
//Person.prototype.getName=function(){
//    return this.name;
//};
//
//var Author=function(name,age){
//   this.superClass.constructor.call(this,name);
//   this.age=age;
//};
//
//prototypeInheritHelper.inheritPrototype(Person,Author);
//
//Author.prototype.getName=function(){
//   var superName=this.superClass.getName.call(this);
//   return superName+"-"+this.name;
//};
//
//var author=new Author("Nicolas",35);
//alert(author.getName());

/*原型继承*/
//var person={
//    getName:function(){
//        return this.name;
//    }
//};
//
//var author=[];
//author[0]=prototypeInheritHelper.clone(person);
//author[0].name="author1";
//
//author[1]=prototypeInheritHelper.clone(person);
//author[1].name="author2";
//
//alert(author[0].getName());
//alert(author[1].getName());

/*DEMO2:*/
//var ComponentObj={
//    string1:"string1",
//    child:{
//        bool:true,
//        num:10
//    },
//    createChild:function(){
//        return {
//            bool:false,
//            num:0
//        }
//    }
//};
//
//var componentClone=prototypeInheritHelper.clone(ComponentObj);
//componentClone.string1="componentClone.string1";
//componentClone.child=ComponentObj.createChild();
//componentClone.child.num=15;
//componentClone.child.bool=true;


/*Mixin:混入，将原型中的方法复制给目标原型*/

var mixinHelper=(function(){
    var _mixin=function(givingClass,receivingClass){
        if(arguments[2])//Only give certain methods.
        {
           for(var i=2;i<arguments.length;i++)
           {
               receivingClass.prototype[arguments[i]]=givingClass.prototype[arguments[i]];
           }
        }
        else //Give all the methods.
        {
            for(methodName in givingClass.prototype)
            {
                if(!receivingClass.prototype.hasOwnProperty(methodName))
                {
                    receivingClass.prototype[methodName]=givingClass.prototype[methodName];
                }
            }
        }
    };
    return {
        mixin:_mixin
    }
})();






