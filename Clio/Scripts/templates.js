/// <reference path="typings/ractive/ractive.d.ts" />
/// <reference path="typings/jquery/jquery.d.ts" />
var MyTemplates = (function () {
    function MyTemplates() {
    }
    MyTemplates.parsed = {};
    MyTemplates.checkTemplate = function (template, callback, data) {
        if (typeof MyTemplates.parsed[template] != "undefined") {
            callback(MyTemplates.parsed[template], data);
        } else {
            $.get("/Templates/" + template + ".html", null, function (responseText) {
                MyTemplates.parsed[template] = Ractive.parse(responseText);
                callback(MyTemplates.parsed[template], data);
            });
        }
    };

    MyTemplates.Error = function (callback, message) {
        this.checkTemplate('Error', callback, message);
    };

    MyTemplates.ProjectList = function (callback) {
        this.checkTemplate('ProjectList', callback);
    };
    MyTemplates.ProjectAdd = function (callback) {
        this.checkTemplate('ProjectAdd', callback);
    };
    MyTemplates.ProjectEdit = function (callback, project) {
        this.checkTemplate('ProjectAdd', callback, project);
    };

    MyTemplates.TagList = function (callback) {
        this.checkTemplate('TagList', callback);
    };
    MyTemplates.TagAdd = function (callback) {
        this.checkTemplate('TagAdd', callback);
    };
    MyTemplates.TagEdit = function (callback, tag) {
        this.checkTemplate('TagAdd', callback, tag);
    };

    MyTemplates.ToolList = function (callback) {
        this.checkTemplate('ToolList', callback);
    };
    MyTemplates.ToolAdd = function (callback) {
        this.checkTemplate('ToolAdd', callback);
    };
    MyTemplates.ToolEdit = function (callback, tool) {
        this.checkTemplate('ToolAdd', callback, tool);
    };

    MyTemplates.TechnologyList = function (callback) {
        this.checkTemplate('TechnologyList', callback);
    };
    MyTemplates.TechnologyAdd = function (callback) {
        this.checkTemplate('TechnologyAdd', callback);
    };
    MyTemplates.TechnologyEdit = function (callback, technology) {
        this.checkTemplate('TechnologyAdd', callback, technology);
    };

    MyTemplates.ReviewList = function (callback) {
        this.checkTemplate('ReviewList', callback);
    };

    MyTemplates.TechnologyReviewAdd = function (callback, technology) {
        this.checkTemplate('TechnologyReviewAdd', callback, technology);
    };
    MyTemplates.TechnologyReviewEdit = function (callback, technologyreview) {
        this.checkTemplate('TechnologyReviewAdd', callback, technologyreview);
    };

    MyTemplates.ToolReviewAdd = function (callback, tool) {
        this.checkTemplate('ToolReviewAdd', callback, tool);
    };
    MyTemplates.ToolReviewEdit = function (callback, toolreview) {
        this.checkTemplate('ToolReviewAdd', callback, toolreview);
    };

    MyTemplates.UserList = function (callback) {
        this.checkTemplate('UserList', callback);
    };
    MyTemplates.UserAdd = function (callback) {
        this.checkTemplate('UserAdd', callback);
    };
    MyTemplates.UserEdit = function (callback, user) {
        this.checkTemplate('UserAdd', callback, user);
    };

    MyTemplates.CurrentUser = function (callback) {
        this.checkTemplate('CurrentUser', callback);
    };
    return MyTemplates;
})();
//# sourceMappingURL=templates.js.map
