gsap.registerPlugin(ScrollTrigger);

jQuery.noConflict();

var $ = jQuery;

var loadf = 0;

var m_x = -1e3;

var m_y = -1e3;

var n_x = -1e3;

var n_y = -1e3;

var sp_width = 1024 + 1;

var scr_h;

function rms(url) {
    if (url.substr(-1) === "/") {
        url = url.substr(0, url.length - 1);
    }
    return url;
}

$(function ($) {
    setTimeout(loaded, 500);
    $('a[fornav][href^="#"]').click(function () {
        // 移動先を0px調整する。0を30にすると30px下にずらすことができる。
        var adjust = 0;
        if (window.innerWidth > sp_width) {
            adjust = -50;
        } else {
            adjust = -90;
        }
        // スクロールの速度（ミリ秒）
        var speed = 600;
        // アンカーの値取得 リンク先（href）を取得して、hrefという変数に代入
        var href = $(this).attr("href");
        // 移動先を取得 リンク先(href）のidがある要素を探して、targetに代入
        var target = $(href == "#" || href == "" ? "html" : href);
        // 移動先を調整 idの要素の位置をoffset()で取得して、positionに代入
        var position = target.offset().top + adjust;
        // スムーススクロール linear（等速） or swing（変速）
        $("body,html").animate({
            scrollTop: position
        }, speed, "swing");
        return false;
    });
    $(".ch_nd_honbun").find("iframe").each(function () {
        $(this).wrap('<div class="iframe_w">');
    });
    // var n_h = rms(location.href.split("#")[0]);
    // $("a[href]").each(function() {
    //     //if(rms($(this).prop("href").split("#")[0]) == n_h){
    //     if (n_h.indexOf(rms($(this).prop("href").split("#")[0])) != -1) {
    //         $(this).addClass("nowurl");
    //     }
    // });
    (function loop() {
        para();
        mm();
        window.requestAnimationFrame(loop);
    })();
    $(window).mousemove(function () {
        n_x = event.clientX;
        n_y = event.clientY;
    });
});

function loaded() {
    loadf = 1;
    $("body").addClass("loaded");
    if ($(".top_free").length && 0) {
        top_free_size();
        setInterval(top_free_size, 1e3);
    }
    if ($("#splash").length) {
        setTimeout(typing, 1e3);
        news_sl();
    }
    $(document).on("click", "[popimg]", function () {
        scr_h = $(window).scrollTop();
        var popimg_url = $(this).attr("popimg").split(",");
        var popin_html = "";
        for (const elem of popimg_url) {
            popin_html = popin_html + '<div class="fapop_scroll_sq" style="background-image: url(' + elem + ')"><img src="' + elem + '"></div>';
        }
        popin_html = '<div class="fapop_scroll_in">' + popin_html + "</div>";
        $(".fapop_scroll_area").html(popin_html);
        $("body").addClass("popimg_on");
        $(".fapop_scroll_area").scrollTop(0);
    });
    $(document).on("click", ".fapop_close,.fapop_close_area", function () {
        $("body").removeClass("popimg_on");
    });
    $(document).on("click", ".howto_oubo_bottom", function () {
        var position = $(".fa_kiyaku_wrap").offset().top;
        if (window.innerWidth < sp_width) {
            position = position + 2;
        }
        $("html,body").animate({
            scrollTop: position
        }, 500);
    });
    $(document).on("click", ".menu_button", function () {
        $("body").toggleClass("menu_open");
    });
}

function typing() {
    gsap.to("#splash .h3", { duration: 2, text: "I'm Daniel Lee" });
    gsap.to("#splash .h4", { opacity: 1, delay: 2 });
    gsap.to("#splash .h4 span", {
        duration: 3,
        text: {
            value: "Web Developer and UX/UI Designer"
        },
        delay: 2.1
    });
    gsap.set('.top2_area .h4', {
        scrollTrigger: '.top2_area',
        opacity: 1
    });
    gsap.to('.top2_area .h4 span', {
        scrollTrigger: '.top2_left_in',
        duration: 2,
        text: {
            value: "關於我 About me"
        },
        delay: 0.3
    });

    gsap.set('.top_news_area .h4', {
        scrollTrigger: '.top_news_area',
        opacity: 1
    });
    gsap.to('.top_news_area .h4 span', {
        scrollTrigger: '.top_news_inner',
        duration: 2,
        text: {
            value: "作品 Portfolio"
        },
        delay: 0.3
    });

    gsap.set('.top_free .h4', {
        scrollTrigger: '.top_free',
        opacity: 1
    });
    gsap.to('.top_free .h4 span', {
        scrollTrigger: '.top_free_inner',
        duration: 2,
        text: {
            value: "聯絡我 Contact me"
        },
        delay: 0.3
    });
}

function para() {
    var wst = $(window).scrollTop();
    var wih = window.innerHeight;
    if ($("body").hasClass("popimg_on")) {
        window.scrollTo(0, scr_h);
    }
    // if ($(".his_nav").length) {
    //     var nowyear;
    //     $("[c_nav]").each(function() {
    //         if ($(this).offset().top < wst + wih) {
    //             nowyear = $(this).attr("c_nav");
    //         }
    //     });
    //     $("[fornav]").each(function() {
    //         if ($(this).attr("fornav") == nowyear) {
    //             $(this).addClass("his_this");
    //         } else {
    //             $(this).removeClass("his_this");
    //         }
    //     });
    // }

    if (loadf) {
        var wst = $(window).scrollTop();
        var wih = window.innerHeight;
        if (wst > 50) {
            $("body").addClass("scrolled");
        } else {
            $("body").removeClass("scrolled");
        }
        $(".ons").each(function () {
            if ($(this).offset().top < wst + wih && $(this).offset().top + $(this).innerHeight() > wst - 200) {
                $(this).addClass("onscreen");
            } else {
                $(this).removeClass("onscreen");
            }
        });
    }
}

function news_sl() {
    $(".top_news_slides").slick({
        slidesToScroll: 1,
        autoplay: false,
        infinite: false,
        variableWidth: true,
        autoplaySpeed: 3e3,
        arrows: false
    });
    $(document).on("click", ".top_news_nav_1", function () {
        $(".top_news_slides").slick("slickNext");
    });
    $(document).on("click", ".top_news_nav_2", function () {
        $(".top_news_slides").slick("slickPrev");
    });
}

var mper = .75;

var mper2 = .25;

function mm() {
    m_x = m_x * mper + n_x * (1 - mper);
    m_y = m_y * mper + n_y * (1 - mper);
    $(".mm").css("x", m_x).css("y", m_y);
    if ($(".fn_aw_sensh_wrap .fa_mid_h").length > 0) {
        $(".fn_aw_sensh_wrap .fa_mid_h").css("width", $(".fn_aw_sensh_box_sq").eq(0).width());
    }
    if ($(".fapop_scroll_sq").length > 0) {
        $(".fapop_scroll_sq").css("max-height", $(".fapop_scroll_sq").eq(0).width());
    }
}

function top_free_size() {
    $(".top_free").each(function () {
        $(this).css("height", parseInt($(this).find(".top_free_inner").height()) + 96 + "px");
    });
}

