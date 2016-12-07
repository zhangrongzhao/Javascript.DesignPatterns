///**
// * Created by zhangrongzhao on 2014/5/23.
// * 原型+借用构造+寄生
// */
//
///****************************************************************/
///*寄生：获取纯净对象*/
//function createNewPrototypeObj(originalPrototypeObj)
//{
//    function _T(){}/*使用临时构造函数*/
//    _T.prototype=originalPrototypeObj;/*设置临时构造函数的原型*/
//    return new _T();/*返回纯净对象，以备使用*/
//}
//
///*继承原型，使用继承链*/
//function inheritPrototype(superType,subType)
//{
//    /*
//    subType.prototype=createNewPrototypeObj(superType.prototype);
//    subType.prototype.constructor=subType;
//     */
//    subType.prototype=Object.create(superType.prototype);
//}
///****************************************************************/
//function SuperType(name){
//    this.name=name;
//}
//
//SuperType.prototype.sayName=function(){alert(this.name);};
//SuperType.prototype.sayHello=function(){alert("hello!")};
//
//function SubType(name){
//    /*借用构造，继承实例属性*/
//    SuperType.apply(this,[name]);
//    this.friends=[];
//}
//
//inheritPrototype(SuperType,SubType);
//
///*重写sayName方法*/
//SubType.prototype.sayName=function(){alert("111111");};
///*添加新的方法*/
//SubType.prototype.setFriends=function(friend){
//    this.friends.push(friend);
//};
//SubType.prototype.getFriends=function(){
//   alert(this.friends.join(","));
//};
//
//var superTypeInstance=new SuperType("SuperInstance");
//var subTypeInstance=new SubType("SubInstance");
///*
//superTypeInstance.sayName();
//subTypeInstance.sayName();
// */
//
//subTypeInstance.setFriends("Nicolas");
//subTypeInstance.setFriends("Greg");
//subTypeInstance.getFriends();
//
///*
//alert(superTypeInstance instanceof SuperType);
//alert(subTypeInstance instanceof SubType);
//alert(subTypeInstance instanceof SuperType);
// */