/// <reference path="typings/underscore/underscore.d.ts" />
/// <reference path="typings/moment/moment.d.ts" />
/// <reference path="templates.ts" />
/// <reference path="typings/bootstrap/bootstrap.d.ts" />
/// <reference path="typings/showdown/showdown.d.ts" />
/// <reference path="ServiceStackAjax.ts" />
/// <reference path="typings/chosen/chosen.jquery.d.ts" />
/// <reference path="typings/bootstrap.datepicker/bootstrap.datepicker.d.ts" />
/// <reference path="typings/bootstrap.paginator/bootstrap.paginator.d.ts" />
/// <reference path="typings/md5/md5.d.ts" />
/// <reference path="typings/signalr/signalr.d.ts" />

interface iReview {
    type: string;
    userId: number;
    toolId: number;
    technologyId: number;
    projectId: number;
}
interface iUser {
    id: number;
    name: string;
    email: string;
}
interface iProject {
    id: number;
    name: string;
    customer: string;
}
interface iFilter {
    field: string;
    id: number;
    name: string;
}
interface iTool {
    id: number;
    name: string;
}
interface iTechnology {
    id: number;
    name: string;
}

module Clio {

    export class Server {
        static ClioHub = $.connection.clioHub;
        static Connect = function () {
            $.connection.hub.start().done(function () {
                Server.ClioHub.server.login(CurrentUser.user.name);
            });
            Server.ClioHub.client.login = function (user) {
                $('#message').text(user + " login");
            }
            Server.ClioHub.client.addUser = function (user, user2) {
                $('#message').text(user.name + " added " + user2.name + ' user');
                if (user.id != CurrentUser.user.id) {
                    User.All.push(user2);
                }
            }
            Server.ClioHub.client.editUser = function (user, user2) {
                $('#message').text(user.name + " edited " + user2.name + ' user');
                if (user.id != CurrentUser.user.id) {
                    $.each(User.All, function (index, item) {
                        if (item.id == user2.id) {
                            User.All[index] = user2;
                        }
                    });
                }
            }
            Server.ClioHub.client.addProject = function (user, project) {
                $('#message').text(user.name + " added " + project.name + ' project');
                if (user.id != CurrentUser.user.id) {
                    Project.All.push(project);
                }
            }
            Server.ClioHub.client.editProject = function (user, project) {
                $('#message').text(user.name + " edited " + project.name + ' project');
                if (user.id != CurrentUser.user.id) {
                    $.each(Project.All, function (index, item) {
                        if (item.id == project.id) {
                            Tag.All[index] = project;
                        }
                    });
                }
            }
            Server.ClioHub.client.addTechnology = function (user, technology) {
                $('#message').text(user.name + " added " + technology.name + ' technology');
                if (user.id != CurrentUser.user.id) {
                    Technology.All.push(technology);
                }
            }
            Server.ClioHub.client.editTechnology = function (user, technology) {
                $('#message').text(user.name + " edited " + technology.name + ' technology');
                if (user.id != CurrentUser.user.id) {
                    $.each(Technology.All, function (index, item) {
                        if (item.id == technology.id) {
                            Tag.All[index] = technology;
                        }
                    });
                }
            }
            Server.ClioHub.client.addTool = function (user, tool) {
                $('#message').text(user.name + " added " + tool.name + ' tool');
                if (user.id != CurrentUser.user.id) {
                    Tool.All.push(tool);
                }
            }
            Server.ClioHub.client.editTool = function (user, tool) {
                $('#message').text(user.name + " edited " + tool.name + ' tool');
                if (user.id != CurrentUser.user.id) {
                    $.each(Tool.All, function (index, item) {
                        if (item.id == tool.id) {
                            Tag.All[index] = tool;
                        }
                    });
                }
            }
            Server.ClioHub.client.addTag = function (user, tag) {
                $('#message').text(user.name + " added " + tag.name + ' tag');
                if (user.id != CurrentUser.user.id) {
                    Tag.All.push(tag);
                }
            }
            Server.ClioHub.client.editTag = function (user, tag) {
                $('#message').text(user.name + " edited " + tag.name + ' tag');
                if (user.id != CurrentUser.user.id) {
                    $.each(Tag.All, function (index, item) {
                        if (item.id == tag.id) {
                            Tag.All[index] = tag;
                        }
                    });
                }
            }
            Server.ClioHub.client.addReview = function (user, review) {
                $('#message').text(user.name + " added " + review.name + ' review');
                if (user.id != CurrentUser.user.id) {
                    Review.All.push(review);
                }
            }
            Server.ClioHub.client.editReview = function (user, review) {
                $('#message').text(user.name + " edited " + review.name + ' review');
                if (user.id != CurrentUser.user.id) {
                    $.each(Tag.All, function (index, item) {
                        if (item.id == review.id && item.type == review.type) {
                            Review.All[index] = review;
                        }
                    });
                }
            }
        }
    }

    export class CurrentUser {
        static user: iUser;
    }

    export class Error {
        static lastModal: string;
        static show = function (message) {

            var callback = function (template, message) {
                var ractive = new Ractive({
                    el: 'error',
                    template: template,
                    noIntro: true,
                    data: {
                        message: message
                    }
                });
            };

            MyTemplates.Error(callback, message);
        }
        
        static showModal = function (message) {

            var callback = function (template, message) {
                var ractive = new Ractive({
                    el: Error.lastModal,
                    template: template,
                    noIntro: true,
                    data: {
                        message: message
                    }
                });
            };

            MyTemplates.Error(callback, message);
        }
    }

    export class Tag {
        static All: Array;
        static CurrentPage = 1;
        static RactiveList;

        static list = function (taglist) {
            var restClient = new RestClient();
            restClient.get("/tag", {}, { cache: false }).
                success(function (response, headers, config) {
                    // do what you do
                    Tag.All = response.data;
                    Tag.RactiveList.set('tags', Tag.All.slice(0, 10), function () {
                        $('#tags a').tooltip({}); 
                        $('#tagPager').bootstrapPaginator({
                            currentPage: 1,
                            totalPages: Math.ceil(Tag.All.length / 10),
                            size: "mini",
                            onPageChanged: function (event, oldPage, newPage) {
                                Tag.CurrentPage = newPage;
                                var start = (newPage - 1) * 10; 
                                Tag.RactiveList.set('tags', Tag.All.slice(start, start + 10));
                            }
                        });
                    });
                }).
                error(function (response, headers, config) {
                    Error.show(response.error.errorCode + ": " + response.error.message);
                }).
                validation(function (response, headers, config) {
                    Error.show(response.validationErrors);
                });

            Tag.RactiveList = new Ractive({
                el: 'tags',
                template: taglist,
                noIntro: true, // disable transitions during initial render
                data: {
                    tags: []
                }
            });

            Tag.RactiveList.on("add", function (event) {
                MyTemplates.TagAdd(Tag.add);
                Error.lastModal = 'tagErrorModal';
            });
            Tag.RactiveList.on("edit", function (event) {
                MyTemplates.TagEdit(Tag.edit, Tag.All[parseInt(event.node.getAttribute('data-index')) + (Tag.CurrentPage - 1)*10]);
                Error.lastModal = 'tagErrorModal';
            });
        };

        static edit = function (addForm, data) {

            var tag = data;

            var ractive = new Ractive({
                el: 'tagModal',
                template: addForm,
                noIntro: true, // disable transitions during initial render
                data: tag
            });

            ractive.on('post', function (event) {
                // stop the page reloading
                event.original.preventDefault();

                tag.name = event.context.name;
                tag.description = event.context.description;

                var restClient = new RestClient();
                restClient.update("/tag", tag, null).
                    success(function (response, headers, config) {
                        var start = (Tag.CurrentPage - 1) * 10;
                        Tag.RactiveList.set('tags', Tag.All.slice(start, start + 10));
                        $('#tags a').tooltip({});
                        $('#tagModal').modal('toggle');
                    }).
                    error(function (response, headers, config) {
                        Error.showModal(response.error.errorCode + ": " + response.error.message);
                    }).
                    validation(function (response, headers, config) {
                        Error.showModal(response.validationErrors);
                    });
            });
        };

        static add = function (addForm) {

            var tag: any = { id: 0 }

            var ractive = new Ractive({
                el: 'tagModal',
                template: addForm,
                noIntro: true, // disable transitions during initial render
                data: tag
            });

            ractive.on('post', function (event) {
                // stop the page reloading
                event.original.preventDefault();

                tag.name = event.context.name;
                tag.description = event.context.description;

                var restClient = new RestClient();
                restClient.insert("/tag", tag, null).
                    success(function (response, headers, config) {
                        Tag.All.push(response.data);
                        if (Tag.All.length % 10 == 1) {
                            $('#tagPager').bootstrapPaginator({ totalPages: Math.ceil(Tag.All.length / 10) });
                        }
                        var start = (Tag.CurrentPage - 1) * 10;
                        Tag.RactiveList.set('tags', Tag.All.slice(start, start + 10));
                        $('#tags a').tooltip({});
                        $('#tagModal').modal('toggle');
                    }).
                    error(function (response, headers, config) {
                        Error.showModal(response.error.errorCode + ": " + response.error.message);
                    }).
                    validation(function (response, headers, config) {
                        Error.showModal(response.validationErrors);
                    });
            });
        };
    }

    export class Project {
        static All: Array<iProject>;
        static RactiveList;
        static CurrentPage = 1;

        static list = function(projectlist) {
            var restClient = new RestClient();
            restClient.get("/project", {}, { cache: false }).
                success(function (response, headers, config) {
                    // do what you do
                    Project.All = response.data;
                    Project.RactiveList.set('projects', Project.All.slice(0, 10), function () {
                        $('#projects a').tooltip({});
                        $('#projectPager').bootstrapPaginator({
                            currentPage: 1,
                            totalPages: Math.ceil(Project.All.length / 10),
                            size: "mini",
                            onPageChanged: function (event, oldPage, newPage) {
                                Project.CurrentPage = newPage;
                                var start = (newPage - 1) * 10;
                                Project.RactiveList.set('projects', Project.All.slice(start, start + 10));
                            }
                        });
                    });
                }).
                error(function (response, headers, config) {
                    Error.show(response.error.errorCode + ": " + response.error.message);
                }).
                validation(function (response, headers, config) {
                    Error.show(response.validationErrors);
                });

            Project.RactiveList = new Ractive({
                el: 'projects',
                template: projectlist,
                noIntro: true, // disable transitions during initial render
                data: {
                    projects: [],
                    format: function (date) {
                        return moment(date).format("DD-MM-YYYY");
                    }
                }
            });

            Project.RactiveList.on("add", function (event) {
                MyTemplates.ProjectAdd(Project.add);
                Error.lastModal = 'projectErrorModal';
            });
            Project.RactiveList.on("edit", function (event) {
                MyTemplates.ProjectEdit(Project.edit, Project.All[parseInt(event.node.getAttribute('data-index')) + (Project.CurrentPage - 1) * 10]);
                Error.lastModal = 'projectErrorModal';
            });
            Project.RactiveList.on("filter", function (event) {
                Review.filter({
                    field: "projectId",
                    id: Project.All[parseInt(event.node.getAttribute('data-index')) + (Project.CurrentPage - 1) * 10].id,
                    name: Project.All[parseInt(event.node.getAttribute('data-index')) + (Project.CurrentPage - 1) * 10].name
                });
            });
        };

        static edit = function (addForm, data) {

            var project = data;
            project.format = function (date) {
                return moment(date).format("DD-MM-YYYY");
            };

            var ractive = new Ractive({
                el: 'projectModal',
                template: addForm,
                noIntro: true, // disable transitions during initial render
                data: project
            });
            $('.datepicker').datepicker();

            ractive.on('post', function (event) {
                // stop the page reloading
                event.original.preventDefault();

                project.name = event.context.name;
                project.customer = event.context.customer;
                project.startDate = moment($('#inputProjectStartDate').val(), "DD-MM-YYYY").toDate();
                project.description = event.context.description;

                var restClient = new RestClient();
                restClient.update("/project", project, null).
                    success(function (response, headers, config) {
                        var start = (Project.CurrentPage - 1) * 10;
                        Project.RactiveList.set('projects', Project.All.slice(start, start + 10));
                        $('#projects a').tooltip({});
                        $('#projectModal').modal('toggle');
                    }).
                    error(function (response, headers, config) {
                        Error.showModal(response.error.errorCode + ": " + response.error.message);
                    }).
                    validation(function (response, headers, config) {
                        Error.showModal(response.validationErrors);
                    });
            });
        };

        static add = function (addForm) {

            var project : any = {
                id: 0,
                startDate: new Date(),
                format: function (date) {
                    return moment(date).format("DD-MM-YYYY");
                }
            }

            var ractive = new Ractive({
                el: 'projectModal',
                template: addForm,
                noIntro: true, // disable transitions during initial render
                data: project
            });
            $('.datepicker').datepicker();

            ractive.on('post', function (event) {
                // stop the page reloading
                event.original.preventDefault();

                project.name = event.context.name;
                project.customer = event.context.customer;
                project.startDate = moment($('#inputProjectStartDate').val(), "DD-MM-YYYY").toDate();
                project.description = event.context.description;

                var restClient = new RestClient();
                restClient.insert("/project", project, null).
                    success(function (response, headers, config) {
                        Project.All.push(response.data);
                        if (Project.All.length % 10 == 1) {
                           $('#projectPager').bootstrapPaginator({ totalPages: Math.ceil(Project.All.length / 10) });
                        }
                        var start = (Project.CurrentPage - 1) * 10;
                        Project.RactiveList.set('projects', Project.All.slice(start, start + 10));
                        $('#projects a').tooltip({});
                        $('#projectModal').modal('toggle');
                    }).
                    error(function (response, headers, config) {
                        Error.showModal(response.error.errorCode + ": " + response.error.message);
                    }).
                    validation(function (response, headers, config) {
                        Error.showModal(response.validationErrors);
                    });
            });
        };
    }

    export class Technology {
        static All: Array<iTechnology>;
        static Languages: Array;
        static RactiveList;
        static CurrentPage = 1;

        static list = function (technologylist) {
            var restClient = new RestClient();
            restClient.get("/technology", {}, { cache: false }).
                success(function (response, headers, config) {
                    // do what you do
                    Technology.All = response.data;
                    Technology.RactiveList.set('technologies', Technology.All.slice(0, 10), function () {
                        $('#technologies a').tooltip({});
                        $('#technologyPager').bootstrapPaginator({
                            currentPage: 1,
                            totalPages: Math.ceil(Technology.All.length / 10),
                            size: "mini",
                            onPageChanged: function (event, oldPage, newPage) {
                                Technology.CurrentPage = newPage;
                                var start = (newPage - 1) * 10;
                                Technology.RactiveList.set('technologies', Technology.All.slice(start, start + 10));
                            }
                        });
                    });
                }).
                error(function (response, headers, config) {
                    Error.show(response.error.errorCode + ": " + response.error.message);
                }).
                validation(function (response, headers, config) {
                    Error.show(response.validationErrors);
                });

            restClient.get("/language", {}, { cache: false }).
                success(function (response, headers, config) {
                    // do what you do
                    Technology.Languages = response.data;
                    Technology.RactiveList.set('languages', Technology.Languages);
                }).
                error(function (response, headers, config) {
                    Error.show(response.error.errorCode + ": " + response.error.message);
                }).
                validation(function (response, headers, config) {
                    Error.show(response.validationErrors);
                });

            Technology.RactiveList = new Ractive({
                el: 'technologies',
                template: technologylist,
                noIntro: true, // disable transitions during initial render
                data: {
                    technologies: [],
                    languages: [],
                    format: function (date) {
                        return moment(date).format("DD-MM-YYYY");
                    },
                    isLanguage: function (id1, id2) {
                        return id1 == id2;
                    }
                }
            });

            Technology.RactiveList.on("add", function (event) {
                MyTemplates.TechnologyAdd(Technology.add);
                Error.lastModal = 'technologyErrorModal';
            });
            Technology.RactiveList.on("edit", function (event) {
                MyTemplates.TechnologyEdit(Technology.edit, Technology.All[parseInt(event.node.getAttribute('data-index')) + (Technology.CurrentPage - 1) * 10]);
                Error.lastModal = 'technologyErrorModal';
            });
            Technology.RactiveList.on("review", function (event) {
                MyTemplates.TechnologyReviewAdd(TechnologyReview.add, Technology.All[parseInt(event.node.getAttribute('data-index')) + (Technology.CurrentPage - 1) * 10]);
                Error.lastModal = 'technologyreviewErrorModal';
            });
            Technology.RactiveList.on("filter", function (event) {
                Review.filter({
                    field: "technologyId",
                    id: Technology.All[parseInt(event.node.getAttribute('data-index')) + (Technology.CurrentPage - 1) * 10].id,
                    name: Technology.All[parseInt(event.node.getAttribute('data-index')) + (Technology.CurrentPage - 1) * 10].name
                });
            });
        };

        static edit = function (addForm, data) {

            var technology = data;
            technology.languages = Technology.Languages;
            technology.taglist = Tag.All;

            var ractive = new Ractive({
                el: 'technologyModal',
                template: addForm,
                noIntro: true, // disable transitions during initial render
                data: technology
            });

            $('#inputTechnologyTags').chosen({ width: '218px' });

            ractive.on('post', function (event) {

                // stop the page reloading
                event.original.preventDefault();

                technology.name = event.context.name;
                technology.languageId = event.context.languageId;
                technology.link = event.context.link;
                technology.license = event.context.license;
                technology.description = event.context.description;
                var tags = $('#inputTechnologyTags').val() || [];
                technology.tags = $.map(tags, function (item, index) { return parseInt(item) });

                var restClient = new RestClient();
                restClient.update("/technology", technology, null).
                    success(function (response, headers, config) {
                        var start = (Technology.CurrentPage - 1) * 10;
                        Technology.RactiveList.set('technologies', Technology.All.slice(start, start + 10));
                        $('#technologies a').tooltip({});
                        $('#technologyModal').modal('toggle');
                    }).
                    error(function (response, headers, config) {
                        Error.showModal(response.error.errorCode + ": " + response.error.message);
                    }).
                    validation(function (response, headers, config) {
                        Error.showModal(response.validationErrors);
                    });
            });
        };

        static add = function (addForm) {

            var technology : any = { id: 0, languageId: 1 };
            technology.languages = Technology.Languages;
            technology.taglist = Tag.All;

            var ractive = new Ractive({
                el: 'technologyModal',
                template: addForm,
                noIntro: true, // disable transitions during initial render
                data: technology
            });

            $('#inputTechnologyTags').chosen({ width: '218px' });

            ractive.on('post', function (event) {

                // stop the page reloading
                event.original.preventDefault();

                technology.name = event.context.name;
                technology.languageId = event.context.languageId;
                technology.link = event.context.link;
                technology.license = event.context.license;
                technology.description = event.context.description;
                var tags = $('#inputTechnologyTags').val() || [];
                technology.tags = $.map(tags, function (item, index) { return parseInt(item) });

                var restClient = new RestClient();
                restClient.insert("/technology", technology, null).
                    success(function (response, headers, config) {
                        Technology.All.push(response.data);
                        if (Technology.All.length % 10 == 1) {
                            $('#technologyPager').bootstrapPaginator({ totalPages: Math.ceil(Technology.All.length / 10) });
                        }
                        var start = (Technology.CurrentPage - 1) * 10;
                        Technology.RactiveList.set('technologies', Technology.All.slice(start, start + 10));
                        $('#technologies a').tooltip({});
                        $('#technologyModal').modal('toggle');
                    }).
                    error(function (response, headers, config) {
                        Error.showModal(response.error.errorCode + ": " + response.error.message);
                    }).
                    validation(function (response, headers, config) {
                        Error.showModal(response.validationErrors);
                    });
            });
        };
    }

    export class Tool {
        static All: Array<iTool>;
        static RactiveList;
        static CurrentPage = 1;

        static list = function (toollist) {
            var restClient = new RestClient();
            restClient.get("/tool", {}, { cache: false }).
                success(function (response, headers, config) {
                    // do what you do
                    Tool.All = response.data;
                    Tool.RactiveList.set('tools', Tool.All.slice(0, 10), function () {
                        $('#tools a').tooltip({});
                        $('#toolPager').bootstrapPaginator({
                            currentPage: 1,
                            totalPages: Math.ceil(Tool.All.length / 10),
                            size: "mini",
                            onPageChanged: function (event, oldPage, newPage) {
                                Tool.CurrentPage = newPage;
                                var start = (newPage - 1) * 10;
                                Tool.RactiveList.set('tools', Tool.All.slice(start, start + 10));
                            }
                        });
                    });
                }).
                error(function (response, headers, config) {
                    Error.show(response.error.errorCode + ": " + response.error.message);
                }).
                validation(function (response, headers, config) {
                    Error.show(response.validationErrors);
                });

            Tool.RactiveList = new Ractive({
                el: 'tools',
                template: toollist,
                noIntro: true, // disable transitions during initial render
                data: {
                    tools: [],
                    format: function (date) {
                        return moment(date).format("DD-MM-YYYY");
                    }
                }
            });

            Tool.RactiveList.on("add", function (event) {
                MyTemplates.ToolAdd(Tool.add);
                Error.lastModal = 'toolErrorModal';
            });
            Tool.RactiveList.on("edit", function (event) {
                MyTemplates.ToolEdit(Tool.edit, Tool.All[parseInt(event.node.getAttribute('data-index')) + (Tool.CurrentPage - 1) * 10]);
                Error.lastModal = 'toolErrorModal';
            });
            Tool.RactiveList.on("review", function (event) {
                MyTemplates.ToolReviewAdd(ToolReview.add, Tool.All[parseInt(event.node.getAttribute('data-index')) + (Tool.CurrentPage - 1) * 10]);
                Error.lastModal = 'toolreviewErrorModal';
            });
            Tool.RactiveList.on("filter", function (event) {
                Review.filter({
                    field: "toolId",
                    id: Tool.All[parseInt(event.node.getAttribute('data-index')) + (Tool.CurrentPage - 1) * 10].id,
                    name: Tool.All[parseInt(event.node.getAttribute('data-index')) + (Tool.CurrentPage - 1) * 10].name
                });
            });
        };

        static edit = function (addForm, data) {

            var tool = data;
            tool.taglist = Tag.All;

            var ractive = new Ractive({
                el: 'toolModal',
                template: addForm,
                noIntro: true, // disable transitions during initial render
                data: tool
            });

            $('#inputToolTags').chosen({ width: '218px' });

            ractive.on('post', function (event) {

                // stop the page reloading
                event.original.preventDefault();

                tool.name = event.context.name;
                tool.owner = event.context.owner;
                tool.license = event.context.license;
                tool.link = event.context.link;
                tool.description = event.context.description;
                tool.tags = $.map($('#inputToolTags').val(), function (item, index) { return parseInt(item) });

                var restClient = new RestClient();
                restClient.update("/tool", tool, null).
                    success(function (response, headers, config) {
                        var start = (Tool.CurrentPage - 1) * 10;
                        Tool.RactiveList.set('tools', Tool.All.slice(start, start + 10));
                        $('#tools a').tooltip({});
                        $('#toolModal').modal('toggle');
                    }).
                    error(function (response, headers, config) {
                        Error.showModal(response.error.errorCode + ": " + response.error.message);
                    }).
                    validation(function (response, headers, config) {
                        Error.showModal(response.validationErrors);
                    });
            });
        };

        static add = function (addForm) {

            var tool: any = { id: 0 };
            tool.taglist = Tag.All;

            var ractive = new Ractive({
                el: 'toolModal',
                template: addForm,
                noIntro: true, // disable transitions during initial render
                data: tool
            });

            $('#inputToolTags').chosen({ width: '218px' });

            ractive.on('post', function (event) {

                // stop the page reloading
                event.original.preventDefault();

                tool.name = event.context.name;
                tool.owner = event.context.owner;
                tool.license = event.context.license;
                tool.link = event.context.link;
                tool.description = event.context.description;
                tool.tags = $.map($('#inputToolTags').val(), function (item, index) { return parseInt(item) });

                var restClient = new RestClient();
                restClient.insert("/tool", tool, null).
                    success(function (response, headers, config) {
                        Tool.All.push(response.data);
                        if (Tool.All.length % 10 == 1) {
                            $('#toolPager').bootstrapPaginator({ totalPages: Math.ceil(Tool.All.length / 10) });
                        }
                        var start = (Tool.CurrentPage - 1) * 10;
                        Tool.RactiveList.set('tools', Tool.All.slice(start, start + 10));
                        $('#tools a').tooltip({});
                        $('#toolModal').modal('toggle');
                    }).
                    error(function (response, headers, config) {
                        Error.showModal(response.error.errorCode + ": " + response.error.message);
                    }).
                    validation(function (response, headers, config) {
                        Error.showModal(response.validationErrors);
                    });
            });
        };
    }

    export class User {
        static All: Array<iUser>
        static RactiveList;
        static CurrentPage = 1;

        static list = function (userlist) {
            var restClient = new RestClient();
            restClient.get("/user", {}, { cache: false }).
                success(function (response, headers, config) {
                    // do what you do
                    User.All = response.data;
                    User.RactiveList.set('users', User.All.slice(0, 10), function () {
                        $('#users a').tooltip({});
                        $('#userPager').bootstrapPaginator({
                            currentPage: 1,
                            totalPages: Math.ceil(User.All.length / 10),
                            size: "mini",
                            onPageChanged: function (event, oldPage, newPage) {
                                User.CurrentPage = newPage;
                                var start = (newPage - 1) * 10;
                                User.RactiveList.set('users', User.All.slice(start, start + 10));
                            }
                        });
                    });
                }).
                error(function (response, headers, config) {
                    Error.show(response.error.errorCode + ": " + response.error.message);
                }).
                validation(function (response, headers, config) {
                    Error.show(response.validationErrors);
                });

            User.RactiveList = new Ractive({
                el: 'users',
                template: userlist,
                noIntro: true, // disable transitions during initial render
                data: {
                    users: [],
                    format: function (date) {
                        return moment(date).format("DD-MM-YYYY");
                    }
                }
            });

            User.RactiveList.on("add", function (event) {
                MyTemplates.UserAdd(User.add);
                Error.lastModal = 'userErrorModal';
            });
            User.RactiveList.on("edit", function (event) {
                MyTemplates.UserEdit(User.edit, User.All[parseInt(event.node.getAttribute('data-index')) + (User.CurrentPage - 1) * 10]);
                Error.lastModal = 'userErrorModal';
            });
            User.RactiveList.on("filter", function (event) {
                Review.filter({
                    field: "userId",
                    id: User.All[parseInt(event.node.getAttribute('data-index')) + (User.CurrentPage - 1) * 10].id,
                    name: User.All[parseInt(event.node.getAttribute('data-index')) + (User.CurrentPage - 1) * 10].name
                });
            });
        };

        static edit = function (addForm, data) {
            var user = data;
            var ractive = new Ractive({
                el: 'userModal',
                template: addForm,
                noIntro: true, // disable transitions during initial render
                data: user
            });

            ractive.on('post', function (event) {

                // stop the page reloading
                event.original.preventDefault();

                user.name = event.context.name;
                user.email = event.context.email;

                var restClient = new RestClient();
                restClient.update("/user", user, null).
                    success(function (response, headers, config) {
                        var start = (User.CurrentPage - 1) * 10;
                        User.RactiveList.set('users', User.All.slice(start, start + 10));
                        $('#users a').tooltip({});
                        $('#userModal').modal('toggle');
                    }).
                    error(function (response, headers, config) {
                        Error.showModal(response.error.errorCode + ": " + response.error.message);
                    }).
                    validation(function (response, headers, config) {
                        Error.showModal(response.validationErrors);
                    });
            });
        };

        static add = function (addForm) {
            
            var user: any = { id: 0 };

            var ractive = new Ractive({
                el: 'userModal',
                template: addForm,
                noIntro: true, // disable transitions during initial render
                data: user
            });

            ractive.on('post', function (event) {

                // stop the page reloading
                event.original.preventDefault();

                user.name = event.context.name;
                user.email = event.context.email;

                var restClient = new RestClient();
                restClient.insert("/user", user, null).
                    success(function (response, headers, config) {
                        User.All.push(response.data);
                        if (User.All.length % 10 == 1) {
                            $('#userPager').bootstrapPaginator({ totalPages: Math.ceil(User.All.length / 10) });
                        }
                        var start = (User.CurrentPage - 1) * 10;
                        User.RactiveList.set('users', User.All.slice(start, start + 10));
                        $('#users a').tooltip({});
                        $('#userModal').modal('toggle');
                    }).
                    error(function (response, headers, config) {
                        Error.showModal(response.error.errorCode + ": " + response.error.message);
                    }).
                    validation(function (response, headers, config) {
                        Error.showModal(response.validationErrors);
                    });
            });
        };
    }

    export class Review {
        static All: Array<iReview>;
        static RactiveList;
        static CurrentPage = 1;
        static FilterData: Array<iReview>;

        static list = function (reviewlist) {
            var restClient = new RestClient();
            restClient.get("/review", {}, { cache: false }).
                success(function (response, headers, config) {
                    // do what you do
                    Review.All = response.data;
                    Review.RactiveList.set('reviews', Review.All.slice(0, 10), function () {
                        $('#reviews a').tooltip({});
                        $('#reviewPager').bootstrapPaginator({
                            currentPage: 1,
                            totalPages: Math.ceil(Review.All.length / 10),
                            size: "mini",
                            onPageChanged: function (event, oldPage, newPage) {
                                Review.CurrentPage = newPage;
                                var start = (newPage - 1) * 10;
                                if (Review.RactiveList.get('hasFilter')) {
                                    Review.RactiveList.set('reviews', Review.FilterData.slice(start, start + 10));
                                } else {
                                    Review.RactiveList.set('reviews', Review.All.slice(start, start + 10));
                                }
                            }
                        });
                    });
                }).
                error(function (response, headers, config) {
                    Error.show(response.error.errorCode + ": " + response.error.message);
                }).
                validation(function (response, headers, config) {
                    Error.show(response.validationErrors);
                });

            Review.RactiveList = new Ractive({
                el: 'reviews',
                template: reviewlist,
                noIntro: true, // disable transitions during initial render
                data: {
                    reviews: [],
                    filter: {},
                    hasFilter: false,
                    noResults: false,
                    editClass: function (userId) {
                        if (userId == CurrentUser.user.id) {
                            return "edit-resource";
                        } else {
                            return "";
                        }
                    },
                    format: function (date) {
                        return moment(date).fromNow();
                    },
                    gravatar: function (email: string) {
                        return 'http://www.gravatar.com/avatar/' + md5(email);
                    },
                    emoticon: function (rating) {
                        if (rating == 1) return "emoticon-cry";
                        if (rating == 2) return "emoticon-straight";
                        if (rating == 3) return "emoticon-smile";
                        if (rating == 4) return "emoticon-grin";
                        if (rating == 5) return "emoticon-laugh";
                    }
                }
            });

            Review.RactiveList.on("edit", function (event) {
                var review = Review.All[parseInt(event.node.getAttribute('data-index')) + (Review.CurrentPage - 1) * 10];
                if (review.type == "Technology") {
                    MyTemplates.TechnologyReviewEdit(TechnologyReview.edit, review);
                    Error.lastModal = 'technologyreviewErrorModal';
                } else {
                    MyTemplates.ToolReviewEdit(ToolReview.edit, review);
                    Error.lastModal = 'toolreviewErrorModal';
                }
            });
            Review.RactiveList.on("removefilter", function (event) {
                Review.RactiveList.set('hasFilter', false);
                Review.RactiveList.set('noResults', false);
                Review.RactiveList.set('reviews', Review.All.slice(0, 10));
                Review.CurrentPage = 1;
                $('#reviewPager').bootstrapPaginator({ currentPage: 1, totalPages: Math.ceil(Review.All.length / 10) });
            });
        };

        static filter = function (filter: iFilter) {
            Review.FilterData = Review.All.filter(function (data, index, all) {
                return (data[filter.field] == filter.id);
            });
            Review.RactiveList.set('filter', filter);
            Review.RactiveList.set('hasFilter', true);
            Review.RactiveList.set('reviews', Review.FilterData.slice(0, 10));
            Review.CurrentPage = 1;
            if (Review.FilterData.length > 0) {
                Review.RactiveList.set('noResults', false);
                $('#reviewPager').bootstrapPaginator({ currentPage: Review.CurrentPage, totalPages: Math.ceil(Review.FilterData.length / 10) });
            } else {
                Review.RactiveList.set('noResults', true);
                $('#reviewPager').bootstrapPaginator({ currentPage: Review.CurrentPage, totalPages: 1 });
            }
        };
    }

    export class TechnologyReview {

        static add = function (addForm, data) {
            var review: any = {
                id: 0,
                userId: CurrentUser.user.id,
                version: "",
                text: "",
                rating: '3',
                name: data.name,
                technologyId: data.id,
                projectId: 0
            };
            review.projects = Project.All;

            var ractive = new Ractive({
                el: 'reviewModal',
                template: addForm,
                noIntro: true, // disable transitions during initial render
                data: review
            });

            ractive.set('rating', review.rating.toString());

            ractive.on('post', function (event) {

                // stop the page reloading
                event.original.preventDefault();

                review.version = event.context.version;
                review.rating = event.context.rating;
                review.text = event.context.text;
                review.projectId = event.context.projectId;

                var restClient = new RestClient();
                restClient.insert("/technologyreview", review, null).
                    success(function (response, headers, config) {
                        Review.All.push(response.data);
                        if (Review.All.length % 10 == 1) {
                            $('#reviewPager').bootstrapPaginator({ totalPages: Math.ceil(User.All.length / 10) });
                        }
                        var start = (Review.CurrentPage - 1) * 10;
                        Review.RactiveList.set('reviews', Review.All.slice(start, start + 10));
                        $('#reviews a').tooltip({});
                        $('#reviewModal').modal('toggle');
                    }).
                    error(function (response, headers, config) {
                        Error.showModal(response.error.errorCode + ": " + response.error.message);
                    }).
                    validation(function (response, headers, config) {
                        Error.showModal(response.validationErrors);
                    });
            });
        };

        static edit = function (addForm, data) {

            var review = data;
            review.projects = Project.All;

            var ractive = new Ractive({
                el: 'reviewModal',
                template: addForm,
                noIntro: true, // disable transitions during initial render
                data: review
            });

            ractive.set('rating', review.rating.toString()); 

            ractive.on('post', function (event) {

                // stop the page reloading
                event.original.preventDefault();

                review.version = event.context.version;
                review.rating = event.context.rating;
                review.text = event.context.text;
                review.projectId = event.context.projectId;

                var restClient = new RestClient();
                restClient.update("/technologyreview", review, null).
                    success(function (response, headers, config) {
                        var start = (Review.CurrentPage - 1) * 10;
                        Review.RactiveList.set('reviews', Review.All.slice(start, start + 10));
                        $('#reviews a').tooltip({});
                        $('#reviewModal').modal('toggle');
                    }).
                    error(function (response, headers, config) {
                        Error.showModal(response.error.errorCode + ": " + response.error.message);
                    }).
                    validation(function (response, headers, config) {
                        Error.showModal(response.validationErrors);
                    });
            });
        };
    }

    export class ToolReview {

        static add = function (addForm, data) {
            var review: any = {
                id: 0,
                userId: CurrentUser.user.id,
                version: "",
                text: "",
                rating: '3',
                name: data.name,
                toolId: data.id,
                projectId: 0
            }; 
            review.projects = Project.All;

            var ractive = new Ractive({
                el: 'reviewModal',
                template: addForm,
                noIntro: true, // disable transitions during initial render
                data: review
            });
            ractive.set('rating', review.rating.toString());

            ractive.on('post', function (event) {

                // stop the page reloading
                event.original.preventDefault();

                review.version = event.context.version;
                review.rating = event.context.rating;
                review.text = event.context.text;
                review.projectId = event.context.projectId;

                var restClient = new RestClient();
                restClient.insert("/toolreview", review, null).
                    success(function (response, headers, config) {
                        Review.All.push(response.data);
                        if (Review.All.length % 10 == 1) {
                            $('#reviewPager').bootstrapPaginator({ totalPages: Math.ceil(User.All.length / 10) });
                        }
                        var start = (Review.CurrentPage - 1) * 10;
                        Review.RactiveList.set('reviews', Review.All.slice(start, start + 10));
                        $('#reviews a').tooltip({});
                        $('#reviewModal').modal('toggle');
                    }).
                    error(function (response, headers, config) {
                        Error.showModal(response.error.errorCode + ": " + response.error.message);
                    }).
                    validation(function (response, headers, config) {
                        Error.showModal(response.validationErrors);
                    });
            });
        };

        static edit = function (addForm, data) {

            var review = data; 
            review.projects = Project.All;

            var ractive = new Ractive({
                el: 'reviewModal',
                template: addForm,
                noIntro: true, // disable transitions during initial render
                data: review
            });
            ractive.set('rating', review.rating.toString()); 

            ractive.on('post', function (event) {

                // stop the page reloading
                event.original.preventDefault();

                var add = review.id == 0;
                review.version = event.context.version;
                review.rating = event.context.rating;
                review.text = event.context.text;
                review.projectId = event.context.projectId;

                var restClient = new RestClient();
                restClient.update("/toolreview", review, null).
                    success(function (response, headers, config) {
                        if (add) {
                            Review.All.push(response.data);
                            if (Review.All.length % 10 == 1) {
                                $('#reviewPager').bootstrapPaginator({ totalPages: Math.ceil(User.All.length / 10) });
                            }
                        }
                        var start = (Review.CurrentPage - 1) * 10;
                        Review.RactiveList.set('reviews', Review.All.slice(start, start + 10));
                        $('#reviews a').tooltip({});
                        $('#reviewModal').modal('toggle');
                    }).
                    error(function (response, headers, config) {
                        Error.showModal(response.error.errorCode + ": " + response.error.message);
                    }).
                    validation(function (response, headers, config) {
                        Error.showModal(response.validationErrors);
                    });
            });
        };
    }
}
