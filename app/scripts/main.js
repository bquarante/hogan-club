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

      // make a variable to store the window height.
      var windowHeight = $(window).innerHeight();
      // function to be used to retrieve variable
      function getWindowHeight() {
        return windowHeight;
      }
      // update window height on resize
      $(window).on("resize", function () {
        windowHeight = $(window).innerHeight();
      });

      function videoStart(){
        // temp code //
        var intro__video = document.getElementById('video');
        // intro__video.addEventListener("canplay", function(){ intro__video.currentTime = 4;}); 
        intro__video.currentTime = 4; 
        // temp end //
        intro__video.play();
      }
      

      function enableNextStep(step){
        console.log('STEP --->' + step)
        var triggerHeight = $('.trigger' + Number(step)).position().top;
        var scrollingHeight = $(window).innerHeight() + triggerHeight + 2 + 'px'

        TweenMax.to($('.scrollContent'),1,{
          'height' : scrollingHeight,
          onComplete : function(){
            if(step === 3){
              trendSetters_scene.addTo(controller)
            }
          }
        });
      }


      // ScrollMagic
      var controller = new ScrollMagic();

      // TWEEN : INTRO
      var intro_tl = new TimelineMax();
      
      intro_tl.fromTo('.intro__title', 1, {'opacity': '0'} , {'opacity': '1', delay:1})
      intro_tl.fromTo('.intro__overlay', 0.8, {'border': '0px solid #fff'} , {'border': '8px solid #fff', ease:Power2.easeOut})
      intro_tl.fromTo('.intro .btn', 0.8, {'bottom': '5%', 'opacity' : '0'} , {'bottom': '12%' , 'opacity' : '1', ease:Power2.easeOut})
      intro_tl.call(videoStart)
      intro_tl.call(enableNextStep, [1])
      
      // SCENE : INTRO
      var intro_scene = new ScrollScene({
        triggerElement: '.trigger0',
        triggerHook: "onLeave"
      })
      .setTween(intro_tl)
      .addTo(controller);

      // ---------------- //


      // TWEEN : INTRO > EDITO
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
      .addTo(controller);

      
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
      editoToTrendSetters_tl.call(function(){console.log('edito To TrendSetters ');introToEdito_scene.enabled(true)})
      editoToTrendSetters_tl.staggerTo('.edito__text p', 0.8, {'opacity' : '0', 'top' : '-20px'}, 0.4)
      editoToTrendSetters_tl.fromTo('.edito .btn', 0.8, {'bottom': '12%' , 'opacity' : '1'}, {'bottom': '14%' , 'opacity' : '0', immediateRender : false}, '-=0.4')
      editoToTrendSetters_tl.add([
        TweenMax.to('.edito', 1, {'top': '-100%', ease:Power1.easeOut }),
        TweenMax.fromTo('.trendSetters', 1, {'top': '50%'} , {'top': '0' })
      ]);
      editoToTrendSetters_tl.call(enableNextStep, [3])

      // SCENE : EDITO > TRENDSETTERS
      var editoToTrendSetters_scene = new ScrollScene({
        triggerElement: '.trigger2',
        triggerHook: 'onLeave'
      })
      .setTween(editoToTrendSetters_tl)
      .addTo(controller)
      

      editoToTrendSetters_scene.on("start", function(event){
        if(event.scrollDirection === 'REVERSE'){
          introToEdito_scene.enabled(false);
        }
      });



      // TWEEN : TRENDSETTERS
      var trendSetters_tl = new TimelineMax();
      trendSetters_tl.add([
        TweenMax.fromTo('.trendSetters', 1, {'top' : '0'},{'top' : $(window).innerHeight() - $('.trendSetters').height() })      

      ])

      var durationTrendSetters = Math.abs( $('.trigger2').position().top -  $('.trigger3').position().top) 
      
      // SCENE : TRENDSETTERS
      var trendSetters_scene = new ScrollScene({
        triggerHook: 'onLeave',
        triggerElement: '.trigger2',
        //tweenChanges: true,
        duration: durationTrendSetters
      })
      .setTween(trendSetters_tl)
      //trendSetters_scene.addTo(controller)
      //.addIndicators({zindex: 100})

      //trendSetters_scene.addIndicators();


      // var trendSetters_title_scene = new ScrollScene({
      //   triggerElement: '#trigger-trendSetters',
      //   //tweenChanges: true,
      //   duration: getWindowHeight/2
      // })
      // .setTween(
      //   TweenMax.fromTo('.trendSetter__1 .trendSetter__title', 1, {'top' : '100%'},{'top' : '20%'})
      // )
      // .addTo(controller)




    }


    $(window).on('load', function () {
        var app = new HoganLanging().init();
    });


})(jQuery, window);
