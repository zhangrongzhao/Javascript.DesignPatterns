/**
 * Created by zhangrongzhao on 2014/7/8.
 */
var BicycleShop=window.BicycleShop||{};
BicycleShop.prototype={
    sell:function(model){
        var bicycle=this.createBicycle(model);
        bicycle.assemble();
        bicycle.wash();
        return bicycle;
    },
    createBicycle:function(model){
        //throw new Error("Unsupported operation on an abstract class.");
        var factory = BicycleFactoryManager.createFactory(model);
        return factory.createBicycle();
    }
};

/*Original AcmeBicycle factory class.*/
var AcmeBicycleShop=function(){};
prototypeInheritHelper.inheritPrototype(BicycleShop,AcmeBicycleShop);

AcmeBicycleShop.prototype.createBicycle=function(model,options){
    //Instantiate the bicycle object.
    var oBicycle=new AcmeBicycleShop.models[model]();
    //Iterate through the options and instantiate decorators.
    for(var i= 0,len=options.length;i<len;i++)
    {
        var decoratorConstructor=AcmeBicycleShop.options[options[i].name];
        if(typeof decoratorConstructor!=="function")
        {
           throw new Error("Decorator "+options[i].name+"not found.");
        }
        var argument=options[i].arg;
        oBicycle=new decoratorConstructor(oBicycle,argument);
    }
    Interface.ensureImplements(oBicycle,Bicycle);
    return oBicycle;
};

AcmeBicycleShop.models={
    "The Speedster":AcmeSpeederSter,
    "The Lowrider":AcmeLowrider,
    "The Flatlander":AcmeFlatlander,
    "The Comfort Crusier":AcmeComfortCruiser
};

AcmeBicycleShop.options={
    "headlight":HeadLightDecorator,
    "taillight":TailligthDecorator,
    "bell":BellDecorator,
    "basket":BasketDecorator,
    "color":FrameColorDecorator,
    "lifetime warranty":LifetimeWarrantyDecorator,
    "timed warranty":TimedWarrantyDecorator
};


///*直接实例化,缺点：与具体子类耦合比较紧，不利于扩展。*/
//var oMyBicycle=new AcmeSpeeder();
//oMyBicycle=new FrameColorDecorator(oMyBicycle,"blue");
//oMyBicycle=new HeadLightDecorator(mybicycle);
//oMyBicycle=new TailLightDecorator(oMyBicycle);
//oMyBicycle=new TimedWarrantyDecorator(oMyBicycle);
//oMyBicycle=new TimedWarrantyDecorator(oMyBicycle,2);

/*使用工厂实例化：*/
var alecsCruisers=new AcmeBicycleShop();
var oMyBicycle=alecsCruisers.createBicycle("The Speedster",[{name:"color",arg:"blue"},
                                                            {name:"headlight"},
                                                            {name:"taillight"},
                                                            {name:"timed warranty",arg:2}
                                                           ]);

/*函数装饰者*/
function upperCaseDecorator(func){
   return function(){
       return func.apply(this,arguments).toUpperCase();
   }
}

function getDate(){
    return (new Date()).toString();
}

var getDateCaps = upperCaseDecorator(getDate);
alert(getDateCaps());

//function getOriginalString(str)
//{
//    return str;
//}

//var getUpperResult=upperCaseDecorator(getOriginalString);
//alert(getUpperResult("adfadsfasd"));
