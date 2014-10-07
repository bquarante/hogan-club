;(function($, window){
    'use strict';
    var HoganLanging = function () {
        return this;
    }

    var hl = HoganLanging;
    
    hl.prototype.init = function() {

      function videoControl(control){
        console.log('yo')
        var video = document.getElementById('video');
        switch (control) {
          case "play":
            video.play();
            break;
          case "pause":
            video.pause();
            break;
        }
        //intro__video.play();
      }
      
      // Set video to cover the whole page whatever its size
      $('#video').maximage('maxcover');
      $('#thecanvas').attr('width', ($('#video').width()));
      $('#thecanvas').attr('height', $('#video').height());
      $('svg').attr('width', $('#video').width());
      $('svg').attr('height', $('#video').height());
      $('svg').css({
        'margin-left' : $('#video').css('margin-left'),
        'margin-top' : $('#video').css('margin-top')
      });
      //$('svg image').attr('width', $('#video').width());
      //$('svg image').attr('height', $('#video').height());
      $('#svgPath rect').attr('height', $('svg').attr('height'));

      var masks = 6,
          maskTotalWidth = $('svg').parent().width(),
          maskWidth = Math.round(maskTotalWidth/masks),
          svgHeight = $('svg').attr('height'),
          maskHeightEnd = Math.round(svgHeight / 2),
          maskOffset = Math.round( (($('svg').attr('width')) - maskTotalWidth)/2),
          maskTags = '',
          tweenTime = svgHeight/3;

      var thevideo = document.getElementById('video');
      var thecanvas = document.getElementById('thecanvas');
      // create masks
      for(var i=1; i <= masks; i++){
        maskTags += '<rect id="rect'+ i +'" class="rect" x="' + ((maskWidth*(i-1)) + maskOffset) + '" y="0" width="' + maskWidth + '" height="' + svgHeight + '"></rect>';
      }
      
      $('#svgPath').html(maskTags)
 
      function videoMask( video, thecanvas){
        // get the canvas context for drawing
        var context = thecanvas.getContext('2d');
        // draw the video contents into the canvas x, y, width, height
        context.drawImage( video, 0, 0, thecanvas.width, thecanvas.height);
        // get the image data from the canvas object
        var dataURL = thecanvas.toDataURL();
        // set the source of the img svg
        $('svg image').attr('xlink:href', dataURL);
        $('svg').css({'visibility' : 'visible'})
        // hide the video
        $('#video').css({'visibility' : 'hidden'})
      }

      thevideo.addEventListener('pause', function(){
        videoMask(video, thecanvas);
      }, false);

      var controller = new ScrollMagic();

      // build tween
      var tl = new TimelineMax()
        //.call(videoControl,['pause'])
        .add([
          TweenMax.staggerTo(".rect", 1, {attr:{height:tweenTime}, ease:Linear.easeout}, 0.1)
          
        ])

      // build scene
      var scene = new ScrollScene({triggerElement: ".trigger", triggerHook: 'onLeave', duration: tweenTime})
              .setTween(tl)
              .addTo(controller);

      // show indicators (requires debug extension)
      scene.addIndicators({
        zindex : 100
      });


    }//init end

    $(window).on('load', function () {
        var app = new HoganLanging().init();
    });


})(jQuery, window);
