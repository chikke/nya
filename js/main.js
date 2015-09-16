$(function() {

    //アンカーリンク
    $('a[href^=#]').click(function(){
        var speed = 500;
        var href= $(this).attr("href");
        var target = $(href == "#" || href == "" ? 'html' : href);
        var position = target.offset().top;
        $("html, body").animate({scrollTop:position}, speed, "easeOutCubic");
        return false;
    });

    $('.js-door01.js-trigger').on("click", function() {
        $('.js-door01-contents').slideToggle('slow');
    });


});
