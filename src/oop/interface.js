/**
 * Created by zhangrongzhao on 2014/5/26.
 */
/***************接口说明********************************/
/*
*   interface composite{
*     function add(child);
*     function remove(child);
*     function getChild(index);
*   };
*
*   interface FormItem{
*      function save();
*   };
* */
/***************注释法********************************/
//var CompositeForm=function(id,method,action){
//    //TODO something;
//};
//
///*composite members*/
//CompositeForm.prototype.add=function(child){};
//CompositeForm.prototype.remove=function(child){};
//CompositeForm.prototype.getChild=function(index){};
//
///*FormItem members*/
//CompositeForm.prototype.save=function(){};

/***************属性检查法，模仿实现接口************************/
///*思路：对象构造时，声明自己实现了接口。检查对象*/
///*缺点：只能检查接口名称，接口中的方法仍然不能检查，没有明确的错误信息抛出*/
//var interfaceImplementationHelper=(function(){
//    var _implementInterfaces=function(targetObj){
//        for(var i=1;i<arguments.length;i++)
//        {
//            var interfaceName=arguments[i];
//            var interfaceFound=false;
//            //检测对象接口声明数组。
//            for(var j=0;j<targetObj.implementInterfaces.length;j++){
//                 if(targetObj.implementInterfaces[j]==interfaceName)
//                 {
//                     interfaceFound = true;
//                     break;
//                 }
//            }
//            if(!interfaceFound)
//            {
//               return false;
//            }
//        }
//        return true;
//    };
//
//    return {
//        implementInterfaces:_implementInterfaces
//    };
//})();
//
//
//var CompositeForm=function(id,method,action){
//    //声明自己实现了指定接口
//    this.implementInterfaces=["composite","FormItem"];
//};
//
//var compositeForm=new CompositeForm();
//interfaceImplementationHelper.implementInterfaces(compositeForm,"composite","FormItem");

/***************鸭式辩型：严格接口方法检查************************/
/*思路：1.声明接口对象，及其接口中的方法声明
*      2.检查目标对象，是否实现了接口声明的方法
* */

//
//var interfaceImplementationHelper=(function(){
//    var _Interface=function(interfaceName,methodDeclarations){
//        if(arguments.length!=2)
//        {
//            throw new Error(" Interface constructor called with "
//                            + arguments.length
//                            + " arguments,but expected exactly 2.");
//        }
//        this.interfaceName=interfaceName;
//        this.methodDeclarations=[];//array
//
//        for(var i=0;i<methodDeclarations.length;i++)
//        {
//            if((typeof methodDeclarations[i]) != "string")
//            {
//                throw new Error("interface constructor expects method names to be passed in as a string ");
//            }
//            this.methodDeclarations.push(methodDeclarations[i]);
//        }
//    };
//
//    var _ensureImplements=function(targetObj){
//        //TODO：严格检查接口
//        if(arguments.length<2)
//        {
//           throw new Error(" Function interfaceImplementationHelper.ensureImplements called with "
//                           + arguments.length
//                           +" arguments,but expected at least 2.");
//        }
//
//        for(var i=1;i<arguments.length;i++)
//        {
//             var interfaceObj=arguments[i];//接口对象
//             if(interfaceObj.constructor!=_Interface)
//             {
//                 throw new Error(" Function interfaceImplementationHelper.ensureImplements " +
//                                 " expects arguments two and above to be instances of _Interface.");
//             }
//             //TODO:检查接口方法是否在目标对象中被实现
//             for(var j=0;j<interfaceObj.methodDeclarations.length;j++)
//             {
//                 var methodDelcaration=interfaceObj.methodDeclarations[j];
//                 if(!targetObj[methodDelcaration]||
//                    typeof targetObj[methodDelcaration]!="function")
//                 {
//                     throw new Error(" Function interfaceImplementationHelper.ensureImplements: object"
//                                    +" does not implement the interface "
//                                    + interfaceObj.interfaceName
//                                    +" interface.Method"
//                                    + methodDelcaration
//                                    +"was not found.");
//                 }
//             }
//        }
//    };
//
//    return {
//        Interface:_Interface,
//        ensureImplements:_ensureImplements
//    }
//})();


var Interface = function(interfaceName,methodDeclarations){
    if(arguments.length!=2)
    {
        throw new Error(" Interface constructor called with "
            + arguments.length
            + " arguments,but expected exactly 2.");
    }
    this.interfaceName=interfaceName;
    this.methodDeclarations=[];//array

    for(var i=0;i<methodDeclarations.length;i++)
    {
        if((typeof methodDeclarations[i]) != "string")
        {
            throw new Error("Interface constructor expects method names to be passed in as a string ");
        }
        this.methodDeclarations.push(methodDeclarations[i]);
    }
};

Interface.ensureImplements=function(targetObj){
    //TODO：严格检查接口
    if(arguments.length<2)
    {
        throw new Error(" Function Interface.ensureImplements called with "
            + arguments.length
            +" arguments,but expected at least 2.");
    }

    for(var i=1;i<arguments.length;i++)
    {
        var interfaceObj=arguments[i];//接口对象
        if(interfaceObj.constructor!=Interface)
        {
            throw new Error(" Function Interface.ensureImplements " +
                " expects arguments two and above to be instances of Interface.");
        }
        //TODO:检查接口方法是否在目标对象中被实现
        for(var j=0;j<interfaceObj.methodDeclarations.length;j++)
        {
            var methodDelcaration=interfaceObj.methodDeclarations[j];
            if(!targetObj[methodDelcaration]||
                typeof targetObj[methodDelcaration]!="function")
            {
                throw new Error(" Function Interface.ensureImplements: object"
                    +" does not implement the interface "
                    + interfaceObj.interfaceName
                    +" interface.Method"
                    + methodDelcaration
                    +"was not found.");
            }
        }
    }
};


//var compositeInterface=new Interface("composite",["add","remove","getChild"]);
//var formItemInterface=new Interface("FormItem",["save"]);
//
//var CompositeForm=function(){
//  //
//};
//
//CompositeForm.prototype.add=function(child){};
//CompositeForm.prototype.remove=function(child){};
//CompositeForm.prototype.getChild=function(index){};
//
//CompositeForm.prototype.save=function(){};
//
//var compositeForm=new CompositeForm();
//
//Interface.ensureImplements(compositeForm,compositeInterface,formItemInterface);

/*Demo*/
//var resultInterface=new Interface("result",["getDate","getResults"]);
//
//var ResultFormatter=function(resultObject){
//    Interface.ensureImplements(resultObject,resultInterface);
//    this.resultObj=resultObject;
//};
//ResultFormatter.prototype.renderResult=function(){
//    var date=this.resultObj.getDate();
//    var result=this.resultObj.getResult();
//};
