new PerfectScrollbar('#modal1');
new PerfectScrollbar('#modal2');
new PerfectScrollbar('#modal3');
new PerfectScrollbar('#modal4');
new PerfectScrollbar('#modal5');
new PerfectScrollbar('#modal6');


$(function () {
    var width = $(window).width();
    var frame1 = CSSRulePlugin.getRule(".frame1:before");
    var frame2 = CSSRulePlugin.getRule(".frame2:before");
    var frame3 = CSSRulePlugin.getRule(".frame3:before");
    var frame4 = CSSRulePlugin.getRule(".frame4:before");
    var frame5 = CSSRulePlugin.getRule(".frame5:before");
    var frames = [frame1, frame2, frame3, frame4, frame5];

    /*load*/
    TweenMax.to("#load", 0.85, { opacity: 0.9, yoyo: true, repeat: -1, ease: "RoughEase.ease" });
    TweenMax.to("#load", 2, { opacity: 0, display: "none", delay: 5, ease: "Expo.easeOut" });
    TweenMax.set(".mainTitle", { xPercent: -50 });
    TweenMax.from('#nav', 2, { opacity: 0, delay: 7.5, y: -100, ease: Expo.easeOut });
    TweenMax.from('.logo', 2, { opacity: 0, delay: 7, y: -100, ease: Expo.easeOut });
    TweenMax.set('.frame', { rotation: -2 });

    var p1In = new TimelineMax({ paused: true });
    p1In.from('.mainBg', 2, { opacity: 0, x: -1000, rotation: -10, ease: "Expo.easeOut" }, 5)
        .to(".mainTitle", 2, { opacity: 1, ease: Expo.easeOut }, 7)
        .to(".redLight", 1, { opacity: 0.8, yoyo: true, repeat: -1, ease: "easeOutElastic" }, 6.4);

    var p1Out = new TimelineMax({ paused: true });
    p1Out.to('.mainTitle', 1.5, { opacity: 0, ease: Expo.easeOut }, 0)
        .to('.mainBg', 1, { x: 2000, ease: Back.easeIn.config(1.7) }, 0.5)
        .to('.mainBg', 0.4, { rotation: -10, ease: Back.easeOut.config(1.7) }, 0.7);

    var p2In = new TimelineMax({ paused: true });
    if (width > 480) {
        p2In.from('.section1', 2, { x: -2000, ease: Expo.easeOut }, 2)
            .from('.section2', 2, { x: 2000, ease: Expo.easeOut }, 2)
            .set(frames, { cssRule: { '-webkit-filter': 'saturate(95%) brightness(95%)' } }, 0)
            .staggerTo(frames, 3, { cssRule: { '-webkit-filter': 'saturate(120%) brightness(120%)' }, repeat: -1, yoyo: true, ease: Elastic.easeOut.config(2.5, 0.1) }, 0.5, 4);
    } else {
        p2In.from('.section1', 2, { y: -1000, ease: Expo.easeOut }, 1);
    }

    var p2Out = new TimelineMax({ paused: true });
    if (width > 480) {
        p2Out.to('.section1', 1, { x: -2000, ease: Back.easeIn.config(1.7) }, 1)
            .to('.section2', 1, { x: 2000, ease: Back.easeIn.config(1.7) }, 1);
    } else {
        p2Out.to('.section1', 1, { opacity: 1, y: -1000, ease: Back.easeIn.config(1.7) });
    }

    var p3In = new TimelineMax({ paused: true });
    if (width > 480) {
        p3In.set('.p4Light', { css: { '-webkit-filter': 'hue-rotate(0deg)' } })
            .to('.light1', 5, { css: { '-webkit-filter': 'hue-rotate(90deg)' }, yoyo: true, repeat: -1, ease: Sine.easeOut }, 0.5)
            .to('.light2', 5, { css: { '-webkit-filter': 'hue-rotate(-90deg)' }, yoyo: true, repeat: -1, ease: Sine.easeOut }, 1)
            .from('.p4Bg', 2, { scale: 2, opacity: 0, ease: Expo.easeOut }, 1.5)
            .from('.lighterBlock1', 2.5, { opacity: 0, x: -500, y: -200, ease: Circ.easeOut }, 2.5)
            .from('.lighterBlock2', 2, { opacity: 0, x: 400, ease: Circ.easeOut }, 3)
            .from('.fadeText', 2, { opacity: 0, ease: Expo.easeOut }, 4.5);

    } else {
        p3In.from('.section3', 2, { y: -1000, opacity: 1, ease: Expo.easeOut }, 1);
    }

    var p3Out = new TimelineMax({ paused: true });
    if (width > 480) {
        p3Out.to('.fadeText', 1, { opacity: 0, ease: Back.easeIn.config(1.7) }, 0)
            .to('.lighterBlock1', 1, { opacity: 0, x: -500, y: -200, ease: Back.easeIn.config(1.7) }, 0.3)
            .to('.lighterBlock2', 1, { opacity: 0, x: 400, ease: Back.easeIn.config(1.7) }, 0.3)
            .to('.p4Bg', 1, { opacity: 0, scale: 2, ease: Back.easeIn.config(1.7) }, 0.8)
    } else {
        p3Out.set('.section3', { y: 0 })
            .to('.section3', 1, { y: -1000, ease: Back.easeIn.config(1.7) }, 0.5);
    }

    var p4In = new TimelineMax({ paused: true });
    p4In.set('.p4Light', { css: { '-webkit-filter': 'hue-rotate(0deg)' } })
        .to('.light1', 5, { css: { '-webkit-filter': 'hue-rotate(90deg)' }, yoyo: true, repeat: -1, ease: Sine.easeOut }, 0.5)
        .to('.light2', 5, { css: { '-webkit-filter': 'hue-rotate(-90deg)' }, yoyo: true, repeat: -1, ease: Sine.easeOut }, 1)
        .from('.p4Bg', 2, { scale: 2, opacity: 0, ease: Expo.easeOut }, 1.5)
        .from('.lighterBlock1', 2.5, { opacity: 0, x: -500, y: -200, ease: Circ.easeOut }, 2.5)
        .from('.lighterBlock2', 2, { opacity: 0, x: 400, ease: Circ.easeOut }, 3)
        .from('.fadeText', 2, { opacity: 0, ease: Expo.easeOut }, 4.5);
    var p4Out = new TimelineMax({ paused: true });
    p4Out.to('.fadeText', 1, { opacity: 0, ease: Back.easeIn.config(1.7) }, 0)
        .to('.lighterBlock1', 1, { opacity: 0, x: -500, y: -200, ease: Back.easeIn.config(1.7) }, 0.3)
        .to('.lighterBlock2', 1, { opacity: 0, x: 400, ease: Back.easeIn.config(1.7) }, 0.3)
        .to('.p4Bg', 1, { opacity: 0, scale: 2, ease: Back.easeIn.config(1.7) }, 0.8)

    var mySwiper = new Swiper('.swiper-container', {
        // Optional parameters
        pagination: '.swiper-pagination',
        paginationClickable: false,
        speed: 5500,
        longSwipesMs: 5500,
        effect: 'fade',
        // shortSwipes: false,
        longSwipes: false,
        slidesPerView: 1,
        simulateTouch: false,
        mousewheelControl: true,
        hashnav: true,
        hashnavWatchState: true,
        onInit: function (swiper) {
            var page = (swiper.activeIndex);
            if (page === 0) {
                p1In.play(0);
            }
        },
        onSlideChangeStart: function (swiper) {
            var page = (swiper.activeIndex);
            switch (page) {
                case 0:
                    if (swiper.previousIndex === 1) {
                        p2Out.play(0);
                    } else if (swiper.previousIndex === 2) {
                        p3Out.play(0);
                    } else if (swiper.previousIndex === 3) {
                        p4Out.play(0);
                    }
                    p1In.play(3);
                    break;
                case 1:
                    if (swiper.previousIndex === 0) {
                        p1Out.play(0);
                    } else if (swiper.previousIndex === 2) {
                        p3Out.play(0);
                    } else if (swiper.previousIndex === 3) {
                        p4Out.play(0);
                    }
                    p2In.play(0);
                    break;
                case 2:
                    if (swiper.previousIndex === 0) {
                        p1Out.play(0);
                    } else if (swiper.previousIndex === 1) {
                        p2Out.play(0);
                    } else if (swiper.previousIndex === 3) {
                        p4Out.play(0);
                    }
                    p3In.play(0);
                    break;
                case 3:
                    if (swiper.previousIndex === 0) {
                        p1Out.play(0);
                    } else if (swiper.previousIndex === 1) {
                        p2Out.play(0);
                    } else if (swiper.previousIndex === 2) {
                        p3Out.play(0);
                    }
                    p4In.play(0);
                    break;
            }
        },
    });


    $('.modal').modal({
        opacity: 1,
        startingTop: '80%',
        endingTop: '15%',
        ready: function () {
            $('.swiper-container').css({ opacity: 0.5 });
            TweenMax.set(".screen", { css: { '-webkit-filter': 'brightness(1)' } })
            TweenMax.to(".screen", 3, { css: { '-webkit-filter': 'brightness(1.4)' }, delay: 1, yoyo: true, repeat: -1, ease: "easeOutElastic" });
        },
        complete: function () {
            $('.swiper-container').animate({ opacity: 1 });
            TweenMax.killTweensOf(".screen");
        }
    });


    $('.modal-trigger').on('click', function () {
        $('.swiper-container').css({ opacity: 0.5 });
    });

    $('.wechat').on('mouseover', function () {
        $('.qrcode').css('display', 'block');
    });
    $('.wechat').on('mouseout', function () {
        $('.qrcode').css('display', 'none');
    });


    $('.tooltipped').tooltip();

    //底下飄
    var total = 12,
        container = document.getElementById('container'),
        w = container.offsetWidth,
        h = container.offsetHeight;

    for (var i = 0, div; i < total; i++) {
        var random = Math.floor(Math.random() * 5);
        var className = ['dot1', 'dot2', 'dot3', 'dot4', 'dot5', 'dot6'];
        className = className[random];
        div = document.createElement('div');
        div.className = className;
        container.appendChild(div);
        TweenMax.set(div, { x: R(0, w), opacity: 1 });
        animm(div);
    };

    function animm(elm) {
        TweenMax.to(elm, R(0, 5) + 8, { y: -400, ease: Linear.easeNone, repeat: -1, delay: -5 });
        TweenMax.to(elm, R(0, 5) + 6, { x: '+=70', repeat: -1, yoyo: true, ease: Sine.easeOut })
        TweenMax.to(elm, R(0, 1) + 5.5, { opacity: 0, repeat: -1, yoyo: true, ease: Sine.easeOut })
    };

    function R(min, max) { return min + (Math.random() * (max - min)) };



    //banner 滑鼠移動視差
    $("body").mousemove(function (e) {
        parallaxIt(e, ".float3", -30);
        parallaxIt(e, ".float5", -50);
        parallaxIt(e, ".float8", -80);
        parallaxIt(e, ".float10", -100);
        parallaxIt(e, ".float15", -150);
    });

    function parallaxIt(e, target, movement) {
        var $this = $("body");
        var relX = e.pageX - $this.offset().left;
        var relY = e.pageY - $this.offset().top;

        TweenMax.to(target, 1, {
            x: (relX - $this.width() / 2) / $this.width() * movement,
            y: (relY - $this.height() / 2) / $this.height() * movement
        });
    }

});