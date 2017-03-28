$(document).ready(function(){
   
    //scroll down show navi
    $('.js--section-features').waypoint(function(direction){
      if(direction == "down")
          {
              $('nav').addClass('sticky');
          }else{
              $('nav').removeClass('sticky');
          }
   }, {
       offset: '60px'
   });
   
    //scroll down when click
    $('.js--scroll-to-plans').click(function(){
        $('html, body').animate({scrollTop: $('.js--section-plans').offset().top}, 1000);//1000ms
    });
    
    $('.js--scroll-to-start').click(function(){
        $('html, body').animate({scrollTop: $('.js--section-features').offset().top}, 1000);//1000ms
    });
    
    
    //navi scroll
    //smooth scrolling from css-tricks
    $(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});
  
//animation
    $('.js--wp-1').waypoint(function(direction){
        $('.js--wp-1').addClass('animated fadeIn');
    }, {
        offset: '50%'
    })
    
    $('.js--wp-2').waypoint(function(direction){
        $('.js--wp-2').addClass('animated fadeInUp');
    }, {
        offset: '50%'
    })
    
    
    $('.js--wp-3').waypoint(function(direction){
        $('.js--wp-3').addClass('animated fadeIn');
    }, {
        offset: '50%'
    })
    
    
    $('.js--wp-4').waypoint(function(direction){
        $('.js--wp-4').addClass('animated pulse');
    }, {
        offset: '50%'
    })
    
    
});


//mobile-nav
//Solved the closed menu bug
$( window ).resize(function() {  
        if (window.matchMedia("(min-width: 768px)").matches) {
            $('.main-nav').css({"display":"block"});
            //alert('hey');
        } else {
            $('.main-nav').css({"display":"none"});
        }
    });

$('.js--nav-icon').click(function(){
    var nav = $('.js--main-nav');
    var icon = $('.js--nav-icon i')
    
    //200ms animation
    if ($(window).width() < 768){
    nav.slideToggle(200);
  }
    
    //change icon class
    if(icon.hasClass('ion-navicon-round')){
        icon.addClass('ion-close-round');
        icon.removeClass('ion-navicon-round');
    }else{
        icon.removeClass('ion-close-round');
        icon.addClass('ion-navicon-round');
        //nav.removeAttr("style");
    }
    
});

