define(['jquery', 'marionette', 'underscore', 'tools/marionette.override', 'waypoints', 'waypoints-sticky','jquery-color'],
    function($, Marionette, _){

    'use strict';

    var application = new Marionette.Application();

    application.on('initialize:after', function() {
        
        $('.calendar').waypoint('sticky');

        $('#third').waypoint({
            handler : function(){ $('.calendar').toggleClass('bottom');},
            offset : '697'  //top + height + bottom
        });

        $('.content li').each(function(){
            $(this).waypoint({
                handler : _.bind(function(){
                    $('.calendar h2').removeClass('active');
                    $('.' + $(this).attr('data')).addClass('active');
                }, this),
                offset : '500'
            });
        });

        $('.mountain').waypoint({
            handler : function(){
                $('.calendar').toggleClass('snow');
                //$('.calendar').toggleClass('snow');
            },
            offest : '0'
        });

        $('.calendar h2').each(function(){
            var offs = $(this).offset().top - $('.calendar').offset().top;
            $('.snow').waypoint({
                offset : offs,
                handler : _.bind(function(){
                    $(this).toggleClass('white');
                }, this)
            });
        });
        
        var $window = $(window);
    
        // Cache the Y offset and the speed of each sprite
        $('[data-type]').each(function() {
            $(this).data('offsetY', parseInt($(this).attr('data-offsetY')));
            $(this).data('Xposition', $(this).attr('data-Xposition'));
            $(this).data('speed', $(this).attr('data-speed'));
        });
    
        $('section[data-type="background"]').each(function(){
        
            var $self = $(this),
                offsetCoords = $self.offset(),
                topOffset = offsetCoords.top;
            
            $(window).scroll(function() {
        
                // If this section is in view
                if ( ($window.scrollTop() + $window.height()) > (topOffset) &&
                     ( (topOffset + $self.height()) > $window.scrollTop() ) ) {
        
                    // Scroll the background at var speed
                    var yPos = -($window.scrollTop() / $self.data('speed'));
                    if ($self.data('offsetY')) {
                        yPos += $self.data('offsetY');
                    }

                    var coords = '50% '+ yPos + 'px';
                    $self.css({ backgroundPosition: coords });
                    
                    // Check for other sprites in this section  
                    $('[data-type="sprite"]', $self).each(function() {
                        
                        console.log($(this).attr('class'));

                        var $sprite = $(this);
                        var yPos = -($window.scrollTop() / $sprite.data('speed'));
                        var y = (yPos + $sprite.data('offsetY')) + 'px';
                        //var x = $sprite.data('Xposition');
                        $sprite.css({ top: y });
                    });
                }
            });
        });
    });

    return application;
});