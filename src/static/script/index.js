$(document).ready(() => {
    $('#select-value').text("地点");
    $('.select').click(() => {
        $('.options').slideToggle(300);
    });
    $('.op-v').click(function() {
        $('.select').children('i').eq(0).text(this.childNodes[0].innerText);
        $('.select').children('span').text(this.childNodes[1].nodeValue);
    });
    $('.form-text').children('input').eq(0).click(function() {
        $('.input-area').slideToggle(300);
    });
    $('.content').css('max-width', $('.head').innerWidth()*0.6);
    $('.cus-btn').click(function() {
        $(this).addClass("active").siblings(".active").removeClass("active");
    });
    $('.close-pop').click(() => {
        $('.head').removeClass("blur");
        $('.content').removeClass("blur");
        $('.footer').removeClass("blur");
        $('#relation-pop').fadeOut();
        $('#cooperation-pop').fadeOut();
    });
    $('#relation').click(() => {
        $('.head').addClass("blur");
        $('.content').addClass("blur");
        $('.footer').addClass("blur");
        $('#relation-pop').fadeIn();
    });

    $('#cooperation').click(() => {
        $('.head').addClass("blur");
        $('.content').addClass("blur");
        $('.footer').addClass("blur");
        $('#cooperation-pop').fadeIn();
    });

});