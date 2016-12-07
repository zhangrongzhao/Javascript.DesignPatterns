/**
 * Created by zhangrongzhao on 2014/5/30.
 */
/*Singleton*/

/*单体作为命名空间使用*/
//var Edu24ol=window.Edu24ol||{};
//Edu24ol.RegisterPage={
//    //Constants.
//    FORM_ID:"register-form",
//    OUTPUT_ID:"register-results",
//
//    //Form Handling methods
//    handleSubmit:function(e){
//        e.preventDefault(); //Stop the normal form submission.
//
//        var data={};
//        var inputs=Edu24ol.RegisterPage.formEl.getElementsByTagName("input");
//
//        //Collect the values of the input fields in the form .
//        for(var i= 0,len=inputs.length;i<len;i++)
//        {
//            data[inputs[i].name]=inputs[i].value;
//        }
//
//        //send the form values to the back server.
//        Edu24ol.RegisterPage.sendRegistration(data);
//    },
//
//    sendRegistration:function(data){
//        //Make an XHR request and call the dispalyResult() when the response is received.
//        //....
//    },
//
//    displayResult:function(response){
//        //Output the response directly into the output element.we are assuming the server will send back formatted html.
//
//        Edu24ol.RegisterPage.outputHTML=response;
//    },
//
//    //initialization method.
//    init:function(){
//         //Get the form and output elements
//        Edu24ol.RegisterPage.outputEl=$(Edu24ol.RegisterPage.OUTPUT_ID);
//
//        //Hijack the form submision.
//        addEvent(Edu24ol.RegisterPage.formEl,'submit',Edu24ol.RegisterPage.handlerSubmit);
//    }
//};
//
////Invoke the initialization method after the page loads.
//addLoadEvent(Edu24ol.RegisterPage.init);

/*延迟加载的单例:需要的时候，进行加载。*/

//var Edu24ol=window.Edu24ol||{};
//Edu24ol.Singleton=(function(){
//     var _singletonInstance=null;
//     var SingletonInstanceConstructor=function(name){this.name=name;};
//     SingletonInstanceConstructor.prototype={
//         constructor:SingletonInstanceConstructor,
//         getName:function(){return this.name;}
//     };
//
//     return{
//         getInstance:function(){
//             if(!_singletonInstance)
//             {
//                _singletonInstance=new Object();
//             }
//             return _singletonInstance;
//         }
//     }
// })();
//
//Edu24ol.Singleton.getInstance().getName();
//
//var Edu24ol=window.Edu24ol||{};
//Edu24ol.DataParser=(function(){
//    //private attributes.
//    var whitespaceRegex=/\s+/;
//
//    //private methods
//    function stripWhitespace(str){
//        return str.replace(whitespaceRegex);
//    }
//
//    function stringSplit(str,delimiter){
//        return str.split(delimiter);
//    }
//
//    return {
//      stringToArray:function(str,delimiter,stripWS){
//          if(stripWS)
//          {
//              str=stripWhitespace(str);
//          }
//          var outputArray=stringSplit(str,delimiter);
//          return outputArray;
//      }
//    }
//})();


/*Branch*/

var Edu24ol=window.Edu24ol||{};
Edu24ol.SimpleXHRFactory=(function(){
    var standard={
        createXhrObject:function(){
            return new XMLHttpRequest();
        }
    };

    var activeXNew={
        createXhrObject:function(){
            return new ActiveXObject('Msxml2.XMLHTTP');
        }
    };
    var activeXOld={
        createXhrObject:function(){
            return new ActiveXObject('Microsoft.XMLHTTP');
        }
    };

    var testObjct;
    try{
        testObjct=standard.createXhrObject();
        return testObjct;
    }
    catch(e){
        try{
            testObject=activeXNew.createXhrObject();
            return testObjct;
        }
        catch(e){
            try{
                testObjct=activeXOld.createXhrObject();
                return testObjct;
            }
            catch(e){
                throw new Error("No XHR object found in this environment.");
            }
        }
    }
})();

