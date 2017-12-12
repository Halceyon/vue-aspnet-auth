/*!
 * vue-aspnet-auth v1.0.3
 * Copyright Code HQ (Pty) Ltd.
 */

'use strict';

function createCookie(name, value, seconds) {
    var expires;

    if (seconds) {
        var date = new Date();
        date.setTime(date.getTime() + (seconds * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = encodeURIComponent(name) + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === " ") { c = c.substring(1, c.length); }
        if (c.indexOf(nameEQ) === 0) { return decodeURIComponent(c.substring(nameEQ.length, c.length)); }
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}

function saveAuth(result) {
    createCookie("aspnetAuthToken", result.access_token);
    createCookie("apnetAuth", JSON.stringify(result));
}

var aspnetAuth = {
    authentication: null,
    user: {},
    url: "",
    register: function (username, password, confirmPassword, cb) {
        console.log(this);
        $.ajax({
            method: "POST",
            url: this.url + "/api/account/register",
            data: {
                Username: username,
                Password: password,
                ConfirmPassword: confirmPassword
            },
            error: function (jqXhr) {
                if (jqXhr.status === 500) {
                    cb({
                        result: false,
                        message: "Server error, please try again later."
                    });
                } else {
                    var msg = "";
                    var errors = [];
                    for (var propertyName in jqXhr.responseJSON.ModelState) {
                        jqXhr.responseJSON.ModelState[propertyName].forEach(function (err) {
                            errors.push(err);
                        });
                    }
                    cb({
                        result: false,
                        message: msg,
                        errors: errors
                    });
                }
            },
            success: function (result) {
                cb({
                    result: true,
                    message: result
                });
            }
        });
    },
    forgot: function (email, cb) {
        $.ajax({
            url: this.url + "/api/account/forgotpassword",
            method: "POST",
            data: {
                email: email
            },
            success: function (result) {
                cb({
                    result: true,
                    message: "Password reset email sent successfully"
                });
            },
            error: function (result) {
                cb({
                    result: false,
                    message: "Error requesting password reset"
                });
            }
        });
    },
    login: function (username, password, cb) {
        $.ajax({
            url: this.url + "/token",
            method: "POST",
            data: {
                username: username,
                password: password,
                grant_type: "password",
                client_id: "jsApp"
            },
            success: function (result) {
                saveAuth(result);
                fillAuth();
                cb({
                    result: true,
                    message: "User logged in successfully"
                });
            },
            error: function (result) {
                cb({
                    result: false,
                    message: result.responseJSON.error_description
                });
            }
        });
    },
    loginExternal: function (tokenRequest, cb) {
        $.get(this.url + "/api/account/ObtainLocalAccessToken",
            tokenRequest,
            function (result) {
                saveAuth(result);
                fillAuth();
                cb({
                    result: "success",
                    message: "User logged in successfully"
                });
            });
    },
    logout: function (cb) {
        eraseCookie("aspnetAuthToken");
        eraseCookie("apnetAuth");
        cb({
            result: "success",
            message: "User logged out successfully"
        });
    },
    refreshToken: function (cb) {
        var data = {
            grant_type: "refresh_token",
            refresh_token: this.authentication.refresh_token,
            client_id: "jsApp"
        };
        $.ajax({
            url: this.url + "/token",
            method: "POST",
            data: {
                grant_type: "refresh_token",
                refresh_token: this.authentication.refresh_token,
                client_id: "jsApp"
            },
            success: function (result) {
                saveAuth(result);
                fillAuth();
                cb({
                    result: "success",
                    message: "Token refreshed"
                });
            },
            error: function (result) {
                cb({
                    result: "failed",
                    message: result.responseJSON.error_description
                });
            }
        });
    },
    fillAuth: function () {
        fillAuth();
    },
    web: {
        get: function (url, cb) {
            $.ajax({
                url: aspnetAuth.url + url,
                headers: {
                    'Authorization': 'Bearer ' + readCookie("aspnetAuthToken")
                },
                method: "GET",
                success: function (result) {
                    cb(result);
                },
                error: function (result) {
                    cb(result);
                }
            });
        }
    }
};

function fillAuth() {
    aspnetAuth.authentication = JSON.parse(readCookie("apnetAuth"));
}

fillAuth();

module.exports = aspnetAuth;
