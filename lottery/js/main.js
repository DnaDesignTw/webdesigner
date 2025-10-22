var bgFilter = TweenMax.to(".mainBgFliter", 400, { css: { "background-position-y": "10800px" }, repeat: -1, ease: Power0.easeNone });

var loadingAnimation = new TimelineMax();
loadingAnimation.to("#load", 2, { opacity: 0, ease: "easeBounce.easeIn", display: "none" }, 0);

TweenMax.to(".light1", 1, { opacity: 0.5, yoyo: true, repeat: -1, ease: Bounce.easeOut })
TweenMax.to(".light2", 1, { opacity: 0, yoyo: true, repeat: -1, ease: Bounce.easeOut })
TweenMax.to(".loginBtn", 1, { css: { "-webkit-filter": "opacity(1) brightness(1.3)" }, yoyo: true, repeat: -1, repeatDelay: 1, ease: Bounce.easeIn });

var spotsEase = RoughEase.ease.config({ template: Elastic.easeOut, strength: 1, points: 200, taper: "in", randomize: true, clamp: false });

var spotsMovement1 = getRandom(7, 10);
var spotsMovement2 = getRandom(5, 7);
var spotsMovement3 = getRandom(3, 5);
var spotsMovement4 = getRandom(1, 3);

function getRandom(min, max) {
    return min + Math.random() * (max - min);
}

var lotteryAnimation = new TimelineMax({ repeat: 1, yoyo: true, paused: true });

lotteryAnimation.to("#lotteryLogo", 2.5, { css: { transform: 'rotateZ(345deg)' }, ease: Bounce.easeOut })
    .to(".topRight1", 2.4, { scale: 1.1, x: spotsMovement1, y: -spotsMovement2, ease: spotsEase }, 0)
    .to(".topRight2", 2.4, { scale: 1.1, x: spotsMovement3, y: -spotsMovement4, ease: spotsEase }, 0)
    .to(".topLeft2", 2.4, { scale: 1.1, x: -spotsMovement1, y: -spotsMovement2, ease: spotsEase }, 0)
    .to(".topLeft1", 2.4, { scale: 1.2, x: -spotsMovement3, y: -spotsMovement4, ease: spotsEase }, 0)
    .to(".bottomLeft2", 2.4, { scale: 1.1, x: -spotsMovement1, y: spotsMovement2, ease: spotsEase }, 0)
    .to(".bottomLeft1", 2.4, { scale: 1.1, x: -spotsMovement3, y: spotsMovement4, ease: spotsEase }, 0)
    .to(".bottomRight2", 2.4, { scale: 1.1, x: spotsMovement1, y: spotsMovement2, ease: spotsEase }, 0)
    .to(".bottomRight1", 2.4, { scale: 1.1, x: spotsMovement3, y: spotsMovement4, ease: spotsEase }, 0);


var resultBlockAnimation = new TimelineMax({ delay: 0.5, repeat: -1, repeatDelay: 1, paused: true });

resultBlockAnimation
    .set(".borderLightTop", { opacity: 1, xPercent: -100, yPercent: -50 }, 0)
    .set(".borderLightRight", { opacity: 0, xPercent: 0, yPercent: -50, rotation: 90, transformOrigin: "center right" }, 0)
    .set(".borderLightBottom", { opacity: 1, yPercent: -50, rotation: 180, transformOrigin: "bottom right" }, 0)
    .set(".borderLightLeft", { opacity: 0, xPercent: 0, yPercent: 50, rotation: 270, transformOrigin: "center left" }, 0)
    .to(".borderLightTop", 3, { left: "100%", onComplete: onCompleteTop, ease: Power0.easeNone }, 0.2)
    .set(".borderLightRight", { opacity: 1 }, 3.2)
    .set(".borderLightLeft", { opacity: 1 }, 3.2)
    .to(".borderLightRight", 0.3, { top: "110%", onComplete: onCompleteRight, ease: Power0.easeNone }, 3.2)
    .to(".borderLightLeft", 0.3, { bottom: "0%", onComplete: onCompleteLeft, ease: Power0.easeNone }, 3.2)
    .to(".borderLightBottom", 3, { right: "100%", onComplete: onCompleteBottom, ease: Power0.easeNone }, 0.2)

resultBlockAnimation.timeScale(2);

function onCompleteTop() {
    TweenMax.set(".borderLightTop", { opacity: 0 })
}

function onCompleteRight() {
    TweenMax.set(".borderLightRight", { opacity: 0 })
}

function onCompleteBottom() {
    TweenMax.set(".borderLightBottom", { opacity: 0 })
}

function onCompleteLeft() {
    TweenMax.set(".borderLightLeft", { opacity: 0 })
}

function frequency() {
    $.ajax({
        type: 'POST',
        url: "/pf1web/secure/activity_api.do?method=frequency",
        success: function(data) {
            var _data = JSON.parse(data);
            if (_data.status === true && _data.resultData !== 0) {
                $('.playTimesLeft').text(_data.resultData);
            } else if (_data.status === false ){
                $('.KinerLotteryBtn').removeClass('start');
                $('.KinerLotteryBtn').addClass('completed');
                $("#showPrize").text(_data.description);
            } else {
                $('.KinerLotteryBtn').removeClass('start');
                $('.KinerLotteryBtn').addClass('completed');
            }
        } 
    });
}

function query_record() {
    $.ajax({
        type: 'POST',
        url: "/pf1web/secure/activity_api.do?method=queryLotteryInfo",
        success: function(data) {
            var _data = JSON.parse(data);
            var str = '';
            var totalAmount = 0;
            if (_data.status == true && _data.resultData.length > 0) {
                $("#listBtn").css("visibility", "visible");
                $.each(_data.resultData, function(i, item) {
                    str = str + "<dl>" +
                        "<dd>" + (++i) + "</dd>" +
                        "<dd class='yellow-text text-lighten-3'>￥" + item.amount + "</dd>" +
                        "<dd>" + item.recordTime.substring(0, item.recordTime.length - 3) + "</dd>" +
                        "</dl>";
                    totalAmount += parseInt(item.amount);
                });

                $('#record_content').html("<p>当前累计中奖金额：¥" + totalAmount + "</p><dl><dt>次数</dt><dt>金额</dt><dt>时间</dt></dl>").append(str);

            }
        }
    })
}

var whichAward = function(deg) {
    if ((deg > 0 && deg <= 45)) {
        return "8元";
    } else if ((deg > 45 && deg <= 90)) {
        return "18元";
    } else if (deg > 90 && deg <= 135) {
        return "58元";
    } else if (deg > 135 && deg <= 180) {
        return "188元";
    } else if (deg > 180 && deg <= 225) {
        return "588元";
    } else if (deg > 225 && deg <= 270) {
        return "1088元";
    } else if (deg > 270 && deg <= 315) {
        return "18888元";
    } else if (deg > 315 && deg <= 360) {
        return 再接再厉;
    }
}
var KinerLottery = new KinerLottery({
    rotateNum: 6,
    body: "#lotteryBlock",
    direction: 1,
    disabledHandler: function(key) {
        switch (key) {
            case "noStart":
                alert("活动尚未开始");
                break;
            case "completed":
                $("#showPrize").text("使用次數不足!");
                break;
        }
    },
    clickCallback: function() {
        var curr = this;
        $.ajax({
            type: "POST",
            url: "/pf1web/secure/activity_api.do?method=lottery",
            success: function(data) {
                var _data = JSON.parse(data);
                console.log(_data);
                var degree = _data.resultData;
                curr.goKinerLottery(degree);
                if (_data.status === true) {
                    bgFilter.paused(true);
                    TweenMax.staggerTo(".mainBgFliter", 4, { css: { 'background-position-y': '+=10800px' }, ease: Elastic.easeInOut.config(1, 1) }, 0.2);
                    lotteryAnimation.restart();
                    TweenMax.to(".innerWhite", 5, { rotation: "+=2880", esae: Power0.easeIn });
                } else {
                    $("#showPrize").text("系统忙碌");
                }
            },
            error: function() {
                $("#showPrize").text("系统忙碌");
            }
        });
    },
    KinerLotteryHandler: function(deg) {
        var playTimesLeft = $('.playTimesLeft').text();
        bgFilter.play();
        if (typeof deg === 'number' && deg == 338) {
            $("#showPrize").text(whichAward(deg));
        } else if (typeof deg === 'number' && deg !== 338) {
            $("#showPrize").text("恭喜您获得:" + whichAward(deg));
        } else {
            $("#showPrize").text("已无抽奖次数");
        }

        query_record();
        frequency();
    } //抽奖结束回调
});

function reloadPage() {
    location.reload();
}

/*登入登出*/
function switchLogInOut() {
    if (APILib.isLogin()) {
        $("#loginPage,#loginBefore").hide();
        $("#logoutBlock,#loginAfter").show();
        $("#name").text('Hello!   ' + APILib.getCookie("nickName"));
        frequency();
        APILib.queryBetAmount('2019-10-18', '2019-10-31');
        query_record();
        TweenMax.killTweensOf(".light1");
        TweenMax.killTweensOf(".light2");
        TweenMax.killTweensOf(".loginBtn");
        resultBlockAnimation.play();
        TweenMax.to(".borderLight", 0.3, { css:{"-webkit-filter":"brightness(2)"}, opacity:0.8, delay:0.5, ease: Power2.easeOut, repeat: -1, yoyo:true});
    } else {
        $("#logoutBlock,#loginAfter").hide();
        $("#loginBefore").show();
    }
}

function alertNeedLogin() {
    //alert("You Need Login First !");
    APILib.doLogout();
    reloadPage();
}

function alertError(e) {
    //alert("ERROR : " + e.detail);
    if (e.detail == "PWD_IS_EMPTY" || e.detail == "ACCOUNTS_IS_EMPTY") {
        $(".redAlert").remove();
        $("#firstChild").prepend('<div class="redAlert">' + '帐号密码不能为空' + '</div>');
    } else if (e.detail == "PWD_LENGTH_ERROR" || e.detail == "LOGIN_ACCCOUNT_PASSWORD_NOT_ALLOW" || e.detail == "PWD_FORMAT_ERROR") {
        $(".redAlert").remove();
        $("#firstChild").prepend('<div class="redAlert">' + '密码输入错误' + '</div>');
    } else if (e.detail == "ACCOUNTS_LENGTH_ERROR" || e.detail == "LOGIN_USER_NOT_FOUND" || e.detail == "ACCOUNTS_FORMAT_ERROR") {
        $(".redAlert").remove();
        $("#firstChild").prepend('<div class="redAlert">' + '帐号输入错误' + '</div>');
    }
    //alert("帐号密码输入错误");
}

function doJoin(e) {
    console.log(e.detail);
}

function joinCheck(e) {
    console.log(e.detail);
}

function showLog(e) {
    console.log(e.detail);
}

function showBetAmount(e) {
    var betAmount = 0;
    for (var i = 0; i < e.detail.length; i++) {
        betAmount += e.detail[i].total_Lott;
    }
    $(".betAmount").text(betAmount);
}


// JS库会触发的事件
window.addEventListener("LoginChange", switchLogInOut);
window.addEventListener("NeedLogin", alertNeedLogin);
window.addEventListener("ID", showLog);
window.addEventListener("APIError", alertError);
window.addEventListener("Join", doJoin);
window.addEventListener("JoinLog", joinCheck);
window.addEventListener("BetAmount", showBetAmount);
window.addEventListener("WinAmount", showLog);

switchLogInOut();