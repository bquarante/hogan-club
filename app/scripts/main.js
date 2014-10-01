;(function($, window){
    'use strict';
    var HoganLanging = function () {
        return this;
    }

    var hl = HoganLanging;
    
    hl.prototype.init = function() {

      // Set video to cover the whole page whatever its size
      $('#video').maximage('maxcover');

      function videoStart(){
        var intro__video = document.getElementById('video');
        //intro__video.play();
      }
      
      
      var svgHeight = $('svg image').attr('height'),
          maskHeightEnd = svgHeight / 2;

      // set mask height
      $('#svgPath rect').attr('height', $('svg image').attr('height'));

      // move each rect mask
      $( "#svgPath rect" ).each(function( index, element ) {

        index = index+1;
        var obj = $('#svgPath rect:nth-child(' + index + ')');
        var mask = {maskHeight: obj.attr('height')};
        TweenLite.to(mask, 1, {maskHeight: maskHeightEnd, onUpdate: onUpdateHandler, delay: index*0.13});
      
        function onUpdateHandler() {
            $('#svgPath rect:nth-child('+ index + ')').attr('height', mask.maskHeight);
        }
      });

      //TweenLite.to($('svg image'), 2, {y:-maskHeightEnd})

     
      // ScrollMagic
      // var controller = new ScrollMagic();

      // // build scene
      // var scene = new ScrollScene({
      //   triggerElement: '.trig-intro',
      //   triggerHook: 'onLeave',
      //   duration: 500
      // })
      //   .setPin('.intro')
      //   .addTo(controller)
      //   .addIndicators({zindex: 100});
       
    





    }//init end

    $(window).on('load', function () {
        var app = new HoganLanging().init();
    });


})(jQuery, window);
