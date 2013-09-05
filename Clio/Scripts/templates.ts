/// <reference path="typings/ractive/ractive.d.ts" />
/// <reference path="typings/jquery/jquery.d.ts" />

class MyTemplates {
	static parsed = {}
    static checkTemplate = function (template, callback, data) {
        if (typeof MyTemplates.parsed[template] != "undefined") {
            callback(MyTemplates.parsed[template], data);
        } else {
            $.get("/Templates/" + template + ".html", null, function (responseText) {
                MyTemplates.parsed[template] = Ractive.parse(responseText);
                callback(MyTemplates.parsed[template], data);
            });
        }
    };

    static Error = function (callback, message) { this.checkTemplate('Error', callback, message); };

    static ProjectList = function (callback) { this.checkTemplate('ProjectList', callback); };
    static ProjectAdd = function (callback) { this.checkTemplate('ProjectAdd', callback); };
    static ProjectEdit = function (callback, project) { this.checkTemplate('ProjectAdd', callback, project); };

    static TagList = function (callback) { this.checkTemplate('TagList', callback); };
    static TagAdd = function (callback) { this.checkTemplate('TagAdd', callback); };
    static TagEdit = function (callback, tag) { this.checkTemplate('TagAdd', callback, tag); };

    static ToolList = function (callback) { this.checkTemplate('ToolList', callback); };
    static ToolAdd = function (callback) { this.checkTemplate('ToolAdd', callback); };
    static ToolEdit = function (callback, tool) { this.checkTemplate('ToolAdd', callback, tool); };

    static TechnologyList = function (callback) { this.checkTemplate('TechnologyList', callback); };
    static TechnologyAdd = function (callback) { this.checkTemplate('TechnologyAdd', callback); };
    static TechnologyEdit = function (callback, technology) { this.checkTemplate('TechnologyAdd', callback, technology); };

    static ReviewList = function (callback) { this.checkTemplate('ReviewList', callback); };

    static TechnologyReviewAdd = function (callback, technology) { this.checkTemplate('TechnologyReviewAdd', callback, technology); };
    static TechnologyReviewEdit = function (callback, technologyreview) { this.checkTemplate('TechnologyReviewAdd', callback, technologyreview); };

    static ToolReviewAdd = function (callback, tool) { this.checkTemplate('ToolReviewAdd', callback, tool); };
    static ToolReviewEdit = function (callback, toolreview) { this.checkTemplate('ToolReviewAdd', callback, toolreview); };

    static UserList = function (callback) { this.checkTemplate('UserList', callback); };
    static UserAdd = function (callback) { this.checkTemplate('UserAdd', callback); };
    static UserEdit = function (callback, user) { this.checkTemplate('UserAdd', callback, user); };

    static CurrentUser = function (callback) { this.checkTemplate('CurrentUser', callback); };
}
