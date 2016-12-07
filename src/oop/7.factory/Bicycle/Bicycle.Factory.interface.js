///**
// * Created by zhangrongzhao on 2014/6/4.
// */
//var BicycleFactoryInterface=new Interface("BicycleFactory",["CreateBicycle"]);
//
///*SpeedsterFactory*/
//var SpeedsterFactory=function(){};
//SpeedsterFactory.prototype={
//    createBicycle:function(){
//        return new Speedster();
//    }
//};
//
///*SpeedsterFactory*/
//var LowriderFactory=function(){};
//LowriderFactory.prototype={
//    createBicycle:function(){
//        return new Lowrider();
//    }
//};
//
///*SpeedsterFactory*/
//var ComfortCruiserFactory=function(){};
//ComfortCruiserFactory.prototype={
//    createBicycle:function(){
//        return new ComfortCruiser();
//    }
//};
//
//
///*ACME*/
//
//var AcmeFactory=function(){};
//AcmeFactory.prototype={
//    createBicycle:function(model){
//        var bicycle;
//        switch(model)
//        {
//            case "Speedster":bicycle= new Speedster();break;
//            case "Lowrider":bicycle=new Lowrider();break;
//            case "ComfortCruiser":
//            default:bicycle = new ComfortCruiser();break;
//        }
//        Interface.ensureImplements(bicycle,Bicycle);
//        return bicycle;
//    }
//};
//
//var GeneralProductsFactory=function(){};
//GeneralProductsFactory.prototype={
//    createBicycle:function(model){
//        var bicycle;
//        switch(model)
//        {
//            case "Speedster":bicycle= new Speedster();break;
//            case "Lowrider":bicycle=new Lowrider();break;
//            case "ComfortCruiser":
//            default:bicycle = new ComfortCruiser();break;
//        }
//        Interface.ensureImplements(bicycle,Bicycle);
//        return bicycle;
//    }
//};
