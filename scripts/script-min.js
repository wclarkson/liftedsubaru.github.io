document.addEventListener("DOMContentLoaded",function(){var n,a,o,e,r=null,t=document.documentElement,i=document.querySelector(".grid-mGrid"),d=i.querySelector(".grid"),u=i.querySelector(".filter-field"),l=i.querySelector(".search-field");i.querySelector(".sort-field");function c(){var t;n=u.value,r.filter(function(e){var t=e.getElement(),r=!o||-1<(t.getAttribute("data-title")||"").toLowerCase().indexOf(o);r||(r=-1<(t.getAttribute("data-description")||"").toLowerCase().indexOf(o)),r||(r=-1<(t.getAttribute("data-category")||"").toLowerCase().indexOf(o));var a=!n||-1<(t.getAttribute("data-category")||"").toLowerCase().indexOf(n.toLowerCase());return r&&a}),0===(t=0,r._items.forEach(function(e){e._isActive&&(t+=1)}),t)&&(document.getElementById("noResults").innerHTML="NO RESULTS FOLKS!")}function s(){r.getItems().forEach(function(e,t){e.getElement().setAttribute("data-id",t+1),e.getElement().querySelector(".card-id").innerHTML=t+1})}e=0,r=new Muuri(d,{items:document.getElementsByClassName("item"),layout:{horizontal:!1,alignRight:!1,alignBottom:!1,fillGaps:!0},layoutDuration:400,layoutEasing:"ease",dragEnabled:!1,dragSortInterval:50,dragContainer:document.body,dragStartPredicate:function(e,t){var r="order"===a;return!!r&&Muuri.ItemDrag.defaultStartPredicate(e,t)},dragReleaseDuration:400,dragReleseEasing:"ease"}).on("dragStart",function(){++e,t.classList.add("dragging")}).on("dragEnd",function(){--e<1&&t.classList.remove("dragging")}).on("move",s).on("sort",s),l.value="",[u].forEach(function(e){e.value=e.querySelectorAll("option")[0].value}),o=l.value.toLowerCase(),n=u.value,l.addEventListener("keyup",function(){var e=l.value.toLowerCase();o!==e&&(o=e,c())}),u.addEventListener("change",c)});