TweenMax.to("#load", 2, { opacity: 0, display: "none", delay: 1.5, ease: Expo.easeOut });

var tl = new TimelineMax({ delay: 2 });
tl.set('#p1 .logo',{ yPercent: -25 })
    .from(['.case', '.light'], 1, { opacity: 0, ease: Expo.easeIn })
    .from('.p1Logo', 0.8, { ease: Expo.easeOut, opacity: 0, scale: 10 }, 0.5)
    .staggerFrom(['.solganL','.solganR','.solganB'], 4, { opacity: 0, ease: Expo.easeOut },1, 2)
    .to('.light', 10, { css: { '-webkit-filter': 'hue-rotate(360deg) saturate(1)' }, yoyo: true, repeat: -1, ease: Bounce.easeOut }, 4);

var t2 = new TimelineMax({ paused: true });
var width = $(window).width();
if (width < 769) {
    t2.from('.ball', 1, { scale: 0.2, ease: Elastic.easeIn.config(1, 1) })
        .from('.ballB', 30, { rotation: 360, transformOrigin: "center center", yoyo: true, repeat: -1, ease: SlowMo.ease.config(0.7, 0.7, false) }, 0.5)
        .from('.ballS', 30, { rotation: -360, transformOrigin: "center center", yoyo: true, repeat: -1, ease: SlowMo.ease.config(0.7, 0.7, false) }, 0.5)
        .from('.shine', 3, { css: { '-webkit-filter': 'brightness(1.6)' }, yoyo: true, repeat: -1, ease: Elastic.easeInOut.config(2, 0.1) }, 1)
        .from('#p2 .blockRight', 2, { opacity: 0, ease: Expo.easeOut }, 2.5);
} else {
    t2.from('.ball', 1, { scale: 0.2, ease: Elastic.easeIn.config(1, 1) })
        .from('.ballB', 30, { rotation: 360, transformOrigin: "center center", yoyo: true, repeat: -1, ease: SlowMo.ease.config(0.7, 0.7, false) }, 0.5)
        .from('.ballS', 30, { rotation: -360, transformOrigin: "center center", yoyo: true, repeat: -1, ease: SlowMo.ease.config(0.7, 0.7, false) }, 0.5)
        .from('.shine', 3, { css: { '-webkit-filter': 'brightness(1.6)' }, yoyo: true, repeat: -1, ease: Elastic.easeInOut.config(2, 0.1) }, 1)
        .from('.p2phone', 2.5, { y: -200, opacity: 0, ease: Expo.easeOut }, 3)
        .to('.p2phoneL', 2, { css: { 'transform-origin': 'bottom', 'rotation': '-20deg','opacity': 1 }, ease: Expo.easeOut }, 5)
        .from('#p2 .blockRight', 2, { opacity: 0, ease: Expo.easeOut }, 5.5);
}

var t3 = new TimelineMax({ paused: true });
t3.from('#p3 .blockRight', 2, { opacity: 0, ease: Power1.easeOut}, 2.5)
    .from('.p3phone', 0.2, { opacity: 0 }, 0.5)
    .to('.p3phoneL2', 1, { x: '10%', y: -180, ease: Elastic.easeOut.config(1, 0.3) }, 1.5)
    .to('.p3phoneL3', 1, { x: '50%', y: -140, ease: Elastic.easeOut.config(1, 0.3) }, 1.5)
    .to('.p3phoneL4', 1, { x: '100%', y: 100, ease: Elastic.easeOut.config(1, 0.3) }, 1.5);

var mySwiper = new Swiper('.swiper-container', {
    // Optional parameters
    pagination: '.swiper-pagination',
    direction: 'vertical',
    paginationClickable: true,
    slidesPerView: 1,
    speed: 1000,
    mousewheelControl: true,
    onSlideChangeStart: function(swiper){
        var page = (swiper.activeIndex);
        switch (page) {
            case 0:
                t2.reverse();
                break;
            case 1:
                TweenMax.to('.p1Logo', 0.8, { ease: Expo.easeOut,x:-1000});
                tl.reverse();
                t3.reverse();
                break;
            case 2:
                t2.reverse();
                break;
        }
    },
    onSlideChangeEnd: function(swiper) {
        var page = (swiper.activeIndex);
        switch (page) {
            case 0:
                TweenMax.set('.p1Logo',{ x:0});
                tl.play();
                // t2.reverse(0.3);
                break;
            case 1:
                t2.play();
                // tl.reverse(0.3);
                // t3.reverse(0.3);
                break;
            case 2:
                t3.play();
                // t2.reverse(0.3);
                break;
        }
    }
});
