/// <reference path="typings/jquery/jquery.d.ts" />
var RestClient = (function () {
    function RestClient() {
    }
    RestClient.prototype.delete = function (url, ids, config) {
        config = config || {};
        config.type = "DELETE";
        config.data = JSON.stringify(ids);
        config.url = url;
        config.dataType = "json";
        config.contentType = "application/json; charset=utf-8";
        config.processData = false;
        return this.execute(config);
    };
    RestClient.prototype.update = function (url, data, config) {
        config = config || {};
        config.type = "PUT";
        config.data = JSON.stringify(data);
        config.url = url;
        config.processData = false;
        config.dataType = "json";
        config.contentType = "application/json; charset=utf-8";
        return this.execute(config);
    };
    RestClient.prototype.get = function (url, data, config) {
        config = config || {};
        config.type = "GET";
        config.data = jQuery.param(data);
        config.url = url;
        config.dataType = "json";
        return this.execute(config);
    };
    RestClient.prototype.insert = function (url, data, config) {
        config = config || {};
        config.type = "POST";
        config.data = JSON.stringify(data);
        config.url = url;
        config.processData = false;
        config.dataType = "json";
        config.contentType = "application/json; charset=utf-8";
        return this.execute(config);
    };

    RestClient.prototype.execute = function (config) {
        var d, errorFn, me, promise, successFn, validationFn, unauthorizedFn;
        me = this;
        successFn = [];
        errorFn = [];
        validationFn = [];
        unauthorizedFn = [];
        d = jQuery.Deferred();
        promise = jQuery.ajax(config);
        promise.then(function (data, textStatus, jqXHR) {
            var result;
            result = new ServiceStackResponse(jqXHR);
            return d.resolve(result);
        }, function (jqXHR, textStatus, errorThrown) {
            var result;
            result = new ServiceStackResponse(jqXHR);
            return d.resolve(result);
        });
        d.promise.success = function (fn) {
            successFn.push(fn);
            d.then(function (response) {
                if (response.success) {
                    return fn(response, response.headers, response.config);
                }
            });
            return d.promise;
        };
        d.promise.error = function (fn) {
            errorFn.push(fn);
            d.then(function (response) {
                if (response.isUnhandledError() && !response.hasValidationError()) {
                    return fn(response, response.headers, response.config);
                }
            });
            return d.promise;
        };
        d.promise.validation = function (fn) {
            validationFn.push(fn);
            d.then(function (response) {
                if (response.isUnhandledError() && response.hasValidationError()) {
                    return fn(response, response.headers, response.config);
                }
            });
            return d.promise;
        };
        d.promise.unauthorized = function (fn) {
            unauthorizedFn.push(fn);
            d.then(function (response) {
                if (response.isUnauthenticated()) {
                    return fn(response, response.headers, response.config);
                }
            });
            return d.promise;
        };
        return d.promise;
    };
    return RestClient;
})();

var ServiceStackResponse = (function () {
    function ServiceStackResponse(response) {
        this.success = (200 <= response.status) && (response.status < 300);
        this.statusCode = response.status;
        this.data = response.responseJSON;
        this.validationErrors = [];
        if (!this.success) {
            this.error = (this.data != null ? this.data.responseStatus : null);
            if (this.error == null) {
                this.error = {
                    errorCode: this.statusCode,
                    message: response.responseText
                };
            }
        }
        if (!this.success && (this.error != null ? (this.error.errors != null ? this.error.errors.length : 0) : 0) > 0) {
            this.validationErrors = this.error.errors;
        }
    }
    ServiceStackResponse.prototype.hasValidationError = function () {
        return this.validationErrors.length > 0;
    };

    ServiceStackResponse.prototype.isUnauthenticated = function () {
        return this.statusCode === 401;
    };

    ServiceStackResponse.prototype.isUnhandledError = function () {
        return !this.success && !this.isUnauthenticated();
    };
    return ServiceStackResponse;
})();
//# sourceMappingURL=ServiceStackAjax.js.map
