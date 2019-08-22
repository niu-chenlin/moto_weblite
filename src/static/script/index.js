
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
let rex_n = /^[\w|\u4e00-\u9fa5]{2,10}$/;
let rex_p = /^[a-zA-z0-9]{6,12}$/; //密码

let register_up = function() {
    $('#login-pop').hide();
    $('.re-error').hide();
    $('#reset-pwd-pop').hide();
    $('.head').addClass("blur");
    $('.content').addClass("blur");
    $('.footer').addClass("blur");
    $('#register-pop').fadeIn();
};
let login_up = function() {
    $('#register-pop').hide();
    $('#reset-pwd-pop').hide();
    $('.re-error').hide();
    $('.head').addClass("blur");
    $('.content').addClass("blur");
    $('.footer').addClass("blur");
    $('#login-pop').fadeIn();
};
let reset_pwd_up = function() {
    $('#register-pop').hide();
    $('#login-pop').hide();
    $('.re-error').hide();
    $('.head').addClass("blur");
    $('.content').addClass("blur");
    $('.footer').addClass("blur");
    $('#reset-pwd-pop').fadeIn();
};
let uppwd_up = function() {

};
let h_open = function() {
    $('#b-help-pop').fadeIn();
};
let h_close = function() {
    $('#b-help-pop').fadeOut();
};
let help_title_click = function(ev) {
    if($(ev.target).next()[0].style.display === "none") {
        $(ev.target).children('i').css("transform", "rotate(0)");
    } else {
        $(ev.target).children('i').css("transform", "rotate(-90deg)");
    }
    $(ev.target).next().slideToggle();
};
let send_code = function(ev) {
    $(ev.target).parent().siblings().first().children().first().html("&#xe663;");
    let p = $(ev.target).parent().prev().children().first().val();
    let yzm = Math.ceil(Math.random()*(999999-100000)+100000);
    if(!phone.test(p)) {
        $(ev.target).parent().siblings().first().children().last().text("抱歉，我们无法识别您输入的手机号！"); //= "抱歉，我们无法识别您输入的手机号！";
        $(ev.target).parent().siblings().first().slideDown(500);
    } else {
        localStorage.setItem(p, yzm);
        setTimeout(function() {
            localStorage.removeItem(p);
        }, 1000*60*3);//13269619408
        $.ajax({
            url: "http://dxyzm.market.alicloudapi.com/chuangxin/dxjk",
            type: "post",
            headers: {
                "Authorization": "APPCODE 4f8121b50b244f909ab28f882231f5fc",
                'Content-Type': 'application/json'
            },
            data: {
                mobile: phone,
                content: "【xx】验证码为 "+ yzm +", 验证码3分钟有效，请尽快验证。"
            },
            success: function(data, status) {
                console.log(data);
                console.log(status);
                if(status === "success") {

                }
            }
        });
    }
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
    } else if(!localStorage.getItem($('#re-phone').val())) {
        $("#re-error span").first().first()[0].innerText = "验证码未发送或已失效";
        $('#re-error').slideDown(500);
    } else if($('#re-phone').val() !== localStorage.getItem($('#re-phone').val())) {
        $("#re-error span").first().first()[0].innerText = "验证码输入错误";
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
let uppwd = function() {
    if(!phone.test($('#uppwd-phone').val())) {
        $("#lo-error span").first().first()[0].innerText = "抱歉，我们无法识别您输入的手机号！";
        $('#lo-error').slideDown(500);
    } else if(!rex_p.test($('#uppwd-old-pwd').val()) || !rex_p.test($('#uppwd-old-pwd').val())) {
        $("#lo-error span").first().first()[0].innerText = "抱歉，请输入6-12位字符的密码，不能包含特殊字符！";
        $('#lo-error').slideDown(500);
    } else {
        $.post('/api/', {
            api: "user.APIEditUserPassword",
            token: AuthTools.getAuthInfo().tooken,
            paras: {
                phone: $('#lo-phone').val(),
                oldPwd: $('#uppwd-old-pwd').val(),
                newPwd: $('#uppwd-new-pwd').val()
            }
        }, function(data, status) {
            let e = PublicTools.getErrorObj(data);
            if(e && e.errorObj.errorNo !== 0) {
                if(e.errorObj.errorNo === 7) {
                    $("#uppwd-error span").first().first()[0].innerText = "旧密码或手机号输入错误!";
                    $('#uppwd-error').slideDown(500);
                } else {
                    $("#uppwd-error span").first().first()[0].innerText = e.errorObj.errorMsg;
                    $('#uppwd-error').slideDown(500);
                }
            } else {
                let dataObj = PublicTools.getDataObj(data);
                let d = dataObj.data;
                $("#uppwd-error i").first().first()[0].innerHTML = "&#xe642;";
                $("#uppwd-error i").first().css("color", "#48a645");
                $("#uppwd-error span").first().first()[0].innerText = "修改成功，下次登录生效。!";
                $('#uppwd-error').slideDown(500);
                setTimeout(() => {
                    $('.head').removeClass("blur");
                    $('.content').removeClass("blur");
                    $('.footer').removeClass("blur");
                    $('#uppwd-pop').fadeOut();
                }, 1500);
            }
        })
    }
};
let resetPwd = function() {
    /**
     * 重置密码
     */
};

let to_motor = function() {

};