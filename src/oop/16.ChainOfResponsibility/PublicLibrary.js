/**
 * Created by Administrator on 2014/8/7.
 */

var Publication=new Interface("Public",["getISBN","setISBN",/*ISBN*/
                                        "getTitle","setTitle",/*Title*/
                                        "getAuthor","setAuthor"/*Author*/,
                                        "getGenres","setGenres"/*体裁*/,
                                        "display"]);
var Library=new Interface("Library",["addBook",/*添加书籍*/
                                     "findBooks",/*查找图书*/
                                     "checkoutBook",/*借书*/
                                     "returnBook"]);/*还书*/
var Catalog=new Interface("Catalog",["handleFilingRequest", /*处理归档请求*/
                                     "findBooks",/**/
                                     "setSuccessor"]);/**/

/*Book class.*/
var Book=(function(){
    var _Book = function(isbn,title,author,genres){};
    _Book.prototype={
        getISBN:function(){},
        setISBN:function(){},
        getTitle:function(){},
        setTitle:function(){},
        getAuthor:function(){},
        setAuthor:function(){},
        getGenres:function(){},
        setGenres:function(){},
        display:function(){}
    };
    return _Book;
})();

/*PublicLibrary class,with genre catalogs in a chain of responsibility..*/
var PublicLibrary=(function(){
    var _PublicLibrary=function(books,firstGenreCatalog){
        this.catalog={};
        this.firstGenreCatalog=firstGenreCatalog;

        for(var i= 0,len=books.length;i<len;i++){
            this.addBook(books[i]);
        }
    };
    _PublicLibrary.prototype={
        addBook:function(newBook){
            this.catalog[newBook.getISBN()]={book:newBook,available:true};
            this.firstGenreCatalog.handleFilingRequest(newBook);
        },
        findBooks:function(searchString,genres){
            //if the optional genres arguments is given,search for books only in those genres.use the chain of responsibility to perform the search.
            if(typeof genres ==="object"&&genres.length>0)
            {
                var requestObject={
                    searchString:searchString,
                    genres:genres,
                    results:[]
                };
                var responseObject=this.firstGenreCatalog.findBooks(requestObject);
                return responseObject.results;
            }
            else
            {
                var results=[];
                for(var isbn in this.catalog)
                {
                    if(!this.catalog.hasOwnProperty(isbn)) continue;
                    if(this.catalog[isbn].getTitle().match(searchString)||this.catalog[isbn].getAuthor().match(searchString))
                    {
                        results.push(this.catalog[isbn]);
                    }
                }
                return results;
            }
        },
        checkoutBook:function(book){
            var isbn=book.getISBN();
            if(this.catalog[isbn])
            {
                if(this.catalog[isbn].available)
                {
                    this.catalog[isbn].available=false;
                    return this.catalog[isbn];
                }
                else
                {
                    throw new Error("PublicLibrary:book"+book.getTitle()+"is not currently available.");
                }
            }
            else
            {
                throw new Error("PublicLibrary:book"+book.getTitle()+" is not found.");
            }
        },
        returnBook:function(book){
            var isbn=book.getISBN();
            if(this.catalog[isbn])
            {
                this.catalog[isbn].avaliable=true;
            }
            else
            {
                throw new Error("PublicLibrary:book"+book.getTitle()+"not found.");
            }
        }
    };
    return _PublicLibrary;
})();

/*GenreCatalog class,used as a superClass for specific catalog class.*/
var GenreCatalog=(function(){
    var _GenreCatalog=function(){
        this.successor=null;
        this.catalog=[];
        this.genreNames=[];
    };
    _GenreCatalog.prototype={
        _bookMatchesCriteria:function(book){
            //Default implementation;this method will be override in the subclass.
            return false;
        },
        handleFilingRequest:function(book){
            if(_bookMatchesCriteria(book))
            {
                this.catalog.push(book);
            }
            if(this.successor!=null)
            {
                this.sucessor.handleFilingRequest(book);
            }
        },
        findBooks:function(request){
            var found=false;
            for(var i= 0,len=request.genres.length;i<len&&!found;i++)
            {
                for(var j= 0,nameLen=this.genreNames.length;j<nameLen;j++)
                {
                     if(this.genreNames[i]===request.genres[i])
                     {
                         found=true;
                         break;
                     }
                }
            }
            if(found)
            {
                //search through this catalog for books that match search string and are not already int he requests.
                outerLoop:
                for(var x= 0,catalogLen=this.catalog.length;x<catalogLen;x++)
                {
                    var book=this.catalog[x];
                    if(book.getTitle().match(request.searchString))
                    {
                          for(var y = 0,requestLen=request.results.length;y<requestLen;y++)
                          {
                              if(request.results[j].getISBN()===book.getISBN())
                              {
                                  continue outerLoop;//The book is already in the results;skip it.
                              }
                          }
                          //The book matches and doesn't already appear in the results. add it.
                          request.results.push(book);
                    }
                }
            }
            //Continue to pass the request down the chain if the successor is set.
            if(this.successor)
            {
                return this.sucessor.findBooks(request);
            }
            else
            {
                //Otherwise,we have reached the end of the chain. Return the request object back up the chain.
                return request;
            }
        },
        setSuccessor:function(successor){
            Interface.ensureImplements(successor,Catalog);
            this.successor=successor;
        }
    };
    Interface.ensureImplements(_GenreCatalog,Catalog);
    return _GenreCatalog;
})();
var SciFiCatalog=(function(superClass){
    var _SciFiCatalog=function(){
        this.genreNames=["sci-fi","scifi","science fiction"];
    };
    prototypeInheritHelper.inheritPrototype(superClass,_SciFiCatalog);
    _SciFiCatalog.prototye._bookMatchesCriteria=function(book){
         var genres=book.getGenres();
         if(book.getTitle().match(/space/i))
         {
             return true;
         }
         for(var i= 0,len=genres.length;i<len;i++)
         {
             var genre=genre[i].toLowerCase();
             if(genre==="sci-fi"||genre==="scifi"||genre==="science fiction")
             {
                 return true;
             }
         }
        return false;
    };
    return _SciFiCatalog;
})(GenreCatalog);

/*Instantiate the catalogs.*/
var biographyCatalog=new BiographyCatalog();
var fantasyCatalog=new FantasyCatalog();
var mysteryCatalog=new MysteryCatalog();
var nonFictionCatalog=new NonFictionCatalog();
var sciFiCatalog=new SciFiCatalog();

biographyCatalog.setSuccessor(fantasyCatalog);
fantasyCatalog.setSuccessor(mysteryCatalog);
mysteryCatalog.setSuccessor(nonFictionCatalog);
nonFictionCatalog.setSuccessor(sciFiCatalog);

var myLibrary=new PublicLibrary(books,biographyCatalog);

var historyCatalog=new HistoryCatalog();
sciFiCatalog.setSuccessor(historyCatalog);