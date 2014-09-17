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


      // temp code //
      // var intro__video = document.getElementById('video');
      // intro__video.addEventListener("canplay", function(){ intro__video.currentTime = 4;}); 
      // // temp end //
      // intro__video.play();



      var windowHeight = $(window).innerHeight();
      function getWindowHeight(){
        windowHeight = $(window).innerHeight();
        return windowHeight;
      }
      $(window).resize(function(){
        getWindowHeight();
      })



      function videoStart(){
        // temp code //
        var intro__video = document.getElementById('video');
        // intro__video.addEventListener("canplay", function(){ intro__video.currentTime = 4;}); 
        intro__video.currentTime = 4; 
        // temp end //
        intro__video.play();
      }
      
      // ScrollMagic
      this.controller = new ScrollMagic();

      // TWEEN : INTRO
      var intro_tl = new TimelineMax();
      intro_tl.fromTo('.intro__title', 1, {'opacity': '0'} , {'opacity': '1', delay:1})
      intro_tl.fromTo('.intro__overlay', 0.8, {'border': '0px solid #fff'} , {'border': '8px solid #fff', ease:Power2.easeOut})
      intro_tl.fromTo('.intro .btn', 0.8, {'bottom': '5%', 'opacity' : '0'} , {'bottom': '12%' , 'opacity' : '1', ease:Power2.easeOut})
      intro_tl.call(videoStart)



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


      // SCENE : INTRO > EDITO
      var introToEdito_scene = new ScrollScene({triggerElement: '#trigger-edito'/*, duration: 0*/})
      .setTween(introToEdito_tl)
      .addTo(this.controller);
      // show indicators (requires debug extension)
      // introToEdito_scene.addIndicators();

      // pause or play the video regarding scroll position
      introToEdito_scene.on("start", function(event){
        if(event.scrollDirection === 'FORWARD'){
          $('.intro__video').trigger('pause');
        }
        else if(event.scrollDirection === 'REVERSE'){
          $('.intro__video').trigger('play');
        }
      });






      // TWEEN : EDITO > TRENDSETTERS
      var editoToTrendSetters_tl = new TimelineMax();
      //editoToTrendSetters_tl.call(function(){console.log('edito to trendSetters')})
      editoToTrendSetters_tl.staggerTo('.edito__text p', 0.8, {'opacity' : '0', 'top' : '-20px'}, 0.4)
      editoToTrendSetters_tl.fromTo('.edito .btn', 0.8, {'bottom': '12%' , 'opacity' : '1'}, {'bottom': '14%' , 'opacity' : '0', immediateRender : false}, '-=0.4')

      editoToTrendSetters_tl.add([
        TweenMax.to('.edito', 1, {'top': '-100%', ease:Power1.easeOut }),
        TweenMax.fromTo('.trendSetters', 1, {'top': '50%'} , {'top': '0' })
      ])

      // SCENE : EDITO > TRENDSETTERS
      var editoToTrendSetters_scene = new ScrollScene({triggerElement: '#trigger-editoToTrendSetters'/*, duration: 2000*/})
      .setTween(editoToTrendSetters_tl)
      .addTo(this.controller);




      // TWEEN : TRENDSETTERS

      var trendSettersHeight = Number($('.trendSetters').height());

      var trendSetters_tl = new TimelineMax();
      trendSetters_tl.add([
        TweenMax.fromTo('.trendSetters', 1, {'top' : '0'},{'top' : $(window).innerHeight() - $('.trendSetters').height() })      

      ])
console.log('duration' + trendSettersHeight *4)
      // SCENE : TRENDSETTERS
      var trendSetters_scene = new ScrollScene({
        triggerElement: '#trigger-trendSetters',
        tweenChanges: true,
        duration: trendSettersHeight 
      })
      .setTween(trendSetters_tl)
      .addTo(this.controller)

      trendSetters_scene.addIndicators();

    }


    $(window).on('load', function () {
        var app = new HoganLanging().init();
    });


})(jQuery, window);
