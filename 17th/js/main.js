$(function() {
  
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, CSSRulePlugin,TextPlugin);

  var random1 = gsap.utils.random(-30, 30, 5, true);
  var random2 = gsap.utils.random(-10, 10, true);
  var windoWidth = $(window).width();
  var windoHeight = $(window).height();

  function repeatAnimation() {
    var repeatTl = gsap.timeline();
    repeatTl
      .to('.balloon', {duration: 1.6,y: -20, ease: "none", yoyo: true, repeat: -1 })
      .to('.logoScreenLight1 img',{duration: 1, opacity: 0, filter: "brightness(1.1)", ease: "power3.out", yoyo: true, repeat: -1}, 1.1)

      ScrollTrigger.create({
        trigger: ".p1",
        start: "top bottom",
        end: "bottom top",
        onToggle(self) {
           if(self.isActive){
              repeatTl.play()
           } else {
              repeatTl.pause()
           }
        }
      });

    return repeatTl;
  }

  var loading = gsap.timeline();
	loading
  // .set('.logoScreenLight, .logoLight',{opacity: 0.8, filter: "brightness(1)"})
  .set('.logoScreenLight1 img',{ opacity: 1, filter: "brightness(1)"})
	.set('.mainBgFilter',{opacity: 0.8,backdropFilter: 'sepia(30%) blur(10px) brightness(160%) saturate(120%) contrast(110%)'})
	// .to('.p1 .bgs',{duration: 0.9 ,ease: "elastic.inOut(1.75, 1"},4.5)
	.to('#load',{duration: 1, opacity: 0, ease: "circ.in"},4.2)
	.set('#load',{display: "none"},5.2)
	.to('.mainBgFilter',{ duration: 0.8, backdropFilter: 'sepia(0%) blur(0px) brightness(100%) saturate(100%) contrast(100%)', ease:"power4.in"},5)
  .from('.balls img',{duration: 0.3, y: random1, scale: 0, transformOrigin: "center bottom", ease:"elastic.out(1, 1)", stagger: 0.1},5.5)
  .from('.curtain',{ duration: 1, scale: 1.3, transformOrigin: "center top", ease: "power3.out" }, 5.2)
  .to('.bgCover,.soptLights',{duration: 0.6, opacity: 1,ease: "elastic.out(1, 0.3)"},5.9)
  // .to('.logoScreenLight, .logoLight',{duration: 2, opacity: 1, filter: "brightness(1.1)", ease: "elastic.in(1.2, 0.3)", yoyo: true, repeat: -1}, 6)
  .to('.p1 h2', {duration: 1.2, text: "-经典‧从不妥协-", ease: "none" },6)
  // .to('body', { overflowY: "auto"}, 7.2)
  .add(repeatAnimation(), 6.3)

  var spotLightTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".p2",
      scrub: 1,
      start: "top bottom", 
      end: "top top",
      toggleActions: "play complete reverse reset"
    },
    ease: "none"
  });

  spotLightTl
            .to(".spotLightR", { duration: 2,y: innerHeight * 1.35},0)
            .to(".spotLightR", { duration: 0.5,rotation:'+=40',x: "+=" + innerWidth / 2.4},0)
            .to(".spotLightL", { duration: 2,y: innerHeight * 0.95},0)
            .to(".spotLightL", { duration: 0.5,rotation:'-=50', xPercent: -65},0)
            .to(".spotLightR", { duration: 1,rotation:'+=142',x: "-=" + innerWidth / 2.5},1.5)
            .to(".spotLightL", { duration: 1,rotation:'-=135',xPercent: 65},1.5);

  gsap.to(".spotLightR,.spotLightL", {
    scrollTrigger: {
      trigger: ".p3",
      scrub: true,
      start: "top bottom",
      end: "top center",
      toggleActions: "play complete reverse reset"
    },
    opacity: 0,
    ease: "none"
  });

  var p2tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".p2 dd.line",
      scrub: 1,
      start: "top bottom", 
      end: "+=300",
      // pin: true,
      toggleActions: "play complete reverse reset"
    }
  });

  var ruleB = CSSRulePlugin.getRule(".p2 dd.line::before");
  var ruleA = CSSRulePlugin.getRule(".p2 dd.line::after");
  p2tl.from(".p2 dd.line", {duration: 2,scaleX: 0, ease: "none"},1)
      .to(ruleB, {duration: 1,ease: "none", opacity: 1, bottom: "23px" },3)
      .to(ruleA, {duration: 1,ease: "none", opacity: 1, top: "23px" },3)

  
  var p3LogoBlockTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".p3LogoBlock",
      scrub: 1,
      start: "top top",
      endTrigger: ".p4",
      end: "top top",
      pin: ".p3LogoBlock",
      pinSpacing: false,
      toggleActions: "play complete reverse reset"
    }
  });

  p3LogoBlockTl
      .to(".p3LogoBlock", {yPercent: 30})
      .to(".p3logoLight", {opacity:0, ease: "power3.out"},0)

  var p3giftTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".gifts",
      start: "top bottom",
      end: "bottom top",
      toggleActions: "play pause play pause"

    }
  });

  

  p3giftTl
      .to(".g1 .giftCloud.back", {duration: 6, yPercent: random2, xPercent: random2, repeat:-1, yoyo: true, ease:"expoScale(0.5,7, power2.inOut)"})
      .to(".g1 .giftCloud.front", {duration: 6, yPercent: random2, xPercent: random2, repeat:-1, yoyo: true, ease:"expoScale(0.5,7, power2.inOut)"},0)
      .to(".g2 .giftCloud.back", {duration: 5.8, yPercent: random2, xPercent: random2, repeat:-1, repeatDelay: 0.2, yoyo: true, ease:"expoScale(0.5,7, power2.inOut)"}, 0.2)
      .to(".g2 .giftCloud.front", {duration: 5.8, yPercent: random2, xPercent: random2, repeat:-1, repeatDelay: 0.2, yoyo: true, ease:"expoScale(0.5,7, power2.inOut)"}, 0.2)
      .to(".g3 .giftCloud.back", {duration: 5.6, yPercent: random2, xPercent: random2, repeat:-1, repeatDelay: 0.4, yoyo: true, ease:"expoScale(0.5,7, power2.inOut)"}, 0.4)
      .to(".g3 .giftCloud.front", {duration: 5.6, yPercent: random2, xPercent: random2, repeat:-1, repeatDelay: 0.4, yoyo: true, ease:"expoScale(0.5,7, power2.inOut)"}, 0.4)


  var p3LightTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".p3LightBlock",
      scrub: 1,
      start: "top top",
      endTrigger: ".p4",
      end: "top top",
      pin: ".p3LightBlock",
      pinSpacing: false,
      toggleActions: "play complete reverse reset"
    }
  });

  p3LightTl
          .to(".p3Light",{y: "-=" + innerHeight, scale: 0.7, ease: "circ.out"})
          .to(".p3Light",{xPercent: -110, y: "+=" + innerHeight*0.6 ,scale: 1, ease: "power3.inOut"})


  gsap.to(".parallax-bg", {
    scrollTrigger: {
      scrub: 2
    }, 
    y: (i, target) => -ScrollTrigger.maxScroll(window) * target.dataset.speed,
    // ease: "none"
  });


  // mouse

  $(window).on("mousemove",function(e){
    let classNames = ["dot8","dot9"]
    let randomName = classNames[Math.floor(Math.random()*2)]
    let childSpan = $(`<span class="dot ${randomName}"></span>`)
    let x = e.pageX
    let y = e.pageY
    // let size = Math.random() * 100
    $(childSpan).css({"left":x+"px","top":y+"px"})
    $(".container").append(childSpan);
    
    gsap.to(".dot",{scale: 0, opacity:0, y:-50, duration: 3, ease: "slow(0.1, 2, false)"})
    setTimeout(function(){
      $(childSpan).remove();
    },2000)
  })


  //scrollbar

  var Scrollbar = window.Scrollbar;
  Scrollbar.use(window.OverscrollPlugin);
  Scrollbar.init(document.querySelector('#tab-1'), {
      plugins: {
        overscroll: {
          effect: 'glow'
        },
      },
    });
  Scrollbar.init(document.querySelector('#tab-2'), {
      plugins: {
        overscroll: {
          effect: 'glow'
        },
      },
    });
  Scrollbar.init(document.querySelector('#tab-3'), {
      plugins: {
        overscroll: {
          effect: 'glow'
        },
      },
  });


  //tab
  $('#smarttab').smartTab({
    theme: 'blocks',
    // autoAdjustHeight: false,
    transition: {
        animation: 'fade', // Animation effect on navigation, none|fade|slideHorizontal|slideVertical|slideSwing|css(Animation CSS class also need to specify)
        speed: '300', // Animation speed. Not used if animation is 'css'
    },
  });

   if( windoWidth > 1024 ){
      $('#smarttab').addClass('st-vertical')
    } else {
      $('#smarttab').removeClass('st-vertical')
    }

  $(window).on('resize', function(){
    windoWidth = $(window).width();
    if( windoWidth > 1024 ){
      $('#smarttab').addClass('st-vertical')
    } else {
      $('#smarttab').removeClass('st-vertical')
    }
  })

  $('.anchor').on('click',function(e){
    e.preventDefault();
    $('#smarttab').smartTab("goToTab", 2);
    gsap.to(window, {duration: 1, scrollTo: ".tab-content", overwrite: "auto"});
  })

  //nav scrollTo 
  let links = gsap.utils.toArray("nav a");

  links.forEach(a => {
    let element = document.querySelector(a.getAttribute("href")),
        linkST = ScrollTrigger.create({
              trigger: element,
              start: "top top"
            });
    ScrollTrigger.create({
      trigger: element,
      start: "top center",
      end: "bottom center",
      onToggle: self => self.isActive && setActive(a)
    });
    a.addEventListener("click", e => {
      e.preventDefault();
      gsap.to(window, {duration: 1, scrollTo: linkST.start, overwrite: "auto"});
    });
  });

  function setActive(link) {
    links.forEach(el => el.classList.remove("active"));
    link.classList.add("active");
  }

  gsap.to("nav", {
    scrollTrigger: {
      trigger: ".p2",
      scrub: true,
      start: "top 10%",
      end: "top top"
    },
    opacity: 1,
    ease: "none"
  });

  //features scrollTo 
  let scrollA = gsap.utils.toArray(".features a");

  scrollA.forEach(a => {
    let element = document.querySelector(a.getAttribute("href")),
        linkST = ScrollTrigger.create({
              trigger: element,
              start: "top top"
            });
    ScrollTrigger.create({
      trigger: element,
      start: "top center",
      end: "bottom center"
    });
    a.addEventListener("click", e => {
      e.preventDefault();
      gsap.to(window, {duration: 1, scrollTo: linkST.start, overwrite: "auto"});
    });
  });

 

  $('.feat1')
  .on( 'mouseenter', function(){
      gsap.to('.feat1 .featFront',{rotation:-30,transformOrigin:'20% bottom', duration:0.6, ease: "elastic.out(1.75, 1)", overwrite: "auto"});

  })
  .on( 'mouseleave', function(){
      gsap.to('.feat1 .featFront',{rotation: 0,transformOrigin:'20% bottom', duration:0.1, ease: "none", overwrite: "auto"});
  });

   $('.feat2')
  .on( 'mouseenter', function(){
     gsap.to('.feat2 .featFront',{ scale: 1.1, duration:0.3, ease: "power3.out", overwrite: "auto"})

  })
  .on( 'mouseleave', function(){
     gsap.to('.feat2 .featFront',{ scale: 1, duration:0.1, overwrite: "auto"})
  });

  $('.feat3')
  .on( 'mouseenter', function(){
      gsap.to('.feat3 .featFront',{ duration:0.3, y: -20, ease: "power1.out", overwrite: "auto"});
  })
  .on( 'mouseleave', function(){
     gsap.to('.feat3 .featFront',{ duration:0.1, y: 0, ease: "none", overwrite: "auto"});
  });



  var userAgent = navigator.userAgent;
  var isChrome = userAgent.indexOf("Chrome") > -1;
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



})
