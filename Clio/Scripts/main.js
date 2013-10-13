
$(document).ready(function () {
    var restClient = new RestClient();
    restClient.get(path + "currentuser", {}, null).
        success(function (response, headers, config) {
            // do what you do
            Clio.CurrentUser.user = response.data;
            LoadData();
            Clio.Server.Connect();
            Clio.Ping.Polling();
        }).
        error(function (response, headers, config) {
            Clio.Error.show(response.error.errorCode + ": " + response.error.message);
        }).
        validation(function (response, headers, config) {
            Clio.Error.show(response.validationErrors);
        }).
        unauthorized(function (response, headers, config) {
            document.location.assign(path + 'auth/googleopenid');
        });
});

function LoadData() {
    MyTemplates.CurrentUser(function (template) {
        var ractive = new Ractive({
            el: 'currentUser',
            template: template,
            noIntro: true, // disable transitions during initial render
            data: {
                currentuser: Clio.CurrentUser.user,
                format: function (date) {
                    return moment(date).format("DD-MM-YYYY");
                }
            }
        });
    });

    MyTemplates.TagList(function(tagList) { Clio.Tag.list(tagList); });
    MyTemplates.ProjectList(function(projectList) { Clio.Project.list(projectList); });
    MyTemplates.TechnologyList(function(technologyList) { Clio.Technology.list(technologyList); });
    MyTemplates.ToolList(function(toolList) { Clio.Tool.list(toolList); });
    MyTemplates.UserList(function(userList) { Clio.User.list(userList); });
    MyTemplates.ReviewList(function (reviewList) { Clio.Review.list(reviewList); });
}
