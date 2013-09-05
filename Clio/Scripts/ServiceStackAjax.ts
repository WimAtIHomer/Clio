/// <reference path="typings/jquery/jquery.d.ts" />

class RestClient {
    delete(url: string, ids: Int32Array, config: JQueryAjaxSettings) {
        config = config || {};
        config.type = "DELETE";
        config.data = JSON.stringify(ids);
        config.url = url;
        config.dataType = "json";
        config.contentType = "application/json; charset=utf-8";
        config.processData = false;
        return this.execute(config);
    }
    update(url: string, data, config: JQueryAjaxSettings) {
        config = config || {};
        config.type = "PUT";
        config.data = JSON.stringify(data);
        config.url = url;
        config.dataType = "json";
        config.contentType = "application/json; charset=utf-8";
        return this.execute(config);
    }
    get(url: string, data, config: JQueryAjaxSettings) {
        config = config || {};
        config.type = "GET";
        config.data = jQuery.param(data);
        config.url = url;
        config.dataType = "json";
        return this.execute(config);
    }
    insert(url: string, data, config: JQueryAjaxSettings) {
        config = config || {};
        config.type = "POST";
        config.data = JSON.stringify(data);
        config.url = url;
        config.processData = false;
        config.dataType = "json";
        config.contentType = "application/json; charset=utf-8";
        return this.execute(config);
    }

    private execute(config: JQueryAjaxSettings) {
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
            d.then(function (response: ServiceStackResponse) {
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
    }
}

class ServiceStackResponse {
    private _ref;
    response;
    success: boolean;
    statusCode: number;
    data;
    error;
    validationErrors;
    headers;
    config;

    constructor(response) {
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

    hasValidationError() {
        return this.validationErrors.length > 0;
    }

    isUnauthenticated() {
        return this.statusCode === 401;
    }

    isUnhandledError() {
        return !this.success && !this.isUnauthenticated();
    }
}
