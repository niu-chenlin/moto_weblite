
$(document).ready(() => {
    if(AuthTools.getAuthInfo()) {
        $('#before').hide();
        $('#later').show();
        $('.nav-user a')[0].innerText = AuthTools.getAuthInfo().username;
    } else {
        $('#before').show();
        $('#later').hide();
    }
});