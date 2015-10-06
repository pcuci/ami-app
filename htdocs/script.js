var main = function() {
  $('.dropdown-toggle').click(function() {
    $('.dropdown-menu').toggle();
  });

  $('.arrow-next').click(function() {
    var currentSlide = $('.active-slide');
    var nextSlide = currentSlide.next();

    var currentDot = $('.active-dot');
    var nextDot = currentDot.next();

    if(nextSlide.length === 0) {
      nextSlide = $('.slide').first();
      nextDot = $('.dot').first();
    }
    
    currentSlide.fadeOut(600).removeClass('active-slide');
    nextSlide.fadeIn(600).addClass('active-slide');

    currentDot.removeClass('active-dot');
    nextDot.addClass('active-dot');
  });


  $('.arrow-prev').click(function() {
    var currentSlide = $('.active-slide');
    var prevSlide = currentSlide.prev();

    var currentDot = $('.active-dot');
    var prevDot = currentDot.prev();

    if(prevSlide.length === 0) {
      prevSlide = $('.slide').last();
      prevDot = $('.dot').last();
    }
    
    currentSlide.fadeOut(600).removeClass('active-slide');
    prevSlide.fadeIn(600).addClass('active-slide');

    currentDot.removeClass('active-dot');
    prevDot.addClass('active-dot');
  });

  $('.level1').click(function() {
    var currentSlide = $('.active-slide');
    var nextSlide = $('.one');

    var currentDot = $('.active-dot');
    var nextDot = $('.d1');
    
    currentSlide.fadeOut(600).removeClass('active-slide');
    nextSlide.fadeIn(600).addClass('active-slide');

    currentDot.removeClass('active-dot');
    nextDot.addClass('active-dot');
  });

  $('.level2').click(function() {
    var currentSlide = $('.active-slide');
    var nextSlide = $('.two');

    var currentDot = $('.active-dot');
    var nextDot = $('.d2');
    
    currentSlide.fadeOut(600).removeClass('active-slide');
    nextSlide.fadeIn(600).addClass('active-slide');

    currentDot.removeClass('active-dot');
    nextDot.addClass('active-dot');
  });

  $('.level3').click(function() {
    var currentSlide = $('.active-slide');
    var nextSlide = $('.three');

    var currentDot = $('.active-dot');
    var nextDot = $('.d3');
    
    currentSlide.fadeOut(600).removeClass('active-slide');
    nextSlide.fadeIn(600).addClass('active-slide');

    currentDot.removeClass('active-dot');
    nextDot.addClass('active-dot');
  });

}

$(document).ready(main);