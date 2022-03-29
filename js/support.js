$(window).scroll(function(){
    $('nav').toggleClass('scrolled',$(this).scrollTop()>50);
});
$(function(){
    $('#mainfooter').load('footer.html');
    $('#navigation').load('navbar.html');
    $('#preloader').load('preloader.html');
});
