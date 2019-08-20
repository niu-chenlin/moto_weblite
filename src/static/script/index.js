
let phone = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
let email = /^[a-zA-z0-9]+@[a-zA-z0-9]+(\.[a-zA-Z0-9_-]+)+$/;
$(document).ready(() => {
    if(AuthTools.getAuthInfo()) {
        $('#before').hide();
        $('#later').show();
        $('.nav-user a')[0].innerText = AuthTools.getAuthInfo().username;
    } else {
        $('#before').show();
        $('#later').hide();
    }
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
        $('#register-pop').fadeOut();
        $('#login-pop').fadeOut();
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

    $('.nav-user').click(() => {
        $('#help-pop').hide();
        $('#msg-pop').hide();
        $('#user-pop').fadeToggle(500);
    });
    $('.nav-msg').click(() => {
        $('#help-pop').hide();
        $('#user-pop').hide();
        $('#msg-pop').fadeToggle(500);
    });
    $('.nav-help').click(() => {
        $('#msg-pop').hide();
        $('#user-pop').hide();
        $('#help-pop').fadeToggle(500);
    });
});
let rex_n = /^[\w|\u4e00-\u9fa5]{2,10}$/; //手机号。
let rex_p = /^[a-zA-z0-9]{6,12}$/; //密码
let send_code = function() {
    //发送验证码
    if(phone.test($('#re-phone').val())) {
        $('.re-error').slideUp(500);
    } else {
        $('.re-error').slideDown(500);
    }
};
let register_up = function() {
    $('#login-pop').hide();
    $('.re-error').hide();
    $('.head').addClass("blur");
    $('.content').addClass("blur");
    $('.footer').addClass("blur");
    $('#register-pop').fadeIn();
};
let login_up = function() {
    $('#register-pop').hide();
    $('.re-error').hide();
    $('.head').addClass("blur");
    $('.content').addClass("blur");
    $('.footer').addClass("blur");
    $('#login-pop').fadeIn();
};
let uppwd_up = function() {

};

let register = function() {
    $("#re-error i").first().first()[0].innerHTML = "&#xe663;";
    if(!rex_n.test($('#re-name').val())) {
        $("#re-error span").first().first()[0].innerText = "抱歉，请输入2-10个字符的昵称，特殊字符只可包含_！";
        $('#re-error').slideDown(500);
    } else if(!phone.test($('#re-phone').val())) {
        $("#re-error span").first().first()[0].innerText = "抱歉，我们无法识别您输入的手机号！";
        $('#re-error').slideDown(500);
    } else if(!rex_p.test($('#re-pwd').val())) {
        $("#re-error span").first().first()[0].innerText = "抱歉，请输入6-12位字符的密码，不能包含特殊字符！";
        $('#re-error').slideDown(500);
    } else if(rex_p.test($('#re-pwd').val()) !== rex_p.test($('#re-cof-pwd').val())) {
        $("#re-error span").first().first()[0].innerText = "抱歉，请再次确认密码";
        $('#re-error').slideDown(500);
    } else {
        $('#re-error').slideUp(100);
        $.post("/api/", {
            api: "user.APIAddUser",
            token: "",
            paras: {
                name: $('#re-name').val(),
                phone: $('#re-phone').val(),
                password: $('#re-pwd').val(),
                sex: $('#re-sex')[0].checked ? 0 : 1
            }
        }, function(data,status){
            let e = PublicTools.getErrorObj(data);
            if(e && e.errorObj.errorNo !== 0) {
                if(e.errorObj.errorNo === 8) {
                    $("#re-error span").first().first()[0].innerText = "手机号已注册，请直接登录!";
                    $('#re-error').slideDown(500);
                } else {
                    $("#re-error span").first().first()[0].innerText = e.errorObj.errorMsg;
                    $('#re-error').slideDown(500);
                }
            } else {
                $("#re-error i").first().first()[0].innerHTML = "&#xe642;";
                $("#re-error i").first().css("color", "#48a645");
                $("#re-error span").first().first()[0].innerText = "注册成功!";
                $('#re-error').slideDown(500);
                setTimeout(() => {
                    $('.head').removeClass("blur");
                    $('.content').removeClass("blur");
                    $('.footer').removeClass("blur");
                    $('#register-pop').fadeOut();
                }, 1500);
            }
        });
    }
};
let login = function() {
    $("#lo-error i").first().first()[0].innerHTML = "&#xe663;";
    if(!phone.test($('#lo-phone').val())) {
        $("#lo-error span").first().first()[0].innerText = "抱歉，我们无法识别您输入的手机号！";
        $('#lo-error').slideDown(500);
    } else if(!rex_p.test($('#lo-pwd').val())) {
        $("#lo-error span").first().first()[0].innerText = "抱歉，请输入6-12位字符的密码，不能包含特殊字符！";
        $('#lo-error').slideDown(500);
    } else {
        $.post('/api/', {
            api: "user.APILoginUser",
            token: "",
            paras: {
                phone: $('#lo-phone').val(),
                password: $('#lo-pwd').val()
            }
        }, function(data, status) {
            let e = PublicTools.getErrorObj(data);
            if(e && e.errorObj.errorNo !== 0) {
                if(e.errorObj.errorNo === 7) {
                    $("#lo-error span").first().first()[0].innerText = "手机号未注册!";
                    $('#lo-error').slideDown(500);
                } else if(e.errorObj.errorNo === 45) {
                    $("#lo-error span").first().first()[0].innerText = "密码错误!";
                    $('#lo-error').slideDown(500);
                } else {
                    $("#lo-error span").first().first()[0].innerText = e.errorObj.errorMsg;
                    $('#lo-error').slideDown(500);
                }
            } else {
                let dataObj = PublicTools.getDataObj(data);
                let d = dataObj.data;
                AuthTools.setAuthInfo({
                    id: d.cookie.id,
                    username: d.cookie.username,
                    role: d.role,
                    token: d.token,
                    time: (new Date()).getTime()
                });
                $('#before').hide();
                $('#later').show();
                $("#lo-error i").first().first()[0].innerHTML = "&#xe642;";
                $("#lo-error i").first().css("color", "#48a645");
                $("#lo-error span").first().first()[0].innerText = "登录成功!";
                $('#lo-error').slideDown(500);
                $('.nav-user a')[0].innerText = "Hi:" + d.cookie.username;
                setTimeout(() => {
                    $('.head').removeClass("blur");
                    $('.content').removeClass("blur");
                    $('.footer').removeClass("blur");
                    $('#login-pop').fadeOut();
                }, 1500);
            }
        });
    }
};
let logout = function() {
    $.post('/api/', {
        api: "user.APILogoutUser",
        token: "",
        paras: {
            token: AuthTools.getAuthInfo().token
        }
    }, function(data, status) {
        AuthTools.clearAuthInfo();
        $('#before').show();
        $('#later').hide();
        $('#user-pop').hide();
    });
};