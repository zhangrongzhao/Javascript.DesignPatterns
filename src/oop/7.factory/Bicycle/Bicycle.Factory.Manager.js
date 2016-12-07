///**
// * Created by zhangrongzhao on 2014/6/4.
// */
//var BicycleFactoryManager=window.BicycleFactoryManager||{};
//BicycleFactoryManager.prototype={
//    createFactory:function(model){
//        var factory;
//        switch(model){
//            case "Speedster":factory=new SpeedsterFactory(); break;
//            case "Lowrider":factory=new LowriderFactory(); break;
//            case "ComfortCruiser":
//            default:factory=new ComfortCruiserFactory(); break;
//        }
//        Interface.ensureImplements(factory,BicycleFactoryInterface);
//        return factory;
//    }
//};