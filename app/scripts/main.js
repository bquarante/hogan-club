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

        TweenMax.to($('.scrollContent'),.4,{
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
        TweenMax.fromTo('.trendSetters', 1, {'top': '50%'} , {'top': '0' , ease:Power1.easeOut}),
        TweenMax.fromTo('.trendSetter1 .trendSetter--name', 1.4, {'top' : '100%'},{'top' : '40%', ease:Power1.easeOut}),
        TweenMax.fromTo('.trendSetter1--picture1', 1, {'top' : '100%'},{'top' : '20%', ease:Power3.easeOut}),
        TweenMax.fromTo('.trendSetter1--picture2', 1, {'top' : '100%'},{'top' : '80%', ease:Power3.easeOut})
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
          enableNextStep(2)
        }
      });


      // SCROLLBAR SET TO TRENDSETTERS TOTAL HEIGHT

      // TWEEN : TRENDSETTERS
      var trendSetters_tl = new TimelineMax();
      trendSetters_tl.add([
        TweenMax.to('.trendSetters', 1, {'top' : $(window).innerHeight() - $('.trendSetters').height() })
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
      


      // TRENDSETTER 1

      // TWEEN
      var trendSetter1_tl = new TimelineMax();
      trendSetter1_tl.add([
        TweenMax.to('.trendSetter1 .trendSetter--name', 6, {'top' : -($('.trendSetter1 .trendSetter--name').height()+10) }),
        TweenMax.to('.trendSetter1--picture1', 3, {'top' : -($('.trendSetter1--picture1').height())}),
        TweenMax.to('.trendSetter1--picture2', 2, {'top' : -($('.trendSetter1--picture2').height())}),
        TweenMax.to('.trendSetter1 .quote', 8, {'top' : -($('.trendSetter1 .quote').height())}),
        TweenMax.to('.trendSetter1--picture3', 5, {'top' : -($('.trendSetter1--picture3').height()), delay:3}),
        TweenMax.to('.trendSetter1--picture4', 10, {'top' : -($('.trendSetter1--picture4').height()), delay:1})
      ])
       
      // SCENE 
      var trendSetters1_scene = new ScrollScene({
        triggerElement: '.trendSetter1',
        triggerHook: 'onLeave',
        // tweenChanges: true,
        offset: 20, // to prevent tween to restart from previous starting point -100% (!) because its the same trigger
        duration: getWindowHeight
      })
      .setTween(trendSetter1_tl)
      .addTo(controller)
      trendSetters1_scene.addIndicators({zindex:100})


      // TRENDSETTER 2

      // TWEEN
      var trendSetter2_tl = new TimelineMax();
      trendSetter2_tl.add([
        TweenMax.to('.trendSetter2 .trendSetter--name', 6, {'top' : -($('.trendSetter2 .trendSetter--name').height()+10) }),
        //TweenMax.to('.trendSetter2 .trendSetter--name', 2, {'opacity' : 0 , delay:2}),
        TweenMax.to('.trendSetter2 .quote', 8, {'top' : -($('.trendSetter2 .quote').height()), delay:1})
        // TweenMax.to('.trendSetter2--picture1', 3, {'top' : -($('.trendSetter2--picture1').height())})
        // TweenMax.to('.trendSetter2--picture2', 2, {'top' : -($('.trendSetter2--picture2').height())}),
        // TweenMax.to('.trendSetter2--picture3', 5, {'top' : -($('.trendSetter2--picture3').height()), delay:3}),
        // TweenMax.to('.trendSetter2--picture4', 10, {'top' : -($('.trendSetter2--picture4').height()), delay:1})
      ])

      // SCENE 
      var trendSetters2_scene = new ScrollScene({
        triggerElement: '.trendSetter2',
        triggerHook: 'onCenter',
        // offset: 20,
        duration: getWindowHeight
      })
      .setTween(trendSetter2_tl)
      .addTo(controller)
      //trendSetters2_scene.addIndicators({zindex:100})

    }


    $(window).on('load', function () {
        var app = new HoganLanging().init();
    });


})(jQuery, window);
