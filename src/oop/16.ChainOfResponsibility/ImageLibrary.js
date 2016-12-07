/**
 * Created by zhangrongzhao on 2014/6/20.
 */

/*组合接口主要操作：add,remove,getChild*/
var CompositeInterface=new Interface("Composite",["add","remove","getChild"]);

/*图片接口:show,hide*/
var ImageInterface=new Interface("Image",["show","hide"]);


/*图片库的组合类对象：DynamicGallery*/
var DynamicGallery=(function(){
    var _DynamicGallery=function(id){
        this.children=[];
        this.tags=[];

        /*注意事项：尽量避免DOM对象和javascript对象之间的循环引用，否则，容易造成内存泄露。*/
        this.element=document.createElement("div");
        this.element.id=id;
        this.element.className="dynamic-gallery";
    };
    _DynamicGallery.prototype={
        addTag:function(tag){
            this.tags.push(tag);
            for(var node,i=0;node=this.getChild(i);i++)
            {
                node.addTag(tag);
            }
        },
        add:function(child){
            Interface.ensureImplements(child,CompositeInterface,ImageInterface);
            this.children.push(child);

            this.element.appendChild(child.getElement());
        },
        remove:function(child){
            Interface.ensureImplements(child,CompositeInterface,ImageInterface);
            for(var i=0;i<this.children.length;i++)
            {
                if(this.children[i]==child)
                {
                    this.children.splice(i,1);
                    break;
                }
            }

            this.element.removeChild(child.getElement());
        },
        getChild:function(index){
            return this.children[index];
        },
        show:function(){
            for(var i=0;i<this.children.length;i++)
            {
                this.children.show();
            }
            this.element.style.display="block";
        },
        hide:function(){
            //for(var i=0;i<this.children.length;i++)
            //{
            //   this.children.hide();
            // }
            this.element.style.display="none";
        },
        getAllLeaves:function(){
            var leaves=[];
            for(var node,i=0;node=this.getChild(i);i++)
            {
                leaves=leaves.concat(node.getAllLeaves());
            }
            return leaves;
        },
        getPhotosWithTag:function(tag){
            //first search in this object's tags;if the tag is found here,we can stop the search
            //and just return all the leaf nodes.
            for(var i= 0,len=this.tags.length;i<len;i++)
            {
                if(this.tags[i]===tag)
                {
                    return this.getAllLeaves();
                }
            }

            //if the tag isn't found in this object's tags,pass the request down the hierarchy.
            for(var results=[],node,i=0;node=this.getChild(i);i++)
            {
                results=results.concat(node.getPhotosWithTag(tag));
            }
            return results;
        }
    };
    return _DynamicGallery;
})();

/*图片对象*/
var GalleryImage=(function(){
    var _GalleryImage=function(src){
        this.element=document.createElement("img");
        this.element.className="gallery-image";
        this.element.src=src;

        this.tags=[];
    };

    _GalleryImage.prototype={
        addTag:function(tag){
            this.tags.push(tag);
        },
        add:function(child){},
        remove:function(child){},
        getChild:function(index){},
        show:function(){
            this.element.style.display="block";
        },
        hide:function(){
            this.element.style.display="none";
        },
        getElement:function(){
            return this.element;
        },
        getAllLeaves:function(){
            return [this];
        },
        getPhotosWithTag:function(tag){
            for(var i= 0,len=this.tags.length;i<len;i++)
            {
                 if(this.tags[i]===tag)
                 {
                     return this.getAllLeaves();
                 }
            }
            return [];
        }
    };
    return _GalleryImage;
})();


/*Demo:*/
var topGallery=new DynamicGallery("top-gallery");
topGallery.add(new GalleryImage("/img/image-1.jpg"));
topGallery.add(new GalleryImage("/img/image-2.jpg"));
topGallery.add(new GalleryImage("/img/image-3.jpg"));

var vocationPhotos=new DynamicGallery("vocation-Photos");
for(var i=0;i<30;i++)
{
    vocationPhotos.add(new GalleryImage("img/vac/image-"+i+".jpg"));
}
topGallery.add(vocationPhotos);

topGallery.show();
topGallery.hide();






