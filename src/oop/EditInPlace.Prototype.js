/**
 * Created by zhangrongzhao on 2014/5/29.
 */
/*原型继承*/
var EditInPlaceField={
    config:function(id,parent,value){
        this.id=id;
        this.value=value||'default value';
        this.parentElement=parent;
    },
    createElements:function(id){
        this.containerElement=document.createElement("div");
        this.parentElement.appendChild(this.containerElement);

        this.staticElement=document.createElement("span");
        this.containerElement.appendChild(this.staticElement);
        this.staticElement.innerHTML=this.value;

        this.fieldElement=document.createElement("input");
        this.fieldElement.type="text";
        this.fieldElement.value=this.value;
        this.containerElement.appendChild(this.fieldElement);

        this.saveButton=document.createElement("input");
        this.saveButton.type="button";
        this.saveButton.value="save";
        this.containerElement.appendChild(this.saveButton);

        this.cancelButton=document.createElement("input");
        this.cancelButton.type="button";
        this.cancelButton.value="cancel";
        this.containerElement.appendChild(this.cancelButton);

        this.convertToText();
    },
    attachEvents:function(){
        var that=this;
        addEvent(this.staticElement,"click",function(){that.convertToEditable();});
        addEvent(this.saveButton,"click",function(){this.save();});
        addEvent(this.cancelButton,"click",function(){this.cancel();});
    },
    convertToEditable:function(){
        this.staticElement.style.display="none";
        this.filedElement.style.display="inline";
        this.saveButton.style.display="inline";
        this.cancelButton.style.display="inline";
        this.setValue();
    },
    convertToText:function(){
        this.staticElement.style.display="none";
        this.filedElement.style.display="none";
        this.saveButton.style.display="none";
        this.cancelButton.style.display="inline";

        this.setValue(this.value);
    },
    save:function(){
        this.value=this.getValue();
        var that=this;
        var callback={
            success:function(){that.convertToText();},
            failure:function(){alert("Error saving value");},
        };

        ajaxRequest("GET","save.php?id="+this.id+"&value="+this.value,callback);
    },
    cancel:function(){
        this.convertToText();
    },
    saveValue:function(value){
        this.fieldElement.value=value;
        this.staticElement.innerHTML=value;
    },
    getValue:function(){
        return this.fieldElement.value;
    }
};

var EditInPlaceArea=prototypeInheritHelper.clone(EditInPlaceField);

EditInPlaceArea.createElements=function(){
    this.containerElement=document.createElement("div");
    this.parentElement.appendChild(this.containerElement);

    this.staticElement=document.createElement("p");
    this.containerElement.appendChild(this.staticElement);
    this.staticElement.innerHTML=this.value;

    this.fieldElement=document.createElement("textarea");
    this.fieldElement.value=this.value;
    this.containerElement.appendChild(this.fieldElement);

    this.saveButton=document.createElement("input");
    this.saveButton.type="button";
    this.saveButton.value="save";
    this.containerElement.appendChild(this.saveButton);

    this.cancelButton=document.createElement("input");
    this.cancelButton.type="button";
    this.cancelButton.value="cancel";
    this.containerElement.appendChild(this.cancelButton);

    this.convertToText();
};
EditInPlaceArea.convertToEditable=function(){
    this.staticElement.style.display="none";
    this.filedElement.style.display="block";
    this.saveButton.style.display="inline";
    this.cancelButton.style.display="inline";
    this.setValue();
};
EditInPlaceArea.convertToText=function(){
    this.staticElement.style.display="none";
    this.filedElement.style.display="none";
    this.saveButton.style.display="none";
    this.cancelButton.style.display="inline";
    this.setValue();
};
