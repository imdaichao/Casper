var General = {
    isMobile: false,
    isWechat: false,
    absUrl: location.protocol + '//' + location.host,
    init: function() {
        var win = window;
        var doc = win.document;
        var UA = navigator.userAgent.toLowerCase()
        var isAndroid = win.navigator.appVersion.match(/android/gi);
        var isIPhone = win.navigator.appVersion.match(/iphone/gi);
        if (UA.match(/MicroMessenger/i) == "micromessenger") {
            General.isWechat = true;
            $('body').addClass('wechat-webview')
        }
        if (!!isAndroid) {
            General.isMobile = true;
        }
        if ($('body').hasClass('post-template')) {
            General.rewardLoader();
        }

        General.scrollToPos();
    },
    //平滑滚动到顶部
    scrollToPos: function(position) {
        var STR_TO_TOP = '我要飞到最高',
            coverHeight = position || $(window).height(); //获得图片高度
        var button = $('<a href="#" id="to-top" title="' + STR_TO_TOP + '"> <div class="to-top-wrap"></div></a>').appendTo('body');
        $(window).scroll(function() {
            if ($(window).scrollTop() > $(window).height()) {
                button.fadeIn(500);
            } else {
                button.fadeOut(500);
            }
        });

        button.click(function(e) {
            e.preventDefault();
            $('html,body').animate({
                scrollTop: 0
            }, 666, function() {
                window.location.hash = '#';
            });
            console.log('我跳');
        })
    },
    //打赏
    rewardLoader: function() {

        var loadQR = {
            alipay: '/assets/images/qr_pay_alipay.png',
            wechat: '/assets/images/qr_pay_wechat.png'
        }
        var loadQRUrl;
        if (!!General.isWechat) {
            $('.wechat-code b').html('长按上方二维码打赏作者');
            // $('.qr-code').fadeOut();
        }

        $('.money-like .reward-button').hover(function() {
            console.log('悬浮')
            $('img.wechat-img').attr('src', loadQR.wechat);
            $('img.alipay-img').attr('src', loadQR.alipay);
            $('.money-code').fadeIn();
            $(this).addClass('active');
        }, function() {
            $('.money-code').fadeOut();
            $(this).removeClass('active');
        }, 800)

        $('.money-like .reward-button').click(function() {
            if ($(this).hasClass('active')) {
                $(this).find('img.wechat-img').attr('src', loadQR.wechat);
                $(this).find('img.alipay-img').attr('src', loadQR.alipay);
                $('.money-code').fadeOut();
                $(this).removeClass('active');

            } else {
                $('.money-code').fadeIn();
                $(this).addClass('active');
            }
        })


    },
}

$(document).ready(function() {
    var $window = $(window);
    General.init();
})
