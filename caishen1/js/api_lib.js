/**
 * API Library Class
 */
if ( typeof(window.CustomEvent) !== "function" ) {
	function CustomEvent ( event, params ) {
		params = params || { bubbles: false, cancelable: false, detail: undefined };
		let evt = document.createEvent( 'CustomEvent' );
		evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
		return evt;
	}

	CustomEvent.prototype = window.Event.prototype;

	window.CustomEvent = CustomEvent;
}

var APILib = {
	
	platformUrl : "",
	
	errorHandler : function(e) {
		if (401 === e.status) {
			APILib.deleteCookie("token");
			window.dispatchEvent(new CustomEvent("NeedLogin"));
		} else {
			window.dispatchEvent(new CustomEvent("APIError", {"detail" : e.responseJSON.errorCode}));
		}
	},
	
	doGET : function (url) {
		return $.ajax({
			headers: {
				"Content-Type" : "application/text;charset=UTF-8"
			},
			url: url,
			type: "GET",
			dataType: 'json',
			contentType: "application/json"
		});
	},
	
	doAuthorizationGET : function (url) {
		var token = APILib.getCookie("token");
		APILib.updateToken(token);
		
		return $.ajax({
			headers: {"Authorization" : token},
			url: url,
			type: "GET",
			dataType: 'json',
			contentType: "application/json"
		});
	},
	
	doPOST : function (url, data) {
		return $.ajax({
			url: url,
			type: "POST",
			data: JSON.stringify(data),
			dataType: 'json',
			contentType: "application/json"
		});
	},
	
	doAuthorizationPOST : function (url, data) {
		var token = APILib.getCookie("token");
		APILib.updateToken(token);
		
		return $.ajax({
			headers: {
				"Authorization" : token
			},
			url: url,
			type: "POST",
			data: JSON.stringify(data),
			dataType: 'json',
			contentType: "application/json",
			beforeSend:function(xhr){
				xhr.withCredentials = true;
			}
		});
	},
	
	isLogin : function () {
		if ("undefined" === typeof APILib.getCookie("token")) {
			return false;
		} else {
			return true;
		}
	},
	
	setCookie : function (key, value, expireTime) {
		if (expireTime) {
			document.cookie = key + "=" + value + ";expires=" + expireTime.toGMTString() + ";path=/";
		} else {
			document.cookie = key + "=" + value + ";path=/";
		}
	},
	
	getCookie : function (k) { return (document.cookie.match('(^|; )'+k+'=([^;]*)')||0)[2]; },
	
	deleteCookie : function (key) {
		document.cookie = key + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
	},
	
	updateToken : function (token) {
		var now = new Date();
		var expireTime = now.getTime() + 1000*3600; // 1 hour
		now.setTime(expireTime);
		APILib.setCookie("token", token, now);
	},
	
	doLogin : function (accountId, passwordId) {
		var data = {};
		data.customerName = $("#"+accountId).val();
		data.password = $("#"+passwordId).val();
		
		APILib.doPOST("/cws/outsideLink/session", data).done(function(result){
			APILib.updateToken(result.value.token);
			APILib.setCookie("nickName", result.value.nickName);
			window.dispatchEvent(new CustomEvent("LoginChange"));
		}).fail(function(error){
			APILib.errorHandler(error);
		});
	},
	
	doLogout : function (accountId, passwordId) {
		APILib.deleteCookie("token");
		window.dispatchEvent(new CustomEvent("LoginChange"));
	},
	
	queryID : function () {
		APILib.doGET("/cws/outsideLink/id").done(function(result){
			window.dispatchEvent(new CustomEvent("ID", {"detail": result.value}));
		}).fail(function(error){
			APILib.errorHandler(error);
		});
	},
	
	queryLoginLog : function (startDate, endDate) {
		var data = {"startDate": startDate, "endDate": endDate};
		APILib.doAuthorizationPOST("/cws/outsideLink/loginLog", data).done(function(result){
			window.dispatchEvent(new CustomEvent("LoginLog", {"detail": result.value}));
		}).fail(function(error){
			APILib.errorHandler(error);
		});
	},
	
	doJoin : function (id, deviceType) {
		APILib.doAuthorizationGET("/cws/outsideLink/join/" + id + "/" + deviceType).done(function(result){
			window.dispatchEvent(new CustomEvent("Join"));
		}).fail(function(error){
			APILib.errorHandler(error);
		});
	},
	
	queryJoinLogPersonal : function (id) {
		var data = {"id": id};
		APILib.doAuthorizationPOST("/cws/outsideLink/participate/1", data).done(function(result){
			window.dispatchEvent(new CustomEvent("JoinLog", {"detail": result.value}));
		}).fail(function(error){
			APILib.errorHandler(error);
		});
	},
	
	queryJoinLogAll : function (id, startDate, endDate, pageIndex) {
		var data = {"id": id, "startDate": startDate, "endDate": endDate};
		APILib.doPOST("/cws/outsideLink/participate/" + pageIndex, data).done(function(result){
			window.dispatchEvent(new CustomEvent("JoinLog", {"detail": result.value}));
		}).fail(function(error){
			APILib.errorHandler(error);
		});
	},
	
	queryDepositAmount : function (startDate, endDate) {
		var data = {"startDate": startDate, "endDate": endDate};
		APILib.doAuthorizationPOST("/cws/outsideLink/depositAmount", data).done(function(result){
			window.dispatchEvent(new CustomEvent("DepositAmount", {"detail": result.value}));
		}).fail(function(error){
			APILib.errorHandler(error);
		});
	},
	
	queryBetAmount : function (startDate, endDate) {
		var data = {"startDate": startDate, "endDate": endDate};
		APILib.doAuthorizationPOST("/cws/outsideLink/betAmount", data).done(function(result){
			window.dispatchEvent(new CustomEvent("BetAmount", {"detail": result.value}));
		}).fail(function(error){
			APILib.errorHandler(error);
		});
	},
	
	queryWinAmount : function (startDate, endDate) {
		var data = {"startDate": startDate, "endDate": endDate};
		APILib.doAuthorizationPOST("/cws/outsideLink/winAmount", data).done(function(result){
			window.dispatchEvent(new CustomEvent("WinAmount", {"detail": result.value}));
		}).fail(function(error){
			APILib.errorHandler(error);
		});
	},
	
	queryBetMultiple : function (startDate, endDate) {
		var data = {"startDate": startDate, "endDate": endDate};
		APILib.doAuthorizationPOST("/cws/outsideLink/betMultiple", data).done(function(result){
			window.dispatchEvent(new CustomEvent("BetMultiple", {"detail": result.value}));
		}).fail(function(error){
			APILib.errorHandler(error);
		});
	},
	
	queryJackpot : function (startDate, endDate) {
		var data = {"startDate": startDate, "endDate": endDate};
		APILib.doPOST("/cws/outsideLink/jackpot", data).done(function(result){
			window.dispatchEvent(new CustomEvent("Jackpot", {"detail": result.value}));
		}).fail(function(error){
			APILib.errorHandler(error);
		});
	},
	
};