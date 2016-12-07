/**
 * Created by zhangrongzhao on 2014/7/15.
 */
/*Display module interface.*/
var DisplayModule=new Interface("DisplayModule",["show","hide","state"]);

/*DialogBox class.*/
var DialogBox=function(){
    //init resource.
};

/*implements the display module interface.*/
DialogBox.prototype={
    show:function(){},
    hide:function(){},
    state:function(){}
};

/*DialogBoxManager class*/
var DialogBoxManager=(function(){
    var created=[];
    return{
        createDialogBox:function(){//factory method.
            var dialogBox=new DialogBox();
            return dialogBox;
        },
        numberInUse:function(){
            var inUse=0;
            for(var i=0;i<created.length;i++)
            {
                if(created[i].state()==="visible")
                {
                    inUse++;
                }
            }
            return inUse;
        },
        displayDialogBox:function(header,body,footer){
            var inUse=this.numberInUse();
            if(inUse>created.length)
            {
                created.push(this.createDialogBox());
            }
            created[inUse].show(header,body,footer);
        }
    };
})();

