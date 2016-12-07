///**
// * Created by zhangrongzhao on 2014/6/13.
// */
///*定义组合FieldSet字段域接口*/
//var Composite=new Interface("Composite",["add","remove","getChild"]);
//
///*定义表单项FormItem接口*/
//var FormItem=new Interface("FormItem",["save","restore"]);
//
//
///*叶子抽象类定义：字段Field的抽象类，该抽象类派生出Input，select ,textArea等表单字段类*/
//var Field=(function(){
//     var PrimitiveField=function(id){
//         this.id=id;
//         this.element=null;
//     };
//     PrimitiveField.prototype={
//         constructor:PrimitiveField,
//         add:function(){},
//         remove:function(){},
//         getChild:function(){},
//         save:function(dataStored){
//             dataStored[this.id]=this.getValue();
//         },
//         getValue:function(){
//             throw new Error("Unsupported operation on the class field.");
//         },
//         getElement:function(){
//             return this.element;
//         },
//         restore:function(){
//             this.element.value=getCookie(this.id);
//         }
//     };
//     Interface.ensureImplements(PrimitiveField,Composite,FormItem);
//     return PrimitiveField;
//})();
//
///*扩展select,input,textarea表单基本字段*/
//var SelectField=(function(){
//    var Select = function(id,label){
//        Field.call(this,id);
//
//        this.selectElement=document.createElement("select");
//        this.selectElement.id=id;
//
//        this.labelElement=document.createElement("label");
//        this.labelTextNode=document.createTExtNode(label);
//        this.labelElement.appendChild(this.labelTextNode);
//
//        this.element=document.createElement("div");
//        this.element.className="input-field";
//        this.element.appendChild(this.labelElement);
//        this.element.appendChild(this.selectElement);
//    };
//    prototypeInheritHelper.inheritPrototype(Field,Select);
//    Select.prototype.save=function(dataStored){
//        dataStored[this.id]=this.getValue();
//    };
//    Select.prototype.getValue=function(){
//        return this.selectElement.options[this.selectElement.selectedIndex].value;
//    };
//    Interface.ensureImplements(Select,Composite,FormItem);
//    return Select;
//})();
//var InputField=(function(){
//    var Input=function(id,label){
//        Field.call(this,id);
//
//        this.inputElement=document.createElement("input");
//        this.inputElement.id=id;
//
//        this.labelElement=document.createElement("label");
//        this.labelTextNode=document.createTExtNode(label);
//        this.labelElement.appendChild(this.labelTextNode);
//
//        this.element=document.createElement("div");
//        this.element.className="input-field";
//        this.element.appendChild(this.labelElement);
//        this.element.appendChild(this.inputElement);
//    };
//    prototypeInheritHelper.inheritPrototype(Field,Input);
//    Input.prototype.save=function(dataStored){
//        dataStored[this.id]=this.getValue();
//    };
//    Input.prototype.getValue=function(){
//        return this.inputElement.value;
//    };
//    Interface.ensureImplements(Input,Composite,FormItem);
//    return Input;
//})();
//var TextAreaField=(function(){
//    var TextArea=function(id){
//        Field.call(this,id);
//
//        this.textAreaElement=document.createElement("textarea");
//        this.textAreaElement.id=id;
//
//        this.labelElement=document.createElement("label");
//        this.labelTextNode=document.createTExtNode(label);
//        this.labelElement.appendChild(this.labelTextNode);
//
//        this.element=document.createElement("div");
//        this.element.className="input-field";
//        this.element.appendChild(this.labelElement);
//        this.element.appendChild(this.textAreaElement);
//    };
//    prototypeInheritHelper.inheritPrototype(Field,TextArea);
//    TextArea.prototype.save=function(dataStored){
//        dataStored[this.id]=this.getValue();
//    };
//    TextArea.prototype.getValue=function(){
//        return this.textAreaElement.value;
//    };
//    Interface.ensureImplements(TextArea,Composite,FormItem);
//    return TextArea;
//})();
//
///*组合CompositeForm:类定义*/
//var CompositeForm=(function(){
//     var _CompositeForm=function(id,method,action){
//         this.formComponents=[];
//
//         this.element=document.createElement("form");
//         this.element.id=id;
//         this.element.method=method||"POST";
//         this.element.action=action||"#";
//     };
//    _CompositeForm.prototype={
//        constructor:_CompositeForm,
//        add:function(child){
//            Interface.ensureImplements(child,Composite,FormItem);
//            this.formComponents.push(child);
//            this.element.appendChild(child.getElement());
//        },
//        remove:function(child){
//            for(var i=0;i<this.formComponents.length;i++)
//            {
//                if(this.formComponents[i]==child)
//                {
//                    //remove the element at the position i.
//                    this.formComponents.splice(i,1);
//                    break;
//                }
//            }
//        },
//        getChild:function(index){
//            return this.formComponents[index];
//        },
//        save:function(dataStored){
//           for(var i=0;i<this.formComponents.length;i++)
//           {
//               this.formComponents[i].save(dataStored);
//           }
//        },
//        getElement:function(){
//            return this.element;
//        },
//        restore:function(){
//            for(var i=0;i<this.formComponents.length;i++)
//            {
//                this.formcomponents[i].restore();
//            }
//        }
//    };
//    Interface.ensureImplements(_CompositeForm,Composite,FormItem);
//    return _CompositeForm;
//})();
//
///*CompositeFieldSet：组合类*/
//
//var CompositeFieldSet=(function(){
//    var _CompositeFieldset=function(id,legendText){
//        this.components={};
//        this.element=document.createElement("fieldset");
//        this.element.id=id;
//
//        if(legendText)
//        {
//            this.legend=document.createElement("legend");
//            this.legend.appendChild(document.createTextNode(legendText));
//            this.element.appendChild(this.legend);
//        }
//    };
//    _CompositeFieldset.prototype.add=function(child){
//        Interface.ensureImplements(child,Composite,FormItem);
//        this.components[child.getElement().id]=child;
//        this.element.appendChild(child.getElement());
//    };
//
//    _CompositeFieldset.prototype.remove=function(child){
//        delete this.components[child.getElement().id];
//    };
//
//    _CompositeFieldset.prototype.getChild=function(id){
//        if(this.components[id]!=undefined)
//        {
//            return this.components[id];
//        }
//    };
//
//    _CompositeFieldset.prototype.save=function(){
//         for(var id in this.components){
//             if(!this.components.hasOwnProperty(id)) continue;
//             this.components[id].save();
//         }
//    };
//
//    _CompositeFieldset.prototype.restore=function(){
//        for(var id in this.components)
//        {
//            if(!this.components.hasOwnProperty(id)) continue;
//            this.components[id].restore();
//        }
//    };
//
//    _CompositeFieldset.prototype.getElement=function(){
//       return this.element;
//    };
//
//    return _CompositeFieldset;
//})();
///*Demo*/
//
//var contactForm=new CompositeForm("contact-form","POST","contact.php");
//
//var nameFieldset=new CompositeFieldSet("name-fieldset");
//nameFieldset.add(new InputField("first-name","first name"));
//nameFieldset.add(new InputField("last-name","last name"));
//contactForm.add(nameFieldset);
//
//var addressFieldset=new CompositeFieldSet("address-fieldset");
//addressFieldset.add(new InputField("address","Address"));
//addressFieldset.add(new InputField("City","City"));
//addressFieldset.add(new SelectField("state","State",StateArray));
//addressFieldset.add(new InputField("zip","Zip"));
//contactForm.add(addressFieldset);
//
//contactForm.add(new TextAreaField("comments","Comments"));
//
//addEvent(window,"unload",compositeForm.save);
//
//
