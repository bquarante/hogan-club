!function(a,b){"use strict";var c=function(){return this},d=c;d.prototype.init=function(){function c(){return f}function d(){var a=document.getElementById("video");a.currentTime=4,a.play()}function e(c){console.log("STEP --->"+c);var d=a(".trigger"+Number(c)).position().top,e=a(b).innerHeight()+d+2+"px";TweenMax.to(a(".scrollContent"),.4,{height:e,onComplete:function(){3===c&&o.addTo(g)}})}a("#video").maximage("maxcover");var f=a(b).innerHeight();a(b).on("resize",function(){f=a(b).innerHeight()});var g=new ScrollMagic,h=new TimelineMax;h.fromTo(".intro__title",1,{opacity:"0"},{opacity:"1",delay:1}),h.fromTo(".intro__overlay",.8,{border:"0px solid #fff"},{border:"8px solid #fff",ease:Power2.easeOut}),h.fromTo(".intro .btn",.8,{bottom:"5%",opacity:"0"},{bottom:"12%",opacity:"1",ease:Power2.easeOut}),h.call(d),h.call(e,[1]);var i=(new ScrollScene({triggerElement:".trigger0",triggerHook:"onLeave"}).setTween(h).addTo(g),new TimelineMax);i.add([TweenMax.fromTo(".intro__overlay",.8,{border:"8px solid #fff"},{border:"0px solid #fff",immediateRender:!1}),TweenMax.fromTo(".intro__overlay",.8,{backgroundColor:"rbga(0,0,0,0)"},{backgroundColor:"rbga(0,0,0,0.8)",immediateRender:!1}),TweenMax.fromTo(".intro .btn",.8,{bottom:"12%",opacity:"1"},{bottom:"14%",opacity:"0",immediateRender:!1})]),i.add([TweenMax.to(".intro",1,{top:"-100%",ease:Power1.easeOut}),TweenMax.fromTo(".edito",1,{top:"20%"},{top:"0%"})]),i.add([TweenMax.to(".edito__backgroundOver",.8,{opacity:"1"}),TweenMax.staggerFromTo(".edito__text p",.8,{opacity:"0",top:"20px"},{opacity:"1",top:"0"},.4)]),i.fromTo(".edito .btn",.8,{bottom:"5%",opacity:"0"},{bottom:"12%",opacity:"1"}),i.call(e,[2]);var j=new ScrollScene({triggerElement:".trigger1",triggerHook:"onLeave"}).setTween(i).addTo(g);j.on("start",function(a){"REVERSE"===a.scrollDirection&&e(1)}),j.on("start",function(b){"FORWARD"===b.scrollDirection?a(".intro__video").trigger("pause"):"REVERSE"===b.scrollDirection&&a(".intro__video").trigger("play")});var k=new TimelineMax;k.call(function(){console.log("edito To TrendSetters "),j.enabled(!0)}),k.staggerTo(".edito__text p",.8,{opacity:"0",top:"-20px"},.4),k.fromTo(".edito .btn",.8,{bottom:"12%",opacity:"1"},{bottom:"14%",opacity:"0",immediateRender:!1},"-=0.4"),k.add([TweenMax.to(".edito",1,{top:"-100%",ease:Power1.easeOut}),TweenMax.fromTo(".trendSetters",1,{top:"50%"},{top:"0",ease:Power1.easeOut}),TweenMax.fromTo(".trendSetter1 .trendSetter--name",1.4,{top:"100%"},{top:"40%",ease:Power1.easeOut}),TweenMax.fromTo(".trendSetter1--picture1",1,{top:"100%"},{top:"20%",ease:Power3.easeOut}),TweenMax.fromTo(".trendSetter1--picture2",1,{top:"100%"},{top:"80%",ease:Power3.easeOut})]),k.call(e,[3]);var l=new ScrollScene({triggerElement:".trigger2",triggerHook:"onLeave"}).setTween(k).addTo(g);l.on("start",function(a){"REVERSE"===a.scrollDirection&&(j.enabled(!1),e(2))});var m=new TimelineMax;m.add([TweenMax.to(".trendSetters",1,{top:a(b).innerHeight()-a(".trendSetters").height()})]);var n=Math.abs(a(".trigger2").position().top-a(".trigger3").position().top),o=new ScrollScene({triggerHook:"onLeave",triggerElement:".trigger2",duration:n}).setTween(m),p=new TimelineMax;p.add([TweenMax.to(".trendSetter1 .trendSetter--name",6,{top:-(a(".trendSetter1 .trendSetter--name").height()+10)}),TweenMax.to(".trendSetter1--picture1",3,{top:-a(".trendSetter1--picture1").height()}),TweenMax.to(".trendSetter1--picture2",2,{top:-a(".trendSetter1--picture2").height()}),TweenMax.to(".trendSetter1 .quote",8,{top:-a(".trendSetter1 .quote").height()}),TweenMax.to(".trendSetter1--picture3",5,{top:-a(".trendSetter1--picture3").height(),delay:3}),TweenMax.to(".trendSetter1--picture4",10,{top:-a(".trendSetter1--picture4").height(),delay:1})]);var q=new ScrollScene({triggerElement:".trendSetter1",triggerHook:"onLeave",offset:20,duration:c}).setTween(p).addTo(g);q.addIndicators({zindex:100});var r=new TimelineMax;r.add([TweenMax.to(".trendSetter2 .trendSetter--name",6,{top:-(a(".trendSetter2 .trendSetter--name").height()+10)}),TweenMax.to(".trendSetter2 .quote",8,{top:-a(".trendSetter2 .quote").height(),delay:1})]);new ScrollScene({triggerElement:".trendSetter2",triggerHook:"onCenter",duration:c}).setTween(r).addTo(g)},a(b).on("load",function(){(new c).init()})}(jQuery,window);