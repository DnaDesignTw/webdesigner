$(function() {
    var userAgent = navigator.userAgent;
    var isChrome = userAgent.indexOf("Chrome") > -1;
    var load = $("#load");
    var nav = $("#nav");
    var p1 = $("#p1");
    var p3 = $("#p3");
    var p31 = $("#p3-1");
    var p4 = $("#p4");
    TweenMax.set(p3, { opacity: 0 });
    TweenMax.set(p31, { opacity: 0 });
    TweenMax.set(p4, { opacity: 0 });
    /*load*/
    TweenMax.to(load, 2, { opacity: 0, display: "none", delay: 5.2, ease: Expo.easeOut });

    TweenMax.set(nav, { xPercent: -50 });
    TweenMax.from(nav, 2, { opacity: 0, delay: 7, y: "-100px", ease: Expo.easeOut });
    TweenMax.from(".logo", 2, { opacity: 0, delay: 7, y: "-100px", ease: Expo.easeOut });

    TweenMax.to(".gold", 5, { y: "-20px", yoyo: true, repeat: -1 });
    TweenMax.to(".iphoneX", 4, { y: "20px", yoyo: true, repeat: -1 });

    TweenMax.from(".leftBg", 3, { opacity: 0, delay: 7.5, ease: Expo.easeOut });
    TweenMax.from(".rightBg", 3, { opacity: 0, delay: 7.5, ease: Expo.easeOut });

    TweenMax.to(".p1Bg_right", 2, { css: { '-webkit-filter': 'saturate(2)' }, opacity: 1, delay: 10, yoyo: true, repeat: -1, ease: "easeOutElastic" });
    TweenMax.to(".shine", 2, { css: { '-webkit-filter': 'saturate(2)' }, opacity: 0, yoyo: true, repeat: -1, ease: Bounce.easeOut });

    TweenMax.to("#light_l", 2, { y: 30, repeat: -1, yoyo: true });
    TweenMax.to("#light_r", 2, { y: -30, repeat: -1, yoyo: true });


    var t3 = new TimelineMax({ delay: 1 }),
        text = $("#info"),
        split = new SplitText(text, { type: "chars", position: "absolute" }),
        rough = RoughEase.ease.config({ strength: 2, clamp: true }),
        i;
    t3.set(text, { autoAlpha: 1 })
    for (i = 0; i < split.chars.length; i++) {
        t3.from(split.chars[i], 0.6, { autoAlpha: 0, ease: rough }, 4.5 + Math.random());
    }
    TweenMax.staggerFrom(".step", 2, { opacity: 0, x: -50, delay: 7, ease: Expo.easeOut }, 0.3);



    var mySwiper = new Swiper('.swiper-container', {
        // Optional parameters
        pagination: '.swiper-pagination',
        direction: 'vertical',
        paginationClickable: true,
        slidesPerView: 1,
        mousewheelControl: true,
        onSlideChangeEnd: function(swiper) {

            var page = (swiper.activeIndex);
            switch (page) {
                case 0:

                    TweenMax.to(p1, 1, { opacity: 1 });
                    TweenMax.to(p3, 0, { opacity: 0 });
                    TweenMax.to(p31, 0, { opacity: 0 });
                    TweenMax.to(p4, 0, { opacity: 0 });
                    TweenMax.staggerFrom(".step", 1, { opacity: 0, x: -50, ease: Expo.easeOut }, 0.2);


                    break;


                case 1:
                    TweenMax.to(p1, 0, { opacity: 0 });
                    TweenMax.to(p3, 1, { opacity: 1 });
                    TweenMax.to(p31, 0, { opacity: 0 });
                    TweenMax.to(p4, 0, { opacity: 0 });
                    if (isChrome) {
                        var mySplitText = new SplitText(p3, { type: "chars, words" }),
                            t2 = new TimelineLite(),
                            numChars = mySplitText.chars.length;

                        for (var i = 0; i < numChars; i++) {
                            //random value used as position parameter
                            t2.from(mySplitText.chars[i], 0.3, { opacity: 0, delay: 1 }, Math.random() * 0.8);
                        }
                    }
                    TweenMax.staggerFrom(".p3img", 2.5, { rotation: -90, opacity: 0, y: 100, ease: Expo.easeOut }, 0.5);
                    TweenMax.from(".p3Bg", 2, { x: 500, ease: Expo.easeOut });
                    TweenMax.from(".mainT h2", 2, { x: -500, ease: Expo.easeOut });
                    TweenMax.staggerFrom("#p3 li", 1, { opacity: 0, x: 50, delay: 1, ease: Expo.easeOut }, 0.2);
                    break;

                case 2:
                    var width = $(window).width();
                    var rankingPic = $("#rankingPic");
                    if (width > 1440) {
                        TweenMax.to(p1, 0, { opacity: 0 });
                        TweenMax.to(p3, 0, { opacity: 0 });
                        TweenMax.to(p31, 1, { opacity: 1 });
                        TweenMax.to(p4, 0, { opacity: 0 });
                        TweenMax.to(rankingPic, 0, { css: { '-webkit-filter': 'saturate(1)' } });
                        TweenMax.from(rankingPic, 2, { opacity: 0, y: 50, ease: Expo.easeOut });
                        TweenMax.to(rankingPic, 1, { css: { '-webkit-filter': 'saturate(3)' }, opacity: 1, delay: 2, yoyo: true, repeat: -1, ease: "easeOutElastic" });
                        TweenMax.staggerFrom(".p3-1_info", 2, { opacity: 0, x: 50, delay: 1, ease: Expo.easeOut }, 0.2);
                        TweenMax.staggerFrom(".Ranking", 2, { opacity: 0, x: -50, delay: 2, ease: Expo.easeOut }, 0.2);
                    } else {

                        TweenMax.to(p1, 0, { opacity: 0 });
                        TweenMax.to(p3, 0, { opacity: 0 });
                        TweenMax.to(p31, 0, { opacity: 0 });
                        TweenMax.to(p4, 1, { opacity: 1 });
                        TweenMax.from(".p4Bg_left", 3, { opacity: 0, x: 500, ease: Expo.easeOut });
                        TweenMax.from(".p4Bg_right", 3, { opacity: 0, x: -500, ease: Expo.easeOut });
                        TweenMax.from("#t1", 1.5, { opacity: 0, y: 50, rotation: -45, transformOrigin: "180% top", delay: 0.6, ease: Expo.easeOut });
                        TweenMax.from("#t2", 1.5, { opacity: 0, y: 50, rotation: 45, transformOrigin: "-80% top", delay: 0.8, ease: Expo.easeOut });
                        TweenMax.from("#t3", 1.5, { opacity: 0, y: 50, rotation: -45, transformOrigin: "180% top", delay: 1.0, ease: Expo.easeOut });
                        TweenMax.from("#t4", 1.5, { opacity: 0, y: 50, rotation: 45, transformOrigin: "-80% top", delay: 1.2, ease: Expo.easeOut });
                        TweenMax.from("#t5", 1.5, { opacity: 0, y: 50, rotation: -45, transformOrigin: "180% top", delay: 1.4, ease: Expo.easeOut });
                        TweenMax.from("#t6", 1.5, { opacity: 0, y: 50, rotation: 45, transformOrigin: "-80% top", delay: 1.6, ease: Expo.easeOut });

                    }

                    break;

                case 3:

                    TweenMax.to(p1, 0, { opacity: 0 });
                    TweenMax.to(p3, 0, { opacity: 0 });
                    TweenMax.to(p31, 0, { opacity: 0 });
                    TweenMax.to(p4, 1, { opacity: 1 });
                    TweenMax.from(".p4Bg_left", 3, { opacity: 0, x: 500, ease: Expo.easeOut });
                    TweenMax.from(".p4Bg_right", 3, { opacity: 0, x: -500, ease: Expo.easeOut });
                    TweenMax.from("#t1", 1.5, { opacity: 0, y: 50, rotation: -45, transformOrigin: "180% top", delay: 0.6, ease: Expo.easeOut });
                    TweenMax.from("#t2", 1.5, { opacity: 0, y: 50, rotation: 45, transformOrigin: "-80% top", delay: 0.8, ease: Expo.easeOut });
                    TweenMax.from("#t3", 1.5, { opacity: 0, y: 50, rotation: -45, transformOrigin: "180% top", delay: 1.0, ease: Expo.easeOut });
                    TweenMax.from("#t4", 1.5, { opacity: 0, y: 50, rotation: 45, transformOrigin: "-80% top", delay: 1.2, ease: Expo.easeOut });
                    TweenMax.from("#t5", 1.5, { opacity: 0, y: 50, rotation: -45, transformOrigin: "180% top", delay: 1.4, ease: Expo.easeOut });
                    TweenMax.from("#t6", 1.5, { opacity: 0, y: 50, rotation: 45, transformOrigin: "-80% top", delay: 1.6, ease: Expo.easeOut });
                    break;

            }

        }
    })





    if (isChrome) {


        /*地下飄*/
        var width = document.body.clientWidth;
        var height = document.body.clientHeight;
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');
        var fps = 60;
        var frameTime = 1000 / fps;
        var objArr = [];
        var lastTimeRender = +new Date();
        var lastTimePushObj = +new Date();

        var getRandomInt = function(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        };

        var motionObj = function(x, y) {
            this.r = getRandomInt(1, 4);
            this.g = getRandomInt(4, 8) / -1000 / fps;
            this.t = 0;
            this.k = getRandomInt(1, 5) / 1000;
            this.x = x;
            this.px = x;
            this.ax = 0;
            this.vx = 0.5;
            this.hsl = getRandomInt(30, 50) + ', 50%, 90%';
            this.alpha = getRandomInt(40, 80);
            this.y = y;
        };

        motionObj.prototype.move = function() {
            this.t += frameTime;
            this.ax = (this.px - this.x) * this.k;
            this.vx += this.ax;
            this.x += this.vx;
            this.y = 1 / 2 * this.g * this.t * this.t + height + this.r * 3;
        };

        motionObj.prototype.fadeAway = function() {
            if (this.t < 1400) return;
            this.alpha -= 1;
        };

        motionObj.prototype.render = function() {
            ctx.beginPath();
            ctx.shadowBlur = this.r * 3;
            ctx.shadowColor = 'rgba(237, 216, 104, 1)';
            ctx.fillStyle = 'hsla(' + this.hsl + ', ' + (this.alpha / 100) + ')';
            ctx.arc(this.x, this.y, this.r, 0, 360 * Math.PI / 180, false);
            ctx.fill();
            ctx.closePath();
        };

        motionObj.prototype.isLast = function() {
            if (this.alpha < 0) {
                return true;
            } else {
                return false;
            }
        };

        var render = function() {
            ctx.clearRect(0, 0, width, height);
            for (var i = 0; i < objArr.length; i++) {
                if (objArr[i]) {
                    objArr[i].move();
                    objArr[i].fadeAway();
                    objArr[i].render();
                    if (objArr[i].isLast()) {
                        delete objArr[i];
                    }
                }
            }
        };

        var renderloop = function() {
            var now = +new Date();
            requestAnimationFrame(renderloop);
            if (now - lastTimeRender > frameTime) {
                render();
                lastTimeRender = +new Date();
            }

            if (now - lastTimePushObj > 2000) {
                for (var i = 0; i < 20; i++) {
                    objArr.push(new motionObj(Math.random() * width, 0));
                }
                lastTimePushObj = +new Date();
            }
        };
        renderloop();

        var canvasResize = function() {
            ctx.clearRect(0, 0, width, height);
            width = document.body.clientWidth;
            height = document.body.clientHeight;
            canvas.width = width;
            canvas.height = height;
        };
        canvasResize();

        var debounce = function(object, eventType, callback) {
            var timer;

            object.addEventListener(eventType, function() {
                clearTimeout(timer);
                timer = setTimeout(function() {
                    callback();
                }, 500);
            }, false);
        };

        debounce(window, 'resize', function() {
            canvasResize();
        });
    }

});