;(function($, window){
    'use strict';
    var HoganLanging = function () {
        return this;
    }

    var hl = HoganLanging;
    
    hl.prototype.init = function() {

      // Set video to cover the whole page whatever its size
      $('#video').maximage('maxcover');
      $('#thecanvas').attr('width', ($('#video').width()));
      $('#thecanvas').attr('height', $('#video').height());
      $('svg').attr('width', ($('#video').width()));
      $('svg').attr('height', $('#video').height());
      $('svg').css({
        'margin-left' : $('#video').css('margin-left'),
        'margin-top' : $('#video').css('margin-top')
      });
      function videoStart(){
        var intro__video = document.getElementById('video');
        //intro__video.play();
      }

      /* 
      ------  
      */
      var thevideo = document.getElementById('video');
      var thecanvas = document.getElementById('thecanvas');
      var img = document.getElementById('video-img');
 
      // set mask height
      $('#svgPath rect').attr('height', $('svg').attr('height'));
        
      function draw( video, thecanvas, img ){

        // get the canvas context for drawing
        var context = thecanvas.getContext('2d');

        // draw the video contents into the canvas x, y, width, height
        context.drawImage( video, 0, 0, thecanvas.width, thecanvas.height);

        // get the image data from the canvas object
        var dataURL = thecanvas.toDataURL();

        // set the source of the img svg
        $('svg image').attr('xlink:href', dataURL);
        $('.video-over').css({'visibility' : 'visible'})
        // hide the video
        $('#video').css({'visibility' : 'hidden'})
        mask();
      }

      function mask(){


        var svgHeight = $('svg').attr('height'),
            maskHeightEnd = svgHeight / 2;

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
      }

      thevideo.addEventListener('pause', function(){
        draw( video, thecanvas, img);
      }, false);



    }//init end

    $(window).on('load', function () {
        var app = new HoganLanging().init();
    });


})(jQuery, window);
