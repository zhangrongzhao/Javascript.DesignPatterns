/**
 * Created by zhangrongzhao on 2014/6/27.
 */

var Bicycle=new Interface("Bicycle",["assemble","wash","ride","repair","getPrice"]);

/*AcmeComfort*/
var AcmeComfortCruiserBicycle=function(){
    //.....
};

AcmeComfortCruiserBicycle.prototype={
    assemble:function(){
        return "Acme bicycle ";
    },
    wash:function(){},
    ride:function(){},
    repair:function(){},
    getPrice:function(){return 400;}
};

/*BicycleDecorator abstract class.*/
var BicycleDecorator=function(bicycle){
    Interface.ensureImplements(bicycle,Bicycle);
    this.bicycle=bicycle;
    this.interface=Bicycle;

    /*为组件对象中的新方法创建通道方法，外层装饰者包装内层装饰者，内层装饰者定义的新方法仍然可以被访问。*/
    //Loop through all of the attributes of this.bicycle
    // and create pass-through methods for any methods that aren't currently implemented.
    outerloop:for(var key in this.bicycle){
        //Ensure that the property is a function.
        if(typeof this.bicycle[key]!=="function")
        {
            continue outerloop;
        }

        //Ensure that the method isn't in the interface.
        for(var i= 0,len=this.interface.methods.length;i<len;i++)
        {
            if(key===this.interface.methods[i])
            {
                continue outerloop;
            }
        }

        //Add the new method.
        var that=this;
        (function(methodName){
           that[methodName]=function(){
               return that.bicycle[methodName]();
           };
        })(key);
    }
};
BicycleDecorator.prototype={
    assemble:function(){
       return this.bicycle.assemble();
    },
    wash:function(){
       return this.bicycle.wash();
    },
    ride:function(){
       return this.bicycle.ride();
    },
    repair:function(){
       return this.bicycle.repair();
    },
    getPrice:function(){
       return this.bicycle.getPrice();
    }
};

/*Concrate decorator class:HeadLightDecorator.*/
var HeadLightDecorator=function(bicycle){
    this.superClass.constructor.call(this,bicycle);
};

prototypeInheritHelper.inheritPrototype(BicycleDecorator,HeadLightDecorator);
HeadLightDecorator.prototype.assemble=function(){
    return this.bicycle.assemble()+"[with a head light]";
};

HeadLightDecorator.prototype.getPrice=function(){
    return this.bicycle.getPrice()+20;
};

/*Concrate decorator class:TrailLightDecorator.*/
var TailLightDecorator=function(bicycle){
    this.superClass.constructor.call(this,bicycle);
};

prototypeInheritHelper.inheritPrototype(BicycleDecorator,trailLightDecorator);
TailLightDecorator.prototype.assemble=function(){
    return this.bicycle.assemble()+"[ with a trail light]";
};

TailLightDecorator.prototype.getPrice=function(){
    return this.bicycle.getPrice()+30;
};
///*Demo*/
//var myBicycle=new AcmeComfortCruiserBicycle();
//alert(myBicycle.assemble());
//alert(myBicycle.getPrice());
//
//var headLightDecorator=new HeadLightDecorator(myBicycle);
//alert(headLightDecorator.assemble());
//alert(headLightDecorator.getPrice());
//
//var trailLightDecorator1=new trailLightDecorator(myBicycle);
//alert(trailLightDecorator1.assemble());
//alert(trailLightDecorator1.getPrice());
//
//var trailLightDecorator2=new trailLightDecorator(headLightDecorator);
//alert(trailLightDecorator2.assemble());
//alert(trailLightDecorator2.getPrice());

/*FrameColor Decorator*/
var FrameColorDecorator=function(bicycle,color){
    this.superClass.constructor.call(this,bicycle);
    this.frameColor=color;
};
prototypeInheritHelper.inheritPrototype(BicycleDecorator,FrameColorDecorator);
FrameColorDecorator.prototype.assemble=function(){
    return "Paint the frame "+this.frameColor+"and allow it to dry."+this.bicycle.assemble();
};
FrameColorDecorator.prototype.getPrice=function(){
    return this.bicycle.getPrice()+30.0;
};

/*LifetimeWarranty Decorator class*/
var LifetimeWarrantyDecorator=function(bicycle){
    this.superClass.Constructor.call(this,bicycle);
};

prototypeInheritHelper.inheritPrototype(BicycleDecorator,LifetimeWarrantyDecorator);
LifetimeWarrantyDecorator.prototype.repair=function(){
   return "this bicycle is covered by a lifetime warranty.Please take it to an authorized Acme Repair Center.";
};
LifetimeWarrantyDecorator.prototype.getPrice=function(){
    return this.bicycle.getPrice()+199.0;
};

/*TimedWarrantyDecorator Class.*/
var TimedWarrantyDecorator=function(bicycle,coverageLengthInYears){
    this.superClass.Constructor.call(this,bicycle);
    this.coverageLength=coverageLengthInYears;
    this.expDate=new Date();
    var coverageLengthInMs=this.coverageLength*365*24*60*60*1000;
    this.expDate.setTime(this.expDate.getTime()+coverageLengthInMs);
};

prototypeInheritHelper.inheritPrototype(BicycleDecorator,TimedWarrantyDecorator);
TimedWarrantyDecorator.prototype.repair=function(){
    var repairInstructions;
    var currentDate=new Date();
    if(currentDate<this.expDate)
    {
        repairInstructions="This bicycle is currently covered by a warranty.please take it to an authorized Repair Center.";
    }
    else
    {
        repairInstructions=this.bicycle.repair();
    }
    return repairInstructions;
};
TimedWarrantyDecorator.prototype.getPrice=function(){
    return this.bicycle.getPrice()+(40.00*this.coverageLength);
};
