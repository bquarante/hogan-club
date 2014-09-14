;(function($, window){
    'use strict';
    var HoganLanging = function () {
        return this;
    }

    var hl = HoganLanging;
    
    hl.prototype.init = function() {


      //set video to cover the whole page whatever its size 
      $('.intro__video').maximage('maxcover');
      TweenMax.fromTo('.intro__overlay', 0.8, {'border': '0px solid #fff'} , {'border': '8px solid #fff', delay:2, ease:Power2.easeOut});



      // ScrollMagic
      this.controller = new ScrollMagic();

      // TWEEN -> INTRO OFF
      var intro_off_tween = new TimelineMax()
      .add(
        TweenMax.to('.intro__overlay', 0.3, {'border': '0px solid #fff'})
      )
      .add(
        TweenMax.to('.intro__overlay', 0.5, {backgroundColor: 'rbga(0,0,0,0.8)'})
      )
      .add(
        TweenMax.to('.intro', 1.4, {'position' : 'absolute','top': '-100%', ease:Power2.easeOut })
      )

      // build scene
      var intro_scene = new ScrollScene({triggerElement: '#trigger-intro'}) //, duration: 700
      .setTween(intro_off_tween)
      .addTo(this.controller);
      // show indicators (requires debug extension)
      // scene.addIndicators();

      // pause or play the video regarding scroll position
      intro_scene.on("start", function(event){
        if(event.scrollDirection === 'FORWARD'){
          $('.intro__video').trigger('pause');
        }
        else if(event.scrollDirection === 'REVERSE'){
          $('.intro__video').trigger('play');
        }
      });

      // TWEEN -> EDITO ON
      // keep the delay to be sure to see the animation even if the user scrolls too fast 
      var edito_text_tl = new TimelineMax()  
      edito_text_tl.staggerTo(".edito__background-over", 1, {'opacity' : '1', delay : 1}, 0);
      edito_text_tl.staggerTo(".edito__text p", 1, {'opacity' : '1', 'top' : '0', delay : 0}, 0.5);

      // build scene
      var edito_scene = new ScrollScene({triggerElement: '#trigger-edito'/*, duration: 200*/}) 
      .setTween(edito_text_tl)
      .addTo(this.controller);



    }


    $(window).on('load', function () {
        var app = new HoganLanging().init();
    });


})(jQuery, window);
