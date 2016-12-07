///**
// * Created by zhangrongzhao on 2014/6/4.
// */
//var BicycleShop=window.BicycleShop||{};
//BicycleShop.prototype={
//    sell:function(model){
//        var bicycle=this.createBicycle(model);
//        bicycle.assemble();
//        bicycle.wash();
//        return bicycle;
//    },
//    createBicycle:function(model){
//        //throw new Error("Unsupported operation on an abstract class.");
//        var factory = BicycleFactoryManager.createFactory(model);
//        return factory.createBicycle();
//    }
//};
//
//var SpeedsterBicycleShop=function(){};
//prototypeInheritHelper.inheritPrototype(BicycleShop,SpeedsterBicycleShop);
//
//SpeedsterBicycleShop.prototype.createBicycle=function(model){
//    return this.superClass.createBicycle(model);
//};
//
//var LowriderBicycleShop=function(){};
//prototypeInheritHelper.inheritPrototype(BicycleShop,LowriderBicycleShop);
//
//LowriderBicycleShop.prototype.createBicycle=function(model){
//    return this.superClass.createBicycle(model);
//};
//
//var ComfortCruiserBicycleShop=function(){};
//prototypeInheritHelper.inheritPrototype(BicycleShop,ComfortCruiserBicycleShop);
//
//ComfortCruiserBicycleShop.prototype.createBicycle=function(model){
//    return this.superClass.createBicycle(model);
//};