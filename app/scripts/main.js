;(function($, window){
    'use strict';
    var HoganLanging = function () {
        return this;
    }

    var hl = HoganLanging;
    
    hl.prototype.init = function() {

      // INIT
      // Set video to cover the whole page whatever its size
      $('#video').maximage('maxcover');


      function videoStart(){
        // temp code //
        var intro__video = document.getElementById('video');
        // intro__video.addEventListener("canplay", function(){ intro__video.currentTime = 4;}); 
        intro__video.currentTime = 4; 
        // temp end //
        intro__video.play();
      }
        

      function enableNextStep(step){
        var triggerHeight = $('.trigger' + Number(step)).position().top;
        console.log('STEP --->' + step)
        var scrollingHeight = $(window).innerHeight() + triggerHeight + 2 + 'px'

        TweenMax.to($('.scrolling'),1,{
          'height' : scrollingHeight,
          onComplete : function(){
          }
        });
      }


      // ScrollMagic
      this.controller = new ScrollMagic();


      // TWEEN : INTRO
      var intro_tl = new TimelineMax();
      
      intro_tl.fromTo('.intro__title', 1, {'opacity': '0'} , {'opacity': '1', delay:1})
      intro_tl.fromTo('.intro__overlay', 0.8, {'border': '0px solid #fff'} , {'border': '8px solid #fff', ease:Power2.easeOut})
      intro_tl.fromTo('.intro .btn', 0.8, {'bottom': '5%', 'opacity' : '0'} , {'bottom': '12%' , 'opacity' : '1', ease:Power2.easeOut})
      intro_tl.call(videoStart)
      intro_tl.call(enableNextStep, [1])


      var intro_scene = new ScrollScene({
        triggerElement: '.trigger0',
        triggerHook: "onLeave"
      })
      .setTween(intro_tl)
      .addTo(this.controller);


      // ---------------- //


      //TWEEN : INTRO > EDITO
      var introToEdito_tl = new TimelineMax();
      introToEdito_tl.add([
        TweenMax.fromTo('.intro__overlay', 0.8, {'border': '8px solid #fff'}, {'border': '0px solid #fff', immediateRender : false}),
        TweenMax.fromTo('.intro__overlay', 0.8, {backgroundColor: 'rbga(0,0,0,0)'}, {backgroundColor: 'rbga(0,0,0,0.8)', immediateRender : false}),
        TweenMax.fromTo('.intro .btn', 0.8, {'bottom': '12%' , 'opacity' : '1'}, {'bottom': '14%' , 'opacity' : '0', immediateRender : false})
      ])
      introToEdito_tl.add([
        TweenMax.to('.intro', 1, {'top': '-100%', ease:Power1.easeOut }),
        TweenMax.fromTo('.edito', 1, {'top': '20%'} , {'top': '0%'})
      ])
      introToEdito_tl.add([
        TweenMax.to('.edito__backgroundOver', 0.8, {'opacity' : '1'}),
        TweenMax.staggerFromTo('.edito__text p', 0.8, {'opacity' : '0', 'top' : '20px'} , {'opacity' : '1', 'top' : '0'}, 0.4)

      ])
      introToEdito_tl.fromTo('.edito .btn', 0.8, {'bottom': '5%', 'opacity' : '0'} , {'bottom': '12%' , 'opacity' : '1'})
      introToEdito_tl.call(enableNextStep, [2])

      // SCENE : INTRO > EDITO
      var introToEdito_scene = new ScrollScene({
        triggerElement: '.trigger1',
        triggerHook: "onLeave"
      })
      .setTween(introToEdito_tl)
      .addTo(this.controller);

      
      introToEdito_scene.on("start", function(event){
        if(event.scrollDirection === 'REVERSE'){
          enableNextStep(1)
        }
      });

      // pause or play the video regarding scroll direction
      introToEdito_scene.on("start", function(event){
        if(event.scrollDirection === 'FORWARD'){
          $('.intro__video').trigger('pause');
        }
        else if(event.scrollDirection === 'REVERSE'){
          $('.intro__video').trigger('play');
        }
      });


      // ---------------- //


      // TWEEN : EDITO > TRENDSETTERS
      var editoToTrendSetters_tl = new TimelineMax();
      editoToTrendSetters_tl.call(function(){introToEdito_scene.enabled(true)});
      editoToTrendSetters_tl.staggerTo('.edito__text p', 0.8, {'opacity' : '0', 'top' : '-20px'}, 0.4)
      editoToTrendSetters_tl.fromTo('.edito .btn', 0.8, {'bottom': '12%' , 'opacity' : '1'}, {'bottom': '14%' , 'opacity' : '0', immediateRender : false}, '-=0.4')

      editoToTrendSetters_tl.add([
        TweenMax.to('.edito', 1, {'top': '-100%', ease:Power1.easeOut }),
        TweenMax.fromTo('.trendSetters', 1, {'top': '50%'} , {'top': '0' })
      ])
      editoToTrendSetters_tl.call(enableNextStep, [3])

      // SCENE : EDITO > TRENDSETTERS
      var editoToTrendSetters_scene = new ScrollScene({
        triggerElement: '.trigger2',
        triggerHook: 'onLeave'
      })
      .setTween(editoToTrendSetters_tl)
      .addTo(this.controller);

      editoToTrendSetters_scene.on("start", function(event){
        if(event.scrollDirection === 'REVERSE'){
          introToEdito_scene.enabled(false);
        }
      });



      // // TWEEN : TRENDSETTERS
      // var trendSetters_tl = new TimelineMax();
      // trendSetters_tl.add([
      //   TweenMax.fromTo('.trendSetters', 1, {'top' : '0'},{'top' : $(window).innerHeight() - $('.trendSetters').height() })      

      // ])

      
      // // SCENE : TRENDSETTERS
      // var trendSetters_scene = new ScrollScene({
      //   triggerElement: '#trigger-trendSetters',
      //   tweenChanges: true,
      //   duration: getWindowHeight
      // })
      // .setTween(trendSetters_tl)
      // .addTo(this.controller)

      // trendSetters_scene.addIndicators();



      // var trendSetters_title_scene = new ScrollScene({
      //   triggerElement: '#trigger-trendSetters',
      //   //tweenChanges: true,
      //   duration: getWindowHeight/2
      // })
      // .setTween(
      //   TweenMax.fromTo('.trendSetter__1 .trendSetter__title', 1, {'top' : '100%'},{'top' : '20%'})
      // )
      // .addTo(this.controller)




    }


    $(window).on('load', function () {
        var app = new HoganLanging().init();
    });


})(jQuery, window);
