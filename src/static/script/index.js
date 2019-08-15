let phone = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
let email = /^[a-zA-z0-9]+@[a-zA-z0-9]+(\.[a-zA-Z0-9_-]+)+$/;
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
        $('#cooperation-auth-code-pop').fadeOut();
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
    $('#auth-code').click(() => {
        $('.head').addClass("blur");
        $('.content').addClass("blur");
        $('.footer').addClass("blur");
        $('#cooperation-auth-code-pop').fadeIn();
    });

    $('#cooperation-name').blur(function() {
        if($(this).val()) {
            $(this).next().hide();
        } else {
            $(this).next().show();
        }
    });
    $('#cooperation-phone').blur(function() {
        if(phone.test($(this).val()) || email.test($(this).val())) {
            $(this).next().hide();
        } else {
            $(this).next().show();
        }
    });
    $('#cooperation-submit').click(function() {
        if((phone.test($('#cooperation-phone').val()) || email.test($('#cooperation-phone').val())) && $('#cooperation-name').val()) {
            $.post("/cooperation/", {
                name: $('#cooperation-name').val(),
                phone: $('#cooperation-phone').val(),
                content: $('#cooperation-content').val()
            }, function(data,status){
                if(status === "success") {
                    alert("发送成功！");
                } else {
                    alert("发送失败！");
                }
                $('.head').removeClass("blur");
                $('.content').removeClass("blur");
                $('.footer').removeClass("blur");
                $('#cooperation-pop').fadeOut();
            });
        } else {
            alert("请输入正确内容！");
        }
    });
    let login_up = function() {
        $('.head').addClass("blur");
        $('.content').addClass("blur");
        $('.footer').addClass("blur");
        $('#register-pop').fadeIn();
    };

});
let send_code = function() {
    if(phone.test($('#re-phone').val())) {
        $('.re-error').slideUp(500);
    } else {
        $('.re-error').slideDown(500);
    }
};