/**
 * Created by zhangrongzhao on 2014/7/31.
 */
/*Reversible command.*/
var ReversibleCommand=new Interface("ReversibleCommand",["execute"]);

/*Move up command*/
var MoveUpCommand=(function(){
    var _MoveUpCommand=function(cursor){
        this.cursor=cursor;
    };
    _MoveUpCommand.prototype={
        execute:function(){
            cursor.move(0,-10);
        }
    };
    Interface.ensureImplements(_MoveUpCommand,ReversibleCommand);
    return _MoveUpCommand;
})();

/*Move down command*/
var MoveDownCommand=(function(){
    var _MoveDownCommand=function(cursor){
        this.cursor=cursor;
    };
    _MoveDownCommand.prototype={
        execute:function(){
            cursor.move(0,10);
        }
    };
    Interface.ensureImplements(_MoveDownCommand,ReversibleCommand);
    return _MoveDownCommand;
})();

/*Move left command*/
var MoveLeftCommand=(function(){
    var _MoveLeftCommand=function(cursor){
        this.cursor=cursor;
    };
    _MoveLeftCommand.prototype={
        execute:function(){
            cursor.move(-10,0);
        }
    };
    Interface.ensureImplements(_MoveLeftCommand,ReversibleCommand);
    return _MoveLeftCommand;
})();

/*Move right command*/
var MoveRightCommand=(function(){
    var _MoveRightCommand=function(cursor){
        this.cursor=cursor;
    };
    _MoveRightCommand.prototype={
        execute:function(){
            cursor.move(10,0);
        }
    };
    Interface.ensureImplements(_MoveRightCommand,ReversibleCommand);
    return _MoveRightCommand;
})();

/*Cursor class,with an internal command stack.*/
var Cursor=(function(){
    var _Cursor=function(width,height,parent){
        this.width=width;
        this.height=height;
        this.commandStack=[];

        this.canvas=document.createElement("canvas");
        this.canvas.width=this.width;
        this.canvas.height=this.height;
        parent.appendChild(this.canvas);

        this.ctx=this.canvas.getContext("2d");
        this.ctx.fillStyle="#cc0000";

        this.move(0,0);
    };
    _Cursor.prototype={
        move:function(x,y){
            var that=this;
            this.commandStack.push(function(){that.lineTo(x,y);});
            this.executeCommands();
        },
        lineTo:function(x,y){
            this.position.x+=x;
            this.position.y+=y;
            this.ctx.lineTo(this.position.x,this.position.y);
        },
        executeCommands:function(){
            this.position={x:this.width/2,y:this.height.y/2};
            //clear the canvas.
            this.ctx.clearRect(0,0,this.width,this.height);
            this.ctx.beginPath();

            this.ctx.moveTo(this.position.x,this.position.y);
            for(var i= 0,len=this.commandStack.length;i<len;i++)
            {
                this.commandStack[i]();
            }
            this.ctx.stroke();
        },
        undo:function(){
            this.commandStack.pop();
            this.executeCommands();
        }
    };
    return _Cursor;
})();

/*CommandButton class.*/
var CommandButton=(function(){
    var _CommandButton=function(label,command,parent){
        Interface.ensureImplements(command,ReversibleCommand);
        this.element=document.createElement("button");
        this.element.innerHTML=label;
        parent.appendChild(this.element);

        addEvent(this.element,"click",function(){command.execute();});
    };
    return _CommandButton;
})();
var UndoButton=(function(){
    var _UndoButton=function(label,parent,cursor){
        this.element=document.createElement("button");
        this.element.innerHTML=label;
        parent.append(this.element);

        addEvent(this.element,"click",function(){
            cursor.undo();
        });
    };
    return _UndoButton;
})();

/*Implementation code.*/
var body=document.getElementsByTagName("body")[0];
var cursor=new Cursor(400,400,body);

var upCommand=new MoveUpCommand(cursor);
var downCommand=new MoveDownCommand(cursor);
var leftCommand=new MoveLeftCommand(cursor);
var rightCommand=new MoveRightCommand(cursor);

var upButton=new CommandButton("Up",upCommand,body);
var downButton=new CommandButton("Down",downCommand,body);
var leftButton=new CommandButton("Left",leftCommand,body);
var rightButton=new CommandButton("Right",rightCommand,body);
var undoButton=new UndoButton("Undo",body,cursor);

