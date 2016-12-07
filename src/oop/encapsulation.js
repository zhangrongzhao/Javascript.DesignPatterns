/**
 * Created by zhangrongzhao on 2014/5/27.
 */
/*门户大开型对象*/

//var Publication=new Interface("Publication",["getIsbn","setIsbn","getTitle","setTitle","setAuthor","getAuthor","display"]);
//
//var Book=function(isbn,title,author){
//     var _isbn,_title,_author;
//     function _checkIsbn(){}
//     this.setIsbn(isbn);
//     this.setTitle(title);
//     this.setAuthor(author);
//};
//Book.prototype={
//    constructor:Book,
//    setIsbn:function(isbn){this.isbn=isbn;},
//    getIsbn:function(){return this.isbn},
//    setTitle:function(title){this.title=title;},
//    getTitle:function(){return this.title;},
//    setAuthor:function(author){this.author=author;},
//    getAuthor:function(){return this.author;},
//    display:function(){}
//};

//var Book=(function(){
//    var _numOfBooks=0;
//    function _checkIsbn(isbn){
//    }
//
//    function _BookConstructor(newIsbn,newTitle,newAuthor){
//        //var _isbn,_title,_author;
////        this.setIsbn=function(isbn){_isbn=isbn;};
////        this.setTitle=function(title){_title=title;};
////        this.setAuthor=function(author){_author=author;};
////        this.getIsbn=function(){return _isbn};
////        this.getTitle=function(){return _title;};
////        this.getAuthor=function(){return _author;};
//
//        this.setIsbn(newIsbn);
//        this.setTitle(newTitle);
//        this.setAuthor(newAuthor);
//    };
//
//    _BookConstructor.prototype={
//        constructor:_BookConstructor,
//        setIsbn:function(isbn){this.isbn=isbn;},
//        getIsbn:function(){return this.isbn},
//        setTitle:function(title){this.title=title;},
//        getTitle:function(){return this.title;},
//        setAuthor:function(author){this.author=author;},
//        getAuthor:function(){return this.author;},
//        display:function(){}
//    };
//    return _BookConstructor;
//})();
//
//var book=new Book("isbn","title","author");
//alert(book.getIsbn());

/*特权静态方法*/
var Class=(function(){
    var constants={
        UPPER_BOUND:100,
        LOWER_BOUND:-100
    };

    var constructor=function(constructorArgument){};
    constructor.getUPPER_BOUND=function(name){
        return constants[name];
    };

    return constructor;
})();

/*通过类名调用*/
Class.getUPPER_BOUND("UPPER_BOUND");