;(function($, window){
    'use strict';
    var HoganLanging = function () {
        return this;
    }

    var hl = HoganLanging;
    
    hl.prototype.init = function() {

      function videoControl(control){
        console.log('videocontrols : ' +control)
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
          videoTweenTime = svgHeight/3;

      var thevideo = document.getElementById('video');
      var thecanvas = document.getElementById('thecanvas');
      // create masks
      for(var i=1; i <= masks; i++){
        maskTags += '<rect id="rect'+ i +'" class="rect" x="' + ((maskWidth*(i-1)) + maskOffset) + '" y="0" width="' + maskWidth + '" height="' + svgHeight + '"></rect>';
      }
      
      $('#svgPath').html(maskTags)
 
      function videoMask( video, thecanvas){
        console.log('mask')
        // get the canvas context for drawing
        var context = thecanvas.getContext('2d');
        // draw the video contents into the canvas x, y, width, height
        context.drawImage( video, 0, 0, thecanvas.width, thecanvas.height);
        // get the image data from the canvas object
        var dataURL = thecanvas.toDataURL("image/jpg");
        // set the source of the img svg
        $('svg image').attr('xlink:href', dataURL);
        $('svg').css({'visibility' : 'visible'})
        // hide the video
        $('#video').css({'visibility' : 'hidden'})
      }

      thevideo.addEventListener('pause', function(){
        videoMask(video, thecanvas);
      }, false);
      thevideo.addEventListener('play', function(){
        $('svg').css({'visibility' : 'hidden'})
        $('#video').css({'visibility' : 'visible'})
      }, false);

      //thevideo.play();








      var controller = new ScrollMagic();


      // build tween
/*.call(videoControl,['pause'])*/
        

      // build scene
      var pinVideo_scene = new ScrollScene({triggerElement: ".trigger1", triggerHook: 'onLeave', duration: videoTweenTime})
      .setPin(".intro")
      .addTo(controller);

      pinVideo_scene.on("start", function(event){
        if(event.scrollDirection === 'FORWARD'){
          video.pause();
        }
        else if(event.scrollDirection === 'REVERSE'){
         video.play();
        }
      });
      // show indicators (requires debug extension)
      pinVideo_scene.addIndicators({
        zindex : 100
      });

      // build tween
      var maskVideo_tl = new TimelineMax()
      .add([
        TweenMax.staggerTo(".rect", 1, {attr:{height:videoTweenTime}, ease:Linear.easeout}, 0.1)   
      ])

      // build scene
      var maskVideo_scene = new ScrollScene({triggerElement: ".trigger2", triggerHook: 'onLeave', offset: videoTweenTime, duration: videoTweenTime})
      .setTween(maskVideo_tl)
      .addTo(controller);
     /* maskVideo_scene.on('enter', function () {
        video.pause();
      })*/
      // show indicators (requires debug extension)
      maskVideo_scene.addIndicators({
        zindex : 100
      });


    }//init end

    $(window).on('load', function () {
        var app = new HoganLanging().init();
    });


})(jQuery, window);
