(function($) {})(window.jQuery); // remap jQuery to $
var w2 = window.innerWidth;
var h2 = window.innerHeight;
var posterVideo = $(".poster-video");
var descVideo = $(".desc-video");
var maxHeightPoster = 0;
var maxHeightDesc = 0;
var windowWidth = $(window).width();

/* Определение браузера */
/* http://alittlebit.ru/blog/vebmasterskaya/js-jquery/browser-os.html */
var BrowserDetect = { init: function() { this.browser = this.searchString(this.dataBrowser) || "An unknown browser", this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "an unknown version", this.OS = this.searchString(this.dataOS) || "an unknown OS" }, searchString: function(a) {
        for (var b = 0; b < a.length; b++) {
            var c = a[b].string,
                d = a[b].prop;
            if (this.versionSearchString = a[b].versionSearch || a[b].identity, c) {
                if (c.indexOf(a[b].subString) != -1) return a[b].identity } else if (d) return a[b].identity } }, searchVersion: function(a) {
        var b = a.indexOf(this.versionSearchString);
        if (b != -1) return parseFloat(a.substring(b + this.versionSearchString.length + 1)) }, dataBrowser: [{ string: navigator.userAgent, subString: "Chrome", identity: "Chrome" }, { string: navigator.userAgent, subString: "OmniWeb", versionSearch: "OmniWeb/", identity: "OmniWeb" }, { string: navigator.vendor, subString: "Apple", identity: "Safari", versionSearch: "Version" }, { prop: window.opera, identity: "Opera" }, { string: navigator.vendor, subString: "iCab", identity: "iCab" }, { string: navigator.vendor, subString: "KDE", identity: "Konqueror" }, { string: navigator.userAgent, subString: "Firefox", identity: "Firefox" }, { string: navigator.vendor, subString: "Camino", identity: "Camino" }, { string: navigator.userAgent, subString: "Netscape", identity: "Netscape" }, { string: navigator.userAgent, subString: "MSIE", identity: "Explorer", versionSearch: "MSIE" }, { string: navigator.userAgent, subString: "Gecko", identity: "Mozilla", versionSearch: "rv" }, { string: navigator.userAgent, subString: "Mozilla", identity: "Netscape", versionSearch: "Mozilla" }], dataOS: [{ string: navigator.platform, subString: "Win", identity: "Windows" }, { string: navigator.platform, subString: "Mac", identity: "Mac" }, { string: navigator.userAgent, subString: "iPhone", identity: "iPhone/iPod" }, { string: navigator.platform, subString: "Linux", identity: "Linux" }] };
BrowserDetect.init();

$(document).ready(function() {
    equalHeight();
    scr();
});

$(window).bind('resize orientationchange', function(e) {
    w2 = window.innerWidth;
    h2 = window.innerHeight;
    scr();
    // Refresh page on resize with jquery. It work in Safari, FF
    // https://www.sitepoint.com/jquery-refresh-page-browser-resize/
    if (window.RT) clearTimeout(window.RT);
    window.RT = setTimeout(function() {
        this.location.reload(false);
    }, 200);
});

function scr() {
    if (BrowserDetect.browser == "Safari") {
        $('.video p').css({ 'top': $('.video').height() * 2 / 5 });
    }
    if (w2 >= 1500) {
        $('.row-2 .form').css({ 'height': $('.row-2 img').height() });
    } else {
        $('.row-2 .form').css({ 'top': $('.video').offset().bottom + 'px' });
    }

    if (w2 >= 944) {
        $('.section-3 h3').css('margin', '-' + (($('.section-3 span').height()) * 4 / 5 + 8) + 'px 0 ' + (($('.section-3 span').height()) * 4 / 5 - 52) + 'px');
    } else {
        $('.section-3 h3').css('margin', '0');
    }

    $('.main-modal').click(function(event) { // лoвим клик
        var ww = (w2 - $('#modal_form').width()) / 2 - 20 + 'px';
        event.preventDefault(); // выключaем стaндaртную рoль элементa
        $('#overlay').fadeIn(400, // снaчaлa плaвнo пoкaзывaем темную пoдлoжку
            function() { // пoсле выпoлнения предъидущей aнимaции
                $('#modal_form')
                    .css({ 'display': 'block', 'left': ww })
                    .animate({ opacity: 1, top: '20%' }, 200); // плaвнo прибaвляем прoзрaчнoсть oднoвременнo сo съезжaнием вниз
            });
    });
    /* Зaкрытие мoдaльнoгo oкнa, тут делaем тo же сaмoе нo в oбрaтнoм пoрядке */
    $('#modal_close, #overlay').click(function() { // лoвим клик пo крестику или пoдлoжке
        $('#modal_form')
            .animate({ opacity: 0, top: '45%' }, 200, // плaвнo меняем прoзрaчнoсть нa 0 и oднoвременнo двигaем oкнo вверх
                function() { // пoсле aнимaции
                    $(this).css('display', 'none'); // делaем ему display: none;
                    $('#overlay').fadeOut(400); // скрывaем пoдлoжку
                }
            );
    });

    // Убираем рамку с элементов в фокусе
    // http://xiper.net/collect/html-and-css-tricks/css-tricks/dotted-border-focus-elements
    $("input, select").focus(function() { this.blur(); });

    // Устанавливаем обработчик потери фокуса для всех полей ввода текста
    $('#fname, #lname, #email, #tel, #country, #password').unbind().blur(function() {
        var id = $(this).attr('id');
        var val = $(this).val();
        switch (id) {
            case 'fname':
                var rv_fname = /^[a-zA-Zа-яА-Я]+$/;
                if (val.length > 2 && val != '' && rv_fname.test(val)) {
                    $(this).addClass('not_error').css({ 'border': '2px solid #21c0ac', 'color': '#3cb982' });
                    $(this).prev('.error-box').text('');
                } else {
                    $(this).removeClass('not_error').addClass('error').css({ 'border': '2px solid #ff4273', 'color': '#ff4273' });
                }
                break;

            case 'lname':
                var rv_lname = /^[a-zA-Zа-яА-Я]+$/;
                if (val.length > 3 && val != '' && rv_lname.test(val)) {
                    $(this).addClass('not_error').css({ 'border': '2px solid #21c0ac', 'color': '#3cb982' });
                    $(this).prev('.error-box').text('');
                } else {
                    $(this).removeClass('not_error').addClass('error').css({ 'border': '2px solid #ff4273', 'color': '#ff4273' });
                }
                break;

            case 'country':
                if (val != '') {
                    $(this).addClass('not_error').css({ 'border': '2px solid #21c0ac', 'color': '#3cb982' });
                    $(this).prev('.error-box').text('');
                } else {
                    $(this).removeClass('not_error').addClass('error').css({ 'border': '2px solid #ff4273', 'color': '#ff4273' });
                }
                break;

            case 'tel':
                var rv_tel = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})+/;
                if (val != '' && rv_tel.test(val)) {
                    $(this).addClass('not_error').css({ 'border': '2px solid #21c0ac', 'color': '#3cb982' });
                    $(this).prev('.error-box').text('');
                } else {
                    $(this).removeClass('not_error').addClass('error').css({ 'border': '2px solid #ff4273', 'color': '#ff4273' });
                }
                break;

            case 'email':
                var rv_email = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
                if (val != '' && rv_email.test(val)) {
                    $(this).addClass('not_error').css({ 'border': '2px solid #21c0ac', 'color': '#3cb982' });
                    $(this).prev('.error-box').text('');
                } else {
                    $(this).removeClass('not_error').addClass('error').css({ 'border': '2px solid #ff4273', 'color': '#ff4273' });
                }
                break;

            case 'password':
                if (val != '' && val.length >= 9) {
                    $(this).addClass('not_error').css({ 'border': '2px solid #21c0ac', 'color': '#3cb982' });
                    $(this).prev('.error-box').text('');
                } else {
                    $(this).removeClass('not_error').addClass('error').css({ 'border': '2px solid #ff4273', 'color': '#ff4273' });
                }
                break;

        } // end switch(...)
    }); // end blur()

    $('#form1').submit(function(e) {
        e.preventDefault();
        // После того, как мы нажали кнопку "Отправить", делаем проверку,
        // если кол-во полей с классов .not_error равно 6(так как у нас всего 6 поля), то есть все поля заполнены верно,
        // выполняем наш Ajax сценарий и отправляем письмо адресату
        if ($('.not_error').length == 6) {
            // Eще одним моментов является то, что в качестве указания данных для передачи обработчику email.php, мы обращаемся $(this) к нашей форме,
            // и вызываем метод .serialize().
            // Это очень удобно, т.к. он сразу возвращает сгенерированную строку с именами и значениями выбранных элементов формы.
            $.ajax({
                url: 'email.php',
                type: 'post',
                data: $(this).serialize(),
                beforeSend: function(xhr, textStatus) {
                    $('form#feedback-form :input').attr('disabled', 'disabled');
                },
                success: function(response) {
                    $('form#feedback-form :input').removeAttr('disabled');
                    $('form#feedback-form :text, textarea').val('').removeClass().next('.error-box').text('');
                    alert(response);
                }
            }); // end ajax({...})
        } else {
            return false;
        }
        // Иначе, если количество полей с данным классом не равно значению 6 мы возвращаем false,
        // останавливая отправку сообщения в невалидной форме
    }); // end submit()

}

function equalHeight() {
    //Находим максимальную высоту
    for (var i = 0; i < posterVideo.length; ++i) {
        if (maxHeightPoster < $(posterVideo[i]).height()) {
            maxHeightPoster = $(posterVideo[i]).height();
        }
    }
    for (var i = 0; i < descVideo.length; ++i) {
        if (maxHeightDesc < $(descVideo[i]).height()) {
            maxHeightDesc = $(descVideo[i]).height();
        }
    }
    //Устанавливаем всем элементам максимальную высоту
    for (var i = 0; i < posterVideo.length; ++i) {
        $(posterVideo[i]).height(maxHeightPoster);
    }
    for (var i = 0; i < descVideo.length; ++i) {
        $(descVideo[i]).height(maxHeightDesc);
    }
}
