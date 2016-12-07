/**
 * Created by zhangrongzhao on 2014/7/9.
 */
/*Car un-optimized.*/
var Car=function(make,model,year){
    this.make=make;//品牌
    this.model=model;//型号
    this.year=year;//出厂日期
};

Car.prorotype={
    getMake:function(){
        return this.make;
    },
    getModel:function(){
        return this.model;
    },
    getYear:function(){
        return this.year;
    }
};

var CarFactory=(function(){
    var createdCars={};
    return {
        createCar:function(make,model,year){
          if(createdCars[make+"-"+model+"-"+year])
          {
              return createdCars[make+"-"+model+"-"+year];
          }
          else
          {
              var car=new Car(make,model,year);
              createdCars[make+"-"+model+"-"+year]=car;
              return car;
          }
        }
    };
})();

/*CarOwnerRecord*/
var CarOwnerRecord=function(make,model,year,owner,tag,renewDate){
    this.owner=owner;
    this.tag=tag;
    this.renewDate=renewDate;
    this.car=CarFactory.createCar(make,model,year);
};

/*CarOwnerRecordManager*/
var carOwnerRecordManager=(function(){
    var carOwnerRecordDatabase={};
    return {
        addRecord:function(make,model,year,owner,tag,renewDate){
            var record=new CarOwnerRecord(make,model,year,owner,tag,renewDate);
            carOwnerRecordDatabase[tag]=record;
            return record;
        },
        TransferOwnership:function(tag,newOwner,newTag,newRenewDate){
            var record=carOwnerRecordDatabase[tag];
            if(!record) return;
            record.owner=newOwner;
            record.tag=newTag;
            record.renewDate=newRenewDate;
        },
        renewRegistration:function(tag,newRenewDate){
            var record=carOwnerRecordDatabase[tag];
            if(!record) return;
            record.renewDate=newRenewDate;
        },
        isRegistrationCurrent:function(tag){
            var record=carOwnerRecordDatabase[tag];
            if(!record) return;
            var today=new Date();
            return today.getTime()<Date.parese(record.renewDate);
        }
    };
})();

carOwnerRecordManager.createCarOwnerRecord();