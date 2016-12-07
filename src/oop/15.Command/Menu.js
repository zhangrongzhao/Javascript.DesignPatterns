/**
 * Created by zhangrongzhao on 2014/7/30.
 */
var FileActions=(function(){
    var _FileActions=function(){};
    _FileActions.prototype={
        open:function(){},
        close:function(){},
        save:function(){},
        saveAs:function(){}
    };
    return _FileActions;
})();

var EditActions=(function(){
    var _EditActions=function(){};
    _EditActions.prototype={
        cut:function(){},
        copy:function(){},
        paste:function(){},
        delete:function(){}
    };
    return _EditActions;
})();

var InsertActions=(function(){
    var _InsertActions=function(){};
    _InsertActions.prototype={
        textBlock:function(){}
    };
    return _InsertActions;
})();

var HelpActions=(function(){
    var _HelpActions=function(){};
    _HelpActions.prototype={
        showHelp:function(){}
    };
    return _HelpActions;
})();

/*Command,Composite and MenuObject interface.*/
var Command=new Interface("Command",["execute"]);
var Composite=new Interface("Composite",["add","remove","getChild","getElement"]);
var MenuObject=new Interface("MenuObject",["show"]);

/*MenuBar class, a composite.*/
var MenuBar=(function(){
    var _MenuBar=function(){
        this.menus={};
        this.element=document.createElement("ul");
        this.element.style.display="none";
    };
    _MenuBar.prtotype={
        add:function(menuObject){
            Interface.ensureImplements(menuObject,Composite,MenuObject);
            this.menus[menuObject.name]=menuObject;
            this.element.appendChild(this.menus[menuObject.name].getElement());
        },
        remove:function(name){
            this.element.remove(this.menus[menuObject.name].getElement());
            delete this.menus[name];
        },
        getChild:function(name){
            return this.menus[name];
        },
        getElement:function(){
            return this.element;
        },
        show:function(){
            this.element.style.display="block";
            for(var name in this.menus)
            {
                this.menus[name].show();
            }
        }
    };
    Interface.ensureImplements(_MenuBar,Composite,MenuObject);
    return _MenuBar;
})();

/*Menu class, a composite.*/
var Menu=(function(){
    var _Menu=function(name){
        this.name=name;
        this.items={};
        this.element=document.createElement("li");
        this.element.innerHTML=this.name;
        this.element.style.display="none";
        this.container=document.createElement("ul");
        this.element.appendChild(this.container);
    };
    _Menu.prtotype={
        add:function(menuObject){
            Interface.ensureImplements(menuObject,Composite,MenuObject);
            this.items[menuObject.name]=menuObject;
            this.container.appendChild(this.items[menuObject.name].getElment());
        },
        remove:function(name){
            delete this.items[name];
        },
        getChild:function(name){
            return this.items[name];
        },
        getElement:function(){
            return this.element;
        },
        show:function(){
            this.element.style.display="block";
            for(var name in this.items)
            {
                this.items[name].show();
            }
        }
    };
    Interface.ensureImplements(_Menu,Composite,MenuObject);
    return _Menu;
})();

/*MenuItem class, a leaf class.*/
var MenuItem=(function(){
    var _MenuItem=function(name,oCommand){
        Interface.ensureImplements(oCommand,Command);
        this.name=name;
        this.element=document.createElement("li");
        this.element.style.display="none";
        this.anchor=document.createElement("a");
        this.anchor.href="#";
        this.anchor.innerHTML=this.name;
        this.element.appendChild(this.anchor);

        addEvent(this.anchor,"click",function(e){
            e.preventDefault();
            oCommand.execute();
        });
    };
    _MenuItem.prtotype={
        add:function(){},
        remove:function(){},
        getChild:function(){},
        getElement:function(){},
        show:function(){
            this.element.style.display="block";
        }
    };
    Interface.ensureImplements(_MenuItem,MenuObject);
    return _MenuItem;
})();

/*MenuCommand class,a command object.*/
var MenuCommand=(function(){
    var _MenuCommand=function(action){
        this.action=action;
    };
    _MenuCommand.prototype={
        execute:function(){
            this.action();
        }
    };
    Interface.ensureImplements(_MenuCommand,Command);
    return _MenuCommand;
})();

/*Implementation code.*/
/*Receiver object,instantiated from existing classes.*/
var fileActions=new FileActions();
var editActions=new EditActions();
var insertActions=new InsertActions();
var helpActions=new HelpActions();

/*Create the menu bar*/
var appMenuBar=new MenuBar();

/*create the file menu.*/
var fileMenu=new Menu("File");

var openCommand=new MenuCommand(fileActions.open);
var closeCommand=new MenuCommand(fileActions.close);
var saveCommand=new MenuCommand(fileActions.save);
var saveAsCommand=new MenuCommand(fileActions.saveAs);

var openMenuItem=new MenuItem("open",openCommand);
var closeMenuItem=new MenuItem("close",closeCommand);
var saveMenuItem=new MenuItem("save",saveCommand);
var saveAsMenuItem=new MenuItem("saveAs",saveAsCommand);

fileMenu.add(openMenuItem);
fileMenu.add(closeMenuItem);
fileMenu.add(saveMenuItem);
fileMenu.add(saveAsMenuItem);

/*create the edit menu.*/
var editMenu=new Menu("Edit");

var copyCommand=new MenuCommand(EditActions.copy);
var cutCommand=new MenuCommand(EditActions.cut);
var deleteCommand=new MenuCommand(EditActions.delete);
var pasteCommand=new MenuCommand(EditActions.paste);

var copyMenuItem=new MenuItem("copy",copyCommand);
var cutMenuItem=new MenuItem("cut",cutCommand);
var deleteMenuItem=new MenuItem("delete",deleteCommand);
var pasteMenuItem=new MenuItem("paste",pasteCommand);

editMenu.add(copyMenuItem);
editMenu.add(cutMenuItem);
editMenu.add(deleteMenuItem);
editMenu.add(pasteMenuItem);

/*create the insert menu.*/
var insertMenu=new Menu("Insert");
var textBlockCommand=new MenuCommand(InsertActions.textBlock);
var textBlockMenuItem=new MenuItem("textBlock",textBlockCommand);
insertMenu.add(textBlockMenuItem);

/*create the Help menu.*/
var helpMenu=new Menu("Help");
var showHelpCommand=new MenuCommand(helpActions.showHelp);
var showHelpMenuItem=new MenuItem("textBlock",showHelpCommand);
helpMenu.add(showHelpMenuItem);
