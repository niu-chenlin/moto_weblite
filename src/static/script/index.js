$(document).ready(() => {
    $('#select-value').text("地点");
    $('.select').click(() => {
        $('.options').slideToggle(300);
    });
    $('.op-v').click(function() {
        $('.select').children('i').eq(0).text(this.childNodes[0].innerText);
        $('.select').children('span').text(this.childNodes[1].nodeValue);
    })
});