var $neighborhoods,lastUsedIndex=0,maxExtraLoad=3,createTemplate=function(e,t,o,a){var n,r,i,l;r='<img src="'+t+'">',i="<h2>"+e.toUpperCase()+"</h2>",l="<p>"+o+"</p>",n='<article class="content-item"><a href="'+a+'">'+r+i+"</a>"+l+"</article>",$(".content-grid").append(n)},loadMoreTemplate=function(e){var t=lastUsedIndex+1,o=lastUsedIndex+1+maxExtraLoad;for(t;o>t;t++){if(!(t<$neighborhoods.length)){e.hide();break}var a=$neighborhoods[t],n=$(a).children("title").html(),r=$(a).children("image").html(),i=$(a).children("description").html(),l=$(a).children("page").html();createTemplate(n,r,i,l)}lastUsedIndex=t};$(document).ready(function(){$("#load-more").on("click",function(){loadMoreTemplate($(this))}),$.ajax({url:"/dist/xml/neighborhoods.xml",dataType:"xml",success:function(e,t,o){200===o.status&&($neighborhoods=$(e).find("neighborhood"),$neighborhoods.each(function(e,t){if(!(e>5)){var o=$(t).children("title").html(),a=$(t).children("image").html(),n=$(t).children("description").html(),r=$(t).children("page").html();createTemplate(o,a,n,r),lastUsedIndex=e}}))},error:function(e,t){console.log(t+" "+e.status)}})});