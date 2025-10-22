/**
 * API Library Class
 */
if (typeof(window.CustomEvent) !== "function") {
    function CustomEvent(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        let evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;
}

var uuid = 'unkown';

var fp = new Fingerprint2({ excludeCanvas: true });
fp.get(function(result, components) {
    uuid = result;
    if (typeof window.console !== "undefined") {
        console.log(result);
    }
});

var APILib = {

    platformUrl: "",

    errorHandler: function(e) {
        if (401 === e.status | 3 === e.resultCode) {
            APILib.deleteCookie("token");
            window.dispatchEvent(new CustomEvent("NeedLogin"));
        } else {
            window.dispatchEvent(new CustomEvent("APIError", { "detail": e.description }));
        }
    },

    doGET: function(url) {
        return $.ajax({
            headers: {
                "Content-Type": "application/text;charset=UTF-8"
            },
            // url: url,
            url: "/pf1web" + url,
            crossDomain: true,
            type: "GET",
            dataType: 'json',
            contentType: "application/json"
        });
    },

    doAuthorizationGET: function(url) {
        var token = APILib.getCookie("authorization");
        APILib.updateToken(token);

        return $.ajax({
            headers: { 
                "Authorization": token },
            // url: url,
            url: "/pf1web" + url,
            crossDomain: true,
            type: "GET",
            dataType: 'json',
            contentType: "application/json"
        });
    },

    doPOST: function(url, data) {
        return $.ajax({
            // url: url,
            url: "/pf1web" + url,
            crossDomain: true,
            type: "POST",
            data: data,
            dataType: 'json',
            contentType: "application/x-www-form-urlencoded;charset=UTF-8"
        });
    },

    doAuthorizationPOST: function(url, data) {
        var token = APILib.getCookie("authorization");
        APILib.updateToken(token);
        data.authorization = token;

        return $.ajax({
            // url: url,
            url: "/pf1web" + url,
            crossDomain: true,
            type: "POST",
            data: data,
            dataType: 'json',
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            beforeSend: function(xhr) {
                xhr.withCredentials = true;
            }
        });
    },

    isLogin: function() {
        if (!APILib.getCookie("authorization") || APILib.getCookie("authorization") == 'undefined') {
            return false;
        } else {
            return true;
        }
    },

    setCookie: function(key, value, expireTime) {
        if (expireTime) {
            document.cookie = key + "=" + escape(value) + ";expires=" + expireTime.toGMTString() + ";path=/";
        } else {
            document.cookie = key + "=" + escape(value) + ";path=/";
        }
    },

    getCookie: function(k) { return unescape((document.cookie.match('(^|; )' + k + '=([^;]*)') || 0)[2]); },

    deleteCookie: function(key) {
        document.cookie = key + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
    },

    updateToken: function(token) {
        var now = new Date();
        var expireTime = now.getTime() + 1000 * 3600; // 1 hour
        now.setTime(expireTime);
        APILib.setCookie("authorization", token, now);
    },

    doLogin: function(accountId, passwordId) {
        var data = { uuid: uuid };
        data.id = $("#" + accountId).val();
        data.passWord = $("#" + passwordId).val();

        APILib.doPOST("/secure/activityLogin.do?method=apiLogin", data).done(function(result) {
            if (result.status == true) {
                APILib.updateToken(result.token);
                APILib.setCookie("accountName", result.accountName);
                APILib.setCookie("nickName", result.nickName);
                window.dispatchEvent(new CustomEvent("LoginChange"));
            } else {
                APILib.errorHandler(result);
            }
        }).fail(function(error) {
            APILib.errorHandler(error);
        });
    },

    doLogout: function(accountId, passwordId) {
        APILib.deleteCookie("authorization");
        APILib.deleteCookie("accountName");
        APILib.deleteCookie("nickName");
        window.dispatchEvent(new CustomEvent("LoginChange"));
    },

    queryLoginLog: function(startDate, endDate) {
        var id = APILib.getCookie("accountName");
        var data = { "start_date": startDate, "end_date": endDate, "id": id };
        APILib.doAuthorizationPOST("/secure/activityLogin.do?method=apiLoginDetailList", data).done(function(result) {
            if (result.status == true) {
                window.dispatchEvent(new CustomEvent("LoginLog", { "detail": result.loginTodalDailyList }));
            } else {
                APILib.errorHandler(result);
            }
        }).fail(function(error) {
            APILib.errorHandler(error);
        });
    },

    queryDepositAmount: function(startDate, endDate, accountId) {
        var accounts = APILib.getCookie("accountName");
        var data = { "start_date": startDate, "end_date": endDate, "accounts": accounts };
        APILib.doAuthorizationPOST("/secure/activity_api.do?method=getDepositTotal", data).done(function(result) {
            if (result.status == true) {
                window.dispatchEvent(new CustomEvent("DepositAmount", { "detail": result.apiDepositDetail }));
            } else {
                APILib.errorHandler(result);
            }
        }).fail(function(error) {
            APILib.errorHandler(error);
        });
    },

    queryBetAmount: function(startDate, endDate, accountId) {
        var accounts = APILib.getCookie("accountName");
        var data = { "start_date": startDate, "end_date": endDate, "id": accounts };
        APILib.doAuthorizationPOST("/secure/activity_api.do?method=getTotalBetAmount", data).done(function(result) {
            if (result.status == true) {
                window.dispatchEvent(new CustomEvent("BetAmount", { "detail": result.listTotalBetAmount }));
            } else {
                APILib.errorHandler(result);
            }
        }).fail(function(error) {
            APILib.errorHandler(error);
        });
    },

    queryWinAmount: function(startDate, endDate, accountId) {
        var accounts = APILib.getCookie("accountName");
        var data = { "start_date": startDate, "end_date": endDate, "id": accounts };
        APILib.doAuthorizationPOST("/secure/activity_api.do?method=getProfitTotal", data).done(function(result) {
            if (result.status == true) {
                window.dispatchEvent(new CustomEvent("WinAmount", { "detail": result.listTotalProfitAmount }));
            } else {
                APILib.errorHandler(result);
            }
        }).fail(function(error) {
            APILib.errorHandler(error);
        });
    },

    queryJoinLogPersonal: function(id, deviceType) {
        var accounts = APILib.getCookie("accountName");
        var data = { "infoId": id, "id": accounts, "deviceType": deviceType };
        APILib.doAuthorizationPOST("/secure/adsInfo.do?method=getAccountsRegistrationRecords", data).done(function(result) {
            window.dispatchEvent(new CustomEvent("JoinLog", { "detail": result.description }));
        }).fail(function(error) {
            APILib.errorHandler(error);
        });
    },

    doJoin: function(id, deviceType) {
        var accounts = APILib.getCookie("accountName");
        var data = { "infoId": id, "operationType": 1, "deviceType": deviceType };
        var vdata = { "infoId": id, "id": accounts, "deviceType": deviceType };
        APILib.doAuthorizationPOST("/secure/adsInfo.do?method=getAccountsRegistrationRecords", vdata).done(function(vresult) {
            if (!vresult.status) {
                APILib.doAuthorizationPOST("/secure/adsInfo.do?method=insertAdsClick", data).done(function(result) {
                    window.dispatchEvent(new CustomEvent("Join", { "detail": result.description }));
                }).fail(function(error) {
                    alert("JOIN ERROR!!");
                });
            } else {
                window.dispatchEvent(new CustomEvent("JoinLog", { "detail": vresult.description }));
            }
        }).fail(function(error) {
            APILib.errorHandler(error);
        });
    },

    // queryFrequency: function() {
    //     var id = APILib.getCookie("accountName");
    //     var data = { "id": id };
    //     APILib.doAuthorizationPOST("/secure/activity_api/frequency", data).done(function(result) {
    //         if (result.status == true) {
    //             window.dispatchEvent(new CustomEvent("Frequency", { "detail": result.description }));
    //         } else {
    //             APILib.errorHandler(result);
    //         }
    //     }).fail(function(error) {
    //         APILib.errorHandler(error);
    //     });
    // }

};