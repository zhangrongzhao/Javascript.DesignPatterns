/**
 * Created by zhangrongzhao on 2014/7/9.
 */

///*Car un-optimized.*/
//
//var Car=function(make,model,year,owner,tag,renewDate){
//    this.make=make;//品牌
//    this.model=model;//型号
//    this.year=year;//出厂日期
//    this.owner=owner;//车主
//    this.tag=tag;//车牌号
//    this.renewDate=renewDate;//最近登记日期。
//};
//
//Car.prorotype={
//    getMake:function(){
//        return this.make;
//    },
//    getModel:function(){
//        return this.model;
//    },
//    getOwner:function(){
//        return this.owner;
//    },
//    TransferOwnership:function(newOwner,newTag,newRenewDate){
//        this.owner=newOwner;
//        this.tag=newTag;
//        this.renewDate=newRenewDate;
//    },
//    renewRegistration:function(newRenewDate){
//        this.renewDate=newRenewDate;
//    },
//    isRegistrationCurrent:function(){
//        var today=new Date();
//        return today.getTime()<Date.parese(this.renewDate);
//    }
//};