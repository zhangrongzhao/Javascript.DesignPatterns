/**
 * Created by zhangrongzhao on 2014/6/9.
 */
//addEventListener(element,"click",getBeerById);

//function getBeerById(e)
//{
//    var id = this.id;//与依赖对象紧密耦合，
//    asyncRequest("GET","beer.uri?id="+id,function(response){
//        console.log();//回调函数具体执行，耦合度比较高，如果有
//    });
//}

///************************改进**************************************/
///************************解除耦合，使其独立*************************/
///************************改进**************************************/
//function getBeerById(id,callback)
//{
//    asyncRequest("GET","beer.url?id="+id,function(response){
//        callback(response);
//    });
//}
//
///*桥接模式*/
//addEvent(element,"click",getBeerByIdBridge);
//function getBeerByIdBridge(e)
//{
//    getBeerById(this.id,function(responseText){
//        console.log();
//    });
//}

/***************特权方法作为桥接，访问私有变量*****************************/
//var Public=function(){
//    var secret=3;
//    //特权方法作为桥接，访问私有变量。
//    this.privilegedGetter=function(){
//        return secret;
//    };
//};
//
//var o=new Public();
//var data= o.privilegedGetter();
//
///***************桥接方法连接多个类*****************************/
//var Class1=function(a,b,c,d){
//    this.a=a;
//    this.b=b;
//    this.c=c;
//    this.d=d;
//};
//
//var Class2=function(d){
//    this.d=d;
//};
//
//var BridgeClass=function(a,b,c,d){
//    this.one=new Class1(a,b,c);
//    this.two=new Class2(d);
//};

/***************构建Xhr连接队列*****************************/

