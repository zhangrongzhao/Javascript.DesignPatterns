///**
// * Created by zhangrongzhao on 2014/7/31.
// */
///*Reversible command.*/
//var ReversibleCommand=new Interface("ReversibleCommand",["execute","undo"]);
//
///*Move up command*/
//var MoveUpCommand=(function(){
//    var _MoveUpCommand=function(cursor){
//        this.cursor=cursor;
//    };
//    _MoveUpCommand.prototype={
//        execute:function(){
//            cursor.move(0,-10);
//        },
//        undo:function(){
//            cursor.move(0,10);
//        }
//    };
//    Interface.ensureImplements(_MoveUpCommand,ReversibleCommand);
//    return _MoveUpCommand;
//})();
//
///*Move down command*/
//var MoveDownCommand=(function(){
//    var _MoveDownCommand=function(cursor){
//        this.cursor=cursor;
//    };
//    _MoveDownCommand.prototype={
//        execute:function(){
//            cursor.move(0,10);
//        },
//        undo:function(){
//            cursor.move(0,-10);
//        }
//    };
//    Interface.ensureImplements(_MoveDownCommand,ReversibleCommand);
//    return _MoveDownCommand;
//})();
//
///*Move left command*/
//var MoveLeftCommand=(function(){
//    var _MoveLeftCommand=function(cursor){
//        this.cursor=cursor;
//    };
//    _MoveLeftCommand.prototype={
//        execute:function(){
//            cursor.move(-10,0);
//        },
//        undo:function(){
//            cursor.move(10,0);
//        }
//    };
//    Interface.ensureImplements(_MoveLeftCommand,ReversibleCommand);
//    return _MoveLeftCommand;
//})();
//
///*Move right command*/
//var MoveRightCommand=(function(){
//    var _MoveRightCommand=function(cursor){
//        this.cursor=cursor;
//    };
//    _MoveRightCommand.prototype={
//        execute:function(){
//            cursor.move(10,0);
//        },
//        undo:function(){
//            cursor.move(-10,0);
//        }
//    };
//    Interface.ensureImplements(_MoveRightCommand,ReversibleCommand);
//    return _MoveRightCommand;
//})();
//
///*Cursor class.*/
//var Cursor=(function(){
//     var _Cursor=function(width,height,parent){
//         this.width=width;
//         this.height=height;
//         this.position={x:width/2,y:height/2};
//
//         this.canvas=document.createElement("canvas");
//         this.canvas.width=this.width;
//         this.canvas.height=this.height;
//         parent.appendChild(this.canvas);
//
//         this.ctx=this.canvas.getContext("2d");
//         this.ctx.fillStyle="#cc0000";
//
//         this.move(0,0);
//     };
//    _Cursor.prototype={
//        move:function(x,y){
//            this.position.x+=x;
//            this.position.y+=y;
//
//            this.ctx.clearRect(0,0,this.width,this.height);
//            this.ctx.fillRect(this.position.x,this.position.y,3,3);
//        }
//    };
//     return _Cursor;
//})();
//
///*UndoDecorator class.*/
//var UndoDecorator=(function(){
//    var _UndoDecorator=function(command,undoStack){
//        this.command=command;
//        this.undoStack=undoStack;
//    };
//    _UndoDecorator.prototype={
//        execute:function(){
//            this.undoStack.push(this.command);
//            this.command.execute();
//        },
//        undo:function(){
//            this.command.undo();
//        }
//    };
//    Interface.ensureImplements(_UndoDecorator,ReversibleCommand);
//    return _UndoDecorator;
//})();
//
///*CommandButton class.*/
//var CommandButton=(function(){
//    var _CommandButton=function(label,command,parent){
//        Interface.ensureImplements(command,ReversibleCommand);
//        this.element=document.createElement("button");
//        this.element.innerHTML=label;
//        parent.appendChild(this.element);
//
//        addEvent(this.element,"click",function(){command.execute();});
//    };
//    return _CommandButton;
//})();
//var UndoButton=(function(){
//    var _UndoButton=function(label,parent,undoStack){
//        this.element=document.createElement("button");
//        this.element.innerHTML=label;
//        parent.append(this.element);
//
//        addEvent(this.element,"click",function(){
//            if(undoStack.length<=0) return;
//            var lastCommand=undoStack.pop();
//            lastCommand.undo();
//        });
//    };
//    return _UndoButton;
//})();
//
///*Implementation code.*/
//var body=document.getElementsByTagName("body")[0];
//var cursor=new Cursor(400,400,body);
//var undoStack=[];
//
//var upCommand=new UndoDecorator(new MoveUpCommand(cursor),undoStack);
//var downCommand=new UndoDecorator(new MoveDownCommand(cursor),undoStack);
//var leftCommand=new UndoDecorator(new MoveLeftCommand(cursor),undoStack);
//var rightCommand=new UndoDecorator(new MoveRightCommand(cursor),undoStack);
//
//var upButton=new CommandButton("Up",upCommand,body);
//var downButton=new CommandButton("Down",downCommand,body);
//var leftButton=new CommandButton("Left",leftCommand,body);
//var rightButton=new CommandButton("Right",rightCommand,body);
//var undoButton=new UndoButton("Undo",body,undoStack);
//
